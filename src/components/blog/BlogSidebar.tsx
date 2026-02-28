"use client";

import StickySidebarAd from "@/components/ads/StickySidebarAd";

export default function BlogSidebar() {
    return (
        <aside className="space-y-6 lg:sticky lg:top-24 self-start">
            {/* Sticky sidebar ad */}
            <StickySidebarAd />
        </aside>
    );
}
