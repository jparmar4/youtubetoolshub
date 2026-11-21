import { Metadata } from "next";
import Link from "next/link";
import {
  FaArrowRight,
  FaChartBar,
  FaCheckCircle,
  FaDollarSign,
  FaExchangeAlt,
  FaGlobeAmericas,
  FaTable,
} from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { countryCPMData, TIERS } from "@/lib/cpm-data";
import { DATA_LAST_REVIEWED } from "@/lib/seo-data";
import {
  combineSchemasToGraph,
  getBreadcrumbSchema,
  getDatasetSchema,
  getFAQSchema,
  getGlobalAlternates,
} from "@/lib/seo";
import Breadcrumb from "@/components/ui/Breadcrumb";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import QuickAnswerCapsule from "@/components/seo/QuickAnswerCapsule";
import FaqAccordion from "@/components/ui/FaqAccordion";
import HighRpmSidebar from "@/components/tools/HighRpmSidebar";
import AdSlot from "@/components/ads/AdSlot";
import { AdSectionIgnore, AdSectionPrioritize } from "@/components/ads/AdSectionTarget";
import { AD_SLOTS } from "@/lib/adsense";

const REPORT_LAST_MODIFIED = "2026-11-17";
const REPORT_PATH = "/research/youtube-cpm-rpm-report-2026";
const REPORT_URL = `${siteConfig.url}${REPORT_PATH}`;

