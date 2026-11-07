import Link from "next/link";
import { Metadata } from "next";
import { ToolCard } from "@/components/ui/Card";
import ToolIcon3D from "@/components/ui/ToolIcon3D";
import { tools, toolCategories, getToolsByCategory } from "@/config/tools";
import {
  getToolListSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getGlobalAlternates,
} from "@/lib/seo";
import { siteConfig } from "@/config/site";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { Fragment } from "react";
import GoogleAd from "@/components/ads/GoogleAd";
import { AD_SLOTS, pickInArticleSlot } from "@/lib/adsense";
import {
  FaCalculator,
  FaHandshake,
  FaFileInvoiceDollar,
  FaBuilding,
  FaCoins,
  FaChartLine,
  FaArrowRight,
  FaBolt,
  FaClock,
  FaBalanceScale,
  FaAward,
} from "react-icons/fa";

const toolsPageFaqs = [
  {
    question: "Are YouTube Tools Hub tools free?",
    answer:
      "Yes. Core tools including the thumbnail downloader, title generator, tag generator, and earnings calculator are free with no signup required.",
  },
  {
    question: "Do I need to install a browser extension?",
    answer:
      "No. Every tool runs in the browser at youtubetoolshub.com. You do not need TubeBuddy, VidIQ, or any extension to use the suite.",
  },
  {
    question: "What free YouTube SEO tools are included?",
    answer:
      "Title generator, tag generator, tag extractor, description generator, hashtag generator, timestamp generator, and channel audit tools for metadata and growth.",
  },
  {
    question: "Can I estimate YouTube earnings by country?",
    answer:
      "Yes. The YouTube Earnings Calculator uses country-level CPM and RPM planning ranges for 50+ markets, including the US, UK, Canada, Australia, and India.",
  },
];

export const metadata: Metadata = {
  title: `All Free YouTube Tools — ${tools.length} Creator Tools, No Signup`,
  description:
    `Browse all ${tools.length} free YouTube tools by category: thumbnails, titles and tags, channel growth, earnings calculators, and utilities. No signup or extension.`,
  keywords: [
    "free youtube tools",
    "youtube thumbnail downloader",
    "youtube tag generator",
    "youtube title generator",
    "youtube earnings calculator",
    "youtube seo tools free",
    "tubebuddy alternative free",
    "vidiq alternative free",
    "youtube channel audit",
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
    title: { absolute: "All Free YouTube Tools | YouTube Tools Hub" },
    description:
      `Browse ${tools.length} free tools by category: thumbnails, titles, tags, earnings, and channel growth. No signup required.`,
    type: "website",
    url: `${siteConfig.url}/tools`,
  },
  alternates: getGlobalAlternates("/tools"),
};

