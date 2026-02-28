"use client";

import { useEffect, useRef, useState } from "react";
import { initializeAd, resetAd, AD_CLIENT, AD_SLOTS } from "@/lib/adsense";

let stickySidebarCounter = 0;

export default function StickySidebarAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Stable instance ID per mount — unique across navigations
  const [instanceId] = useState(() => `sticky-sidebar-${++stickySidebarCounter}`);

  useEffect(() => {
    // Reset so re-navigation to a blog post re-initializes the ad
    resetAd(instanceId);

    // 300ms delay lets the sticky sidebar finish its CSS layout pass
    // before AdSense measures the <ins> element dimensions
    const cleanup = initializeAd(containerRef.current, instanceId, {
      delay: 300,
    });

    return () => {
      cleanup();
      resetAd(instanceId);
    };
  }, [instanceId]);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center bg-white rounded-2xl border border-slate-100 p-3 shadow-sm"
    >
      <div className="text-[10px] text-slate-400 mb-2 uppercase tracking-widest font-medium">
        Advertisement
      </div>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          minHeight: "250px",
        }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOTS.STICKY_SIDEBAR}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
