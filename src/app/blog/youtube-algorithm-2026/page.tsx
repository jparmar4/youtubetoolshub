import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { FaCog, FaChartLine, FaClock, FaThumbsUp, FaRocket, FaTools } from "react-icons/fa";

export const metadata: Metadata = {
    title: "How the YouTube Algorithm Works in 2026 | Complete Guide",
    description: "Learn how the YouTube algorithm works in 2026. Understand CTR, watch time, and engagement signals. Get more views by optimizing for the algorithm's ranking factors.",
    keywords: ["youtube algorithm", "how youtube algorithm works", "youtube algorithm 2026", "youtube ranking factors", "youtube recommendations"],
    openGraph: {
        title: "How the YouTube Algorithm Works 2026",
        description: "Complete guide: CTR, watch time, engagement signals and ranking factors",
        url: `${siteConfig.url}/blog/youtube-algorithm-2026`,
        images: [`${siteConfig.url}/images/blog/youtube-algorithm-2026.png`],
    },
    twitter: {
        card: "summary_large_image",
        title: "YouTube Algorithm Guide 2026",
        description: "Understand how YouTube recommends videos",
        images: [`${siteConfig.url}/images/blog/youtube-algorithm-2026.png`],
    },
    alternates: {
        canonical: "/blog/youtube-algorithm-2026",
        languages: {
            "en": "/blog/youtube-algorithm-2026",
            "x-default": "/blog/youtube-algorithm-2026",
        },
    },
};

const rankingFactors = [
    {
        title: "Click-Through Rate (CTR)",
        importance: "Very High",
        description: "How often people click your video when they see it. Average is 2-10%. Improve with better thumbnails and titles.",
        icon: <FaChartLine className="text-red-500" />,
    },
    {
        title: "Watch Time & Retention",
        importance: "Very High",
        description: "How long people watch your video. Higher retention = more recommendations. Aim for 50%+ average view duration.",
        icon: <FaClock className="text-blue-500" />,
    },
    {
        title: "Engagement Signals",
        importance: "High",
        description: "Likes, comments, shares, and subscribes. These tell YouTube your content is valuable to viewers.",
        icon: <FaThumbsUp className="text-green-500" />,
    },
    {
        title: "Session Time",
        importance: "High",
        description: "How long viewers stay on YouTube after watching your video. Videos that lead to more watching get boosted.",
        icon: <FaCog className="text-purple-500" />,
    },
];

const trafficSources = [
    { source: "Browse (Homepage)", percentage: "30-50%", tip: "CTR + retention are key" },
    { source: "Suggested Videos", percentage: "20-40%", tip: "Related to popular videos" },
    { source: "YouTube Search", percentage: "15-25%", tip: "SEO & keywords matter" },
    { source: "External", percentage: "5-15%", tip: "Social media shares" },
    { source: "Shorts Feed", percentage: "Varies", tip: "Separate algorithm" },
];

const relatedTools = [
    {
        name: "Title Generator",
        description: "Create high-CTR titles optimized for the algorithm.",
        link: "/tools/youtube-title-generator",
    },
    {
        name: "Tag Generator",
        description: "Improve your video discoverability with better tags.",
        link: "/tools/youtube-tag-generator",
    },
    {
        name: "Channel Audit",
        description: "Analyze your algorithm performance metrics.",
        link: "/tools/youtube-channel-audit",
    },
];

export default function YouTubeAlgorithmPage() {
    const articleSchema = getArticleSchema({
        title: metadata.title as string,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/youtube-algorithm-2026`,
        imageUrl: `${siteConfig.url}/images/blog/youtube-algorithm-2026.png`,
        datePublished: "2026-02-04",
        dateModified: "2026-02-04",
        author: siteConfig.name,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: "YouTube Algorithm", url: "/blog/youtube-algorithm-2026" },
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
                            <FaCog className="text-lg" />
                            Algorithm Guide 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            How the YouTube<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Algorithm Works</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Understand the ranking factors that determine which videos get recommended and how to optimize for them.
                        </p>
                    </div>

                    {/* Key Stats */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-blue-600 mb-2">2-10%</div>
                            <div className="text-slate-600 dark:text-slate-400">Average CTR range</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-indigo-600 mb-2">50%+</div>
                            <div className="text-slate-600 dark:text-slate-400">Ideal retention rate</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-purple-600 mb-2">48 hrs</div>
                            <div className="text-slate-600 dark:text-slate-400">Critical launch window</div>
                        </div>
                    </div>

                    {/* Ranking Factors */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Algorithm Ranking Factors</h2>
                        <div className="grid gap-6">
                            {rankingFactors.map((factor, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                            {factor.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                                    {factor.title}
                                                </h3>
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${factor.importance === 'Very High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'}`}>
                                                    {factor.importance}
                                                </span>
                                            </div>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                                {factor.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Traffic Sources */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Traffic Sources</h2>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-slate-50 dark:bg-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Source</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">% of Views</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Optimization Tip</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {trafficSources.map((source, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{source.source}</td>
                                            <td className="px-6 py-4 text-center text-blue-600 font-bold">{source.percentage}</td>
                                            <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">{source.tip}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Tools */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Algorithm Optimization Tools</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedTools.map((tool, index) => (
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
                                        Try Now
                                        <FaRocket className="text-sm" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Master YouTube SEO</h2>
                        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                            Learn more strategies to rank your videos higher in YouTube search.
                        </p>
                        <Link
                            href="/blog/youtube-seo-strategies-2026"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                        >
                            <FaChartLine className="text-xl" />
                            SEO Strategies Guide
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
