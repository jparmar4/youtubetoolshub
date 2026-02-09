import Link from "next/link";
import { Metadata } from "next";
import { ToolCard } from "@/components/ui/Card";
import InFeedAd from "@/components/ads/InFeedAd";
import HorizontalAd from "@/components/ads/HorizontalAd";
import { tools, toolCategories, getToolsByCategory } from "@/config/tools";
import { getToolListSchema, getBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "16+ Professional YouTube Growth & AI Tools 2026 | Free Suite",
    description: "🔥 The world's #1 suite of free YouTube tools. CPM calculators, revenue estimators, AI thumbnail generators, and SEO optimizers. Trusted by 100K+ professional creators in 2026.",
    keywords: [
        "youtube marketing tools 2026",
        "professional youtube software free",
        "youtube monetization suite",
        "youtube cpm calculator 2026",
        "youtube revenue estimator",
        "youtube automation tools",
        "ai content creator suite",
        "rank youtube videos 2026",
        "best youtube growth tools"
    ],
    openGraph: {
        title: "All YouTube Tools | Growth, SEO & AI Suite 2026",
        description: "16+ professional grade tools to help you grow your channel, optimize your SEO, and maximize your earnings. 100% free.",
        type: "website",
        url: `${siteConfig.url}/tools`,
    },
    alternates: {
        canonical: "/tools",
    },
};

export default function ToolsPage() {
    // Generate JSON-LD schemas
    const toolListSchema = getToolListSchema(
        tools.map((tool) => ({
            name: tool.name,
            url: `${siteConfig.url}/tools/${tool.slug}`,
            description: tool.shortDescription,
        }))
    );

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Tools", url: `${siteConfig.url}/tools` },
    ]);

    return (
        <>
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

            <div className="min-h-screen py-20 relative overflow-hidden bg-slate-50">
                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-purple-100/40 via-blue-50/20 to-transparent -z-10" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -z-10" />
                <div className="absolute top-1/2 -left-24 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Header */}
                    <div className="text-center mb-20 animate-fade-in-up">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-widest mb-6 shadow-lg shadow-purple-500/20">
                            Creator Suite 2026
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight font-outfit">
                            All YouTube Tools
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-outfit">
                            Everything you need to master the algorithm, optimize for search, and scale your monetization. From AI-driven thumbnails to expert-level SEO—completely free for creators.
                        </p>
                    </div>

                    {/* Above-the-fold Ad Placement */}
                    <div className="max-w-4xl mx-auto mb-16">
                        <HorizontalAd />
                    </div>

                    {/* Tools by Category */}
                    <div className="space-y-32">
                        {toolCategories.map((category, index) => {
                            const categoryTools = getToolsByCategory(category.id);
                            return (
                                <div key={category.id}>
                                    {/* Insert Ad after every 2 categories */}
                                    {index > 0 && index % 2 === 0 && (
                                        <div className="max-w-4xl mx-auto mb-20">
                                            <InFeedAd />
                                        </div>
                                    )}

                                    <section className="animate-fade-in-up">
                                        <div className="mb-12 flex flex-col items-center text-center">
                                            <h2 className="text-4xl font-bold text-slate-900 mb-4 font-outfit relative">
                                                {category.name}
                                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-purple-500 rounded-full"></div>
                                            </h2>
                                            <p className="text-lg text-slate-500 max-w-2xl mb-6">
                                                {category.description}
                                            </p>
                                            {/* Link to Hub Page */}
                                            {(() => {
                                                const hubMap: Record<string, string> = {
                                                    "thumbnail-media": "/tools/thumbnail-tools",
                                                    "seo-metadata": "/tools/seo-tools",
                                                    "channel-growth": "/tools/channel-tools",
                                                    "analytics-earnings": "/tools/analytics-tools",
                                                    "utility-fun": "/tools/utility-tools"
                                                };
                                                const hubUrl = hubMap[category.id];
                                                return hubUrl ? (
                                                    <Link
                                                        href={hubUrl}
                                                        className="inline-flex items-center gap-2 text-purple-600 font-bold hover:text-purple-700 transition-colors group"
                                                    >
                                                        View Full {category.name.replace(" Tools", "")} Suite
                                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                        </svg>
                                                    </Link>
                                                ) : null;
                                            })()}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {categoryTools.map((tool) => (
                                                <ToolCard
                                                    key={tool.slug}
                                                    icon={<tool.icon />}
                                                    title={tool.name}
                                                    description={tool.shortDescription}
                                                    href={`/tools/${tool.slug}`}
                                                    isAI={tool.isAI}
                                                    className="hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-xl border-white/40 glass-premium"
                                                />
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            );
                        })}

                        {/* Trust Bar Section */}
                        <div className="glass-premium rounded-3xl p-12 text-center border border-white/40 shadow-sm animate-fade-in-up">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-outfit italic">
                                "The only toolkit a serious creator needs in 2026."
                            </h3>
                            <div className="flex justify-center items-center gap-8 opacity-40 grayscale">
                                <span className="font-bold text-xl tracking-tighter">ALGORITHM READY</span>
                                <span className="font-bold text-xl tracking-tighter">E-E-A-T CERTIFIED</span>
                                <span className="font-bold text-xl tracking-tighter">AI POWERED</span>
                                <span className="font-bold text-xl tracking-tighter">GEO OPTIMIZED</span>
                            </div>
                        </div>

                        {/* Final In-Feed Ad after lists */}
                        <div className="max-w-4xl mx-auto pt-10">
                            <InFeedAd />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
