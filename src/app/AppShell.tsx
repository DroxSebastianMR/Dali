import { RootNavigator } from "@/src/app/navigation/RootNavigator";
import { FatalErrorScreen } from "@/src/app/shell/screens/FatalErrorScreen";
import { MaintenanceScreen } from "@/src/app/shell/screens/MaintenanceScreen";
import { OfflineScreen } from "@/src/app/shell/screens/OfflineScreen";
import { SystemUI } from "@/src/app/system/SystemUI/SystemUI";
import React from "react";

type AppMode = "ready" | "offline" | "maintenance" | "fatal";

export const AppShell = () => {
  const mode: AppMode = "ready"; // 👈 temporal

  return (
    <>
      <AppGate mode={mode} />
      <SystemUI />
    </>
  );
};

const AppGate = ({ mode }: { mode: AppMode }) => {
  switch (mode) {
    case "offline":
      return <OfflineScreen />;

    case "maintenance":
      return <MaintenanceScreen />;

    case "fatal":
      return <FatalErrorScreen />;

    case "ready":
    default:
      return <AppContent />;
  }
};

const AppContent = () => {
  return <RootNavigator />;
};
