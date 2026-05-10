import React, { useCallback, useEffect, useState } from "react";

import { useAppState } from "@/src/app/runtime/AppStateProvider";
import { checkSystemStatus } from "@/src/domain/system/system.usecase";
import { useAuth } from "@/src/modules/auth/context/AuthProvider";
import { authStorage } from "@/src/modules/auth/storage/auth.storage";
import { BootstrapLoader } from "@/src/modules/bootstrap/components/BootstrapLoader";

type Props = {
  children: React.ReactNode;
};

export const AppBootstrap = ({ children }: Props) => {
  const { setMode, setRetryBootstrap } = useAppState();

  const { bootstrapAuth } = useAuth();

  const [bootstrapFinished, setBootstrapFinished] = useState(false);

  const [loaderFinished, setLoaderFinished] = useState(false);

  const runBootstrap = useCallback(async () => {
    setLoaderFinished(false);
    setBootstrapFinished(false);

    setMode("loading");

    try {
      const decision = await checkSystemStatus();

      switch (decision.type) {
        case "MAINTENANCE":
          setMode("maintenance");
          break;

        case "UPDATE_REQUIRED":
          setMode("update-required");
          break;

        case "OK": {
          const refreshToken = await authStorage.getRefreshToken();

          if (refreshToken) {
            await bootstrapAuth(refreshToken);
          }

          setMode("ready");

          break;
        }

        default:
          setMode("fatal");
          break;
      }
    } catch (error: any) {
      console.log("Bootstrap error:", error);

      if (
        error?.type === "NETWORK_ERROR" ||
        error?.message?.includes("Network") ||
        error?.message?.includes("fetch")
      ) {
        setMode("offline");
      } else {
        setMode("fatal");
      }
    } finally {
      setBootstrapFinished(true);
    }
  }, [setMode, bootstrapAuth]);

  useEffect(() => {
    setRetryBootstrap(runBootstrap);

    runBootstrap();
  }, [runBootstrap, setRetryBootstrap]);

  if (!loaderFinished) {
    return (
      <BootstrapLoader
        completed={bootstrapFinished}
        onFinish={() => setLoaderFinished(true)}
      />
    );
  }

  return <>{children}</>;
};
