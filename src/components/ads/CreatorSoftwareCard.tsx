"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaExternalLinkAlt, FaCrown } from "react-icons/fa";
import { AFFILIATE_TOOLS, DEFAULT_AFFILIATE_DISCLOSURE, type AffiliateTool } from "@/config/affiliates";

interface CreatorSoftwareCardProps {
  defaultCategory?: "video" | "audio" | "seo";
  className?: string;
}

interface InternalWorkflowCard {
  id: string;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  href: string;
  ctaText: string;
  logoBg: string;
  badgeBg: string;
}

const INTERNAL_FALLBACKS: Record<string, InternalWorkflowCard> = {
  opusclip: {
    id: "shorts-calculator",
    name: "Shorts vs. Long-Form RPM",
    tagline: "Compare Shorts & long-form AdSense revenue before you edit.",
    description: "Model exact Tier-1 payouts per 1M Shorts views vs. 8+ minute mid-roll videos in your browser.",
    badge: "Free Calculator",
    href: "/tools/youtube-shorts-vs-long-form-calculator",
    ctaText: "Compare RPM Free →",
    logoBg: "from-violet-600 to-fuchsia-600",
    badgeBg: "bg-violet-500/10 text-violet-700 border-violet-200",
  },
  descript: {
    id: "earnings-calculator",
    name: "YouTube Earnings Calculator",
    tagline: "Project monthly AdSense income across 52 countries.",
    description: "Benchmark US, UK, Canada, and Australia RPMs and model 100K to 1M view payout scenarios.",
    badge: "High-RPM Tool",
    href: "/tools/youtube-earnings-calculator",
    ctaText: "Estimate Earnings →",
    logoBg: "from-emerald-600 to-teal-600",
    badgeBg: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  },
  epidemic: {
    id: "loudness-checker",
    name: "YouTube -14 LUFS Audio Checker",
    tagline: "Check if YouTube will turn down your video audio volume.",
    description: "Instant local WebAudio loudness & true-peak metering against YouTube's -14 LUFS normalization target.",
    badge: "Audio Studio",
    href: "/tools/youtube-loudness-checker",
    ctaText: "Check Audio LUFS →",
    logoBg: "from-emerald-600 to-teal-600",
    badgeBg: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  },
  elevenlabs: {
    id: "sponsorship-calculator",
    name: "Sponsorship Rate Calculator",
    tagline: "Price YouTube brand deals and dedicated integrations.",
    description: "Calculate Tier-1 brand CPM rates, usage rights add-ons, and copy-ready media kit pricing.",
    badge: "Brand Deals",
    href: "/tools/youtube-sponsorship-calculator",
    ctaText: "Price Sponsorships →",
    logoBg: "from-sky-600 to-blue-700",
    badgeBg: "bg-sky-500/10 text-sky-700 border-sky-200",
  },
  artlist: {
    id: "royalty-split",
    name: "Shorts Music Royalty Split",
    tagline: "See how licensed music tracks affect your Shorts revenue share.",
    description: "Compare 0, 1, and 2 music tracks in the YouTube Shorts Creator Pool before publishing.",
    badge: "Revenue Split",
    href: "/tools/youtube-shorts-music-royalty-split-calculator",
    ctaText: "Check Music Split →",
    logoBg: "from-amber-500 to-orange-600",
    badgeBg: "bg-amber-500/10 text-amber-700 border-amber-200",
  },
};

const CATEGORY_MAP: Record<"video" | "audio" | "seo", string[]> = {
  video: ["tubebuddy", "vidiq", "opusclip"],
  audio: ["epidemic", "artlist", "elevenlabs"],
  seo: ["vidiq", "tubebuddy", "descript"],
};

type DisplayCard =
  | { kind: "affiliate"; item: AffiliateTool }
  | { kind: "internal"; item: InternalWorkflowCard };

export default function CreatorSoftwareCard({
  defaultCategory = "video",
  className = "",
}: CreatorSoftwareCardProps) {
  const [activeCategory, setActiveCategory] = useState<"video" | "audio" | "seo">(defaultCategory);

  const cardsForCategory: DisplayCard[] = CATEGORY_MAP[activeCategory]
    .map<DisplayCard | null>((id) => {
      const affiliate = AFFILIATE_TOOLS[id];
      if (affiliate?.verified) {
        return { kind: "affiliate", item: affiliate };
      }
      const internal = INTERNAL_FALLBACKS[id];
      if (internal) {
        return { kind: "internal", item: internal };
      }
      return null;
    })
    .filter((entry): entry is DisplayCard => entry !== null);

  const hasAffiliateCard = cardsForCategory.some((c) => c.kind === "affiliate");

  return (
    <div
      className={`my-8 overflow-hidden rounded-2xl border border-purple-200/90 bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/40 p-5 sm:p-6 shadow-md ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-purple-700">
            <FaCrown className="text-amber-500" />
            <span>Essential Creator Stack (2026 Tested)</span>
          </div>
          <h3 className="mt-1 text-base sm:text-lg font-black text-slate-900">
            High-ROI Creator Tools to Speed Up Your Production
          </h3>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 rounded-xl bg-purple-100/60 p-1">
          <button
            type="button"
            onClick={() => setActiveCategory("video")}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
              activeCategory === "video"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
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
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Audio &amp; Revenue
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("seo")}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
              activeCategory === "seo"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            SEO &amp; CTR
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {cardsForCategory.map((card) => {
          const tool = card.item;
          return (
            <div
              key={tool.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:border-purple-300 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${tool.logoBg} text-white font-black text-sm shadow-sm`}
                    >
                      {tool.name.charAt(0)}
                    </div>
                    <span className="font-black text-slate-900 text-sm">
                      {tool.name}
                    </span>
                  </div>
                  <span
                    className={`text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${tool.badgeBg}`}
                  >
                    {tool.badge}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-700">
                  {tool.tagline}
                </p>
                <p className="mt-1.5 text-[11px] text-slate-500 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                {card.kind === "affiliate" ? (
                  <a
                    href={card.item.link}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-purple-600 px-3 py-2 text-xs font-bold text-white shadow transition-all hover:bg-purple-700 hover:scale-[1.02]"
                  >
                    <span>{card.item.ctaText}</span>
                    <FaExternalLinkAlt className="text-[11px]" />
                  </a>
                ) : (
                  <Link
                    href={card.item.href}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white shadow transition-all hover:bg-purple-700 hover:scale-[1.02]"
                  >
                    <span>{card.item.ctaText}</span>
                    <FaArrowRight className="text-[11px]" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {hasAffiliateCard && (
        <p className="mt-4 text-center text-[11px] text-slate-600 italic">
          {DEFAULT_AFFILIATE_DISCLOSURE}
        </p>
      )}
    </div>
  );
}
