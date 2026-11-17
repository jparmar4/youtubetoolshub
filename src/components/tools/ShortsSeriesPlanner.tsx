"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FaArrowRight,
  FaBolt,
  FaCheck,
  FaCopy,
  FaFilm,
  FaLink,
  FaListUl,
} from "react-icons/fa";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import PresetPills from "@/components/ui/PresetPills";
import UsageBanner from "@/components/ui/UsageBanner";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import ErrorNotice from "@/components/ui/ErrorNotice";
import ToolEmptyState from "@/components/ui/ToolEmptyState";
import CopyButton from "@/components/ui/CopyButton";
import SaveToVideoPackButton from "@/components/video-pack/SaveToVideoPackButton";
import { useUsage } from "@/hooks/useUsage";
import { useVideoPack } from "@/context/VideoPackContext";
import { saveHistory } from "@/lib/history";

export interface ShortsSeriesEpisode {
  partNumber: string;
  episodeTitle: string;
  openingHook: string;
  coreBeats: string[];
  cliffhangerBridge: string;
}

export interface ShortsSeriesPlan {
  seriesTitle: string;
  episodes: ShortsSeriesEpisode[];
}

const EPISODE_COUNT_OPTIONS = [3, 5, 7] as const;

const TONE_OPTIONS = [
  { value: "Educational Breakdown", label: "Educational Breakdown" },
  { value: "Story / Challenge", label: "Story / Challenge" },
  { value: "Case Study / Finance", label: "Case Study / Finance" },
  { value: "Tech / AI Tutorial", label: "Tech / AI Tutorial" },
];

const SERIES_PRESETS = [
  {
    label: "SaaS in 7 Days",
    topic: "Building a micro-SaaS from $0 to first paying customer in 7 days with AI coding tools",
    count: 5 as const,
    tone: "Case Study / Finance",
  },
  {
    label: "30-Day Desk Setup",
    topic: "Fixing every mistake in my cluttered creator studio on a strict $250 budget",
    count: 3 as const,
    tone: "Story / Challenge",
  },
  {
    label: "Local LLM Guide",
    topic: "Running private coding & video workflows locally without cloud API bills",
    count: 5 as const,
    tone: "Tech / AI Tutorial",
  },
  {
    label: "Algorithm Myths",
    topic: "Testing 5 YouTube growth rumors across 5 real uploads to see what moves CTR",
    count: 5 as const,
    tone: "Educational Breakdown",
  },
];

function parseSeriesResponse(raw: string, fallbackCount: number): ShortsSeriesPlan | null {
  const cleaned = raw
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();

  let parsed: unknown = null;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    const objMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!objMatch) return null;
    try {
      parsed = JSON.parse(objMatch[0]);
    } catch {
      return null;
    }
  }

  if (!parsed || typeof parsed !== "object") return null;
  const record = parsed as Record<string, unknown>;
  const seriesTitle =
    typeof record.seriesTitle === "string" && record.seriesTitle.trim()
      ? record.seriesTitle.trim()
      : "Untitled YouTube Shorts Watch Series";

  const rawEpisodes = Array.isArray(record.episodes) ? record.episodes : [];
  if (rawEpisodes.length === 0) return null;

  const episodes: ShortsSeriesEpisode[] = rawEpisodes
    .slice(0, fallbackCount)
    .map((entry: unknown, idx: number) => {
      const item =
        typeof entry === "object" && entry !== null
          ? (entry as Record<string, unknown>)
          : {};
      const beatsRaw = Array.isArray(item.coreBeats) ? item.coreBeats : [];
      const coreBeats = beatsRaw
        .filter((b): b is string => typeof b === "string" && b.trim().length > 0)
        .slice(0, 3);

      return {
        partNumber:
          typeof item.partNumber === "string" && item.partNumber.trim()
            ? item.partNumber.trim()
            : `Part ${idx + 1}/${rawEpisodes.length}`,
        episodeTitle:
          typeof item.episodeTitle === "string" && item.episodeTitle.trim()
            ? item.episodeTitle.trim()
            : `Episode ${idx + 1}`,
        openingHook:
          typeof item.openingHook === "string" ? item.openingHook.trim() : "",
        coreBeats:
          coreBeats.length > 0
            ? coreBeats
            : ["Introduce the concrete turning point visually.", "Deliver rapid proof.", "Escalate tension."],
        cliffhangerBridge:
          typeof item.cliffhangerBridge === "string"
            ? item.cliffhangerBridge.trim()
            : "",
      };
    });

  return { seriesTitle, episodes };
}

