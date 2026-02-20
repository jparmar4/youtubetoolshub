"use client";

import { useEffect, useRef } from "react";
import { initializeAdOnView, AD_CLIENT, AD_SLOTS } from "@/lib/adsense";
import { useState } from "react";

let stickySidebarCounter = 0;

export default function StickySidebarAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [instanceId] = useState(() => `sticky-sidebar-${++stickySidebarCounter}`);

  useEffect(() => {
    const cleanup = initializeAdOnView(containerRef.current, instanceId, {
      rootMargin: "800px",
    });
    return cleanup;
  }, [instanceId]);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center overflow-hidden bg-white rounded-2xl border border-slate-100 p-3 shadow-sm"
    >
      <div className="text-[10px] text-slate-400 mb-2 uppercase tracking-widest font-medium">
        Advertisement
      </div>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "300px",
          height: "600px",
          maxWidth: "100%",
        }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOTS.STICKY_SIDEBAR}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
