"use client";

import { Suspense, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FaArrowRight,
  FaBolt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaMicrophone,
  FaTimesCircle,
} from "react-icons/fa";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
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

interface FluffPhrase {
  phrase: string;
  reason: string;
}

interface HookRewrite {
  style: string;
  hook: string;
  whyItWorks: string;
}

interface HookAuditResult {
  retentionScore: number;
  dropOffRisk: "Low" | "Medium" | "High";
  promiseConfirmed: boolean;
  promiseExplanation: string;
  fluffPhrases: FluffPhrase[];
  rewrites: HookRewrite[];
}

const KNOWN_CLICHES: Array<{ pattern: RegExp; reason: string }> = [
  {
    pattern: /hey guys,?\s*(welcome back( to (the|my) channel)?|what'?s up)?/gi,
    reason: "Generic greeting creates zero curiosity and triggers early Browse drop-off.",
  },
  {
    pattern: /welcome back to (the|my) channel/gi,
    reason: "Signals slow warmup to first-time viewers who clicked from Home feed.",
  },
  {
    pattern: /before we (start|begin|jump in|get into it)/gi,
    reason: "Viewers resent housekeeping detours before receiving the promised premise.",
  },
  {
    pattern: /(don'?t forget to )?(like|subscribe|hit the bell|smash that like button)[^.?!\n]*/gi,
    reason: "Premature CTA before earning viewer trust destroys 0:00–0:30 retention.",
  },
  {
    pattern: /in today'?s video,?\s*(we'?re going to|i'?m going to|we will)/gi,
    reason: "Passive meta-narration instead of diving straight into stakes or proof.",
  },
  {
    pattern: /without further ado/gi,
    reason: "Filler cliché that wastes precious opening audio cadence.",
  },
];

const HOOK_PRESETS = [
  {
    label: "Fluffy Generic Intro",
    title: "How to Edit 3x Faster in Premiere Pro (2026 Workflow)",
    script:
      "Hey guys, welcome back to the channel! My name is Alex and if you are new here don't forget to hit subscribe and ring the notification bell before we start. In today's video we're going to talk a little bit about video editing and without further ado let's jump right into my Premiere Pro settings.",
  },
  {
    label: "Tech Review Proof",
    title: "I Replaced My MacBook Pro With a $399 Mini PC for 30 Days",
    script:
      "Thirty days ago I locked my $2,500 MacBook in a drawer to see if a $399 mini PC could survive real 4K client edits. Two crashes almost cost me a deadline—until one BIOS tweak cut export times in half.",
  },
  {
    label: "YouTube Growth Angle",
    title: "Why 90% of Channels Plateau at 500 Views",
    script:
      "Most creators blame the algorithm when their upload stalls at 500 views, but our audit of 400 small channels uncovered the exact same mistake in the first twelve seconds of the intro.",
  },
];

function detectLocalCliches(script: string): FluffPhrase[] {
  const found: FluffPhrase[] = [];
  const seen = new Set<string>();
  for (const item of KNOWN_CLICHES) {
    const matches = script.match(item.pattern);
    if (!matches) continue;
    for (const raw of matches) {
      const phrase = raw.trim();
      const key = phrase.toLowerCase();
      if (!phrase || seen.has(key)) continue;
      seen.add(key);
      found.push({ phrase, reason: item.reason });
    }
  }
  return found;
}

function renderHighlightedScript(
  script: string,
  fluffPhrases: FluffPhrase[],
): ReactNode[] {
  const uniquePhrases = fluffPhrases
    .map((f) => f.phrase.trim())
    .filter((p) => p.length >= 3)
    .sort((a, b) => b.length - a.length);

  if (uniquePhrases.length === 0) {
    return [script];
  }

  const escaped = uniquePhrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = script.split(regex);

  return parts.map((part, idx) => {
    const matched = fluffPhrases.find(
      (f) => f.phrase.toLowerCase() === part.toLowerCase(),
    );
    if (!matched) {
      return <span key={idx}>{part}</span>;
    }
    return (
      <mark
        key={idx}
        title={matched.reason}
        className="bg-amber-200/80 text-amber-950 px-1 py-0.5 rounded font-bold underline decoration-rose-500 decoration-wavy underline-offset-2"
      >
        {part}
      </mark>
    );
  });
}

function parseHookAuditResult(raw: string, script: string): HookAuditResult | null {
  const objMatch = raw.match(/\{[\s\S]*\}/);
  const candidate = (objMatch ? objMatch[0] : raw)
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();

  try {
    const parsed = JSON.parse(candidate) as Record<string, unknown>;
    const scoreRaw = Number(parsed.retentionScore);
    const retentionScore = Number.isFinite(scoreRaw)
      ? Math.max(0, Math.min(100, Math.round(scoreRaw)))
      : 65;

    const riskRaw = typeof parsed.dropOffRisk === "string" ? parsed.dropOffRisk : "Medium";
    const dropOffRisk: "Low" | "Medium" | "High" = /low/i.test(riskRaw)
      ? "Low"
      : /high/i.test(riskRaw)
        ? "High"
        : "Medium";

    const aiFluff: FluffPhrase[] = Array.isArray(parsed.fluffPhrases)
      ? parsed.fluffPhrases
          .filter(
            (item): item is { phrase: string; reason?: string } =>
              typeof item === "object" &&
              item !== null &&
              typeof (item as Record<string, unknown>).phrase === "string",
          )
          .map((item) => ({
            phrase: item.phrase.trim(),
            reason:
              typeof item.reason === "string" && item.reason.trim()
                ? item.reason.trim()
                : "Slows down opening pacing.",
          }))
      : [];

    const localFluff = detectLocalCliches(script);
    const mergedMap = new Map<string, FluffPhrase>();
    for (const entry of [...aiFluff, ...localFluff]) {
      const k = entry.phrase.toLowerCase();
      if (k && !mergedMap.has(k)) {
        mergedMap.set(k, entry);
      }
    }

    const defaultRewrites: HookRewrite[] = [
      {
        style: "Direct Proof Hook",
        hook: "",
        whyItWorks: "",
      },
      {
        style: "Story / Stakes Hook",
        hook: "",
        whyItWorks: "",
      },
      {
        style: "Fast-Paced Pattern Interrupt Hook",
        hook: "",
        whyItWorks: "",
      },
    ];

    const rewritesRaw = Array.isArray(parsed.rewrites) ? parsed.rewrites : [];
    const rewrites: HookRewrite[] = rewritesRaw
      .slice(0, 3)
      .map((item, idx) => {
        const obj =
          typeof item === "object" && item !== null
            ? (item as Record<string, unknown>)
            : {};
        return {
          style:
            typeof obj.style === "string" && obj.style.trim()
              ? obj.style.trim()
              : defaultRewrites[idx]?.style || `Hook Variant ${idx + 1}`,
          hook: typeof obj.hook === "string" ? obj.hook.trim() : "",
          whyItWorks: typeof obj.whyItWorks === "string" ? obj.whyItWorks.trim() : "",
        };
      })
      .filter((r) => r.hook.length > 0);

    return {
      retentionScore,
      dropOffRisk,
      promiseConfirmed: Boolean(parsed.promiseConfirmed),
      promiseExplanation:
        typeof parsed.promiseExplanation === "string" && parsed.promiseExplanation.trim()
          ? parsed.promiseExplanation.trim()
          : "Review sentence one to verify it delivers on your video title immediately.",
      fluffPhrases: Array.from(mergedMap.values()),
      rewrites,
    };
  } catch {
    return null;
  }
}

function HookAuditorSearchSync({
  onSyncTitle,
}: {
  onSyncTitle: (title: string) => void;
}) {
  const searchParams = useSearchParams();
  const initialTitle = searchParams.get("title") || searchParams.get("topic") || "";

  useEffect(() => {
    if (!initialTitle) return;
    let cancelled = false;
    Promise.resolve().then(() => {
      if (!cancelled) onSyncTitle(initialTitle);
    });
    return () => {
      cancelled = true;
    };
  }, [initialTitle, onSyncTitle]);

  return null;
}

export default function HookAuditor() {
  const [videoTitle, setVideoTitle] = useState("");
  const handleSyncTitle = useCallback((nextTitle: string) => {
    setVideoTitle(nextTitle);
  }, []);

  const [introScript, setIntroScript] = useState("");
  const [audit, setAudit] = useState<HookAuditResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();
  const { updatePack, selectTitle, pack } = useVideoPack();

  const scriptWordCount = useMemo(
    () => introScript.trim().split(/\s+/).filter(Boolean).length,
    [introScript],
  );
  const estimatedSeconds = Math.round((scriptWordCount / 150) * 60);

  const handleAudit = async () => {
    if (!videoTitle.trim() || !introScript.trim()) {
      setError("Enter both your Video Title and your opening Intro Script (50–150 words).");
      return;
    }

    if (!checkLimit("hook-auditor")) {
      return;
    }

    setError("");
    setLoading(true);
    setAudit(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "hook-auditor",
          videoTitle: videoTitle.trim(),
          introScript: introScript.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        setError(data.error || "Failed to audit hook.");
        return;
      }

      const parsed = parseHookAuditResult(data.result || "", introScript);
      if (!parsed) {
        setError("AI returned an unexpected format. Please try again.");
        return;
      }

      setAudit(parsed);
      increment("hook-auditor");

      try {
        await saveHistory("hook-auditor", {
          videoTitle: videoTitle.trim(),
          retentionScore: parsed.retentionScore,
          dropOffRisk: parsed.dropOffRisk,
        });
      } catch {
        // Non-fatal
      }
    } catch {
      setError("Network error while auditing your intro hook. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPageLayout
      title="First 30-Second Hook & Promise Auditor"
      slug="hook-auditor"
      description="Audit sentence-1 click promise confirmation, highlight retention-killing throat-clearing clichés, and generate 3 high-retention rewrites."
    >
      <div className="space-y-8">
        <Suspense fallback={null}>
          <HookAuditorSearchSync onSyncTitle={handleSyncTitle} />
        </Suspense>
        <UsageBanner type="ai" toolSlug="hook-auditor" />
        <LimitReachedModal
          isOpen={!!limitReachedTool}
          onClose={closeLimitModal}
          toolSlug={limitReachedTool}
        />

        {/* Input Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <PresetPills
            label="Try example intro script"
            options={HOOK_PRESETS.map((p, idx) => ({ id: `preset-${idx}`, label: p.label }))}
            activeId={activePreset}
            onSelect={(id) => {
              const preset = HOOK_PRESETS[Number(id.replace("preset-", ""))];
              if (!preset) return;
              setActivePreset(id);
              setVideoTitle(preset.title);
              setIntroScript(preset.script);
            }}
          />

          <Input
            label="Video Title (The Promise Viewers Clicked)"
            type="text"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            placeholder="e.g., How to Double Audience Retention in 30 Seconds"
          />

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label
                htmlFor="hook-auditor-script"
                className="block text-sm font-semibold text-slate-800"
              >
                Opening Intro Script (First 50–150 words)
              </label>
              <span className="text-xs font-bold text-slate-600">
                {scriptWordCount} words · ~{estimatedSeconds}s spoken
              </span>
            </div>
            <Textarea
              id="hook-auditor-script"
              rows={5}
              value={introScript}
              onChange={(e) => setIntroScript(e.target.value)}
              placeholder='Paste your first 2–5 spoken sentences here (e.g., "Hey guys, welcome back to the channel! Today we are looking at...")'
            />
          </div>

          <Button
            type="button"
            variant="cta"
            onClick={() => void handleAudit()}
            isLoading={loading}
            className="w-full py-4 text-base sm:text-lg"
          >
            <FaMicrophone className="mr-2" />
            {loading ? "Auditing 30-Second Retention..." : "Audit Hook & Generate Rewrites"}
          </Button>
        </div>

        {error && <ErrorNotice message={error} onRetry={() => void handleAudit()} />}

        {!audit && !loading && !error && (
          <ToolEmptyState
            icon={<FaBolt />}
            title="Stop losing 35% of viewers in the first 30 seconds"
            description="Paste your title and opening script above to check Promise Confirmation, highlight throat-clearing fluff, and unlock 3 proven hook rewrites."
          />
        )}

        {audit && (
          <div className="space-y-6">
            {/* Score & Promise Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`rounded-2xl p-5 border ${
                  audit.retentionScore >= 80
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : audit.retentionScore >= 60
                      ? "bg-amber-50 border-amber-200 text-amber-900"
                      : "bg-rose-50 border-rose-200 text-rose-900"
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider opacity-80 block">
                  30s Retention Score
                </span>
                <span className="text-3xl font-black font-outfit">
                  {audit.retentionScore}/100
                </span>
              </div>

              <div
                className={`rounded-2xl p-5 border ${
                  audit.dropOffRisk === "Low"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : audit.dropOffRisk === "Medium"
                      ? "bg-amber-50 border-amber-200 text-amber-900"
                      : "bg-rose-50 border-rose-200 text-rose-900"
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider opacity-80 block">
                  Estimated Drop-Off Risk
                </span>
                <span className="text-3xl font-black font-outfit">{audit.dropOffRisk}</span>
              </div>

              <div
                className={`rounded-2xl p-5 border ${
                  audit.promiseConfirmed
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : "bg-rose-50 border-rose-200 text-rose-900"
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider opacity-80 block">
                  Promise Confirmation Check
                </span>
                <span className="text-2xl font-black font-outfit inline-flex items-center gap-2 mt-1">
                  {audit.promiseConfirmed ? (
                    <>
                      <FaCheckCircle className="text-emerald-600 w-6 h-6" /> PASS
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="text-rose-600 w-6 h-6" /> FAIL
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Promise Explanation */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-1.5">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700">
                Sentence-1 Promise Assessment
              </h2>
              <p className="text-sm text-slate-800 leading-relaxed">
                {audit.promiseExplanation}
              </p>
            </div>

            {/* Fluff & Throat-Clearing Highlighter */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-black text-slate-900 font-outfit flex items-center gap-2">
                  <FaExclamationTriangle className="text-amber-500" />
                  <span>Fluff &amp; Throat-Clearing Highlighter</span>
                </h2>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  {audit.fluffPhrases.length} flagged phrase
                  {audit.fluffPhrases.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-sm sm:text-base text-slate-800 leading-relaxed">
                {renderHighlightedScript(introScript, audit.fluffPhrases)}
              </div>

              {audit.fluffPhrases.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {audit.fluffPhrases.map((item, idx) => (
                    <li
                      key={idx}
                      className="rounded-xl bg-amber-50/70 border border-amber-200 p-3 text-xs space-y-1"
                    >
                      <span className="font-extrabold text-amber-950 block">
                        &ldquo;{item.phrase}&rdquo;
                      </span>
                      <span className="text-amber-900/90 block">{item.reason}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs font-semibold text-emerald-700">
                  No generic throat-clearing clichés detected in your opening lines.
                </p>
              )}
            </div>

            {/* 3 High-Retention Hook Rewrites */}
            <div className="space-y-4">
              <h2 className="text-xl font-black text-slate-900 font-outfit">
                3 High-Retention Hook Rewrites
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {audit.rewrites.map((rw, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-purple-300 shadow-sm flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-3">
                      <span className="inline-block text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
                        {idx + 1}. {rw.style}
                      </span>
                      <blockquote className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed border-l-4 border-purple-500 pl-3">
                        &ldquo;{rw.hook}&rdquo;
                      </blockquote>
                      <p className="text-xs text-slate-600 leading-relaxed">{rw.whyItWorks}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <CopyButton text={rw.hook} variant="button" label="Copy Hook" />
                      <SaveToVideoPackButton
                        compact
                        label="Save to Video Pack"
                        toastMessage={`Saved "${rw.style}" to Active Video Pack!`}
                        onSave={() => {
                          selectTitle(videoTitle.trim());
                          updatePack({
                            topic: pack.topic || videoTitle.trim(),
                            notes: [
                              pack.notes,
                              `[${rw.style}] ${rw.hook}`,
                            ]
                              .filter(Boolean)
                              .join("\n\n"),
                          });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3 text-xs font-bold">
              <span className="text-slate-600">Pair a tight opening hook with clickable packaging:</span>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/tools/thumbnail-critique"
                  className="text-purple-700 hover:underline inline-flex items-center gap-1"
                >
                  Critique Thumbnail <FaArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  href={`/tools/ab-packaging-studio?topic=${encodeURIComponent(videoTitle)}`}
                  className="text-indigo-700 hover:underline inline-flex items-center gap-1"
                >
                  Open A/B Packaging Studio <FaArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
