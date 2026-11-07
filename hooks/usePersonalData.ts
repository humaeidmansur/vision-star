
"use client";

import { useContext } from "react";
import { PersonalDataContext } from "@/context/PersonalDataContext";

export function usePersonalData() {
  const context = useContext(PersonalDataContext);

  if (!context) {
    throw new Error(
      "usePersonalData must be used inside PersonalDataProvider"
    );
  }

  return context;
}
