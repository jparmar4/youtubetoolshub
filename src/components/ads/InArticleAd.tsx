"use client";

import { useEffect, useRef, useState } from "react";
import {
  initializeAd,
  resetAd,
  watchAdFill,
  AD_CLIENT,
  pickInArticleSlot,
} from "@/lib/adsense";

/**
 * InArticleAd — Native in-article ad that blends with content.
 *
 * Lazy-loads near viewport, reserves real min-height for fill, collapses if unfilled.
 */

let instanceCounter = 0;

export default function InArticleAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adIndex] = useState(() => ++instanceCounter);
  const [adId] = useState(() => `in-article-ad-${adIndex}`);
  const [adSlotId] = useState(() => pickInArticleSlot(adIndex - 1));
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
      delay: 80,
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
        { minHeight: 50, timeoutMs: 10000 },
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
    return <div className="w-full my-2" aria-hidden="true" />;
  }

  return (
    <div
      ref={containerRef}
      className="w-full my-8 flex flex-col items-center"
      id={adId}
      role="complementary"
      aria-label="Advertisement"
    >
      {phase === "filled" && (
        <div className="text-[10px] text-slate-300 mb-1 uppercase tracking-wider select-none">
          Advertisement
        </div>
      )}

      <div
        className={`w-full text-center rounded-lg overflow-hidden transition-all duration-300 ${
          nearView ? "min-h-[100px] bg-slate-50/50" : "min-h-[50px]"
        }`}
      >
        {nearView && (
          <ins
            className="adsbygoogle"
            style={{
              display: "block",
              textAlign: "center",
              width: "100%",
              minHeight: 100,
            }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client={AD_CLIENT}
            data-ad-slot={adSlotId}
          />
        )}
      </div>
    </div>
  );
}
