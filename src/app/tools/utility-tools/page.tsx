import Link from "next/link";
import { Metadata } from "next";
import { getToolsByCategory } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { getToolListSchema } from "@/lib/seo";
import { FaTools, FaMagic, FaChartLine, FaArrowRight } from "react-icons/fa";

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
    alternates: {
        canonical: "/tools/utility-tools",
    },
};

export default function UtilityToolsHub() {
    const utilityTools = getToolsByCategory("utility-fun");

    const toolListSchema = getToolListSchema(
        utilityTools.map((tool) => ({
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
                        <span className="text-slate-900 font-medium font-outfit">Utility Tools</span>
                    </nav>

                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-black uppercase tracking-[0.2em] mb-6">
                            <FaBolt className="w-3 h-3" />
                            Efficiency Engine
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter font-outfit">
                            Creator <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Utility</span> Suite
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-outfit font-medium">
                            Don't work harder—work smarter. In 2026, the successful creator is the one who automates the mundane. Our utility suite handles the logistics so you can handle the vision.
                        </p>
                    </div>

                    {/* Productivity Strategy */}
                    <div className="glass-premium rounded-3xl p-10 border-l-8 border-emerald-500 mb-20 shadow-xl">
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
                                <p className="text-slate-600 text-sm leading-relaxed">The <strong>Channel Health Auditor</strong> checks for metadata drift and recommendation status to prevent shadowbands.</p>
                            </div>
                        </div>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
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

                    {/* Deep Dive Section */}
                    <div className="max-w-4xl mx-auto mb-20">
                        <div className="glass-premium rounded-[3rem] p-12 shadow-sm relative overflow-hidden">
                            <h2 className="text-4xl font-black text-slate-900 mb-8 font-outfit tracking-tighter">
                                Building a Media Business in 2026
                            </h2>
                            <div className="prose prose-xl text-slate-600 font-outfit">
                                <p className="mb-6">
                                    The "Solopreneur" model is evolving. To scale in 2026, you must think like a <strong>Media House</strong>. This requires standardizing your operations and protecting your most valuable asset: <em>Time</em>.
                                </p>
                                <p>
                                    Our utility suite is designed to automate the non-creative hurdles that slow you down. Whether it's verifying ID formats, calculating binging potential, or auditing your meta-data, we provide the industrial-strength tools needed for professional creators.
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
                            Explore Global Suite
                            <FaArrowRight className="group-hover:translate-x-3 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

// Helper for icon
function FaBolt(props: any) {
    return (
        <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M448 201.1c0 23.3-15.5 43-37.1 48.7L224 304v192c0 8.8-7.2 16-16 16s-16-7.2-16-16V304L25.1 249.8C3.5 244.1-12 224.4-12 201.1c0-23.3 15.5-43 37.1-48.7l172.9-48V32c0-8.8 7.2-16 16-16s16 7.2 16 16v72.4l172.9 48c21.6 5.7 37.1 25.4 37.1 48.7z"></path>
        </svg>
    );
}
