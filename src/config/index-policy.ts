/**
 * Indexing policy — keep Google crawl budget on real tools, data pages, and
 * unique guides. Thin template URLs stay live for old links but must not compete
 * for index slots.
 */

/** Blog slugs that should not appear in search (archived, off-topic, YMYL). */
export const NOINDEX_BLOG_SLUGS = new Set<string>([]);

/** Tool × niche landings are template-generated. Do not index. */
export const INDEX_PROGRAMMATIC_NICHE_PAGES = false;

/** Generated tool-vs-tool pages (C(n,2) pairs). Do not index. */
export const INDEX_TOOL_COMPARISON_PAGES = false;

/**
 * Country earnings calculators: Tier-2/3 templates stay live for visitors but
 * must not compete for index slots — index Tier-1 only until the domain has
 * the authority to support the full set.
 */
export const INDEX_TIER2_COUNTRY_PAGES = false;

/**
 * US state creator-tax pages: 51 near-identical templates. Keep them live
 * (old links, real calculators) but out of the index until authority grows.
 */
export const INDEX_US_STATE_TAX_PAGES = false;

/** GDPR / UK / EEA / CH — Consent Mode denied until the user accepts. */
export const GDPR_CONSENT_REGIONS = [
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IS",
  "IE",
  "IT",
  "LV",
  "LI",
  "LT",
  "LU",
  "MT",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "GB",
  "CH",
] as const;

const GDPR_TIMEZONE_HINTS = [
  "Europe/",
  "Atlantic/Reykjavik",
  "Atlantic/Faroe",
  "Atlantic/Canary",
  "Atlantic/Madeira",
  "Atlantic/Azores",
  "Atlantic/Jan_Mayen",
];

/** Client-side banner heuristic. Ad consent itself uses Google's IP region list. */
export function isLikelyGdprTimezone(timeZone?: string): boolean {
  const tz =
    timeZone ||
    (typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "");
  if (!tz) return false;
  return GDPR_TIMEZONE_HINTS.some((hint) =>
    hint.endsWith("/") ? tz.startsWith(hint) : tz === hint,
  );
}
