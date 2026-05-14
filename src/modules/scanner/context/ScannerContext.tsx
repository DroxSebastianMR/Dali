import React, { createContext, useContext, useState } from "react";

type ScannerContextType = {
  onCapture: (() => Promise<void>) | null;
  setOnCapture: (callback: (() => Promise<void>) | null) => void;
};

const ScannerContext = createContext<ScannerContextType>({
  onCapture: null,
  setOnCapture: () => {},
});

export const ScannerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [onCapture, setOnCapture] = useState<(() => Promise<void>) | null>(
    null,
  );

  return (
    <ScannerContext.Provider value={{ onCapture, setOnCapture }}>
      {children}
    </ScannerContext.Provider>
  );
};

export const useScannerContext = () => useContext(ScannerContext);
