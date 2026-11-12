import Link from "next/link";
import { Metadata } from "next";
import { ToolCard } from "@/components/ui/Card";
import { getToolsByCategory } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { combineSchemasToGraph, getToolListSchema, getBreadcrumbSchema, getFAQSchema, getGlobalAlternates } from "@/lib/seo";
import { FaBolt, FaMagic, FaArrowRight } from "react-icons/fa";
import AdSlot from "@/components/ads/AdSlot";
import AffiliateBanner from "@/components/ads/AffiliateBanner";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import { AD_SLOTS } from "@/lib/adsense";

const utilityTools = getToolsByCategory("utility-fun");

export const metadata: Metadata = {
    title: `YouTube Utility & Productivity Tools — ${utilityTools.length} Free Tools (2026)`,
    description: "The ultimate YouTube productivity toolkit for 2026. Calculate playlist length, pick contest winners, audit channel health, and more. Free professional utility suite.",
    keywords: ["youtube utility tools", "playlist length calculator", "youtube comment picker", "channel health auditor", "youtube automation 2026", "creator productivity tools"],
    openGraph: {
        title: `${utilityTools.length} Free YouTube Utility & Productivity Tools (2026)`,
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

            {/* JSON-LD Schema (@graph) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        combineSchemasToGraph(toolListSchema, breadcrumbSchema, faqSchema)
                    ),
                }}
            />

            <div className="min-h-screen py-10 sm:py-14 relative overflow-hidden">
                <div className="nebula-bg" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumb
                        items={[
                            { name: "Home", href: "/" },
                            { name: "Tools", href: "/tools" },
                            { name: "Utility Tools" },
                        ]}
                        className="mb-8"
                    />

                    {/* Header */}
                    <div className="text-center mb-10">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
                            <FaBolt className="w-3.5 h-3.5" />
                            {utilityTools.length} Free Utility &amp; Productivity Tools
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-5 tracking-tight font-outfit">
                            Creator <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Utility</span> Suite
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed summary" data-speakable>
                            Don&apos;t work harder—work smarter. In 2026, the successful creator automates repetitive logistics. Our utility suite handles operational friction so you can focus on creative vision.
                        </p>
                    </div>

                    {/* Top Leaderboard Ad */}
                    <AdSlot slot={AD_SLOTS.HEADER} preset="leaderboard" className="mb-12" />

                    {/* Productivity Strategy */}
                    <div className="card-3d rounded-2xl p-8 border-l-4 border-l-emerald-500 mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 font-outfit flex items-center gap-3">
                            <FaMagic className="text-emerald-600 w-5 h-5" />
                            <span>The 2026 Productivity Audit</span>
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <h3 className="font-bold text-emerald-700 uppercase tracking-wider text-xs">Content Velocity</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">Use the <strong>Playlist Length Calculator</strong> to plan series consumption behavior and binge-watch potential.</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-emerald-700 uppercase tracking-wider text-xs">Audience Trust</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">Run giveaways with the <strong>Comment Picker</strong> to ensure fair, transparent selection in your community events.</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-emerald-700 uppercase tracking-wider text-xs">Channel Integrity</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">The <strong>Channel Health Auditor</strong> checks for metadata drift and recommendation status to prevent reach dips.</p>
                            </div>
                        </div>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-14">
                        {utilityTools.map((tool) => (
                            <ToolCard
                                key={tool.slug}
                                title={tool.name}
                                description={tool.shortDescription || tool.description}
                                href={`/tools/${tool.slug}`}
                                isAI={tool.isAI}
                                category={tool.category}
                            />
                        ))}
                    </div>

                    {/* Pro Creator Growth Recommendation */}
                    <div className="my-8">
                        <AffiliateBanner toolId="tubebuddy" variant="inArticle" />
                    </div>

                    {/* Mid Ad placement */}
                    <AdSlot slot="8649718301" preset="leaderboard" lazy className="my-8" />

                    {/* Deep Dive Section */}
                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="card-3d rounded-3xl p-8 sm:p-10">
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 font-outfit tracking-tight">
                                Building a Media Business in 2026
                            </h2>
                            <div className="article-prose max-w-none text-slate-600">
                                <p className="mb-4">
                                    The &ldquo;Solopreneur&rdquo; model is evolving. To scale in 2026, you must think like a <strong>Media House</strong>. This requires standardizing your operations and protecting your most valuable asset: <em>Time</em>.
                                </p>
                                <p>
                                    Our utility suite is designed to automate the non-creative hurdles that slow you down. Whether it&apos;s verifying channel IDs, calculating series watch times, or auditing your metadata, we provide reliable utilities needed for professional creators.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* AEO / FAQ Section */}
                    <section className="mb-12" data-speakable>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 font-outfit">
                            Frequently Asked Questions About Creator Utilities
                        </h2>
                        <FaqAccordion items={utilityFaqs} headingLevel="h3" />
                    </section>

                    {/* Final CTA */}
                    <div className="text-center">
                        <Link
                            href="/tools"
                            className="btn-3d-primary inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base sm:text-lg group"
                        >
                            <span>View Entire Tool Stack</span>
                            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
