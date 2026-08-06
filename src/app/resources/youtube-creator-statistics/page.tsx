import Link from "next/link";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import {
  getFAQSchema,
  getBreadcrumbSchema,
  getSpeakableSchema,
  getDatasetSchema,
} from "@/lib/seo";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import {
  citableFacts,
  DATA_LAST_REVIEWED,
  nicheRpmRanking,
  subscriberBenchmarks,
} from "@/lib/seo-data";
import GoogleAd from "@/components/ads/GoogleAd";

const pagePath = "/resources/youtube-creator-statistics";
const pageUrl = `${siteConfig.url}${pagePath}`;

const pageFaqs = [
  {
    question: "What is a good YouTube RPM in 2026?",
    answer: `Planning ranges vary widely by niche and audience country. Many channels see roughly ${citableFacts.globalCpmRough} CPM-equivalent pressure globally, while US-leaning finance and tech niches can plan much higher RPM. Use country CPM data and the earnings calculator for scenario planning.`,
  },
  {
    question: "How much do YouTube creators earn with 10,000 subscribers?",
    answer:
      "There is no fixed payout by subscriber count. A 10k-sub channel might earn a few hundred dollars monthly from AdSense if views and RPM are modest, or several thousand if views, Tier-1 audience share, and sponsorships are strong.",
  },
  {
    question: "Do Shorts contribute meaningfully to creator revenue in 2026?",
    answer:
      "Shorts can contribute a meaningful share of revenue for some creators, but RPM is usually lower than long-form. Many channels use Shorts for reach and long-form for monetization depth.",
  },
  {
    question: "Where can I estimate earnings by country?",
    answer:
      "Use the free YouTube Earnings Calculator and the CPM rates resource on YouTube Tools Hub for country-level planning ranges across 50+ markets.",
  },
];

export const metadata: Metadata = {
  title: "YouTube Creator Statistics 2026 - Views, Earnings & Growth Data",
  description:
    "YouTube creator statistics for 2026: RPM by niche ranges, subscriber milestone benchmarks, platform scale, and links to free CPM/earnings tools.",
  keywords: [
    "youtube statistics",
    "youtube creator earnings",
    "youtube rpm by niche",
    "youtube growth statistics",
    "youtube creator data",
    "youtube statistics 2026",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "YouTube Creator Statistics 2026 | Data & Insights",
    description:
      "Data-backed YouTube statistics every creator should know. Earnings, RPM, growth trends, and platform insights for 2026.",
    type: "website",
    url: pageUrl,
    images: [{ url: `${siteConfig.url}/og-image.png`, width: 1200, height: 630 }],
  },
  alternates: {
    canonical: pageUrl,
  },
};

