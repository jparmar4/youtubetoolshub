import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getToolBySlug, tools } from "@/config/tools";
import { countryCPMData, nicheCPMData } from "@/lib/cpm-data";
import {
  getSoftwareApplicationSchema,
  getFAQSchema,
  getHowToSchema,
  getBreadcrumbSchema,
  getSpeakableSchema,
  getDatasetSchema,
  getGlobalAlternates,
} from "@/lib/seo";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import Breadcrumb from "@/components/ui/Breadcrumb";
import EarningsCalculator from "@/components/tools/EarningsCalculator";
import { ToolContextProvider } from "@/components/tools/ToolContext";
import HorizontalAd from "@/components/ads/HorizontalAd";
import MultiplexAd from "@/components/ads/MultiplexAd";
import AffiliateBanner from "@/components/ads/AffiliateBanner";
import BlogSidebar from "@/components/blog/BlogSidebar";
import ShareButtons from "@/components/ui/ShareButtons";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import {
  getPriorityTools,
  getRelatedToolsForPost,
} from "@/lib/related-tools";
import {
  FaCalculator,
  FaGlobeAmericas,
  FaChartLine,
  FaLightbulb,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const tool = getToolBySlug("youtube-earnings-calculator")!;
const pageUrl = `${siteConfig.url}/tools/youtube-earnings-calculator`;

export const metadata: Metadata = {
  title:
    "YouTube Earnings Calculator 2026 — Free RPM, CPM & AdSense Estimator",
  description:
    "Free YouTube earnings calculator: estimate AdSense revenue from views and RPM, compare CPM by country, and plan channel income for 2026. Instant results, no signup.",
  keywords: [
    "youtube earnings calculator",
    "youtube money calculator",
    "youtube rpm calculator",
    "youtube cpm calculator",
    "how much does youtube pay per 1000 views",
    "youtube adsense calculator",
    "youtube revenue calculator 2026",
    "youtube monetization calculator",
    "how much youtube pays per view",
    "youtube income estimator",
  ],
  alternates: getGlobalAlternates("/tools/youtube-earnings-calculator"),
  openGraph: {
    title: "YouTube Earnings Calculator 2026 | Free RPM & CPM Estimator",
    description:
      "Estimate monthly and yearly YouTube AdSense revenue from views and RPM. Country CPM data for 50+ markets. Free, no signup.",
    type: "website",
    url: pageUrl,
    // Dynamic image: /tools/youtube-earnings-calculator/opengraph-image
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Earnings Calculator 2026",
    description:
      "Free YouTube money calculator with RPM, CPM by country, and sponsorship estimates.",
  },
  other: {
    "pinterest:media": `${siteConfig.url}/tools/youtube-earnings-calculator/pinterest-image`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const pillarFAQs = [
  {
    question: "How much does YouTube pay per 1,000 views in 2026?",
    answer:
      "Most creators earn about $0.25–$12 per 1,000 views (RPM), depending on audience country and niche. US viewers often yield $4–$15 RPM; India and many Tier 3 markets may be under $1 RPM. Enter your views and an RPM estimate in this free calculator for a planning range, then confirm with YouTube Studio.",
  },
  {
    question: "What is the difference between YouTube CPM and RPM?",
    answer:
      "CPM is what advertisers pay per 1,000 ad impressions. RPM is what you earn per 1,000 video views after YouTube’s revenue share and after accounting for views without ads. Use RPM in this calculator because it maps more closely to creator payouts.",
  },
  {
    question: "How much can you make from 1 million YouTube views?",
    answer:
      "At $2 RPM, 1 million views is about $2,000. At $5 RPM, about $5,000. At $10 RPM (strong Tier 1 + high-intent niche), about $10,000. These are AdSense estimates only and exclude sponsorships, memberships, and affiliates.",
  },
  {
    question: "Is this YouTube earnings calculator free?",
    answer:
      "Yes. The AdSense RPM estimator is free with no signup. Optional sponsorship estimates may use AI generation with fair-use daily limits.",
  },
  {
    question: "How accurate is a YouTube money calculator?",
    answer:
      "It is a planning model, not a guarantee. Real earnings depend on ad fill rate, seasonality, content category, viewer location, and YouTube’s policies. Always treat outputs as ranges and verify in YouTube Studio Analytics.",
  },
  {
    question: "Do YouTube Shorts pay the same as long-form?",
    answer:
      "Usually no. Shorts typically earn far less per 1,000 views than long-form videos with mid-roll ads. Model Shorts and long-form separately when planning income.",
  },
  {
    question: "Which countries pay the most on YouTube?",
    answer:
      "Tier 1 markets such as the United States, Australia, United Kingdom, Canada, and parts of Western Europe generally have the highest CPMs. Use country pages linked below for localized estimates.",
  },
  {
    question: "How do I increase my YouTube RPM?",
    answer:
      "Attract more Tier 1 viewers, create 8+ minute videos for mid-rolls, cover higher-intent topics (finance, software, B2B), enable more ad formats, and improve retention so more ads are watched.",
  },
];

const exampleRows = [
  { views: 1_000, rpm: 2, label: "1K views @ $2 RPM" },
  { views: 10_000, rpm: 3, label: "10K views @ $3 RPM" },
  { views: 100_000, rpm: 5, label: "100K views @ $5 RPM" },
  { views: 1_000_000, rpm: 4, label: "1M views @ $4 RPM" },
  { views: 1_000_000, rpm: 10, label: "1M views @ $10 RPM (strong Tier 1)" },
];

function money(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function YouTubeEarningsCalculatorPage() {
  const topCountries = countryCPMData.slice(0, 12);
  const relatedTools = getRelatedToolsForPost(
    {
      title: "YouTube Earnings Calculator",
      keywords: tool.keywords,
      category: "Monetization",
      slug: tool.slug,
    },
    5,
  ).filter((t) => t.slug !== tool.slug);

  const softwareSchema = getSoftwareApplicationSchema({
    name: "YouTube Earnings Calculator",
    description:
      "Free YouTube earnings calculator to estimate AdSense revenue from views and RPM, with country CPM context and sponsorship planning ranges.",
    url: pageUrl,
    category: "analytics-earnings",
    datePublished: "2025-01-01",
    dateModified: "2026-07-15",
  });

  const faqSchema = getFAQSchema(pillarFAQs);
  const howToSchema = getHowToSchema({
    name: "How to estimate YouTube earnings with this free calculator",
    description:
      "Estimate monthly and yearly YouTube AdSense revenue from monthly views and RPM.",
    totalTime: "PT2M",
    steps: [
      {
        name: "Enter monthly views",
        text: "Use YouTube Studio for average monthly views (or expected views for planning).",
      },
      {
        name: "Set an RPM estimate",
        text: "Start with $2–$4 global average, $6–$12 for strong US audiences, or your real RPM from Analytics.",
      },
      {
        name: "Review monthly and yearly ranges",
        text: "Use the projection for planning only. Confirm actual payouts in YouTube Studio and AdSense.",
      },
    ],
  });
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Tools", url: `${siteConfig.url}/tools` },
    { name: "YouTube Earnings Calculator", url: pageUrl },
  ]);
  const speakableSchema = getSpeakableSchema({
    url: pageUrl,
    headline:
      "YouTube Earnings Calculator 2026 — Free RPM, CPM & AdSense Estimator",
    summary:
      "Free YouTube earnings calculator that estimates AdSense revenue from views and RPM, with country CPM context for 50+ markets.",
    cssSelectors: ["h1", "[data-speakable]", ".summary", ".key-facts"],
  });
  const datasetSchema = {
    ...getDatasetSchema(),
    dateModified: "2026-07-15",
  };

  return (
    <>
      <GeoAeoHead
        {...GEO_AEO_PRESETS.toolPage(
          "YouTube Earnings Calculator",
          "Free YouTube earnings calculator with RPM/CPM estimates by country and niche.",
          "analytics-earnings",
        )}
        conciseAnswer="A free YouTube earnings calculator estimates AdSense revenue as (monthly views ÷ 1000) × RPM. Typical RPM ranges from about $0.25 to $12+ depending on country and niche."
        keyFacts={[
          "Formula: earnings ≈ (views / 1000) × RPM",
          "US RPM often $4–$15; global average often $2–$4",
          "50+ country CPM/RPM reference pages",
          "Free AdSense estimator — no signup",
        ]}
        dateModified="2026-07-15"
        pathname="/tools/youtube-earnings-calculator"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />

      <div className="min-h-screen py-10 lg:py-16 relative overflow-hidden">
        <div className="nebula-bg" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "Tools", href: "/tools" },
                { name: "Earnings Calculator" },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              {/* Hero / AEO answer */}
              <header className="space-y-5">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                  <FaCalculator /> Free · No signup · 2026 data
                </span>
                <h1
                  className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight"
                  data-speakable
                >
                  YouTube Earnings Calculator — Estimate AdSense Revenue by
                  Views &amp; RPM (2026)
                </h1>
                <p
                  className="text-lg md:text-xl text-slate-600 leading-relaxed summary"
                  data-speakable
                >
                  Use this free YouTube money calculator to estimate monthly and
                  yearly AdSense income from your views and RPM. Compare country
                  CPM/RPM ranges, model high-intent niches, and plan channel
                  revenue before you publish.
                </p>

                <div
                  className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/80 p-5 key-facts"
                  data-speakable
                >
                  <h2 className="text-base font-bold text-emerald-900 mb-2">
                    Quick answer: How much does YouTube pay?
                  </h2>
                  <p className="text-slate-700 leading-relaxed">
                    <strong>
                      Estimated earnings ≈ (monthly views ÷ 1,000) × RPM.
                    </strong>{" "}
                    Example: 100,000 views × $5 RPM ≈{" "}
                    <strong>$500/month</strong> in ad revenue. Real payouts vary
                    by country, niche, seasonality, and ad fill rate — confirm in
                    YouTube Studio.
                  </p>
                </div>
              </header>

              {/* Calculator */}
              <section
                id="calculator"
                className="rounded-3xl border border-slate-200 bg-white/80 shadow-xl shadow-emerald-900/5 overflow-hidden"
              >
                <ToolContextProvider value={{ hideHeader: true }}>
                  <EarningsCalculator />
                </ToolContextProvider>
              </section>

              <HorizontalAd />

              <AffiliateBanner toolId="vidiq" variant="inArticle" />

              {/* Example table */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <FaChartLine className="text-emerald-600" />
                  Example YouTube earnings by views
                </h2>
                <p className="text-slate-600 mb-6">
                  Planning examples only. Your Studio RPM is the ground truth.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm md:text-base">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="py-3 pr-4 font-semibold">Scenario</th>
                        <th className="py-3 pr-4 font-semibold">Views</th>
                        <th className="py-3 pr-4 font-semibold">RPM</th>
                        <th className="py-3 font-semibold">Est. revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exampleRows.map((row) => (
                        <tr
                          key={row.label}
                          className="border-b border-slate-100 last:border-0"
                        >
                          <td className="py-3 pr-4 font-medium text-slate-800">
                            {row.label}
                          </td>
                          <td className="py-3 pr-4 text-slate-600">
                            {row.views.toLocaleString()}
                          </td>
                          <td className="py-3 pr-4 text-slate-600">
                            ${row.rpm.toFixed(2)}
                          </td>
                          <td className="py-3 font-bold text-emerald-700">
                            {money((row.views / 1000) * row.rpm)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* CPM vs RPM */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  YouTube CPM vs RPM (simple explanation)
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-xl bg-slate-50 p-5 border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-2">CPM</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Cost Per Mille — what advertisers pay for 1,000 ad
                      impressions. Higher in finance, software, and Tier 1
                      countries.
                    </p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-5 border border-emerald-100">
                    <h3 className="font-bold text-slate-900 mb-2">RPM</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Revenue Per Mille — what you earn per 1,000 video views
                      after YouTube’s cut and non-monetized views. Use RPM in
                      this calculator.
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Rule of thumb: if advertisers pay $10 CPM and half of views
                  show ads, your RPM is often roughly half of CPM after
                  platform share — but your Studio number is definitive. Full
                  country tables live on our{" "}
                  <Link
                    href="/resources/youtube-cpm-rates"
                    className="text-purple-600 font-semibold hover:underline"
                  >
                    YouTube CPM rates by country
                  </Link>{" "}
                  guide.
                </p>
              </section>

              {/* Countries */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <FaGlobeAmericas className="text-blue-600" />
                  Calculate earnings by country
                </h2>
                <p className="text-slate-600 mb-6">
                  Open a localized calculator for CPM/RPM context in that market.
                </p>
                <div className="flex flex-wrap gap-2">
                  {topCountries.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/tools/youtube-earnings-calculator/${c.slug}`}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
                    >
                      <span>{c.flag}</span>
                      {c.name}
                      <span className="text-xs text-slate-500">
                        ~${c.rpmRange.avg.toFixed(1)} RPM
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/resources/youtube-cpm-rates"
                  className="inline-flex items-center gap-2 mt-6 text-purple-600 font-bold hover:underline"
                >
                  View all 50+ country CPM rates
                  <FaArrowRight className="w-3 h-3" />
                </Link>
              </section>

              {/* Niche table */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  YouTube CPM by niche (indicative 2026)
                </h2>
                <p className="text-slate-600 mb-6">
                  High-intent niches attract better advertisers. Use these as
                  RPM/CPM starting points, not guarantees.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="py-2 pr-3 font-semibold">Niche</th>
                        <th className="py-2 pr-3 font-semibold">Avg CPM</th>
                        <th className="py-2 font-semibold">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nicheCPMData.slice(0, 8).map((n) => (
                        <tr
                          key={n.niche}
                          className="border-b border-slate-100 last:border-0 align-top"
                        >
                          <td className="py-3 pr-3 font-medium text-slate-800">
                            {n.niche}
                          </td>
                          <td className="py-3 pr-3 text-emerald-700 font-semibold whitespace-nowrap">
                            ${n.avgCPM.min}–${n.avgCPM.max}
                          </td>
                          <td className="py-3 text-slate-600">{n.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* How to increase */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FaLightbulb className="text-amber-500" />
                  How to increase YouTube earnings
                </h2>
                <ul className="space-y-3 text-slate-700">
                  {[
                    "Target more viewers in Tier 1 countries (US, UK, CA, AU, DE).",
                    "Publish 8+ minute videos so mid-roll ads can run.",
                    "Cover higher-intent topics (finance, software, business tools).",
                    "Improve CTR with stronger titles/thumbnails so more people start the video.",
                    "Improve retention so more ads are completed — pair with our free SEO and thumbnail tools.",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <FaCheckCircle className="text-emerald-500 mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/tools/youtube-title-generator"
                    className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-bold hover:bg-purple-700"
                  >
                    Title Generator
                  </Link>
                  <Link
                    href="/tools/youtube-thumbnail-downloader"
                    className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-bold hover:bg-slate-800"
                  >
                    Thumbnail Downloader
                  </Link>
                  <Link
                    href="/resources/youtube-cpm-rates"
                    className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-800 hover:border-purple-400"
                  >
                    CPM rates by country
                  </Link>
                </div>
              </section>

              {/* FAQ */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  YouTube earnings calculator FAQ
                </h2>
                <div className="space-y-5">
                  {pillarFAQs.map((faq) => (
                    <div key={faq.question}>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 text-sm text-amber-900">
                <strong>Disclaimer:</strong> Estimates are for educational
                planning only. YouTube Tools Hub is not affiliated with YouTube
                or Google. Actual revenue depends on AdSense, policies,
                seasonality, and your audience.
              </div>

              <ShareButtons
                url={pageUrl}
                title="YouTube Earnings Calculator 2026"
                description="Free YouTube money calculator with RPM and country CPM estimates."
              />

              <NewsletterSignup />
            </div>

            <div className="max-lg:hidden">
              <BlogSidebar
                relatedTools={relatedTools}
                popularTools={getPriorityTools(6)}
              />
            </div>
          </div>

          {/* Related tools strip */}
          <section className="mt-16 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Related free creator tools
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.concat(
                tools
                  .filter((t) =>
                    [
                      "youtube-tag-generator",
                      "youtube-channel-audit",
                      "youtube-engagement-rate-calculator",
                    ].includes(t.slug),
                  )
                  .filter(
                    (t) => !relatedTools.some((r) => r.slug === t.slug),
                  ),
              )
                .slice(0, 6)
                .map((t) => (
                  <Link
                    key={t.slug}
                    href={`/tools/${t.slug}`}
                    className="rounded-xl border border-slate-200 bg-white p-4 hover:border-purple-400 hover:shadow-md transition-all"
                  >
                    <span className="font-bold text-slate-900 block mb-1">
                      {t.name}
                    </span>
                    <span className="text-sm text-slate-500">
                      {t.shortDescription}
                    </span>
                  </Link>
                ))}
            </div>
          </section>

          <MultiplexAd />
        </div>
      </div>
    </>
  );
}
