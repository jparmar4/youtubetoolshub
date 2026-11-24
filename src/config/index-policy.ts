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
 * Country earnings calculators. Tier 1 is always indexed.
 *
 * Tier 2 (17 markets: FR, JP, KR, AE, IL, QA, KW, SA, ES, IT, TW, PL, CZ, HU,
 * PT, GR, MY) is indexed too. While these pages were indexable they ranked
 * roughly 6–15 on "youtube earnings/CPM <country>" queries in Search Console
 * (Qatar 5.97, Kuwait 6.89, Egypt 10.78, Poland 15.07) — materially better than
 * the site's blog pages — because each one carries unique data: the US treaty
 * withholding rate, the local tax authority, the AdSense payout rail, domestic
 * advertiser verticals, and that market's seasonality. That is a data page, not
 * a thin template.
 *
 * Tier 3 stays live for visitors but noindexed until the domain can support it.
 * Use isCountryEarningsIndexable() from src/lib/cpm-data.ts for every
 * indexability decision so Tier 3 is never swept in by accident.
 */
export const INDEX_TIER2_COUNTRY_PAGES = true;

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
