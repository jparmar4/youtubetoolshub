"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FaArrowRight,
  FaCheck,
  FaCopy,
  FaFlask,
  FaLightbulb,
  FaMoon,
  FaRocket,
  FaSun,
} from "react-icons/fa";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
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

interface PackagingVariant {
  variant: "A" | "B" | "C";
  framework: string;
  title: string;
  thumbnailTextOverlay: string;
  visualDirection: string;
  aiImagePrompt: string;
  psychologyWhy: string;
}

const STUDIO_PRESETS = [
  {
    label: "Tech Review",
    topic: "I switched to a $199 Linux laptop for 30 days as a full-time developer",
    audience: "Software engineers & tech enthusiasts",
  },
  {
    label: "YouTube Growth",
    topic: "How small channels under 1,000 subscribers can double CTR with Test & Compare",
    audience: "Aspiring & growing YouTube creators",
  },
  {
    label: "Finance / SaaS",
    topic: "Why I moved $50,000 out of high-yield savings into index funds",
    audience: "Young professionals & retail investors",
  },
  {
    label: "Productivity",
    topic: "The 2-hour morning workflow that replaced my 6 productivity apps",
    audience: "Founders, students & remote workers",
  },
];

const VARIANT_STYLES: Record<
  string,
  { badge: string; gradient: string; accentBorder: string }
> = {
  A: {
    badge: "bg-purple-100 text-purple-800 border-purple-200",
    gradient: "from-purple-950 via-indigo-900 to-slate-900",
    accentBorder: "border-purple-200 hover:border-purple-400",
  },
  B: {
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    gradient: "from-emerald-950 via-teal-900 to-slate-900",
    accentBorder: "border-emerald-200 hover:border-emerald-400",
  },
  C: {
    badge: "bg-rose-100 text-rose-800 border-rose-200",
    gradient: "from-rose-950 via-amber-950 to-slate-900",
    accentBorder: "border-rose-200 hover:border-rose-400",
  },
};

function parsePackagingVariants(raw: string): PackagingVariant[] {
  const cleaned = raw
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();

  let parsedUnknown: unknown = null;
  try {
    parsedUnknown = JSON.parse(cleaned);
  } catch {
    const arrMatch = cleaned.match(/\[[\s\S]*\]/);
    if (!arrMatch) return [];
    try {
      parsedUnknown = JSON.parse(arrMatch[0]);
    } catch {
      return [];
    }
  }

  const parsed = Array.isArray(parsedUnknown)
    ? parsedUnknown
    : parsedUnknown &&
        typeof parsedUnknown === "object" &&
        Array.isArray((parsedUnknown as { variants?: unknown[] }).variants)
      ? (parsedUnknown as { variants: unknown[] }).variants
      : [];

  if (!Array.isArray(parsed) || parsed.length === 0) return [];

  const defaultFrameworks = [
    "Curiosity Gap",
    "Outcome & Proof",
    "Contrarian / Warning",
  ];
  const labels: Array<"A" | "B" | "C"> = ["A", "B", "C"];

  return parsed.slice(0, 3).map((entry: unknown, idx: number) => {
    const obj =
      typeof entry === "object" && entry !== null
        ? (entry as Record<string, unknown>)
        : {};
    const variantLetter = labels[idx] || "A";
    return {
      variant: variantLetter,
      framework:
        typeof obj.framework === "string" && obj.framework.trim()
          ? obj.framework.trim()
          : defaultFrameworks[idx],
      title: typeof obj.title === "string" ? obj.title.trim() : "",
      thumbnailTextOverlay:
        typeof obj.thumbnailTextOverlay === "string"
          ? obj.thumbnailTextOverlay.trim()
          : "BIG SHIFT",
      visualDirection:
        typeof obj.visualDirection === "string" ? obj.visualDirection.trim() : "",
      aiImagePrompt:
        typeof obj.aiImagePrompt === "string" ? obj.aiImagePrompt.trim() : "",
      psychologyWhy:
        typeof obj.psychologyWhy === "string" ? obj.psychologyWhy.trim() : "",
    };
  });
}

function ABPackagingSearchSync({
  onSyncTopic,
}: {
  onSyncTopic: (topic: string) => void;
}) {
  const searchParams = useSearchParams();
  const urlTopic = searchParams.get("topic") || "";

  useEffect(() => {
    if (!urlTopic) return;
    let cancelled = false;
    Promise.resolve().then(() => {
      if (!cancelled) onSyncTopic(urlTopic);
    });
    return () => {
      cancelled = true;
    };
  }, [urlTopic, onSyncTopic]);

  return null;
}

