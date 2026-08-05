"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface GoogleAdProps {
  client?: string;
  slot: string;
  format?: string;
  layout?: string;
  layoutKey?: string;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function GoogleAd({
  client = "ca-pub-1328083083403070",
  slot,
  format = "auto",
  layout,
  layoutKey,
  responsive = true,
  className = "",
  style = { display: "block" },
}: GoogleAdProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    try {
      if (adRef.current && !adRef.current.hasAttribute("data-adsbygoogle-status")) {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("Error initializing Google AdSense:", err);
    }
  }, [pathname, slot]); // Re-initialize if slot or route changes

  return (
    <div className={`google-ad-container ${className}`} style={{ minHeight: "90px", overflow: "hidden" }}>
      <ins
        ref={adRef}
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
