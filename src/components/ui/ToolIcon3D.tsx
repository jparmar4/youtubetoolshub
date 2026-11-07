"use client";

import { ReactNode } from "react";

export type ToolIconSize = "sm" | "md" | "lg" | "xl";

interface ToolIcon3DProps {
  icon: ReactNode;
  slug?: string;
  category?: string;
  size?: ToolIconSize;
  badge?: string;
  className?: string;
}

interface ThemeConfig {
  gradient: string;
  ledgeShadow: string;
  ambientGlow: string;
  badgeText?: string;
  badgeBg?: string;
  accentColor: string;
}

function resolveToolTheme(slug?: string, category?: string): ThemeConfig {
  const s = (slug || "").toLowerCase();
  const c = (category || "").toLowerCase();

  // Specific Flagship & High-Intent Tool Themes
  if (s.includes("thumbnail-downloader")) {
    return {
      gradient: "from-rose-500 via-pink-600 to-fuchsia-600",
      ledgeShadow: "shadow-[0_4px_0_0_#9d174d,0_10px_22px_-4px_rgba(225,29,72,0.45),inset_0_1.5px_0_0_rgba(255,255,255,0.5)]",
      ambientGlow: "bg-rose-500/25",
      badgeText: "4K",
      badgeBg: "from-slate-900 to-rose-950 text-rose-200 border-rose-400/50",
      accentColor: "rose",
    };
  }

  if (s.includes("ai-thumbnail") || s.includes("image-prompt")) {
    return {
      gradient: "from-fuchsia-500 via-purple-600 to-indigo-600",
      ledgeShadow: "shadow-[0_4px_0_0_#6b21a8,0_10px_22px_-4px_rgba(147,51,234,0.45),inset_0_1.5px_0_0_rgba(255,255,255,0.5)]",
      ambientGlow: "bg-fuchsia-500/25",
      badgeText: "AI",
      badgeBg: "from-fuchsia-700 to-purple-900 text-fuchsia-100 border-fuchsia-300/50",
      accentColor: "purple",
    };
  }

  if (s.includes("feed-previewer") || s.includes("banner-resizer") || s.includes("thumbnail-generator")) {
    return {
      gradient: "from-pink-500 via-rose-500 to-orange-500",
      ledgeShadow: "shadow-[0_4px_0_0_#be185d,0_10px_22px_-4px_rgba(244,63,94,0.42),inset_0_1.5px_0_0_rgba(255,255,255,0.5)]",
      ambientGlow: "bg-pink-500/25",
      badgeText: s.includes("feed-previewer") ? "CTR" : "HD",
      badgeBg: "from-rose-700 to-pink-900 text-pink-100 border-pink-300/50",
      accentColor: "pink",
    };
  }

  if (
    s.includes("tax-savings") ||
    s.includes("valuation") ||
    s.includes("brand-pitch")
  ) {
    return {
      gradient: "from-amber-500 via-orange-500 to-emerald-600",
      ledgeShadow: "shadow-[0_4px_0_0_#b45309,0_10px_22px_-4px_rgba(245,158,11,0.45),inset_0_1.5px_0_0_rgba(255,255,255,0.55)]",
      ambientGlow: "bg-amber-500/25",
      badgeText: s.includes("tax") ? "TAX" : "CFO",
      badgeBg: "from-amber-700 to-slate-900 text-amber-100 border-amber-300/50",
      accentColor: "emerald",
    };
  }

  if (
    s.includes("earnings") ||
    s.includes("sponsorship") ||
    s.includes("affiliate") ||
    s.includes("faceless-niche")
  ) {
    return {
      gradient: "from-emerald-500 via-teal-600 to-green-700",
      ledgeShadow: "shadow-[0_4px_0_0_#065f46,0_10px_22px_-4px_rgba(16,185,129,0.45),inset_0_1.5px_0_0_rgba(255,255,255,0.5)]",
      ambientGlow: "bg-emerald-500/25",
      badgeText: "RPM",
      badgeBg: "from-emerald-800 to-slate-900 text-emerald-200 border-emerald-400/50",
      accentColor: "emerald",
    };
  }

  if (s.includes("watch-hours")) {
    return {
      gradient: "from-teal-500 via-cyan-600 to-emerald-600",
      ledgeShadow: "shadow-[0_4px_0_0_#0f766e,0_10px_22px_-4px_rgba(20,184,166,0.45),inset_0_1.5px_0_0_rgba(255,255,255,0.5)]",
      ambientGlow: "bg-teal-500/25",
      badgeText: "YPP",
      badgeBg: "from-teal-800 to-slate-900 text-teal-100 border-teal-300/50",
      accentColor: "teal",
    };
  }

  if (s.includes("transcript") || s.includes("chapters") || s.includes("summarizer")) {
    return {
      gradient: "from-cyan-500 via-sky-600 to-blue-700",
      ledgeShadow: "shadow-[0_4px_0_0_#0369a1,0_10px_22px_-4px_rgba(14,165,233,0.45),inset_0_1.5px_0_0_rgba(255,255,255,0.5)]",
      ambientGlow: "bg-sky-500/25",
      badgeText: s.includes("transcript") ? "SRT" : "NLP",
      badgeBg: "from-sky-800 to-slate-900 text-sky-100 border-sky-300/50",
      accentColor: "sky",
    };
  }

  if (
    s.includes("tag-") ||
    s.includes("hashtag") ||
    s.includes("title-") ||
    s.includes("description") ||
    s.includes("seo-checklist")
  ) {
    return {
      gradient: "from-violet-600 via-purple-600 to-indigo-600",
      ledgeShadow: "shadow-[0_4px_0_0_#4c1d95,0_10px_22px_-4px_rgba(124,58,237,0.45),inset_0_1.5px_0_0_rgba(255,255,255,0.5)]",
      ambientGlow: "bg-violet-500/25",
      badgeText: "SEO",
      badgeBg: "from-violet-800 to-indigo-950 text-violet-100 border-violet-300/50",
      accentColor: "purple",
    };
  }

  // Category Fallbacks
  if (c === "thumbnail-media") {
    return {
      gradient: "from-rose-500 via-pink-600 to-purple-600",
      ledgeShadow: "shadow-[0_4px_0_0_#9d174d,0_10px_22px_-4px_rgba(236,72,153,0.45),inset_0_1.5px_0_0_rgba(255,255,255,0.5)]",
      ambientGlow: "bg-pink-500/25",
      accentColor: "pink",
    };
  }

  if (c === "analytics-earnings") {
    return {
      gradient: "from-emerald-500 via-teal-600 to-cyan-700",
      ledgeShadow: "shadow-[0_4px_0_0_#047857,0_10px_22px_-4px_rgba(16,185,129,0.45),inset_0_1.5px_0_0_rgba(255,255,255,0.5)]",
      ambientGlow: "bg-emerald-500/25",
      accentColor: "emerald",
    };
  }

  if (c === "channel-growth" || s.includes("script") || s.includes("ideas") || s.includes("calendar") || s.includes("audit") || s.includes("repurpos")) {
    return {
      gradient: "from-sky-500 via-blue-600 to-indigo-600",
      ledgeShadow: "shadow-[0_4px_0_0_#1e40af,0_10px_22px_-4px_rgba(37,99,235,0.45),inset_0_1.5px_0_0_rgba(255,255,255,0.5)]",
      ambientGlow: "bg-blue-500/25",
      accentColor: "blue",
    };
  }

  if (c === "utility-fun" || s.includes("giveaway") || s.includes("poll") || s.includes("playlist") || s.includes("comment")) {
    return {
      gradient: "from-amber-500 via-orange-500 to-rose-600",
      ledgeShadow: "shadow-[0_4px_0_0_#c2410c,0_10px_22px_-4px_rgba(249,115,22,0.45),inset_0_1.5px_0_0_rgba(255,255,255,0.5)]",
      ambientGlow: "bg-orange-500/25",
      accentColor: "amber",
    };
  }

  // Default Royal Purple Studio 3D Cube
  return {
    gradient: "from-purple-600 via-fuchsia-600 to-indigo-600",
    ledgeShadow: "shadow-[0_4px_0_0_#581c87,0_10px_22px_-4px_rgba(124,58,237,0.45),inset_0_1.5px_0_0_rgba(255,255,255,0.5)]",
    ambientGlow: "bg-purple-500/25",
    accentColor: "purple",
  };
}

