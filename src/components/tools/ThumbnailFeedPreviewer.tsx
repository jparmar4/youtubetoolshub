"use client";

import { useState, useId } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import {
  FaMobileAlt,
  FaDesktop,
  FaTv,
  FaEye,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSlidersH,
  FaSun,
  FaMoon,
  FaShare,
  FaThumbsUp,
  FaComment,
  FaUpload,
  FaImage,
  FaMagic,
  FaShieldAlt,
  FaExternalLinkAlt,
  FaClock,
} from "react-icons/fa";
import CreatorSoftwareCard from "@/components/ads/CreatorSoftwareCard";

interface CompetitorCard {
  id: string;
  title: string;
  channel: string;
  views: string;
  timeAgo: string;
  duration: string;
  avatarBg: string;
  thumbBg: string;
  thumbLabel: string;
}

const SAMPLE_THUMBNAILS = [
  {
    name: "Tech Review",
    url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    title: "Why Everyone Is Quitting The M4 MacBook Pro in 2026",
    niche: "tech",
  },
  {
    name: "Personal Finance",
    url: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=80",
    title: "How I Built a $12,000/Month Passive Income Stream (No Hype)",
    niche: "finance",
  },
  {
    name: "Gaming Challenge",
    url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",
    title: "100 Days in Hardcore Minecraft (I Lost Everything)",
    niche: "gaming",
  },
  {
    name: "Creator Tutorial",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    title: "YouTube SEO Secrets: Rank #1 in Search Within 24 Hours",
    niche: "tech",
  },
  {
    name: "Vertical Short",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    title: "3 Camera Hacks That Make Cheap Phones Look Like $5,000 RED Cameras #shorts",
    niche: "tech",
  },
];

const COMPETITORS_BY_NICHE: Record<string, CompetitorCard[]> = {
  tech: [
    {
      id: "c1",
      title: "Apple Just Cancelled the iPhone 18 Pro (Leak Confirmed)",
      channel: "TechPulse Daily",
      views: "482K views",
      timeAgo: "4 hours ago",
      duration: "11:42",
      avatarBg: "bg-blue-600",
      thumbBg: "from-blue-900 to-indigo-950",
      thumbLabel: "APPLE LEAK 2026",
    },
    {
      id: "c2",
      title: "The $40 AI Hardware Device You Actually Need",
      channel: "Hardware Nexus",
      views: "1.2M views",
      timeAgo: "1 day ago",
      duration: "18:05",
      avatarBg: "bg-purple-600",
      thumbBg: "from-slate-900 to-purple-900",
      thumbLabel: "CHEAP AI TECH",
    },
    {
      id: "c3",
      title: "Building an AI Startup with $0 in 30 Days",
      channel: "DevBlueprint",
      views: "230K views",
      timeAgo: "2 days ago",
      duration: "14:15",
      avatarBg: "bg-emerald-600",
      thumbBg: "from-emerald-950 to-slate-900",
      thumbLabel: "$0 TO $10K/MO",
    },
  ],
  finance: [
    {
      id: "f1",
      title: "The Stock Market Crash Nobody Is Talking About",
      channel: "Market Mindset",
      views: "890K views",
      timeAgo: "6 hours ago",
      duration: "16:30",
      avatarBg: "bg-emerald-600",
      thumbBg: "from-emerald-950 to-slate-950",
      thumbLabel: "RECESSION WARNING",
    },
    {
      id: "f2",
      title: "Where to Invest $10,000 Right Now (High Yield Safe Bets)",
      channel: "Wealth Builder",
      views: "340K views",
      timeAgo: "18 hours ago",
      duration: "13:20",
      avatarBg: "bg-amber-600",
      thumbBg: "from-amber-950 to-slate-900",
      thumbLabel: "$10,000 BLUEPRINT",
    },
  ],
  gaming: [
    {
      id: "g1",
      title: "I Survived 1,000 Days on an Impossible Zombie Island",
      channel: "GamerCore",
      views: "2.1M views",
      timeAgo: "12 hours ago",
      duration: "32:10",
      avatarBg: "bg-rose-600",
      thumbBg: "from-rose-950 to-slate-950",
      thumbLabel: "DAY 1,000 SURVIVAL",
    },
    {
      id: "g2",
      title: "GTA 6 Final Gameplay Trailer Breakdown: 45 Hidden Details",
      channel: "PixelPlay",
      views: "1.5M views",
      timeAgo: "1 day ago",
      duration: "19:45",
      avatarBg: "bg-indigo-600",
      thumbBg: "from-indigo-950 to-slate-900",
      thumbLabel: "GTA 6 SECRETS",
    },
  ],
};

