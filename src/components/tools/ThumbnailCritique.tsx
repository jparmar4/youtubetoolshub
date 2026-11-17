"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FaArrowRight,
  FaCheckCircle,
  FaDesktop,
  FaExclamationTriangle,
  FaEye,
  FaEyeSlash,
  FaImage,
  FaLightbulb,
  FaMobileAlt,
  FaMoon,
  FaSearch,
  FaSlidersH,
  FaSun,
  FaUpload,
} from "react-icons/fa";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import PresetPills from "@/components/ui/PresetPills";
import UsageBanner from "@/components/ui/UsageBanner";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import ErrorNotice from "@/components/ui/ErrorNotice";
import ToolEmptyState from "@/components/ui/ToolEmptyState";
import ShareResultCardButton from "@/components/tools/ShareResultCardButton";
import SaveToVideoPackButton from "@/components/video-pack/SaveToVideoPackButton";
import { useUsage } from "@/hooks/useUsage";
import { useVideoPack } from "@/context/VideoPackContext";
import { saveHistory } from "@/lib/history";
import { extractVideoId } from "@/lib/utils";
import type { ThumbnailCritiqueResult } from "@/app/api/thumbnail-critique/route";

const MAX_CLIENT_WIDTH = 1024;

const SAMPLE_VIDEOS = [
  {
    label: "Tech Comparison",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "Why Creators Switched Back After 30 Days",
  },
  {
    label: "Creator Documentary",
    url: "https://www.youtube.com/watch?v=Bey4XXJAqS8",
    title: "48 Hours Alone in the Arctic Wilderness",
  },
];

interface LoadedThumbnail {
  dataUrl: string;
  originalWidth: number;
  originalHeight: number;
  resizedWidth: number;
  resizedHeight: number;
  sourceLabel: string;
}

function resizeImageElementToMaxWidth(
  img: HTMLImageElement,
  sourceLabel: string,
): LoadedThumbnail {
  const origW = img.naturalWidth || 1280;
  const origH = img.naturalHeight || 720;
  const scale = origW > MAX_CLIENT_WIDTH ? MAX_CLIENT_WIDTH / origW : 1;
  const targetW = Math.max(1, Math.round(origW * scale));
  const targetH = Math.max(1, Math.round(origH * scale));

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas image processing unavailable in this browser.");
  }
  ctx.drawImage(img, 0, 0, targetW, targetH);

  let dataUrl = canvas.toDataURL("image/jpeg", 0.86);
  if (dataUrl.length > 1_200_000) {
    dataUrl = canvas.toDataURL("image/jpeg", 0.72);
  }

  return {
    dataUrl,
    originalWidth: origW,
    originalHeight: origH,
    resizedWidth: targetW,
    resizedHeight: targetH,
    sourceLabel,
  };
}

async function loadAndResizeFromUrl(
  src: string,
  sourceLabel: string,
): Promise<LoadedThumbnail> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      try {
        resolve(resizeImageElementToMaxWidth(img, sourceLabel));
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = () => reject(new Error("Could not decode image."));
    img.src = src;
  });
}

async function fetchYouTubeThumbnailViaProxy(videoId: string): Promise<LoadedThumbnail> {
  const candidates = [
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
  ];

  for (const remoteUrl of candidates) {
    try {
      const proxySrc = `/api/download-image?url=${encodeURIComponent(remoteUrl)}`;
      const resp = await fetch(proxySrc);
      if (!resp.ok) continue;
      const blob = await resp.blob();
      if (blob.size < 1_000) continue;
      const objectUrl = URL.createObjectURL(blob);
      try {
        const resized = await loadAndResizeFromUrl(objectUrl, `YouTube ID: ${videoId}`);
        return resized;
      } finally {
        URL.revokeObjectURL(objectUrl);
      }
    } catch {
      // Try lower quality fallback
    }
  }

  throw new Error("Could not load thumbnail for that YouTube video URL.");
}

function getScoreBadgeClasses(score: number): string {
  if (score >= 80) return "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (score >= 60) return "text-amber-700 bg-amber-50 border-amber-200";
  return "text-rose-700 bg-rose-50 border-rose-200";
}

