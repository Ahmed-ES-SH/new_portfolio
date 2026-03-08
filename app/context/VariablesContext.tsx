"use client";

import { createContext, useContext, ReactNode, useState, useMemo } from "react";

interface VariablesContextType {
  displayState: boolean;
  setDisplayState: (state: boolean) => void;
}

const VariablesContext = createContext<VariablesContextType | undefined>(
  undefined,
);

interface ProviderProps {
  children: ReactNode;
}

export function VariablesProvider({ children }: ProviderProps) {
  const [displayState, setDisplayState] = useState(true);

  const value = useMemo(
    () => ({
      displayState,
      setDisplayState,
    }),
    [displayState],
  );

  return (
    <VariablesContext.Provider value={value}>
      {children}
    </VariablesContext.Provider>
  );
}

export const useVariablesContext = () => {
  const context = useContext(VariablesContext);

  if (context === undefined) {
    throw new Error(
      "useVariablesContext must be used within a VariablesProvider",
    );
  }

  return context;
};

export default useVariablesContext;
