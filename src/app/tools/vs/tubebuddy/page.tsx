import Link from "next/link";
import { FaCheck, FaDollarSign, FaRobot } from "react-icons/fa";
import { Metadata } from "next";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";

export const metadata: Metadata = {
    title: "YouTube Tools Hub vs TubeBuddy: 2026 Comparison",
    description: "Compare the YouTube Tools Hub browser-based creator toolkit with TubeBuddy. Review workflow focus, setup, and current pricing before choosing a tool.",
    keywords: ["YouTube Tools Hub vs TubeBuddy", "TubeBuddy alternative", "free youtube tools", "youtube seo tools comparison"],
    alternates: {
        canonical: "/tools/vs/tubebuddy",
        
    },
};

export default function TubeBuddyComparisonPage() {
    return (
        <>
            <GeoAeoHead {...GEO_AEO_PRESETS.comparisonPage("TubeBuddy")} pathname="/tools/vs/tubebuddy" />
            <div className="min-h-screen bg-white dark:bg-slate-950 pt-28 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            YouTube Tools Hub vs TubeBuddy
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400">
                            Compare workflow focus and setup. TubeBuddy features and pricing can change, so confirm its current plan details before choosing.
                        </p>
                    </div>

                    {/* Comparison Table */}
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl mb-20">
                        <div className="grid grid-cols-3 bg-slate-100 dark:bg-slate-800/50 p-6 border-b border-slate-200 dark:border-slate-800">
                            <div className="col-span-1 font-bold text-slate-500">Feature</div>
                            <div className="col-span-1 text-center font-bold text-xl text-purple-600 dark:text-purple-400">YouTube Tools Hub</div>
                            <div className="col-span-1 text-center font-bold text-xl text-slate-700 dark:text-slate-300">TubeBuddy</div>
                        </div>

                        {[
                            { feature: "Browser-based creator utilities", us: true, them: "Check current product" },
                            { feature: "No browser extension required for core tools", us: true, them: "Check current setup" },
                            { feature: "AI-assisted title ideas", us: true, them: "Check current plan" },
                            { feature: "Thumbnail download utility", us: true, them: "Check current plan" },
                            { feature: "Channel workflow checklist", us: true, them: "Check current plan" },
                            { feature: "Pricing", us: "Core tools free", them: "Check current pricing" },
                        ].map((row, idx) => (
                            <div key={idx} className="grid grid-cols-3 p-6 border-b border-slate-200 dark:border-slate-800 last:border-0 hover:bg-slate-100 dark:hover:bg-slate-800/30 transition-colors">
                                <div className="col-span-1 font-medium text-slate-900 dark:text-white flex flex-col justify-center">
                                    {row.feature}
                                </div>
                                <div className="col-span-1 flex items-center justify-center">
                                    {row.us === true ? <FaCheck className="text-green-500 text-xl" /> : <span className="font-bold text-slate-900 dark:text-white">{row.us}</span>}
                                </div>
                                <div className="col-span-1 flex items-center justify-center">
                                    <span className="text-center font-bold text-slate-500">{row.them}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Deep Dive Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                        <div>
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 text-purple-600 mb-6">
                                <FaRobot className="text-2xl" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                Browser-Based Creator Workflows
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                YouTube Tools Hub focuses on small, task-specific utilities that work directly in the browser. Use the tool directory for title ideas, descriptions, thumbnails, earnings estimates, timestamps, and creator planning workflows.
                            </p>
                        </div>
                        <div>
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 text-green-600 mb-6">
                                <FaDollarSign className="text-2xl" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                Compare Current Plan Details
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Core YouTube Tools Hub utilities can be used free. TubeBuddy features and pricing are controlled by TubeBuddy and may change, so check its current product pages before deciding which workflow fits your needs.
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the Difference?</h2>
                        <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
                            Explore the browser-based tools and decide whether they fit your creator workflow.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/dashboard" className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg">
                                Get Started for Free
                            </Link>
                            <Link href="/pricing" className="px-8 py-4 bg-purple-700 text-white rounded-xl font-bold hover:bg-purple-800 transition-colors border border-purple-500">
                                View Pricing
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
