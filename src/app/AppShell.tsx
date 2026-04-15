import React from "react";

import { RootNavigator } from "@/src/app/navigation/RootNavigator";
import { useAppState } from "@/src/app/runtime/AppStateProvider";
import { useAppRuntime } from "@/src/app/runtime/useAppRuntime";
import { FatalErrorScreen } from "@/src/app/shell/screens/FatalErrorScreen";
import { MaintenanceScreen } from "@/src/app/shell/screens/MaintenanceScreen";
import { OfflineScreen } from "@/src/app/shell/screens/OfflineScreen";
import { SystemUI } from "@/src/app/system/SystemUI/SystemUI";

export const AppShell = () => {
  useAppRuntime();

  const { mode } = useAppState();

  return (
    <>
      <AppGate mode={mode} />
      <SystemUI />
    </>
  );
};

const AppGate = ({ mode }: { mode: string }) => {
  switch (mode) {
    case "offline":
      return <OfflineScreen />;

    case "maintenance":
      return <MaintenanceScreen />;

    case "fatal":
      return <FatalErrorScreen />;

    case "update-required":
      return <MaintenanceScreen />; // puedes hacer UpdateScreen luego

    case "ready":
    default:
      return <RootNavigator />;
  }
};
