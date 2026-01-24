import Link from "next/link";
import { FaCheck, FaTimes, FaRocket, FaYoutube, FaDollarSign, FaRobot } from "react-icons/fa";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "YouTube Tools Hub vs TubeBuddy: 2026 Comparison",
    description: "Compare YouTube Tools Hub AI vs TubeBuddy. Discover which YouTube growth tool is better for you. Free AI tools, unlimited usage, and more.",
    keywords: ["YouTube Tools Hub vs TubeBuddy", "TubeBuddy alternative", "free youtube tools", "youtube seo tools comparison"],
};

export default function TubeBuddyComparisonPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                        YouTube Tools Hub vs TubeBuddy
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400">
                        Is it time to switch? See how the new generation of AI-first tools compares to the industry veteran.
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
                        { feature: "AI Title Generator", us: true, them: true },
                        { feature: "AI Thumbnail Analysis", us: true, them: true },
                        { feature: "Generative AI Workflow", us: true, them: false, note: "We offer end-to-end creation" },
                        { feature: "Competitor Analysis", us: true, them: true },
                        { feature: "Unlimited Free Tools", us: true, them: false, note: "TubeBuddy limits daily usage" },
                        { feature: "Modern UI/UX", us: true, them: false, note: "TubeBuddy feels dated" },
                        { feature: "Pricing", us: "Freemium / Low Cost", them: "$$" },
                    ].map((row, idx) => (
                        <div key={idx} className="grid grid-cols-3 p-6 border-b border-slate-200 dark:border-slate-800 last:border-0 hover:bg-slate-100 dark:hover:bg-slate-800/30 transition-colors">
                            <div className="col-span-1 font-medium text-slate-900 dark:text-white flex flex-col justify-center">
                                {row.feature}
                                {row.note && <span className="text-xs text-slate-500 font-normal mt-1">{row.note}</span>}
                            </div>
                            <div className="col-span-1 flex items-center justify-center">
                                {row.us === true ? <FaCheck className="text-green-500 text-xl" /> : <span className="font-bold text-slate-900 dark:text-white">{row.us}</span>}
                            </div>
                            <div className="col-span-1 flex items-center justify-center">
                                {row.them === true ? <FaCheck className="text-green-500 text-xl" /> : row.them === false ? <FaTimes className="text-red-400 text-xl" /> : <span className="font-bold text-slate-500">{row.them}</span>}
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
                            Built for the AI Era
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            TubeBuddy was built in a different era of YouTube. YouTube Tools Hub is designed from the ground up with Generative AI at its core. We don&apos;t just analyze your data; we help you create content. From brainstorming viral ideas to generating optimized scripts and descriptions, our AI acts as your creative partner, not just an analytics tool.
                        </p>
                    </div>
                    <div>
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 text-green-600 mb-6">
                            <FaDollarSign className="text-2xl" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                            More Value, Less Cost
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            Creators shouldn&apos;t be held back by expensive subscriptions. While TubeBuddy locks essential AB testing and bulk processing tools behind high-tier plans, YouTube Tools Hub provides a generous suite of powerful tools for free, with affordable upgrades for power users. We believe in democratizing detailed analytics.
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the Difference?</h2>
                    <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
                        Join thousands of creators who have switched to the smarter, faster way to grow on YouTube.
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
    );
}
