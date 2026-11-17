"use client";

import { useMemo, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaArrowRight,
  FaAt,
  FaClock,
  FaGlobeAmericas,
  FaImage,
  FaLightbulb,
  FaSearch,
  FaTimes,
  FaYoutube,
} from "react-icons/fa";
import { resolveOmniInputRoute } from "@/lib/omni-routing";

const QUICK_TRIGGER_CHIPS = [
  {
    label: "Download 4K Thumbnail",
    href: "/tools/youtube-thumbnail-downloader",
    icon: FaImage,
    accent: "text-pink-600",
  },
  {
    label: "Video X-Ray Audit",
    href: "/watch",
    icon: FaYoutube,
    accent: "text-red-600",
  },
  {
    label: "52-Country CPMs",
    href: "/resources/youtube-cpm-rates",
    icon: FaGlobeAmericas,
    accent: "text-emerald-600",
  },
  {
    label: "4,000 Watch Hours",
    href: "/tools/youtube-watch-hours-calculator",
    icon: FaClock,
    accent: "text-purple-600",
  },
] as const;

export default function OmniInputCommandBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const resolution = useMemo(() => resolveOmniInputRoute(query), [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resolution.mode === "empty" || !resolution.destination) {
      inputRef.current?.focus();
      return;
    }
    router.push(resolution.destination);
  };

  const buttonText =
    resolution.mode === "video"
      ? "Audit Video"
      : resolution.mode === "channel"
        ? "Scan Channel"
        : resolution.mode === "topic"
          ? "Generate Ideas"
          : "Launch Studio";

  return (
    <div className="max-w-3xl mx-auto mb-8">
      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="YouTube URL, channel handle, or video topic command bar"
        className="relative rounded-3xl p-2 bg-white/95 backdrop-blur-xl border border-purple-200/90 shadow-[0_20px_50px_-12px_rgba(124,58,237,0.22),0_4px_12px_-2px_rgba(15,23,42,0.06),inset_0_1px_0_0_#fff] focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-500/15 transition-all"
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative flex-1 flex items-center min-w-0">
            <label htmlFor="hero-omni-input" className="sr-only">
              Paste a YouTube Video URL, @ChannelHandle, or Video Topic
            </label>
            <span
              aria-hidden="true"
              className="pl-3.5 pr-2 text-purple-600 shrink-0"
            >
              {resolution.mode === "video" ? (
                <FaYoutube className="w-5 h-5 text-red-600" />
              ) : resolution.mode === "channel" ? (
                <FaAt className="w-4 h-4 text-sky-600" />
              ) : resolution.mode === "topic" ? (
                <FaLightbulb className="w-4 h-4 text-amber-500" />
              ) : (
                <FaSearch className="w-4 h-4 text-purple-600" />
              )}
            </span>
            <input
              id="hero-omni-input"
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Paste a YouTube Video URL, @ChannelHandle, or Video Topic..."
              autoComplete="off"
              spellCheck={false}
              className="w-full h-12 sm:h-13 bg-transparent text-slate-900 text-sm sm:text-base font-medium placeholder:text-slate-500 focus:outline-none pr-8 min-w-0"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear input"
                className="cursor-pointer absolute right-2 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <FaTimes className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="btn-3d-primary cursor-pointer h-12 sm:h-13 px-6 sm:px-7 rounded-2xl font-black text-sm sm:text-base inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          >
            <span>{buttonText}</span>
            <FaArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        {/* Live intent indicator (fixed height to avoid layout shift) */}
        <div className="min-h-6 px-3.5 pt-1.5 pb-1 flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold text-slate-500 border-t border-slate-100/90 mt-1">
          {resolution.mode === "empty" ? (
            <span>
              Smart routing: Video/Shorts URL → X-Ray Audit · @Handle → Outlier Scanner · Topic → Video Ideas
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-purple-700 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              <span>
                Detected {resolution.label}:{" "}
                <code className="font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                  {resolution.extracted}
                </code>
              </span>
            </span>
          )}
          <span className="hidden sm:inline text-slate-400 font-medium">
            Press Enter ↵
          </span>
        </div>
      </form>

      {/* 4 Quick-Trigger Chips */}
      <div className="mt-4 flex flex-wrap justify-center gap-2.5 text-xs sm:text-sm font-bold">
        {QUICK_TRIGGER_CHIPS.map((chip) => {
          const ChipIcon = chip.icon;
          return (
            <Link
              key={chip.label}
              href={chip.href}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 border border-slate-200/90 text-slate-800 hover:border-purple-400 hover:text-purple-700 shadow-2xs transition-all hover:-translate-y-0.5"
            >
              <ChipIcon className={`w-3.5 h-3.5 ${chip.accent}`} aria-hidden="true" />
              <span>{chip.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
