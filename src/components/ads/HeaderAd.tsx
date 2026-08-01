"use client";

import { useEffect, useRef, useState } from "react";
import {
  initializeAd,
  watchAdFill,
  AD_CLIENT,
  AD_SLOTS,
} from "@/lib/adsense";

/**
 * HeaderAd — Top-of-page leaderboard (highest RPM placement).
 *
 * Fixes vs previous version:
 * - Removed 1.5–2.5s idle delay that lost impressions on short sessions
 * - Uses shared initializeAd + fill watcher with proper cleanup
 * - Keeps real in-flow size while loading (AdSense needs non-zero box)
 * - Collapses only when unfilled (no permanent empty grey bar)
 */
export default function HeaderAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"loading" | "filled" | "empty">("loading");

  useEffect(() => {
    const cleanupInit = initializeAd(containerRef.current, "header-leaderboard", {
      delay: 400,
      maxWait: 12000,
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
    }, 500);

    return () => {
      cleanupInit();
      clearTimeout(watchTimer);
      fillCleanup?.();
    };
  }, []);

  if (phase === "empty") return null;

  return (
    <div
      ref={containerRef}
      className={`w-full ${
        phase === "filled"
          ? "bg-slate-50/80 border-b border-slate-200/60"
          : "bg-transparent"
      }`}
      role="complementary"
      aria-label="Advertisement"
      aria-hidden={phase !== "filled"}
    >
      <div className="max-w-7xl mx-auto px-4">
        {phase === "filled" && (
          <div className="text-[9px] text-slate-400 text-center pt-1 uppercase tracking-widest select-none">
            Advertisement
          </div>
        )}

        <div
          className={`flex justify-center ${
            phase === "filled" ? "py-1 pb-2" : "py-0"
          }`}
        >
          <ins
            className="adsbygoogle"
            style={{
              display: "block",
              width: "100%",
              minHeight: "90px",
              maxHeight: "120px",
              // Soften loading state without zeroing dimensions
              opacity: phase === "filled" ? 1 : 0.01,
            }}
            data-ad-client={AD_CLIENT}
            data-ad-slot={AD_SLOTS.HEADER}
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
}
