"use client";

import { useEffect, useRef, useState } from "react";
import { AD_CLIENT, AD_SLOTS } from "@/lib/adsense";

/**
 * HorizontalAd — Full-width responsive display ad for between content sections
 *
 * KEY OPTIMIZATIONS:
 * 1. Lazy loading via IntersectionObserver — ad only initializes when the
 *    container is 300px from entering the viewport. This:
 *    - Improves Core Web Vitals (less CLS, faster LCP)
 *    - Increases viewability score → AdSense serves higher-paying ads
 *    - Reduces wasted impressions on ads users never scroll to
 *
 * 2. Proper initialization guard — prevents the common "All ins elements
 *    in the DOM already have ads" double-push error that silently kills ad revenue
 *
 * 3. Unique instance ID — allows multiple HorizontalAd components on the same
 *    page without conflicting with each other (e.g., homepage has 2+)
 *
 * 4. Minimum height placeholder — prevents Cumulative Layout Shift (CLS) when
 *    the ad loads. CLS is a Core Web Vitals metric that directly affects rankings.
 *
 * 5. Graceful error handling — if the ad fails, the container collapses cleanly
 *    instead of leaving an ugly blank space
 *
 * PLACEMENT GUIDE:
 * - Use between major content sections (after hero, between tool grid and FAQ, etc.)
 * - Maximum 1 HorizontalAd per screen-height of content (avoid ad stacking)
 * - Best performing position: directly after the user completes an action
 *   (e.g., after using a tool, after reading a section)
 *
 * Revenue impact: Horizontal display ads are the bread-and-butter of AdSense revenue.
 * With proper lazy loading, viewability jumps from ~40% to ~75%+, which can
 * increase effective CPM by 30-50% because AdSense rewards high-viewability placements.
 */

// Global counter for unique instance IDs across multiple mounts
let horizontalAdCounter = 0;

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function HorizontalAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const adInitialized = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [adId] = useState(() => `horizontal-ad-${++horizontalAdCounter}`);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [hasError, setHasError] = useState(false);

  // ─── Step 1: Observe when the container approaches the viewport ───
  useEffect(() => {
    const container = containerRef.current;
    if (!container || adInitialized.current) return;

    if ("IntersectionObserver" in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry && entry.isIntersecting) {
            setIsNearViewport(true);
            observerRef.current?.disconnect();
          }
        },
        {
          // Start loading 300px before the ad enters the viewport
          // This gives the ad network time to fetch and render the creative
          // before the user actually sees the placement
          rootMargin: "300px 0px",
          threshold: 0,
        },
      );

      observerRef.current.observe(container);
    } else {
      // Fallback: if IntersectionObserver isn't available, load immediately
      setIsNearViewport(true);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // ─── Step 2: Initialize the ad once the <ins> element is rendered ───
  useEffect(() => {
    if (!isNearViewport || adInitialized.current || hasError) return;

    const container = containerRef.current;
    if (!container) return;

    // Small delay to ensure React has committed the <ins> element to the DOM
    const timer = setTimeout(() => {
      try {
        const insElement = container.querySelector("ins.adsbygoogle");

        if (!insElement) {
          console.warn(`[HorizontalAd] No <ins> element found for ${adId}`);
          return;
        }

        // Guard: check if AdSense already processed this element
        const status = insElement.getAttribute("data-adsbygoogle-status");
        if (status === "done" || status === "loaded") {
          adInitialized.current = true;
          return;
        }

        // Guard: check if the element has layout dimensions
        const rect = insElement.getBoundingClientRect();
        if (rect.width === 0) {
          // Element not laid out yet — retry after the next paint
          requestAnimationFrame(() => {
            if (!adInitialized.current) {
              try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                adInitialized.current = true;
              } catch (retryErr) {
                console.error(
                  `[HorizontalAd] Retry push failed for ${adId}:`,
                  retryErr,
                );
                setHasError(true);
              }
            }
          });
          return;
        }

        // ✅ All checks passed — push the ad
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adInitialized.current = true;

        // Watch for status changes to detect "unfilled" state
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (
              mutation.type === "attributes" &&
              mutation.attributeName === "data-adsbygoogle-status"
            ) {
              const currentStatus = insElement.getAttribute(
                "data-adsbygoogle-status",
              );
              if (currentStatus === "unfilled") {
                setHasError(true);
                observer.disconnect();
              }
            }
          });
        });

        observer.observe(insElement, {
          attributes: true,
          attributeFilter: ["data-adsbygoogle-status"],
        });

        // Backup timer: if still empty/unfilled after 3s, collapse it
        // This handles cases where the MutationObserver might miss it or the ad script hangs
        setTimeout(() => {
          const status = insElement.getAttribute("data-adsbygoogle-status");
          const adContent = insElement.innerHTML.trim();
          if (status === "unfilled" || (status === "done" && adContent === "")) {
            setHasError(true);
            observer.disconnect();
          }
        }, 3000);

      } catch (error) {
        console.error(`[HorizontalAd] AdSense error for ${adId}:`, error);
        setHasError(true);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [isNearViewport, adId, hasError]);

  // ─── Render ────────────────────────────────────────────────────────

  // If the ad errored out, collapse gracefully — no ugly blank space
  if (hasError) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center my-8 overflow-hidden"
      id={adId}
      role="complementary"
      aria-label="Advertisement"
    >
      {/* Small "Ad" label — required by AdSense policy */}
      <div className="text-[10px] text-slate-400 mb-1 uppercase tracking-wider select-none">
        Advertisement
      </div>

      {/*
        Ad container with minimum height to prevent CLS (layout shift).

        When isNearViewport is false, we show a smaller placeholder.
        When isNearViewport is true, we expand to accommodate the ad
        and render the actual <ins> element.

        The transition makes the expansion smooth rather than jarring.
      */}
      <div
        className={`w-full flex items-center justify-center rounded-lg transition-all duration-300 ${isNearViewport
          ? "min-h-[90px] md:min-h-[100px] bg-slate-50/30"
          : "min-h-[50px]"
          }`}
      >
        {/*
          Only render the <ins> element when the container is near the viewport.

          Why this matters for RPM:
          - AdSense counts an "impression" when the ad is rendered in the DOM,
            regardless of whether the user sees it
          - If you render all ads immediately but the user only scrolls halfway,
            you get impressions with 0% viewability on bottom ads
          - Low viewability = AdSense lowers your placement's eCPM
          - By only rendering when near viewport, every impression has high
            viewability → AdSense rewards you with better-paying ads
        */}
        {isNearViewport && (
          <ins
            className="adsbygoogle block w-full"
            style={{
              display: "block",
              width: "100%",
              minHeight: "90px",
            }}
            data-ad-client={AD_CLIENT}
            data-ad-slot={AD_SLOTS.HORIZONTAL}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}
      </div>
    </div>
  );
}
