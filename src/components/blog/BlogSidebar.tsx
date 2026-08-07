"use client";

import { useEffect, useState } from "react";
import GoogleAd from "@/components/ads/GoogleAd";
import { AD_SLOTS } from "@/lib/adsense";

/**
 * Right sidebar for blog + tool detail pages only (not home / marketing pages).
 *
 * AdSense unit: dispsidebarverticle (slot 9242656079)
 * Official snippet attrs: display:block, format auto, full-width-responsive.
 *
 * Important: only mount the ad when the rail is actually visible (lg+).
 * Initializing while display:none (width 0) leaves a permanent blank unit.
 */
export default function BlogSidebar() {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <aside className="hidden lg:block lg:col-span-1 self-start w-full min-w-0 lg:sticky lg:top-24">
      <div className="w-full">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
          Advertisement
        </p>
        {desktop ? (
          <GoogleAd
            slot={AD_SLOTS.SIDEBAR}
            format="auto"
            responsive
            lazy={false}
            style={{ display: "block" }}
            className="w-full"
          />
        ) : (
          // Reserve a modest slot so layout does not jump when desktop mounts
          <div className="w-full min-h-[90px]" aria-hidden />
        )}
      </div>
    </aside>
  );
}
