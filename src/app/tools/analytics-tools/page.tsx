import Link from "next/link";
import { Metadata } from "next";
import { getToolsByCategory } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { getToolListSchema } from "@/lib/seo";

export const metadata: Metadata = {
    title: "YouTube Analytics & Earnings Tools - ROI & Revenue Calculators 2026",
    description: "Professional YouTube analytics tools for 2026. Calculate revenue potential, measure engagement benchmarks, and perform A/B title tests. 100% free data-driven suite.",
    keywords: ["youtube earnings calculator", "engagement rate benchmarks 2026", "youtube monetization tools", "cpm by niche 2026", "title ab testing tool", "youtube roi calculator"],
    openGraph: {
        title: "3 Free YouTube Analytics & Earnings Tools | Revenue & ROI 2026",
        description: "Calculate your YouTube income, analyze engagement depth, and optimize title performance with our 2026 AI-powered analytics suite.",
        type: "website",
        url: `${siteConfig.url}/tools/analytics-tools`,
    },
    alternates: {
        canonical: "/tools/analytics-tools",
    },
};

export default function AnalyticsToolsHub() {
    const analyticsTools = getToolsByCategory("analytics-earnings");

    const toolListSchema = getToolListSchema(
        analyticsTools.map((tool) => ({
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
                        <span className="text-slate-900 font-medium font-outfit">Analytics Tools</span>
                    </nav>

                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight font-outfit">
                            Analytics & Earnings Hub 2026
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Turn your data into a business. Our 2026 analytics suite helps you calculate revenue potential, verify engagement quality, and predict viral outcomes.
                        </p>
                    </div>

                    {/* Revenue & Growth Strategy */}
                    <div className="summary glass-premium rounded-2xl p-8 border-l-4 border-purple-500 mb-12 shadow-sm">
                        <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                            💰 The 2026 Monetization Blueprint
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6 text-slate-700">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>CPM Maximization:</strong> Learn which high-intent niches (Finance, Saas, Real Estate) currently yield $35+ CPMs.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>Engagement Velocity:</strong> Measure how fast your community responds to new uploads to trigger 'Suggested Video' loops.</span>
                                </li>
                            </ul>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>Title A/B Prediction:</strong> Use AI to compare CTR potential before you upload, saving your video from a 'Flop' start.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>Sponsorship Value:</strong> Use your engagement rate to negotiate 4x higher rates with brand sponsors.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {analyticsTools.map((tool) => (
                            <Link
                                key={tool.slug}
                                href={`/tools/${tool.slug}`}
                                className="group glass-premium rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/20"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-500 mb-5">
                                        <tool.icon className="w-8 h-8" />
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors font-outfit">
                                            {tool.name}
                                        </h3>
                                        {tool.isAI && (
                                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">AI</span>
                                        )}
                                    </div>
                                    <p className="text-slate-600 leading-relaxed text-lg">
                                        {tool.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Deep Dive Content */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="glass-premium rounded-3xl p-10 shadow-sm">
                                <h2 className="text-3xl font-bold text-slate-900 mb-6 font-outfit">
                                    Why Data Trumps Luck in 2026
                                </h2>
                                <div className="prose prose-lg max-w-none text-slate-600">
                                    <p className="mb-4">
                                        The 2026 YouTube landscape is no longer about "getting lucky." It's about <strong>mathematical predictability</strong>. Our analytics tools provide you with the raw data needed to treat your channel like a high-growth startup.
                                    </p>
                                    <ul className="space-y-4">
                                        <li><strong>Monetization Forecasting:</strong> Our Earnings Calculator factors in current inflation and niche-specific advertiser trends to give you a realistic revenue roadmap.</li>
                                        <li><strong>Audience Depth Analysis:</strong> We analyze the "Intensity" of your engagement—measuring whether your audience are passive viewers or active participants who drive the algorithm.</li>
                                        <li><strong>Algorithmic Alignment:</strong> We help you identify which "Statistical Variables" (like CTR and Engagement Rate) are currently favored by the YouTube recommendation engine.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="glass-premium rounded-3xl p-8 bg-gradient-to-b from-emerald-900 to-teal-900 text-white border-0 shadow-2xl">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">📊 Mastery Tip</h3>
                                <p className="text-emerald-100 mb-6 leading-relaxed">
                                    A high view count is a vanity metric. A high <strong>Engagement-to-Earnings Ratio</strong> is a sanity metric. Focus on building a community that clicks, comments, and contributes to your bottom line.
                                </p>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 italic text-sm text-emerald-200">
                                    "Profitability doesn't require millions of views—it requires the right views."
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="text-center">
                        <Link
                            href="/tools"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full font-bold text-lg transition-all shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1"
                        >
                            Explore All Growth Tools
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
