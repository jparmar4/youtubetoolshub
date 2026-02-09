"use client";

import { useEffect, useRef, useState } from "react";
import { AD_CLIENT, AD_SLOTS } from "@/lib/adsense";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

let multiplexAdCounter = 0;

export default function MultiplexAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const adInitialized = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [adId] = useState(() => "multiplex-ad-" + String(++multiplexAdCounter));
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [hasError, setHasError] = useState(false);

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
          rootMargin: "400px 0px",
          threshold: 0,
        },
      );

      observerRef.current.observe(container);
    } else {
      setIsNearViewport(true);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isNearViewport || adInitialized.current || hasError) return;

    const container = containerRef.current;
    if (!container) return;

    const timer = setTimeout(() => {
      try {
        const insElement = container.querySelector("ins.adsbygoogle");

        if (!insElement) {
          return;
        }

        const status = insElement.getAttribute("data-adsbygoogle-status");
        if (status === "done" || status === "loaded") {
          adInitialized.current = true;
          return;
        }

        const rect = insElement.getBoundingClientRect();
        if (rect.width === 0) {
          requestAnimationFrame(() => {
            if (!adInitialized.current) {
              try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                adInitialized.current = true;
              } catch (retryErr) {
                console.error("[MultiplexAd] Retry failed:", retryErr);
                setHasError(true);
              }
            }
          });
          return;
        }

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

        // Backup timer
        setTimeout(() => {
          const status = insElement.getAttribute("data-adsbygoogle-status");
          const adContent = insElement.innerHTML.trim();
          if (
            status === "unfilled" ||
            (status === "done" && adContent === "")
          ) {
            setHasError(true);
            observer.disconnect();
          }
        }, 3000);
      } catch (error) {
        console.error("[MultiplexAd] AdSense error:", error);
        setHasError(true);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [isNearViewport, hasError]);

  if (hasError) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="w-full py-8"
      id={adId}
      role="complementary"
      aria-label="Sponsored content"
    >
      <div className="text-[10px] text-slate-400 mb-2 uppercase tracking-wide font-medium text-center select-none">
        Sponsored Links
      </div>

      <div
        className={
          "w-full flex items-center justify-center rounded-xl transition-all duration-300 overflow-hidden " +
          (isNearViewport
            ? "min-h-[250px] md:min-h-[300px] bg-slate-50/20"
            : "min-h-[100px]")
        }
      >
        {isNearViewport && (
          <ins
            className="adsbygoogle block"
            style={{
              display: "block",
              width: "100%",
              minHeight: "250px",
            }}
            data-ad-format="autorelaxed"
            data-ad-client={AD_CLIENT}
            data-ad-slot={AD_SLOTS.MULTIPLEX}
          />
        )}
      </div>
    </div>
  );
}
