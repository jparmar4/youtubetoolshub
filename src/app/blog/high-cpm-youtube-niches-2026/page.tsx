import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { FaDollarSign, FaChartLine, FaLightbulb, FaRocket, FaTools } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Best YouTube Niches for High CPM in 2026 | Top Paying Categories",
    description: "Discover the highest CPM YouTube niches in 2026. Finance, tech, and business niches pay $20-50+ CPM. Complete guide to choosing profitable niches for maximum revenue.",
    keywords: ["high cpm youtube niches", "best youtube niches 2026", "youtube cpm by niche", "most profitable youtube niches", "youtube niche selection"],
    openGraph: {
        title: "Best YouTube Niches for High CPM 2026",
        description: "Finance, tech, and business niches pay $20-50+ CPM. Find your profitable niche.",
        url: `${siteConfig.url}/blog/high-cpm-youtube-niches-2026`,
        images: [`${siteConfig.url}/images/blog/most-profitable-youtube-niches-2026.png`],
    },
    twitter: {
        card: "summary_large_image",
        title: "Best YouTube Niches for High CPM 2026",
        description: "Finance, tech, and business niches pay $20-50+ CPM",
        images: [`${siteConfig.url}/images/blog/most-profitable-youtube-niches-2026.png`],
    },
    alternates: {
        canonical: "/blog/high-cpm-youtube-niches-2026",
        languages: {
            "en": "/blog/high-cpm-youtube-niches-2026",
            "x-default": "/blog/high-cpm-youtube-niches-2026",
        },
    },
};

const topNiches = [
    {
        niche: "Finance & Investing",
        cpm: "$25-50",
        competition: "High",
        description: "Stock market, crypto, personal finance. Advertisers pay premium for financially-minded audiences.",
    },
    {
        niche: "Business & Entrepreneurship",
        cpm: "$20-40",
        competition: "Medium-High",
        description: "Startups, side hustles, marketing. B2B advertisers have high customer lifetime value.",
    },
    {
        niche: "Technology & Software",
        cpm: "$15-35",
        competition: "Medium",
        description: "SaaS reviews, tutorials, tech news. Software companies pay well for qualified leads.",
    },
    {
        niche: "Health & Wellness",
        cpm: "$12-25",
        competition: "Medium",
        description: "Fitness, nutrition, mental health. Health advertisers target engaged, motivated audiences.",
    },
    {
        niche: "Real Estate",
        cpm: "$20-45",
        competition: "Medium",
        description: "Property investing, home buying, market analysis. High-value purchase decisions.",
    },
];

const nicheTools = [
    {
        name: "Earnings Calculator",
        description: "Estimate your earnings based on niche CPM and view count.",
        link: "/tools/youtube-earnings-calculator",
    },
    {
        name: "Channel Audit",
        description: "Analyze your niche positioning and revenue potential.",
        link: "/tools/youtube-channel-audit",
    },
    {
        name: "Trend Analyzer",
        description: "Discover trending topics in high-CPM niches.",
        link: "/tools/youtube-trend-analyzer",
    },
];

export default function HighCPMNichesPage() {
    const articleSchema = getArticleSchema({
        title: metadata.title as string,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/high-cpm-youtube-niches-2026`,
        imageUrl: `${siteConfig.url}/images/blog/most-profitable-youtube-niches-2026.png`,
        datePublished: "2026-02-01",
        dateModified: "2026-02-01",
        author: siteConfig.name,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: "High CPM YouTube Niches", url: "/blog/high-cpm-youtube-niches-2026" },
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 text-sm font-bold mb-6">
                            <FaDollarSign className="text-lg" />
                            CPM Guide 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            Best YouTube Niches for<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">High CPM</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Choose the right niche to maximize your YouTube earnings. Finance and business niches pay 10x more than entertainment.
                        </p>
                    </div>

                    {/* Key Statistics */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-green-600 mb-2">$25-50</div>
                            <div className="text-slate-600 dark:text-slate-400">Finance niche CPM</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-emerald-600 mb-2">$2-5</div>
                            <div className="text-slate-600 dark:text-slate-400">Gaming niche CPM</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-blue-600 mb-2">10x</div>
                            <div className="text-slate-600 dark:text-slate-400">CPM difference by niche</div>
                        </div>
                    </div>

                    {/* Niche Table */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Top 5 High-CPM Niches</h2>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-slate-50 dark:bg-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Niche</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">CPM Range</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">Competition</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {topNiches.map((niche, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-900 dark:text-white">{niche.niche}</div>
                                                <div className="text-sm text-slate-600 dark:text-slate-400">{niche.description}</div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-green-600 font-bold">{niche.cpm}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">{niche.competition}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Tools Section */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Niche Research Tools</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {nicheTools.map((tool, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <FaTools className="text-green-500 text-xl" />
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            {tool.name}
                                        </h3>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                                        {tool.description}
                                    </p>
                                    <Link
                                        href={tool.link}
                                        className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                                    >
                                        Try Now
                                        <FaRocket className="text-sm" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Calculate Your Niche Earnings</h2>
                        <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
                            See how much you could earn in different niches with our free earnings calculator.
                        </p>
                        <Link
                            href="/tools/youtube-earnings-calculator"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                        >
                            <FaDollarSign className="text-xl" />
                            Calculate Earnings
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
