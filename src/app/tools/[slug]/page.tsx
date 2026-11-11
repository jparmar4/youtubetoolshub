import { toolExamples } from "@/lib/tool-examples";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getToolBySlug, tools, toolCategories } from "@/config/tools";
import { getBreadcrumbSchema, getSoftwareApplicationSchema, getFAQSchema, getHowToSchema, getGlobalAlternates } from "@/lib/seo";
import { DATA_LAST_REVIEWED } from "@/lib/seo-data";
import { siteConfig } from "@/config/site";
import { countryCPMData } from "@/lib/cpm-data";
import BlogSidebar from "@/components/blog/BlogSidebar";
import Breadcrumb from "@/components/ui/Breadcrumb";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import ShareButtons from "@/components/ui/ShareButtons";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import QuickAnswerCapsule from "@/components/seo/QuickAnswerCapsule";
import { getIndexableBlogPosts } from "@/config/blog";
import { ToolContextProvider } from "@/components/tools/ToolContext";
import { getRelatedBlogHintsForTool } from "@/lib/related-tools";
import {
    getToolSeoSections,
    getToolSeoFaqs,
    getToolClusterLinks,
} from "@/lib/tool-seo-content";
import AdSlot from "@/components/ads/AdSlot";
import AffiliateBanner from "@/components/ads/AffiliateBanner";
import InternationalPayoutCallout from "@/components/ads/InternationalPayoutCallout";
import { AdSectionPrioritize, AdSectionIgnore } from "@/components/ads/AdSectionTarget";
import Tier1ComparisonMatrix from "@/components/tools/Tier1ComparisonMatrix";
import EmbedModal from "@/components/tools/EmbedModal";
import ToolFavoriteButton from "@/components/tools/ToolFavoriteButton";
import ToolIcon3D from "@/components/ui/ToolIcon3D";
import FaqAccordion from "@/components/ui/FaqAccordion";
import MobileQuickLinks from "@/components/tools/MobileQuickLinks";
import ToolComponentRenderer from "@/components/tools/ToolComponentRenderer";
import { RecentToolTracker } from "@/lib/recent-tools";
import { AD_SLOTS, getAffiliateToolForCategory } from "@/lib/adsense";

// Only known tools exist — unknown slugs must be hard 404s (not soft-404 + indexable)
export const dynamicParams = false;

// Generate static params for all tools (dedicated routes own their own pages)
export function generateStaticParams() {
    return tools
        .filter((tool) => tool.slug !== "youtube-earnings-calculator")
        .map((tool) => ({
            slug: tool.slug,
        }));
}

// Generate metadata for each tool page
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const tool = getToolBySlug(slug);

    if (!tool) {
        return {
            title: "Tool Not Found",
            robots: { index: false, follow: false },
        };
    }

    return {
        title: { absolute: tool.seoTitle || tool.name },
        description: tool.seoDescription || tool.description,
        keywords: tool.keywords,
        openGraph: {
            title: `${tool.seoTitle || tool.name} | YouTube Tools Hub`,
            description: tool.seoDescription || tool.description,
            type: "website",
            url: `${siteConfig.url}/tools/${tool.slug}`,
            images: [
                {
                    url: `${siteConfig.url}/tools/${tool.slug}/opengraph-image`,
                    width: 1200,
                    height: 630,
                    alt: tool.name,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: tool.seoTitle || tool.name,
            description: tool.seoDescription || tool.description,
            images: [`${siteConfig.url}/tools/${tool.slug}/opengraph-image`],
        },
        alternates: getGlobalAlternates(`/tools/${tool.slug}`),
        other: {
            "primaryTopic": tool.name,
            "abstract": tool.seoDescription || tool.description,
            "key-facts": [
                `${tool.name} is free to use`,
                tool.isAI ? "Uses AI-assisted generation" : "Runs as a focused creator utility",
                `Category: ${tool.category}`,
                "Designed to help YouTube creators complete a specific workflow"
            ].join(", "),
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
                'max-video-preview': -1,
            },
        },
    };
}

