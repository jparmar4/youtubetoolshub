"use client";

import { useEffect, useRef, useState, useId } from "react";
import {
  initializeAd,
  resetAd,
  watchAdFill,
  AD_CLIENT,
  pickHorizontalSlot,
} from "@/lib/adsense";

/**
 * Responsive display unit.
 *
 * Fixes vs previous version:
 * - Reserved real min-height while loading (was 1px — AdSense often won't fill)
 * - Proper cleanup of observers/polls
 * - Stable slot selection (no Math.random hydration issues)
 * - Collapses only after unfilled/timeout, not while measuring
 */
export default function HorizontalAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const adId = `horizontal-ad-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`;

  const [slotId] = useState(() => {
    // Derive a stable index from reactId char codes
    let hash = 0;
    for (let i = 0; i < reactId.length; i++) {
      hash = (hash + reactId.charCodeAt(i) * (i + 1)) % 97;
    }
    return pickHorizontalSlot(hash);
  });

  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState<"idle" | "loading" | "filled" | "empty">(
    "idle",
  );

  // Near viewport → mount <ins>
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      queueMicrotask(() => setReady(true));
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Push once near viewport
  useEffect(() => {
    if (!ready) return;

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
  }, [ready, adId]);

  if (phase === "empty") return null;

  return (
    <div
      ref={containerRef}
      id={adId}
      className={`w-full flex flex-col items-center overflow-hidden ${
        phase === "filled" ? "my-6" : "my-3"
      }`}
      role="complementary"
      aria-label="Advertisement"
    >
      {phase === "filled" && (
        <div className="text-[10px] text-slate-400 mb-1 uppercase tracking-wider select-none">
          Advertisement
        </div>
      )}
      <div
        className={`w-full flex items-center justify-center overflow-hidden ${
          ready ? "min-h-[90px]" : "min-h-[1px]"
        }`}
      >
        {ready && (
          <ins
            className="adsbygoogle"
            style={{
              display: "block",
              width: "100%",
              // Real height while measuring — 1px boxes rarely fill
              minHeight: 90,
            }}
            data-ad-client={AD_CLIENT}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}
      </div>
    </div>
  );
}
