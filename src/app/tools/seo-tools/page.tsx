import Link from "next/link";
import { Metadata } from "next";
import { getToolsByCategory } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { getToolListSchema } from "@/lib/seo";

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
    alternates: {
        canonical: "/tools/seo-tools",
    },
};

export default function SEOToolsHub() {
    const seoTools = getToolsByCategory("seo-metadata");

    const toolListSchema = getToolListSchema(
        seoTools.map((tool) => ({
            name: tool.name,
            url: `${siteConfig.url}/tools/${tool.slug}`,
            description: tool.description,
        }))
    );

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(toolListSchema),
                }}
            />

            <div className="min-h-screen py-20 relative overflow-hidden">
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
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight font-outfit">
                            YouTube SEO Tools 2026
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Master the 2026 algorithm with our AI-powered SEO suite. We help you bridge the gap between "search intent" and "viral discovery" through data-driven optimization.
                        </p>
                    </div>

                    {/* SEO Strategy Checklist */}
                    <div className="summary glass-premium rounded-2xl p-8 border-l-4 border-purple-500 mb-12 shadow-sm">
                        <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                            📈 The 2026 Semantic SEO Checklist
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6 text-slate-700">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>Semantic Keywords:</strong> Don't just target one tag; target the entire "Topic Cluster" using our Tag Generator.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>First 200 Characters:</strong> Ensure your description hook contains your primary keyword for Google Search indexing.</span>
                                </li>
                            </ul>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>Competitor Spying:</strong> Use the Tag Extractor to identify the "Hidden Keywords" driving traffic to viral competitors.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>Natural Language:</strong> Titles must sound human-written. AI detectors in the 2026 algorithm favor "Emotional Authenticity."</span>
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

                    {/* Deep Dive Content */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="glass-premium rounded-3xl p-10 shadow-sm">
                                <h2 className="text-3xl font-bold text-slate-900 mb-6 font-outfit">
                                    Why Keyword Research is Different in 2026
                                </h2>
                                <div className="prose prose-lg max-w-none text-slate-600">
                                    <p className="mb-4">
                                        Gone are the days of "Keyword Stuffing". In 2026, YouTube's AI uses <strong>Natural Language Processing (NLP)</strong> to understand the context of your video. Our tools help you align with this shift:
                                    </p>
                                    <ul className="space-y-4">
                                        <li><strong>The Title Hook:</strong> We optimize for "Click-to-Search Ratio". It's not just about being found; it's about being the most relevant result for the user's specific problem.</li>
                                        <li><strong>Description Hierarchy:</strong> We help you structure your description so the most important SEO signals are in the "Above the Fold" section (the first 2 lines).</li>
                                        <li><strong>Semantic Tagging:</strong> Our Tag Generator provides LSI (Latent Semantic Indexing) keywords that help YouTube's algorithm categorize your video within the correct "Monetization Niche."</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="glass-premium rounded-3xl p-8 bg-gradient-to-b from-blue-900 to-indigo-900 text-white border-0 shadow-2xl">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">💎 Pro Hack</h3>
                                <p className="text-blue-100 mb-6 leading-relaxed">
                                    Use the <strong>Hashtag Generator</strong> to find 3-5 high-volume tags for your description. These act as "Category Anchors" that tell YouTube exactly which "Watch Next" feeds your video belongs in.
                                </p>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 italic text-sm text-blue-200">
                                    "SEO and AEO are now the same thing. Optimize for the answer, not just the word."
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="text-center">
                        <Link
                            href="/tools"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-bold text-lg transition-all shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1"
                        >
                            Explore Analytics & Trends
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
