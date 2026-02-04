import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { FaBalanceScale, FaChartLine, FaCheck, FaTimes, FaRocket, FaTools } from "react-icons/fa";

export const metadata: Metadata = {
    title: "TubeBuddy vs VidIQ 2026: Which YouTube Tool is Better? | Comparison",
    description: "TubeBuddy vs VidIQ comparison for 2026. Compare features, pricing, keyword research, and SEO tools. Find out which YouTube optimization tool is right for your channel.",
    keywords: ["tubebuddy vs vidiq", "vidiq vs tubebuddy", "best youtube seo tool", "youtube keyword research tool", "tubebuddy review", "vidiq review"],
    openGraph: {
        title: "TubeBuddy vs VidIQ 2026 - Complete Comparison",
        description: "Which YouTube SEO tool is better? Compare features, pricing, and more",
        url: `${siteConfig.url}/blog/tubebuddy-vs-vidiq-2026`,
        images: [`${siteConfig.url}/images/blog/tubebuddy-vs-vidiq.png`],
    },
    twitter: {
        card: "summary_large_image",
        title: "TubeBuddy vs VidIQ 2026 - Complete Comparison",
        description: "Which YouTube SEO tool is better? Compare features and pricing",
        images: [`${siteConfig.url}/images/blog/tubebuddy-vs-vidiq.png`],
    },
    alternates: {
        canonical: "/blog/tubebuddy-vs-vidiq-2026",
        languages: {
            "en": "/blog/tubebuddy-vs-vidiq-2026",
            "x-default": "/blog/tubebuddy-vs-vidiq-2026",
        },
    },
};

const comparisonTable = [
    { feature: "Keyword Research", tubebuddy: true, vidiq: true, notes: "Both excellent" },
    { feature: "SEO Score", tubebuddy: true, vidiq: true, notes: "VidIQ more detailed" },
    { feature: "Competitor Analysis", tubebuddy: true, vidiq: true, notes: "VidIQ has edge" },
    { feature: "A/B Thumbnail Testing", tubebuddy: true, vidiq: false, notes: "TubeBuddy exclusive" },
    { feature: "Bulk Processing", tubebuddy: true, vidiq: false, notes: "TubeBuddy exclusive" },
    { feature: "Trend Alerts", tubebuddy: false, vidiq: true, notes: "VidIQ exclusive" },
    { feature: "AI Title Suggestions", tubebuddy: true, vidiq: true, notes: "Both available" },
    { feature: "Chrome Extension", tubebuddy: true, vidiq: true, notes: "Both excellent" },
];

const pricingComparison = [
    { tier: "Free", tubebuddy: "$0", vidiq: "$0", winner: "Tie" },
    { tier: "Pro/Boost", tubebuddy: "$4.50/mo", vidiq: "$7.50/mo", winner: "TubeBuddy" },
    { tier: "Star/Pro", tubebuddy: "$19/mo", vidiq: "$39/mo", winner: "TubeBuddy" },
    { tier: "Legend/Boost+", tubebuddy: "$49/mo", vidiq: "$79/mo", winner: "TubeBuddy" },
];

const relatedTools = [
    {
        name: "Keyword Tool",
        description: "Free alternative for YouTube keyword research.",
        link: "/tools/youtube-keyword-tool",
    },
    {
        name: "Tag Generator",
        description: "Generate optimized tags without paid tools.",
        link: "/tools/youtube-tag-generator",
    },
    {
        name: "Title Generator",
        description: "AI-powered title suggestions for free.",
        link: "/tools/youtube-title-generator",
    },
];

export default function TubeBuddyVsVidIQPage() {
    const articleSchema = getArticleSchema({
        title: metadata.title as string,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/tubebuddy-vs-vidiq-2026`,
        imageUrl: `${siteConfig.url}/images/blog/tubebuddy-vs-vidiq.png`,
        datePublished: "2026-02-01",
        dateModified: "2026-02-01",
        author: siteConfig.name,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: "TubeBuddy vs VidIQ", url: "/blog/tubebuddy-vs-vidiq-2026" },
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
                            <FaBalanceScale className="text-lg" />
                            Tool Comparison 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            TubeBuddy vs VidIQ<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Complete Comparison</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Which YouTube SEO tool is better for your channel? Compare features, pricing, and capabilities.
                        </p>
                    </div>

                    {/* Quick Verdict */}
                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                            <h3 className="text-xl font-bold text-orange-600 mb-3">Choose TubeBuddy If:</h3>
                            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                                <li>• You need A/B thumbnail testing</li>
                                <li>• Budget is a priority</li>
                                <li>• You want bulk processing tools</li>
                                <li>• You prefer in-YouTube workflow</li>
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                            <h3 className="text-xl font-bold text-purple-600 mb-3">Choose VidIQ If:</h3>
                            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                                <li>• You want deeper analytics</li>
                                <li>• Competitor research is priority</li>
                                <li>• You need trend alerts</li>
                                <li>• You prefer detailed SEO scores</li>
                            </ul>
                        </div>
                    </div>

                    {/* Feature Comparison */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Feature Comparison</h2>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-slate-50 dark:bg-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Feature</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-orange-600">TubeBuddy</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600">VidIQ</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {comparisonTable.map((row, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{row.feature}</td>
                                            <td className="px-6 py-4 text-center">
                                                {row.tubebuddy ? <FaCheck className="text-green-500 mx-auto" /> : <FaTimes className="text-red-400 mx-auto" />}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {row.vidiq ? <FaCheck className="text-green-500 mx-auto" /> : <FaTimes className="text-red-400 mx-auto" />}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pricing Comparison */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Pricing Comparison</h2>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-slate-50 dark:bg-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Tier</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-orange-600">TubeBuddy</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600">VidIQ</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">Winner</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {pricingComparison.map((row, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{row.tier}</td>
                                            <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">{row.tubebuddy}</td>
                                            <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">{row.vidiq}</td>
                                            <td className="px-6 py-4 text-center font-bold text-green-600">{row.winner}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Free Alternatives */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Free Alternatives</h2>
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
                                        Try Free
                                        <FaRocket className="text-sm" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Try Our Free YouTube Tools</h2>
                        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                            Get many of the same features as TubeBuddy and VidIQ completely free.
                        </p>
                        <Link
                            href="/tools"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                        >
                            <FaChartLine className="text-xl" />
                            Explore Free Tools
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
