import Link from "next/link";
import { Metadata } from "next";
import { FaHeading, FaAlignLeft, FaTags, FaSearch } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { getToolListSchema } from "@/lib/seo";

export const metadata: Metadata = {
    title: "YouTube SEO Tools - Title, Description, Tag & Hashtag Generators",
    description: "Complete YouTube SEO toolkit. Generate viral titles, optimized descriptions, high-ranking tags, and trending hashtags. 5 free AI-powered tools for maximum discoverability.",
    keywords: ["youtube seo tools", "title generator", "tag generator", "description generator", "youtube optimization", "video seo"],
    openGraph: {
        title: "5 Free YouTube SEO Tools | Titles, Tags, Descriptions & More",
        description: "AI-powered tools to optimize your YouTube videos for search. Generate viral titles, SEO descriptions, and high-ranking tags in seconds.",
        type: "website",
    },
    alternates: {
        canonical: "/tools/seo-tools",
    },
};

const seoTools = [
    {
        slug: "youtube-title-generator",
        name: "YouTube Title Generator",
        description: "Generate SEO-optimized, clickable YouTube titles using AI. Choose from different tones and languages.",
        icon: FaHeading,
    },
    {
        slug: "youtube-description-generator",
        name: "YouTube Description Generator",
        description: "Create engaging video descriptions with AI. Includes hooks, bullet points, CTAs, and hashtags.",
        icon: FaAlignLeft,
    },
    {
        slug: "youtube-tag-generator",
        name: "YouTube Tag Generator",
        description: "Generate SEO-optimized trending tags that help your videos rank. Primary, search, and long-tail keywords.",
        icon: FaTags,
    },
    {
        slug: "youtube-tag-extractor",
        name: "YouTube Tag Extractor",
        description: "Extract tags from any YouTube video URL. See what keywords successful videos are using.",
        icon: FaSearch,
    },
    {
        slug: "youtube-hashtag-generator",
        name: "YouTube Hashtag Generator",
        description: "Generate relevant hashtags for your YouTube videos. Get broad and specific hashtag suggestions.",
        icon: FaTags,
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
                        <span className="text-slate-900 font-medium">SEO Tools</span>
                    </nav>

                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                            YouTube SEO Tools
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Optimize your videos for maximum discoverability. AI-powered tools to generate titles,
                            descriptions, tags, and hashtags that rank.
                        </p>
                    </div>

                    {/* Quick Summary */}
                    <div className="summary glass-premium rounded-2xl p-6 border-l-4 border-purple-500 mb-12">
                        <h2 className="text-lg font-bold text-purple-600 mb-2">⚡ Complete SEO Workflow</h2>
                        <ul className="text-slate-700 text-lg space-y-2">
                            <li>✓ Generate viral, click-worthy titles optimized for search</li>
                            <li>✓ Create SEO-friendly descriptions with hooks and CTAs</li>
                            <li>✓ Find high-ranking tags and keywords for your niche</li>
                            <li>✓ Spy on competitor tags to understand their strategy</li>
                            <li>✓ Add trending hashtags to maximize reach</li>
                        </ul>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {seoTools.map((tool) => (
                            <Link
                                key={tool.slug}
                                href={`/tools/${tool.slug}`}
                                className="group glass-premium rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                        <tool.icon className="w-7 h-7" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                                            {tool.name}
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed">
                                            {tool.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Why SEO Matters - Content Section */}
                    <div className="glass-premium rounded-2xl p-8 mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Why YouTube SEO Is Critical in 2026
                        </h2>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-slate-600 leading-relaxed mb-4">
                                YouTube processes <strong>3 billion searches per month</strong>, making it the world's second-largest search engine. Without proper SEO, your videos are invisible.
                            </p>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">The YouTube Algorithm Prioritizes:</h3>
                            <ul className="text-slate-600 space-y-2 mb-4">
                                <li><strong>Keyword Relevance:</strong> Titles and tags must match search intent</li>
                                <li><strong>Click-Through Rate (CTR):</strong> Compelling titles get more impressions</li>
                                <li><strong>Watch Time:</strong> Accurate descriptions set proper expectations</li>
                                <li><strong>Topic Authority:</strong> Consistent tagging builds niche expertise</li>
                            </ul>
                            <p className="text-slate-600 leading-relaxed">
                                Our SEO tools are built on analysis of <strong>millions of top-performing videos</strong>, helping you replicate what works without the guesswork.
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <Link
                            href="/tools"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
                        >
                            Explore All Tools
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
