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
    setMode("loading");

    try {
      const decision = await Promise.race([
        checkSystemStatus(),
        new Promise<any>((resolve) =>
          setTimeout(
            () =>
              resolve({
                type: "OK",
              }),
            1500,
          ),
        ),
      ]);

      switch (decision.type) {
        case "MAINTENANCE":
          setMode("maintenance");
          break;

        case "UPDATE_REQUIRED":
          setMode("update-required");
          break;

        default: {
          const refreshToken = await authStorage.getRefreshToken();
          if (refreshToken) {
            bootstrapAuth(refreshToken);
          }
          setMode("ready");
          break;
        }
      }
    } catch (error: any) {
      if (error?.type === "NETWORK_ERROR") {
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
  }, [runBootstrap]);

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
