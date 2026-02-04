import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { FaSearch, FaChartLine, FaLightbulb, FaRocket, FaTools, FaCheck } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Best YouTube Keyword Research Tools 2026 | Free & Paid Options",
    description: "Discover the best YouTube keyword research tools for 2026. Compare TubeBuddy, VidIQ, Ahrefs, and free alternatives to find high-ranking keywords for your videos.",
    keywords: ["youtube keyword research", "youtube keyword tool", "youtube seo tools", "youtube keyword research tool", "find youtube keywords"],
    openGraph: {
        title: "Best YouTube Keyword Research Tools 2026",
        description: "Compare the best free and paid YouTube keyword tools for higher rankings",
        url: `${siteConfig.url}/blog/youtube-keyword-research-tools-2026`,
        images: [`${siteConfig.url}/images/blog/youtube-keyword-tools.png`],
    },
    twitter: {
        card: "summary_large_image",
        title: "Best YouTube Keyword Research Tools 2026",
        description: "Compare the best free and paid YouTube keyword tools",
        images: [`${siteConfig.url}/images/blog/youtube-keyword-tools.png`],
    },
    alternates: {
        canonical: "/blog/youtube-keyword-research-tools-2026",
        languages: {
            "en": "/blog/youtube-keyword-research-tools-2026",
            "x-default": "/blog/youtube-keyword-research-tools-2026",
        },
    },
};

const keywordTools = [
    {
        name: "YouTube Search Suggest",
        price: "Free",
        rating: "8/10",
        description: "Type keywords in YouTube search to see autocomplete suggestions. Simple but effective for finding what people search.",
    },
    {
        name: "VidIQ",
        price: "$7.50+/mo",
        rating: "9/10",
        description: "Industry-leading keyword scores, competition analysis, and trend data. Best for serious YouTubers.",
    },
    {
        name: "TubeBuddy",
        price: "$4.50+/mo",
        rating: "9/10",
        description: "Excellent keyword explorer with SEO scores. Great value with A/B testing included.",
    },
    {
        name: "Ahrefs",
        price: "$99+/mo",
        rating: "8/10",
        description: "Powerful SEO tool with YouTube search volume data. Best for agencies and professionals.",
    },
    {
        name: "YouTube Tools Hub",
        price: "Free",
        rating: "8/10",
        description: "Our free keyword tool with search volume estimates and related keyword suggestions.",
    },
];

const keywordStrategies = [
    {
        title: "Target Long-Tail Keywords",
        description: "Focus on 4-6 word phrases with lower competition. \"How to edit videos on iPhone 2026\" beats \"video editing\".",
        icon: <FaSearch className="text-blue-500" />,
    },
    {
        title: "Analyze Competitor Keywords",
        description: "Use VidIQ or TubeBuddy to see what keywords top videos rank for, then create better content targeting the same terms.",
        icon: <FaChartLine className="text-green-500" />,
    },
    {
        title: "Check Search Intent",
        description: "Make sure your content matches what searchers want. Tutorial keywords need tutorials, not vlogs.",
        icon: <FaLightbulb className="text-yellow-500" />,
    },
];

const freeTools = [
    {
        name: "Keyword Tool",
        description: "Find high-volume, low-competition YouTube keywords.",
        link: "/tools/youtube-keyword-tool",
    },
    {
        name: "Tag Generator",
        description: "Generate keyword-rich tags from any topic.",
        link: "/tools/youtube-tag-generator",
    },
    {
        name: "Title Generator",
        description: "Create SEO-optimized titles with target keywords.",
        link: "/tools/youtube-title-generator",
    },
];

export default function YouTubeKeywordToolsPage() {
    const articleSchema = getArticleSchema({
        title: metadata.title as string,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/youtube-keyword-research-tools-2026`,
        imageUrl: `${siteConfig.url}/images/blog/youtube-keyword-tools.png`,
        datePublished: "2026-02-01",
        dateModified: "2026-02-01",
        author: siteConfig.name,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: "YouTube Keyword Tools", url: "/blog/youtube-keyword-research-tools-2026" },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-bold mb-6">
                            <FaSearch className="text-lg" />
                            SEO Tools Guide 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            Best YouTube<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Keyword Research Tools</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Compare the best free and paid keyword tools to rank your videos higher and get more views.
                        </p>
                    </div>

                    {/* Tool Comparison Table */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Top Keyword Tools Compared</h2>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-slate-50 dark:bg-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Tool</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">Price</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">Rating</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {keywordTools.map((tool, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-900 dark:text-white">{tool.name}</div>
                                                <div className="text-sm text-slate-600 dark:text-slate-400">{tool.description}</div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={tool.price === "Free" ? "text-green-600 font-bold" : "text-slate-600 dark:text-slate-400"}>
                                                    {tool.price}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center font-bold text-blue-600">{tool.rating}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Keyword Strategies */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Keyword Research Strategies</h2>
                        <div className="grid gap-6">
                            {keywordStrategies.map((strategy, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                            {strategy.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                                {strategy.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                                {strategy.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Free Tools */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Our Free Keyword Tools</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {freeTools.map((tool, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <FaTools className="text-blue-500 text-xl" />
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            {tool.name}
                                        </h3>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                                        {tool.description}
                                    </p>
                                    <Link
                                        href={tool.link}
                                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Try Free
                                        <FaRocket className="text-sm" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Start Your Keyword Research</h2>
                        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                            Use our free keyword tool to find high-volume, low-competition keywords for your next video.
                        </p>
                        <Link
                            href="/tools/youtube-keyword-tool"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                        >
                            <FaSearch className="text-xl" />
                            Find Keywords Now
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
