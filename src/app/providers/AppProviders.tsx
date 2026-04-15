import { AppBootstrap } from "@/src/app/bootstrap/AppBootstrap";
import { ThemeProvider } from "@/src/app/providers/theme/ThemeProvider";
import { AppStateProvider } from "@/src/app/runtime/AppStateProvider";
import { SystemUIProvider } from "@/src/app/system/SystemUI/SystemUIProvider";
import React from "react";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <SystemUIProvider>
        <AppStateProvider>
          <AppBootstrap>{children}</AppBootstrap>
        </AppStateProvider>
      </SystemUIProvider>
    </ThemeProvider>
  );
};
