import Link from "next/link";
import { Metadata } from "next";
import { getToolsByCategory } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { getToolListSchema } from "@/lib/seo";
import { FaRocket, FaLightbulb, FaChartLine, FaArrowRight, FaBrain } from "react-icons/fa";

export const metadata: Metadata = {
    title: "YouTube Channel Research & Growth Tools - AI Strategist 2026",
    description: "Scale your YouTube channel with AI-powered research tools. Generate viral video ideas, find trending topics, and plan your content calendar. Free growth suite for 2026.",
    keywords: ["youtube growth tools", "video ideas generator", "youtube trend finder", "content calendar planner", "channel strategy 2026", "viral content ideas", "youtube algorithm tools"],
    openGraph: {
        title: "AI YouTube Growth & Strategy Suite 2026",
        description: "Professional-grade research tools to help you master the algorithm and scale your channel. 100% free AI-powered insights.",
        type: "website",
        url: `${siteConfig.url}/tools/channel-tools`,
    },
    alternates: {
        canonical: "/tools/channel-tools",
    },
};

export default function ChannelToolsHub() {
    const growthTools = getToolsByCategory("channel-growth");

    const toolListSchema = getToolListSchema(
        growthTools.map((tool) => ({
            name: tool.name,
            url: `${siteConfig.url}/tools/${tool.slug}`,
            description: tool.description,
        }))
    );

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(toolListSchema),
                }}
            />

            <div className="min-h-screen py-20 relative overflow-hidden">
                <div className="nebula-bg" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-purple-600 transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/tools" className="hover:text-purple-600 transition-colors">
                            Tools
                        </Link>
                        <span>/</span>
                        <span className="text-slate-900 font-medium font-outfit">Channel Growth</span>
                    </nav>

                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-black uppercase tracking-[0.2em] mb-6">
                            <FaBrain className="w-3 h-3" />
                            Growth Intelligence
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter font-outfit">
                            Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600">Algorithm</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-outfit font-medium">
                            Stop guessing, start growing. In 2026, the algorithm favors creators who use data-driven strategies. Our growth suite provides the AI-powered research tools needed to win the attention economy.
                        </p>
                    </div>

                    {/* Growth Strategy Checklist */}
                    <div className="glass-premium rounded-3xl p-10 border-l-8 border-orange-500 mb-20 shadow-xl">
                        <h2 className="text-3xl font-black text-slate-900 mb-6 font-outfit flex items-center gap-3">
                            <FaRocket className="text-orange-500" />
                            The 2026 Rapid Growth Blueprint
                        </h2>
                        <div className="grid md:grid-cols-2 gap-10">
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                    <p className="text-slate-700 font-outfit"><strong>Viral Topic Discovery:</strong> Use the Trend Helper to find rising interests before they reach the mainstream.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                    <p className="text-slate-700 font-outfit"><strong>Engagement Loops:</strong> Plan your community posts and polls using the Content Calendar for 24/7 channel activity.</p>
                                </li>
                            </ul>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                    <p className="text-slate-700 font-outfit"><strong>Niche Authority:</strong> Generate video ideas that reinforce your "Topic Cluster" to improve your semantic ranking.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                    <p className="text-slate-700 font-outfit"><strong>Retention Modeling:</strong> Design your video hooks around proven curiosity gaps generated by our AI idea engine.</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                        {growthTools.map((tool) => (
                            <Link
                                key={tool.slug}
                                href={`/tools/${tool.slug}`}
                                className="group glass-premium border-white/40 rounded-[2.5rem] p-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full" />
                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-500 mb-8">
                                        <tool.icon className="w-8 h-8" />
                                    </div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <h3 className="text-2xl font-black text-slate-900 group-hover:text-orange-600 transition-colors font-outfit tracking-tight">
                                            {tool.name}
                                        </h3>
                                        {tool.isAI && (
                                            <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-wider">AI</span>
                                        )}
                                    </div>
                                    <p className="text-slate-600 leading-relaxed text-lg font-outfit font-medium">
                                        {tool.shortDescription || tool.description}
                                    </p>
                                    <div className="mt-8 flex items-center text-orange-600 font-black text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                                        Explore Tool
                                        <FaArrowRight className="ml-2 w-3 h-3" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Authority Guide Section */}
                    <div className="max-w-4xl mx-auto mb-20">
                        <div className="glass-premium rounded-[3rem] p-12 shadow-sm relative overflow-hidden border-t-4 border-rose-500/20">
                            <h2 className="text-4xl font-black text-slate-900 mb-8 font-outfit tracking-tighter">
                                Why Strategy Beats "Luck" in 2026
                            </h2>
                            <div className="prose prose-xl text-slate-600 font-outfit">
                                <p className="mb-6">
                                    The 2026 YouTube algorithm is powered by deep neural networks that analyze **Human Satisfaction Metrics**. It's no longer just about clicks—it's about "Value Delivered."
                                </p>
                                <p>
                                    Our growth tools help you align with this shift by providing insights into high-satisfaction topics and trending interests. By planning your content strategically, you ensure that every upload contributes to your long-term authority and channel health.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="text-center">
                        <Link
                            href="/tools"
                            className="inline-flex items-center gap-4 px-12 py-6 bg-slate-900 text-white rounded-full font-black text-xl transition-all shadow-2xl hover:scale-105 active:scale-95 group"
                        >
                            View Entire Stack
                            <FaArrowRight className="group-hover:translate-x-3 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
