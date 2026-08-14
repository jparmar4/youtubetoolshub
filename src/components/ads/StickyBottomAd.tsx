"use client";

import { useState, useEffect } from "react";
import GoogleAd from "./GoogleAd";
import { AD_SLOTS } from "@/lib/adsense";
import { FaTimes } from "react-icons/fa";

export default function StickyBottomAd() {
  const [closed, setClosed] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDismissed = sessionStorage.getItem("bottomAdDismissed");
    if (!isDismissed) {
      setClosed(false);
    }
  }, []);

  const handleDismiss = () => {
    setClosed(true);
    try {
      sessionStorage.setItem("bottomAdDismissed", "true");
    } catch {
      /* ignore */
    }
  };

  if (!mounted || closed) return null;

  return (
    <div
      role="complementary"
      aria-label="Advertisement"
      className="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center justify-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] py-1 px-2 transition-all duration-300"
    >
      <div className="relative w-full max-w-4xl flex items-center justify-center min-h-[50px] sm:min-h-[90px]">
        {/* Ad Tag & Close Button */}
        <div className="absolute -top-6 right-2 flex items-center gap-2">
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-white/80 dark:bg-slate-800/80 px-2 py-0.5 rounded-t border border-b-0 border-slate-200 dark:border-slate-700">
            Ad
          </span>
          <button
            onClick={handleDismiss}
            aria-label="Close Advertisement"
            className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 text-[10px] transition-colors shadow-sm"
          >
            <FaTimes />
          </button>
        </div>

        {/* AdSense Unit */}
        <div className="w-full flex justify-center overflow-hidden">
          <GoogleAd
            slot={AD_SLOTS.BOTTOM_STICKY}
            format="auto"
            responsive
            lazy={false}
            className="w-full text-center"
            style={{ display: "block", maxHeight: "100px" }}
          />
        </div>
      </div>
    </div>
  );
}
