import Link from "next/link";
import {
  FaArrowRight,
  FaRocket,
  FaCheck,
  FaBolt,
  FaStar,
  FaBrain,
  FaMagic,
  FaChartPie,
} from "react-icons/fa";
import { ToolCard, BlogCard } from "@/components/ui/Card";
import FaqAccordion from "@/components/ui/FaqAccordion";
import ScrollReveal from "@/components/ui/ScrollReveal";

import { getFeaturedTools, tools } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { countryCPMData } from "@/lib/cpm-data";
import { getIndexableBlogPosts } from "@/config/blog";
import AdSlot from "@/components/ads/AdSlot";
import { AD_SLOTS } from "@/lib/adsense";
import { Metadata } from "next";
import { getFAQSchema, getToolListSchema, getBreadcrumbSchema, getGlobalAlternates, getMainEntitySchema } from "@/lib/seo";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import TrustSignals from "@/components/seo/TrustSignals";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import EarningsCalculatorCTA from "@/components/blog/EarningsCalculatorCTA";
import Hero3DShowcase from "@/components/home/Hero3DShowcase";
import Tier1ComparisonMatrix from "@/components/tools/Tier1ComparisonMatrix";
import NicheProfitabilityHeatmap from "@/components/tools/NicheProfitabilityHeatmap";
import SmartWorkflow from "@/components/home/SmartWorkflow";

export const metadata: Metadata = {
  title: {
    absolute:
      "Free YouTube Tools — Thumbnails, Tags & Revenue Calculator",
  },
  description:
    `Free YouTube tools: download HD thumbnails, generate titles and tags, and estimate AdSense earnings by country. ${tools.length} creator tools, no signup.`,
  keywords: [
    "youtube thumbnail downloader",
    "youtube tag generator",
    "youtube title generator",
    "youtube earnings calculator",
    "youtube cpm calculator",
    "free youtube tools",
    "free youtube seo tools",
    "tubebuddy alternative free",
    "vidiq alternative free",
  ],
  alternates: getGlobalAlternates("/"),
  openGraph: {
    title: { absolute: "Free YouTube Tools for Creators | YouTube Tools Hub" },
    description:
      `${tools.length} free tools: thumbnail downloader, tag generator, earnings calculator, and more. No signup required.`,
    url: siteConfig.url,
    type: "website",
  },
};

const homeFAQs = [
  {
    question: "Is YouTube Tools Hub free to use?",
    answer:
      "Yes. Core tools including the thumbnail downloader, title generator, tag generator, and earnings calculator are free in your browser. No account or credit card is required.",
  },
  {
    question: "How do I download a YouTube thumbnail in HD?",
    answer:
      "Copy the video URL, paste it into the free YouTube Thumbnail Downloader, and choose the largest available size (usually 1280×720 or higher). Works for regular videos and Shorts.",
  },
  {
    question: "How much does YouTube pay per 1,000 views?",
    answer:
      "YouTube pay is usually estimated as RPM × (views ÷ 1,000). Typical RPM ranges from under $1 in some countries to $4–$15+ in the US, UK, Canada, and Australia, depending on niche and season. Use the free earnings calculator for country-level ranges.",
  },
  {
    question: "Do I need TubeBuddy or VidIQ?",
    answer:
      "No. These tools run in the browser without an extension. You can download thumbnails, draft titles and tags, and estimate earnings without installing TubeBuddy or VidIQ.",
  },
  {
    question: "Can I use these tools for YouTube Shorts?",
    answer:
      "Yes. The thumbnail downloader works with Shorts URLs, and several generators include Shorts-specific title, tag, and script workflows.",
  },
  {
    question: "Are the earnings numbers official YouTube payouts?",
    answer:
      "No. They are planning estimates based on public CPM/RPM ranges by country and niche. Always compare the result with your own YouTube Studio analytics.",
  },
];

// Get the 3 most recent creator-tool posts. Keep off-topic YMYL posts out of
// prominent internal links until they have stronger author/reviewer support.
const blogPosts = getIndexableBlogPosts().slice(0, 3);

