import Link from "next/link";
import { Metadata } from "next";
import { ToolCard } from "@/components/ui/Card";
import { getToolsByCategory } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { combineSchemasToGraph, getToolListSchema, getBreadcrumbSchema, getFAQSchema, getGlobalAlternates } from "@/lib/seo";
import AdSlot from "@/components/ads/AdSlot";
import AffiliateBanner from "@/components/ads/AffiliateBanner";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import { AD_SLOTS } from "@/lib/adsense";
import { FaChartLine, FaGem } from "react-icons/fa";

const seoTools = getToolsByCategory("seo-metadata");

export const metadata: Metadata = {
    title: {
        absolute: "Free YouTube SEO Tools — Titles, Tags & Description Maker",
    },
    description: `The complete YouTube SEO toolkit for 2026. Generate viral titles, optimized descriptions, high-ranking tags, and trending hashtags. ${seoTools.length} free AI-powered tools.`,
    keywords: ["youtube seo tools", "viral title generator", "seo description maker", "youtube tag generator 2026", "keyword research for youtube", "trending hashtags finder"],
    openGraph: {
        title: `${seoTools.length} Free YouTube SEO Tools | Titles, Tags, Descriptions & More 2026`,
        description: "AI-powered tools to optimize your YouTube videos for maximum discoverability. Rank higher and get more views with our 2026 SEO suite.",
        type: "website",
        url: `${siteConfig.url}/tools/seo-tools`,
    },
    alternates: getGlobalAlternates("/tools/seo-tools"),
};

const seoFaqs = [
    {
        question: "Do YouTube tags still help video SEO in 2026?",
        answer: "While YouTube states that tags play a secondary role compared to title, thumbnail, and audience watch time, semantic tags still provide critical contextual grounding for YouTube's recommendation system. Tags help categorize novel topics, capture common spelling errors, and establish semantic connections to related video clusters in the 'Up Next' algorithm.",
    },
    {
        question: "How do I optimize YouTube video descriptions for Google Search?",
        answer: "Place your primary keyword naturally in the first 150-200 characters of your description, as this snippet displays in Google and YouTube search results. Add 3-5 structured timestamp chapters, relevant social and resource links, and secondary semantic keywords in the body.",
    },
    {
        question: "What makes a high-CTR YouTube title in 2026?",
        answer: "High-CTR titles combine clear curiosity hooks, emotional power words, and targeted search terms under 60 characters so they don't get truncated on mobile devices. Our Title Generator tests multiple phrasing variations (How-to, Question, Intrigue, Bold Statement) to find the highest-CTR phrasing.",
    },
    {
        question: "How do YouTube hashtags differ from tags?",
        answer: "Hashtags (#) are public clickable links that appear in your video description and above your title, grouping your content into clickable topical feeds. Regular tags are invisible backend metadata that aid YouTube's classification algorithm.",
    },
];

