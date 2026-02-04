import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { FaDollarSign, FaChartLine, FaPlay, FaRocket, FaTools } from "react-icons/fa";

export const metadata: Metadata = {
    title: "How Much Does YouTube Pay Per View in 2026? | Complete Breakdown",
    description: "Learn how much YouTube pays per view in 2026. Average CPM is $2-12 depending on niche. Complete breakdown of RPM, CPM, and factors affecting your YouTube earnings.",
    keywords: ["youtube pay per view", "how much does youtube pay", "youtube cpm", "youtube rpm", "youtube earnings per view"],
    openGraph: {
        title: "How Much Does YouTube Pay Per View 2026",
        description: "Complete breakdown of YouTube CPM, RPM, and earnings per 1000 views",
        url: `${siteConfig.url}/blog/youtube-pay-per-view-2026`,
        images: [`${siteConfig.url}/images/blog/youtube-pay-per-view.png`],
    },
    twitter: {
        card: "summary_large_image",
        title: "How Much Does YouTube Pay Per View 2026",
        description: "Complete breakdown of YouTube CPM, RPM, and earnings",
        images: [`${siteConfig.url}/images/blog/youtube-pay-per-view.png`],
    },
    alternates: {
        canonical: "/blog/youtube-pay-per-view-2026",
        languages: {
            "en": "/blog/youtube-pay-per-view-2026",
            "x-default": "/blog/youtube-pay-per-view-2026",
        },
    },
};

const paymentFactors = [
    {
        title: "Niche & Topic",
        description: "Finance channels earn $20-50 CPM while gaming earns $2-5. Advertisers pay more for audiences with purchasing power.",
        icon: <FaChartLine className="text-green-500" />,
    },
    {
        title: "Audience Location",
        description: "US/UK/CA/AU viewers pay 5-10x more than developing countries. Tier 1 country traffic is worth significantly more.",
        icon: <FaDollarSign className="text-blue-500" />,
    },
    {
        title: "Video Length",
        description: "Videos over 8 minutes can have multiple mid-roll ads, increasing revenue by 50-100% compared to shorter videos.",
        icon: <FaPlay className="text-red-500" />,
    },
];

const earningsTable = [
    { views: "1,000", lowCPM: "$1-2", avgCPM: "$3-5", highCPM: "$15-30" },
    { views: "10,000", lowCPM: "$10-20", avgCPM: "$30-50", highCPM: "$150-300" },
    { views: "100,000", lowCPM: "$100-200", avgCPM: "$300-500", highCPM: "$1,500-3,000" },
    { views: "1,000,000", lowCPM: "$1,000-2,000", avgCPM: "$3,000-5,000", highCPM: "$15,000-30,000" },
];

const calculatorTools = [
    {
        name: "Earnings Calculator",
        description: "Calculate your potential YouTube earnings based on views and niche.",
        link: "/tools/youtube-earnings-calculator",
    },
    {
        name: "CPM by Niche",
        description: "See average CPM rates across different YouTube niches.",
        link: "/blog/high-cpm-youtube-niches-2026",
    },
    {
        name: "Channel Audit",
        description: "Get a complete analysis of your channel's earning potential.",
        link: "/tools/youtube-channel-audit",
    },
];

export default function YouTubePayPerViewPage() {
    const articleSchema = getArticleSchema({
        title: metadata.title as string,
        description: metadata.description as string,
        url: `${siteConfig.url}/blog/youtube-pay-per-view-2026`,
        imageUrl: `${siteConfig.url}/images/blog/youtube-pay-per-view.png`,
        datePublished: "2026-02-01",
        dateModified: "2026-02-01",
        author: siteConfig.name,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: "YouTube Pay Per View", url: "/blog/youtube-pay-per-view-2026" },
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
                            Earnings Guide 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            How Much Does YouTube<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Pay Per View?</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Complete breakdown of YouTube CPM, RPM, and how much you can earn per 1,000 views in different niches.
                        </p>
                    </div>

                    {/* Key Statistics */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-green-600 mb-2">$3-5</div>
                            <div className="text-slate-600 dark:text-slate-400">Average RPM (per 1K views)</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-emerald-600 mb-2">$0.003-0.005</div>
                            <div className="text-slate-600 dark:text-slate-400">Per single view (average)</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
                            <div className="text-3xl font-bold text-blue-600 mb-2">55%</div>
                            <div className="text-slate-600 dark:text-slate-400">Creator share of ad revenue</div>
                        </div>
                    </div>

                    {/* Payment Factors */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Factors That Affect Earnings</h2>
                        <div className="grid gap-6">
                            {paymentFactors.map((factor, index) => (
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
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Earnings by View Count</h2>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-slate-50 dark:bg-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Views</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">Low CPM</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">Average</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">High CPM</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {earningsTable.map((row, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{row.views}</td>
                                            <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">{row.lowCPM}</td>
                                            <td className="px-6 py-4 text-center text-green-600 font-bold">{row.avgCPM}</td>
                                            <td className="px-6 py-4 text-center text-emerald-600 font-bold">{row.highCPM}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Tools Section */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Calculate Your Earnings</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {calculatorTools.map((tool, index) => (
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
                        <h2 className="text-3xl font-bold mb-4">Calculate Your YouTube Earnings</h2>
                        <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
                            Enter your views and niche to get an accurate estimate of your potential YouTube revenue.
                        </p>
                        <Link
                            href="/tools/youtube-earnings-calculator"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                        >
                            <FaDollarSign className="text-xl" />
                            Calculate Now
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
