import Link from "next/link";
import { Metadata } from "next";
import { getToolsByCategory } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { getToolListSchema, getBreadcrumbSchema, getFAQSchema, getGlobalAlternates } from "@/lib/seo";
import GoogleAd from "@/components/ads/GoogleAd";
import AffiliateBanner from "@/components/ads/AffiliateBanner";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import { AD_SLOTS } from "@/lib/adsense";

export const metadata: Metadata = {
    title: "YouTube SEO Tools - Title, Description & Tag Generators 2026",
    description: "The complete YouTube SEO toolkit for 2026. Generate viral titles, optimized descriptions, high-ranking tags, and trending hashtags. 5 free AI-powered tools.",
    keywords: ["youtube seo tools", "viral title generator", "seo description maker", "youtube tag generator 2026", "keyword research for youtube", "trending hashtags finder"],
    openGraph: {
        title: "5 Free YouTube SEO Tools | Titles, Tags, Descriptions & More 2026",
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
    const seoTools = getToolsByCategory("seo-metadata");

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

            {/* JSON-LD Schemas */}
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
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />

            <div className="min-h-screen py-16 lg:py-20 relative overflow-hidden">
                <div className="nebula-bg" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-purple-600 transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/tools" className="hover:text-purple-600 transition-colors">
                            Tools
                        </Link>
                        <span>/</span>
                        <span className="text-slate-900 font-medium font-outfit">SEO Tools</span>
                    </nav>

                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
                            5 Free SEO Tools
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight font-outfit">
                            YouTube SEO Tools 2026
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed summary" data-speakable>
                            Master the 2026 algorithm with our AI-powered SEO suite. We help you bridge the gap between &ldquo;search intent&rdquo; and &ldquo;viral discovery&rdquo; through data-driven optimization.
                        </p>
                    </div>

                    {/* Top Leaderboard Ad */}
                    <div className="mb-12 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 min-h-[90px] flex flex-col items-center justify-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 text-center">Advertisement</p>
                        <GoogleAd slot={AD_SLOTS.HEADER} lazy={false} responsive className="w-full text-center" />
                    </div>

                    {/* SEO Strategy Checklist */}
                    <div className="summary glass-premium rounded-2xl p-8 border-l-4 border-purple-500 mb-12 shadow-sm">
                        <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center gap-2 font-outfit">
                            📈 The 2026 Semantic SEO Checklist
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6 text-slate-700">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>Semantic Keywords:</strong> Don&apos;t just target one tag; target the entire &ldquo;Topic Cluster&rdquo; using our Tag Generator.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>First 200 Characters:</strong> Ensure your description hook contains your primary keyword for Google Search indexing.</span>
                                </li>
                            </ul>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>Competitor Spying:</strong> Use the Tag Extractor to identify the &ldquo;Hidden Keywords&rdquo; driving traffic to viral competitors.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>Natural Language:</strong> Titles must sound human-written. AI detectors in the 2026 algorithm favor &ldquo;Emotional Authenticity.&rdquo;</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {seoTools.map((tool) => (
                            <Link
                                key={tool.slug}
                                href={`/tools/${tool.slug}`}
                                className="group glass-premium rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/20"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-500">
                                        <tool.icon className="w-8 h-8" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-outfit">
                                                {tool.name}
                                            </h3>
                                            {tool.isAI && (
                                                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-wider">AI</span>
                                            )}
                                        </div>
                                        <p className="text-slate-600 leading-relaxed text-lg">
                                            {tool.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pro Creator Growth Recommendation */}
                    <div className="my-8">
                        <AffiliateBanner toolId="vidiq" variant="inArticle" />
                    </div>

                    {/* Ad placement */}
                    <div className="my-8" aria-hidden="true">
                        <GoogleAd slot="8649718301" />
                    </div>

                    {/* Deep Dive Content */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="glass-premium rounded-3xl p-10 shadow-sm">
                                <h2 className="text-3xl font-bold text-slate-900 mb-6 font-outfit">
                                    Why Keyword Research is Different in 2026
                                </h2>
                                <div className="prose prose-lg max-w-none text-slate-600">
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
                            <div className="glass-premium rounded-3xl p-8 bg-gradient-to-b from-blue-900 to-indigo-900 text-white border-0 shadow-2xl">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">💎 Pro Hack</h3>
                                <p className="text-blue-100 mb-6 leading-relaxed">
                                    Use the <strong>Hashtag Generator</strong> to find 3-5 high-volume tags for your description. These act as &ldquo;Category Anchors&rdquo; that tell YouTube exactly which &ldquo;Watch Next&rdquo; feeds your video belongs in.
                                </p>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 italic text-sm text-blue-200">
                                    &ldquo;SEO and AEO are now the same thing. Optimize for the answer, not just the word.&rdquo;
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AEO / FAQ Section */}
                    <div className="glass-premium rounded-3xl p-8 sm:p-10 shadow-sm mb-12" data-speakable>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 font-outfit">
                            Frequently Asked Questions About YouTube SEO
                        </h2>
                        <div className="space-y-6">
                            {seoFaqs.map((faq, idx) => (
                                <div key={idx} className="border-b border-slate-200/80 pb-5 last:border-0 last:pb-0">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                                        {faq.question}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="text-center">
                        <Link
                            href="/tools"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-bold text-lg transition-all shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1"
                        >
                            Explore Analytics &amp; Trends
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
