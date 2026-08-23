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
import Button from "@/components/ui/Button";

import { getFeaturedTools, tools } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { getIndexableBlogPosts } from "@/config/blog";
import SmartWorkflow from "@/components/home/SmartWorkflow";
import GoogleAd from "@/components/ads/GoogleAd";
import { Metadata } from "next";
import { getFAQSchema, getToolListSchema, getBreadcrumbSchema, getGlobalAlternates, getMainEntitySchema } from "@/lib/seo";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import TrustSignals from "@/components/seo/TrustSignals";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import EarningsCalculatorCTA from "@/components/blog/EarningsCalculatorCTA";

export const metadata: Metadata = {
  title: {
    absolute:
      "Free YouTube Tools — Thumbnail Downloader, Tags & Earnings Calculator",
  },
  description:
    "Free YouTube tools: download HD thumbnails, generate titles and tags, and estimate AdSense earnings by country. 27 creator tools, no signup.",
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
    title: "Free YouTube Tools for Creators | YouTube Tools Hub",
    description:
      "27+ free tools: thumbnail downloader, tag generator, earnings calculator, and more. No signup required.",
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

export default function Home() {
  const featuredTools = getFeaturedTools();

  // ── AEO/GEO: Generate JSON-LD schemas for AI answer engines ──
  const faqSchema = getFAQSchema(
    homeFAQs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })),
  );

  const toolListSchema = getToolListSchema(
    tools.map((tool) => ({
      name: tool.name,
      url: `${siteConfig.url}/tools/${tool.slug}`,
      description: tool.shortDescription,
    })),
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
  ]);
  const mainEntitySchema = getMainEntitySchema();

  return (
    <div className="min-h-screen">
      {/* ── GEO/AEO: Knowledge Graph, WebApplication, ProfilePage, Service ── */}
      <GeoAeoHead {...GEO_AEO_PRESETS.homepage} pathname="/" />
      {/* ── AEO/GEO: JSON-LD Structured Data for AI Answer Engines ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mainEntitySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 flex items-center justify-center">
        <div className="nebula-bg" />

        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-[120px] animate-pulse delay-700" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-purple-700 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
              <FaBrain className="text-pink-500 animate-glow-pulse" />
              27 free tools · no signup
            </span>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter font-outfit leading-[1.08]"
              data-speakable
            >
              Free YouTube Tools:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-600">
                Thumbnail Downloader
              </span>
              , Tags &amp; Earnings Calculator
            </h1>
            <p
              className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed font-outfit font-medium summary key-facts"
              data-speakable
            >
              Download HD thumbnails, generate titles and tags, and estimate
              AdSense earnings by country. A free browser alternative to
              TubeBuddy and VidIQ — no extension, no account.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/tools/youtube-thumbnail-downloader">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white shadow-2xl border-none font-black px-10 py-6 text-lg rounded-full transition-all hover:scale-105 active:scale-95"
                >
                  <FaRocket className="mr-2" />
                  Download a thumbnail
                </Button>
              </Link>
              <Link href="/tools/youtube-earnings-calculator">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto glass-premium hover:!bg-white/90 border-white/60 text-slate-900 font-bold px-10 py-6 text-lg rounded-full backdrop-blur-md shadow-xl transition-all hover:scale-105"
                >
                  Calculate YouTube pay
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold">
              <Link href="/tools/youtube-title-generator" className="px-4 py-2 rounded-full bg-white/70 border border-slate-200 text-slate-700 hover:border-purple-400 hover:text-purple-700">
                Title generator
              </Link>
              <Link href="/tools/youtube-tag-generator" className="px-4 py-2 rounded-full bg-white/70 border border-slate-200 text-slate-700 hover:border-purple-400 hover:text-purple-700">
                Tag generator
              </Link>
              <Link href="/resources/youtube-cpm-rates" className="px-4 py-2 rounded-full bg-white/70 border border-slate-200 text-slate-700 hover:border-purple-400 hover:text-purple-700">
                CPM rates by country
              </Link>
              <Link href="/tools" className="px-4 py-2 rounded-full bg-white/70 border border-slate-200 text-slate-700 hover:border-purple-400 hover:text-purple-700">
                All 27 tools
              </Link>
            </div>
          </div>

          {/* Social Proof Bar */}
          <div className="mt-24 max-w-6xl mx-auto border-t border-slate-200/50 pt-12 animate-fade-in-up delay-300">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-70">
              <div className="text-center">
                <div className="text-4xl font-black text-slate-900 font-outfit mb-1">
                  27+
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Free Tools
                </div>
              </div>
              <div className="text-center border-l border-slate-200/50">
                <div className="text-4xl font-black text-slate-900 font-outfit mb-1">
                  Zero
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Monthly Fees
                </div>
              </div>
              <div className="text-center border-l border-slate-200/50">
                <div className="text-4xl font-black text-slate-900 font-outfit mb-1">
                  Fresh
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Creator Workflows
                </div>
              </div>
              <div className="text-center border-l border-slate-200/50">
                <div className="text-4xl font-black text-slate-900 font-outfit mb-1">
                  No
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Signup Needed
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Money formula + calculator CTA (high-CPC intent) */}
      <section className="py-16 bg-emerald-50/40 border-b border-emerald-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-outfit tracking-tight mb-3">
              How much does{" "}
              <span className="text-emerald-600">YouTube pay</span>?
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto" data-speakable>
              Estimated AdSense earnings ≈ (monthly views ÷ 1,000) × RPM. Example:
              100,000 views at $5 RPM ≈ $500/month. Free calculator — no signup.
            </p>
          </div>
          <EarningsCalculatorCTA variant="card" contextLabel="Free · Instant · 50+ countries" />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-premium rounded-2xl p-8 border-white/60 text-center">
              <div className="mb-4 flex justify-center text-purple-600">
                <FaBolt className="h-10 w-10" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-3 font-outfit">27+ Free YouTube Tools</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                YouTube Tools Hub is a free online platform providing 27+ creator tools for YouTube creators. No signup required. A free alternative to TubeBuddy and VidIQ.
              </p>
            </div>
            <div className="glass-premium rounded-2xl p-8 border-white/60 text-center">
              <div className="mb-4 flex justify-center text-pink-600">
                <FaMagic className="h-10 w-10" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-3 font-outfit">Complete Creator Suite</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Includes: Thumbnail Downloader, AI Thumbnail Generator, Title Generator, Description Generator, Tag Generator &amp; Extractor, Hashtag Generator, Video Ideas Generator, Earnings Calculator, Channel Audit, and more.
              </p>
            </div>
            <div className="glass-premium rounded-2xl p-8 border-white/60 text-center">
              <div className="mb-4 flex justify-center text-indigo-600">
                <FaCheck className="h-10 w-10" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-3 font-outfit">Accessible Worldwide</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Available worldwide with no browser extension or private YouTube login required. Use the tools directly in your browser at youtubetoolshub.com.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Showcase */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 font-outfit tracking-tighter">
              Popular free YouTube tools
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-outfit font-medium">
              Thumbnails, titles, tags, and earnings — the searches creators actually make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredTools.map((tool) => (
              <ToolCard
                key={tool.slug}
                icon={<tool.icon />}
                title={tool.name}
                description={tool.shortDescription}
                href={`/tools/${tool.slug}`}
                isAI={tool.isAI}
                className="glass-premium border-white/40 hover:-translate-y-4 transition-all duration-500 shadow-sm hover:shadow-2xl hover:border-purple-500/20"
              />
            ))}
          </div>

          <div className="text-center mt-20">
            <Link href="/tools">
              <Button
                size="lg"
                className="bg-slate-900 text-white rounded-full px-12 py-6 text-xl font-black shadow-2xl hover:bg-slate-800 transition-all hover:scale-105 group"
              >
                Access All {tools.length} Tools
                <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Authority & Vision */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-10 leading-[0.9] font-outfit tracking-tight">
                Data Patterns <br />
                <span className="text-purple-600">Reducing Guesswork.</span>
              </h2>
              <div className="space-y-8">
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
                    className="flex gap-6 p-8 rounded-[2rem] glass-premium border-white/40 hover:border-purple-500/20 transition-all duration-500 shadow-sm"
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
            <div className="lg:w-1/2 relative">
              <div className="aspect-[4/5] glass-premium rounded-[4rem] p-1 shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-slate-950 p-16 flex flex-col justify-end text-white">
                  <h3 className="text-4xl font-black font-outfit mb-4">
                    Practical Creator Workflows
                  </h3>
                  <p className="text-xl text-purple-100/80 font-medium leading-relaxed mb-6">
                    "Our tools focus on practical creator workflows: clearer
                    metadata, stronger ideas, better planning, and easier
                    revenue estimation."
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-black">
                      EE
                    </div>
                    <div>
                      <div className="font-bold">Creator Workflow Notes</div>
                      <div className="text-xs text-purple-300 font-bold uppercase tracking-widest">
                        Public Tool Documentation
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GoogleAd slot="2275881649" />
      </div>

      <SmartWorkflow />

      {/* Benefits Bridge */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 font-outfit tracking-tighter">
              Why Creators Use{" "}
              <span className="text-gradient">YouTube Tools Hub</span>
            </h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-outfit font-medium italic">
              "Simple browser-based utilities for common creator tasks,
              available without a browser extension."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="glass-premium rounded-[2.5rem] p-10 text-center border-white/60 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="w-20 h-20 mx-auto mb-8 rounded-[1.5rem] bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-all duration-500">
                  <benefit.icon className="w-10 h-10" />
                </div>
                <h3 className="font-black text-2xl text-slate-900 mb-4 font-outfit tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-outfit font-medium">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Semantic FAQ Section for GEO/AEO */}
      <section className="py-32 bg-white relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20 text-balance">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 font-outfit tracking-tighter">
              Common YouTube <span className="text-purple-600">questions</span>
            </h2>
            <p className="text-xl text-slate-500 font-outfit font-medium">
              Straight answers on thumbnails, pay per view, and free tools.
            </p>
          </div>
          <div className="space-y-12">
            {homeFAQs.map((faq, i) => (
              <div
                key={i}
                className="glass-premium p-10 rounded-[2.5rem] border-white/60 hover:shadow-xl transition-all duration-500 relative"
              >
                <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-4 font-outfit">
                  <span className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    Q
                  </span>
                  {faq.question}
                </h3>
                <p className="text-slate-600 leading-relaxed text-xl font-outfit font-medium pl-14">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link
              href="/faq"
              className="text-purple-600 font-black text-xl hover:underline underline-offset-8"
            >
              More YouTube FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* Latest guides */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 font-outfit tracking-tighter">
              Latest YouTube guides
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-outfit font-medium">
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
                className="glass-premium border-white/40 shadow-sm"
              />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/blog">
              <Button
                variant="ghost"
                className="text-purple-600 font-black text-xl hover:bg-white/50 px-10 py-5 rounded-full"
              >
                View all YouTube guides
                <FaArrowRight className="ml-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>



      {/* Heroic CTA Section */}
      <section className="py-32 relative overflow-hidden mx-4 md:mx-8 mb-8 rounded-[5rem]">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="nebula-bg opacity-50 absolute inset-0" />

        <div className="relative max-w-5xl mx-auto px-6 text-center z-10 py-16">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter font-outfit leading-[0.95]">
            Start with a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
              free tool
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed font-outfit font-medium">
            Download a thumbnail, generate tags, or estimate what YouTube pays
            in your country — no signup.
          </p>
          <Link href="/tools">
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100 font-black px-16 py-10 h-auto text-3xl rounded-full shadow-[0_0_50px_rgba(255,255,255,0.15)] transition-all hover:scale-105 active:scale-95 group"
            >
              Get Started Free
              <FaArrowRight className="ml-4 group-hover:translate-x-3 transition-transform" />
            </Button>
          </Link>
          <div className="mt-12 text-slate-500 font-black text-xs uppercase tracking-[0.3em]">
            No Account Required | Instant Results | Scale Effortlessly
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustSignals />
        </div>
      </div>
    </div>
  );
}
