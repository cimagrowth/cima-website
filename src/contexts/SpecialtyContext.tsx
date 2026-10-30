"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  DEFAULT_SPECIALTY,
  LANDING_PAGE_SPECIALTY,
  PERSON,
  SPECIALTY_PARAM,
  SPECIALTY_STORAGE_KEY,
  isSpecialty,
  type Specialty,
} from "@/content/specialty";

interface SpecialtyContextType {
  specialty: Specialty;
  setSpecialty: (key: Specialty) => void;
  person: (typeof PERSON)[Specialty];
  /** False until the visitor's pick has been read after mount. */
  ready: boolean;
  /**
   * True when the specialty came from ?for=, a specialty landing page, a
   * stored pick or setSpecialty(); false when it fell back to the default.
   */
  chosen: boolean;
}

const SpecialtyContext = createContext<SpecialtyContextType | undefined>(undefined);

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const readStored = (): Specialty | null => {
  try {
    const v = localStorage.getItem(SPECIALTY_STORAGE_KEY);
    return isSpecialty(v) ? v : null;
  } catch (e) {
    console.error("Error reading specialty from localStorage:", e);
    return null;
  }
};

const store = (key: Specialty) => {
  try {
    localStorage.setItem(SPECIALTY_STORAGE_KEY, key);
  } catch (e) {
    console.error("Error saving specialty to localStorage:", e);
  }
};

const landingSpecialty = (path: string | null): Specialty | null =>
  (path && LANDING_PAGE_SPECIALTY[path.replace(/\/+$/, "")]) || null;

const clearPending = () => {
  delete document.documentElement.dataset.svPending;
};

export const SpecialtyProvider = ({ children }: { children: ReactNode }) => {
  // Start on the route's specialty (a specialty landing page) or fertility, so
  // the server HTML and the first client render agree.
  const pathname = usePathname();
  const [specialty, setState] = useState<Specialty>(() => landingSpecialty(pathname) ?? DEFAULT_SPECIALTY);
  const resolved = useRef(false);
  const [ready, setReady] = useState(false);
  const [chosen, setChosen] = useState(false);

  // Resolve once after mount: ?for=, then a landing page, then storage.
  useEffect(() => {
    let param: string | null = null;
    try {
      param = new URLSearchParams(window.location.search).get(SPECIALTY_PARAM);
    } catch {
      param = null;
    }
    const fromParam = isSpecialty(param) ? param : null;
    const fromLanding = landingSpecialty(window.location.pathname);
    const picked = fromParam ?? fromLanding ?? readStored();
    const next = picked ?? DEFAULT_SPECIALTY;
    if (fromParam || fromLanding) store(next);
    setState(next);
    setChosen(picked !== null);
    setReady(true);
    resolved.current = true;
    clearPending();
  }, []);

  // On client navigation into a specialty landing page, follow it.
  useEffect(() => {
    if (!resolved.current) return;
    const fromLanding = landingSpecialty(pathname);
    if (fromLanding) {
      store(fromLanding);
      setState(fromLanding);
      setChosen(true);
    }
  }, [pathname]);

  const setSpecialty = useCallback((key: Specialty) => {
    setState(key);
    setChosen(true);
    store(key);
    window.dataLayer?.push({ event: "specialty_switch", specialty: key });
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has(SPECIALTY_PARAM)) {
        if (key === DEFAULT_SPECIALTY) url.searchParams.delete(SPECIALTY_PARAM);
        else url.searchParams.set(SPECIALTY_PARAM, key);
        window.history.replaceState(window.history.state, "", url.toString());
      }
    } catch {
      // URL APIs unavailable: the pick still applies and is stored.
    }
  }, []);

  return (
    <SpecialtyContext.Provider value={{ specialty, setSpecialty, person: PERSON[specialty], ready, chosen }}>
      {children}
    </SpecialtyContext.Provider>
  );
};

export const useSpecialty = () => {
  const context = useContext(SpecialtyContext);
  if (context === undefined) {
    throw new Error("useSpecialty must be used within a SpecialtyProvider");
  }
  return context;
};
