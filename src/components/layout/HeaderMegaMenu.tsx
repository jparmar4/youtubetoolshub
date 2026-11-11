"use client";

import { memo } from "react";
import Link from "next/link";
import {
  FaDollarSign,
  FaTags,
  FaRocket,
  FaImage,
  FaArrowRight,
  FaClock,
  FaAward,
  FaCoins,
  FaChartLine,
  FaHeading,
  FaAlignLeft,
  FaHashtag,
  FaSearch,
  FaDownload,
  FaMobileAlt,
  FaFileAlt,
  FaStar,
} from "react-icons/fa";
import { useFavoriteTools } from "@/lib/favorites";
import { toast } from "@/components/ui/Toast";
import { toolMeta } from "@/config/tool-meta";

interface HeaderMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const TIER1_QUICK_MARKETS = [
  { code: "US", label: "United States", slug: "usa", rpm: "$8.50" },
  { code: "UK", label: "United Kingdom", slug: "uk", rpm: "$6.50" },
  { code: "CA", label: "Canada", slug: "canada", rpm: "$7.00" },
  { code: "AU", label: "Australia", slug: "australia", rpm: "$7.20" },
  { code: "CH", label: "Switzerland", slug: "switzerland", rpm: "$7.80" },
  { code: "DE", label: "Germany", slug: "germany", rpm: "$6.20" },
];

const MENU_CATEGORIES = [
  {
    title: "Monetization & Pay",
    icon: FaDollarSign,
    color: "from-emerald-500 to-teal-600",
    tools: [
      {
        slug: "youtube-earnings-calculator",
        name: "Earnings & AdSense Calculator",
        desc: "Estimate RPM & monthly pay across 52 countries",
        icon: FaDollarSign,
        badge: "Tier-1",
      },
      {
        slug: "youtube-sponsorship-calculator",
        name: "Sponsorship & Brand Deal Rates",
        desc: "Calculate integration pricing in 15+ currencies",
        icon: FaChartLine,
        badge: "Pro",
      },
      {
        slug: "youtube-llc-vs-s-corp-tax-savings-calculator",
        name: "LLC vs S-Corp Tax Savings",
        desc: "Compare SE tax vs S-Corp salary savings (US)",
        icon: FaCoins,
        badge: "Tax",
      },
      {
        slug: "youtube-tax-deduction-calculator",
        name: "Creator Tax & Gear Write-Offs",
        desc: "Estimate deductions across US, UK, CA, AU, EU, CH & SG",
        icon: FaDollarSign,
      },
      {
        slug: "youtube-adsense-fee-calculator",
        name: "AdSense FX & Wire Fee Calculator",
        desc: "Check W-8BEN treaty withholding & FX conversion loss",
        icon: FaCoins,
      },
    ],
  },
  {
    title: "SEO & Video Metadata",
    icon: FaTags,
    color: "from-purple-500 to-pink-600",
    tools: [
      {
        slug: "youtube-tag-generator",
        name: "Viral Video Tag Generator",
        desc: "Generate high-ranking tags formatted for YouTube Studio",
        icon: FaTags,
        badge: "Hot",
      },
      {
        slug: "youtube-title-generator",
        name: "High-CTR Title Generator",
        desc: "Click-worthy, algorithm-friendly title ideas",
        icon: FaHeading,
      },
      {
        slug: "youtube-description-generator",
        name: "SEO Description Generator",
        desc: "Optimized description outlines with timestamps",
        icon: FaAlignLeft,
      },
      {
        slug: "youtube-hashtag-generator",
        name: "Hashtag Generator",
        desc: "Find trending hashtags for standard videos & Shorts",
        icon: FaHashtag,
      },
    ],
  },
  {
    title: "Channel Growth & Goals",
    icon: FaRocket,
    color: "from-blue-500 to-indigo-600",
    tools: [
      {
        slug: "youtube-watch-hours-calculator",
        name: "4,000 Watch Hours Countdown",
        desc: "YPP monetization tracker & 365-day risk meter",
        icon: FaClock,
        badge: "YPP",
      },
      {
        slug: "youtube-shorts-vs-long-form-calculator",
        name: "Shorts vs. Long-Form Equivalence",
        desc: "Compare view value, RPM and creator hourly wage",
        icon: FaCoins,
      },
      {
        slug: "youtube-channel-valuation-calculator",
        name: "Channel Worth Estimator",
        desc: "Calculate buyout valuation across 15+ currencies",
        icon: FaDollarSign,
      },
      {
        slug: "youtube-milestone-countdown-calculator",
        name: "Play Button Milestone Countdown",
        desc: "Project exact date to 100K Silver & 1M Gold play buttons",
        icon: FaAward,
      },
      {
        slug: "youtube-channel-audit",
        name: "Instant Channel Audit",
        desc: "Grade your channel SEO, branding and growth health",
        icon: FaSearch,
      },
    ],
  },
  {
    title: "Media, Feeds & Assets",
    icon: FaImage,
    color: "from-amber-500 to-orange-600",
    tools: [
      {
        slug: "youtube-thumbnail-downloader",
        name: "4K & HD Thumbnail Downloader",
        desc: "Download full resolution thumbnails from any video or Short",
        icon: FaDownload,
        badge: "Popular",
      },
      {
        slug: "youtube-thumbnail-feed-previewer",
        name: "Thumbnail Feed Simulator",
        desc: "Preview how your thumbnail and title look in YouTube feeds",
        icon: FaMobileAlt,
      },
      {
        slug: "youtube-transcript-downloader",
        name: "Transcript & Subtitles Downloader",
        desc: "Export clean text and CC for repurposing and blogs",
        icon: FaFileAlt,
      },
      {
        slug: "youtube-timestamp-generator",
        name: "Timestamp & Chapter Generator",
        desc: "Generate clickable video chapters in seconds",
        icon: FaClock,
      },
    ],
  },
];

function HeaderMegaMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }: HeaderMegaMenuProps) {
  const { isFavorite, toggleFavorite } = useFavoriteTools();

  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200/90 shadow-2xl animate-fade-in-up"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MENU_CATEGORIES.map((category) => {
            const CatIcon = category.icon;
            return (
              <div key={category.title} className="flex flex-col space-y-3">
                {/* Category Header */}
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <div
                    className={`w-7 h-7 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-xs shadow-xs`}
                  >
                    <CatIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    {category.title}
                  </span>
                </div>

                {/* Tool List */}
                <div className="space-y-1">
                  {category.tools.map((tool) => {
                    const ToolIcon = tool.icon;
                    const favorited = isFavorite(tool.slug);

                    return (
                      <div
                        key={tool.slug}
                        className="group relative flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        <Link
                          href={`/tools/${tool.slug}`}
                          onClick={onClose}
                          className="flex items-start gap-2.5 flex-1 min-w-0"
                        >
                          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-purple-600 group-hover:text-white transition-colors flex-shrink-0 mt-0.5">
                            <ToolIcon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-slate-800 group-hover:text-purple-600 transition-colors truncate">
                                {tool.name}
                              </span>
                              {tool.badge && (
                                <span className="text-[11px] font-extrabold px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700">
                                  {tool.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1 leading-normal">
                              {tool.desc}
                            </p>
                          </div>
                        </Link>

                        {/* Quick Pin / Favorite Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const added = toggleFavorite(tool.slug);
                            if (added) {
                              toast.star(`Pinned "${tool.name}" to Quick Access!`);
                            } else {
                              toast.info(`Removed "${tool.name}" from Quick Access.`);
                            }
                          }}
                          className={`p-1.5 rounded-lg text-xs transition-colors flex-shrink-0 ${
                            favorited
                              ? "text-amber-500 hover:text-amber-600"
                              : "text-slate-300 hover:text-amber-400 opacity-0 group-hover:opacity-100"
                          }`}
                          aria-label={favorited ? "Unpin tool" : "Pin tool to Quick Access"}
                          title={favorited ? "Pinned to Quick Access" : "Pin to Quick Access"}
                        >
                          <FaStar className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Ribbon inside Mega Menu */}
        <div className="mt-6 pt-5 border-t border-slate-200/80 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mr-1">
              Top Tier-1 RPM Markets:
            </span>
            {TIER1_QUICK_MARKETS.map((m) => (
              <Link
                key={m.slug}
                href={`/tools/youtube-earnings-calculator/${m.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-[11px] font-bold text-slate-800 hover:text-emerald-800 transition-colors"
              >
                <span className="px-1 py-0.5 rounded bg-slate-900 text-white text-[11px] font-black">
                  {m.code}
                </span>
                <span>{m.label}</span>
                <span className="text-emerald-700 font-semibold">{m.rpm}</span>
              </Link>
            ))}
            <Link
              href="/resources/youtube-cpm-rates"
              onClick={onClose}
              className="text-[11px] font-bold text-purple-700 hover:text-purple-800 hover:underline ml-auto"
            >
              Compare All 52 Countries →
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {toolMeta.length} Free Tools
              </span>
              <span>No sign-up or credit card required. Fast browser-based execution.</span>
            </div>

            <Link
              href="/tools"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-bold text-purple-700 hover:text-purple-800 transition-colors group"
            >
              <span>Explore All {toolMeta.length} Tools Catalog</span>
              <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(HeaderMegaMenu);
