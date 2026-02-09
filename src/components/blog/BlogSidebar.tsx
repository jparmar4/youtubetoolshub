"use client";

import SidebarAd from "@/components/ads/SidebarAd";
import StickySidebarAd from "@/components/ads/StickySidebarAd";

export default function BlogSidebar() {
    return (
        <aside className="space-y-8 sticky top-24">
            {/* Top Sidebar Ad */}
            <div className="min-h-[300px]">
                <SidebarAd />
            </div>

            {/* Secondary Sidebar Ad */}
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
