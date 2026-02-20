"use client";

import { useEffect, useRef, useState } from "react";
import { initializeAdOnView, AD_CLIENT, AD_SLOTS } from "@/lib/adsense";

let sidebarCounter = 0;

export default function SidebarAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [instanceId] = useState(() => `sidebar-ad-${++sidebarCounter}`);

  useEffect(() => {
    const cleanup = initializeAdOnView(containerRef.current, instanceId, {
      rootMargin: "800px", // Increased to 800px so sidebar ad fills before scroll
    });
    return cleanup;
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center overflow-hidden bg-slate-50 rounded-2xl border border-slate-100 p-3"
    >
      <div className="text-[10px] text-slate-400 mb-2 uppercase tracking-widest font-medium">
        Advertisement
      </div>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "300px",
          height: "250px",
          maxWidth: "100%",
        }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOTS.SIDEBAR}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
