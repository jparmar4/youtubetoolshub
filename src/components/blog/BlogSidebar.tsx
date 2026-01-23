"use client";

import Link from "next/link";
import SidebarAd from "@/components/ads/SidebarAd";
import { tools } from "@/config/tools";
import { FaArrowRight } from "react-icons/fa";

export default function BlogSidebar() {
    // Select a few popular/high-value tools to display
    const popularTools = tools
        .filter(t => t.isFeatured)
        .slice(0, 5);

    return (
        <aside className="space-y-8 sticky top-24">
            {/* Primary Sidebar Ad */}
            <div className="min-h-[600px]">
                <SidebarAd />
            </div>

            {/* Popular Tools Widget */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="text-xl">🚀</span> Popular Tools
                </h3>
                <div className="space-y-4">
                    {popularTools.map((tool) => (
                        <Link
                            key={tool.slug}
                            href={`/tools/${tool.slug}`}
                            className="flex items-start gap-3 group p-2 rounded-xl hover:bg-slate-50 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <tool.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-[15px] group-hover:text-purple-600 transition-colors line-clamp-1">
                                    {tool.name}
                                </h4>
                                <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                                    {tool.shortDescription}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                        href="/tools"
                        className="flex items-center justify-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors w-full group"
                    >
                        View All Tools
                        <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </aside>
    );
}
