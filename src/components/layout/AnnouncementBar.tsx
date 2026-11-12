"use client";

import { useSyncExternalStore, memo, useCallback } from "react";
import Link from "next/link";
import { FaTimes, FaArrowRight } from "react-icons/fa";
import { toolMeta } from "@/config/tool-meta";
import { countryCPMData } from "@/lib/cpm-data";

const DISMISS_KEY = "yt_announcement_2026_dismissed";
const DISMISS_EVENT = "yt_announcement_dismissed";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(DISMISS_EVENT, callback);
  return () => {
    window.removeEventListener(DISMISS_EVENT, callback);
  };
}

function getSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(DISMISS_KEY) !== "true";
  } catch {
    return true;
  }
}

function getServerSnapshot(): boolean {
  return true;
}

function AnnouncementBar() {
  const isVisible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleDismiss = useCallback(() => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "true");
      window.dispatchEvent(new CustomEvent(DISMISS_EVENT));
    } catch {
      /* ignore */
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-slate-950 text-white text-xs py-1.5 px-3 sm:px-6 border-b border-white/10 relative z-50 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-purple-900/35 via-fuchsia-900/20 to-emerald-900/30" />
      <div className="relative max-w-7xl mx-auto flex items-center justify-between gap-2 min-w-0">
        <div className="flex-1 min-w-0 flex items-center justify-center gap-2 sm:gap-3 text-center">
          <span className="hidden sm:inline-flex shrink-0 items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-bold text-[11px] tracking-wide border border-emerald-400/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            2026 Suite
          </span>

          <span className="hidden md:inline font-medium text-slate-200 truncate">
            {toolMeta.length} Free YouTube Creator Tools · HD Thumbnail Studio, 4,000 Watch Hours &amp; {countryCPMData.length}-Country CPM Data
          </span>
          <span className="md:hidden font-medium text-slate-200 truncate text-[11px]">
            {toolMeta.length} Free YouTube Tools · 2026 Suite
          </span>

          <Link
            href="/tools/youtube-watch-hours-calculator"
            className="shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white font-semibold text-[11px] border border-white/15 transition-colors whitespace-nowrap"
          >
            <span className="hidden sm:inline">Watch Hours Planner</span>
            <span className="sm:hidden">Explore</span>
            <FaArrowRight className="w-2.5 h-2.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="shrink-0 p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          aria-label="Dismiss announcement"
        >
          <FaTimes className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export default memo(AnnouncementBar);
