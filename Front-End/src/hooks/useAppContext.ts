// hooks/useAppContext.ts
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import type { AppContextType } from "../context/AppContext";

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}
