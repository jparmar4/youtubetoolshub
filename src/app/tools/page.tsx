import Link from "next/link";
import { Metadata } from "next";
import { ToolCard } from "@/components/ui/Card";
import ToolIcon3D from "@/components/ui/ToolIcon3D";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FaqAccordion from "@/components/ui/FaqAccordion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ToolsFilterBar from "@/components/tools/ToolsFilterBar";
import { tools, toolCategories, getToolsByCategory } from "@/config/tools";
import { countryCPMData } from "@/lib/cpm-data";
import {
  combineSchemasToGraph,
  getToolListSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getGlobalAlternates,
} from "@/lib/seo";
import { siteConfig } from "@/config/site";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import AdSlot from "@/components/ads/AdSlot";
import { AD_SLOTS, pickInArticleSlot } from "@/lib/adsense";
import {
  FaArrowRight,
  FaBolt,
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
      `Yes. The YouTube Earnings Calculator uses country-level CPM and RPM planning ranges for ${countryCPMData.length} markets, including the US, UK, Canada, Australia, and India.`,
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
          __html: JSON.stringify(
            combineSchemasToGraph(toolListSchema, breadcrumbSchema, faqSchema),
          ),
        }}
      />

      <div className="min-h-screen py-10 sm:py-14 relative overflow-hidden bg-slate-50">
        {/* Spatial Background Decorations */}
        <div className="nebula-bg" />
        <div className="absolute top-0 left-0 w-full h-[520px] bg-gradient-to-b from-purple-100/40 via-blue-50/20 to-transparent -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb
            items={[{ name: "Home", href: "/" }, { name: "Tools" }]}
            className="mb-6"
          />

          {/* Header */}
          <div className="text-center mb-10 animate-fade-in-up">
            <span className="inline-block py-1.5 px-4 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-widest mb-5 shadow-md">
              {tools.length} Free Creator Tools · Browser-Based · No Signup
            </span>
            <h1
              className="text-3xl md:text-5xl font-black text-slate-900 mb-5 tracking-tight font-outfit"
              data-speakable
            >
              All {tools.length} Free YouTube Tools
            </h1>
            <p
              className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-outfit summary"
              data-speakable
            >
              Streamline your YouTube workflow: download HD &amp; full-resolution thumbnails, generate high-CTR titles and tags, calculate country-level AdSense payouts, estimate tax deductions, and grow without extensions.
            </p>

            {/* Quick Category Jump Chips */}
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mt-7">
              <a
                href="#tier1-calculators"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-xs hover:from-emerald-700 hover:to-teal-700 transition-colors"
              >
                <FaBolt className="w-3 h-3 text-amber-300" />
                <span>Tier 1 Money &amp; Tax Suite</span>
              </a>
              {toolCategories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-purple-400 hover:text-purple-700 text-xs font-semibold shadow-2xs transition-colors"
                >
                  {cat.name.replace(" Tools", "")} ({getToolsByCategory(cat.id).length})
                </a>
              ))}
            </div>
          </div>

          {/* Interactive Search & Category Filter */}
          <ToolsFilterBar />

          {/* Above-the-fold Ad Placement */}
          <AdSlot slot={AD_SLOTS.HEADER} preset="leaderboard" className="mb-12" />

          {/* Tier 1 Commercial Stack Spotlight */}
          <div id="tier1-calculators" className="mb-16 scroll-mt-24">
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
                      badge: `${countryCPMData.length} Markets`,
                      iconKey: "earnings-calculator-hero",
                    },
                    {
                      name: "Sponsorship Rate Calculator",
                      href: "/tools/youtube-sponsorship-calculator",
                      desc: "Calculate 60s integrations, 30s shoutouts, and pitch templates.",
                      badge: "Media Kit",
                    },
                    {
                      name: "US Tax Deduction Estimator",
                      href: "/tools/youtube-tax-deduction-calculator",
                      desc: "Model IRS Schedule C & 1099 write-offs on cameras, studio & tech.",
                      badge: "IRS & HMRC",
                    },
                    {
                      name: "LLC vs S-Corp Tax Savings",
                      href: "/tools/youtube-llc-vs-s-corp-tax-savings-calculator",
                      desc: "Discover how S-Corp saves $4k–$12k in self-employment tax.",
                      badge: "Tax Strategy",
                    },
                    {
                      name: "Channel Valuation Calculator",
                      href: "/tools/youtube-channel-valuation-calculator",
                      desc: "Estimate channel exit value based on 24x–36x net profit multiples.",
                      badge: "Asset Exit",
                    },
                    {
                      name: "YouTube Ads Cost Calculator",
                      href: "/tools/youtube-ads-cost-calculator",
                      desc: "Model CPV and budget requirements to promote YouTube videos.",
                      badge: "Google Ads",
                    },
                    {
                      name: "4,000 Watch Hours Planner",
                      href: "/tools/youtube-watch-hours-calculator",
                      desc: "Calculate views and pace needed to unlock YPP monetization.",
                      badge: "YPP Monetization",
                      iconKey: "watch-hours-tier-hero",
                    },
                    {
                      name: "Shorts vs. Long-Form Profitability",
                      href: "/tools/youtube-shorts-vs-long-form-calculator",
                      desc: "Compare AdSense yield, editing effort, and hourly creator wage.",
                      badge: "RPM Arbitrage",
                      iconKey: "shorts-comparison-tier-hero",
                    },
                    {
                      name: "Play Button Milestone Tracker",
                      href: "/tools/youtube-milestone-countdown-calculator",
                      desc: "Track velocity and project exact dates for Silver (100K) and Gold (1M).",
                      badge: "Creator Awards",
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
                            iconKey={item.iconKey}
                            slug={item.href.replace("/tools/", "")}
                            category="analytics-earnings"
                            size="sm"
                          />
                          <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20 text-white">
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
                    <ScrollReveal>
                      <div className="mb-10 flex flex-col items-center text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 font-outfit relative">
                          {category.name}
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-purple-500 rounded-full"></div>
                        </h2>
                        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mb-4">
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
                          <ToolCard
                            key={tool.slug}
                            title={tool.name}
                            description={tool.shortDescription}
                            href={`/tools/${tool.slug}`}
                            isAI={tool.isAI}
                            category={tool.category}
                          />
                        ))}
                      </div>
                    </ScrollReveal>

                    <AdSlot slot={pickInArticleSlot(index)} preset="in-article" className="mt-12" />
                  </section>
                </div>
              );
            })}

            {/* Trust Bar Section */}
            <div className="card-3d rounded-3xl p-10 text-center animate-fade-in-up">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 font-outfit italic">
                &ldquo;A practical toolkit for faster creator workflows.&rdquo;
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-8 text-slate-500">
                <span className="font-bold text-lg sm:text-xl tracking-tight">
                  BROWSER BASED
                </span>
                <span className="font-bold text-lg sm:text-xl tracking-tight">
                  NO SIGNUP NEEDED
                </span>
                <span className="font-bold text-lg sm:text-xl tracking-tight">
                  AI POWERED
                </span>
                <span className="font-bold text-lg sm:text-xl tracking-tight">
                  CREATOR FOCUSED
                </span>
              </div>
            </div>

            {/* Bottom Multiplex Ad Unit */}
            <AdSlot slot={AD_SLOTS.MULTIPLEX} preset="multiplex" label="Sponsored Recommendations" />

            {/* AEO: visible FAQ matching FAQPage schema */}
            <section className="mt-20 max-w-3xl mx-auto" aria-labelledby="tools-faq-heading">
              <h2
                id="tools-faq-heading"
                className="text-3xl font-bold text-slate-900 mb-8 text-center font-outfit"
              >
                Free YouTube Tools FAQ
              </h2>
              <FaqAccordion items={toolsPageFaqs} headingLevel="h3" />
              <p className="text-center mt-8 text-slate-600">
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
