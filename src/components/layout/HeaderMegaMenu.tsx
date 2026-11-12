"use client";

import { memo, useMemo, useState } from "react";
import Link from "next/link";
import {
  FaDollarSign,
  FaTags,
  FaRocket,
  FaImage,
  FaArrowRight,
  FaStar,
  FaTools,
  FaBolt,
  FaGlobeAmericas,
  FaBookOpen,
  FaBalanceScale,
} from "react-icons/fa";
import { useFavoriteTools } from "@/lib/favorites";
import { toast } from "@/components/ui/Toast";
import { toolMeta, type ToolMeta } from "@/config/tool-meta";
import { countryCPMData } from "@/lib/cpm-data";
import ToolIcon3D from "@/components/ui/ToolIcon3D";

interface HeaderMegaMenuProps {
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

type CategoryKey =
  | "featured"
  | "analytics-earnings"
  | "seo-metadata"
  | "thumbnail-media"
  | "channel-growth"
  | "utility-fun";

interface CategoryDef {
  id: CategoryKey;
  label: string;
  tagline: string;
  hubHref: string;
  hubLabel: string;
  icon: typeof FaDollarSign;
  accentBg: string;
  accentText: string;
  iconBg: string;
}

const CATEGORIES: CategoryDef[] = [
  {
    id: "featured",
    label: "Flagship & Popular",
    tagline: "Most-used creator calculators, HD assets & SEO tools",
    hubHref: "/tools",
    hubLabel: "All Tools Directory",
    icon: FaBolt,
    accentBg: "bg-purple-50 text-purple-800 border-purple-200/80",
    accentText: "text-purple-700",
    iconBg: "from-purple-600 to-fuchsia-600",
  },
  {
    id: "analytics-earnings",
    label: "Monetization & Tax",
    tagline: "AdSense RPM, sponsorship deals, valuation & S-Corp taxes",
    hubHref: "/tools/analytics-tools",
    hubLabel: "Analytics & Revenue Hub",
    icon: FaDollarSign,
    accentBg: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
    accentText: "text-emerald-700",
    iconBg: "from-emerald-600 to-teal-600",
  },
  {
    id: "seo-metadata",
    label: "SEO & Metadata",
    tagline: "CTR titles, descriptions, keyword tags & chapters",
    hubHref: "/tools/seo-tools",
    hubLabel: "SEO & Metadata Hub",
    icon: FaTags,
    accentBg: "bg-indigo-50 text-indigo-800 border-indigo-200/80",
    accentText: "text-indigo-700",
    iconBg: "from-indigo-600 to-violet-600",
  },
  {
    id: "thumbnail-media",
    label: "Thumbnails & Media",
    tagline: "HD downloaders, feed safe-zone previews & A/B testing",
    hubHref: "/tools/thumbnail-tools",
    hubLabel: "Thumbnails & Media Hub",
    icon: FaImage,
    accentBg: "bg-pink-50 text-pink-800 border-pink-200/80",
    accentText: "text-pink-700",
    iconBg: "from-pink-600 to-rose-600",
  },
  {
    id: "channel-growth",
    label: "Growth & Strategy",
    tagline: "Channel audits, viral outliers, ideas & upload planning",
    hubHref: "/tools/channel-tools",
    hubLabel: "Channel Growth Hub",
    icon: FaRocket,
    accentBg: "bg-sky-50 text-sky-800 border-sky-200/80",
    accentText: "text-sky-700",
    iconBg: "from-sky-600 to-blue-600",
  },
  {
    id: "utility-fun",
    label: "Creator Utilities",
    tagline: "Transcripts, playlist timers, comment pickers & embeds",
    hubHref: "/tools/utility-tools",
    hubLabel: "Utility Tools Hub",
    icon: FaTools,
    accentBg: "bg-amber-50 text-amber-800 border-amber-200/80",
    accentText: "text-amber-700",
    iconBg: "from-amber-500 to-orange-600",
  },
];

const FLAGSHIP_SLUGS = [
  "youtube-earnings-calculator",
  "youtube-thumbnail-downloader",
  "youtube-title-generator",
  "youtube-tag-generator",
  "youtube-sponsorship-calculator",
  "youtube-watch-hours-calculator",
  "youtube-llc-vs-s-corp-tax-savings-calculator",
  "youtube-transcript-downloader",
  "youtube-thumbnail-feed-previewer",
  "youtube-channel-valuation-calculator",
];

const TIER1_QUICK_MARKETS = [
  { flag: "🇺🇸", code: "US", label: "USA", slug: "usa", rpm: "$8.50" },
  { flag: "🇨🇭", code: "CH", label: "Switzerland", slug: "switzerland", rpm: "$7.80" },
  { flag: "🇦🇺", code: "AU", label: "Australia", slug: "australia", rpm: "$7.20" },
  { flag: "🇨🇦", code: "CA", label: "Canada", slug: "canada", rpm: "$7.00" },
  { flag: "🇬🇧", code: "UK", label: "UK", slug: "uk", rpm: "$6.50" },
  { flag: "🇩🇪", code: "DE", label: "Germany", slug: "germany", rpm: "$6.20" },
];

function HeaderMegaMenu({ onClose, onMouseEnter, onMouseLeave }: HeaderMegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("featured");
  const { isFavorite, toggleFavorite } = useFavoriteTools();

  const categoryCounts = useMemo<Record<CategoryKey, number>>(() => {
    const counts: Record<CategoryKey, number> = {
      featured: FLAGSHIP_SLUGS.length,
      "analytics-earnings": 0,
      "seo-metadata": 0,
      "thumbnail-media": 0,
      "channel-growth": 0,
      "utility-fun": 0,
    };
    for (const tool of toolMeta) {
      if (tool.category in counts) {
        counts[tool.category as CategoryKey] += 1;
      }
    }
    return counts;
  }, []);

  const visibleTools = useMemo<ToolMeta[]>(() => {
    if (activeCategory === "featured") {
      return FLAGSHIP_SLUGS.map((slug) => toolMeta.find((t) => t.slug === slug)).filter(
        (t): t is ToolMeta => Boolean(t),
      );
    }
    return toolMeta.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  const currentCategory = CATEGORIES.find((c) => c.id === activeCategory) ?? CATEGORIES[0];

  return (
    <div
      className="px-4 sm:px-6 lg:px-8 pt-2"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-7xl mx-auto rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_28px_64px_-16px_rgba(15,23,42,0.18),0_0_0_1px_rgba(15,23,42,0.03)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Rail: Category Switcher */}
          <div className="lg:col-span-3 bg-slate-50/90 border-b lg:border-b-0 lg:border-r border-slate-200/80 p-3 sm:p-4 flex flex-col justify-between">
            <div>
              <p className="px-2.5 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Tool Suites
              </p>
              <div className="space-y-1" role="tablist" aria-label="Tool categories">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onMouseEnter={() => setActiveCategory(cat.id)}
                      onFocus={() => setActiveCategory(cat.id)}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                        isActive
                          ? "bg-white text-slate-950 shadow-sm border border-purple-200/80"
                          : "text-slate-700 hover:bg-white/70 hover:text-slate-950 border border-transparent"
                      }`}
                    >
                      <span className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-7 h-7 rounded-lg bg-gradient-to-br ${cat.iconBg} text-white flex items-center justify-center shrink-0 shadow-2xs`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-xs font-bold truncate">{cat.label}</span>
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          isActive
                            ? "bg-purple-50 text-purple-700 border border-purple-200/80"
                            : "text-slate-600 bg-slate-200/70"
                        }`}
                      >
                        {categoryCounts[cat.id]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/70">
              <Link
                href="/tools"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900 hover:bg-purple-700 text-white text-xs font-bold transition-colors"
              >
                <span>Browse All {toolMeta.length} Tools</span>
                <FaArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Center Panel: Interactive Tool Grid */}
          <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">
                    {currentCategory.label}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">{currentCategory.tagline}</p>
                </div>
                <Link
                  href={currentCategory.hubHref}
                  onClick={onClose}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold ${currentCategory.accentText} hover:underline`}
                >
                  <span>{currentCategory.hubLabel}</span>
                  <FaArrowRight className="w-2.5 h-2.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[min(360px,calc(100vh-15rem))] overflow-y-auto pr-1">
                {visibleTools.map((tool, index) => {
                  const favorited = isFavorite(tool.slug);
                  return (
                    <div
                      key={tool.slug}
                      className="animate-menu-item group relative flex items-start gap-2.5 p-2.5 rounded-xl border border-transparent hover:border-slate-200/90 hover:bg-slate-50/90 transition-all"
                      style={{ animationDelay: `${Math.min(index * 20, 240)}ms` }}
                    >
                      <Link
                        href={`/tools/${tool.slug}`}
                        onClick={onClose}
                        className="flex items-start gap-2.5 flex-1 min-w-0"
                      >
                        {/* Signature 3D icon cube */}
                        <span className="mt-0.5 shrink-0">
                          <ToolIcon3D slug={tool.slug} category={tool.category} size="sm" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors truncate">
                              {tool.name}
                            </span>
                            {tool.isAI && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 shrink-0 leading-none">
                                AI
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                            {tool.shortDescription}
                          </p>
                        </div>
                      </Link>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const added = toggleFavorite(tool.slug);
                          if (added) {
                            toast.star(`Pinned "${tool.name}" to Saved tools!`);
                          } else {
                            toast.info(`Removed "${tool.name}" from Saved tools.`);
                          }
                        }}
                        className={`p-1.5 rounded-lg text-xs transition-all shrink-0 cursor-pointer ${
                          favorited
                            ? "text-amber-500 hover:text-amber-600 opacity-100"
                            : "text-slate-400 hover:text-amber-500 opacity-50 group-hover:opacity-100 focus:opacity-100"
                        }`}
                        aria-label={favorited ? `Unpin ${tool.name}` : `Pin ${tool.name} to Quick Access`}
                        title={favorited ? "Pinned to Saved" : "Pin to Saved"}
                      >
                        <FaStar className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Rail: CPM Markets & Comparisons */}
          <div className="lg:col-span-4 bg-slate-50/70 border-t lg:border-t-0 lg:border-l border-slate-200/80 p-4 sm:p-5 flex flex-col justify-between">
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <FaGlobeAmericas className="text-emerald-600 w-3 h-3" />
                    Tier-1 RPM Markets
                  </span>
                  <Link
                    href="/resources/youtube-cpm-rates"
                    onClick={onClose}
                    className="text-[11px] font-bold text-purple-700 hover:underline"
                  >
                    All {countryCPMData.length} →
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {TIER1_QUICK_MARKETS.map((m) => (
                    <Link
                      key={m.slug}
                      href={`/tools/youtube-earnings-calculator/${m.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between px-2.5 py-2 rounded-xl bg-white hover:bg-emerald-50/80 hover:shadow-[0_2px_10px_-2px_rgba(16,185,129,0.35)] border border-slate-200/80 hover:border-emerald-300 transition-all"
                    >
                      <span className="flex items-center gap-1.5 min-w-0">
                        <span aria-hidden="true" className="text-sm leading-none">
                          {m.flag}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-700 truncate">
                          {m.label}
                        </span>
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 ml-1 shrink-0">
                        {m.rpm}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2">
                  <FaBalanceScale className="text-purple-600 w-3 h-3" />
                  Compare Alternatives
                </span>
                <div className="space-y-1.5">
                  <Link
                    href="/tools/vs/tubebuddy"
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 rounded-xl bg-white hover:bg-purple-50/70 border border-slate-200/80 hover:border-purple-300 text-xs font-semibold text-slate-800 hover:text-purple-700 transition-colors"
                  >
                    <span>Free vs. TubeBuddy</span>
                    <FaArrowRight className="w-2.5 h-2.5 text-slate-400" />
                  </Link>
                  <Link
                    href="/tools/vs/vidiq"
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 rounded-xl bg-white hover:bg-purple-50/70 border border-slate-200/80 hover:border-purple-300 text-xs font-semibold text-slate-800 hover:text-purple-700 transition-colors"
                  >
                    <span>Free vs. VidIQ</span>
                    <FaArrowRight className="w-2.5 h-2.5 text-slate-400" />
                  </Link>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2">
                  <FaBookOpen className="text-sky-600 w-3 h-3" />
                  Creator Playbooks
                </span>
                <div className="space-y-1 text-xs">
                  <Link
                    href="/resources/youtube-algorithm-guide"
                    onClick={onClose}
                    className="block px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-purple-700 hover:bg-white transition-colors font-medium"
                  >
                    2026 Algorithm Guide →
                  </Link>
                  <Link
                    href="/resources/youtube-monetization-guide"
                    onClick={onClose}
                    className="block px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-purple-700 hover:bg-white transition-colors font-medium"
                  >
                    YPP Monetization Roadmap →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Strip */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {toolMeta.length} Browser Tools
            </span>
            <span>No extension install · No YouTube channel login required</span>
          </div>
          <Link
            href="/tools"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 font-bold text-purple-700 hover:text-purple-800 transition-colors"
          >
            <span>Open Complete Tool Directory</span>
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(HeaderMegaMenu);
