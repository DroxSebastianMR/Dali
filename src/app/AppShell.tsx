import { RootNavigator } from "@/src/app/navigation/RootNavigator";
import { AppMode, useAppState } from "@/src/app/runtime/AppStateProvider";
import { useAppRuntime } from "@/src/app/runtime/useAppRuntime";
import { FatalErrorScreen } from "@/src/modules/app-shell/screens/FatalErrorScreen";
import { MaintenanceScreen } from "@/src/modules/app-shell/screens/MaintenanceScreen";
import { OfflineScreen } from "@/src/modules/app-shell/screens/OfflineScreen";
import { useNotifications } from "@/src/modules/notifications/hooks/useNotifications";
import { SystemUI } from "@/src/modules/system/ui/SystemUI";
import React from "react";

export const AppShell = () => {
  useAppRuntime();
  useNotifications();

  const { mode } = useAppState();

  return (
    <>
      <AppGate mode={mode} />
      <SystemUI />
    </>
  );
};

const screens: Record<AppMode, React.ReactNode> = {
  loading: null,
  offline: <OfflineScreen />,
  maintenance: <MaintenanceScreen />,
  fatal: <FatalErrorScreen />,
  "update-required": <MaintenanceScreen />,
  ready: <RootNavigator />,
};

const AppGate = ({ mode }: { mode: AppMode }) => {
  return screens[mode] ?? <FatalErrorScreen />;
};
