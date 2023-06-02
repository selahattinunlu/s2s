import { NavigationItem } from "../types";
import { DEFAULT_NAVIGATION_ITEMS } from "./constants";

const STORAGE_KEY = "navigation-items";

export const getNavigationItems = (): NavigationItem[] => {
  const items = localStorage.getItem(STORAGE_KEY);
  const parsedItems = JSON.parse(items || "[]");

  if (!parsedItems.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_NAVIGATION_ITEMS));
  }

  return JSON.parse(localStorage.getItem(STORAGE_KEY) as string);
};

export const saveNavigationItems = (items: NavigationItem[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};