export const metadata: Metadata = {
  title: {
    absolute: "2026 YouTube Creator Economy & CPM/RPM Benchmark Report",
  },
  description:
    "2026 benchmark dataset comparing Tier-1 vs Tier-2/3 YouTube CPM and RPM rates, Long-Form vs Shorts payouts, and Top 12 high-paying niches across 52 countries.",
  keywords: [
    "youtube cpm rpm benchmark report 2026",
    "youtube creator economy report 2026",
    "tier 1 vs tier 3 youtube cpm",
    "highest paying youtube niches 2026",
    "youtube shorts rpm vs long form rpm 2026",
  ],
  alternates: getGlobalAlternates(REPORT_PATH),
  openGraph: {
    title: "2026 YouTube Creator Economy & CPM/RPM Benchmark Report",
    description:
      "Audited HTML benchmark tables covering 52 countries, Long-Form vs Shorts RPM, and Top 12 high-CPM niches.",
    url: REPORT_URL,
    type: "article",
    images: [
      {
        url: `${siteConfig.url}/research/youtube-cpm-rpm-report-2026/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "2026 YouTube Creator Economy & CPM/RPM Benchmark Report",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 YouTube Creator Economy & CPM/RPM Benchmark Report",
    description:
      "Audited HTML benchmark tables covering 52 countries, Long-Form vs Shorts RPM, and Top 12 high-CPM niches.",
    images: [`${siteConfig.url}/research/youtube-cpm-rpm-report-2026/opengraph-image`],
  },
};

interface TopPayingNicheRow {
  rank: number;
  niche: string;
  usCpmRange: string;
  estRpmRange: string;
  sponsorCpm: string;
  peakQuarter: string;
  primaryAdvertisers: string;
}

const TOP_12_NICHES: TopPayingNicheRow[] = [
  {
    rank: 1,
    niche: "Personal Finance & Investing",
    usCpmRange: "$18.00 – $48.00",
    estRpmRange: "$9.50 – $26.00",
    sponsorCpm: "$35 – $65",
    peakQuarter: "Q4 / Q1",
    primaryAdvertisers: "Brokerages, high-yield banks, tax software, credit cards",
  },
  {
    rank: 2,
    niche: "B2B SaaS & Enterprise Software",
    usCpmRange: "$16.00 – $42.00",
    estRpmRange: "$8.80 – $23.00",
    sponsorCpm: "$40 – $70",
    peakQuarter: "Q4",
    primaryAdvertisers: "Cloud infrastructure, CRM platforms, workflow automation",
  },
  {
    rank: 3,
    niche: "Insurance & Legal Services",
    usCpmRange: "$15.00 – $40.00",
    estRpmRange: "$8.20 – $21.50",
    sponsorCpm: "$30 – $55",
    peakQuarter: "Q4",
    primaryAdvertisers: "Business liability carriers, life insurance, legal SaaS",
  },
  {
    rank: 4,
    niche: "Real Estate & Mortgages",
    usCpmRange: "$12.00 – $34.00",
    estRpmRange: "$6.80 – $18.50",
    sponsorCpm: "$28 – $50",
    peakQuarter: "Q2 / Q3",
    primaryAdvertisers: "REIT platforms, mortgage lenders, property software",
  },
  {
    rank: 5,
    niche: "Business & Entrepreneurship",
    usCpmRange: "$11.00 – $35.00",
    estRpmRange: "$6.00 – $18.00",
    sponsorCpm: "$30 – $55",
    peakQuarter: "Q4",
    primaryAdvertisers: "Payroll platforms, LLC incorporation, e-commerce suites",
  },
  {
    rank: 6,
    niche: "Cybersecurity & DevOps",
    usCpmRange: "$10.00 – $28.00",
    estRpmRange: "$5.50 – $15.50",
    sponsorCpm: "$28 – $52",
    peakQuarter: "Q4",
    primaryAdvertisers: "VPNs, password managers, zero-trust cloud tools",
  },
  {
    rank: 7,
    niche: "AI Engineering & Software Tools",
    usCpmRange: "$9.50 – $26.00",
    estRpmRange: "$5.20 – $14.20",
    sponsorCpm: "$25 – $48",
    peakQuarter: "Q1 / Q4",
    primaryAdvertisers: "AI coding assistants, cloud GPUs, developer APIs",
  },
  {
    rank: 8,
    niche: "Digital Marketing & SEO",
    usCpmRange: "$8.00 – $24.00",
    estRpmRange: "$4.60 – $13.00",
    sponsorCpm: "$24 – $45",
    peakQuarter: "Q4",
    primaryAdvertisers: "SEO suites, email SaaS, web hosting, ad platforms",
  },
  {
    rank: 9,
    niche: "Consumer Tech & Hardware Reviews",
    usCpmRange: "$8.00 – $20.00",
    estRpmRange: "$4.40 – $11.50",
    sponsorCpm: "$22 – $40",
    peakQuarter: "Q4 (Oct–Dec)",
    primaryAdvertisers: "Laptop makers, smartphone carriers, peripherals",
  },
  {
    rank: 10,
    niche: "Education, Coding & Upskilling",
    usCpmRange: "$6.00 – $16.00",
    estRpmRange: "$3.40 – $9.20",
    sponsorCpm: "$20 – $35",
    peakQuarter: "Q1 / Q3",
    primaryAdvertisers: "Coding bootcamps, certifications, edtech platforms",
  },
  {
    rank: 11,
    niche: "Health, Fitness & Longevity",
    usCpmRange: "$5.00 – $14.00",
    estRpmRange: "$2.80 – $7.80",
    sponsorCpm: "$18 – $34",
    peakQuarter: "Q1 (Jan–Feb)",
    primaryAdvertisers: "Wearables, supplements, telehealth, gym hardware",
  },
  {
    rank: 12,
    niche: "Travel & Premium Credit Cards",
    usCpmRange: "$4.50 – $13.50",
    estRpmRange: "$2.50 – $7.40",
    sponsorCpm: "$18 – $32",
    peakQuarter: "Q2 / Q3",
    primaryAdvertisers: "Airline loyalty cards, luggage, booking portals",
  },
];

const FORMAT_COMPARISON_ROWS = [
  {
    dimension: "Creator Revenue Share Split",
    longForm: "55% of Watch Page AdSense revenue",
    shorts: "45% of allocated Shorts Creator Pool (post music deduction)",
  },
  {
    dimension: "Tier-1 Average RPM (US / AU / CA / UK)",
    longForm: "$6.50 – $15.00 USD per 1,000 views",
    shorts: "$0.03 – $0.08 USD per 1,000 views",
  },
  {
    dimension: "High-CPM Niche Ceiling (Finance / SaaS US)",
    longForm: "$15.00 – $26.00+ RPM",
    shorts: "$0.08 – $0.14 RPM",
  },
  {
    dimension: "Global Multi-Region Blended RPM",
    longForm: "$1.80 – $4.50 USD per 1,000 views",
    shorts: "$0.015 – $0.045 USD per 1,000 views",
  },
  {
    dimension: "Views Required to Earn $1,000 AdSense (US Avg)",
    longForm: "~117,600 views (at $8.50 RPM)",
    shorts: "~20,000,000 views (at $0.05 RPM)",
  },
  {
    dimension: "Primary Strategic Role in 2026",
    longForm: "High-RPM revenue, mid-rolls, sponsorships & buyer intent",
    shorts: "Top-of-funnel subscriber acquisition & channel discovery",
  },
];

const REPORT_FAQS = [
  {
    question: "How much higher is Tier-1 YouTube RPM compared to Tier-3 markets in 2026?",
    answer:
      "On average, Tier-1 markets (United States ~$8.50 RPM, Switzerland ~$7.80 RPM, Australia ~$7.20 RPM, Canada ~$7.00 RPM, UK ~$6.50 RPM) pay 8x to 20x higher RPM per 1,000 views than Tier-3 markets ($0.20–$1.10 RPM) due to higher advertiser acquisition budgets.",
  },
  {
    question: "Why is Long-Form RPM roughly 100x+ higher than YouTube Shorts RPM?",
    answer:
      "Long-form videos serve pre-roll and mid-roll ads directly against high-intent content (paying creators 55% of gross revenue), whereas Shorts pool revenue across feed swipes, deduct commercial music licensing shares, and pay 45% of the remaining pool.",
  },
  {
    question: "Which YouTube niches command the highest advertiser CPM in 2026?",
    answer:
      "Personal Finance & Investing ($18–$48 US CPM), B2B SaaS ($16–$42 US CPM), Insurance & Legal Services ($15–$40 US CPM), and Real Estate ($12–$34 US CPM) lead advertiser auctions due to high customer lifetime value.",
  },
  {
    question: "What does YouTube's dateModified 2026-11-17 benchmark methodology measure?",
    answer:
      "Our report aggregates 52 country CPM/RPM planning bands, YouTube Partner Program revenue-share structures (55/45 split), and advertiser auction ranges by vertical for creator revenue forecasting.",
  },
];

export default function YouTubeCpmRpmBenchmarkReport2026() {
  const tier1Countries = countryCPMData.filter((c) => TIERS.TIER1.countries.includes(c.code));
  const tier2Tier3Countries = [
    ...countryCPMData.filter((c) => TIERS.TIER2.countries.includes(c.code)).slice(0, 6),
    ...countryCPMData.filter((c) => TIERS.TIER3.countries.includes(c.code)).slice(0, 8),
  ];

  const datasetSchema = getDatasetSchema({
    name: "2026 YouTube Creator Economy & CPM/RPM Benchmark Report",
    description:
      "2026 statistical benchmark dataset comparing Tier-1 vs Tier-2/3 country YouTube CPM/RPM rates, Long-Form vs Shorts monetization splits, and Top 12 highest-paying niches.",
    url: REPORT_URL,
    dateModified: REPORT_LAST_MODIFIED,
  });

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${REPORT_URL}#article`,
    headline: "2026 Creator Economy & YouTube CPM/RPM Benchmark Report",
    description:
      "Comprehensive 2026 data report comparing Tier-1 vs Tier-2/3 CPM/RPM across 52 countries, Long-Form vs Shorts RPM, and the Top 12 highest-paying YouTube niches.",
    datePublished: "2026-01-15",
    dateModified: REPORT_LAST_MODIFIED,
    image: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/research/youtube-cpm-rpm-report-2026/opengraph-image`,
      width: 1200,
      height: 630,
      representativeOfPage: true,
    },
    author: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
    },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": REPORT_URL,
    },
    about: [
      { "@type": "Thing", name: "YouTube CPM Rates" },
      { "@type": "Thing", name: "YouTube Creator Economy" },
      { "@type": "Thing", name: "YouTube AdSense RPM" },
    ],
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]"],
    },
  };

  const combinedSchema = combineSchemasToGraph(
    datasetSchema,
    articleSchema,
    getFAQSchema(REPORT_FAQS),
    getBreadcrumbSchema([
      { name: "Home", url: siteConfig.url },
      { name: "Resources", url: `${siteConfig.url}/resources` },
      { name: "2026 CPM & RPM Report", url: REPORT_URL },
    ]),
  );

  return (
    <>
      <GeoAeoHead
        {...GEO_AEO_PRESETS.resourcePage(
          "2026 Creator Economy & YouTube CPM/RPM Benchmark Report",
          `Primary benchmark dataset covering ${countryCPMData.length} countries (Tier-1 vs Tier-2/3), Long-Form vs Shorts RPM, and top 12 high-paying niches for 2026.`,
          "YouTube CPM & RPM Benchmarks 2026",
          "In 2026, Tier-1 long-form YouTube creators average roughly $4.00–$12.00 RPM across the US, UK, Canada, and Australia—5x to 15x higher than Tier-2/3 regions—while high-intent finance, B2B software, and insurance channels reach $18–$48 CPM versus $0.03–$0.09 RPM for YouTube Shorts.",
          [
            `Last updated: ${REPORT_LAST_MODIFIED}`,
            `${countryCPMData.length} countries benchmarked (Tier-1 vs Tier-2/3)`,
            "Long-Form ($4–$15 Tier-1 RPM) vs Shorts ($0.03–$0.09 RPM)",
            "Top 12 high-paying creator niches ranked by CPM and RPM",
          ],
          REPORT_LAST_MODIFIED,
        )}
        pathname={REPORT_PATH}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />

      <div className="min-h-screen py-8 sm:py-12 relative overflow-x-clip">
        <div className="nebula-bg" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <AdSectionIgnore>
            <div className="mb-6">
              <Breadcrumb
                items={[
                  { name: "Home", href: "/" },
                  { name: "Resources", href: "/resources" },
                  { name: "2026 CPM & RPM Report" },
                ]}
              />
            </div>
          </AdSectionIgnore>

          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
            <div className="lg:col-span-8 min-w-0 space-y-8">
              <AdSectionPrioritize>
                {/* Research Header */}
                <header className="card-3d rounded-3xl p-6 sm:p-8 relative overflow-hidden space-y-4">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-purple-600 to-indigo-600" />
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 font-extrabold uppercase tracking-wider">
                      <FaChartBar className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Primary Benchmark Dataset</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold">
                      Last Updated: {REPORT_LAST_MODIFIED}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                      {countryCPMData.length} Countries Audited
                    </span>
                  </div>

                  <h1
                    className="text-2xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight leading-tight"
                    data-speakable
                  >
                    2026 YouTube Creator Economy &amp; CPM/RPM Benchmark Report
                  </h1>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed" data-speakable>
                    Empirical AdSense &amp; sponsorship benchmark data comparing Tier-1 advertiser markets (US, UK, Canada, Australia, DACH) against Tier-2/3 regions, Long-Form vs. YouTube Shorts revenue splits, and the Top 12 highest-CPM verticals in 2026.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-1">
                    <Link
                      href="/tools/youtube-earnings-calculator"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
                    >
                      <FaDollarSign className="w-3.5 h-3.5" /> Interactive Earnings Calculator
                    </Link>
                    <Link
                      href="/tools/creator-tax-calculator"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-purple-400 text-slate-800 text-xs font-bold"
                    >
                      <span>US State Creator Tax Hub →</span>
                    </Link>
                  </div>
                </header>

                <AdSlot slot={AD_SLOTS.HEADER} preset="leaderboard" />

                <QuickAnswerCapsule
                  question="Key Findings: What do YouTube creators actually earn per 1,000 views in 2026?"
                  answer="Across 52 audited countries, Tier-1 English long-form channels earn $6.50–$15.00 USD average RPM ($8.50 US midpoint), while Finance and B2B SaaS topics clear $15–$26+ RPM. By contrast, YouTube Shorts averages $0.03–$0.08 RPM in Tier-1 feeds and $0.015–$0.045 globally."
                  keyPoints={[
                    "Tier-1 Long-Form Spread: $6.00–$15.00+ RPM vs Tier-3 $0.20–$1.10 RPM",
                    "Highest-Paying Vertical: Personal Finance ($18–$48 US CPM) & B2B SaaS ($16–$42 US CPM)",
                    "Long-Form vs Shorts Gap: ~117K US long-form views equal ~20M Shorts views for $1,000 AdSense",
                    "Creator Split: 55% Watch Page Long-Form vs 45% Shorts Creator Pool after music fees",
                  ]}
                  badgeText="2026 Executive Summary"
                />

                {/* Dataset 1: Tier-1 vs Tier-2/3 Country Benchmarks */}
                <section className="card-3d rounded-3xl p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                        Dataset Table 1 · Audience Geography
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-outfit mt-0.5 flex items-center gap-2">
                        <FaGlobeAmericas className="text-emerald-600" aria-hidden="true" />
                        <span>Tier-1 vs. Tier-2 &amp; Tier-3 YouTube CPM / RPM (2026)</span>
                      </h2>
                    </div>
                    <Link
                      href="/resources/youtube-cpm-rates"
                      className="text-xs font-bold text-purple-700 hover:underline"
                    >
                      View all {countryCPMData.length} countries →
                    </Link>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 mb-2">
                        Tier-1 Premium Markets ({tier1Countries.length} Countries)
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm border-collapse">
                          <thead>
                            <tr className="border-b-2 border-slate-200 bg-emerald-50/70 text-slate-800">
                              <th scope="col" className="py-2.5 px-3 font-extrabold">Country</th>
                              <th scope="col" className="py-2.5 px-3 font-extrabold">Currency</th>
                              <th scope="col" className="py-2.5 px-3 font-extrabold">CPM Range (USD)</th>
                              <th scope="col" className="py-2.5 px-3 font-extrabold">Avg CPM</th>
                              <th scope="col" className="py-2.5 px-3 font-extrabold">RPM Range (USD)</th>
                              <th scope="col" className="py-2.5 px-3 font-extrabold">Mid RPM</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {tier1Countries.map((c) => (
                              <tr key={c.code} className="hover:bg-slate-50/80">
                                <td className="py-2.5 px-3 font-bold text-slate-900">
                                  <Link
                                    href={`/tools/youtube-earnings-calculator/${c.slug}`}
                                    className="hover:text-purple-700 hover:underline"
                                  >
                                    {c.name} ({c.code})
                                  </Link>
                                </td>
                                <td className="py-2.5 px-3 text-slate-600 font-semibold">{c.currency}</td>
                                <td className="py-2.5 px-3">
                                  ${c.cpmRange.min.toFixed(2)} – ${c.cpmRange.max.toFixed(2)}
                                </td>
                                <td className="py-2.5 px-3 font-bold text-slate-900">
                                  ${c.cpmRange.avg.toFixed(2)}
                                </td>
                                <td className="py-2.5 px-3">
                                  ${c.rpmRange.min.toFixed(2)} – ${c.rpmRange.max.toFixed(2)}
                                </td>
                                <td className="py-2.5 px-3 font-black text-emerald-700">
                                  ${c.rpmRange.avg.toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                        Representative Tier-2 &amp; Tier-3 Markets Comparison
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm border-collapse">
                          <thead>
                            <tr className="border-b-2 border-slate-200 bg-slate-50 text-slate-800">
                              <th scope="col" className="py-2.5 px-3 font-extrabold">Country</th>
                              <th scope="col" className="py-2.5 px-3 font-extrabold">Tier</th>
                              <th scope="col" className="py-2.5 px-3 font-extrabold">CPM Range (USD)</th>
                              <th scope="col" className="py-2.5 px-3 font-extrabold">Avg CPM</th>
                              <th scope="col" className="py-2.5 px-3 font-extrabold">Mid RPM</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {tier2Tier3Countries.map((c) => {
                              const isTier2 = TIERS.TIER2.countries.includes(c.code);
                              return (
                                <tr key={c.code} className="hover:bg-slate-50/80">
                                  <td className="py-2.5 px-3 font-bold text-slate-900">
                                    <Link
                                      href={`/tools/youtube-earnings-calculator/${c.slug}`}
                                      className="hover:text-purple-700 hover:underline"
                                    >
                                      {c.name} ({c.code})
                                    </Link>
                                  </td>
                                  <td className="py-2.5 px-3">
                                    <span
                                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                        isTier2
                                          ? "bg-blue-50 text-blue-700"
                                          : "bg-slate-100 text-slate-700"
                                      }`}
                                    >
                                      {isTier2 ? "Tier 2" : "Tier 3"}
                                    </span>
                                  </td>
                                  <td className="py-2.5 px-3">
                                    ${c.cpmRange.min.toFixed(2)} – ${c.cpmRange.max.toFixed(2)}
                                  </td>
                                  <td className="py-2.5 px-3 font-semibold">${c.cpmRange.avg.toFixed(2)}</td>
                                  <td className="py-2.5 px-3 font-black text-slate-900">
                                    ${c.rpmRange.avg.toFixed(2)}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </section>

                <AdSlot slot={AD_SLOTS.IN_ARTICLE[0]} preset="in-article" lazy={false} />

                {/* Dataset 2: Long-Form vs Shorts RPM */}
                <section className="card-3d rounded-3xl p-6 sm:p-8 space-y-5">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700">
                      Dataset Table 2 · Format Economics
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-outfit mt-0.5 flex items-center gap-2">
                      <FaExchangeAlt className="text-purple-600" aria-hidden="true" />
                      <span>Long-Form Video vs. YouTube Shorts RPM Benchmark (2026)</span>
                    </h2>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="border-b-2 border-slate-200 bg-slate-50 text-slate-800">
                          <th scope="col" className="py-3 px-4 font-extrabold">Metric</th>
                          <th scope="col" className="py-3 px-4 font-extrabold text-emerald-700">
                            Long-Form (16:9 · 8+ min)
                          </th>
                          <th scope="col" className="py-3 px-4 font-extrabold text-rose-700">
                            YouTube Shorts (9:16 Feed)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {FORMAT_COMPARISON_ROWS.map((row) => (
                          <tr key={row.dimension} className="hover:bg-slate-50/80">
                            <td className="py-3 px-4 font-bold text-slate-900">{row.dimension}</td>
                            <td className="py-3 px-4 font-semibold text-emerald-800">{row.longForm}</td>
                            <td className="py-3 px-4 font-semibold text-slate-700">{row.shorts}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="pt-1 flex flex-wrap gap-3 text-xs font-bold">
                    <Link
                      href="/tools/youtube-shorts-vs-long-form-calculator"
                      className="text-purple-700 hover:underline inline-flex items-center gap-1"
                    >
                      Model Shorts vs. Long-Form Hourly Wage <FaArrowRight className="w-3 h-3" />
                    </Link>
                    <Link
                      href="/tools/youtube-shorts-music-royalty-split-calculator"
                      className="text-indigo-700 hover:underline inline-flex items-center gap-1"
                    >
                      Calculate Shorts Music Royalty Pool Deductions <FaArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </section>

                {/* Dataset 3: Top 12 High-Paying Niches */}
                <section className="card-3d rounded-3xl p-6 sm:p-8 space-y-5">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700">
                      Dataset Table 3 · Vertical Ad Auctions
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-outfit mt-0.5 flex items-center gap-2">
                      <FaTable className="text-indigo-600" aria-hidden="true" />
                      <span>Top 12 Highest-Paying YouTube Niches (2026 US Benchmarks)</span>
                    </h2>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="border-b-2 border-slate-200 bg-indigo-50/70 text-slate-800">
                          <th scope="col" className="py-3 px-3 font-extrabold">#</th>
                          <th scope="col" className="py-3 px-3 font-extrabold">Niche Vertical</th>
                          <th scope="col" className="py-3 px-3 font-extrabold">US Advertiser CPM</th>
                          <th scope="col" className="py-3 px-3 font-extrabold">Est. Long-Form RPM</th>
                          <th scope="col" className="py-3 px-3 font-extrabold">Sponsor CPM</th>
                          <th scope="col" className="py-3 px-3 font-extrabold">Peak Quarter</th>
                          <th scope="col" className="py-3 px-3 font-extrabold">Core Buyers</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {TOP_12_NICHES.map((row) => (
                          <tr key={row.rank} className="hover:bg-slate-50/80">
                            <td className="py-3 px-3 font-black text-slate-500">{row.rank}</td>
                            <td className="py-3 px-3 font-bold text-slate-900">{row.niche}</td>
                            <td className="py-3 px-3 font-semibold">{row.usCpmRange}</td>
                            <td className="py-3 px-3 font-black text-emerald-700">{row.estRpmRange}</td>
                            <td className="py-3 px-3 font-bold text-purple-700">{row.sponsorCpm}</td>
                            <td className="py-3 px-3 text-slate-600 font-semibold">{row.peakQuarter}</td>
                            <td className="py-3 px-3 text-slate-600">{row.primaryAdvertisers}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-2 text-xs sm:text-sm text-slate-700">
                    <p className="font-bold text-slate-900 flex items-center gap-2">
                      <FaCheckCircle className="text-emerald-600" />
                      Methodology, Sources &amp; Citation Note
                    </p>
                    <p>
                      <strong>What this data is:</strong> planning ranges, not official payouts. Each country&apos;s min/avg/max RPM is compiled by the site&apos;s author from publicly self-reported creator earnings (YouTube Studio revenue figures creators share publicly), cross-checked against niche-level advertiser patterns and seasonal ad-budget cycles, and last reviewed {DATA_LAST_REVIEWED}.
                    </p>
                    <p>
                      <strong>What it is not:</strong> YouTube and Google do not publish CPM or RPM by country or niche — any site claiming &ldquo;official 2026 YouTube CPM data&rdquo; is estimating. These figures are estimates too; we label them as such instead of presenting them as platform data.
                    </p>
                    <p>
                      <strong>How to use it:</strong> treat the ranges as a starting point, then replace them with your actual Studio RPM (Analytics → Revenue → Last 365 days), which is the only number that reflects your audience, niche, and content mix. Long-form figures assume the standard 55% AdSense split; Shorts figures reflect the 45% Shorts pool.
                    </p>
                    <p>
                      When citing in articles or research, link to{" "}
                      <code className="font-mono text-purple-700">{REPORT_URL}</code>.
                    </p>
                  </div>
                </section>
              </AdSectionPrioritize>

              <section data-speakable>
                <h2 className="text-2xl font-black text-slate-900 mb-5 font-outfit">
                  2026 CPM &amp; RPM Report FAQ
                </h2>
                <FaqAccordion items={REPORT_FAQS} headingLevel="h3" />
              </section>
            </div>

            <HighRpmSidebar
              stateTaxHref="/tools/creator-tax-calculator/california"
              stateTaxLabel="Explore US State Creator Tax Hub"
            />
          </div>

          <AdSlot slot={AD_SLOTS.MULTIPLEX} preset="multiplex" label="Recommended For Creators" />
        </div>
      </div>
    </>
  );
}
