"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";

interface VariablesContextType {
  displayState: boolean;
  showTerminal: boolean;
  terminalCommand: string | null;
  isPopupOpen: boolean;
  setDisplayState: Dispatch<SetStateAction<boolean>>;
  setTerminalCommand: Dispatch<SetStateAction<string | null>>;
  setShowTerminal: Dispatch<SetStateAction<boolean>>;
  setIsPopupOpen: Dispatch<SetStateAction<boolean>>;
}

const VariablesContext = createContext<VariablesContextType | undefined>(
  undefined,
);

interface ProviderProps {
  children: ReactNode;
}

export function VariablesProvider({ children }: ProviderProps) {
  const [displayState, setDisplayState] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalCommand, setTerminalCommand] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const value = useMemo(
    () => ({
      displayState,
      setDisplayState,
      showTerminal,
      setShowTerminal,
      terminalCommand,
      setTerminalCommand,
      isPopupOpen,
      setIsPopupOpen,
    }),
    [displayState, showTerminal, terminalCommand, isPopupOpen, setIsPopupOpen],
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
