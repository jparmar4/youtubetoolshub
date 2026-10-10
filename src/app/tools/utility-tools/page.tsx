import Link from "next/link";
import { Metadata } from "next";
import { getToolsByCategory } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { getToolListSchema, getBreadcrumbSchema, getFAQSchema, getGlobalAlternates } from "@/lib/seo";
import { FaBolt, FaMagic, FaArrowRight } from "react-icons/fa";
import GoogleAd from "@/components/ads/GoogleAd";
import AffiliateBanner from "@/components/ads/AffiliateBanner";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import { AD_SLOTS } from "@/lib/adsense";

export const metadata: Metadata = {
    title: "YouTube Utility & Productivity Tools - Scale Your Workflow 2026",
    description: "The ultimate YouTube productivity toolkit for 2026. Calculate playlist length, pick contest winners, audit channel health, and more. Free professional utility suite.",
    keywords: ["youtube utility tools", "playlist length calculator", "youtube comment picker", "channel health auditor", "youtube automation 2026", "creator productivity tools"],
    openGraph: {
        title: "Free YouTube Utility & Productivity Suite 2026",
        description: "Professional-grade automation and management tools for scaling YouTube channels. Save hours of manual work every week.",
        type: "website",
        url: `${siteConfig.url}/tools/utility-tools`,
    },
    alternates: getGlobalAlternates("/tools/utility-tools"),
};

const utilityFaqs = [
    {
        question: "How does the Playlist Length Calculator help creators and viewers?",
        answer: "The Playlist Length Calculator computes the exact total watch duration of any YouTube playlist across multiple playback speeds (1x, 1.25x, 1.5x, 2x). This helps viewers plan educational study sessions and enables creators to design binge-watching arcs for maximum channel watch time.",
    },
    {
        question: "Why use a verifiable Comment Picker for YouTube giveaways?",
        answer: "Our YouTube Comment Picker randomly and fairly selects contest winners while filtering duplicate entries, specific answer keywords, or blacklisted accounts. Using a neutral third-party tool establishes community trust and complies with YouTube contest guidelines.",
    },
    {
        question: "What does a YouTube Channel Audit inspect?",
        answer: "A channel audit evaluates critical creator health factors including metadata consistency, custom thumbnail coverage, upload cadence, description links, and playlist structure to ensure maximum algorithmic discoverability.",
    },
    {
        question: "Are these YouTube utility tools free to use?",
        answer: "Yes, 100% free with no signups, installations, browser extensions, or YouTube channel login permissions required. All calculations run instantly in your web browser.",
    },
];