export default function SEOToolsHub() {
    const toolListSchema = getToolListSchema(
        seoTools.map((tool) => ({
            name: tool.name,
            url: `${siteConfig.url}/tools/${tool.slug}`,
            description: tool.description,
        }))
    );

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Tools", url: `${siteConfig.url}/tools` },
        { name: "SEO Tools", url: `${siteConfig.url}/tools/seo-tools` },
    ]);

    const faqSchema = getFAQSchema(seoFaqs);

    return (
        <>
            {/* GEO / AEO signals for AI Answer Engines */}
            <GeoAeoHead
                {...GEO_AEO_PRESETS.categoryPage(
                    "YouTube SEO & Metadata Tools",
                    "Optimize titles, descriptions, semantic tags, and hashtags to boost discoverability across YouTube search and the recommendation algorithm.",
                    seoTools.length,
                    [
                        "AI viral title generator with CTR optimization",
                        "Semantic tag generator & competitor tag extractor",
                        "Multi-zone SEO description builder",
                        "100% free with no browser extension required",
                    ]
                )}
                pathname="/tools/seo-tools"
            />

            {/* JSON-LD Schema (@graph) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        combineSchemasToGraph(toolListSchema, breadcrumbSchema, faqSchema)
                    ),
                }}
            />

            <div className="min-h-screen py-10 sm:py-14 relative overflow-hidden">
                <div className="nebula-bg" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumb
                        items={[
                            { name: "Home", href: "/" },
                            { name: "Tools", href: "/tools" },
                            { name: "SEO Tools" },
                        ]}
                        className="mb-8"
                    />

                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
                            {seoTools.length} Free SEO &amp; Metadata Tools
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-5 tracking-tight font-outfit">
                            YouTube SEO Tools 2026
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed summary" data-speakable>
                            Master the 2026 algorithm with our AI-powered SEO suite. We help you bridge the gap between &ldquo;search intent&rdquo; and &ldquo;viral discovery&rdquo; through data-driven optimization.
                        </p>
                    </div>

                    {/* Top Leaderboard Ad */}
                    <AdSlot slot={AD_SLOTS.HEADER} preset="leaderboard" className="mb-12" />

                    {/* SEO Strategy Checklist */}
                    <div className="summary card-3d rounded-2xl p-8 border-l-4 border-l-purple-500 mb-12">
                        <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2 font-outfit">
                            <FaChartLine className="w-5 h-5" />
                            <span>The 2026 Semantic SEO Checklist</span>
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6 text-slate-700">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-600 font-bold">✓</span>
                                    <span><strong>Semantic Keywords:</strong> Don&apos;t just target one tag; target the entire &ldquo;Topic Cluster&rdquo; using our Tag Generator.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-600 font-bold">✓</span>
                                    <span><strong>First 200 Characters:</strong> Ensure your description hook contains your primary keyword for Google Search indexing.</span>
                                </li>
                            </ul>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-600 font-bold">✓</span>
                                    <span><strong>Competitor Spying:</strong> Use the Tag Extractor to identify the &ldquo;Hidden Keywords&rdquo; driving traffic to viral competitors.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-600 font-bold">✓</span>
                                    <span><strong>Natural Language:</strong> Titles must sound human-written. Clear, benefit-led phrasing outperforms keyword stuffing.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
                        {seoTools.map((tool) => (
                            <ToolCard
                                key={tool.slug}
                                title={tool.name}
                                description={tool.description}
                                href={`/tools/${tool.slug}`}
                                isAI={tool.isAI}
                                category={tool.category}
                            />
                        ))}
                    </div>

                    {/* Pro Creator Growth Recommendation */}
                    <div className="my-8">
                        <AffiliateBanner toolId="vidiq" variant="inArticle" />
                    </div>

                    {/* Ad placement */}
                    <AdSlot slot="7336636636" preset="in-article" className="my-8" />

                    {/* Deep Dive Content */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="card-3d rounded-3xl p-8 sm:p-10">
                                <h2 className="text-3xl font-bold text-slate-900 mb-6 font-outfit">
                                    Why Keyword Research is Different in 2026
                                </h2>
                                <div className="article-prose max-w-none text-slate-600">
                                    <p className="mb-4">
                                        Gone are the days of &ldquo;Keyword Stuffing&rdquo;. In 2026, YouTube&apos;s AI uses <strong>Natural Language Processing (NLP)</strong> to understand the context of your video. Our tools help you align with this shift:
                                    </p>
                                    <ul className="space-y-4">
                                        <li><strong>The Title Hook:</strong> We optimize for &ldquo;Click-to-Search Ratio&rdquo;. It&apos;s not just about being found; it&apos;s about being the most relevant result for the user&apos;s specific problem.</li>
                                        <li><strong>Description Hierarchy:</strong> We help you structure your description so the most important SEO signals are in the &ldquo;Above the Fold&rdquo; section (the first 2 lines).</li>
                                        <li><strong>Semantic Tagging:</strong> Our Tag Generator provides LSI (Latent Semantic Indexing) keywords that help YouTube&apos;s algorithm categorize your video within the correct &ldquo;Monetization Niche.&rdquo;</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="rounded-3xl p-8 bg-gradient-to-b from-blue-900 to-indigo-900 text-white shadow-xl">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <FaGem className="w-5 h-5 text-blue-300" />
                                    <span>Pro Hack</span>
                                </h3>
                                <p className="text-blue-100 mb-6 leading-relaxed">
                                    Use the <strong>Hashtag Generator</strong> to find 3-5 high-volume tags for your description. These act as &ldquo;Category Anchors&rdquo; that tell YouTube exactly which &ldquo;Watch Next&rdquo; feeds your video belongs in.
                                </p>
                                <div className="p-4 rounded-xl bg-white/10 border border-white/15 italic text-sm text-blue-100">
                                    &ldquo;SEO and AEO are now the same thing. Optimize for the answer, not just the word.&rdquo;
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AEO / FAQ Section */}
                    <section className="mb-12" data-speakable>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 font-outfit">
                            Frequently Asked Questions About YouTube SEO
                        </h2>
                        <FaqAccordion items={seoFaqs} headingLevel="h3" />
                    </section>

                    {/* Final CTA */}
                    <div className="text-center">
                        <Link
                            href="/tools"
                            className="btn-3d-primary inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base sm:text-lg"
                        >
                            Explore All Tools
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
