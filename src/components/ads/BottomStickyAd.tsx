"use client";

import { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

/**
 * BottomStickyAd — Fixed bottom anchor ad (high viewability = high RPM)
 *
 * FIXES from previous version:
 * 1. Reduced delay from 3s to 1s — faster appearance = more impressions
 * 2. Added proper ad initialization check to prevent double-push errors
 * 3. Improved close button positioning and accessibility
 * 4. Added page engagement check — only show after user has scrolled
 *    (indicates engagement, better ad quality score)
 * 5. Persists close state only for current page, not entire session
 *    (user closing on one page shouldn't kill revenue on all pages)
 * 6. Better mobile spacing to avoid accidental clicks (policy violation risk)
 *
 * Revenue impact: Anchor/sticky ads typically generate 15-25% of total AdSense revenue.
 * Showing them faster with better viewability can increase RPM by 10-20%.
 */
export default function BottomStickyAd() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const adRef = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show ad after a short delay AND after user has scrolled at least once
    // This ensures the user is engaged (better ad quality + viewability score)
    let scrollTriggered = false;
    let timerDone = false;

    const tryShow = () => {
      if (scrollTriggered && timerDone && !isClosed) {
        setIsVisible(true);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 150) {
        scrollTriggered = true;
        tryShow();
        // Remove listener after first trigger
        window.removeEventListener("scroll", handleScrollPassive);
      }
    };

    // Wrap with passive option
    const handleScrollPassive = handleScroll;
    window.addEventListener("scroll", handleScrollPassive, { passive: true });

    // Minimum 1 second delay (reduced from 3s)
    const timer = setTimeout(() => {
      timerDone = true;
      tryShow();
    }, 1000);

    // Fallback: if user doesn't scroll within 5s, show anyway
    // (they might be reading above-the-fold content with tool already visible)
    const fallbackTimer = setTimeout(() => {
      scrollTriggered = true;
      timerDone = true;
      tryShow();
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
      window.removeEventListener("scroll", handleScrollPassive);
    };
  }, [isClosed]);

  // Initialize ad when visible
  useEffect(() => {
    if (!isVisible || isClosed || adRef.current) return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      try {
        if (containerRef.current) {
          const insElement =
            containerRef.current.querySelector("ins.adsbygoogle");

          // Only push if the ins element exists and hasn't been initialized
          if (
            insElement &&
            !insElement.getAttribute("data-adsbygoogle-status")
          ) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            adRef.current = true;
          }
        }
      } catch (error) {
        console.error("BottomStickyAd: AdSense initialization error:", error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isVisible, isClosed]);

  // Don't render if closed
  if (!isVisible || isClosed) return null;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-0 w-full z-50"
      role="complementary"
      aria-label="Advertisement"
      style={{
        // Animate in from bottom
        animation: "slideUpFade 0.3s ease-out forwards",
      }}
    >
      {/* Inline keyframes for the slide-up animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes slideUpFade {
              from { transform: translateY(100%); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `,
        }}
      />

      {/* Ad Container */}
      <div className="relative w-full bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        {/* Close Button — positioned clearly above the ad to prevent accidental clicks */}
        <div className="absolute -top-9 right-3 z-10">
          <button
            onClick={() => setIsClosed(true)}
            className="flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-700 text-white rounded-full pl-2.5 pr-2 py-1.5 shadow-lg transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
            aria-label="Close advertisement"
          >
            <span className="text-[10px] uppercase font-bold tracking-wider leading-none">
              Close Ad
            </span>
            <FaTimes className="text-xs" />
          </button>
        </div>

        {/* "Ad" label for AdSense policy compliance */}
        <div className="absolute top-0.5 left-2 text-[8px] text-slate-400 uppercase tracking-widest pointer-events-none select-none">
          Advertisement
        </div>

        {/* Ad unit container — proper sizing for anchor format */}
        <div className="w-full flex items-center justify-center px-2 py-1.5 min-h-[50px] md:min-h-[90px] max-h-[100px] overflow-hidden">
          <ins
            className="adsbygoogle"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              maxHeight: "90px",
            }}
            data-ad-client="ca-pub-1328083083403070"
            data-ad-slot="5848325027"
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          />
        </div>

        {/* Safe area padding for iOS devices with home indicator */}
        <div className="h-[env(safe-area-inset-bottom,0px)]" />
      </div>
    </div>
  );
}
