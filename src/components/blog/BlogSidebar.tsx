"use client";

import StickySidebarAd from "@/components/ads/StickySidebarAd";

export default function BlogSidebar() {
    return (
        <aside className="hidden lg:block lg:col-span-1 lg:sticky lg:top-24 self-start">
            {/* Sticky sidebar ad */}
            <StickySidebarAd />
        </aside>
    );
}
