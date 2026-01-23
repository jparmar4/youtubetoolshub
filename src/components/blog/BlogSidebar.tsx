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
        </aside>
    );
}
