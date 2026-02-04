import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { FaDollarSign, FaChartLine, FaPlay, FaRocket, FaTools } from "react-icons/fa";

export const metadata: Metadata = {
    title: "YouTube Shorts Monetization 2026: Complete Guide to Earning Money",
    description: "Learn how YouTube Shorts monetization works in 2026. Understand RPM, revenue share, eligibility requirements, and strategies to maximize your Shorts earnings.",
    keywords: ["youtube shorts monetization", "shorts revenue share", "youtube shorts rpm", "shorts fund", "how to monetize shorts"],
    openGraph: {
        title: "YouTube Shorts Monetization 2026 - Complete Guide",
        description: "Everything you need to know about earning money from YouTube Shorts",
        url: `${siteConfig.url}/blog/youtube-shorts-monetization-2026`,
        images: [`${siteConfig.url}/images/blog/youtube-shorts-monetization-2026.png`],
    },
    twitter: {
        card: "summary_large_image",
        title: "YouTube Shorts Monetization 2026",
        description: "Complete guide to earning money from YouTube Shorts",
        images: [`${siteConfig.url}/images/blog/youtube-shorts-monetization-2026.png`],
    },
    alternates: {
        canonical: "/blog/youtube-shorts-monetization-2026",
        languages: {
            "en": "/blog/youtube-shorts-monetization-2026",
            "x-default": "/blog/youtube-shorts-monetization-2026",
        },
    },
};

const monetizationFactors = [
    {
        title: "Revenue Share Model",
        description: "Creators get 45% of Shorts ad revenue (vs 55% for long-form). Ads are pooled across all Shorts, then distributed by view count.",
        icon: <FaDollarSign className="text-green-500" />,
    },
    {
        title: "RPM is Lower Than Long-Form",
        description: "Shorts RPM averages $0.03-0.08 per 1,000 views (vs $2-5 for long-form). Volume is key—you need millions of views to earn significantly.",
        icon: <FaChartLine className="text-blue-500" />,
    },
    {
        title: "Music Licensing Reduces Revenue",
        description: "Using copyrighted music means sharing revenue with music rights holders, further reducing your earnings per view.",
        icon: <FaPlay className="text-red-500" />,
    },
];

const earningsTable = [
    { views: "100,000", lowRPM: "$3-5", avgRPM: "$5-8", highRPM: "$8-12" },
    { views: "1,000,000", lowRPM: "$30-50", avgRPM: "$50-80", highRPM: "$80-120" },
    { views: "10,000,000", lowRPM: "$300-500", avgRPM: "$500-800", highRPM: "$800-1,200" },
    { views: "100,000,000", lowRPM: "$3,000-5,000", avgRPM: "$5,000-8,000", highRPM: "$8,000-12,000" },
];

const relatedTools = [
    {
        name: "Earnings Calculator",
        description: "Estimate your Shorts earnings based on view count.",
        link: "/tools/youtube-earnings-calculator",
    },
    {
        name: "Title Generator",
        description: "Create viral Shorts titles that get more views.",
        link: "/tools/youtube-title-generator",
    },
    {
        name: "Trend Analyzer",
        description: "Find trending topics for your next Shorts video.",
        link: "/tools/youtube-trend-analyzer",
    },
];

export default function YouTubeShortsMonetizationPage() {
    const articleSchema = getArticleSchema({
        title: metadata.title as string,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/youtube-shorts-monetization-2026`,
        imageUrl: `${siteConfig.url}/images/blog/youtube-shorts-monetization-2026.png`,
        datePublished: "2026-02-04",
        dateModified: "2026-02-04",
        author: siteConfig.name,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: "Shorts Monetization", url: "/blog/youtube-shorts-monetization-2026" },
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-sm font-bold mb-6">
                            <FaDollarSign className="text-lg" />
                            Monetization Guide 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            YouTube Shorts<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Monetization Guide</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Everything you need to know about earning money from YouTube Shorts in 2026.
                        </p>
                    </div>

                    {/* Key Statistics */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-red-600 mb-2">45%</div>
                            <div className="text-slate-600 dark:text-slate-400">Creator revenue share</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-orange-600 mb-2">$0.03-0.08</div>
                            <div className="text-slate-600 dark:text-slate-400">RPM per 1,000 views</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-green-600 mb-2">10M</div>
                            <div className="text-slate-600 dark:text-slate-400">Views for YPP alt. path</div>
                        </div>
                    </div>

                    {/* Monetization Factors */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">How Shorts Monetization Works</h2>
                        <div className="grid gap-6">
                            {monetizationFactors.map((factor, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                            {factor.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                                {factor.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                                {factor.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Earnings Table */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Shorts Earnings by Views</h2>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-slate-50 dark:bg-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Views</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">Low RPM</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">Average</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">High RPM</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {earningsTable.map((row, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{row.views}</td>
                                            <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">{row.lowRPM}</td>
                                            <td className="px-6 py-4 text-center text-green-600 font-bold">{row.avgRPM}</td>
                                            <td className="px-6 py-4 text-center text-emerald-600 font-bold">{row.highRPM}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Related Tools */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Shorts Creator Tools</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedTools.map((tool, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <FaTools className="text-red-500 text-xl" />
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            {tool.name}
                                        </h3>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                                        {tool.description}
                                    </p>
                                    <Link
                                        href={tool.link}
                                        className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                                    >
                                        Try Now
                                        <FaRocket className="text-sm" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Calculate Your Shorts Earnings</h2>
                        <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
                            See how much you could earn from your YouTube Shorts based on view counts.
                        </p>
                        <Link
                            href="/tools/youtube-earnings-calculator"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
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
