export type SupportedCurrency =
  | "USD"
  | "EUR"
  | "GBP"
  | "CAD"
  | "AUD"
  | "CHF"
  | "NZD"
  | "SGD"
  | "NOK"
  | "SEK"
  | "DKK"
  | "HKD"
  | "JPY"
  | "KRW"
  | "AED"
  | "SAR"
  | "QAR"
  | "PLN"
  | "INR";

export interface CurrencyMeta {
  code: SupportedCurrency;
  symbol: string;
  rate: number; // approximate indicative exchange rate relative to 1.0 USD
  label: string;
  zeroDecimal?: boolean;
}

export const CURRENCY_CONFIG: Record<SupportedCurrency, CurrencyMeta> = {
  USD: { code: "USD", symbol: "$", rate: 1.0, label: "USD ($)" },
  EUR: { code: "EUR", symbol: "€", rate: 0.92, label: "EUR (€)" },
  GBP: { code: "GBP", symbol: "£", rate: 0.79, label: "GBP (£)" },
  CAD: { code: "CAD", symbol: "CA$", rate: 1.36, label: "CAD ($)" },
  AUD: { code: "AUD", symbol: "AU$", rate: 1.52, label: "AUD ($)" },
  CHF: { code: "CHF", symbol: "CHF", rate: 0.88, label: "CHF (Fr)" },
  NZD: { code: "NZD", symbol: "NZ$", rate: 1.66, label: "NZD ($)" },
  SGD: { code: "SGD", symbol: "S$", rate: 1.34, label: "SGD ($)" },
  NOK: { code: "NOK", symbol: "kr", rate: 10.75, label: "NOK (kr)" },
  SEK: { code: "SEK", symbol: "kr", rate: 10.55, label: "SEK (kr)" },
  DKK: { code: "DKK", symbol: "kr", rate: 6.86, label: "DKK (kr)" },
  HKD: { code: "HKD", symbol: "HK$", rate: 7.8, label: "HKD ($)" },
  JPY: { code: "JPY", symbol: "¥", rate: 152, label: "JPY (¥)", zeroDecimal: true },
  KRW: { code: "KRW", symbol: "₩", rate: 1380, label: "KRW (₩)", zeroDecimal: true },
  AED: { code: "AED", symbol: "AED", rate: 3.67, label: "AED (د.إ)" },
  SAR: { code: "SAR", symbol: "SAR", rate: 3.75, label: "SAR (﷼)" },
  QAR: { code: "QAR", symbol: "QAR", rate: 3.64, label: "QAR (﷼)" },
  PLN: { code: "PLN", symbol: "zł", rate: 3.98, label: "PLN (zł)" },
  INR: { code: "INR", symbol: "₹", rate: 86.5, label: "INR (₹)" },
};

/**
 * Additional indicative FX rates for country-level AdSense benchmark conversions
 * beyond the main header/calculator picker currencies.
 */
export const EXTRA_FX_RATES: Record<string, number> = {
  ISK: 138,
  ILS: 3.72,
  KWD: 0.31,
  TWD: 32.1,
  CZK: 23.2,
  HUF: 368,
  MYR: 4.42,
  BRL: 5.65,
  MXN: 19.8,
  PHP: 57.5,
  CLP: 950,
  ZAR: 17.8,
  THB: 34.2,
  ARS: 1020,
  COP: 4250,
  IDR: 15850,
  VND: 25400,
  TRY: 34.5,
  EGP: 49.5,
  NGN: 1620,
  PKR: 278,
  BDT: 119.5,
};

export function isSupportedCurrency(code?: string): code is SupportedCurrency {
  return Boolean(code && code in CURRENCY_CONFIG);
}

export function getUsdFxRate(currencyCode: string): number {
  const upper = currencyCode.toUpperCase();
  if (upper in CURRENCY_CONFIG) {
    return CURRENCY_CONFIG[upper as SupportedCurrency].rate;
  }
  return EXTRA_FX_RATES[upper] ?? 1.0;
}

export function formatMoneyRounded(amountUsd: number, currencyCode: string = "USD"): string {
  const upper = currencyCode.toUpperCase();
  const rate = getUsdFxRate(upper);
  const converted = Math.round(amountUsd * rate);
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: upper,
      maximumFractionDigits: 0,
    }).format(converted);
  } catch {
    return `$${Math.round(amountUsd).toLocaleString("en-US")}`;
  }
}

export function formatDualCurrencySummary(amountUsd: number, localCurrencyCode: string): string {
  const usdFormatted = `$${Math.round(amountUsd).toLocaleString("en-US")} USD`;
  const upper = localCurrencyCode.toUpperCase();
  if (upper === "USD") return usdFormatted;
  const localFormatted = formatMoneyRounded(amountUsd, upper);
  return `${usdFormatted} (~${localFormatted})`;
}