export default function ABPackagingStudio() {
  const [topic, setTopic] = useState("");
  const handleSyncTopic = useCallback((nextTopic: string) => {
    setTopic(nextTopic);
  }, []);

  const [targetAudience, setTargetAudience] = useState("");
  const [variants, setVariants] = useState<PackagingVariant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [feedTheme, setFeedTheme] = useState<"light" | "dark">("light");
  const [copiedPromptIdx, setCopiedPromptIdx] = useState<number | null>(null);

  const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();
  const { saveIdea, selectTitle, pack } = useVideoPack();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Enter a video topic or working title to generate 3 packaging variants.");
      return;
    }

    if (!checkLimit("ab-packaging-studio")) {
      return;
    }

    setError("");
    setLoading(true);
    setVariants([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "ab-packaging-studio",
          topic: topic.trim(),
          targetAudience: targetAudience.trim() || "General YouTube Viewers",
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        setError(data.error || "Failed to generate A/B packaging variants.");
        return;
      }

      const parsed = parsePackagingVariants(data.result || "");
      if (parsed.length === 0) {
        setError("AI returned an unexpected format. Please try again.");
        return;
      }

      setVariants(parsed);
      increment("ab-packaging-studio");

      try {
        await saveHistory("ab-packaging-studio", {
          topic: topic.trim(),
          targetAudience: targetAudience.trim(),
          variants: parsed,
        });
      } catch {
        // Non-fatal
      }
    } catch {
      setError("Failed to generate A/B packaging concepts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPrompt = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPromptIdx(index);
      setTimeout(() => setCopiedPromptIdx(null), 2000);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <ToolPageLayout
      title='3-Way "Test & Compare" Packaging Studio'
      slug="ab-packaging-studio"
      description="Generate 3 psychologically distinct thumbnail + title variants built for YouTube Studio native A/B Test & Compare experiments."
    >
      <div className="space-y-8">
        <Suspense fallback={null}>
          <ABPackagingSearchSync onSyncTopic={handleSyncTopic} />
        </Suspense>
        <UsageBanner type="ai" toolSlug="ab-packaging-studio" />
        <LimitReachedModal
          isOpen={!!limitReachedTool}
          onClose={closeLimitModal}
          toolSlug={limitReachedTool}
        />

        {/* Inputs */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <PresetPills
            label="Load creator scenario"
            options={STUDIO_PRESETS.map((p, idx) => ({ id: `preset-${idx}`, label: p.label }))}
            activeId={activePreset}
            onSelect={(id) => {
              const preset = STUDIO_PRESETS[Number(id.replace("preset-", ""))];
              if (!preset) return;
              setActivePreset(id);
              setTopic(preset.topic);
              setTargetAudience(preset.audience);
            }}
          />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleGenerate();
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Video Topic or Working Title"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., How I Grew From 0 to 10K Subscribers With Long-Form Videos"
              />
              <Input
                label="Target Audience / Niche"
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g., Beginner creators, B2B SaaS founders, budget filmmakers"
              />
            </div>

            <Button
              type="submit"
              variant="cta"
              isLoading={loading}
              className="w-full py-4 text-base sm:text-lg"
            >
              <FaFlask className="mr-2" />
              {loading
                ? "Designing 3 Psychological Variants..."
                : "Generate 3 Test & Compare Variants"}
            </Button>
          </form>
        </div>

        {error && <ErrorNotice message={error} onRetry={() => void handleGenerate()} />}

        {variants.length === 0 && !loading && !error && (
          <ToolEmptyState
            icon={<FaFlask />}
            title="3 Test & Compare concepts will appear side-by-side"
            description="Generate Curiosity Gap, Outcome & Proof, and Contrarian/Warning variants with thumbnail overlay copy, visual direction, and AI image prompts."
          />
        )}

        {variants.length > 0 && !loading && (
          <div className="space-y-8">
            {/* Simulated 3-Column YouTube Home Feed Comparison Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700">
                    Simulated Home Feed
                  </span>
                  <h2 className="text-xl font-black text-slate-900 font-outfit">
                    3-Column YouTube Feed Comparison Grid
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setFeedTheme((t) => (t === "light" ? "dark" : "light"))}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 self-start"
                >
                  {feedTheme === "dark" ? (
                    <>
                      <FaMoon className="text-indigo-600" /> Dark Feed Preview
                    </>
                  ) : (
                    <>
                      <FaSun className="text-amber-500" /> Light Feed Preview
                    </>
                  )}
                </button>
              </div>

              <div
                className={`rounded-2xl p-4 sm:p-6 border transition-colors ${
                  feedTheme === "dark"
                    ? "bg-[#0f0f0f] border-slate-800 text-white"
                    : "bg-slate-50 border-slate-200 text-slate-900"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {variants.map((v) => {
                    const style = VARIANT_STYLES[v.variant] || VARIANT_STYLES.A;
                    return (
                      <div key={v.variant} className="space-y-2.5">
                        {/* Stylized 16:9 concept thumbnail */}
                        <div
                          className={`relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br ${style.gradient} p-2.5 sm:p-3 flex flex-col justify-between shadow-md border border-white/10`}
                        >
                          <div className="flex items-center justify-between gap-1.5">
                            <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/15 text-white backdrop-blur-xs truncate">
                              Variant {v.variant} · {v.framework}
                            </span>
                          </div>
                          <div className="my-auto text-center px-1.5 min-w-0">
                            <p className="text-sm sm:text-base font-black tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] leading-tight uppercase break-words line-clamp-2">
                              {v.thumbnailTextOverlay}
                            </p>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] text-white/75 line-clamp-1">
                              {v.visualDirection}
                            </span>
                            <span className="bg-black/85 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0">
                              12:40
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 shrink-0 flex items-center justify-center text-white text-[10px] font-black">
                            YT
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-sm font-bold leading-snug line-clamp-2">
                              {v.title}
                            </h3>
                            <p className="text-[11px] opacity-70 mt-0.5">
                              Your Channel · Test &amp; Compare Preview
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Detailed Packaging Variant Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {variants.map((v, idx) => {
                const style = VARIANT_STYLES[v.variant] || VARIANT_STYLES.A;
                const charCount = v.title.length;
                const isMobileSafe = charCount <= 58;
                const isSaved = pack.titleVariants.includes(v.title);

                return (
                  <div
                    key={v.variant}
                    className={`bg-white rounded-3xl p-6 border-2 transition-all shadow-sm flex flex-col justify-between gap-5 ${style.accentBorder}`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-extrabold ${style.badge}`}
                        >
                          Variant {v.variant}: {v.framework}
                        </span>
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            isMobileSafe
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {charCount} chars
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                          Suggested Title
                        </span>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-base font-black text-slate-900 leading-snug">
                            {v.title}
                          </h3>
                          <CopyButton text={v.title} className="shrink-0" />
                        </div>
                      </div>

                      <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                          Thumbnail Text Overlay (2–4 Words)
                        </span>
                        <span className="text-base font-black text-purple-700 tracking-wide">
                          {v.thumbnailTextOverlay}
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                          Visual Concept Direction
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {v.visualDirection}
                        </p>
                      </div>

                      <div className="rounded-xl bg-indigo-50/70 border border-indigo-200 p-3 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800">
                            AI Image Prompt
                          </span>
                          <button
                            type="button"
                            onClick={() => void handleCopyPrompt(v.aiImagePrompt, idx)}
                            className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-indigo-200 hover:border-indigo-400 text-[11px] font-bold text-indigo-700 transition-colors"
                          >
                            {copiedPromptIdx === idx ? (
                              <>
                                <FaCheck className="w-3 h-3 text-emerald-600" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <FaCopy className="w-3 h-3" />
                                <span>Copy AI Image Prompt</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-[11px] font-mono text-slate-700 leading-relaxed">
                          {v.aiImagePrompt}
                        </p>
                      </div>

                      <div className="flex items-start gap-2 text-xs text-slate-600">
                        <FaLightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{v.psychologyWhy}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <SaveToVideoPackButton
                        label="Save Variant to Video Pack"
                        isAlreadySaved={isSaved}
                        toastMessage={`Saved Variant ${v.variant} (${v.framework}) to Video Pack!`}
                        onSave={() => {
                          saveIdea({
                            title: v.title,
                            topic: topic.trim() || v.title,
                            thumbnailPrompt: v.aiImagePrompt,
                            notes: `Variant ${v.variant} (${v.framework}) · Overlay: "${v.thumbnailTextOverlay}" · Visual: ${v.visualDirection}`,
                          });
                          selectTitle(v.title);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Workflow Cross-Links */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3 text-xs font-bold">
              <div className="flex items-center gap-2 text-slate-700">
                <FaRocket className="text-purple-600" />
                <span>Next step after generating images in Test &amp; Compare:</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/tools/thumbnail-critique"
                  className="text-purple-700 hover:underline inline-flex items-center gap-1"
                >
                  Critique Uploaded Thumbnail <FaArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  href="/tools/youtube-thumbnail-ab-test-calculator"
                  className="text-indigo-700 hover:underline inline-flex items-center gap-1"
                >
                  Check Test Significance <FaArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
