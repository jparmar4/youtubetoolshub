"use client";

import { useSyncExternalStore, useCallback } from "react";
import {
  CURRENCY_CONFIG,
  isSupportedCurrency,
  type CurrencyMeta,
  type SupportedCurrency,
} from "@/lib/currency-data";

export { CURRENCY_CONFIG, isSupportedCurrency, type CurrencyMeta, type SupportedCurrency };

const STORAGE_KEY = "yt_preferred_currency";
const EVENT_NAME = "yt_currency_changed";

export function getStoredCurrency(fallback: SupportedCurrency = "USD"): SupportedCurrency {
  if (typeof window === "undefined") return fallback;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && isSupportedCurrency(saved)) {
      return saved;
    }
  } catch {
    /* ignore */
  }
  return fallback;
}

export function saveStoredCurrency(currency: SupportedCurrency) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, currency);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: currency }));
  } catch {
    /* ignore */
  }
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener("storage", callback);
  };
}

export function usePreferredCurrency(defaultCurrency?: string) {
  const fallback: SupportedCurrency = isSupportedCurrency(defaultCurrency)
    ? defaultCurrency
    : "USD";

  const currency = useSyncExternalStore(
    subscribe,
    () => getStoredCurrency(fallback),
    () => fallback,
  );

  const setCurrency = useCallback((newCurr: SupportedCurrency) => {
    saveStoredCurrency(newCurr);
  }, []);

  const meta = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.USD;

  return {
    currency,
    setCurrency,
    symbol: meta.symbol,
    rate: meta.rate,
    label: meta.label,
    currencies: CURRENCY_CONFIG,
  };
}