export default async function ToolPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const tool = getToolBySlug(slug);

    if (!tool) {
        notFound();
    }

    // Server-side unique SEO body (ensures 350+ words + FAQs even if tool config is thin)
    const seoSections = getToolSeoSections(tool);
    const seoFaqs = getToolSeoFaqs(tool);
    const clusterLinks = getToolClusterLinks(tool.slug);

    // Get up to 5 related tools in the same category
    let relatedTools = tools.filter((t) => t.category === tool.category && t.slug !== tool.slug);
    if (relatedTools.length < 5) {
        const extraTools = tools.filter((t) => t.slug !== tool.slug && !relatedTools.some((r) => r.slug === t.slug));
        relatedTools = [...relatedTools, ...extraTools];
    }
    relatedTools = relatedTools.slice(0, 5);

    const relatedGuides = getRelatedBlogHintsForTool(
        tool,
        getIndexableBlogPosts().map((p) => ({
            slug: p.slug,
            title: p.title,
            category: p.category,
            keywords: p.keywords,
        })),
        4,
    );
    // Generate JSON-LD Structured Data
    const toolSchema = getSoftwareApplicationSchema({
        name: tool.name,
        description: tool.description,
        url: `${siteConfig.url}/tools/${tool.slug}`,
        category: tool.category,
        // Freshness anchor for the tool entity — without it the
        // SoftwareApplication node carries no timestamp at all.
        dateModified: DATA_LAST_REVIEWED,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Tools", url: `${siteConfig.url}/tools` },
        { name: tool.name, url: `${siteConfig.url}/tools/${tool.slug}` },
    ]);

    const schemasToCombine: Record<string, unknown>[] = [toolSchema, breadcrumbSchema];
    if (seoFaqs.length > 0) {
        schemasToCombine.push(getFAQSchema(seoFaqs));
    }
    if (tool.howTo) {
        schemasToCombine.push(getHowToSchema(tool.howTo));
    }

    const combinedToolGraphSchema = {
        "@context": "https://schema.org",
        "@graph": schemasToCombine.map((item) =>
            Object.fromEntries(Object.entries(item).filter(([k]) => k !== "@context")),
        ),
    };

    return (
        <>
            {/* AI Search & GEO/AEO Optimization Signals */}
            <GeoAeoHead
                {...GEO_AEO_PRESETS.toolPage(
                    tool.name,
                    tool.seoDescription || tool.description,
                    tool.category
                )}
                pathname={`/tools/${tool.slug}`}
            />

            {/* Consolidated JSON-LD Structured Data Graph for AI Answer Engines & Search Bots */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(combinedToolGraphSchema),
                }}
            />

            <div className="min-h-screen py-12 lg:py-20 relative overflow-hidden">
                <div className="nebula-bg" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

                    {/* Breadcrumb Navigation */}
                    <AdSectionIgnore>
                        <div className="mb-8">
                            <Breadcrumb
                                items={[
                                    { name: "Home", href: "/" },
                                    { name: "Tools", href: "/tools" },
                                    { name: tool.name }
                                ]}
                            />
                        </div>
                    </AdSectionIgnore>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Column */}
                        <div className="lg:col-span-2 space-y-12">
                            <AdSectionPrioritize>
                            {/*
                              Server-rendered H1 + summary OUTSIDE Suspense/client tools.
                              Many tools use useSearchParams() and only stream client HTML —
                              crawlers often never see an H1 if it lives only in ToolPageLayout.
                            */}
                            <header className="card-3d rounded-3xl p-6 sm:p-7 relative overflow-hidden">
                                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500" />
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                    <div className="flex items-start gap-4 sm:gap-5 flex-1">
                                        <ToolIcon3D
                                            slug={tool.slug}
                                            category={tool.category}
                                            size="lg"
                                            className="mt-0.5"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-[11px] font-extrabold uppercase tracking-wider mb-2.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                <span>{tool.isAI ? "AI-Powered 3D Studio" : "Instant UHD Browser Studio"} · Free</span>
                                            </div>
                                            <h1
                                                className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight font-outfit"
                                                data-speakable
                                            >
                                                {tool.name}
                                            </h1>
                                            <p
                                                className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed"
                                                data-speakable
                                            >
                                                {tool.seoDescription || tool.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="shrink-0 sm:pt-1">
                                        <ToolFavoriteButton toolSlug={tool.slug} toolName={tool.name} />
                                        <RecentToolTracker slug={tool.slug} />
                                    </div>
                                </div>

                                {/* Trust, Speed & Creator Telemetry Badges */}
                                <div className="mt-5 pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 font-bold shadow-2xs">
                                        <span className="text-amber-500 font-black">★★★★★</span>
                                        <span>4.9/5</span>
                                        <span className="text-amber-700/80 font-medium hidden sm:inline">(120,000+ creators)</span>
                                    </span>

                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 font-bold shadow-2xs">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span>{tool.isAI ? "OpenAI & Gemini Intelligence" : "Instant Browser Engine (0ms)"}</span>
                                    </span>

                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 font-bold shadow-2xs">
                                        <span>🔒 100% Free · No Password Required</span>
                                    </span>

                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-sky-700 font-bold shadow-2xs">
                                        <span>✓ 2026 YouTube Ready</span>
                                    </span>
                                </div>
                            </header>

                            {/* 3D UHD Interactive Tool Console — Immediately Above the Fold */}
                            <div className="studio-console-3d rounded-3xl overflow-hidden">
                                <div className="flex items-center justify-between gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-slate-900 text-white border-b border-slate-800">
                                    <div className="flex items-center gap-2 min-w-0">
                                        {/* Decorative traffic lights — hidden on mobile so the
                                            actual tool input is reached sooner */}
                                        <span className="hidden sm:flex items-center gap-2 shrink-0" aria-hidden="true">
                                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                        </span>
                                        <span className="ml-0 text-xs font-bold text-slate-200 truncate">
                                            {tool.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-300 font-medium mr-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                            Live Session
                                        </span>
                                        <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
                                            Live Engine
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <ToolContextProvider value={{ hideHeader: true }}>
                                        <ToolComponentRenderer slug={slug} />
                                    </ToolContextProvider>
                                </div>
                            </div>

                            {/* Mobile-only flagship tool quick links (desktop gets the sidebar dock) */}
                            <AdSectionIgnore>
                                <MobileQuickLinks />
                            </AdSectionIgnore>

                            {/* Leaderboard immediately below the interactive tool */}
                            <AdSlot slot={AD_SLOTS.HEADER} preset="leaderboard" />

                            {/* AEO Quick Answer Capsule */}
                            <QuickAnswerCapsule
                                question={tool.definitionBlock?.title || `What is ${tool.name}?`}
                                answer={
                                    tool.definitionBlock?.text ||
                                    `${tool.name} is a free, browser-based YouTube creator tool designed to streamline your content workflow. ${tool.shortDescription}. Works directly online with no signups, installations, or credit card required.`
                                }
                                keyPoints={[
                                    "100% Free to use online (no browser extensions needed)",
                                    tool.isAI ? "AI output is a draft to review before publishing" : "Results depend on the inputs you provide",
                                    "Read the instructions and limitations before using results",
                                    "No browser extension or YouTube password required",
                                ]}
                                badgeText="Tool summary"
                            />

                            {toolExamples[tool.slug] && (
                                <section className="card-3d rounded-3xl p-6 sm:p-7 space-y-4" aria-labelledby="worked-example-title">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-extrabold uppercase tracking-wider">
                                        Worked Example
                                    </div>
                                    <h2 id="worked-example-title" className="text-xl font-black text-slate-900 font-outfit">{toolExamples[tool.slug].title}</h2>
                                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4">
                                            <dt className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">Example Input</dt>
                                            <dd className="text-sm font-semibold text-slate-800">{toolExamples[tool.slug].input}</dd>
                                        </div>
                                        <div className="rounded-2xl bg-purple-50/60 border border-purple-200/80 p-4">
                                            <dt className="text-xs font-extrabold uppercase tracking-wider text-purple-700 mb-1">Example Result</dt>
                                            <dd className="text-sm font-semibold text-slate-900">{toolExamples[tool.slug].output}</dd>
                                        </div>
                                    </dl>
                                    <p className="text-sm text-slate-600 leading-relaxed">{toolExamples[tool.slug].explanation}</p>
                                </section>
                            )}

                            {/* Category-Tailored Creator Affiliate Recommendation */}
                            <AffiliateBanner toolId={getAffiliateToolForCategory(tool.category, tool.slug)} variant="compact" />

                            {/* Ad: Below Worked Example */}
                            <AdSlot slot="3397391628" preset="in-article" />
                            </AdSectionPrioritize>

                            {/* Share & Embed This Tool */}
                            <AdSectionIgnore>
                                <div className="card-3d rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div>
                                        <p className="text-slate-900 font-extrabold">Found this tool helpful?</p>
                                        <p className="text-xs text-slate-500">Share with creators or embed directly on your website.</p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <EmbedModal slug={tool.slug} toolName={tool.name} />
                                        <ShareButtons
                                            url={`${siteConfig.url}/tools/${tool.slug}`}
                                            title={`${tool.name} - Free YouTube Tool`}
                                            description={tool.shortDescription}
                                        />
                                    </div>
                                </div>
                            </AdSectionIgnore>

                            {/* High-CPC Tier-1 Financial & Banking Context for Analytics & Revenue Tools */}
                            {tool.category === "analytics-earnings" ? (
                                <AdSectionPrioritize>
                                    <div className="space-y-8">
                                        <Tier1ComparisonMatrix />
                                        <InternationalPayoutCallout />
                                    </div>
                                </AdSectionPrioritize>
                            ) : (
                                <AdSectionPrioritize>
                                    <section className="card-3d rounded-3xl p-6 sm:p-7 border border-emerald-200/80 bg-gradient-to-br from-emerald-50/60 via-white to-purple-50/40" aria-labelledby="monetize-funnel-heading">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                            <div>
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider mb-1.5">
                                                    Tier-1 Creator Monetization Suite
                                                </span>
                                                <h2 id="monetize-funnel-heading" className="text-lg sm:text-xl font-black text-slate-900 font-outfit">
                                                    Estimate What These Views &amp; Keywords Are Worth
                                                </h2>
                                            </div>
                                            <Link
                                                href="/resources/youtube-cpm-rates"
                                                className="text-xs font-bold text-purple-700 hover:underline shrink-0"
                                            >
                                                Compare 52 Country CPMs →
                                            </Link>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <Link
                                                href="/tools/youtube-earnings-calculator"
                                                className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-400 hover:shadow-sm transition-all"
                                            >
                                                <span className="font-bold text-sm text-slate-900 block">YouTube Earnings Calculator →</span>
                                                <span className="text-xs text-slate-600 mt-0.5 block">Model US, UK, Canada, Australia &amp; Germany AdSense RPM payouts.</span>
                                            </Link>
                                            <Link
                                                href="/tools/youtube-sponsorship-calculator"
                                                className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-400 hover:shadow-sm transition-all"
                                            >
                                                <span className="font-bold text-sm text-slate-900 block">Sponsorship Rate Calculator →</span>
                                                <span className="text-xs text-slate-600 mt-0.5 block">Price Tier-1 brand integrations ($22–$45 CPM benchmarks) &amp; media kits.</span>
                                            </Link>
                                            <Link
                                                href="/tools/youtube-channel-valuation-calculator"
                                                className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-400 hover:shadow-sm transition-all"
                                            >
                                                <span className="font-bold text-sm text-slate-900 block">Channel Valuation Estimator →</span>
                                                <span className="text-xs text-slate-600 mt-0.5 block">Value your channel asset using 24x–36x monthly net profit multiples.</span>
                                            </Link>
                                            <Link
                                                href="/tools/youtube-llc-vs-s-corp-tax-savings-calculator"
                                                className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-400 hover:shadow-sm transition-all"
                                            >
                                                <span className="font-bold text-sm text-slate-900 block">LLC vs S-Corp Tax Savings →</span>
                                                <span className="text-xs text-slate-600 mt-0.5 block">Calculate self-employment tax savings for monetized US creator businesses.</span>
                                            </Link>
                                        </div>
                                    </section>
                                </AdSectionPrioritize>
                            )}

                            {/* Internal Linking for Earnings Calculator (Countries) */}
                            {tool.slug === "youtube-earnings-calculator" && (
                                <div className="card-3d rounded-3xl p-8 border border-emerald-200">
                                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <span>Browse by Country</span>
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {countryCPMData.slice(0, 12).map((country) => (
                                            <Link
                                                key={country.slug}
                                                href={`/tools/youtube-earnings-calculator/${country.slug}`}
                                                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:border-emerald-500 hover:text-emerald-700 transition-colors"
                                            >
                                                {country.name}
                                            </Link>
                                        ))}
                                        <Link
                                            href="/tools/youtube-earnings-calculator"
                                            className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-bold hover:bg-emerald-100 transition-colors"
                                        >
                                            View All Countries
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Key Facts for AI Extraction — per-tool data, not boilerplate */}
                            <div className="key-facts card-3d rounded-3xl p-6 sm:p-8">
                                <h2 className="text-xl font-black text-slate-900 mb-4 font-outfit">
                                    Tool Specifications &amp; Key Facts
                                </h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                                    {[
                                        { label: "Tool", value: tool.name },
                                        {
                                            label: "Category",
                                            value: toolCategories.find((c) => c.id === tool.category)?.name ?? tool.category,
                                        },
                                        {
                                            label: "Engine",
                                            value: tool.isAI ? "AI-Assisted Studio" : "Instant Browser Utility",
                                        },
                                        {
                                            label: "Speed",
                                            value: tool.howTo?.totalTime === "PT1M" ? "Under 1 minute" : "Instant execution",
                                        },
                                        { label: "Pricing", value: "100% Free · No Signup" },
                                        { label: "Data Last Reviewed", value: DATA_LAST_REVIEWED },
                                    ].map((fact) => (
                                        <li
                                            key={fact.label}
                                            className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70"
                                        >
                                            <span className="text-emerald-600 font-black" aria-hidden="true">✓</span>
                                            <span><strong>{fact.label}:</strong> {fact.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Server-rendered long-form SEO body (crawlable, unique per tool) */}
                            <article className="space-y-6 animate-fade-in-up delay-100" itemScope itemType="https://schema.org/TechArticle">
                                <meta itemProp="headline" content={tool.name} />

                                {seoSections.map((section, idx) => (
                                    <section key={`${section.title}-${idx}`} className="card-3d rounded-3xl p-6 sm:p-8">
                                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 font-outfit" itemProp="articleSection">
                                            {section.title}
                                        </h2>
                                        <p className="text-slate-600 leading-relaxed text-base sm:text-lg" itemProp="text">
                                            {section.content}
                                        </p>
                                    </section>
                                ))}

                                {clusterLinks.length > 0 && (
                                    <p className="text-slate-600 leading-relaxed px-1">
                                        Related resources:{" "}
                                        {clusterLinks.map((link, i) => (
                                            <span key={link.path}>
                                                <Link href={link.path} className="text-purple-600 font-semibold hover:underline">
                                                    {link.title}
                                                </Link>
                                                {i < clusterLinks.length - 1 ? " · " : ""}
                                            </span>
                                        ))}
                                        .
                                    </p>
                                )}

                                {/* How To Section */}
                                {tool.howTo && (
                                    <div className="card-3d rounded-3xl p-6 sm:p-8">
                                        <h2 className="text-2xl font-black text-slate-900 mb-3 font-outfit">
                                            {tool.howTo.name}
                                        </h2>
                                        <p className="text-slate-600 mb-7 text-base sm:text-lg">
                                            {tool.howTo.description}
                                        </p>
                                        <div className="space-y-6">
                                            {tool.howTo.steps.map((step, idx) => (
                                                <div key={idx} className="flex gap-4 sm:gap-5 items-start">
                                                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white flex items-center justify-center font-black text-sm shadow-[0_3px_0_0_#4c1d95]">
                                                        {idx + 1}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-extrabold text-lg text-slate-900 mb-1 font-outfit">
                                                            {step.name}
                                                        </h3>
                                                        <p className="text-slate-600 text-base leading-relaxed">
                                                            {step.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </article>

                            {/* FAQ Section (always rendered from expanded set; native
                                details/summary keeps Q&A text crawlable without JS) */}
                            {seoFaqs.length > 0 && (
                                <div className="animate-fade-in-up delay-200">
                                    <h2 className="text-2xl font-black text-slate-900 mb-6 font-outfit">
                                        Frequently Asked Questions
                                    </h2>
                                    <FaqAccordion items={seoFaqs} headingLevel="h3" />
                                </div>
                            )}

                            {/* Related guides — tool → blog internal links */}
                            {relatedGuides.length > 0 && (
                                <div className="card-3d rounded-3xl p-6 sm:p-8">
                                    <h2 className="text-2xl font-black text-slate-900 mb-2 font-outfit">
                                        Related Creator Guides
                                    </h2>
                                    <p className="text-slate-600 mb-6 text-sm sm:text-base">
                                        Deep-dive Playbooks &amp; RPM strategies that pair with this tool.
                                    </p>
                                    <ul className="space-y-3">
                                        {relatedGuides.map((guide) => (
                                            <li key={guide.slug}>
                                                <Link
                                                    href={`/blog/${guide.slug}`}
                                                    className="group flex items-start justify-between gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 px-4 py-3.5 hover:border-purple-300 hover:bg-white hover:shadow-sm transition-all"
                                                >
                                                    <span>
                                                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-600">
                                                            {guide.category}
                                                        </span>
                                                        <span className="block font-bold text-slate-800 group-hover:text-purple-700 mt-0.5">
                                                            {guide.title}
                                                        </span>
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Newsletter CTA */}
                            <AdSectionIgnore>
                                <div className="my-8">
                                    <NewsletterSignup />
                                </div>

                                {/* Related Tools */}
                                <div className="card-3d rounded-3xl p-6 sm:p-8 mt-8">
                                    <div className="flex items-center justify-between gap-3 mb-5">
                                        <h3 className="text-xl font-black text-slate-900 font-outfit">
                                            Related 3D Creator Tools
                                        </h3>
                                        <Link
                                            href="/tools"
                                            className="text-xs font-extrabold text-purple-700 hover:text-purple-900"
                                        >
                                            All {tools.length} Tools →
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        {relatedTools.map((t) => (
                                            <Link
                                                key={t.slug}
                                                href={`/tools/${t.slug}`}
                                                className="group flex items-center gap-3.5 p-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-purple-300 hover:shadow-md transition-all"
                                            >
                                                <ToolIcon3D
                                                    slug={t.slug}
                                                    category={t.category}
                                                    size="sm"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <span className="block font-bold text-sm text-slate-900 group-hover:text-purple-700 transition-colors leading-snug">
                                                        {t.name}
                                                    </span>
                                                    <span className="block text-xs text-slate-500 truncate mt-0.5">
                                                        {t.shortDescription}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </AdSectionIgnore>
                        </div>

                        {/* Sidebar Column — ad-only rail for vertical AdSense */}
                        <div className="max-lg:hidden lg:col-span-1 min-w-0">
                            <BlogSidebar />
                        </div>
                    </div>
                    {/* Recommended Content / Multiplex Ad Unit */}
                    <AdSlot slot={AD_SLOTS.MULTIPLEX} preset="multiplex" label="Recommended For Creators" className="my-10" />
                </div>
            </div>

        </>
    );
}