export default function UtilityToolsHub() {
    const utilityTools = getToolsByCategory("utility-fun");

    const toolListSchema = getToolListSchema(
        utilityTools.map((tool) => ({
            name: tool.name,
            url: `${siteConfig.url}/tools/${tool.slug}`,
            description: tool.description,
        }))
    );

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Tools", url: `${siteConfig.url}/tools` },
        { name: "Utility Tools", url: `${siteConfig.url}/tools/utility-tools` },
    ]);

    const faqSchema = getFAQSchema(utilityFaqs);

    return (
        <>
            {/* GEO / AEO signals for AI Answer Engines */}
            <GeoAeoHead
                {...GEO_AEO_PRESETS.categoryPage(
                    "YouTube Utility & Productivity Tools",
                    "Automate channel management tasks, calculate playlist watch time, pick giveaway winners, and audit channel health with free creator utilities.",
                    utilityTools.length,
                    [
                        "Instant YouTube playlist duration calculator with variable playback speed",
                        "Provably fair YouTube comment picker for contests and giveaways",
                        "Comprehensive channel health audit checklist",
                        "100% browser-based with zero software installation required",
                    ]
                )}
                pathname="/tools/utility-tools"
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
                        <span className="text-slate-900 font-medium font-outfit">Utility Tools</span>
                    </nav>

                    {/* Header */}
                    <div className="text-center mb-10">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-black uppercase tracking-[0.2em] mb-4">
                            <FaBolt className="w-3 h-3" />
                            Efficiency Engine
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter font-outfit">
                            Creator <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Utility</span> Suite
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-outfit font-medium summary" data-speakable>
                            Don&apos;t work harder—work smarter. In 2026, the successful creator automates repetitive logistics. Our utility suite handles the operational friction so you can focus on creative vision.
                        </p>
                    </div>

                    {/* Top Leaderboard Ad */}
                    <div className="mb-12 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 min-h-[90px] flex flex-col items-center justify-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 text-center">Advertisement</p>
                        <GoogleAd slot={AD_SLOTS.HEADER} lazy={false} responsive className="w-full text-center" />
                    </div>

                    {/* Productivity Strategy */}
                    <div className="glass-premium rounded-3xl p-10 border-l-8 border-emerald-500 mb-12 shadow-xl">
                        <h2 className="text-3xl font-black text-slate-900 mb-6 font-outfit flex items-center gap-3">
                            <FaMagic className="text-emerald-500" />
                            The 2026 Productivity Audit
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="space-y-3">
                                <h3 className="font-black text-emerald-700 uppercase tracking-widest text-xs">Content Velocity</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">Use the <strong>Playlist Length Calculator</strong> to plan series consumption behavior and binge-watch potential.</p>
                            </div>
                            <div className="space-y-3">
                                <h3 className="font-black text-emerald-700 uppercase tracking-widest text-xs">Audience Trust</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">Run giveaways with the <strong>Comment Picker</strong> to ensure verified, provable fairness in your community events.</p>
                            </div>
                            <div className="space-y-3">
                                <h3 className="font-black text-emerald-700 uppercase tracking-widest text-xs">Channel Integrity</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">The <strong>Channel Health Auditor</strong> checks for metadata drift and recommendation status to prevent reach dips.</p>
                            </div>
                        </div>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
                        {utilityTools.map((tool) => (
                            <Link
                                key={tool.slug}
                                href={`/tools/${tool.slug}`}
                                className="group glass-premium border-white/40 rounded-[2.5rem] p-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-500 mb-8">
                                        <tool.icon className="w-8 h-8" />
                                    </div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <h3 className="text-2xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors font-outfit tracking-tight">
                                            {tool.name}
                                        </h3>
                                        {tool.isAI && (
                                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-wider">AI</span>
                                        )}
                                    </div>
                                    <p className="text-slate-600 leading-relaxed text-lg font-outfit font-medium">
                                        {tool.shortDescription || tool.description}
                                    </p>
                                    <div className="mt-8 flex items-center text-emerald-600 font-black text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                                        Launch Tool
                                        <FaArrowRight className="ml-2 w-3 h-3" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pro Creator Growth Recommendation */}
                    <div className="my-8">
                        <AffiliateBanner toolId="tubebuddy" variant="inArticle" />
                    </div>

                    {/* Mid Ad placement */}
                    <div className="my-8" aria-hidden="true">
                        <GoogleAd slot="8649718301" />
                    </div>

                    {/* Deep Dive Section */}
                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="glass-premium rounded-[3rem] p-12 shadow-sm relative overflow-hidden">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 font-outfit tracking-tighter">
                                Building a Media Business in 2026
                            </h2>
                            <div className="prose prose-lg md:prose-xl text-slate-600 font-outfit">
                                <p className="mb-6">
                                    The &ldquo;Solopreneur&rdquo; model is evolving. To scale in 2026, you must think like a <strong>Media House</strong>. This requires standardizing your operations and protecting your most valuable asset: <em>Time</em>.
                                </p>
                                <p>
                                    Our utility suite is designed to automate the non-creative hurdles that slow you down. Whether it&apos;s verifying channel IDs, calculating series watch times, or auditing your metadata, we provide the industrial-strength utilities needed for professional creators.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* AEO / FAQ Section */}
                    <div className="glass-premium rounded-3xl p-8 sm:p-10 shadow-sm mb-12" data-speakable>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 font-outfit">
                            Frequently Asked Questions About Creator Utilities
                        </h2>
                        <div className="space-y-6">
                            {utilityFaqs.map((faq, idx) => (
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
