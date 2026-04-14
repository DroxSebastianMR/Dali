import { AppBootstrap } from "@/src/app/bootstrap/AppBootstrap";
import { ThemeProvider } from "@/src/app/providers/theme/ThemeProvider";
import React from "react";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <AppBootstrap>{children}</AppBootstrap>
    </ThemeProvider>
  );
};
