import { BootstrapState } from "@/src/app/bootstrap/bootstrap.types";
import { BootstrapLoader } from "@/src/app/bootstrap/BootstrapLoader";
import { useAppState } from "@/src/app/runtime/AppStateProvider";
import { checkSystemStatus } from "@/src/domain/system/system.usecase";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const AppBootstrap = ({ children }: Props) => {
  const [state, setState] = useState<BootstrapState>({
    status: "loading",
  });

  const { setMode, setRetryBootstrap } = useAppState();

  const runBootstrap = useCallback(async () => {
    setState({ status: "loading" });
    setMode("loading");

    try {
      const decision = await checkSystemStatus();

      switch (decision.type) {
        case "MAINTENANCE":
          setMode("maintenance");
          setState({
            status: "maintenance",
            message: decision.status.maintenance.message ?? undefined,
          });
          break;

        case "UPDATE_REQUIRED":
          setMode("update-required");
          setState({
            status: "update-required",
            url: decision.status.app.update?.storeUrl!,
          });
          break;

        case "OK":
          setMode("ready");
          setState({ status: "ready" });
          break;
      }
    } catch (error: any) {
      if (error?.type === "NETWORK_ERROR") {
        setMode("offline");
        setState({ status: "offline" });
        return;
      }

      setMode("fatal");
      setState({ status: "error" });
    }
  }, [setMode]);

  useEffect(() => {
    setRetryBootstrap(runBootstrap);
    runBootstrap();
  }, [runBootstrap]);

  if (state.status === "loading") {
    return <BootstrapLoader />;
  }

  return <>{children}</>;
};
