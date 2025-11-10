const STORAGE_KEY = "campus-marketplace:user";
export const AUTH_EVENT = "auth:user-changed";

function isBrowser() {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

export function saveUser(user) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: user }));
  } catch (err) {
    console.warn("Failed to persist user", err);
  }
}

export function getStoredUser() {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.warn("Failed to read stored user", err);
    return null;
  }
}

export function clearUser() {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: null }));
  } catch (err) {
    console.warn("Failed to clear stored user", err);
  }
}
