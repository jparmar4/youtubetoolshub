"use client";

import { useSyncExternalStore, useCallback } from "react";

export type SupportedCurrency = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "CHF" | "INR";

export interface CurrencyMeta {
  code: SupportedCurrency;
  symbol: string;
  rate: number; // exchange rate relative to 1.0 USD
  label: string;
}

export const CURRENCY_CONFIG: Record<SupportedCurrency, CurrencyMeta> = {
  USD: { code: "USD", symbol: "$", rate: 1.0, label: "USD ($)" },
  EUR: { code: "EUR", symbol: "€", rate: 0.92, label: "EUR (€)" },
  GBP: { code: "GBP", symbol: "£", rate: 0.79, label: "GBP (£)" },
  CAD: { code: "CAD", symbol: "CA$", rate: 1.36, label: "CAD ($)" },
  AUD: { code: "AUD", symbol: "AU$", rate: 1.52, label: "AUD ($)" },
  CHF: { code: "CHF", symbol: "CHF", rate: 0.88, label: "CHF (Fr)" },
  INR: { code: "INR", symbol: "₹", rate: 86.5, label: "INR (₹)" },
};

const STORAGE_KEY = "yt_preferred_currency";
const EVENT_NAME = "yt_currency_changed";

export function getStoredCurrency(): SupportedCurrency {
  if (typeof window === "undefined") return "USD";
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as SupportedCurrency | null;
    if (saved && saved in CURRENCY_CONFIG) {
      return saved;
    }
  } catch {
    /* ignore */
  }
  return "USD";
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

function getSnapshot(): SupportedCurrency {
  return getStoredCurrency();
}

function getServerSnapshot(): SupportedCurrency {
  return "USD";
}

export function usePreferredCurrency(defaultCurrency?: string) {
  const storeCurrency = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const currency: SupportedCurrency =
    defaultCurrency && !(typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY))
      ? (defaultCurrency as SupportedCurrency)
      : storeCurrency;

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
