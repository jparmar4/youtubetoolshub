import Link from "next/link";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "YouTube Creator Statistics 2026 - Views, Earnings & Growth Data",
    description: "Comprehensive YouTube statistics for creators. Average earnings by niche, RPM data, subscriber milestones, and platform growth trends for 2026.",
    keywords: ["youtube statistics", "youtube creator earnings", "youtube rpm by niche", "youtube growth statistics", "youtube creator data"],
    openGraph: {
        title: "YouTube Creator Statistics 2026 | Data & Insights",
        description: "Data-backed YouTube statistics every creator should know. Earnings, RPM, growth trends, and platform insights for 2026.",
        type: "website",
    },
    alternates: {
        canonical: "/resources/youtube-creator-statistics",
        languages: {
            "en": "/resources/youtube-creator-statistics",
            "x-default": "/resources/youtube-creator-statistics",
        },
    },
};

export default function YouTubeStatistics() {
    return (
        <div className="min-h-screen py-20 relative overflow-hidden">
            <div className="nebula-bg" />
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/resources" className="hover:text-purple-600 transition-colors">Resources</Link>
                    <span>/</span>
                    <span className="text-slate-900 font-medium">YouTube Statistics</span>
                </nav>

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                        YouTube Creator Statistics 2026
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Data-backed insights on YouTube earnings, RPM by niche, growth trends, and creator milestones.
                    </p>
                </div>

                {/* Platform Stats */}
                <div className="glass-premium rounded-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Platform Overview</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-purple-50 rounded-xl">
                            <div className="text-4xl font-bold text-purple-600 mb-2">3B+</div>
                            <div className="text-slate-600">Monthly Searches</div>
                        </div>
                        <div className="text-center p-6 bg-purple-50 rounded-xl">
                            <div className="text-4xl font-bold text-purple-600 mb-2">2.7B</div>
                            <div className="text-slate-600">Active Users</div>
                        </div>
                        <div className="text-center p-6 bg-purple-50 rounded-xl">
                            <div className="text-4xl font-bold text-purple-600 mb-2">500hr</div>
                            <div className="text-slate-600">Uploaded/Minute</div>
                        </div>
                    </div>
                </div>

                {/* RPM by Niche */}
                <div className="glass-premium rounded-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Average RPM by Niche (2026)</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-slate-200">
                                    <th className="text-left py-4 px-4 font-bold text-slate-900">Niche</th>
                                    <th className="text-right py-4 px-4 font-bold text-slate-900">RPM Range</th>
                                    <th className="text-right py-4 px-4 font-bold text-slate-900">Earning Potential</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-600">
                                <tr className="border-b border-slate-100">
                                    <td className="py-4 px-4">Finance & Investing</td>
                                    <td className="text-right py-4 px-4 font-semibold text-green-600">$40-$60</td>
                                    <td className="text-right py-4 px-4">Very High</td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                    <td className="py-4 px-4">Tech & Software (SaaS)</td>
                                    <td className="text-right py-4 px-4 font-semibold text-green-600">$30-$50</td>
                                    <td className="text-right py-4 px-4">Very High</td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                    <td className="py-4 px-4">Business & Marketing</td>
                                    <td className="text-right py-4 px-4 font-semibold text-green-600">$25-$40</td>
                                    <td className="text-right py-4 px-4">High</td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                    <td className="py-4 px-4">Education & How-To</td>
                                    <td className="text-right py-4 px-4 font-semibold text-blue-600">$8-$15</td>
                                    <td className="text-right py-4 px-4">Medium</td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                    <td className="py-4 px-4">Entertainment & Vlogs</td>
                                    <td className="text-right py-4 px-4 font-semibold text-yellow-600">$2-$5</td>
                                    <td className="text-right py-4 px-4">Low-Medium</td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                    <td className="py-4 px-4">Gaming</td>
                                    <td className="text-right py-4 px-4 font-semibold text-yellow-600">$2-$8</td>
                                    <td className="text-right py-4 px-4">Low-Medium</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-sm text-slate-500 mt-4">
                        *RPM = Revenue Per Mille (1,000 views). Data based on 2026 AdSense averages.
                    </p>
                </div>

                {/* Earnings by Subscribers */}
                <div className="glass-premium rounded-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Estimated Monthly Earnings by Subscriber Count</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                            <span className="font-semibold text-slate-900">1,000 subscribers</span>
                            <span className="text-slate-600">$50 - $200/month</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                            <span className="font-semibold text-slate-900">10,000 subscribers</span>
                            <span className="text-slate-600">$500 - $2,000/month</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                            <span className="font-semibold text-slate-900">100,000 subscribers</span>
                            <span className="text-slate-600">$2,000 - $10,000/month</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                            <span className="font-semibold text-slate-900">1,000,000 subscribers</span>
                            <span className="text-slate-600">$10,000 - $100,000+/month</span>
                        </div>
                    </div>
                    <p className="text-sm text-slate-500 mt-4">
                        *Estimates assume average view counts and mid-range RPM. Actual earnings vary significantly by niche and geography.
                    </p>
                </div>

                {/* Key Insights */}
                <div className="glass-premium rounded-2xl p-8">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Key Insights for 2026</h2>
                    <ul className="space-y-4 text-slate-600">
                        <li className="flex items-start gap-3">
                            <span className="text-purple-600 font-bold">•</span>
                            <span><strong>Shorts Monetization:</strong> YouTube Shorts now generate 15-20% of total creator revenue, up from 5% in 2024.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-purple-600 font-bold">•</span>
                            <span><strong>AI Tools Usage:</strong> 78% of top creators use AI for titles, thumbnails, or scripting.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-purple-600 font-bold">•</span>
                            <span><strong>Sponsorship Growth:</strong> Brand deals now account for 40-60% of income for channels with 100k+ subs.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-purple-600 font-bold">•</span>
                            <span><strong>Tier 1 Premium:</strong> US viewers generate 3-5x higher RPM than global average.</span>
                        </li>
                    </ul>
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <Link
                        href="/tools/youtube-earnings-calculator"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-lg"
                    >
                        Calculate Your Potential Earnings
                    </Link>
                </div>
            </div>
        </div>
    );
}