const SIZE_CLASSES: Record<
  ToolIconSize,
  { wrapper: string; innerRing: string; iconText: string; badge: string }
> = {
  sm: {
    wrapper: "w-10 h-10 rounded-xl",
    innerRing: "inset-1 rounded-lg",
    iconText: "text-base",
    badge: "hidden",
  },
  md: {
    wrapper: "w-13 h-13 rounded-2xl",
    innerRing: "inset-1.5 rounded-xl",
    iconText: "text-xl",
    badge: "text-[9px] px-1.5 py-0.5 -top-1.5 -right-1.5",
  },
  lg: {
    wrapper: "w-16 h-16 rounded-2xl",
    innerRing: "inset-1.5 rounded-xl",
    iconText: "text-2xl",
    badge: "text-[10px] px-2 py-0.5 -top-2 -right-2",
  },
  xl: {
    wrapper: "w-20 h-20 rounded-3xl",
    innerRing: "inset-2 rounded-2xl",
    iconText: "text-3xl",
    badge: "text-[10px] px-2 py-0.5 -top-2 -right-2",
  },
};

export default function ToolIcon3D({
  icon,
  slug,
  category,
  size = "md",
  badge,
  className = "",
}: ToolIcon3DProps) {
  const theme = resolveToolTheme(slug, category);
  const sz = SIZE_CLASSES[size];
  const finalBadge = badge ?? theme.badgeText;

  return (
    <div className={`relative inline-flex shrink-0 select-none ${className}`}>
      {/* Ambient 3D Halo Glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-1.5 rounded-3xl ${theme.ambientGlow} blur-md opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}
      />

      {/* Main 3D Extruded Keycap / Jewel Cube */}
      <div
        className={`relative ${sz.wrapper} bg-gradient-to-br ${theme.gradient} ${theme.ledgeShadow} flex items-center justify-center text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.05] group-hover:-rotate-2 overflow-hidden`}
      >
        {/* Top Specular Glass Reflection Arc */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 via-white/10 to-transparent"
        />

        {/* Inner Engraved Glass Chamber */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute ${sz.innerRing} border border-white/25 bg-white/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.18)]`}
        />

        {/* Crisp Extruded White Icon */}
        <div
          className={`relative z-10 ${sz.iconText} text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)] flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>

      {/* Floating 3D Micro-Badge */}
      {finalBadge && size !== "sm" && (
        <span
          className={`pointer-events-none absolute ${sz.badge} z-20 rounded-md bg-gradient-to-r ${
            theme.badgeBg || "from-slate-900 to-slate-800 text-white border-white/40"
          } border font-black uppercase tracking-wider leading-none shadow-[0_3px_6px_rgba(0,0,0,0.3)]`}
        >
          {finalBadge}
        </span>
      )}
    </div>
  );
}
