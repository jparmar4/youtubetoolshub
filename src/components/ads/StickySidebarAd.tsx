"use client";

import { useEffect, useRef, useState } from "react";
import { initializeAd, resetAd, AD_CLIENT, AD_SLOTS } from "@/lib/adsense";

let stickySidebarCounter = 0;

export default function StickySidebarAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [instanceId] = useState(() => `sticky-sidebar-${++stickySidebarCounter}`);
  // Start hidden — only show once AdSense confirms the ad filled
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reset so re-navigation to a blog post re-initializes the ad
    resetAd(instanceId);

    // 400ms delay — lets the sticky sidebar finish its CSS layout pass
    // before AdSense measures the <ins> element dimensions
    const cleanup = initializeAd(containerRef.current, instanceId, {
      delay: 400,
    });

    // Watch for AdSense to mark the <ins> as processed, then check
    // whether it actually rendered an ad (height > 0) or collapsed.
    let observer: MutationObserver | null = null;

    const watchForAdFill = () => {
      const container = containerRef.current;
      if (!container) return;

      const ins = container.querySelector("ins.adsbygoogle");
      if (!ins) return;

      observer = new MutationObserver(() => {
        const status = ins.getAttribute("data-adsbygoogle-status");
        if (status === "done") {
          // Give the browser a frame to apply the final height
          requestAnimationFrame(() => {
            const iframe = ins.querySelector("iframe");
            const filledHeight = iframe
              ? iframe.getBoundingClientRect().height
              : ins.getBoundingClientRect().height;

            if (filledHeight > 10) {
              setIsVisible(true);
            }
            // If height is 0/collapsed → stay hidden (white box never shows)
          });
          observer?.disconnect();
        }
      });

      observer.observe(ins, {
        attributes: true,
        attributeFilter: ["data-adsbygoogle-status"],
      });
    };

    // Delay the observer start slightly so the <ins> is in the DOM
    const observerTimer = setTimeout(watchForAdFill, 500);

    return () => {
      cleanup();
      resetAd(instanceId);
      clearTimeout(observerTimer);
      observer?.disconnect();
    };
  }, [instanceId]);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center bg-white rounded-2xl border border-slate-100 p-3 shadow-sm"
      style={{ display: isVisible ? "flex" : "none" }}
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
