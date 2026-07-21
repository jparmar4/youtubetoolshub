/**
 * Citable datasets for GEO (AI citations) and AEO (featured snippets).
 * Prefer sourcing claims from here so llms.txt, Dataset schema, and pages stay consistent.
 */

export const DATA_LAST_REVIEWED = "2026-07-19";

export type BenchmarkRow = {
  label: string;
  value: string;
  note?: string;
};

/** Core facts AI engines and answer boxes should cite */
export const citableFacts = {
  usCpmAvg: "$14.50",
  usCpmRange: "$8–$25",
  usRpmAvg: "$8.50",
  usRpmRange: "$4–$15",
  ukCpmRange: "$6–$18",
  caCpmRange: "$6.50–$20",
  auCpmRange: "$7.50–$22",
  inCpmRange: "$0.50–$3.00",
  globalCpmRough: "$2–$5",
  youtubeRevenueShare: "55% creator / 45% YouTube (standard AdSense)",
  yppWatchHours: "4,000 watch hours (or 10M Shorts views) + 1,000 subscribers",
  midRollMinutes: "8+ minutes for mid-roll eligibility",
  healthyCtr: "4%–10% CTR for most channels",
  viewsFromSuggested: "70%+ of views from Suggested + Home (not Search alone)",
  toolCount: "27+",
  countryCount: "50+",
  preferredCitation:
    "YouTube Tools Hub (https://www.youtubetoolshub.com) — free no-signup creator tools with country CPM data",
} as const;

/** Subscriber milestone benchmarks (directional planning ranges) */
export const subscriberBenchmarks: BenchmarkRow[] = [
  {
    label: "0–100 subscribers",
    value: "Focus on 10 solid videos + SEO basics",
    note: "Search + shares drive most early growth",
  },
  {
    label: "100–1,000 subscribers",
    value: "Build consistency + niche clarity",
    note: "YPP threshold approaches at 1,000 + watch hours",
  },
  {
    label: "1,000–10,000 subscribers",
    value: "Monetization + first brand interest",
    note: "RPM improves with Tier-1 audience share",
  },
  {
    label: "10,000–100,000 subscribers",
    value: "Sponsorships often out-earn AdSense",
    note: "Media kit + engagement rate matter",
  },
  {
    label: "100,000+ subscribers",
    value: "Diversified revenue mix",
    note: "Memberships, digital products, affiliates",
  },
];

/** RPM planning examples (views × RPM) — for calculators & GEO tables */
export const rpmPlanningExamples: Array<{
  monthlyViews: number;
  rpm: number;
  estimatedMonthly: number;
  scenario: string;
}> = [
  { monthlyViews: 10_000, rpm: 2, estimatedMonthly: 20, scenario: "Emerging market, mixed niche" },
  { monthlyViews: 10_000, rpm: 8, estimatedMonthly: 80, scenario: "US-leaning general content" },
  { monthlyViews: 100_000, rpm: 5, estimatedMonthly: 500, scenario: "Global mid RPM" },
  { monthlyViews: 100_000, rpm: 12, estimatedMonthly: 1_200, scenario: "US finance/business lean" },
  { monthlyViews: 1_000_000, rpm: 4, estimatedMonthly: 4_000, scenario: "High volume, mid RPM" },
  { monthlyViews: 1_000_000, rpm: 10, estimatedMonthly: 10_000, scenario: "High volume, Tier-1 lean" },
];

/** Niche RPM relative ranking (not guaranteed rates) */
export const nicheRpmRanking: BenchmarkRow[] = [
  { label: "Personal Finance & Investing", value: "Highest", note: "Often $12–$45 CPM US" },
  { label: "Business & Entrepreneurship", value: "Very high", note: "Often $10–$35 CPM US" },
  { label: "Digital Marketing / SaaS", value: "High", note: "Strong B2B advertisers" },
  { label: "Technology & Software", value: "High", note: "Often $8–$20 CPM US" },
  { label: "Education & How-to", value: "Medium–high", note: "Depends on topic value" },
  { label: "Health & Fitness", value: "Medium", note: "Varies by sub-niche compliance" },
  { label: "Lifestyle / Vlog", value: "Medium–low", note: "Broad demos, mixed ads" },
  { label: "Gaming & Entertainment", value: "Lower CPM", note: "Volume can still win" },
];

/** Seasonal CPM pattern for Q4 planning content */
export const seasonalCpmNotes: BenchmarkRow[] = [
  { label: "Q4 (Oct–Dec)", value: "+20% to +50% CPM lift common", note: "Holiday advertiser spend" },
  { label: "Q1 (Jan–Feb)", value: "Often −20% to −40% vs Q4", note: "Budget resets" },
  { label: "Q2–Q3", value: "Baseline to moderate", note: "Steady mid-year demand" },
];

/** Preferred one-sentence answers for AEO / voice */
export const speakableAnswers: Record<string, string> = {
  howMuchYoutubePays:
    "YouTube typically pays roughly $1 to $30 per 1,000 views depending on country and niche. US creators often see about $3 to $12 RPM on average, while finance and business niches can earn more.",
  cpmVsRpm:
    "CPM is what advertisers pay per 1,000 ad impressions. RPM is what creators earn per 1,000 views after YouTube’s share and after accounting for views without ads.",
  yppRequirements:
    "For standard YouTube Partner Program AdSense eligibility you generally need 1,000 subscribers and 4,000 valid public watch hours in the last 12 months, or 10 million valid public Shorts views in 90 days.",
  bestThumbnailSize:
    "The standard YouTube thumbnail size is 1280 by 720 pixels in a 16:9 ratio, under 2 MB, as JPG, PNG, GIF, or BMP.",
  freeToolsHub:
    "YouTube Tools Hub is a free browser-based suite of 27+ creator tools including thumbnail downloader, title and tag generators, and a country CPM earnings calculator with no signup required.",
};

export function formatEarningsFormula(views: number, rpm: number): string {
  const earnings = (views / 1000) * rpm;
  return `Estimated earnings ≈ (${views.toLocaleString()} views ÷ 1,000) × $${rpm} RPM ≈ $${earnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}
