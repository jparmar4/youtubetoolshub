"use client";

import { useSyncExternalStore, useCallback, useEffect } from "react";

const RECENT_TOOLS_STORAGE_KEY = "yt_recent_tools_list";
const RECENT_TOOLS_EVENT = "yt_recent_tools_changed";
const MAX_RECENT_TOOLS = 6;

export function getStoredRecentTools(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_TOOLS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.slice(0, MAX_RECENT_TOOLS);
      }
    }
  } catch {
    /* ignore storage errors */
  }
  return [];
}

export function recordRecentTool(slug: string) {
  if (typeof window === "undefined" || !slug) return;
  try {
    const current = getStoredRecentTools();
    const filtered = current.filter((s) => s !== slug);
    const updated = [slug, ...filtered].slice(0, MAX_RECENT_TOOLS);
    localStorage.setItem(RECENT_TOOLS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(RECENT_TOOLS_EVENT, { detail: updated }));
  } catch {
    /* ignore */
  }
}

export function clearRecentTools() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(RECENT_TOOLS_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(RECENT_TOOLS_EVENT, { detail: [] }));
  } catch {
    /* ignore */
  }
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(RECENT_TOOLS_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(RECENT_TOOLS_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

let cachedSnapshot: string[] = [];
let cachedRaw: string | null = null;

function getSnapshot(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_TOOLS_STORAGE_KEY);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedSnapshot = raw ? JSON.parse(raw).slice(0, MAX_RECENT_TOOLS) : [];
    }
    return cachedSnapshot;
  } catch {
    return [];
  }
}

function getServerSnapshot(): string[] {
  return [];
}

export function useRecentTools() {
  const recentSlugs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const logView = useCallback((slug: string) => {
    recordRecentTool(slug);
  }, []);

  const clear = useCallback(() => {
    clearRecentTools();
  }, []);

  return {
    recentSlugs,
    logView,
    clear,
  };
}

/**
 * Headless tracking component that automatically logs a tool page view
 */
export function RecentToolTracker({ slug }: { slug: string }) {
  useEffect(() => {
    if (slug) {
      recordRecentTool(slug);
    }
  }, [slug]);

  return null;
}
