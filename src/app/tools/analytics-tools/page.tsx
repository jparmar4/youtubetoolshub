import Link from "next/link";
import { Metadata } from "next";
import { getToolsByCategory } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { getToolListSchema, getBreadcrumbSchema, getFAQSchema, getGlobalAlternates } from "@/lib/seo";
import GoogleAd from "@/components/ads/GoogleAd";
import AffiliateBanner from "@/components/ads/AffiliateBanner";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import { AD_SLOTS } from "@/lib/adsense";

export const metadata: Metadata = {
    title: "YouTube Analytics & Earnings Tools - ROI & Revenue Calculators 2026",
    description: "YouTube analytics tools for creators. Estimate revenue potential, review engagement benchmarks, and compare title ideas with our free 2026 suite.",
    keywords: ["youtube earnings calculator", "engagement rate benchmarks 2026", "youtube monetization tools", "cpm by niche 2026", "title ab testing tool", "youtube roi calculator"],
    openGraph: {
        title: "3 Free YouTube Analytics & Earnings Tools | Revenue & ROI 2026",
        description: "Calculate your YouTube income, analyze engagement depth, and optimize title performance with our 2026 AI-powered analytics suite.",
        type: "website",
        url: `${siteConfig.url}/tools/analytics-tools`,
    },
    alternates: getGlobalAlternates("/tools/analytics-tools"),
};

const analyticsFaqs = [
    {
        question: "How is YouTube ad revenue (CPM & RPM) calculated?",
        answer: "Ad revenue depends on Playback-Based CPM (what advertisers pay per 1,000 views) and RPM (Revenue Per Mille, the creator's actual net take-home per 1,000 views after YouTube's 45% revenue split). High-intent niches such as Finance, B2B SaaS, and Real Estate in Tier-1 countries command CPMs exceeding $30-$50.",
    },
    {
        question: "What is a good engagement rate on YouTube in 2026?",
        answer: "A healthy YouTube engagement rate generally ranges between 3.5% and 7.0%, calculated by dividing total interactions (likes, comments, shares, playlist saves) by total views. Creators with engagement rates above 8% frequently experience higher viral recommendation rates and command premium sponsorship rates.",
    },
    {
        question: "How can A/B testing video titles improve views?",
        answer: "A/B testing titles uncovers which psychological hooks (intrigue, quantifiable benefit, question, or bold claim) trigger the highest Click-Through Rate (CTR) for your specific target audience. A 2% improvement in CTR often leads to a 200%+ increase in algorithmic recommendations.",
    },
    {
        question: "How can creators predict sponsorship earnings?",
        answer: "Sponsorship value is modeled primarily on reliable 30-day average view counts, audience geography (percentage of viewers in US, UK, CA, AU), and niche commercial intent. Standard sponsorship CPMs range from $20 to $60 per 1,000 expected views.",
    },
];

