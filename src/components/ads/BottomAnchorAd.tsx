"use client";

import { useEffect, useRef, useState } from "react";
import {
  initializeAd,
  watchAdFill,
  AD_CLIENT,
  AD_SLOTS,
} from "@/lib/adsense";

/**
 * Bottom anchor — only fully visible after the ad unit fills.
 * Uses near-invisible in-flow sizing while loading (never display:none).
 */
export default function BottomAnchorAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"loading" | "filled" | "empty">("loading");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const cleanupInit = initializeAd(
      containerRef.current,
      "bottom-anchor-ad",
      { delay: 600, maxWait: 12000 },
    );

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
        { minHeight: 30, timeoutMs: 10000 },
      );
    }, 700);

    return () => {
      cleanupInit();
      clearTimeout(watchTimer);
      fillCleanup?.();
    };
  }, [dismissed]);

  if (dismissed || phase === "empty") return null;

  return (
    <div
      className={
        phase === "filled"
          ? "fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center bg-white/95 border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] backdrop-blur"
          : "fixed bottom-0 left-0 right-0 z-30 flex flex-col items-center pointer-events-none opacity-[0.01]"
      }
      role="complementary"
      aria-label="Advertisement"
      aria-hidden={phase !== "filled"}
    >
      {phase === "filled" && (
        <div className="flex w-full max-w-[728px] mx-auto items-center justify-between px-2 pt-1">
          <span className="text-[9px] font-medium uppercase tracking-widest text-slate-400 select-none">
            Advertisement
          </span>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="rounded p-1 text-slate-400 hover:text-slate-600"
            aria-label="Close advertisement"
          >
            ×
          </button>
        </div>
      )}
      <div
        ref={containerRef}
        className="flex w-full max-w-[728px] mx-auto justify-center pb-1"
      >
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            maxWidth: "728px",
            minHeight: "50px",
          }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={AD_SLOTS.BOTTOM_STICKY}
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
