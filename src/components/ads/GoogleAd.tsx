"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { initializeAd, initializeAdOnView, resetAd, AD_CLIENT } from "@/lib/adsense";

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

  // Stable ad ID based on slot + pathname to avoid collisions
  const adId = `${slot}-${pathname}`;

  useEffect(() => {
    // Reset the ad state for this placement so it can re-initialize on route change
    resetAd(adId);

    const adOptions = {
      delay: 100,
      maxWait: 12000,
      sizeRetries: 10,
      onError: (err: unknown) => {
        console.error(`[GoogleAd] Failed to load ad "${adId}":`, err);
      },
    };

    // Lazy ads use IntersectionObserver — only load when 200px from viewport.
    // This dramatically improves viewability metrics which increases CPM/RPM.
    const cleanup = lazy
      ? initializeAdOnView(containerRef.current, adId, {
          rootMargin: "200px",
          adOptions,
        })
      : initializeAd(containerRef.current, adId, adOptions);

    return cleanup;
  }, [pathname, slot, adId, lazy]);

  return (
    <div
      ref={containerRef}
      className={`google-ad-container ${className}`}
      style={{ minHeight: "90px", overflow: "hidden" }}
    >
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        {...(format ? { "data-ad-format": format } : {})}
        {...(layout ? { "data-ad-layout": layout } : {})}
        {...(layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
        {...(responsive ? { "data-full-width-responsive": "true" } : {})}
      />
    </div>
  );
}

