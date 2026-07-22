"use client";

import { AFFILIATE_TOOLS, DEFAULT_AFFILIATE_DISCLOSURE, type AffiliateTool } from "@/config/affiliates";
import { FaExternalLinkAlt, FaRocket, FaStar } from "react-icons/fa";

interface AffiliateBannerProps {
  toolId?: keyof typeof AFFILIATE_TOOLS;
  customTool?: AffiliateTool;
  variant?: "card" | "compact" | "inArticle";
}

export default function AffiliateBanner({
  toolId = "vidiq",
  customTool,
  variant = "card",
}: AffiliateBannerProps) {
  const tool = customTool || AFFILIATE_TOOLS[toolId] || AFFILIATE_TOOLS.vidiq;

  if (variant === "compact") {
    return (
      <div className="my-4 rounded-xl border border-purple-200/80 bg-gradient-to-r from-purple-50/80 via-white to-pink-50/80 p-4 dark:border-purple-900/50 dark:from-slate-900 dark:via-purple-950/20 dark:to-slate-900 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${tool.logoBg} text-white font-bold text-lg shadow-sm`}
            >
              {tool.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  {tool.name}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${tool.badgeBg}`}
                >
                  {tool.badge}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                {tool.tagline}
              </p>
            </div>
          </div>
          <a
            href={tool.link}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 hover:bg-purple-700 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.02]"
          >
            <span>{tool.ctaText}</span>
            <FaExternalLinkAlt className="text-[10px]" />
          </a>
        </div>
      </div>
    );
  }

  if (variant === "inArticle") {
    return (
      <div className="my-8 rounded-2xl border border-amber-200/70 bg-amber-50/40 p-6 dark:border-amber-900/40 dark:bg-amber-950/10 shadow-sm">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
          <FaStar className="text-amber-500" />
          <span>Recommended Creator Tool</span>
        </div>
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">
          {tool.name} — {tool.tagline}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
          {tool.description}
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <a
            href={tool.link}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-6 py-3 font-bold text-white shadow-md transition-all hover:shadow-lg"
          >
            <FaRocket className="text-amber-300" />
            <span>{tool.ctaText}</span>
          </a>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 italic text-center sm:text-right">
            {DEFAULT_AFFILIATE_DISCLOSURE}
          </span>
        </div>
      </div>
    );
  }

  // Default card variant
  return (
    <div className="my-6 rounded-2xl border border-purple-100 bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/30 p-6 dark:border-slate-800 dark:from-slate-900 dark:via-purple-950/20 dark:to-slate-900 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.logoBg} text-white font-extrabold text-xl shadow-md`}
          >
            {tool.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
              {tool.name}
            </h4>
            <span
              className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${tool.badgeBg}`}
            >
              {tool.badge}
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        {tool.tagline}
      </p>
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        {tool.description}
      </p>

      <div className="flex flex-col gap-2">
        <a
          href={tool.link}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-purple-700"
        >
          <span>{tool.ctaText}</span>
          <FaExternalLinkAlt className="text-xs" />
        </a>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center italic mt-1">
          {DEFAULT_AFFILIATE_DISCLOSURE}
        </p>
      </div>
    </div>
  );
}
