"use client";

import { useEffect, useRef, useState } from "react";
import {
  initializeAdOnView,
  resetAd,
  watchAdFill,
  AD_CLIENT,
  AD_SLOTS,
} from "@/lib/adsense";

let sidebarCounter = 0;

/**
 * Fixed 300×250 sidebar unit. Reserves size while loading; collapses if unfilled.
 */
export default function SidebarAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [instanceId] = useState(() => `sidebar-ad-${++sidebarCounter}`);
  const [phase, setPhase] = useState<"loading" | "filled" | "empty">("loading");

  useEffect(() => {
    resetAd(instanceId);

    const cleanupInit = initializeAdOnView(
      containerRef.current,
      instanceId,
      {
        rootMargin: "400px",
        adOptions: { delay: 100 },
      },
    );

    let fillCleanup: (() => void) | null = null;
    const watchTimer = setTimeout(() => {
      const ins = containerRef.current?.querySelector("ins.adsbygoogle");
      if (!ins) return;

      fillCleanup = watchAdFill(
        ins,
        (result) => {
          setPhase(result === "filled" ? "filled" : "empty");
        },
        { minHeight: 40, timeoutMs: 10000 },
      );
    }, 400);

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
      className="w-full flex flex-col items-center overflow-hidden bg-slate-50 rounded-2xl border border-slate-100 p-3"
      role="complementary"
      aria-label="Advertisement"
    >
      {phase === "filled" && (
        <div className="text-[10px] text-slate-400 mb-2 uppercase tracking-widest font-medium">
          Advertisement
        </div>
      )}
      <ins
        className="adsbygoogle"
        style={{
          display: "inline-block",
          width: "300px",
          height: "250px",
        }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOTS.SIDEBAR}
      />
    </div>
  );
}
