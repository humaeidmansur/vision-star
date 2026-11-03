// ========================================
// VISION STAR - LOCAL STORAGE SYSTEM
// ========================================

import type { PersonalData } from "@/types";

// Storage key
const STORAGE_KEY = "vision-star-personal-data";

// Save personal data
export function savePersonalData(data: PersonalData): boolean {
  try {
    if (typeof window === "undefined") return false;

    const serializedData = JSON.stringify(data);

    localStorage.setItem(STORAGE_KEY, serializedData);

    return true;
  } catch (error) {
    console.error("Error saving personal data:", error);
    return false;
  }
}

// Get personal data
export function getPersonalData(): PersonalData | null {
  try {
    if (typeof window === "undefined") return null;

    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) return null;

    return JSON.parse(savedData) as PersonalData;
  } catch (error) {
    console.error("Error reading personal data:", error);
    return null;
  }
}

// Remove personal data
export function clearPersonalData(): boolean {
  try {
    if (typeof window === "undefined") return false;

    localStorage.removeItem(STORAGE_KEY);

    return true;
  } catch (error) {
    console.error("Error clearing personal data:", error);
    return false;
  }
}

// Check whether personal data exists
export function hasPersonalData(): boolean {
  try {
    if (typeof window === "undefined") return false;

    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch (error) {
    console.error("Error checking personal data:", error);
    return false;
  }
}