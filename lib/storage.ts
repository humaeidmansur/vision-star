
import type { PersonalData, UserAccount } from "@/types";

const USERS_STORAGE_KEY = "vision-star-users";
const ACTIVE_USER_KEY = "vision-star-active-user";

const MAX_USERS = 3;
const INACTIVITY_LIMIT = 3 * 24 * 60 * 60 * 1000;

// Read registered users without triggering another cleanup

function readUsers(): UserAccount[] {
  try {
    const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    return savedUsers ? JSON.parse(savedUsers) as UserAccount[] : [];
  } catch {
    return [];
  }
}

// Remove accounts inactive for 3 days

export function cleanupExpiredUsers(): void {
  if (typeof window === "undefined") return;

  const users = readUsers();
  const now = Date.now();

  const activeUserId = localStorage.getItem(ACTIVE_USER_KEY);

  const validUsers = users.filter((user) => {
    const lastActive = new Date(user.lastActiveAt).getTime();

    const isExpired =
      !Number.isFinite(lastActive) ||
      now - lastActive >= INACTIVITY_LIMIT;

    if (isExpired) {
      localStorage.removeItem(`vision-star-data-${user.id}`);

      if (activeUserId === user.id) {
        localStorage.removeItem(ACTIVE_USER_KEY);
      }

      return false;
    }

    return true;
  });

  localStorage.setItem(
    USERS_STORAGE_KEY,
    JSON.stringify(validUsers)
  );
}

// Get registered users after checking expiration

export function getUsers(): UserAccount[] {
  if (typeof window === "undefined") return [];

  cleanupExpiredUsers();
  return readUsers();
}

// Check registration availability

export function canRegister(): boolean {
  return getUsers().length < MAX_USERS;
}

// Register a new user

export function saveUser(user: UserAccount): boolean {
  try {
    if (typeof window === "undefined") return false;

    const users = getUsers();

    if (users.length >= MAX_USERS) return false;

    const emailExists = users.some(
      (item) => item.email.toLowerCase() === user.email.toLowerCase()
    );

    if (emailExists) return false;

    users.push(user);

    localStorage.setItem(
      USERS_STORAGE_KEY,
      JSON.stringify(users)
    );

    return true;
  } catch (error) {
    console.error("Error saving user:", error);
    return false;
  }
}

// Get active user ID

export function getActiveUser(): string | null {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(ACTIVE_USER_KEY);
}

// Update user's last active time

export function updateUserActivity(userId: string): void {
  if (typeof window === "undefined") return;

  const users = getUsers();

  const updatedUsers = users.map((user) =>
    user.id === userId
      ? { ...user, lastActiveAt: new Date().toISOString() }
      : user
  );

  localStorage.setItem(
    USERS_STORAGE_KEY,
    JSON.stringify(updatedUsers)
  );
}

// Set active user

export function setActiveUser(userId: string): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(ACTIVE_USER_KEY, userId);
  updateUserActivity(userId);
}

// Clear active user (logout)

export function clearActiveUser(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(ACTIVE_USER_KEY);
}

// Save personal data for a specific user

export function savePersonalData(
  userId: string,
  data: PersonalData
): boolean {
  try {
    if (typeof window === "undefined") return false;

    localStorage.setItem(
      `vision-star-data-${userId}`,
      JSON.stringify(data)
    );

    return true;
  } catch (error) {
    console.error("Error saving personal data:", error);
    return false;
  }
}

// Get personal data for a specific user

export function getPersonalData(userId: string): PersonalData | null {
  try {
    if (typeof window === "undefined") return null;

    const savedData = localStorage.getItem(
      `vision-star-data-${userId}`
    );

    return savedData ? JSON.parse(savedData) as PersonalData : null;
  } catch (error) {
    console.error("Error reading personal data:", error);
    return null;
  }
}

// Clear personal data for a specific user

export function clearPersonalData(userId: string): boolean {
  try {
    if (typeof window === "undefined") return false;

    localStorage.removeItem(`vision-star-data-${userId}`);
    return true;
  } catch (error) {
    console.error("Error clearing personal data:", error);
    return false;
  }
}