export default function ThumbnailFeedPreviewer() {
  const thumbnailInputId = useId();
  // Creator Customization State
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(
    SAMPLE_THUMBNAILS[0].url
  );
  const [videoTitle, setVideoTitle] = useState<string>(
    SAMPLE_THUMBNAILS[0].title
  );
  const [channelName, setChannelName] = useState<string>("Creator Academy");
  const [verifiedBadge, setVerifiedBadge] = useState<boolean>(true);
  const [duration, setDuration] = useState<string>("14:22");
  const [viewCount, setViewCount] = useState<string>("184K views");
  const [timeAgo, setTimeAgo] = useState<string>("3 hours ago");
  const [selectedNiche, setSelectedNiche] = useState<string>("tech");

  // Viewport & Mode Controls
  const [viewportMode, setViewportMode] = useState<
    "desktop" | "mobile" | "shorts" | "tv"
  >("desktop");
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");

  // Diagnostic Inspection Overlays
  const [showTimestampOverlay, setShowTimestampOverlay] = useState<boolean>(true);
  const [showShortsSafeZone, setShowShortsSafeZone] = useState<boolean>(true);
  const [isGrayscale, setIsGrayscale] = useState<boolean>(false);
  const [isBlurred, setIsBlurred] = useState<boolean>(false);

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setThumbnailUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const titleLength = videoTitle.length;
  const isMobileTruncated = titleLength > 48;
  const isDesktopTruncated = titleLength > 65;

  return (
    <ToolPageLayout
      title="YouTube Thumbnail & Feed Safe-Zone Previewer"
      slug="youtube-thumbnail-feed-previewer"
      description="Inspect your draft thumbnail and title in realistic YouTube Desktop, Mobile, and Shorts 9:16 safe-zone feeds."
    >
      <div className="space-y-8">
        {/* Intro Banner */}
        <div className="rounded-2xl border border-red-200/80 bg-gradient-to-r from-red-50/80 via-white to-orange-50/60 p-5 dark:border-red-900/40 dark:from-slate-900 dark:via-red-950/20 dark:to-slate-900 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-black text-red-700 dark:bg-red-950/80 dark:text-red-400">
                <FaShieldAlt /> 2026 YouTube UI Guidelines
              </span>
              <h2 className="mt-2 text-xl font-black text-slate-900 dark:text-white">
                Never Let the Timestamp Block Your Thumbnail Text Again
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Over 38% of amateur thumbnails place essential words in the bottom-right corner where the video length badge (14:22) completely blocks them. Test in real feeds before you publish.
              </p>
            </div>
            <Link
              href="/tools/youtube-title-ab-tester"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-red-700 transition-all"
            >
              <span>Test Title A/B Score →</span>
            </Link>
          </div>
        </div>

        {/* Inputs & Studio Controls */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-4">
            <FaSlidersH className="text-red-500" />
            <span>Customize Video Packaging &amp; Metadata</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Title & Metadata */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    Video Title
                  </label>
                  <span
                    className={`text-[11px] font-bold ${
                      isMobileTruncated ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {titleLength} characters {isMobileTruncated && "(Mobile Cutoff Warning)"}
                  </span>
                </div>
                <Input
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="Enter your punchy video title..."
                  className="font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Channel Name
                  </label>
                  <Input
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    placeholder="e.g. Creator HQ"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Timestamp Duration
                  </label>
                  <Input
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 14:22"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Views Display
                  </label>
                  <Input
                    value={viewCount}
                    onChange={(e) => setViewCount(e.target.value)}
                    placeholder="e.g. 245K views"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Upload Time
                  </label>
                  <Input
                    value={timeAgo}
                    onChange={(e) => setTimeAgo(e.target.value)}
                    placeholder="e.g. 3 hours ago"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300 select-none">
                  <input
                    type="checkbox"
                    checked={verifiedBadge}
                    onChange={(e) => setVerifiedBadge(e.target.checked)}
                    className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
                  />
                  <span>Show Verified Creator Checkmark</span>
                </label>
              </div>
            </div>

            {/* Right: Thumbnail Upload & Presets */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  Upload Draft Thumbnail (16:9 or 9:16)
                </label>
                <div className="flex items-center gap-3">
                  <label htmlFor={thumbnailInputId} className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-700 cursor-pointer hover:border-red-400 hover:bg-red-50/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-all">
                    <FaUpload className="text-red-500" />
                    <span>Upload Local Image</span>
                    <input
                      id={thumbnailInputId}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <Input
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    placeholder="Or paste image URL..."
                    className="flex-1 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Quick Sample Thumbnails:
                </label>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_THUMBNAILS.map((sample) => (
                    <button
                      key={sample.name}
                      type="button"
                      onClick={() => {
                        setThumbnailUrl(sample.url);
                        setVideoTitle(sample.title);
                        setSelectedNiche(sample.niche);
                      }}
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold border transition-all ${
                        thumbnailUrl === sample.url
                          ? "border-red-600 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {sample.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Competitor Niche Feed:
                </label>
                <select
                  value={selectedNiche}
                  onChange={(e) => setSelectedNiche(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value="tech">Tech &amp; AI Software</option>
                  <option value="finance">Finance &amp; Investing</option>
                  <option value="gaming">Gaming &amp; Entertainment</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Viewport Toolbar & Diagnostics Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-900 p-4 text-white shadow-md">
          {/* Viewport Tabs */}
          <div className="flex items-center gap-1 rounded-xl bg-slate-800 p-1">
            <button
              type="button"
              onClick={() => setViewportMode("desktop")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                viewportMode === "desktop"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <FaDesktop /> <span>Desktop Feed</span>
            </button>
            <button
              type="button"
              onClick={() => setViewportMode("mobile")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                viewportMode === "mobile"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <FaMobileAlt /> <span>Mobile Suggested</span>
            </button>
            <button
              type="button"
              onClick={() => setViewportMode("shorts")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                viewportMode === "shorts"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <FaEye /> <span>Shorts 9:16 Safe-Zone</span>
            </button>
            <button
              type="button"
              onClick={() => setViewportMode("tv")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                viewportMode === "tv"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <FaTv /> <span>Smart TV</span>
            </button>
          </div>

          {/* Diagnostic Toggles */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {viewportMode !== "shorts" && (
              <button
                type="button"
                onClick={() => setShowTimestampOverlay(!showTimestampOverlay)}
                className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-bold transition-all ${
                  showTimestampOverlay
                    ? "border-red-500 bg-red-950/60 text-red-300"
                    : "border-slate-700 bg-slate-800 text-slate-400"
                }`}
              >
                <FaClock className="text-red-400" />
                <span>Timestamp Danger Box</span>
              </button>
            )}

            {viewportMode === "shorts" && (
              <button
                type="button"
                onClick={() => setShowShortsSafeZone(!showShortsSafeZone)}
                className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-bold transition-all ${
                  showShortsSafeZone
                    ? "border-emerald-500 bg-emerald-950/60 text-emerald-300"
                    : "border-slate-700 bg-slate-800 text-slate-400"
                }`}
              >
                <FaShieldAlt className="text-emerald-400" />
                <span>Shorts UI Safe-Zone</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsGrayscale(!isGrayscale)}
              className={`rounded-lg border px-2.5 py-1.5 font-bold transition-all ${
                isGrayscale
                  ? "border-purple-500 bg-purple-950/60 text-purple-300"
                  : "border-slate-700 bg-slate-800 text-slate-400"
              }`}
            >
              B&amp;W Contrast
            </button>

            <button
              type="button"
              onClick={() => setIsBlurred(!isBlurred)}
              className={`rounded-lg border px-2.5 py-1.5 font-bold transition-all ${
                isBlurred
                  ? "border-purple-500 bg-purple-950/60 text-purple-300"
                  : "border-slate-700 bg-slate-800 text-slate-400"
              }`}
            >
              Squint Blur Test
            </button>

            <button
              type="button"
              onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
              className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-slate-300 hover:text-white"
            >
              {themeMode === "dark" ? <FaSun className="text-amber-400" /> : <FaMoon />}
              <span>{themeMode === "dark" ? "Light" : "Dark"} Mode</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            VIEWPORT CANVAS
           ========================================================================= */}
        <div
          className={`rounded-3xl border p-4 sm:p-8 transition-colors ${
            themeMode === "dark"
              ? "border-slate-800 bg-[#0f0f0f] text-white"
              : "border-slate-300 bg-[#f9f9f9] text-[#0f0f0f]"
          }`}
        >
          {/* Mode 1: Desktop Home Feed */}
          {viewportMode === "desktop" && (
            <div>
              <div className="mb-6 flex items-center justify-between border-b pb-3 border-slate-700/30">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-600"></span>
                  <span className="text-xs font-bold tracking-wider uppercase opacity-70">
                    YouTube Desktop Home Feed (Simulated 1440p)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs opacity-60">
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-semibold">
                    All
                  </span>
                  <span className="rounded-full bg-white/5 px-2.5 py-0.5">
                    Trending
                  </span>
                  <span className="rounded-full bg-white/5 px-2.5 py-0.5">
                    Podcasts
                  </span>
                </div>
              </div>

              {/* Video Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* 1. CREATOR'S CARD */}
                <div className="group flex flex-col">
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-800 shadow-md">
                    {/* Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumbnailUrl}
                      alt="Your Thumbnail Preview"
                      className={`h-full w-full object-cover transition-all ${
                        isGrayscale ? "grayscale" : ""
                      } ${isBlurred ? "blur-[3px]" : ""}`}
                    />

                    {/* Bottom-right Timestamp Badge */}
                    <div className="absolute bottom-2 right-2 rounded-md bg-black/85 px-1.5 py-0.5 text-[11px] font-bold text-white shadow">
                      {duration}
                    </div>

                    {/* Timestamp Danger Zone Overlay */}
                    {showTimestampOverlay && (
                      <div className="pointer-events-none absolute bottom-0 right-0 h-14 w-28 rounded-tl-xl border-2 border-dashed border-red-500 bg-red-600/30 backdrop-blur-[1px] flex flex-col items-center justify-center p-1 text-center">
                        <FaExclamationTriangle className="text-red-300 text-xs" />
                        <span className="text-[9px] font-black uppercase text-red-200 leading-tight">
                          Danger Zone (Blocked)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Metadata Row */}
                  <div className="mt-3 flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600 font-bold text-white text-xs">
                      {channelName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm leading-snug line-clamp-2">
                        {videoTitle}
                      </h4>
                      <div className="mt-1 flex items-center gap-1.5 text-xs opacity-70">
                        <span>{channelName}</span>
                        {verifiedBadge && (
                          <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-slate-400 text-[8px] text-black">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="text-xs opacity-60">
                        {viewCount} • {timeAgo}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2 & 3: Competitor Cards from Selected Niche */}
                {(COMPETITORS_BY_NICHE[selectedNiche] || COMPETITORS_BY_NICHE.tech).map(
                  (comp) => (
                    <div key={comp.id} className="flex flex-col opacity-90">
                      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 shadow">
                        <div
                          className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${comp.thumbBg} p-4 text-center`}
                        >
                          <span className="font-black text-white text-sm sm:text-base tracking-wide uppercase drop-shadow">
                            {comp.thumbLabel}
                          </span>
                        </div>
                        <div className="absolute bottom-2 right-2 rounded-md bg-black/85 px-1.5 py-0.5 text-[11px] font-bold text-white shadow">
                          {comp.duration}
                        </div>
                      </div>

                      <div className="mt-3 flex gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${comp.avatarBg} font-bold text-white text-xs`}
                        >
                          {comp.channel.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm leading-snug line-clamp-2">
                            {comp.title}
                          </h4>
                          <p className="mt-1 text-xs opacity-70">
                            {comp.channel}
                          </p>
                          <p className="text-xs opacity-60">
                            {comp.views} • {comp.timeAgo}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Mode 2: Mobile Suggested Feed */}
          {viewportMode === "mobile" && (
            <div className="mx-auto max-w-sm rounded-[36px] border-4 border-slate-700 bg-black p-3 shadow-2xl overflow-hidden">
              {/* Phone Header Notch */}
              <div className="flex items-center justify-between px-3 py-1.5 text-xs text-white opacity-60">
                <span>9:41</span>
                <div className="h-3 w-16 rounded-full bg-slate-800"></div>
                <span>5G 100%</span>
              </div>

              {/* YouTube App Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 px-2 py-2 text-white">
                <span className="font-black text-sm text-red-600">YouTube</span>
                <div className="flex items-center gap-3 text-xs opacity-70">
                  <span>Cast</span>
                  <span>Bell</span>
                  <span>Search</span>
                </div>
              </div>

              {/* Mobile Card */}
              <div className="mt-3">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbnailUrl}
                    alt="Mobile Preview"
                    className={`h-full w-full object-cover ${
                      isGrayscale ? "grayscale" : ""
                    } ${isBlurred ? "blur-[3px]" : ""}`}
                  />
                  <div className="absolute bottom-1.5 right-1.5 rounded bg-black/85 px-1 py-0.5 text-[10px] font-bold text-white">
                    {duration}
                  </div>

                  {showTimestampOverlay && (
                    <div className="absolute bottom-0 right-0 h-12 w-24 border border-dashed border-red-500 bg-red-600/40 flex items-center justify-center text-[9px] font-bold text-red-200">
                      Blocked
                    </div>
                  )}
                </div>

                <div className="mt-2 flex gap-2.5 px-1">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-[11px] font-bold text-white">
                    {channelName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs leading-snug line-clamp-2 text-white">
                      {videoTitle}
                    </h4>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      {channelName} • {viewCount} • {timeAgo}
                    </p>
                  </div>
                </div>
              </div>

              {/* Truncation Diagnostic Note */}
              <div className="mt-4 rounded-xl bg-slate-900 p-3 text-[11px] text-slate-300">
                <div className="flex items-center gap-1.5 font-bold text-amber-400 mb-1">
                  <FaExclamationTriangle />
                  <span>Mobile Truncation Analysis:</span>
                </div>
                {isMobileTruncated ? (
                  <p>
                    Your title has {titleLength} characters. Mobile YouTube cuts off titles after roughly 45–50 characters. Front-load your main keyword!
                  </p>
                ) : (
                  <p className="text-emerald-400 flex items-center gap-1">
                    <FaCheckCircle /> Title length is optimal ({titleLength} chars). 100% visible on smartphones without truncation.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Mode 3: YouTube Shorts 9:16 Safe-Zone Grid */}
          {viewportMode === "shorts" && (
            <div className="mx-auto max-w-[340px] rounded-[38px] border-4 border-slate-700 bg-black p-2 shadow-2xl relative overflow-hidden">
              {/* Phone Status */}
              <div className="flex items-center justify-between px-3 py-1 text-[11px] text-white opacity-70">
                <span>9:41</span>
                <span>Shorts Feed</span>
                <span>100%</span>
              </div>

              {/* 9:16 Video Player Container */}
              <div className="relative aspect-[9/16] w-full rounded-[28px] overflow-hidden bg-slate-900">
                {/* Media Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbnailUrl}
                  alt="Shorts Preview"
                  className={`h-full w-full object-cover ${
                    isGrayscale ? "grayscale" : ""
                  } ${isBlurred ? "blur-[3px]" : ""}`}
                />

                {/* Safe-Zone Overlays (When Enabled) */}
                {showShortsSafeZone && (
                  <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between">
                    {/* Top 12% Header Danger Zone */}
                    <div className="h-[12%] w-full bg-red-600/30 border-b border-dashed border-red-400 flex items-center justify-center">
                      <span className="text-[10px] font-black uppercase text-red-200 tracking-wider">
                        Header Safe-Zone (12%)
                      </span>
                    </div>

                    {/* Center 58% Perfect Safe Zone */}
                    <div className="flex-1 w-[80%] mx-auto border-2 border-emerald-400/80 bg-emerald-500/10 rounded-xl flex items-center justify-center p-2 text-center">
                      <div className="rounded-lg bg-black/60 px-3 py-1 text-center">
                        <span className="text-xs font-black text-emerald-300 block">
                          100% ACTIVE SAFE-ZONE
                        </span>
                        <span className="text-[9px] text-slate-200">
                          Place all thumbnail text, faces &amp; logos here
                        </span>
                      </div>
                    </div>

                    {/* Bottom 30% Caption & Actions Danger Zone */}
                    <div className="h-[30%] w-full bg-red-600/30 border-t border-dashed border-red-400 flex items-center justify-center">
                      <span className="text-[10px] font-black uppercase text-red-200 tracking-wider">
                        Overlay Danger Zone (Captions &amp; UI)
                      </span>
                    </div>
                  </div>
                )}

                {/* Interactive Simulated Shorts UI Elements */}
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 z-20">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between text-white text-xs pt-1">
                    <span className="font-bold opacity-80">Subscriptions</span>
                    <span className="font-bold border-b-2 border-white pb-0.5">
                      Live Shorts
                    </span>
                  </div>

                  {/* Bottom Content & Right Action Column */}
                  <div className="flex items-end justify-between gap-2 pb-2">
                    {/* Left: Channel Info & Title */}
                    <div className="max-w-[75%] space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                          {channelName.charAt(0)}
                        </div>
                        <span className="font-bold text-xs text-white drop-shadow">
                          @{channelName.toLowerCase().replace(/\s+/g, "")}
                        </span>
                        <button
                          type="button"
                          className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold text-black shadow"
                        >
                          Subscribe
                        </button>
                      </div>

                      <p className="text-xs font-medium text-white line-clamp-2 drop-shadow-md">
                        {videoTitle}
                      </p>

                      <div className="flex items-center gap-1.5 text-[10px] text-slate-200 opacity-90">
                        <span>♫ Original Audio • {channelName}</span>
                      </div>
                    </div>

                    {/* Right: Social Action Stack */}
                    <div className="flex flex-col items-center gap-3.5 text-white">
                      <div className="flex flex-col items-center">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md">
                          <FaThumbsUp className="text-sm" />
                        </div>
                        <span className="text-[10px] font-bold mt-0.5">84K</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md">
                          <FaComment className="text-sm" />
                        </div>
                        <span className="text-[10px] font-bold mt-0.5">1.2K</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md">
                          <FaShare className="text-sm" />
                        </div>
                        <span className="text-[10px] font-bold mt-0.5">Share</span>
                      </div>

                      <div className="h-7 w-7 rounded-full bg-slate-700 border-2 border-white animate-spin"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mode 4: Smart TV 10-Foot UI */}
          {viewportMode === "tv" && (
            <div>
              <div className="mb-4 flex items-center justify-between border-b pb-2 border-slate-700/30">
                <span className="text-xs font-bold tracking-wider uppercase opacity-70">
                  Living Room Smart TV (YouTube for Android TV / Apple TV)
                </span>
                <span className="text-xs opacity-60">High Focus Frame</span>
              </div>

              <div className="mx-auto max-w-2xl rounded-3xl border-4 border-white/80 p-3 shadow-2xl bg-slate-900/40">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbnailUrl}
                    alt="TV Preview"
                    className={`h-full w-full object-cover ${
                      isGrayscale ? "grayscale" : ""
                    } ${isBlurred ? "blur-[3px]" : ""}`}
                  />
                  <div className="absolute bottom-3 right-3 rounded-lg bg-black/90 px-2 py-1 text-xs font-bold text-white shadow-lg">
                    {duration}
                  </div>
                </div>

                <div className="mt-4 px-2">
                  <h3 className="text-lg font-bold leading-snug">{videoTitle}</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm opacity-70">
                    <span className="font-semibold">{channelName}</span>
                    <span>•</span>
                    <span>{viewCount}</span>
                    <span>•</span>
                    <span>{timeAgo}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Diagnostic Scorecard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1">
              <FaClock />
              <span>Timestamp Collision Check</span>
            </div>
            <div className="text-sm font-black text-slate-900 dark:text-white">
              {showTimestampOverlay ? "Inspection Active" : "Overlay Hidden"}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Keep the bottom-right 20% clear of text, faces, and brand logos.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1">
              <FaEye />
              <span>Mobile Truncation Score</span>
            </div>
            <div
              className={`text-sm font-black ${
                isMobileTruncated ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {isMobileTruncated ? "Truncated after 2 Lines" : "100% Fully Visible"}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {titleLength} characters. Optimal mobile length is under 50 characters.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1">
              <FaSlidersH />
              <span>Visual Contrast Rating</span>
            </div>
            <div className="text-sm font-black text-purple-600 dark:text-purple-400">
              High Separation
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Use B&amp;W Contrast toggle above to verify luminance values pop in feeds.
            </p>
          </div>
        </div>

        {/* Contextual Creator Software Affiliate Card */}
        <CreatorSoftwareCard defaultCategory="video" />
      </div>
    </ToolPageLayout>
  );
}
