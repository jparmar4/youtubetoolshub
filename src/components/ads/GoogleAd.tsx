"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { initializeAd, resetAd, AD_CLIENT } from "@/lib/adsense";

interface GoogleAdProps {
  client?: string;
  slot: string;
  format?: string;
  layout?: string;
  layoutKey?: string;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** Load ad only when near viewport (default: true). Set false for above-the-fold ads. */
  lazy?: boolean;
}

export default function GoogleAd({
  client = AD_CLIENT,
  slot,
  format = "auto",
  layout,
  layoutKey,
  responsive = true,
  className = "",
  style = { display: "block" },
  lazy = true,
}: GoogleAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const instanceId = useId();
  // Do not add a lazy unit's <ins> to the page until it is about to be shown.
  // AdSense's documented push({}) processes the next available tag in document
  // order. Rendering every below-the-fold tag immediately meant the sidebar's
  // push could be consumed by an unseen in-article unit instead.
  const [isActive, setIsActive] = useState(!lazy);

  // Unique per rendered position so two placements that reuse an AdSense slot
  // on the same route do not suppress one another during SPA navigation.
  const adId = `${slot}-${pathname}-${instanceId}`;

  useEffect(() => {
    if (!lazy || isActive) return;

    const container = containerRef.current;
    if (!container) return;

    if (typeof IntersectionObserver === "undefined") {
      const timer = setTimeout(() => setIsActive(true), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsActive(true);
        observer.disconnect();
      },
      { rootMargin: "800px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isActive, lazy]);

  useEffect(() => {
    if (!isActive) return;

    resetAd(adId);

    const adOptions = {
      delay: 100,
      // Ad networks can arrive more slowly than the app bundle on cold mobile
      // connections. Keep waiting without globally disabling later ad units.
      maxWait: 30000,
      sizeRetries: 15,
      onError: (err: unknown) => {
        console.error(`[GoogleAd] Failed to load ad "${adId}":`, err);
      },
    };

    const cleanup = initializeAd(containerRef.current, adId, adOptions);

    return cleanup;
  }, [pathname, slot, adId, isActive]);

  return (
    <div
      ref={containerRef}
      className={`google-ad-container w-full min-w-0 min-h-[90px] ${className}`}
    >
      {isActive && (
        /*
          key remounts <ins> on route change. Reusing a filled ins leaves
          data-adsbygoogle-status="done" and the next page shows a blank box.
        */
        <ins
          key={adId}
          className="adsbygoogle"
          style={style}
          data-ad-client={client}
          data-ad-slot={slot}
          {...(format ? { "data-ad-format": format } : {})}
          {...(layout ? { "data-ad-layout": layout } : {})}
          {...(layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
          {...(responsive ? { "data-full-width-responsive": "true" } : {})}
        />
      )}
    </div>
  );
}
