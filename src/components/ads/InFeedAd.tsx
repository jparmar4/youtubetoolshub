"use client";

import { useEffect, useRef, useState } from "react";
import {
  initializeAd,
  resetAd,
  watchAdFill,
  AD_CLIENT,
  AD_SLOTS,
} from "@/lib/adsense";

/**
 * InFeedAd — native fluid unit for tool/blog grids.
 */

let infeedAdCounter = 0;

export default function InFeedAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adId] = useState(() => `infeed-ad-${++infeedAdCounter}`);
  const [nearView, setNearView] = useState(false);
  const [phase, setPhase] = useState<"idle" | "loading" | "filled" | "empty">(
    "idle",
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!("IntersectionObserver" in window)) {
      queueMicrotask(() => setNearView(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setNearView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "400px 0px",
        threshold: 0,
      },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!nearView) return;

    resetAd(adId);
    setPhase("loading");

    const cleanupInit = initializeAd(containerRef.current, adId, {
      delay: 100,
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
    }, 150);

    return () => {
      cleanupInit();
      resetAd(adId);
      clearTimeout(watchTimer);
      fillCleanup?.();
    };
  }, [nearView, adId]);

  if (phase === "empty") {
    return <div className="hidden" aria-hidden="true" />;
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col justify-center items-center rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all"
      id={adId}
      role="complementary"
      aria-label="Sponsored content"
    >
      {phase === "filled" && (
        <div className="text-[10px] text-slate-400 mb-2 uppercase tracking-wide font-medium w-full text-center">
          Advertisement
        </div>
      )}

      <div className="w-full flex-grow flex items-center justify-center min-h-[150px]">
        {nearView && (
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%", minHeight: 150 }}
            data-ad-format="fluid"
            data-ad-layout-key="-gw-3+1f-3d+2z"
            data-ad-client={AD_CLIENT}
            data-ad-slot={AD_SLOTS.IN_FEED}
          />
        )}
      </div>
    </div>
  );
}
