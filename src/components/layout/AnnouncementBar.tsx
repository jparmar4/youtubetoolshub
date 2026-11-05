"use client";

import { useSyncExternalStore, memo, useCallback } from "react";
import Link from "next/link";
import { FaTimes, FaArrowRight } from "react-icons/fa";

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
  return false; // never render on server to avoid hydration mismatch
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
    <div className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 text-white text-xs py-2 px-4 border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center truncate">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px] tracking-wide border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            2026 UPDATE
          </span>

          <span className="hidden md:inline font-medium text-slate-200">
            44 Free YouTube Creator Tools • 4,000 Watch Hours Planner &amp; Tier-1 CPM Matrices
          </span>
          <span className="md:hidden font-medium text-slate-200 truncate">
            44 Free Creator Tools • 2026
          </span>

          <Link
            href="/tools/youtube-watch-hours-calculator"
            className="inline-flex items-center gap-1 text-purple-300 hover:text-white font-bold underline decoration-purple-400/50 hover:decoration-white transition-colors ml-1 flex-shrink-0"
          >
            <span>Try Watch Hours Planner</span>
            <FaArrowRight className="w-2.5 h-2.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors flex-shrink-0"
          aria-label="Dismiss banner"
        >
          <FaTimes className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export default memo(AnnouncementBar);
