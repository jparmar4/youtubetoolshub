"use client";

import { useSyncExternalStore, useCallback } from "react";

const FAVORITES_STORAGE_KEY = "yt_favorite_tools_list";
const FAVORITES_EVENT = "yt_favorites_changed";

// Default recommended tools pinned for new creators
export const DEFAULT_FAVORITES: string[] = [
  "youtube-earnings-calculator",
  "youtube-watch-hours-calculator",
  "youtube-thumbnail-downloader",
  "youtube-title-generator",
];

export function getStoredFavorites(): string[] {
  if (typeof window === "undefined") return DEFAULT_FAVORITES;
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    /* ignore parse errors */
  }
  return DEFAULT_FAVORITES;
}

export function saveStoredFavorites(slugs: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(slugs));
    window.dispatchEvent(new CustomEvent(FAVORITES_EVENT, { detail: slugs }));
  } catch {
    /* ignore storage errors */
  }
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(FAVORITES_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(FAVORITES_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

let cachedSnapshot: string[] = DEFAULT_FAVORITES;
let cachedRaw: string | null = null;

function getSnapshot(): string[] {
  if (typeof window === "undefined") return DEFAULT_FAVORITES;
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedSnapshot = raw ? JSON.parse(raw) : DEFAULT_FAVORITES;
    }
    return cachedSnapshot;
  } catch {
    return DEFAULT_FAVORITES;
  }
}

function getServerSnapshot(): string[] {
  return DEFAULT_FAVORITES;
}

export function useFavoriteTools() {
  const favorites = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites]
  );

  const toggleFavorite = useCallback((slug: string) => {
    const current = getStoredFavorites();
    let updated: string[];
    if (current.includes(slug)) {
      updated = current.filter((s) => s !== slug);
    } else {
      updated = [...current, slug];
    }
    saveStoredFavorites(updated);
    return !current.includes(slug);
  }, []);

  const addFavorite = useCallback((slug: string) => {
    const current = getStoredFavorites();
    if (!current.includes(slug)) {
      saveStoredFavorites([...current, slug]);
    }
  }, []);

  const removeFavorite = useCallback((slug: string) => {
    const current = getStoredFavorites();
    saveStoredFavorites(current.filter((s) => s !== slug));
  }, []);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
  };
}
