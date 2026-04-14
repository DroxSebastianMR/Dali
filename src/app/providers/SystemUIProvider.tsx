import React, { createContext, useContext, useReducer } from "react";

const SystemUIContext = createContext<any>(null);

export const SystemUIProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(() => ({}), {});

  return (
    <SystemUIContext.Provider value={{ state, dispatch }}>
      {children}
    </SystemUIContext.Provider>
  );
};

export const useSystemUI = () => useContext(SystemUIContext);
