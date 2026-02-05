import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface VisitorData {
  businessName: string;
  visitorName: string;
}

interface VisitorContextType {
  visitor: VisitorData | null;
  setVisitor: (data: VisitorData) => void;
  clearVisitor: () => void;
}

const VisitorContext = createContext<VisitorContextType | undefined>(undefined);

const STORAGE_KEY = "cima_visitor_data";

export const VisitorProvider = ({ children }: { children: ReactNode }) => {
  const [visitor, setVisitorState] = useState<VisitorData | null>(() => {
    // Initialize from localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Error reading visitor data from localStorage:", e);
    }
    return null;
  });

  const setVisitor = (data: VisitorData) => {
    setVisitorState(data);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Error saving visitor data to localStorage:", e);
    }
  };

  const clearVisitor = () => {
    setVisitorState(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Error clearing visitor data from localStorage:", e);
    }
  };

  return (
    <VisitorContext.Provider value={{ visitor, setVisitor, clearVisitor }}>
      {children}
    </VisitorContext.Provider>
  );
};

export const useVisitor = () => {
  const context = useContext(VisitorContext);
  if (context === undefined) {
    throw new Error("useVisitor must be used within a VisitorProvider");
  }
  return context;
};
