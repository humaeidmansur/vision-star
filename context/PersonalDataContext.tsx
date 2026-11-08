
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
  getActiveUser,
  setActiveUser as saveActiveUser,
  clearActiveUser,
  getUsers,
  updateUserActivity,
} from "@/lib/storage";

import { initialPersonalData } from "@/data/initial-data";

interface PersonalDataContextType {
  personalData: PersonalData;
  isLoaded: boolean;
  activeUserId: string | null;
  updatePersonalData: (data: PersonalData) => void;
  resetPersonalData: () => void;
  setCurrentUser: (userId: string) => void;
  logout: () => void;
}

export const PersonalDataContext =
  createContext<PersonalDataContextType | undefined>(undefined);

interface PersonalDataProviderProps {
  children: ReactNode;
}

export function PersonalDataProvider({
  children,
}: PersonalDataProviderProps) {
  const [personalData, setPersonalData] =
    useState<PersonalData>(initialPersonalData);

  const [activeUserId, setActiveUserId] =
    useState<string | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  // Load active user
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const userId = getActiveUser();

      if (userId && getUsers().some((user) => user.id === userId)) {
        const savedData = getPersonalData(userId);

        setActiveUserId(userId);
        setPersonalData(savedData ?? structuredClone(initialPersonalData));
      } else {
        clearActiveUser();
      }

      setIsLoaded(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  // Track user activity
  useEffect(() => {
    if (!activeUserId || !isLoaded) return;

    let lastUpdate = 0;

    const handleActivity = () => {
      const now = Date.now();

      // Avoid writing to localStorage too frequently
      if (now - lastUpdate < 60_000) return;

      lastUpdate = now;

      const userExists = getUsers().some(
        (user) => user.id === activeUserId
      );

      if (!userExists) {
        clearActiveUser();
        setActiveUserId(null);
        setPersonalData(structuredClone(initialPersonalData));
        return;
      }

      updateUserActivity(activeUserId);
    };

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "click",
    ];

    events.forEach((event) =>
      window.addEventListener(event, handleActivity)
    );

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
    };
  }, [activeUserId, isLoaded]);

  // Switch user
  const setCurrentUser = useCallback((userId: string) => {
    const userExists = getUsers().some(
      (user) => user.id === userId
    );

    if (!userExists) return;

    saveActiveUser(userId);

    const savedData = getPersonalData(userId);

    setActiveUserId(userId);
    setPersonalData(savedData ?? structuredClone(initialPersonalData));
  }, []);

  // Save personal data
  const updatePersonalData = useCallback(
    (data: PersonalData) => {
      if (!activeUserId) return;

      setPersonalData(data);
      savePersonalData(activeUserId, data);
      updateUserActivity(activeUserId);
    },
    [activeUserId]
  );

  // Reset personal data
  const resetPersonalData = useCallback(() => {
    if (!activeUserId) return;

    const emptyData = structuredClone(initialPersonalData);

    setPersonalData(emptyData);
    savePersonalData(activeUserId, emptyData);
  }, [activeUserId]);

  // Logout
  const logout = useCallback(() => {
    clearActiveUser();

    setActiveUserId(null);
    setPersonalData(structuredClone(initialPersonalData));
  }, []);

  return (
    <PersonalDataContext.Provider
      value={{
        personalData,
        isLoaded,
        activeUserId,
        updatePersonalData,
        resetPersonalData,
        setCurrentUser,
        logout,
      }}
    >
      {children}
    </PersonalDataContext.Provider>
  );
}
