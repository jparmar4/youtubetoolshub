"use client";

import SidebarAd from "@/components/ads/SidebarAd";
import StickySidebarAd from "@/components/ads/StickySidebarAd";

export default function BlogSidebar() {
    return (
        <aside className="space-y-6">
            {/* Regular Sidebar Ad - loads immediately when sidebar is visible */}
            <SidebarAd />

            {/* Sticky Sidebar Ad - stays visible on scroll */}
            <div className="sticky top-24">
                <StickySidebarAd />
            </div>
        </aside>
    );
}
