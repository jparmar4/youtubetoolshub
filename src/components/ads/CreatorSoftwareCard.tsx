"use client";

import { useState } from "react";
import { FaRocket, FaExternalLinkAlt, FaStar, FaBolt, FaCrown } from "react-icons/fa";
import { AFFILIATE_TOOLS, DEFAULT_AFFILIATE_DISCLOSURE, type AffiliateTool } from "@/config/affiliates";

interface CreatorSoftwareCardProps {
  defaultCategory?: "video" | "audio" | "seo";
  className?: string;
}

const CATEGORY_MAP: Record<"video" | "audio" | "seo", string[]> = {
  video: ["opusclip", "tubebuddy", "descript"],
  audio: ["epidemic", "elevenlabs", "artlist"],
  seo: ["vidiq", "tubebuddy", "opusclip"],
};

export default function CreatorSoftwareCard({
  defaultCategory = "video",
  className = "",
}: CreatorSoftwareCardProps) {
  const [activeCategory, setActiveCategory] = useState<"video" | "audio" | "seo">(defaultCategory);

  const toolsForCategory: AffiliateTool[] = CATEGORY_MAP[activeCategory]
    .map((id) => AFFILIATE_TOOLS[id])
    .filter(Boolean);

  return (
    <div
      className={`my-8 overflow-hidden rounded-2xl border border-purple-200/90 bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/40 p-5 sm:p-6 dark:border-purple-900/50 dark:from-slate-900 dark:via-purple-950/20 dark:to-slate-900 shadow-md ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-100 pb-4 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
            <FaCrown className="text-amber-500" />
            <span>Essential Creator Stack (2026 Tested)</span>
          </div>
          <h3 className="mt-1 text-base sm:text-lg font-black text-slate-900 dark:text-white">
            High-ROI Creator Tools to Speed Up Your Production
          </h3>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 rounded-xl bg-purple-100/60 p-1 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => setActiveCategory("video")}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
              activeCategory === "video"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            Video &amp; Shorts
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("audio")}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
              activeCategory === "audio"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            Audio &amp; Voice
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("seo")}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
              activeCategory === "seo"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            SEO &amp; CTR
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {toolsForCategory.map((tool) => (
          <div
            key={tool.id}
            className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:border-purple-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-800/80"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${tool.logoBg} text-white font-black text-sm shadow-sm`}
                  >
                    {tool.name.charAt(0)}
                  </div>
                  <span className="font-black text-slate-900 dark:text-white text-sm">
                    {tool.name}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${tool.badgeBg}`}
                >
                  {tool.badge}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {tool.tagline}
              </p>
              <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {tool.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60">
              <a
                href={tool.link}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-purple-600 px-3 py-2 text-xs font-bold text-white shadow transition-all hover:bg-purple-700 hover:scale-[1.02]"
              >
                <span>{tool.ctaText}</span>
                <FaExternalLinkAlt className="text-[10px]" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-[11px] text-slate-400 dark:text-slate-500 italic">
        {DEFAULT_AFFILIATE_DISCLOSURE}
      </p>
    </div>
  );
}
