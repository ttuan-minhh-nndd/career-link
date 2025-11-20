import type { User } from "../types/user";

export const localStorageEventTarget = new EventTarget();

export const setTokenToLocalStorage = (token: string) => {
  localStorage.setItem("token", token);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token") || "";
};

export const setProfileToLocalStorage = (profile: User) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};
export const getProfileFromLocalStorage = () => {
  const result = localStorage.getItem("profile");
  return result ? JSON.parse(result) : null;
};

export const clearLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("profile");
  const clearLocalStorageEvent = new Event("clearLocalStorage");
  localStorageEventTarget.dispatchEvent(clearLocalStorageEvent);
};
