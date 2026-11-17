"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FaArrowRight,
  FaAt,
  FaChartLine,
  FaCrown,
  FaExternalLinkAlt,
  FaFire,
  FaImage,
  FaMagic,
  FaSearch,
  FaSortAmountDown,
  FaSpinner,
} from "react-icons/fa";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import PresetPills from "@/components/ui/PresetPills";
import ErrorNotice from "@/components/ui/ErrorNotice";
import ToolEmptyState from "@/components/ui/ToolEmptyState";
import SaveToVideoPackButton from "@/components/video-pack/SaveToVideoPackButton";
import { useVideoPack } from "@/context/VideoPackContext";
import { saveHistory } from "@/lib/history";
import YouTubeApiAttribution from "@/components/ui/YouTubeApiAttribution";
import type {
  ChannelScanResult,
  ScannedChannelVideo,
} from "@/app/api/channel-outlier-scanner/route";

type SortMode = "outlier" | "views" | "newest";

const CHANNEL_PRESETS = [
  { label: "@mkbhd", handle: "@mkbhd" },
  { label: "@Veritasium", handle: "@veritasium" },
  { label: "@MrBeast", handle: "@MrBeast" },
  { label: "@AliAbdaal", handle: "@aliabdaal" },
];

function computeMedianViews(videos: ScannedChannelVideo[]): number {
  if (videos.length === 0) return 0;
  const sorted = [...videos].map((v) => v.views).sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) {
    return sorted[mid];
  }
  return Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

function formatCompactCount(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatPublishedDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

async function fetchChannelScan(
  handleOrUrl: string,
  signal?: AbortSignal,
): Promise<{ data?: ChannelScanResult; error?: string }> {
  const res = await fetch(
    `/api/channel-outlier-scanner?handle=${encodeURIComponent(handleOrUrl.trim())}`,
    { signal },
  );
  const data = await res.json();
  if (!res.ok) {
    return { error: data.error || "Could not scan that YouTube channel." };
  }
  return { data: data as ChannelScanResult };
}

function ChannelOutlierQuerySync({
  onStatus,
  onResult,
}: {
  onStatus: (trimmed: string, busy: boolean) => void;
  onResult: (data: ChannelScanResult | null, err: string) => void;
}) {
  const searchParams = useSearchParams();
  const urlHandle = (searchParams.get("handle") || searchParams.get("query") || "").trim();

  useEffect(() => {
    if (!urlHandle) return;
    const controller = new AbortController();

    Promise.resolve()
      .then(() => {
        if (controller.signal.aborted) return null;
        onStatus(urlHandle, true);
        return fetchChannelScan(urlHandle, controller.signal);
      })
      .then((res) => {
        if (!res || controller.signal.aborted) return;
        if (res.error) {
          onResult(null, res.error);
        } else {
          onResult(res.data || null, "");
        }
      })
      .catch((err) => {
        if (controller.signal.aborted || (err instanceof Error && err.name === "AbortError")) {
          return;
        }
        onResult(null, "Failed to fetch channel uploads. Please try again.");
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          onStatus(urlHandle, false);
        }
      });

    return () => controller.abort();
  }, [urlHandle, onStatus, onResult]);

  return null;
}