const benefits = [
  {
    icon: FaBrain,
    title: "AI-Assisted Workflow",
    description:
      "Use prompts and structured generators to draft titles, descriptions, thumbnails, scripts, and planning notes faster.",
  },
  {
    icon: FaMagic,
    title: "Creative Leverage",
    description:
      "Speed up repetitive metadata and planning tasks so you can spend more time on the actual video.",
  },
  {
    icon: FaChartPie,
    title: "Revenue Planning",
    description:
      "Estimate CPM and RPM ranges by country or niche, then validate your assumptions in YouTube Studio.",
  },
  {
    icon: FaCheck,
    title: "Zero Friction",
    description:
      "Instant access to creator tools with no account requirements or credit cards.",
  },
];

const FLAGSHIP_TOOL_SLUGS = new Set([
  "youtube-thumbnail-downloader",
  "youtube-earnings-calculator",
  "youtube-tag-generator",
  "youtube-title-generator",
  "youtube-watch-hours-calculator",
  "youtube-sponsorship-calculator",
  "youtube-channel-valuation-calculator",
  "youtube-llc-vs-s-corp-tax-savings-calculator",
  "youtube-transcript-downloader",
  "youtube-thumbnail-feed-previewer",
  "youtube-ai-thumbnail-generator",
  "youtube-channel-audit",
]);

