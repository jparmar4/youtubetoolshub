"use client";

import { useState, useEffect, useRef } from "react";
import { AD_CLIENT, AD_SLOTS } from "@/lib/adsense";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

/**
 * BottomStickyAd — Fixed bottom anchor ad
 *
 * Policy / UX notes:
 * - No custom "Close Ad" overlay or dismissal UI is rendered by this component.
 * - The ad is labeled "Advertisement" and avoids accidental-click risk by keeping
 *   adequate padding around the ad area.
 *
 * If you want a dismissible anchor, use an AdSense-supported anchor format/UI,
 * not a custom overlay on top of an ad slot.
 */
export default function BottomStickyAd() {
  const [isVisible, setIsVisible] = useState(false);
  const adRef = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show ad after a short delay AND after user has scrolled at least once
    // This helps avoid rendering an anchor immediately on load.
    let scrollTriggered = false;
    let timerDone = false;

    const tryShow = () => {
      if (scrollTriggered && timerDone) {
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
  }, []);

  // Initialize ad when visible
  useEffect(() => {
    if (!isVisible || adRef.current) return;

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
                    // Hide the sticky container if AdSense returns no fill
                    setIsVisible(false);
                    observer.disconnect();
                  }
                }
              });
            });

            observer.observe(insElement, {
              attributes: true,
              attributeFilter: ["data-adsbygoogle-status"],
            });

            // Backup timer
            setTimeout(() => {
              const status = insElement.getAttribute("data-adsbygoogle-status");
              const adContent = insElement.innerHTML.trim();
              if (
                status === "unfilled" ||
                (status === "done" && adContent === "")
              ) {
                // Hide the sticky container if AdSense returns no fill / empty render
                setIsVisible(false);
                observer.disconnect();
              }
            }, 3000);
          }
        }
      } catch (error) {
        console.error("BottomStickyAd: AdSense initialization error:", error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!isVisible) return null;

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
        {/* "Ad" label for AdSense policy compliance */}
        <div className="absolute top-0.5 left-2 text-[8px] text-slate-400 uppercase tracking-widest pointer-events-none select-none">
          Advertisement
        </div>

        {/* Ad unit container — keep padding to reduce accidental clicks */}
        <div className="w-full flex items-center justify-center px-3 py-2 min-h-[50px] md:min-h-[90px] max-h-[100px] overflow-hidden">
          <ins
            className="adsbygoogle"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              maxHeight: "90px",
            }}
            data-ad-client={AD_CLIENT}
            data-ad-slot={AD_SLOTS.BOTTOM_STICKY}
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
