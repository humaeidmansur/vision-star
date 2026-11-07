"use client";



import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { PersonalData } from "@/types";

import {
  getPersonalData,
  savePersonalData,
  clearPersonalData,
} from "@/lib/storage";

import { initialPersonalData } from "@/data/initial-data";

// Context interface
interface PersonalDataContextType {
  personalData: PersonalData;
  isLoaded: boolean;
  updatePersonalData: (data: PersonalData) => void;
  resetPersonalData: () => void;
}

// Create context
export const PersonalDataContext =
  createContext<PersonalDataContextType | undefined>(undefined);

// Provider props
interface PersonalDataProviderProps {
  children: ReactNode;
}

// Context provider
export function PersonalDataProvider({
  children,
}: PersonalDataProviderProps) {
  const [personalData, setPersonalData] =
    useState<PersonalData>(initialPersonalData);

  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved data when the application starts
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const savedData = getPersonalData();

      if (savedData) {
        setPersonalData(savedData);
      }

      setIsLoaded(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  // Update personal data and save it
  const updatePersonalData = useCallback((data: PersonalData) => {
    setPersonalData(data);
    savePersonalData(data);
  }, []);

  // Reset personal data to empty initial values
  const resetPersonalData = useCallback(() => {
    setPersonalData(initialPersonalData);
    clearPersonalData();
  }, []);

  return (
    <PersonalDataContext.Provider
      value={{
        personalData,
        isLoaded,
        updatePersonalData,
        resetPersonalData,
      }}
    >
      {children}
    </PersonalDataContext.Provider>
  );
}