export default function ChannelOutlierScanner() {
  const [query, setQuery] = useState("");
  const [scanResult, setScanResult] = useState<ChannelScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [excludeShorts, setExcludeShorts] = useState(true);
  const [sortBy, setSortBy] = useState<SortMode>("outlier");
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const { saveIdea, pack } = useVideoPack();

  const handleQueryStatus = useCallback((trimmed: string, busy: boolean) => {
    setQuery(trimmed);
    setLoading(busy);
  }, []);

  const handleQueryResult = useCallback(
    (data: ChannelScanResult | null, err: string) => {
      setError(err);
      setScanResult(data);
    },
    [],
  );

  const handleScan = async (overrideHandle?: string) => {
    const target = (overrideHandle ?? query).trim();
    if (!target) {
      setError("Enter a YouTube @handle, channel URL, or UC... channel ID.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await fetchChannelScan(target);
      if (result.error) {
        setError(result.error);
        setScanResult(null);
        return;
      }

      if (result.data) {
        setScanResult(result.data);
        try {
          await saveHistory("channel-outlier-scanner", {
            handle: target,
            channelTitle: result.data.channel.title,
            videoCount: result.data.videos.length,
          });
        } catch {
          // Non-fatal
        }
      }
    } catch {
      setError("Network error while scanning channel. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const shortsCount = useMemo(() => {
    if (!scanResult) return 0;
    return scanResult.videos.filter((v) => v.isShort).length;
  }, [scanResult]);

  const analyzed = useMemo(() => {
    if (!scanResult) {
      return {
        medianViews: 0,
        items: [] as Array<ScannedChannelVideo & { multiplier: number }>,
        outlierCount: 0,
        peakMultiplier: 0,
      };
    }

    const baseList = excludeShorts
      ? scanResult.videos.filter((v) => !v.isShort)
      : scanResult.videos;

    const effectiveList = baseList.length > 0 ? baseList : scanResult.videos;
    const medianViews = computeMedianViews(effectiveList);
    const divisor = Math.max(1, medianViews);

    const withMultiplier = effectiveList.map((video) => ({
      ...video,
      multiplier: video.views / divisor,
    }));

    const sorted = [...withMultiplier].sort((a, b) => {
      if (sortBy === "views") return b.views - a.views;
      if (sortBy === "newest") {
        return Date.parse(b.publishedAt || "") - Date.parse(a.publishedAt || "");
      }
      return b.multiplier - a.multiplier;
    });

    const outlierCount = withMultiplier.filter((v) => v.multiplier >= 2).length;
    const peakMultiplier = withMultiplier.reduce(
      (max, v) => (v.multiplier > max ? v.multiplier : max),
      0,
    );

    return {
      medianViews,
      items: sorted,
      outlierCount,
      peakMultiplier,
    };
  }, [scanResult, excludeShorts, sortBy]);

  return (
    <ToolPageLayout
      title="Channel @Handle Outlier & Viral Multiplier Scanner"
      slug="channel-outlier-scanner"
      description="Scan any YouTube @handle or channel URL to compute median baseline views, pinpoint 2x–10x breakout outlier videos, and remix winning titles."
    >
      <Suspense fallback={null}>
        <ChannelOutlierQuerySync
          onStatus={handleQueryStatus}
          onResult={handleQueryResult}
        />
      </Suspense>
      <div className="space-y-8">
        {/* Input Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <PresetPills
            label="Scan sample channel"
            options={CHANNEL_PRESETS.map((p, idx) => ({ id: `preset-${idx}`, label: p.label }))}
            activeId={activePreset}
            onSelect={(id) => {
              const preset = CHANNEL_PRESETS[Number(id.replace("preset-", ""))];
              if (!preset) return;
              setActivePreset(id);
              setQuery(preset.handle);
              void handleScan(preset.handle);
            }}
          />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleScan();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <FaAt
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400"
                aria-hidden="true"
              />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Paste @ChannelHandle or https://youtube.com/@mkbhd"
                aria-label="YouTube channel handle or URL"
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={loading} className="shrink-0">
              {loading ? (
                <>
                  <FaSpinner className="mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <FaSearch className="mr-2" />
                  Scan Outliers
                </>
              )}
            </Button>
          </form>
        </div>

        {error && <ErrorNotice message={error} onRetry={() => void handleScan()} />}

        {!scanResult && !loading && !error && (
          <ToolEmptyState
            icon={<FaFire />}
            title="Scan any YouTube channel's recent uploads"
            description="Calculates true median views (not inflated mean averages) and flags every video scoring 2.0x or higher against that baseline."
          />
        )}

        {scanResult && (
          <div className="space-y-6">
            {/* Channel Header & Metrics */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div className="flex items-center gap-4 min-w-0">
                  {scanResult.channel.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={scanResult.channel.avatar}
                      alt={scanResult.channel.title}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-xl shrink-0">
                      {scanResult.channel.title.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-outfit truncate">
                        {scanResult.channel.title}
                      </h2>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                          scanResult.dataSource === "youtube-api"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}
                      >
                        {scanResult.dataSource === "youtube-api"
                          ? `YouTube API (${scanResult.quotaUnitsEstimated} quota units)`
                          : "Public RSS XML Fallback"}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-purple-700 font-semibold mt-0.5">
                      {scanResult.channel.handle}
                      {scanResult.channel.subscribers !== null &&
                        ` · ${formatCompactCount(scanResult.channel.subscribers)} subscribers`}
                      {scanResult.channel.totalViews !== null &&
                        ` · ${formatCompactCount(scanResult.channel.totalViews)} channel views`}
                    </p>
                  </div>
                </div>

                <Link
                  href="/tools/youtube-outlier-calculator"
                  className="text-xs font-bold text-slate-600 hover:text-purple-700 inline-flex items-center gap-1 shrink-0"
                >
                  Open Manual Outlier Ratio Calculator <FaArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {scanResult.note && (
                <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-2.5 text-xs font-medium text-amber-900">
                  {scanResult.note}
                </div>
              )}

              {/* KPI Strip */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Channel Median Views
                  </span>
                  <span className="text-lg xl:text-xl font-black text-slate-900 font-outfit tabular-nums block leading-snug mt-0.5 break-all sm:break-normal">
                    {analyzed.medianViews.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Baseline across {analyzed.items.length} videos
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                    Breakout Outliers (&ge;2.0x)
                  </span>
                  <span className="text-lg xl:text-xl font-black text-emerald-800 font-outfit tabular-nums block leading-snug mt-0.5">
                    {analyzed.outlierCount}
                  </span>
                  <span className="text-[11px] text-emerald-700 block mt-0.5">
                    High-demand topic signals
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">
                    Top Outlier Multiplier
                  </span>
                  <span className="text-lg xl:text-xl font-black text-amber-900 font-outfit tabular-nums block leading-snug mt-0.5">
                    {analyzed.peakMultiplier.toFixed(1)}x
                  </span>
                  <span className="text-[11px] text-amber-800 block mt-0.5">
                    vs channel median
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 block">
                    Uploads Fetched
                  </span>
                  <span className="text-lg xl:text-xl font-black text-purple-900 font-outfit tabular-nums block leading-snug mt-0.5">
                    {scanResult.videos.length}
                  </span>
                  <span className="text-[11px] text-purple-800 block mt-0.5">
                    {shortsCount} Short{shortsCount === 1 ? "" : "s"} detected
                  </span>
                </div>
              </div>

              {/* Controls: Exclude Shorts Toggle + Sort Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={excludeShorts}
                    onChange={(e) => setExcludeShorts(e.target.checked)}
                    className="w-4 h-4 rounded accent-purple-600 cursor-pointer"
                  />
                  <span className="text-sm font-bold text-slate-800">
                    Exclude Shorts (&le;60s)
                  </span>
                  {shortsCount > 0 && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {excludeShorts ? `${shortsCount} hidden` : `${shortsCount} included`}
                    </span>
                  )}
                </label>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 inline-flex items-center gap-1 mr-1">
                    <FaSortAmountDown className="w-3 h-3" /> Sort:
                  </span>
                  {(
                    [
                      { id: "outlier", label: "Outlier Score" },
                      { id: "views", label: "Views" },
                      { id: "newest", label: "Newest" },
                    ] as const
                  ).map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSortBy(option.id)}
                      className={`cursor-pointer px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                        sortBy === option.id
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Video Outlier Rows */}
            <div className="space-y-3">
              {analyzed.items.map((video) => {
                const isMegaOutlier = video.multiplier >= 5;
                const isOutlier = video.multiplier >= 2;
                const multiplierText = `${video.multiplier.toFixed(1)}x`;
                const isSaved = pack.titleVariants.includes(video.title);

                return (
                  <div
                    key={video.id}
                    className={`rounded-2xl p-4 sm:p-5 border transition-all bg-white shadow-2xs ${
                      isMegaOutlier
                        ? "border-amber-300 ring-1 ring-amber-200/70"
                        : isOutlier
                          ? "border-emerald-300 ring-1 ring-emerald-200/60"
                          : "border-slate-200"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-4 items-start">
                      {/* Thumbnail */}
                      <div className="relative w-full md:w-52 aspect-video rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1.5 right-1.5 bg-black/85 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
                          {video.durationFormatted}
                        </span>
                        {video.isShort && (
                          <span className="absolute top-1.5 left-1.5 bg-rose-600 text-white text-[10px] font-black uppercase px-1.5 py-0.5 rounded">
                            Short
                          </span>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 space-y-2.5 w-full">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${
                              isMegaOutlier
                                ? "bg-amber-100 text-amber-900 border-amber-300"
                                : isOutlier
                                  ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                                  : "bg-slate-100 text-slate-700 border-slate-200"
                            }`}
                          >
                            {isMegaOutlier ? (
                              <FaCrown className="w-3.5 h-3.5 text-amber-600" />
                            ) : isOutlier ? (
                              <FaFire className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <FaChartLine className="w-3.5 h-3.5 text-slate-500" />
                            )}
                            <span>
                              {multiplierText} {isOutlier ? "Outlier" : "Baseline"}
                            </span>
                          </span>

                          <div className="flex items-center gap-3 text-xs text-slate-600 font-semibold">
                            <span className="text-slate-900 font-extrabold">
                              {video.views.toLocaleString()} views
                            </span>
                            {video.publishedAt && <span>{formatPublishedDate(video.publishedAt)}</span>}
                          </div>
                        </div>

                        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                          {video.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <Link
                            href={`/tools/youtube-title-generator?topic=${encodeURIComponent(video.title)}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors shadow-2xs"
                          >
                            <FaMagic className="w-3 h-3" />
                            <span>Remix This Title</span>
                          </Link>

                          <Link
                            href={`/tools/thumbnail-critique?v=${encodeURIComponent(video.id)}&title=${encodeURIComponent(video.title)}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                          >
                            <FaImage className="w-3 h-3 text-pink-600" />
                            <span>Critique Thumbnail</span>
                          </Link>

                          <SaveToVideoPackButton
                            compact
                            label="Save Angle"
                            isAlreadySaved={isSaved}
                            toastMessage="Saved outlier angle to Active Video Pack!"
                            onSave={() =>
                              saveIdea({
                                title: video.title,
                                topic: video.title,
                                notes: `Outlier Inspiration (${multiplierText} · ${video.views.toLocaleString()} views on ${scanResult.channel.title})`,
                              })
                            }
                          />

                          <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-purple-700"
                          >
                            <span>Watch</span>
                            <FaExternalLinkAlt className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <YouTubeApiAttribution />
      </div>
    </ToolPageLayout>
  );
}
