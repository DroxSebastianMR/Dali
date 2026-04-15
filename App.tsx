import "@/global.css";
import React from "react";

import { AppShell } from "@/src/app/AppShell";
import { AppProviders } from "@/src/app/providers/AppProviders";
import { ErrorBoundary } from "@/src/modules/system/error/ErrorBoundary";

export default function App() {
  return (
    <AppProviders>
      <ErrorBoundary>
        <AppShell />
      </ErrorBoundary>
    </AppProviders>
  );
}
