"use client";

import { useEffect, useRef, useState } from "react";
import { AD_CLIENT, AD_SLOTS } from "@/lib/adsense";

/**
 * InArticleAd — Native in-article ad that blends with content
 *
 * KEY OPTIMIZATIONS:
 * 1. Lazy loading via IntersectionObserver — ad only initializes when
 *    it's about to enter the viewport (200px before). This:
 *    - Improves Core Web Vitals (less CLS, faster LCP)
 *    - Increases viewability score → AdSense serves higher-paying ads
 *    - Reduces wasted impressions on ads users never see
 *
 * 2. Proper initialization check — prevents the common double-push error
 *    that causes "adsbygoogle.push() error: All ins elements ... already have ads"
 *
 * 3. Unique ad instance ID per mount — prevents conflicts when multiple
 *    InArticleAd components are on the same page (e.g., between content sections)
 *
 * 4. Minimum height container — prevents layout shift (CLS) when ad loads,
 *    which is a Core Web Vitals ranking factor
 *
 * Revenue impact: In-article native ads typically have 20-40% higher CTR than
 * standard display ads because they blend with content. Lazy loading increases
 * viewability from ~40% to ~80%, which directly increases CPM rates.
 */

// Global counter to ensure unique IDs across multiple instances
let instanceCounter = 0;

export default function InArticleAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const adInitialized = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [adId] = useState(() => `in-article-ad-${++instanceCounter}`);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || adInitialized.current) return;

    // Use IntersectionObserver to lazy-load the ad
    // rootMargin: "200px" means we start loading 200px BEFORE it enters the viewport
    // This gives the ad time to load before the user scrolls to it
    if ("IntersectionObserver" in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry && entry.isIntersecting) {
            setIsVisible(true);
            // Stop observing once triggered — ad only needs to load once
            observerRef.current?.disconnect();
          }
        },
        {
          rootMargin: "200px 0px",
          threshold: 0,
        },
      );

      observerRef.current.observe(container);
    } else {
      // Fallback for browsers without IntersectionObserver
      setIsVisible(true);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Initialize ad when it becomes visible
  useEffect(() => {
    if (!isVisible || adInitialized.current || hasError) return;

    const container = containerRef.current;
    if (!container) return;

    // Delay slightly to ensure the <ins> element is in the DOM after React render
    const timer = setTimeout(() => {
      try {
        const insElement = container.querySelector("ins.adsbygoogle");

        if (!insElement) {
          console.warn(`[InArticleAd] No <ins> element found for ${adId}`);
          return;
        }

        // Check if AdSense already processed this element
        const status = insElement.getAttribute("data-adsbygoogle-status");
        if (status === "done" || status === "loaded") {
          adInitialized.current = true;
          return;
        }

        // Check if the element has dimensions (AdSense won't serve to 0-width elements)
        const rect = insElement.getBoundingClientRect();
        if (rect.width === 0) {
          // Retry after a frame when element might be laid out
          requestAnimationFrame(() => {
            if (!adInitialized.current) {
              try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                adInitialized.current = true;
              } catch (err) {
                console.error(`[InArticleAd] Retry failed for ${adId}:`, err);
                setHasError(true);
              }
            }
          });
          return;
        }

        // Push the ad
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adInitialized.current = true;

        // Watch for unfilled ads and hide container if no ad served
        setTimeout(() => {
          const status = insElement.getAttribute("data-adsbygoogle-status");
          const adContent = insElement.innerHTML.trim();
          if (status === "unfilled" || (status === "done" && adContent === "")) {
            setHasError(true);
          }
        }, 2000);
      } catch (error) {
        console.error(`[InArticleAd] AdSense error for ${adId}:`, error);
        setHasError(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isVisible, adId, hasError]);

  // If there was an error, collapse the ad space gracefully
  if (hasError) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="w-full my-8 flex flex-col items-center"
      id={adId}
      role="complementary"
      aria-label="Advertisement"
    >
      {/* Small "Ad" label for AdSense policy compliance */}
      <div className="text-[10px] text-slate-300 mb-1 uppercase tracking-wider select-none">
        Advertisement
      </div>

      {/* Ad container with minimum height to prevent CLS (layout shift) */}
      <div
        className={`w-full flex items-center justify-center bg-slate-50/50 rounded-lg overflow-hidden transition-all duration-300 ${isVisible ? "min-h-[100px]" : "min-h-[50px]"
          }`}
      >
        {/*
          Only render the <ins> element when the container is near the viewport.
          This prevents AdSense from counting an impression on an ad the user
          never sees, which would lower your viewability score and RPM.
        */}
        {isVisible && (
          <ins
            className="adsbygoogle"
            style={{
              display: "block",
              textAlign: "center",
              width: "100%",
            }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client={AD_CLIENT}
            data-ad-slot={AD_SLOTS.IN_ARTICLE}
          />
        )}
      </div>
    </div>
  );
}

// TypeScript global augmentation for adsbygoogle
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}
