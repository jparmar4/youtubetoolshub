"use client";

import StickySidebarAd from "@/components/ads/StickySidebarAd";

export default function BlogSidebar() {
    return (
        <aside className="space-y-6 lg:sticky lg:top-24 h-[calc(100vh-6rem)] overflow-y-auto hidden-scrollbar">
            {/* User requested fixed sidebar ad (Jit01displayverticle) */}
            <StickySidebarAd />
        </aside>
    );
}
