/**
 * Indexing policy — keep Google crawl budget on real tools, data pages, and
 * unique guides. Thin template URLs stay live for old links but must not compete
 * for index slots.
 */

/** Blog slugs that should not appear in search (archived, off-topic, YMYL). */
export const NOINDEX_BLOG_SLUGS = new Set([
  "youtube-seo-basics-archived",
  "insurance-youtube-marketing",
  "lawyer-youtube-marketing",
  "youtube-tax-guide-creators-usa-2026",
  "best-enterprise-ai-platforms-2026",
  // 301 targets — keep out of listings/sitemaps while redirects fire
  "how-to-get-1000-subscribers-and-10000-views",
  "youtube-partner-program-requirements-2026",
  "youtube-algorithm-secrets-2026",
  "youtube-seo-complete-guide",
  "best-ai-tools-youtube-creators-2026",
  "25-best-ai-tools-for-youtube-creators",
  "youtube-automation-complete-guide-2026",
]);

/** Tool × niche landings are template-generated. Do not index. */
export const INDEX_PROGRAMMATIC_NICHE_PAGES = false;

/** Generated tool-vs-tool pages (C(n,2) pairs). Do not index. */
export const INDEX_TOOL_COMPARISON_PAGES = false;

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
