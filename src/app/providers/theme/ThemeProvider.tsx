import { defaultTheme } from "@/src/app/providers/theme/default.theme";
import { AppTheme } from "@/src/app/providers/theme/theme.types";
import {
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
  Theme,
} from "@react-navigation/native";
import React, { createContext, useContext, useMemo } from "react";

type ThemeContextValue = {
  theme: AppTheme;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = defaultTheme;

  const navigationTheme: Theme = useMemo(
    () => ({
      dark: theme.dark,

      colors: {
        ...DefaultTheme.colors,
        background: theme.colors.background,
        card: theme.colors.surface,
        primary: theme.colors.primary,
        text: theme.colors.textPrimary,
        border: theme.colors.surface,
        notification: theme.colors.primary,
      },

      fonts: DefaultTheme.fonts,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={{ theme }}>
      <NavigationThemeProvider value={navigationTheme}>
        {children}
      </NavigationThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx.theme;
};