export default function AnalyticsToolsHub() {
    const analyticsTools = getToolsByCategory("analytics-earnings");

    const toolListSchema = getToolListSchema(
        analyticsTools.map((tool) => ({
            name: tool.name,
            url: `${siteConfig.url}/tools/${tool.slug}`,
            description: tool.description,
        }))
    );

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Tools", url: `${siteConfig.url}/tools` },
        { name: "Analytics Tools", url: `${siteConfig.url}/tools/analytics-tools` },
    ]);

    const faqSchema = getFAQSchema(analyticsFaqs);

    return (
        <>
            {/* GEO / AEO signals for AI Answer Engines */}
            <GeoAeoHead
                {...GEO_AEO_PRESETS.categoryPage(
                    "YouTube Analytics & Earnings Tools",
                    "Calculate potential ad revenue, evaluate engagement metrics, and forecast growth with free YouTube creator analytics calculators.",
                    analyticsTools.length,
                    [
                        "Dynamic YouTube earnings and RPM calculator across 50+ countries",
                        "Audience engagement rate and benchmark diagnostic tool",
                        "Title A/B prediction engine for higher CTR",
                        "100% free with no account or API keys required",
                    ]
                )}
                pathname="/tools/analytics-tools"
            />

            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(toolListSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />

            <div className="min-h-screen py-16 lg:py-20 relative overflow-hidden">
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
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
                            3 Free Analytics Tools
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight font-outfit">
                            Analytics &amp; Earnings Hub 2026
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed summary" data-speakable>
                            Turn your data into a sustainable media business. Our 2026 analytics suite helps you calculate revenue potential, verify engagement depth, and predict viral click outcomes.
                        </p>
                    </div>

                    {/* Top Leaderboard Ad */}
                    <div className="mb-12 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 min-h-[90px] flex flex-col items-center justify-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 text-center">Advertisement</p>
                        <GoogleAd slot={AD_SLOTS.HEADER} lazy={false} responsive className="w-full text-center" />
                    </div>

                    {/* Revenue & Growth Strategy */}
                    <div className="summary glass-premium rounded-2xl p-8 border-l-4 border-emerald-500 mb-12 shadow-sm">
                        <h2 className="text-xl font-bold text-emerald-600 mb-4 flex items-center gap-2 font-outfit">
                            💰 The 2026 Monetization Blueprint
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6 text-slate-700">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>CPM Maximization:</strong> Learn which high-intent niches (Finance, SaaS, Real Estate) currently yield $35+ CPMs.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>Engagement Velocity:</strong> Measure how fast your community responds to new uploads to trigger &lsquo;Suggested Video&rsquo; loops.</span>
                                </li>
                            </ul>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>Title A/B Prediction:</strong> Use AI to compare CTR potential before you upload, saving your video from a poor launch.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><strong>Sponsorship Value:</strong> Use your engagement rate to negotiate higher rates with brand sponsors.</span>
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

                    {/* Pro Creator Growth Recommendation */}
                    <div className="my-8">
                        <AffiliateBanner toolId="vidiq" variant="inArticle" />
                    </div>

                    {/* Mid Ad placement */}
                    <div className="my-8" aria-hidden="true">
                        <GoogleAd slot="8649718301" />
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
                                        The 2026 YouTube landscape is no longer about guessing. It&apos;s about <strong>mathematical predictability</strong>. Our analytics tools provide you with the raw data needed to treat your channel like a high-growth startup:
                                    </p>
                                    <ul className="space-y-4">
                                        <li><strong>Monetization Forecasting:</strong> Our Earnings Calculator factors in current regional CPM variance and niche advertiser demand to provide realistic revenue roadmaps.</li>
                                        <li><strong>Audience Depth Analysis:</strong> We analyze the intensity of your engagement—measuring whether your audience are passive viewers or active participants who trigger the recommendation algorithm.</li>
                                        <li><strong>Algorithmic Alignment:</strong> We help you track which key variables (such as CTR and viewer retention) are currently favored by YouTube&apos;s neural network.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="glass-premium rounded-3xl p-8 bg-gradient-to-b from-emerald-900 to-teal-900 text-white border-0 shadow-2xl">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">📊 Mastery Tip</h3>
                                <p className="text-emerald-100 mb-6 leading-relaxed">
                                    A high view count is a vanity metric. A high <strong>Engagement-to-Earnings Ratio</strong> is a sanity metric. Focus on building a community that clicks, comments, and contributes to your business.
                                </p>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 italic text-sm text-emerald-200">
                                    &ldquo;Profitability doesn&apos;t require millions of views—it requires the right high-intent viewers.&rdquo;
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AEO / FAQ Section */}
                    <div className="glass-premium rounded-3xl p-8 sm:p-10 shadow-sm mb-12" data-speakable>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 font-outfit">
                            Frequently Asked Questions About YouTube Analytics &amp; Earnings
                        </h2>
                        <div className="space-y-6">
                            {analyticsFaqs.map((faq, idx) => (
                                <div key={idx} className="border-b border-slate-200/80 pb-5 last:border-0 last:pb-0">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                                        {faq.question}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
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
