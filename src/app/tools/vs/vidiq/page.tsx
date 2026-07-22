import Link from "next/link";
import { FaCheck, FaBolt, FaBrain, FaChartLine } from "react-icons/fa";
import { Metadata } from "next";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";

export const metadata: Metadata = {
    title: "YouTube Tools Hub vs VidIQ: Creator Tool Comparison",
    description: "Compare the YouTube Tools Hub browser-based creator toolkit with VidIQ. Review workflow focus, setup, and current plan details before choosing a tool.",
    keywords: ["YouTube Tools Hub vs VidIQ", "VidIQ alternative", "best youtube seo tool", "ai youtube growth"],
    alternates: {
        canonical: "/tools/vs/vidiq",
        
    },
};

export default function VidIQComparisonPage() {
    return (
        <>
            <GeoAeoHead {...GEO_AEO_PRESETS.comparisonPage("VidIQ")} pathname="/tools/vs/vidiq" />
            <div className="min-h-screen bg-white dark:bg-slate-950 pt-28 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            YouTube Tools Hub vs VidIQ
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400">
                            Looking for a VidIQ alternative? Compare workflow focus and confirm VidIQ&apos;s current plan details before choosing.
                        </p>
                    </div>

                    {/* Comparison Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        {/* YT Tools Hub Card */}
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 border-purple-500 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                                Browser-based option
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">YouTube Tools Hub</h2>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-slate-600 dark:text-slate-300">Generative AI Ideas & Scripts</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-slate-600 dark:text-slate-300">Focused browser-based utilities</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-slate-600 dark:text-slate-300">Focus on Content Creation</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-slate-600 dark:text-slate-300">Modern, Clean Interface</span>
                                </li>
                            </ul>
                            <Link href="/dashboard" className="block w-full py-3 bg-purple-600 text-white font-bold text-center rounded-xl hover:bg-purple-700 transition-colors">
                                Try for Free
                            </Link>
                        </div>

                        {/* VidIQ Card */}
                        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">VidIQ</h2>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-slate-600 dark:text-slate-400">Deep Analytics</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-slate-500 dark:text-slate-500">Creator analytics and SEO features</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-slate-500 dark:text-slate-500">Feature availability varies by plan</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-slate-500 dark:text-slate-500">Check current product details</span>
                                </li>
                            </ul>
                            <a href="https://vidiq.com/jitu" target="_blank" rel="nofollow sponsored noopener" className="block w-full py-3 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-center rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700">
                                Review Current VidIQ Plans
                            </a>
                        </div>
                    </div>

                    {/* Feature Breakdown */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Choose the Workflow That Fits</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <FaBrain className="text-4xl text-purple-500 mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Simpler AI</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    YouTube Tools Hub combines AI-assisted generators with focused utilities. Choose the specific task you need and review the output before publishing.
                                </p>
                            </div>
                            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <FaBolt className="text-4xl text-orange-500 mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Faster Workflows</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Generate title ideas, descriptions, and thumbnail assets from one browser-based toolkit. The time saved depends on your own workflow.
                                </p>
                            </div>
                            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <FaChartLine className="text-4xl text-blue-500 mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Growth Focus</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Use creator tools to support packaging and planning decisions, then measure actual click-through rate and retention inside your own YouTube Studio account.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <Link href="/dashboard" className="inline-flex items-center justify-center px-10 py-4 bg-purple-600 text-white rounded-full font-bold text-lg hover:bg-purple-700 transition-all shadow-lg hover:scale-105">
                            Explore Creator Tools
                        </Link>
                    </div>

                </div>
            </div>
        </>
    );
}