export default function ToolsPage() {
  // Generate JSON-LD schemas
  const toolListSchema = getToolListSchema(
    tools.map((tool) => ({
      name: tool.name,
      url: `${siteConfig.url}/tools/${tool.slug}`,
      description: tool.shortDescription,
    })),
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Tools", url: `${siteConfig.url}/tools` },
  ]);

  const faqSchema = getFAQSchema(toolsPageFaqs);

  return (
    <>
      {/* GEO/AEO Head for AI discoverability */}
      <GeoAeoHead
        title={`${tools.length} Free YouTube Tools – Creator Suite for Creators`}
        description="A free suite of creator tools, including AI-assisted generators. Download thumbnails, generate title ideas, calculate earnings, and optimize your channel SEO."
        entityType="WebPage"
        primaryTopic="YouTube Creator Tools Suite"
        conciseAnswer={`YouTube Tools Hub offers ${tools.length} free creator tools for YouTube creators including thumbnail downloader, title generator, tag extractor, earnings calculator, and channel audit. No signup required.`}
        keyFacts={[
          `${tools.length} free creator tools`,
          "No signup or browser extension required",
          "Tools organized into 5 categories: Thumbnail, SEO, Growth, Analytics, Utility",
          "Free alternative to TubeBuddy and VidIQ",
        ]}
        pathname="/tools"
      />
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolListSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen py-16 sm:py-20 relative overflow-hidden bg-slate-50">
        {/* UHD Spatial Background Decorations */}
        <div className="nebula-bg" />
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-purple-100/40 via-blue-50/20 to-transparent -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-in-up">
            <span className="inline-block py-1.5 px-4 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_6px_20px_rgba(124,58,237,0.28),inset_0_1px_0_rgba(255,255,255,0.25)]">
              {tools.length} Free Creator Tools · 4K UHD · No Signup
            </span>
            <h1
              className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight font-outfit"
              data-speakable
            >
              All {tools.length} Free YouTube Tools
            </h1>
            <p
              className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-outfit summary"
              data-speakable
            >
              Streamline your YouTube workflow: download full HD &amp; 4K thumbnails, generate high-CTR titles and tags, calculate country-level AdSense payouts, estimate tax deductions, and grow without extensions.
            </p>

            {/* Quick Category Chips */}
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mt-8">
              <a
                href="#tier1-calculators"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-xs hover:scale-105 transition-all"
              >
                <FaBolt className="w-3 h-3 text-amber-300" />
                <span>Tier 1 Money &amp; Tax Suite</span>
              </a>
              {toolCategories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-purple-400 hover:text-purple-700 text-xs font-semibold shadow-2xs transition-all"
                >
                  {cat.name.replace(" Tools", "")} ({getToolsByCategory(cat.id).length})
                </a>
              ))}
            </div>
          </div>

          {/* Above-the-fold Ad Placement */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 bg-white/90 backdrop-blur-sm p-3 text-center min-h-[90px] flex flex-col items-center justify-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 text-center">Advertisement</p>
            <GoogleAd slot={AD_SLOTS.HEADER} lazy={false} responsive className="w-full text-center" />
          </div>

          {/* Tier 1 Commercial Stack Spotlight */}
          <div id="tier1-calculators" className="mb-20 scroll-mt-24">
            <div className="bg-slate-950 uhd-dark-grid border border-purple-500/30 rounded-3xl p-6 sm:p-10 text-white shadow-[0_28px_60px_-15px_rgba(15,23,42,0.5)] relative overflow-hidden">
              <div className="absolute inset-x-12 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent" />
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                      High-RPM Monetization &amp; Planning
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                      Tier 1 Creator Financial &amp; Tax Suite
                    </h2>
                    <p className="text-slate-300 text-sm mt-1 max-w-xl">
                      Commercial calculators designed specifically for creators targeting high advertiser CPMs in the US, UK, Canada, Australia, and Germany.
                    </p>
                  </div>
                  <Link
                    href="/resources/youtube-cpm-rates"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md self-start md:self-auto"
                  >
                    <span>Country CPM Benchmarks</span>
                    <FaArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      name: "YouTube Earnings Calculator",
                      href: "/tools/youtube-earnings-calculator",
                      desc: "Estimate monthly and yearly AdSense by country and RPM.",
                      badge: "50+ Markets",
                      icon: FaCalculator,
                      color: "text-emerald-400 bg-emerald-950/60 border-emerald-800/60",
                    },
                    {
                      name: "Sponsorship Rate Calculator",
                      href: "/tools/youtube-sponsorship-calculator",
                      desc: "Calculate 60s integrations, 30s shoutouts, and pitch templates.",
                      badge: "Media Kit",
                      icon: FaHandshake,
                      color: "text-amber-400 bg-amber-950/60 border-amber-800/60",
                    },
                    {
                      name: "US Tax Deduction Estimator",
                      href: "/tools/youtube-tax-deduction-calculator",
                      desc: "Model IRS Schedule C & 1099 write-offs on cameras, studio & tech.",
                      badge: "IRS & HMRC",
                      icon: FaFileInvoiceDollar,
                      color: "text-blue-400 bg-blue-950/60 border-blue-800/60",
                    },
                    {
                      name: "LLC vs S-Corp Tax Savings",
                      href: "/tools/youtube-llc-vs-s-corp-tax-savings-calculator",
                      desc: "Discover how S-Corp saves $4k–$12k in self-employment tax.",
                      badge: "Tax Strategy",
                      icon: FaBuilding,
                      color: "text-purple-400 bg-purple-950/60 border-purple-800/60",
                    },
                    {
                      name: "Channel Valuation Calculator",
                      href: "/tools/youtube-channel-valuation-calculator",
                      desc: "Estimate channel exit value based on 24x–36x net profit multiples.",
                      badge: "Asset Exit",
                      icon: FaCoins,
                      color: "text-rose-400 bg-rose-950/60 border-rose-800/60",
                    },
                    {
                      name: "YouTube Ads Cost Calculator",
                      href: "/tools/youtube-ads-cost-calculator",
                      desc: "Model CPV and budget requirements to promote YouTube videos.",
                      badge: "Google Ads",
                      icon: FaChartLine,
                      color: "text-teal-400 bg-teal-950/60 border-teal-800/60",
                    },
                    {
                      name: "4,000 Watch Hours Planner",
                      href: "/tools/youtube-watch-hours-calculator",
                      desc: "Calculate views and pace needed to unlock YPP monetization.",
                      badge: "YPP Monetization",
                      icon: FaClock,
                      color: "text-emerald-400 bg-emerald-950/60 border-emerald-800/60",
                    },
                    {
                      name: "Shorts vs. Long-Form Profitability",
                      href: "/tools/youtube-shorts-vs-long-form-calculator",
                      desc: "Compare AdSense yield, editing effort, and hourly creator wage.",
                      badge: "RPM Arbitrage",
                      icon: FaBalanceScale,
                      color: "text-amber-400 bg-amber-950/60 border-amber-800/60",
                    },
                    {
                      name: "Play Button Milestone Tracker",
                      href: "/tools/youtube-milestone-countdown-calculator",
                      desc: "Track velocity and project exact dates for Silver (100K) and Gold (1M).",
                      badge: "Creator Awards",
                      icon: FaAward,
                      color: "text-purple-400 bg-purple-950/60 border-purple-800/60",
                    },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group p-5 rounded-2xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/12 transition-all hover:border-purple-400/50 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3.5">
                          <ToolIcon3D
                            icon={<item.icon className="w-4 h-4" />}
                            slug={item.href.replace("/tools/", "")}
                            category="analytics-earnings"
                            size="sm"
                          />
                          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20 text-white">
                            {item.badge}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-base text-white group-hover:text-emerald-300 transition-colors font-outfit">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center text-xs font-bold text-emerald-300 group-hover:translate-x-1 transition-transform">
                        <span>Launch Tool</span>
                        <FaArrowRight className="ml-1.5 w-3 h-3" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tools by Category */}
          <div className="space-y-28">
            {toolCategories.map((category, index) => {
              const categoryTools = getToolsByCategory(category.id);
              return (
                <div key={category.id} id={category.id} className="scroll-mt-24">
                  <section className="animate-fade-in-up">
                    <div className="mb-10 flex flex-col items-center text-center">
                      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 font-outfit relative">
                        {category.name}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-purple-500 rounded-full"></div>
                      </h2>
                      <p className="text-base sm:text-lg text-slate-500 max-w-2xl mb-4">
                        {category.description}
                      </p>
                      {/* Link to Hub Page */}
                      {(() => {
                        const hubMap: Record<string, string> = {
                          "thumbnail-media": "/tools/thumbnail-tools",
                          "seo-metadata": "/tools/seo-tools",
                          "channel-growth": "/tools/channel-tools",
                          "analytics-earnings": "/tools/analytics-tools",
                          "utility-fun": "/tools/utility-tools",
                        };
                        const hubUrl = hubMap[category.id];
                        return hubUrl ? (
                          <Link
                            href={hubUrl}
                            className="inline-flex items-center gap-1.5 text-purple-600 font-bold hover:text-purple-700 transition-colors text-sm group"
                          >
                            <span>View Full {category.name.replace(" Tools", "")} Suite</span>
                            <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        ) : null;
                      })()}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                      {categoryTools.map((tool) => (
                        <Fragment key={tool.slug}>
                          <ToolCard
                            icon={<tool.icon />}
                            title={tool.name}
                            description={tool.shortDescription}
                            href={`/tools/${tool.slug}`}
                            isAI={tool.isAI}
                            category={tool.category}
                          />
                        </Fragment>
                      ))}
                    </div>

                    <div className="mt-12 rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">Advertisement</p>
                      <GoogleAd slot={pickInArticleSlot(index)} format="fluid" layout="in-article" />
                    </div>
                  </section>
                </div>
              );
            })}

            {/* Trust Bar Section */}
            <div className="glass-premium rounded-3xl p-12 text-center border border-white/40 shadow-sm animate-fade-in-up">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 font-outfit italic">
                "A practical toolkit for faster creator workflows."
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-40 grayscale">
                <span className="font-bold text-xl tracking-tighter">
                  BROWSER BASED
                </span>
                <span className="font-bold text-xl tracking-tighter">
                  NO SIGNUP NEEDED
                </span>
                <span className="font-bold text-xl tracking-tighter">
                  AI POWERED
                </span>
                <span className="font-bold text-xl tracking-tighter">
                  CREATOR FOCUSED
                </span>
              </div>
            </div>

            {/* Bottom Multiplex Ad Unit */}
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">Sponsored Recommendations</p>
              <GoogleAd slot={AD_SLOTS.MULTIPLEX} format="autorelaxed" responsive />
            </div>

            {/* AEO: visible FAQ matching FAQPage schema */}
            <section className="mt-24 max-w-3xl mx-auto" aria-labelledby="tools-faq-heading">
              <h2
                id="tools-faq-heading"
                className="text-3xl font-bold text-slate-900 mb-8 text-center font-outfit"
              >
                Free YouTube Tools FAQ
              </h2>
              <div className="space-y-4">
                {toolsPageFaqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="glass-premium rounded-2xl p-6 border border-white/40"
                  >
                    <h3 className="font-bold text-slate-900 mb-2">{faq.question}</h3>
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
              <p className="text-center mt-8 text-slate-500">
                More answers on the{" "}
                <Link href="/faq" className="text-purple-600 font-semibold hover:underline">
                  full FAQ page
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