export default function ThumbnailCritique() {
  const searchParams = useSearchParams();
  const initialVideoParam = searchParams.get("v") || searchParams.get("url") || "";
  const initialTitleParam = searchParams.get("title") || "";

  const [prevUrlParam, setPrevUrlParam] = useState(initialVideoParam);
  const [prevTitleParam, setPrevTitleParam] = useState(initialTitleParam);

  const [videoUrl, setVideoUrl] = useState(initialVideoParam);
  const [videoTitle, setVideoTitle] = useState(initialTitleParam);

  if (initialVideoParam && initialVideoParam !== prevUrlParam) {
    setPrevUrlParam(initialVideoParam);
    setVideoUrl(initialVideoParam);
  }
  if (initialTitleParam && initialTitleParam !== prevTitleParam) {
    setPrevTitleParam(initialTitleParam);
    setVideoTitle(initialTitleParam);
  }

  const [loadedImage, setLoadedImage] = useState<LoadedThumbnail | null>(null);
  const [loadingImage, setLoadingImage] = useState(() => Boolean(extractVideoId(initialVideoParam)));
  const [critiquing, setCritiquing] = useState(false);
  const [error, setError] = useState("");
  const [critique, setCritique] = useState<ThumbnailCritiqueResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Interactive preview controls
  const [feedTheme, setFeedTheme] = useState<"dark" | "light">("dark");
  const [glanceBlur, setGlanceBlur] = useState(false);
  const [isGlanceFlashing, setIsGlanceFlashing] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const glanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();
  const { updatePack, pack } = useVideoPack();

  useEffect(() => {
    return () => {
      if (glanceTimerRef.current) clearTimeout(glanceTimerRef.current);
    };
  }, []);

  // Auto-load initial YouTube thumbnail when navigated via /watch?v=... or ?v=...
  useEffect(() => {
    const id = extractVideoId(initialVideoParam);
    if (!id) return;

    let cancelled = false;
    fetchYouTubeThumbnailViaProxy(id)
      .then((thumb) => {
        if (!cancelled) {
          setLoadedImage(thumb);
          setError("");
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load thumbnail from URL.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingImage(false);
      });

    return () => {
      cancelled = true;
    };
  }, [initialVideoParam]);

  const handleFileProcess = useCallback(async (file: File) => {
    if (!file.type.match(/^image\/(png|jpeg|jpg|webp)$/i)) {
      setError("Please upload a PNG, JPG, or WebP image file.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError("Image file is over 20 MB. Choose a smaller file.");
      return;
    }

    setError("");
    setLoadingImage(true);
    setCritique(null);

    const objectUrl = URL.createObjectURL(file);
    try {
      const resized = await loadAndResizeFromUrl(objectUrl, file.name);
      setLoadedImage(resized);
    } catch {
      setError("Could not read and resize that image. Try another PNG, JPG, or WebP.");
    } finally {
      URL.revokeObjectURL(objectUrl);
      setLoadingImage(false);
    }
  }, []);

  const handleLoadUrl = async (targetUrl?: string) => {
    const input = (targetUrl ?? videoUrl).trim();
    const id = extractVideoId(input);
    if (!id) {
      setError("Enter a valid YouTube Video URL, Shorts URL, or 11-character video ID.");
      return;
    }

    setError("");
    setLoadingImage(true);
    setCritique(null);
    try {
      const thumb = await fetchYouTubeThumbnailViaProxy(id);
      setLoadedImage(thumb);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not fetch YouTube thumbnail.");
    } finally {
      setLoadingImage(false);
    }
  };

  const triggerGlanceFlash = () => {
    if (glanceTimerRef.current) clearTimeout(glanceTimerRef.current);
    setGlanceBlur(false);
    setIsGlanceFlashing(true);
    glanceTimerRef.current = setTimeout(() => {
      setGlanceBlur(true);
      setIsGlanceFlashing(false);
    }, 1500);
  };

  const handleRunCritique = async () => {
    if (!loadedImage && !extractVideoId(videoUrl)) {
      setError("Upload a thumbnail image or load a YouTube video URL first.");
      return;
    }

    if (!checkLimit("thumbnail-critique")) {
      return;
    }

    setError("");
    setCritiquing(true);

    try {
      const response = await fetch("/api/thumbnail-critique", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageDataUrl: loadedImage?.dataUrl,
          videoUrl: loadedImage ? undefined : videoUrl.trim(),
          videoTitle: videoTitle.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        setError(data.error || "Failed to analyze thumbnail.");
        return;
      }

      const result = data.critique as ThumbnailCritiqueResult;
      setCritique(result);
      increment("thumbnail-critique");

      try {
        await saveHistory("thumbnail-critique", {
          videoTitle: videoTitle.trim(),
          sourceLabel: loadedImage?.sourceLabel || videoUrl.trim(),
          critique: result,
        });
      } catch {
        // Non-fatal
      }
    } catch {
      setError("Network error while analyzing thumbnail. Please try again.");
    } finally {
      setCritiquing(false);
    }
  };

  const displayTitle =
    videoTitle.trim() || "How to Double YouTube CTR Without Clickbait (2026 Blueprint)";

  return (
    <ToolPageLayout
      title="AI Thumbnail Vision Critique & Glance Test"
      slug="thumbnail-critique"
      description="Audit thumbnail mobile legibility, text word count, and title redundancy across 168px mobile & 320px desktop YouTube feeds."
    >
      <div className="space-y-8">
        <UsageBanner type="ai" toolSlug="thumbnail-critique" />
        <LimitReachedModal
          isOpen={!!limitReachedTool}
          onClose={closeLimitModal}
          toolSlug={limitReachedTool}
        />

        {/* Inputs Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <PresetPills
              label="Try sample YouTube video"
              options={SAMPLE_VIDEOS.map((s, idx) => ({ id: `sample-${idx}`, label: s.label }))}
              activeId={activePreset}
              onSelect={(id) => {
                const sample = SAMPLE_VIDEOS[Number(id.replace("sample-", ""))];
                if (!sample) return;
                setActivePreset(id);
                setVideoUrl(sample.url);
                setVideoTitle(sample.title);
                void handleLoadUrl(sample.url);
              }}
            />
            <Link
              href="/tools/ab-packaging-studio"
              className="text-xs font-bold text-purple-700 hover:underline inline-flex items-center gap-1"
            >
              Need 3 A/B concepts first? Open A/B Packaging Studio <FaArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Drag & Drop Uploader */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                1. Upload Thumbnail (PNG, JPG, WebP · Auto-resized to 1024px)
              </label>
              <div
                role="button"
                tabIndex={0}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  const dropped = e.dataTransfer.files?.[0];
                  if (dropped) void handleFileProcess(dropped);
                }}
                className={`rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
                  dragActive
                    ? "border-purple-600 bg-purple-50"
                    : "border-slate-300 hover:border-purple-400 bg-slate-50/70"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const selected = e.target.files?.[0];
                    if (selected) void handleFileProcess(selected);
                  }}
                />
                <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-3">
                  <FaUpload className="w-5 h-5" aria-hidden="true" />
                </div>
                <p className="text-sm font-bold text-slate-800">
                  Drag &amp; drop a thumbnail here, or click to browse
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Automatically resized client-side to max 1024px wide for instant Vision AI analysis
                </p>
                {loadedImage && (
                  <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    <FaCheckCircle className="w-3 h-3" />
                    Ready: {loadedImage.sourceLabel} ({loadedImage.resizedWidth}×{loadedImage.resizedHeight})
                  </p>
                )}
              </div>
            </div>

            {/* Or Load YouTube URL + Video Title */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Or Auto-Load from YouTube Video URL
                </label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => {
                      const next = e.target.value;
                      setVideoUrl(next);
                      if (
                        (next.includes("youtube.com") || next.includes("youtu.be")) &&
                        extractVideoId(next)
                      ) {
                        void handleLoadUrl(next);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        void handleLoadUrl();
                      }
                    }}
                    placeholder="https://www.youtube.com/watch?v=... or Shorts link"
                    aria-label="YouTube Video URL for thumbnail critique"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => void handleLoadUrl()}
                    isLoading={loadingImage}
                    className="shrink-0"
                  >
                    <FaSearch className="mr-1.5 w-3.5 h-3.5" />
                    Load
                  </Button>
                </div>
              </div>

              <Input
                label="2. Video Title (Tests Title-Thumbnail Redundancy)"
                type="text"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="e.g., Why Most Creators Fail in Their First 90 Days"
                helperText="Recommended: pair a visual emotion/outcome in the image with curiosity in your title."
              />
            </div>
          </div>

          <Button
            type="button"
            variant="cta"
            onClick={() => void handleRunCritique()}
            isLoading={critiquing}
            disabled={loadingImage}
            className="w-full py-4 text-base sm:text-lg"
          >
            <FaEye className="mr-2" />
            {critiquing ? "Running Vision AI Critique..." : "Run AI Thumbnail Vision Critique"}
          </Button>
        </div>

        {error && <ErrorNotice message={error} onRetry={() => void handleRunCritique()} />}

        {/* Interactive Side-by-Side Preview Stage (168px Mobile vs 320px Desktop) */}
        {loadedImage ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 font-outfit flex items-center gap-2">
                  <FaSlidersH className="text-purple-600" />
                  <span>Interactive Feed &amp; 1.5s Glance Stage</span>
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Compare exact YouTube Mobile Feed (168px) and Desktop Home (320px) rendering before publishing.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFeedTheme((t) => (t === "dark" ? "light" : "dark"))}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  {feedTheme === "dark" ? (
                    <>
                      <FaMoon className="text-indigo-600" /> Dark Feed
                    </>
                  ) : (
                    <>
                      <FaSun className="text-amber-500" /> Light Feed
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setGlanceBlur((b) => !b)}
                  className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-colors ${
                    glanceBlur
                      ? "bg-amber-50 border-amber-300 text-amber-800"
                      : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {glanceBlur ? <FaEyeSlash /> : <FaEye />}
                  <span>{glanceBlur ? "Glance Blur: ON" : "Glance Blur: OFF"}</span>
                </button>

                <button
                  type="button"
                  onClick={triggerGlanceFlash}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs"
                >
                  <span>{isGlanceFlashing ? "Glancing (1.5s)..." : "Simulate 1.5s Glance"}</span>
                </button>
              </div>
            </div>

            <div
              className={`rounded-2xl p-6 transition-colors border ${
                feedTheme === "dark"
                  ? "bg-[#0f0f0f] border-slate-800 text-white"
                  : "bg-slate-50 border-slate-200 text-slate-900"
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start justify-around gap-8">
                {/* Mobile Feed 168px */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-75">
                    <FaMobileAlt />
                    <span>Mobile Feed (168px)</span>
                  </div>
                  <div className="w-[168px] space-y-2">
                    <div className="relative aspect-video w-[168px] rounded-lg overflow-hidden bg-slate-800 shadow-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={loadedImage.dataUrl}
                        alt="168px mobile feed thumbnail preview"
                        className={`w-full h-full object-cover transition-all duration-300 ${
                          glanceBlur ? "blur-[2.5px] scale-[1.02]" : ""
                        }`}
                      />
                      <span className="absolute bottom-1 right-1 bg-black/85 text-white text-[10px] font-bold px-1 py-0.5 rounded">
                        12:48
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[12px] font-semibold leading-snug line-clamp-2">
                        {displayTitle}
                      </p>
                      <p className="text-[10px] opacity-65">Your Channel · 42K views</p>
                    </div>
                  </div>
                </div>

                {/* Desktop Home 320px */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-75">
                    <FaDesktop />
                    <span>Desktop Home (320px)</span>
                  </div>
                  <div className="w-full max-w-[320px] sm:w-[320px] space-y-3">
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-800 shadow-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={loadedImage.dataUrl}
                        alt="320px desktop feed thumbnail preview"
                        className={`w-full h-full object-cover transition-all duration-300 ${
                          glanceBlur ? "blur-[2.5px] scale-[1.02]" : ""
                        }`}
                      />
                      <span className="absolute bottom-2 right-2 bg-black/85 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                        12:48
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 shrink-0 flex items-center justify-center text-white text-xs font-black">
                        YT
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold leading-snug line-clamp-2">
                          {displayTitle}
                        </p>
                        <p className="text-xs opacity-70 mt-0.5">
                          Your Channel · 42K views · 3 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ToolEmptyState
            icon={<FaImage />}
            title="Upload a thumbnail or load a YouTube video URL"
            description="Preview your design side-by-side at 168px mobile feed width and 320px desktop Home width, toggle the 1.5s glance blur, and run an instant AI Vision critique."
          />
        )}

        {/* Structured AI Vision Critique Results */}
        {critique && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700">
                  Vision AI Audit Report
                </span>
                <h2 className="text-2xl font-black text-slate-900 font-outfit">
                  Packaging &amp; Legibility Breakdown
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <ShareResultCardButton
                  badgeText="AI Thumbnail Glance Test"
                  headline={`${critique.overallScore}/100 Thumbnail Packaging Score`}
                  subtitle={videoTitle.trim() ? `Title tested: "${videoTitle.trim()}"` : "Mobile 168px legibility & title redundancy audit"}
                  accent={critique.overallScore >= 80 ? "emerald" : critique.overallScore >= 60 ? "amber" : "purple"}
                  filename="youtube-thumbnail-critique-score.png"
                  metrics={[
                    {
                      label: "Mobile 168px Legibility",
                      value: `${critique.mobileReadability}/100`,
                    },
                    {
                      label: "Detected Overlay Words",
                      value: `${critique.detectedTextWords} words`,
                    },
                    {
                      label: "Title Synergy Check",
                      value: critique.redundancyAlert ? "Repeats Title" : "Complementary",
                    },
                  ]}
                />
                <SaveToVideoPackButton
                  toastMessage="Saved thumbnail critique fixes to Active Video Pack!"
                  onSave={() =>
                    updatePack({
                      selectedTitle: videoTitle.trim() || pack.selectedTitle,
                      thumbnailPrompt:
                        pack.thumbnailPrompt ||
                        `Thumbnail fixes (${critique.overallScore}/100): ${critique.highImpactFixes.join(" | ")}`,
                      notes: [
                        pack.notes,
                        `Thumbnail Critique (${critique.overallScore}/100, Mobile ${critique.mobileReadability}/100):\n- ${critique.highImpactFixes.join("\n- ")}`,
                      ]
                        .filter(Boolean)
                        .join("\n\n"),
                    })
                  }
                />
              </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className={`p-4 rounded-2xl border ${getScoreBadgeClasses(critique.overallScore)}`}>
                <span className="text-xs font-bold uppercase tracking-wider block opacity-80">
                  Overall CTR Score
                </span>
                <span className="text-3xl font-black font-outfit">{critique.overallScore}/100</span>
              </div>

              <div
                className={`p-4 rounded-2xl border ${getScoreBadgeClasses(critique.mobileReadability)}`}
              >
                <span className="text-xs font-bold uppercase tracking-wider block opacity-80">
                  Mobile 168px Legibility
                </span>
                <span className="text-3xl font-black font-outfit">
                  {critique.mobileReadability}/100
                </span>
              </div>

              <div
                className={`p-4 rounded-2xl border ${
                  critique.detectedTextWords > 4
                    ? "bg-rose-50 border-rose-200 text-rose-800"
                    : "bg-emerald-50 border-emerald-200 text-emerald-800"
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider block opacity-80">
                  Detected Overlay Words
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black font-outfit">
                    {critique.detectedTextWords}
                  </span>
                  <span className="text-xs font-bold">
                    {critique.detectedTextWords > 4 ? "(Warning: >4 words)" : "(Optimal <=4 words)"}
                  </span>
                </div>
              </div>
            </div>

            {/* Word-Count Warning Banner */}
            {critique.detectedTextWords > 4 && (
              <div className="rounded-2xl bg-amber-50 border border-amber-300 p-4 flex items-start gap-3 text-amber-900">
                <FaExclamationTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-extrabold">
                    Text Overload Warning ({critique.detectedTextWords} words detected)
                  </p>
                  <p className="text-amber-800 mt-0.5">
                    Thumbnails with more than 4 words force viewers to squint at 168px mobile feed width. Cut text down to 2–3 bold punch words so the image wins the 1.5-second glance test.
                  </p>
                </div>
              </div>
            )}

            {/* Redundancy Alert */}
            <div
              className={`rounded-2xl p-4 border flex items-start gap-3 ${
                critique.redundancyAlert
                  ? "bg-rose-50 border-rose-200 text-rose-900"
                  : "bg-emerald-50 border-emerald-200 text-emerald-900"
              }`}
            >
              {critique.redundancyAlert ? (
                <FaExclamationTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              ) : (
                <FaCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              )}
              <div className="text-sm">
                <p className="font-extrabold">
                  {critique.redundancyAlert
                    ? "Title-Thumbnail Redundancy Alert"
                    : "Healthy Title-Thumbnail Synergy"}
                </p>
                <p className="mt-0.5 opacity-90">{critique.redundancyExplanation}</p>
              </div>
            </div>

            {/* Strengths & Fixes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-emerald-50/60 border border-emerald-200 p-5 space-y-3">
                <h3 className="font-extrabold text-emerald-900 flex items-center gap-2 text-base">
                  <FaCheckCircle className="text-emerald-600" />
                  <span>What Works Well</span>
                </h3>
                <ul className="space-y-2 text-sm text-slate-800">
                  {critique.whatWorks.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-black text-emerald-600">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-purple-50/60 border border-purple-200 p-5 space-y-3">
                <h3 className="font-extrabold text-purple-950 flex items-center gap-2 text-base">
                  <FaLightbulb className="text-purple-600" />
                  <span>3 High-Impact Fixes</span>
                </h3>
                <ol className="space-y-2.5 text-sm text-slate-800">
                  {critique.highImpactFixes.map((fix, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{fix}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Workflow Next-Step Cross-Links */}
            <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs font-bold">
              <span className="text-slate-500">Continue optimizing this upload:</span>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/tools/ab-packaging-studio"
                  className="text-purple-700 hover:underline inline-flex items-center gap-1"
                >
                  Generate 3 A/B Packaging Variants <FaArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  href={`/tools/hook-auditor${videoTitle ? `?title=${encodeURIComponent(videoTitle)}` : ""}`}
                  className="text-indigo-700 hover:underline inline-flex items-center gap-1"
                >
                  Audit First 30s Hook <FaArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
