"use client";

import { useEffect, useRef, useState } from "react";
import { AD_CLIENT, AD_SLOTS } from "@/lib/adsense";

/**
 * BottomAnchorAd — Fixed bottom sticky anchor ad
 *
 * This is one of the highest-earning ad placements:
 * - Always visible while the user reads content
 * - High viewability score → AdSense serves premium ads
 * - On mobile, anchor ads are the #1 revenue driver
 *
 * KEY BEHAVIORS:
 * 1. Only appears once AdSense confirms the ad filled (no empty white box)
 * 2. Can be dismissed by the user (good UX, required by AdSense policy)
 * 3. Re-appears on next page visit (dismissal is not persisted)
 * 4. Auto-hides if the ad is unfilled or errors out
 */

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function BottomAnchorAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const adInitialized = useRef(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (adInitialized.current) return;

    // Small delay so the DOM is fully painted before we push
    const timer = setTimeout(() => {
      try {
        const container = containerRef.current;
        if (!container) return;

        const insElement = container.querySelector("ins.adsbygoogle");
        if (!insElement) return;

        const status = insElement.getAttribute("data-adsbygoogle-status");
        if (status === "done" || status === "loaded") {
          adInitialized.current = true;
          return;
        }

        // Push the ad
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adInitialized.current = true;

        // Watch for fill status
        const observer = new MutationObserver(() => {
          const currentStatus = insElement.getAttribute("data-adsbygoogle-status");
          if (currentStatus === "done") {
            // Check if an iframe actually loaded (ad content exists)
            const iframe = insElement.querySelector("iframe");
            const height = iframe
              ? iframe.getBoundingClientRect().height
              : insElement.getBoundingClientRect().height;

            if (height > 10) {
              setIsFilled(true);
            }
            observer.disconnect();
          } else if (currentStatus === "unfilled") {
            observer.disconnect();
          }
        });

        observer.observe(insElement, {
          attributes: true,
          attributeFilter: ["data-adsbygoogle-status"],
        });

        // Fallback: check again after 3s
        setTimeout(() => {
          const finalStatus = insElement.getAttribute("data-adsbygoogle-status");
          const iframe = insElement.querySelector("iframe");
          const height = iframe
            ? iframe.getBoundingClientRect().height
            : insElement.getBoundingClientRect().height;

          if ((finalStatus === "done" || finalStatus === "loaded") && height > 10) {
            setIsFilled(true);
          }
          observer.disconnect();
        }, 3000);
      } catch (err) {
        console.error("[BottomAnchorAd] Error:", err);
      }
    }, 800); // 800ms delay to let LCP paint first

    return () => clearTimeout(timer);
  }, []);

  // Don't render if dismissed or not filled yet
  if (isDismissed || !isFilled) {
    // Keep the <ins> in the DOM for initialization, but hide the wrapper
    return (
      <div
        ref={containerRef}
        style={{ position: "absolute", left: "-9999px", top: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
        aria-hidden="true"
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "320px", height: "50px" }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={AD_SLOTS.BOTTOM_STICKY}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center"
      style={{
        boxShadow: "0 -4px 20px rgba(0,0,0,0.12)",
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(8px)",
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}
      role="complementary"
      aria-label="Advertisement"
    >
      {/* Top bar with label and dismiss button */}
      <div className="w-full flex items-center justify-between px-3 pt-1 pb-0">
        <span className="text-[9px] text-slate-400 uppercase tracking-widest font-medium select-none">
          Advertisement
        </span>
        <button
          onClick={() => setIsDismissed(true)}
          className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded"
          aria-label="Close advertisement"
          title="Close"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Actual Ad */}
      <div
        ref={containerRef}
        className="w-full flex justify-center pb-1"
      >
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            minHeight: "50px",
          }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={AD_SLOTS.BOTTOM_STICKY}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
