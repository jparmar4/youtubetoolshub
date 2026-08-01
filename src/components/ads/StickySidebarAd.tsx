"use client";

import { useEffect, useRef, useState } from "react";
import {
  initializeAd,
  resetAd,
  watchAdFill,
  AD_CLIENT,
  AD_SLOTS,
} from "@/lib/adsense";

let stickySidebarCounter = 0;

/**
 * Sticky sidebar ad.
 *
 * CRITICAL: Never use display:none while waiting for fill.
 * AdSense will not serve ads into hidden containers — that killed
 * sidebar impressions on blog pages.
 */
export default function StickySidebarAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [instanceId] = useState(
    () => `sticky-sidebar-${++stickySidebarCounter}`,
  );
  const [phase, setPhase] = useState<"loading" | "filled" | "empty">("loading");

  useEffect(() => {
    resetAd(instanceId);

    const cleanupInit = initializeAd(containerRef.current, instanceId, {
      delay: 200,
    });

    let fillCleanup: (() => void) | null = null;
    const watchTimer = setTimeout(() => {
      const ins = containerRef.current?.querySelector("ins.adsbygoogle");
      if (!ins) {
        setPhase("empty");
        return;
      }

      fillCleanup = watchAdFill(
        ins,
        (result) => {
          setPhase(result === "filled" ? "filled" : "empty");
        },
        { minHeight: 40, timeoutMs: 10000 },
      );
    }, 300);

    return () => {
      cleanupInit();
      resetAd(instanceId);
      clearTimeout(watchTimer);
      fillCleanup?.();
    };
  }, [instanceId]);

  if (phase === "empty") return null;

  return (
    <div
      ref={containerRef}
      className={`w-full flex flex-col items-center rounded-2xl p-3 ${
        phase === "filled"
          ? "bg-white border border-slate-100 shadow-sm"
          : "bg-transparent border border-transparent"
      }`}
      role="complementary"
      aria-label="Advertisement"
      aria-hidden={phase !== "filled"}
    >
      {phase === "filled" && (
        <div className="text-[10px] text-slate-400 mb-2 uppercase tracking-widest font-medium">
          Advertisement
        </div>
      )}
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "300px",
          minHeight: "250px",
          opacity: phase === "filled" ? 1 : 0.01,
        }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOTS.STICKY_SIDEBAR}
        data-ad-format="rectangle"
      />
    </div>
  );
}
