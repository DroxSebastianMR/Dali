import "@/global.css";
import React, { useEffect } from "react";

import { AppShell } from "@/src/app/AppShell";
import { AppProviders } from "@/src/app/providers/AppProviders";
import { configureNotifications } from "@/src/modules/notifications/config/notifications.config";
import { ErrorBoundary } from "@/src/modules/system/error/ErrorBoundary";

export default function App() {
  useEffect(() => {
    configureNotifications();
  }, []);

  return (
    <AppProviders>
      <ErrorBoundary>
        <AppShell />
      </ErrorBoundary>
    </AppProviders>
  );
}