export default function Home() {
  const featuredTools = [
    ...tools.filter((t) => FLAGSHIP_TOOL_SLUGS.has(t.slug)),
    ...getFeaturedTools().filter((t) => !FLAGSHIP_TOOL_SLUGS.has(t.slug)),
  ].slice(0, 12);

  // ── AEO/GEO: Combine JSON-LD schemas into a single @graph script to trim markup & flight tokens ──
  const faqSchema = getFAQSchema(
    homeFAQs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })),
  );

  const toolListSchema = getToolListSchema(
    featuredTools.map((tool) => ({
      name: tool.name,
      url: `${siteConfig.url}/tools/${tool.slug}`,
      description: tool.shortDescription,
    })),
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
  ]);
  const mainEntitySchema = getMainEntitySchema();

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      faqSchema,
      toolListSchema,
      mainEntitySchema,
      breadcrumbSchema,
    ].map((item) =>
      Object.fromEntries(
        Object.entries(item as Record<string, unknown>).filter(([k]) => k !== "@context"),
      ),
    ),
  };

  return (
    <div className="min-h-screen">
      {/* ── GEO/AEO: Knowledge Graph, WebApplication, ProfilePage, Service ── */}
      <GeoAeoHead {...GEO_AEO_PRESETS.homepage} pathname="/" />
      {/* ── Single consolidated JSON-LD @graph for AI answer engines & search crawlers ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-14 md:py-22">
        <div className="nebula-bg" />

        <div className="relative w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div>
            <span className="inline-flex items-center gap-2.5 py-2 px-5 rounded-full bg-white/85 backdrop-blur-xl border border-purple-200/80 text-purple-800 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-[0_8px_20px_-6px_rgba(124,58,237,0.2),inset_0_1px_0_0_#fff]">
              <FaBrain className="text-pink-600 animate-glow-pulse" />
              {tools.length} free tools · instant · no signup
            </span>
            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter font-outfit leading-[1.06] max-w-5xl mx-auto"
              data-speakable
            >
              Free YouTube Tools:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-600">
                Thumbnail Downloader
              </span>
              , Tags &amp; Earnings Calculator
            </h1>
            <p
              className="text-lg md:text-xl text-slate-600 mb-9 max-w-3xl mx-auto leading-relaxed font-outfit font-medium summary key-facts"
              data-speakable
            >
              Download HD &amp; 4K thumbnails, generate viral titles and tags, and estimate
              Tier-1 AdSense earnings across {countryCPMData.length} countries. A free browser alternative to
              TubeBuddy and VidIQ — no extension, no account.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/tools/youtube-thumbnail-downloader"
                className="btn-3d-primary inline-flex w-full sm:w-auto items-center justify-center gap-2.5 font-black px-6 py-3.5 sm:px-10 sm:py-5 text-base sm:text-lg rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                <FaRocket aria-hidden="true" className="text-pink-400" />
                Download a thumbnail
              </Link>
              <Link
                href="/tools/youtube-earnings-calculator"
                className="btn-3d-glass inline-flex w-full sm:w-auto items-center justify-center font-extrabold px-6 py-3.5 sm:px-10 sm:py-5 text-base sm:text-lg rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Calculate YouTube pay
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-2.5 text-sm font-bold">
              <Link href="/tools/youtube-title-generator" className="px-4 py-2 rounded-full bg-white/90 border border-slate-200/90 text-slate-700 hover:border-purple-400 hover:text-purple-700 shadow-2xs transition-all hover:-translate-y-0.5">
                Title generator
              </Link>
              <Link href="/tools/youtube-tag-generator" className="px-4 py-2 rounded-full bg-white/90 border border-slate-200/90 text-slate-700 hover:border-purple-400 hover:text-purple-700 shadow-2xs transition-all hover:-translate-y-0.5">
                Tag generator
              </Link>
              <Link href="/resources/youtube-cpm-rates" className="px-4 py-2 rounded-full bg-white/90 border border-slate-200/90 text-slate-700 hover:border-purple-400 hover:text-purple-700 shadow-2xs transition-all hover:-translate-y-0.5">
                CPM rates by country
              </Link>
              <Link href="/tools" className="px-4 py-2 rounded-full bg-white/90 border border-slate-200/90 text-slate-700 hover:border-purple-400 hover:text-purple-700 shadow-2xs transition-all hover:-translate-y-0.5">
                All {tools.length} tools
              </Link>
              <Link href="/about" className="px-4 py-2 rounded-full bg-white/90 border border-slate-200/90 text-slate-700 hover:border-purple-400 hover:text-purple-700 shadow-2xs transition-all hover:-translate-y-0.5">
                About
              </Link>
            </div>

            {/* Interactive Creator Command Studio Showcase */}
            <Hero3DShowcase />
          </div>

          {/* Display Ad between Hero Showcase & Telemetry Stat Pods */}
          <div className="mt-10 max-w-4xl mx-auto">
            <AdSlot slot="2275881649" preset="leaderboard" />
          </div>

          {/* Telemetry Stat Pods */}
          <div className="mt-10 max-w-6xl mx-auto animate-fade-in-up delay-300">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-stretch">
              {[
                { value: `${tools.length}`, label: "Free Creator Tools", accent: "from-purple-600 to-fuchsia-600" },
                { value: "$0", label: "Monthly Fees", accent: "from-emerald-600 to-teal-600" },
                { value: `${countryCPMData.length}`, label: "Country CPM Markets", accent: "from-sky-600 to-indigo-600" },
                { value: "Instant", label: "Browser Studio Engine", accent: "from-pink-600 to-rose-600" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="card-3d rounded-2xl p-5 sm:p-6 text-center"
                >
                  <div className={`text-3xl sm:text-4xl font-black font-outfit mb-1 text-transparent bg-clip-text bg-gradient-to-r ${stat.accent}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs font-extrabold uppercase tracking-widest text-slate-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Money formula + calculator CTA (high-CPC intent) */}
      <section className="py-16 bg-emerald-50/40 border-b border-emerald-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-outfit tracking-tight mb-3">
                How much does{" "}
                <span className="text-emerald-700">YouTube pay</span>?
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto" data-speakable>
                Estimated AdSense earnings ≈ (monthly views ÷ 1,000) × RPM. Example:
                100,000 views at $5 RPM ≈ $500/month. Free calculator — no signup.
              </p>
            </div>
          </ScrollReveal>
          <EarningsCalculatorCTA variant="card" contextLabel={`Free · Instant · ${countryCPMData.length} countries`} />

          {/* Tier 1 High-RPM Benchmarks */}
          <div className="mt-10">
            <Tier1ComparisonMatrix />
          </div>

          {/* 2026 Niche Profitability & Advertiser Demand Heatmap */}
          <div className="mt-10">
            <NicheProfitabilityHeatmap />
          </div>
          {/* Ad below homepage calculator */}
          <div className="mt-8 max-w-4xl mx-auto w-full">
            <AdSlot slot={AD_SLOTS.HORIZONTAL[0]} preset="leaderboard" lazy />
          </div>
        </div>
      </section>

      {/* ── AEO: Visible Key Facts for AI snippet extraction & user trust ── */}
      <section className="py-16 bg-white border-b border-slate-100" data-speakable="true">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-outfit tracking-tight">
              What is <span className="text-purple-600">YouTube Tools Hub</span>?
            </h2>
          </div>
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-3d rounded-2xl p-8 text-center group">
                <div className="mb-5 flex justify-center">
                  <div className="icon-cube-3d w-14 h-14 rounded-2xl flex items-center justify-center text-purple-600">
                    <FaBolt className="h-7 w-7" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-3 font-outfit">{tools.length} Free YouTube Tools</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  YouTube Tools Hub is a free online platform providing {tools.length} creator tools for YouTube creators. No signup required. A free alternative to TubeBuddy and VidIQ.
                </p>
              </div>
              <div className="card-3d rounded-2xl p-8 text-center group">
                <div className="mb-5 flex justify-center">
                  <div className="icon-cube-3d w-14 h-14 rounded-2xl flex items-center justify-center text-pink-600">
                    <FaMagic className="h-7 w-7" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-3 font-outfit">Complete Creator Suite</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Includes: Thumbnail Downloader, AI Thumbnail Generator, Title Generator, Description Generator, Tag Generator &amp; Extractor, Hashtag Generator, Video Ideas Generator, Earnings Calculator, Channel Audit, and more.
                </p>
              </div>
              <div className="card-3d rounded-2xl p-8 text-center group">
                <div className="mb-5 flex justify-center">
                  <div className="icon-cube-3d w-14 h-14 rounded-2xl flex items-center justify-center text-indigo-600">
                    <FaCheck className="h-7 w-7" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-3 font-outfit">Accessible Worldwide</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Available worldwide with no browser extension or private YouTube login required. Use the tools directly in your browser at youtubetoolshub.com.
                </p>
              </div>
            </div>
          </ScrollReveal>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-bold text-slate-600">
            <Link
              href="/about"
              className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-300 hover:text-purple-700 transition-colors"
            >
              About YouTube Tools Hub
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-300 hover:text-purple-700 transition-colors"
            >
              Contact &amp; Support
            </Link>
            <Link
              href="/privacy-policy"
              className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-300 hover:text-purple-700 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-use"
              className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-300 hover:text-purple-700 transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              href="/disclaimer"
              className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-300 hover:text-purple-700 transition-colors"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Showcase */}
      <section className="py-20 bg-slate-50 relative overflow-hidden cv-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="inline-block py-1.5 px-4 rounded-full bg-white border border-purple-200 text-purple-700 text-xs font-extrabold uppercase tracking-widest mb-4 shadow-2xs">
                Flagship Creator Suite
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 font-outfit tracking-tight">
                Popular free YouTube tools
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-outfit font-medium">
                Thumbnails, titles, tags, and Tier-1 earnings — the flagship tools creators use daily.
              </p>
            </div>

            {/* 4-Category Bento Hub Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 mb-10">
              {[
                {
                  title: "Thumbnail & HD Studio",
                  sub: "Downloader, AI & Feed Preview",
                  href: "/tools/thumbnail-tools",
                  accent: "from-pink-500 to-rose-600",
                  badge: "HD / MaxRes",
                },
                {
                  title: "SEO & Metadata Suite",
                  sub: "Titles, Tags, Chapters & Transcripts",
                  href: "/tools/seo-tools",
                  accent: "from-purple-600 to-fuchsia-600",
                  badge: "Rank #1",
                },
                {
                  title: "Tier-1 Money & Tax",
                  sub: "AdSense RPM, S-Corp & Valuation",
                  href: "/tools/analytics-tools",
                  accent: "from-emerald-500 to-teal-600",
                  badge: "High RPM",
                },
                {
                  title: `All ${tools.length} Creator Tools`,
                  sub: "Complete Browser Catalog",
                  href: "/tools",
                  accent: "from-sky-500 to-indigo-600",
                  badge: "Full Suite",
                },
              ].map((cat) => (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className="group card-3d rounded-2xl p-4 sm:p-5 flex flex-col justify-between text-left"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider text-white bg-gradient-to-r ${cat.accent}`}
                    >
                      {cat.badge}
                    </span>
                    <FaArrowRight className="w-3 h-3 text-slate-500 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <div>
                    <div className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-purple-700 transition-colors font-outfit">
                      {cat.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {cat.sub}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuredTools.map((tool) => (
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

          <div className="text-center mt-14">
            <Link
              href="/tools"
              className="btn-3d-primary inline-flex items-center gap-3 rounded-2xl px-6 py-3.5 sm:px-10 sm:py-5 text-base sm:text-lg md:text-xl font-black group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              Explore All {tools.length} Free Tools
              <FaArrowRight className="group-hover:translate-x-2 transition-transform" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Authority & 3D Layered Creator Architecture */}
      <section className="py-20 bg-white relative cv-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-14 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-[1.1] font-outfit tracking-tight">
                Data Patterns <br />
                <span className="text-purple-600">Reducing Guesswork.</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: FaMagic,
                    title: "Clearer Hooks",
                    text: "Draft title and thumbnail angles that make the viewer promise easier to understand.",
                    color: "bg-purple-600",
                  },
                  {
                    icon: FaBrain,
                    title: "Policy-Aware Workflows",
                    text: "Use public-data and browser-local tools that avoid private channel access or misleading metadata.",
                    color: "bg-pink-600",
                  },
                  {
                    icon: FaStar,
                    title: "Documented Tool Notes",
                    text: "Each priority tool explains what it does, what it cannot verify, and how to use the result responsibly.",
                    color: "bg-indigo-600",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-6 p-7 rounded-3xl card-3d"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-2 font-outfit">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 font-medium leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full relative">
              <div className="rounded-[2.5rem] p-1.5 bg-gradient-to-b from-purple-500/30 via-slate-900 to-slate-950 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.45)] overflow-hidden">
                <div className="rounded-[2.2rem] bg-slate-950 uhd-dark-grid p-8 sm:p-10 text-white relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-extrabold uppercase tracking-wider mb-6">
                    <span>Creator Workflow Architecture</span>
                  </div>
                  <h3 className="text-3xl font-black font-outfit mb-3">
                    Practical Creator Workflows
                  </h3>
                  <p className="text-base text-slate-300 leading-relaxed mb-8">
                    Our tools focus on practical creator workflows: clearer
                    metadata, stronger ideas, better planning, and accurate
                    Tier-1 revenue estimation.
                  </p>

                  {/* Stacked Workflow Layers */}
                  <div className="space-y-4 mb-8">
                    {[
                      {
                        layer: "LAYER 01 • DISCOVERY & PACKAGING",
                        title: "HD Thumbnail, Title A/B & Semantic Tags",
                        metric: "Higher CTR",
                        accent: "border-pink-500/40 bg-pink-950/30 text-pink-300",
                      },
                      {
                        layer: "LAYER 02 • RETENTION & AEO INDEXING",
                        title: "Transcript NLP, Chapters & Key Moments",
                        metric: "Search Discovery",
                        accent: "border-purple-500/40 bg-purple-950/30 text-purple-300",
                      },
                      {
                        layer: "LAYER 03 • TIER-1 MONETIZATION",
                        title: `${countryCPMData.length}-Country AdSense RPM, Tax & Valuation`,
                        metric: "2026 Benchmarks",
                        accent: "border-emerald-500/40 bg-emerald-950/30 text-emerald-300",
                      },
                    ].map((stack) => (
                      <div
                        key={stack.layer}
                        className={`rounded-2xl border ${stack.accent} p-4 backdrop-blur-md shadow-lg transition-transform duration-300 hover:-translate-y-1`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest mb-1">
                          <span>{stack.layer}</span>
                          <span className="px-2 py-0.5 rounded bg-white/10 text-white">
                            {stack.metric}
                          </span>
                        </div>
                        <div className="text-sm sm:text-base font-bold text-white">
                          {stack.title}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center font-black shadow-md">
                      EE
                    </div>
                    <div>
                      <div className="font-bold text-sm">Creator Workflow Notes</div>
                      <div className="text-[11px] text-purple-300 font-bold uppercase tracking-widest">
                        Public Tool Documentation • 2026 Verified
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdSlot slot={AD_SLOTS.HORIZONTAL[1]} preset="leaderboard" lazy />
      </div>

      <SmartWorkflow />

      {/* Benefits Bridge */}
      <section className="py-20 bg-slate-50 relative overflow-hidden cv-auto">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 font-outfit tracking-tighter">
                Why Creators Use{" "}
                <span className="text-gradient">YouTube Tools Hub</span>
              </h2>
              <p className="text-xl text-slate-500 max-w-3xl mx-auto font-outfit font-medium italic">
                &ldquo;Simple browser-based utilities for common creator tasks,
                available without a browser extension.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="card-3d rounded-3xl p-8 text-center group"
                >
                  <div className="w-18 h-18 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-[0_10px_25px_-5px_rgba(124,58,237,0.45),inset_0_1.5px_0_0_rgba(255,255,255,0.4)] group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                    <benefit.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-black text-xl text-slate-900 mb-3 font-outfit tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-outfit font-medium">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Semantic FAQ Section for GEO/AEO */}
      <section className="py-20 bg-white relative z-10 cv-auto">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12 text-balance">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 font-outfit tracking-tighter">
                Common YouTube <span className="text-purple-600">questions</span>
              </h2>
              <p className="text-xl text-slate-600 font-outfit font-medium">
                Straight answers on thumbnails, pay per view, and free tools.
              </p>
            </div>
            <FaqAccordion items={homeFAQs} headingLevel="h3" />
            <div className="mt-12 text-center">
              <Link
                href="/faq"
                className="text-purple-600 font-black text-xl hover:underline underline-offset-8"
              >
                More YouTube FAQs →
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Latest guides */}
      <section className="py-16 bg-slate-50 relative overflow-hidden cv-auto">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 font-outfit tracking-tighter">
                Latest YouTube guides
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto font-outfit font-medium">
                Thumbnail sizes, CPM by country, Shorts pay, and SEO checklists.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {blogPosts.map((post) => (
                <BlogCard
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  category={post.category}
                  slug={post.slug}
                  coverImage={post.coverImage}
                  coverAlt={post.title}
                />
              ))}
            </div>

            <div className="text-center mt-14">
              <Link
                href="/blog"
                className="btn-3d-glass inline-flex items-center gap-2 text-purple-700 font-black px-5 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                View all YouTube guides
                <FaArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden mx-4 md:mx-8 mb-8 rounded-[3rem] border border-purple-500/30 shadow-[0_32px_70px_-15px_rgba(15,23,42,0.5)] cv-auto">
        <div className="absolute inset-0 bg-slate-950 uhd-dark-grid" />
        <div className="absolute inset-x-16 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />

        <div className="relative max-w-5xl mx-auto px-6 text-center z-10 py-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter font-outfit leading-[1.05]">
            Start with a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400">
              free creator tool
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed font-outfit font-medium">
            Download a thumbnail, generate tags, or estimate what YouTube pays
            in your country — instant browser studio, no signup.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-4 bg-white text-slate-900 hover:bg-purple-50 font-black px-6 py-3.5 sm:px-10 sm:py-5 text-base sm:text-xl rounded-2xl shadow-[0_6px_0_0_#cbd5e1,0_20px_50px_rgba(168,85,247,0.4)] transition-all hover:-translate-y-1 active:translate-y-1 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          >
            Get Started Free
            <FaArrowRight className="group-hover:translate-x-2 transition-transform text-purple-600" aria-hidden="true" />
          </Link>
          <div className="mt-10 text-slate-300 font-black text-xs uppercase tracking-[0.25em]">
            Instant Results · Browser-Based · No Signup
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="py-12 bg-slate-50 border-t border-slate-100 cv-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustSignals />
        </div>
      </div>
    </div>
  );
}
