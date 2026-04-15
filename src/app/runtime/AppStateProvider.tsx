import React, { createContext, useContext, useState } from "react";

export type AppMode =
  | "loading"
  | "ready"
  | "offline"
  | "maintenance"
  | "update-required"
  | "fatal";

type RetryFn = () => Promise<void>;

type AppStateContextType = {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  retryBootstrap?: RetryFn;
  setRetryBootstrap: (fn: RetryFn) => void;
};

const AppStateContext = createContext<AppStateContextType | null>(null);

export const AppStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<AppMode>("loading");
  const [retryBootstrap, setRetryBootstrapState] = useState<
    RetryFn | undefined
  >();

  const setRetryBootstrap = (fn: RetryFn) => {
    setRetryBootstrapState(() => fn);
  };

  return (
    <AppStateContext.Provider
      value={{
        mode,
        setMode,
        retryBootstrap,
        setRetryBootstrap,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppState must be used inside AppStateProvider");
  }

  return context;
};
