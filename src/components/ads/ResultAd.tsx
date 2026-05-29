"use client";

import { useEffect, useRef, useState } from "react";

interface ResultAdProps {
  visible?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

export default function ResultAd({ visible = false, className = "" }: ResultAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [adFailed, setAdFailed] = useState(false);

  useEffect(() => {
    if (!visible || adLoaded) return;

    // Delay ad appearance for better UX
    const timer = setTimeout(() => {
      setShowAd(true);

      try {
        const adEl = adRef.current?.querySelector("ins.adsbygoogle");
        if (adEl && !adEl.getAttribute("data-ad-status")) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setAdLoaded(true);
        }
      } catch {
        // AdSense not loaded or blocked
      }

      // Check if ad actually filled after a delay
      const checkTimer = setTimeout(() => {
        const adEl = adRef.current?.querySelector("ins.adsbygoogle");
        if (adEl) {
          const status = adEl.getAttribute("data-ad-status");
          if (status === "unfilled") {
            setAdFailed(true);
          }
        }
      }, 3000);

      return () => clearTimeout(checkTimer);
    }, 800);

    return () => clearTimeout(timer);
  }, [visible, adLoaded]);

  if (!visible || !showAd || adFailed) return null;

  return (
    <div
      className={`w-full my-6 transition-opacity duration-500 ${showAd ? "opacity-100" : "opacity-0"} ${className}`}
    >
      {/* Separator */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        <span className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-medium">
          Sponsored
        </span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Ad Container */}
      <div
        ref={adRef}
        className="flex items-center justify-center min-h-[100px] bg-gray-50 dark:bg-gray-800/30 rounded-xl overflow-hidden"
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1328083083403070"
          data-ad-slot=""
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
