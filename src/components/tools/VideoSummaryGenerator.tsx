"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
import PresetPills from "@/components/ui/PresetPills";
import ErrorNotice from "@/components/ui/ErrorNotice";
import UsageBanner from "@/components/ui/UsageBanner";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import SaveToVideoPackButton from "@/components/video-pack/SaveToVideoPackButton";
import WorkflowBridgeCard from "@/components/tools/WorkflowBridgeCard";
import { useUsage } from "@/hooks/useUsage";
import { useVideoPack } from "@/context/VideoPackContext";
import { saveHistory } from "@/lib/history";
import { extractVideoId } from "@/lib/utils";
import Link from "next/link";
import {
  FaMagic,
  FaCopy,
  FaCheckCircle,
  FaFileAlt,
  FaGraduationCap,
  FaBookOpen,
  FaMobileAlt,
  FaExternalLinkAlt,
  FaRobot,
  FaShieldAlt,
  FaChevronDown,
} from "react-icons/fa";

type FrameworkType = "executive" | "study" | "seo-article" | "shorts-script";

const SUMMARY_PRESETS = [
  { label: "🎬 Tech Video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { label: "🌍 Nature 8K HDR", url: "https://www.youtube.com/watch?v=LXb3EKWsInQ" },
  { label: "⚡ Dev Demo", url: "https://www.youtube.com/watch?v=M7lc1UVf-VE" },
];

function VideoSummarySearchSync({
  onSyncUrl,
}: {
  onSyncUrl: (nextUrl: string) => void;
}) {
  const searchParams = useSearchParams();
  const vParam = searchParams.get("v") || searchParams.get("url") || "";

  useEffect(() => {
    if (!vParam) return;
    let cancelled = false;
    Promise.resolve().then(() => {
      if (!cancelled) {
        const normalized = /^[A-Za-z0-9_-]{11}$/.test(vParam.trim())
          ? `https://www.youtube.com/watch?v=${vParam.trim()}`
          : vParam.trim();
        onSyncUrl(normalized);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [vParam, onSyncUrl]);

  return null;
}

export default function VideoSummaryGenerator() {
  const [videoUrl, setVideoUrl] = useState<string>("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  const [customTranscript, setCustomTranscript] = useState<string>("");
  const [activeFramework, setActiveFramework] = useState<FrameworkType>("executive");
  const [includeTimestamps, setIncludeTimestamps] = useState<boolean>(true);
  const [includeMetrics, setIncludeMetrics] = useState<boolean>(true);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [showCustomTranscript, setShowCustomTranscript] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [generatedSummary, setGeneratedSummary] = useState<string>("");
  const [resolvedMeta, setResolvedMeta] = useState<{ title: string; channel: string } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();
  const { pack, updatePack } = useVideoPack();

  const handleSyncUrl = useCallback((nextUrl: string) => {
    setVideoUrl(nextUrl);
  }, []);

  const getTemplatePrompt = (framework: FrameworkType): string => {
    switch (framework) {
      case "executive":
        return `You are an executive research analyst. Based STRICTLY AND ONLY on the provided YouTube video transcript below, synthesize the content into:
1. Core Thesis (Exactly 2 sentences summarizing the main argument)
2. 5 Strategic Takeaways (Numbered bullet points with concrete evidence cited)
${includeMetrics ? "3. Key Numbers & Metrics (All financial figures, benchmark percentages, and dates mentioned)\n" : ""}4. Notable Quotes (2-3 verbatim powerful quotes from the speaker)
5. Actionable Implementation Steps (3 concrete things a viewer should execute)

Do not assume, extrapolate, or inject outside knowledge not spoken in the transcript.

TRANSCRIPT:
[Paste your extracted transcript from /tools/youtube-transcript-downloader here]`;

      case "study":
        return `You are an educational curriculum designer. Transform this YouTube transcript into a comprehensive study guide:
1. Module Overview: 3-sentence summary of the subject matter.
${includeTimestamps ? "2. Chronological Chapter Notes: Use exact timestamps to outline every technical concept introduced.\n" : "2. Topic Breakdown: Detailed concept-by-concept analysis.\n"}3. Key Terminology & Definitions: Explain all technical jargon, tools, or acronyms mentioned.
4. Comprehension Review Quiz: 3 multiple-choice questions with answers hidden at the bottom.

TRANSCRIPT:
[Paste your transcript here]`;

      case "seo-article":
        return `Act as an expert SEO content strategist. Using the provided video transcript, write an engaging, publication-ready 1,200-word blog post.
Guidelines:
- Title: Craft an enticing, high-CTR title matching search intent.
- Quick-Answer Box: 50 words defining the core solution immediately under the H1.
- Clear Subheadings: Keyword-rich H2 and H3 sections covering each major argument.
- Tone: Conversational, authoritative, and practical—avoid AI buzzwords like "in conclusion," "game-changer," or "in today's digital landscape."
- Formatting: 2-3 sentence paragraphs, bullet points, and actionable tips.

TRANSCRIPT:
[Paste your transcript here]`;

      case "shorts-script":
        return `Analyze the following YouTube transcript and identify the single most compelling, controversial, or surprising 60-second concept.
Write a high-retention YouTube Shorts / TikTok script based on it:
- [Visual Direction]: What B-roll, screen capture, or action to show on screen.
- Hook (0:00 - 0:03): 10-word opening sentence that stops the viewer scroll.
- The Turn (0:04 - 0:15): Introduce the conflict or surprising counter-intuitive angle.
- The Meat (0:16 - 0:45): Fast, actionable breakdown of the solution.
- The Loop CTA (0:46 - 0:60): Smooth ending that loops seamlessly back to the start.

TRANSCRIPT:
[Paste your transcript here]`;
    }
  };

  const handleCopyPrompt = () => {
    const prompt = getTemplatePrompt(activeFramework);
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleGenerateSummary = async () => {
    setError("");
    const videoId = extractVideoId(videoUrl);
    if (!customTranscript.trim() && !videoId) {
      setError("Enter a valid YouTube URL (or paste custom transcript text below) to generate a summary.");
      return;
    }

    if (!checkLimit("youtube-video-summary-generator")) {
      return;
    }

    setLoading(true);
    setGeneratedSummary("");

    try {
      let videoTitle = "YouTube Video";
      let channelTitle = "YouTube Creator";
      let transcriptText = customTranscript.trim();

      if (!transcriptText && videoId) {
        const txResp = await fetch("/api/transcript", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: videoUrl.trim(), videoId }),
        });
        const txData = await txResp.json();
        if (!txResp.ok || txData.error) {
          setError(txData.error || "Could not load metadata/transcript for this YouTube video.");
          return;
        }
        videoTitle = txData.title || videoTitle;
        channelTitle = txData.channel || channelTitle;
        transcriptText = Array.isArray(txData.lines)
          ? txData.lines
              .map((l: { start?: string; text?: string }) => `[${l.start || "0:00"}] ${l.text || ""}`)
              .join("\n")
          : "";
      }

      setResolvedMeta({ title: videoTitle, channel: channelTitle });

      const genResp = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "video-summary",
          videoTitle,
          channelTitle,
          transcriptText,
          framework: activeFramework,
          includeTimestamps,
          includeMetrics,
        }),
      });

      const genData = await genResp.json();
      if (!genResp.ok || genData.error) {
        setError(genData.error || "Failed to generate AI video summary.");
        return;
      }

      const summaryText = typeof genData.result === "string" ? genData.result.trim() : "";
      if (!summaryText) {
        setError("AI returned an empty summary. Please try again.");
        return;
      }

      setGeneratedSummary(summaryText);
      increment("youtube-video-summary-generator");

      try {
        await saveHistory("youtube-video-summary-generator", {
          videoUrl: videoUrl.trim(),
          videoTitle,
          framework: activeFramework,
          summaryPreview: summaryText.slice(0, 200),
        });
      } catch {
        // non-fatal
      }
    } catch {
      setError("Network error while generating video summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPageLayout
      title="YouTube Video Summary Generator (Free AI Notes & Scripts 2026)"
      slug="youtube-video-summary-generator"
      description="Summarize any YouTube video into executive notes, study guides, SEO articles, and viral Shorts scripts with AI for free."
    >
      <div className="space-y-8">
        <Suspense fallback={null}>
          <VideoSummarySearchSync onSyncUrl={handleSyncUrl} />
        </Suspense>
        <UsageBanner type="ai" toolSlug="youtube-video-summary-generator" />
        <LimitReachedModal
          isOpen={!!limitReachedTool}
          onClose={closeLimitModal}
          toolSlug={limitReachedTool}
        />

        {/* Header Alert */}
        <div className="rounded-2xl border border-purple-200/80 bg-gradient-to-r from-purple-50/80 via-white to-indigo-50/60 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-black text-purple-700">
                <FaMagic /> Instant AI Summary &amp; Repurposing Engine
              </span>
              <h2 className="mt-2 text-xl sm:text-2xl font-black text-slate-900">
                YouTube Video Summary &amp; Content Repurposing Generator
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Generate structured executive briefs, study guides, SEO articles, and viral Shorts scripts from any YouTube URL or pasted transcript.
              </p>
            </div>
            <Link
              href="/blog/youtube-video-summary-generator-ai-free"
              className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1 self-start sm:self-center bg-white px-3 py-1.5 rounded-lg border border-purple-200"
            >
              Read Full 50-Video Study <FaExternalLinkAlt className="text-[11px]" />
            </Link>
          </div>
        </div>

        {/* Step 1: Video Input & Sample Presets */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <PresetPills
            label="Load sample video"
            options={SUMMARY_PRESETS.map((p, idx) => ({
              id: `preset-${idx}`,
              label: p.label.replace(/^\S+\s/, ""),
              icon: p.label.match(/^\S+/)?.[0],
            }))}
            activeId={activePreset}
            onSelect={(id) => {
              const p = SUMMARY_PRESETS[Number(id.replace("preset-", ""))];
              if (!p) return;
              setActivePreset(id);
              setVideoUrl(p.url);
            }}
          />

          <label className="block text-sm font-bold text-slate-800">
            Step 1: Enter Target YouTube Video URL
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="text"
              value={videoUrl}
              onChange={(e) => {
                setVideoUrl(e.target.value);
                setActivePreset(null);
              }}
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-1 text-base font-semibold"
            />
            <Link
              href="/tools/youtube-transcript-downloader"
              className="px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shrink-0"
            >
              <FaFileAlt /> Extract Full Transcript First
            </Link>
          </div>

          <div>
            <button
              type="button"
              onClick={() => setShowCustomTranscript((prev) => !prev)}
              className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-800"
            >
              <FaChevronDown
                className={`w-3 h-3 transition-transform ${showCustomTranscript ? "rotate-180" : ""}`}
              />
              <span>
                {showCustomTranscript
                  ? "Hide optional custom transcript / notes"
                  : "Optional: Paste custom transcript or notes instead of fetching URL"}
              </span>
            </button>
            {showCustomTranscript && (
              <div className="mt-3">
                <Textarea
                  label="Custom Transcript / Notes (Optional)"
                  value={customTranscript}
                  onChange={(e) => setCustomTranscript(e.target.value)}
                  placeholder="Paste extracted transcript lines or bullet notes here..."
                  className="min-h-[120px]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Choose Synthesis Framework */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
              Step 2: Select Summary Output Framework
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setActiveFramework("executive")}
                className={`cursor-pointer p-3.5 rounded-xl border text-left transition-all ${
                  activeFramework === "executive"
                    ? "border-purple-500 bg-purple-50/50 text-purple-900 shadow-sm"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="font-bold text-sm flex items-center gap-2 mb-1">
                  <FaFileAlt className="text-purple-500" /> Executive Brief
                </div>
                <p className="text-xs opacity-75">Thesis, 5 takeaways, quotes &amp; action steps.</p>
              </button>

              <button
                type="button"
                onClick={() => setActiveFramework("study")}
                className={`cursor-pointer p-3.5 rounded-xl border text-left transition-all ${
                  activeFramework === "study"
                    ? "border-purple-500 bg-purple-50/50 text-purple-900 shadow-sm"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="font-bold text-sm flex items-center gap-2 mb-1">
                  <FaGraduationCap className="text-blue-500" /> Study Guide
                </div>
                <p className="text-xs opacity-75">Chapter timecodes, glossary &amp; review quiz.</p>
              </button>

              <button
                type="button"
                onClick={() => setActiveFramework("seo-article")}
                className={`cursor-pointer p-3.5 rounded-xl border text-left transition-all ${
                  activeFramework === "seo-article"
                    ? "border-purple-500 bg-purple-50/50 text-purple-900 shadow-sm"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="font-bold text-sm flex items-center gap-2 mb-1">
                  <FaBookOpen className="text-emerald-500" /> SEO Article
                </div>
                <p className="text-xs opacity-75">1,200-word blog post with H2s &amp; FAQs.</p>
              </button>

              <button
                type="button"
                onClick={() => setActiveFramework("shorts-script")}
                className={`cursor-pointer p-3.5 rounded-xl border text-left transition-all ${
                  activeFramework === "shorts-script"
                    ? "border-purple-500 bg-purple-50/50 text-purple-900 shadow-sm"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="font-bold text-sm flex items-center gap-2 mb-1">
                  <FaMobileAlt className="text-rose-500" /> Viral Shorts Script
                </div>
                <p className="text-xs opacity-75">60-second high-retention script with hook.</p>
              </button>
            </div>
          </div>

          {/* Prompt Modifiers */}
          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={includeTimestamps}
                onChange={(e) => setIncludeTimestamps(e.target.checked)}
                className="rounded text-purple-600 focus:ring-purple-500"
              />
              Require Exact Timestamps
            </label>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={includeMetrics}
                onChange={(e) => setIncludeMetrics(e.target.checked)}
                className="rounded text-purple-600 focus:ring-purple-500"
              />
              Extract Numbers &amp; Financial Metrics
            </label>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 ml-auto">
              <FaShieldAlt /> Grounded Transcript Synthesis
            </span>
          </div>

          <Button
            type="button"
            variant="cta"
            isLoading={loading}
            onClick={() => void handleGenerateSummary()}
            className="w-full py-4 text-base sm:text-lg"
          >
            <FaMagic className="mr-2" />
            {loading ? "Analyzing & Summarizing Video..." : "Generate AI Video Summary"}
          </Button>

          {error && (
            <ErrorNotice message={error} onRetry={() => void handleGenerateSummary()} />
          )}

          {/* Generated AI Summary Output */}
          {generatedSummary && (
            <div className="rounded-2xl border-2 border-purple-200 bg-purple-50/40 p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-200/70 pb-3">
                <div className="min-w-0">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-700 block">
                    AI Summary Output · {activeFramework.replace("-", " ")}
                  </span>
                  {resolvedMeta && (
                    <h3 className="text-base font-black text-slate-900 truncate">
                      {resolvedMeta.title} ({resolvedMeta.channel})
                    </h3>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <SaveToVideoPackButton
                    compact
                    toastMessage="Video summary saved to Active Video Pack!"
                    isAlreadySaved={pack.notes.includes(generatedSummary.slice(0, 80))}
                    onSave={() =>
                      updatePack({
                        topic: resolvedMeta?.title || pack.topic,
                        notes: [pack.notes, `[Video Summary]\n${generatedSummary}`]
                          .filter(Boolean)
                          .join("\n\n"),
                      })
                    }
                  />
                  <CopyButton text={generatedSummary} variant="button" label="Copy Summary" />
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 text-sm text-slate-800 whitespace-pre-wrap leading-relaxed max-h-[520px] overflow-y-auto">
                {generatedSummary}
              </div>
            </div>
          )}

          {/* Generated Prompt Codebox (Collapsible Secondary Tool) */}
          <details className="pt-2 border-t border-slate-100">
            <summary className="cursor-pointer text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 select-none">
              <FaRobot className="text-purple-500" /> View / Copy Raw Prompt Template for External LLMs
            </summary>
            <div className="mt-3 space-y-2">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="cursor-pointer px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
                >
                  {copied ? <FaCheckCircle /> : <FaCopy />}
                  {copied ? "Prompt Copied!" : "Copy Full Prompt"}
                </button>
              </div>
              <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-72">
                {getTemplatePrompt(activeFramework)}
              </pre>
            </div>
          </details>
        </div>

        {generatedSummary && (
          <WorkflowBridgeCard
            subtitle="Turn your synthesized insights into high-CTR YouTube titles or an episodic Shorts mini-series."
            actions={[
              {
                href: `/tools/youtube-title-generator?topic=${encodeURIComponent(resolvedMeta?.title || "")}`,
                label: "Generate High-CTR Titles",
                description: "Create 10 scored title concepts tailored to this topic.",
              },
              {
                href: `/tools/shorts-series-planner?topic=${encodeURIComponent(resolvedMeta?.title || "")}`,
                label: "Plan Multi-Part Shorts Series",
                description: "Split key lessons into connected Watch Series Shorts episodes.",
              },
            ]}
          />
        )}

        {/* Repurposing Cross-Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/tools/youtube-transcript-downloader"
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-purple-300 transition-all shadow-sm block"
          >
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5 mb-1">
              <FaFileAlt className="text-indigo-500" /> Step 1: Get Transcript
            </h4>
            <p className="text-xs text-slate-600">
              Download clean subtitles in plain text or SRT without paying for software.
            </p>
          </Link>

          <Link
            href="/tools/youtube-title-generator"
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-purple-300 transition-all shadow-sm block"
          >
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5 mb-1">
              <FaMagic className="text-purple-500" /> Step 2: Repurpose Titles
            </h4>
            <p className="text-xs text-slate-600">
              Generate 20+ clickable titles based on the synthesized core takeaway.
            </p>
          </Link>

          <Link
            href="/tools/youtube-shorts-script-planner"
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-purple-300 transition-all shadow-sm block"
          >
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5 mb-1">
              <FaMobileAlt className="text-rose-500" /> Step 3: Script Shorts
            </h4>
            <p className="text-xs text-slate-600">
              Pace your 60-second summary clips for maximum audience retention.
            </p>
          </Link>
        </div>
      </div>
    </ToolPageLayout>
  );
}