export default function YouTubeStatistics() {
  const faqSchema = getFAQSchema(pageFaqs);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Resources", url: `${siteConfig.url}/resources` },
    { name: "YouTube Creator Statistics 2026", url: pageUrl },
  ]);
  const speakableSchema = getSpeakableSchema({
    url: pageUrl,
    headline: "YouTube Creator Statistics 2026",
    summary:
      "YouTube creator earnings depend on views, niche RPM, and audience country more than subscriber count alone. Finance and tech niches with Tier-1 audiences typically plan higher RPM than entertainment or gaming.",
    cssSelectors: ["h1", ".summary", "[data-speakable]"],
  });
  const datasetSchema = getDatasetSchema({
    name: "YouTube Creator Statistics and RPM Benchmarks 2026",
    description:
      "Directional YouTube creator statistics including niche RPM ranking context and subscriber milestone planning notes for 2026.",
    url: pageUrl,
    dateModified: DATA_LAST_REVIEWED,
  });

  return (
    <>
      <GeoAeoHead
        {...GEO_AEO_PRESETS.resourcePage(
          "YouTube Creator Statistics 2026",
          "RPM by niche, subscriber milestones, and platform-scale context for YouTube creators in 2026.",
          "YouTube Creator Statistics",
          "YouTube creator earnings depend on views, niche RPM, and audience geography more than subscriber count alone. Use country CPM data and niche benchmarks for planning.",
          [
            `Data last reviewed: ${DATA_LAST_REVIEWED}`,
            "RPM varies more by country + niche than by sub count",
            "Finance/tech niches typically out-earn entertainment on RPM",
            "Pair stats with the free earnings calculator for scenarios",
          ],
        )}
        pathname={pagePath}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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

      <div className="min-h-screen py-20 relative overflow-hidden">
        <div className="nebula-bg" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="flex items-center gap-2 text-sm text-slate-500 mb-8"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-purple-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/resources/youtube-cpm-rates"
              className="hover:text-purple-600 transition-colors"
            >
              Resources
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">YouTube Statistics</span>
          </nav>

          <div className="text-center mb-16">
            <h1
              className="text-4xl md:text-6xl font-bold text-slate-900 mb-6"
              data-speakable
            >
              YouTube Creator Statistics 2026
            </h1>
            <p
              className="text-xl text-slate-600 max-w-3xl mx-auto summary"
              data-speakable
            >
              Data-backed planning ranges for earnings, RPM by niche, and growth
              milestones. Last reviewed {DATA_LAST_REVIEWED}. Figures are
              directional estimates for creators — not guaranteed payouts.
            </p>
          </div>

          <div className="glass-premium rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Platform Overview
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="text-4xl font-bold text-purple-600 mb-2">3B+</div>
                <div className="text-slate-600">Monthly Searches</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="text-4xl font-bold text-purple-600 mb-2">2.7B</div>
                <div className="text-slate-600">Active Users</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="text-4xl font-bold text-purple-600 mb-2">500hr</div>
                <div className="text-slate-600">Uploaded/Minute</div>
              </div>
            </div>
          </div>

          {/* Ad placement */}
          <div className="my-8" aria-hidden="true">
            <GoogleAd layout="in-article" format="fluid" slot="2084309959" style={{ display: "block", textAlign: "center" }} />
          </div>

          <div className="glass-premium rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Niche RPM ranking context
            </h2>
            <p className="text-slate-600 mb-6">
              Relative earning potential (not fixed rates). Pair with{" "}
              <Link
                href="/resources/youtube-cpm-rates"
                className="text-purple-600 font-semibold hover:underline"
              >
                CPM by country
              </Link>{" "}
              for geography effects.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-4 px-4 font-bold text-slate-900">
                      Niche
                    </th>
                    <th className="text-right py-4 px-4 font-bold text-slate-900">
                      Context
                    </th>
                    <th className="text-right py-4 px-4 font-bold text-slate-900">
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  {nicheRpmRanking.map((row) => (
                    <tr key={row.label} className="border-b border-slate-100">
                      <td className="py-4 px-4 font-medium text-slate-900">
                        {row.label}
                      </td>
                      <td className="text-right py-4 px-4 font-semibold text-green-700">
                        {row.value}
                      </td>
                      <td className="text-right py-4 px-4 text-sm">
                        {row.note || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-premium rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Subscriber milestone planning
            </h2>
            <div className="space-y-4">
              {subscriberBenchmarks.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-4 bg-slate-50 rounded-lg"
                >
                  <span className="font-semibold text-slate-900">{row.label}</span>
                  <span className="text-slate-600 text-sm sm:text-right">
                    {row.value}
                    {row.note ? ` — ${row.note}` : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-premium rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Key insights for 2026
            </h2>
            <ul className="space-y-4 text-slate-600 key-facts">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold">•</span>
                <span>
                  <strong>Audience geography matters:</strong> US/UK/CA/AU
                  viewers typically support higher RPM than global averages (
                  preferred planning citation: {citableFacts.preferredCitation}).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold">•</span>
                <span>
                  <strong>YPP threshold:</strong> {citableFacts.yppWatchHours}.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold">•</span>
                <span>
                  <strong>Mid-rolls:</strong> videos{" "}
                  {citableFacts.midRollMinutes} usually unlock more ad inventory.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold">•</span>
                <span>
                  <strong>CTR health:</strong> many channels aim for about{" "}
                  {citableFacts.healthyCtr}.
                </span>
              </li>
            </ul>
          </div>

          {/* Ad placement */}
          <div className="my-8" aria-hidden="true">
            <GoogleAd slot="8649718301" />
          </div>

          <section className="glass-premium rounded-2xl p-8 mb-12" aria-labelledby="stats-faq">
            <h2 id="stats-faq" className="text-3xl font-bold text-slate-900 mb-8">
              Creator statistics FAQ
            </h2>
            <div className="space-y-6">
              {pageFaqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-bold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools/youtube-earnings-calculator"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-lg"
            >
              Calculate Your Potential Earnings
            </Link>
            <Link
              href="/resources/youtube-cpm-rates"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 hover:border-purple-300 text-slate-900 rounded-xl font-bold transition-all"
            >
              View CPM by Country
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