function formatSeriesMarkdown(plan: ShortsSeriesPlan): string {
  const lines: string[] = [
    `# ${plan.seriesTitle}`,
    "",
    ...plan.episodes.flatMap((ep) => [
      `## ${ep.partNumber}: ${ep.episodeTitle}`,
      `- **Opening Hook (0:00–0:02):** ${ep.openingHook}`,
      "- **45–60s Script Beats:**",
      ...ep.coreBeats.map((beat, idx) => `  ${idx + 1}. ${beat}`),
      `- **Watch Series Cliffhanger Bridge:** ${ep.cliffhangerBridge}`,
      "",
    ]),
    "Generated free via YouTubeToolsHub.com/tools/shorts-series-planner",
  ];
  return lines.join("\n");
}

export default function ShortsSeriesPlanner() {
  const searchParams = useSearchParams();
  const initialTopic = searchParams.get("topic") || "";
  const [prevUrlTopic, setPrevUrlTopic] = useState(initialTopic);
  const [topic, setTopic] = useState(initialTopic);
  if (initialTopic && initialTopic !== prevUrlTopic) {
    setPrevUrlTopic(initialTopic);
    setTopic(initialTopic);
  }

  const [episodeCount, setEpisodeCount] = useState<3 | 5 | 7>(5);
  const [tone, setTone] = useState<string>("Educational Breakdown");
  const [seriesPlan, setSeriesPlan] = useState<ShortsSeriesPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [copiedFull, setCopiedFull] = useState(false);

  const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();
  const { pack, updatePack, saveTitleVariantsBatch } = useVideoPack();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Enter a series topic or core promise to generate connected Shorts episodes.");
      return;
    }

    if (!checkLimit("shorts-series-planner")) {
      return;
    }

    setError("");
    setLoading(true);
    setSeriesPlan(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "shorts-series-planner",
          topic: topic.trim(),
          episodeCount,
          tone,
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        setError(data.error || "Failed to generate Shorts Watch Series plan.");
        return;
      }

      const parsed = parseSeriesResponse(data.result || "", episodeCount);
      if (!parsed) {
        setError("AI returned an unexpected format. Please try again.");
        return;
      }

      setSeriesPlan(parsed);
      increment("shorts-series-planner");

      try {
        await saveHistory("shorts-series-planner", {
          topic: topic.trim(),
          episodeCount,
          tone,
          seriesTitle: parsed.seriesTitle,
        });
      } catch {
        // non-fatal
      }
    } catch {
      setError("Failed to generate Shorts series blueprint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fullScriptMarkdown = seriesPlan ? formatSeriesMarkdown(seriesPlan) : "";

  const handleCopyFullSeries = async () => {
    if (!fullScriptMarkdown) return;
    try {
      await navigator.clipboard.writeText(fullScriptMarkdown);
      setCopiedFull(true);
      setTimeout(() => setCopiedFull(false), 2400);
    } catch {
      /* ignore */
    }
  };

  return (
    <ToolPageLayout
      title='Episodic Shorts "Watch Series" Binge Planner'
      slug="shorts-series-planner"
      description="Plan 3, 5, or 7 connected YouTube Shorts episodes engineered to convert viewers with cliffhanger 'Watch Series' binge bridges."
    >
      <div className="space-y-8">
        <UsageBanner type="ai" toolSlug="shorts-series-planner" />
        <LimitReachedModal
          isOpen={!!limitReachedTool}
          onClose={closeLimitModal}
          toolSlug={limitReachedTool}
        />

        {/* Inputs Panel */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <PresetPills
            label="Load episodic Shorts concept"
            options={SERIES_PRESETS.map((p, idx) => ({ id: `series-${idx}`, label: p.label }))}
            activeId={activePreset}
            onSelect={(id) => {
              const p = SERIES_PRESETS[Number(id.replace("series-", ""))];
              if (!p) return;
              setActivePreset(id);
              setTopic(p.topic);
              setEpisodeCount(p.count);
              setTone(p.tone);
            }}
          />

          <Input
            label="Series Topic / Core Promise"
            placeholder="e.g., Turning a $300 thrifted PC into a 4K editing powerhouse in 5 parts"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              setActivePreset(null);
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="block text-sm font-bold text-slate-800 mb-2">
                Number of Episodes (Shorts Chain)
              </span>
              <div className="grid grid-cols-3 gap-2" role="group" aria-label="Episode count">
                {EPISODE_COUNT_OPTIONS.map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setEpisodeCount(count)}
                    className={`cursor-pointer py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-extrabold transition-all ${
                      episodeCount === count
                        ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:border-purple-300"
                    }`}
                  >
                    {count} Parts
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                YouTube&apos;s Watch Series link works best with tight 3–7 episode narrative arcs.
              </p>
            </div>

            <Select
              label="Niche / Story Tone"
              options={TONE_OPTIONS}
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              icon={<FaFilm />}
            />
          </div>

          <Button
            onClick={handleGenerate}
            isLoading={loading}
            disabled={loading}
            className="w-full py-4 text-base sm:text-lg"
          >
            <FaListUl className="mr-2" />
            {loading
              ? `Architecting ${episodeCount}-Part Binge Arc...`
              : `Generate ${episodeCount}-Episode Shorts Series`}
          </Button>
        </div>

        {error && <ErrorNotice message={error} onRetry={() => setError("")} />}

        {loading && (
          <div className="py-12 text-center space-y-4" role="status" aria-live="polite">
            <div className="inline-block w-14 h-14 rounded-full border-4 border-purple-100 border-t-purple-600 animate-spin" />
            <p className="text-slate-600 font-medium">
              Drafting 2-second opening hooks &amp; Watch Series cliffhanger bridges...
            </p>
          </div>
        )}

        {!loading && !error && !seriesPlan && (
          <ToolEmptyState
            title="Your sequential Watch Series blueprint will appear here"
            description="Enter a series premise above to generate connected Part 1 to Part N Shorts scripts built to chain viewers down your playlist."
          />
        )}

        {seriesPlan && !loading && (
          <div className="space-y-6 animate-fade-in">
            {/* Series Header & Toolbar */}
            <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-7 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-[11px] font-extrabold uppercase tracking-wider">
                  <FaLink className="w-3 h-3" aria-hidden="true" />
                  <span>{seriesPlan.episodes.length}-Part Shorts Series · {tone}</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-outfit">
                  {seriesPlan.seriesTitle}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyFullSeries}
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold transition-colors"
                >
                  {copiedFull ? (
                    <FaCheck className="w-3.5 h-3.5 text-emerald-300" />
                  ) : (
                    <FaCopy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedFull ? "Full Series Copied!" : "Copy Full Series Script"}</span>
                </button>

                <SaveToVideoPackButton
                  label="Save to Video Pack"
                  toastMessage="Saved Shorts series plan to Active Video Pack!"
                  onSave={() => {
                    saveTitleVariantsBatch(
                      seriesPlan.episodes.map(
                        (e) => `${e.partNumber}: ${e.episodeTitle}`,
                      ),
                      topic.trim() || seriesPlan.seriesTitle,
                    );
                    updatePack({
                      selectedTitle: seriesPlan.seriesTitle,
                      notes: [pack.notes, fullScriptMarkdown].filter(Boolean).join("\n\n"),
                    });
                  }}
                />
              </div>
            </div>

            {/* Sequential Episode Cards */}
            <div className="space-y-4">
              {seriesPlan.episodes.map((ep, idx) => {
                const episodeClipboard = `${ep.partNumber} — ${ep.episodeTitle}\nHook (0-2s): ${ep.openingHook}\nBeats:\n${ep.coreBeats.map((b, i) => `${i + 1}. ${b}`).join("\n")}\nCliffhanger Bridge: ${ep.cliffhangerBridge}`;
                return (
                  <article
                    key={`${ep.partNumber}-${idx}`}
                    className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:border-purple-300 transition-colors space-y-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-black uppercase tracking-wider">
                          {ep.partNumber}
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 font-outfit">
                          {ep.episodeTitle}
                        </h3>
                      </div>
                      <CopyButton text={episodeClipboard} variant="button" label="Copy Episode" />
                    </div>

                    {/* 2-Second Opening Hook */}
                    <div className="rounded-xl bg-amber-50/80 border border-amber-200 p-3.5 text-sm">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-1">
                        <FaBolt className="w-3 h-3" aria-hidden="true" />
                        <span>Opening Hook (First 2 Seconds · Zero Fluff)</span>
                      </span>
                      <p className="font-semibold text-slate-900">&ldquo;{ep.openingHook}&rdquo;</p>
                    </div>

                    {/* 3 Core Script Beats */}
                    <div className="space-y-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">
                        45–60s Vertical Script Beats
                      </span>
                      <ol className="space-y-2">
                        {ep.coreBeats.map((beat, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start gap-2.5 text-sm text-slate-700"
                          >
                            <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                              {bIdx + 1}
                            </span>
                            <span>{beat}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Watch Series Cliffhanger Bridge */}
                    <div className="rounded-xl bg-indigo-50/80 border border-indigo-200 p-3.5 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-800 block mb-0.5">
                          Watch Series Cliffhanger Bridge → Next Part
                        </span>
                        <p className="font-semibold text-indigo-950">
                          &ldquo;{ep.cliffhangerBridge}&rdquo;
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs font-bold">
              <span className="text-slate-600">
                Compare Shorts RPM vs. Long-Form payouts or check audio loudness before filming:
              </span>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/tools/youtube-shorts-vs-long-form-calculator"
                  className="text-purple-700 hover:underline inline-flex items-center gap-1"
                >
                  Shorts vs. Long-Form Calculator <FaArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  href="/tools/youtube-loudness-checker"
                  className="text-emerald-700 hover:underline inline-flex items-center gap-1"
                >
                  Check -14 LUFS Voiceover <FaArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
