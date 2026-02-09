"use client";

import Link from "next/link";
import SidebarAd from "@/components/ads/SidebarAd";
import StickySidebarAd from "@/components/ads/StickySidebarAd";
import { tools } from "@/config/tools";
import { FaArrowRight, FaStar, FaBolt } from "react-icons/fa";

export default function BlogSidebar() {
    // Select popular/high-value tools to display
    const popularTools = tools
        .filter(t => t.isFeatured)
        .slice(0, 5);

    return (
        <aside className="space-y-8 sticky top-24">
            {/* Popular Tools Section - Increases engagement and internal linking */}
            <div className="glass-premium rounded-2xl p-6 border border-white/40">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FaBolt className="text-purple-600" />
                    Popular Tools
                </h3>
                <ul className="space-y-3">
                    {popularTools.map((tool) => (
                        <li key={tool.slug}>
                            <Link
                                href={`/tools/${tool.slug}`}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 transition-colors group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white text-sm flex-shrink-0">
                                    <tool.icon />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-sm font-semibold text-slate-700 group-hover:text-purple-600 transition-colors block truncate">
                                        {tool.name.replace("YouTube ", "")}
                                    </span>
                                    {tool.isAI && (
                                        <span className="text-[10px] text-purple-600 font-bold uppercase">AI Powered</span>
                                    )}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link
                    href="/tools"
                    className="mt-4 flex items-center justify-center gap-2 py-2 px-4 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
                >
                    View All Tools
                    <FaArrowRight className="text-xs" />
                </Link>
            </div>

            {/* Primary Sidebar Ad */}
            <div className="min-h-[300px]">
                <SidebarAd />
            </div>

            {/* Sticky Sidebar Ad - High CPM */}
            <div className="sticky top-24 min-h-[600px]">
                <StickySidebarAd />
            </div>
        </aside>
    );
}

