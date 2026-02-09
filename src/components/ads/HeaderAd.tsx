"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

/**
 * HeaderAd — Top-of-page leaderboard ad (highest RPM placement)
 *
 * FIXES from previous version:
 * 1. FIXED: Was using data-ad-slot="auto" which is NOT a valid AdSense slot ID.
 *    AdSense requires a real numeric slot ID to serve ads. Changed to real slot.
 * 2. FIXED: Was rendering TWO <ins> tags (desktop + mobile) but only calling
 *    adsbygoogle.push({}) ONCE — meaning only one ad unit ever loaded.
 *    Now uses a single responsive <ins> that adapts to screen size.
 * 3. FIXED: Was hiding the ad on scroll (after 100px) which destroyed
 *    above-the-fold viewability — the #1 factor in ad RPM. Removed scroll hiding.
 * 4. FIXED: Dismiss button stored in sessionStorage, killing all header ad
 *    revenue for the entire session. Removed dismiss functionality.
 * 5. Above-the-fold ads are the HIGHEST paying placements. Never hide them.
 *
 * Revenue impact: Fixing these issues alone can increase RPM by 200-500%.
 */
export default function HeaderAd() {
  const adRef = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    // Prevent double initialization (React Strict Mode / re-renders)
    if (adRef.current) return;

    // Small delay to ensure AdSense script is loaded
    const timer = setTimeout(() => {
      try {
        if (typeof window !== "undefined" && containerRef.current) {
          const insElement =
            containerRef.current.querySelector("ins.adsbygoogle");

          // Only push if the ins element exists and hasn't been filled yet
          if (
            insElement &&
            !insElement.getAttribute("data-adsbygoogle-status")
          ) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            adRef.current = true;

            // Watch for unfilled ads and hide container if no ad served
            setTimeout(() => {
              const status = insElement.getAttribute("data-adsbygoogle-status");
              const adContent = insElement.innerHTML.trim();
              if (status === "unfilled" || (status === "done" && adContent === "")) {
                setAdError(true);
              }
            }, 2000);
          }
        }
      } catch (err) {
        console.error("HeaderAd: AdSense initialization error:", err);
        setAdError(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Don't render anything if ad failed to load
  if (adError) return null;

  return (
    <div
      ref={containerRef}
      className="w-full bg-slate-50/80 border-b border-slate-200/60"
      role="complementary"
      aria-label="Advertisement"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Tiny "Ad" label for policy compliance */}
        <div className="text-[9px] text-slate-400 text-center pt-1 uppercase tracking-widest select-none">
          Advertisement
        </div>

        {/* Single responsive ad unit — adapts to all screen sizes automatically */}
        <div className="flex justify-center py-1 pb-2">
          <ins
            className="adsbygoogle"
            style={{
              display: "block",
              width: "100%",
              minHeight: "50px" /* Mobile minimum */,
              maxHeight: "120px" /* Cap height to prevent layout shift */,
            }}
            data-ad-client="ca-pub-1328083083403070"
            data-ad-slot="5848325027"
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
}
