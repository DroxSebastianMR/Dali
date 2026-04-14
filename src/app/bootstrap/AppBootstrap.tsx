import { BootstrapState } from "@/src/app/bootstrap/bootstrap.types";
import { BootstrapBlocked } from "@/src/app/bootstrap/BootstrapBlocked";
import { BootstrapLoader } from "@/src/app/bootstrap/BootstrapLoader";
import { checkSystemStatus } from "@/src/domain/system/system.usecase";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const AppBootstrap = ({ children }: Props) => {
  const [state, setState] = useState<BootstrapState>({
    status: "loading",
  });

  useEffect(() => {
    runBootstrap();
  }, []);

  const runBootstrap = async () => {
    setState({ status: "loading" });

    try {
      const decision = await checkSystemStatus();

      switch (decision.type) {
        case "MAINTENANCE":
          setState({
            status: "maintenance",
            message: decision.status.maintenance.message ?? undefined,
          });
          break;

        case "UPDATE_REQUIRED":
          setState({
            status: "update-required",
            url: decision.status.app.update?.storeUrl!,
          });
          break;

        case "OK":
          setState({ status: "ready" });
          break;
      }
    } catch (error: any) {
      if (error?.type === "NETWORK_ERROR") {
        setState({ status: "offline" });
        return;
      }

      setState({ status: "error" });
    }
  };

  if (state.status === "loading") {
    return <BootstrapLoader />;
  }

  if (state.status !== "ready") {
    return <BootstrapBlocked state={state} onRetry={runBootstrap} />;
  }

  return <>{children}</>;
};
