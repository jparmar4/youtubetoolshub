"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
import ErrorNotice from "@/components/ui/ErrorNotice";
import PresetPills from "@/components/ui/PresetPills";
import ToolEmptyState from "@/components/ui/ToolEmptyState";
import WorkflowBridgeCard from "@/components/tools/WorkflowBridgeCard";
import { useExport } from "@/hooks/useExport";
import { extractVideoId } from "@/lib/utils";
import {
  FaSearch,
  FaFileDownload,
  FaCopy,
  FaCheck,
  FaTags,
  FaClock,
  FaListUl,
  FaFileAlt,
  FaPlay,
  FaBookOpen,
  FaVideo,
  FaMagic,
  FaExternalLinkAlt,
} from "react-icons/fa";
import Link from "next/link";
import CreatorSoftwareCard from "@/components/ads/CreatorSoftwareCard";

interface TranscriptLine {
  start: string;
  seconds: number;
  text: string;
}

const SAMPLE_TRANSCRIPTS: Record<
  string,
  {
    title: string;
    channel: string;
    duration: string;
    lines: TranscriptLine[];
  }
> = {
  demo: {
    title: "How to Master YouTube SEO & Rank #1 in Search (2026 Strategy)",
    channel: "Creator Growth Blueprint",
    duration: "12:45",
    lines: [
      { start: "0:00", seconds: 0, text: "If you want to master YouTube SEO in 2026 and rank your videos number one in search, you need to understand how the neural algorithm actually evaluates content." },
      { start: "0:15", seconds: 15, text: "Most creators think YouTube SEO is just about stuffing 30 keywords into your video tags or repeating your title in the description five times." },
      { start: "0:32", seconds: 32, text: "That strategy died years ago. Today, Google's recommendation network reads your spoken video transcript directly using automated speech recognition." },
      { start: "0:48", seconds: 48, text: "When you pronounce high-intent keywords and semantic entities in the first 30 seconds of your video, YouTube maps your spoken audio into its knowledge graph." },
      { start: "1:05", seconds: 65, text: "In this breakdown, we will cover the three core ranking pillars: click-through rate, average percentage viewed, and session resolution." },
      { start: "1:24", seconds: 84, text: "Let us start with keyword research. You should look for search queries with high intent and low topical saturation rather than broad viral terms." },
      { start: "1:45", seconds: 105, text: "When you study competitor video transcripts, you can extract the exact phrases and secondary keywords that earned them top search positions." },
      { start: "2:08", seconds: 128, text: "Notice how top ranking videos naturally repeat contextual phrases like audience retention, video packaging, Google Key Moments, and click through rate." },
      { start: "2:30", seconds: 150, text: "By turning spoken video dialogue into text, you can repurpose long-form tutorials into blog articles, newsletter issues, and LinkedIn posts in minutes." },
      { start: "2:55", seconds: 175, text: "Next, we will format our chapters with precision timestamps starting at zero zero so Google search can feature your video as a Key Moment." },
      { start: "3:20", seconds: 200, text: "Notice that YouTube video transcripts also provide accessibility benefits, ensuring hearing-impaired viewers and multilingual audiences can engage with your message." },
      { start: "3:45", seconds: 225, text: "Always audit your auto-generated subtitles in YouTube Studio to correct technical terms, software names, and brand acronyms before publishing." },
      { start: "4:10", seconds: 250, text: "Finally, pair your high-relevance transcript with a clean 4-tier tag structure and high-contrast thumbnail packaging to maintain an evergreen top-three search ranking." },
    ] } };

const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't",
  "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
  "can", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing",
  "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't",
  "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself",
  "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is",
  "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no",
  "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves",
  "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so",
  "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there",
  "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to",
  "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were",
  "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's",
  "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're",
  "you've", "your", "yours", "yourself", "yourselves", "us", "will", "just", "like", "also", "into", "video", "videos"
]);

const TRANSCRIPT_PRESETS = [
  { label: "🎥 First YouTube Video (CC)", url: "https://www.youtube.com/watch?v=jNQXAC9IVRw" },
  { label: "🎵 Classic Music Video (CC)", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { label: "⚡ Instant SEO Demo", url: "https://www.youtube.com/watch?v=jNQXAC9IVRw&demo=true" },
];

interface CaptionLanguageOption {
  languageCode: string;
  name: string;
  isAutoGenerated: boolean;
}

export default function TranscriptDownloader() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedLang, setSelectedLang] = useState<string>("");
  const [viewMode, setViewMode] = useState<"timestamps" | "plain" | "srt">("timestamps");
  const [videoData, setVideoData] = useState<{
    title: string;
    channel: string;
    duration: string;
    durationSeconds?: number;
    lines: TranscriptLine[];
    videoId: string;
    source?: string;
    notice?: string;
    languageCode?: string;
    languageName?: string;
    isAutoGenerated?: boolean;
    availableLanguages?: CaptionLanguageOption[];
  } | null>(null);

  // Repurposing Engine State
  const [repurposeTab, setRepurposeTab] = useState<"chapters" | "article" | "hooks">("chapters");
  const [chaptersCopied, setChaptersCopied] = useState(false);
  const [articleCopied, setArticleCopied] = useState(false);
  const [copiedHookId, setCopiedHookId] = useState<number | null>(null);

  const { downloadText, downloadCsv } = useExport();

  const handleExtract = useCallback(async (customUrl?: string, langOverride?: string) => {
    const targetUrl = (customUrl ?? url).trim();
    setError("");

    if (!targetUrl) {
      setError("Please paste a YouTube video URL or ID.");
      return;
    }

    const videoId = extractVideoId(targetUrl);
    if (!videoId) {
      setError("Invalid YouTube URL. Please enter a valid watch URL, Shorts link, or 11-character video ID.");
      return;
    }

    if (targetUrl.includes("demo=true")) {
      setVideoData({
        videoId,
        title: SAMPLE_TRANSCRIPTS.demo.title,
        channel: SAMPLE_TRANSCRIPTS.demo.channel,
        duration: SAMPLE_TRANSCRIPTS.demo.duration,
        durationSeconds: 765,
        lines: SAMPLE_TRANSCRIPTS.demo.lines,
        source: "demo",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: targetUrl,
          videoId,
          ...(langOverride ? { lang: langOverride } : {}),
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error || !Array.isArray(data.lines)) {
        setError(data.error || "Could not extract transcript for this video URL.");
        setVideoData(null);
        return;
      }

      setSelectedLang(data.languageCode || "");
      setVideoData({
        videoId: data.videoId || videoId,
        title: data.title || `YouTube Video (${videoId})`,
        channel: data.channel || "YouTube Creator",
        duration: data.duration || "N/A",
        durationSeconds: typeof data.durationSeconds === "number" ? data.durationSeconds : undefined,
        lines: data.lines,
        source: data.source,
        notice: typeof data.notice === "string" ? data.notice : undefined,
        languageCode: data.languageCode,
        languageName: data.languageName,
        isAutoGenerated: data.isAutoGenerated,
        availableLanguages: Array.isArray(data.availableLanguages) ? data.availableLanguages : [],
      });
    } catch {
      setError("Network error while extracting video transcript. Please try again.");
      setVideoData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  // Support deep links like /tools/youtube-transcript-downloader?v=VIDEO_ID or ?url=...
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const incoming = params.get("url") || params.get("v") || params.get("videoId") || "";
    const id = extractVideoId(incoming.trim());
    if (!id) return;
    const normalized = `https://www.youtube.com/watch?v=${id}`;
    const timer = window.setTimeout(() => {
      setUrl(normalized);
      void handleExtract(normalized);
    }, 0);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDemo = () => {
    const demoUrl = "https://www.youtube.com/watch?v=jNQXAC9IVRw&demo=true";
    setUrl(demoUrl);
    setActivePreset("preset-2");
    void handleExtract(demoUrl);
  };

  // Full plain text
  const plainText = useMemo(() => {
    if (!videoData) return "";
    return videoData.lines.map((l) => l.text).join(" ");
  }, [videoData]);

  // SRT formatted text (uses next line start time for clean subtitle timing)
  const srtText = useMemo(() => {
    if (!videoData) return "";
    return videoData.lines
      .map((l, index) => {
        const startSec = l.seconds;
        const nextLine = videoData.lines[index + 1];
        const endSec =
          nextLine && nextLine.seconds > startSec
            ? nextLine.seconds
            : startSec + 4;
        const formatSrtTime = (sec: number) => {
          const h = Math.floor(sec / 3600).toString().padStart(2, "0");
          const m = Math.floor((sec % 3600) / 60).toString().padStart(2, "0");
          const s = Math.floor(sec % 60).toString().padStart(2, "0");
          return `${h}:${m}:${s},000`;
        };
        return `${index + 1}\n${formatSrtTime(startSec)} --> ${formatSrtTime(endSec)}\n${l.text}\n`;
      })
      .join("\n");
  }, [videoData]);

  // Filtered lines by search term
  const filteredLines = useMemo(() => {
    if (!videoData) return [];
    if (!searchFilter.trim()) return videoData.lines;
    const q = searchFilter.toLowerCase();
    return videoData.lines.filter(
      (l) => l.text.toLowerCase().includes(q) || l.start.includes(q)
    );
  }, [videoData, searchFilter]);

  // Keyword extraction & frequency analytics
  const extractedKeywords = useMemo(() => {
    if (!videoData) return [];
    const words = plainText
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOP_WORDS.has(w));

    const freqMap: Record<string, number> = {};
    for (const word of words) {
      freqMap[word] = (freqMap[word] || 0) + 1;
    }

    return Object.entries(freqMap)
      .map(([keyword, count]) => ({ keyword, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);
  }, [videoData, plainText]);

  // Total word count and metrics
  const stats = useMemo(() => {
    if (!videoData) return null;
    const totalWords = plainText.trim() ? plainText.trim().split(/\s+/).length : 0;
    const readTimeMinutes = Math.max(1, Math.ceil(totalWords / 200));
    const spanSeconds =
      videoData.durationSeconds && videoData.durationSeconds > 0
        ? videoData.durationSeconds
        : videoData.lines[videoData.lines.length - 1]?.seconds || 0;
    const estimatedWpm =
      spanSeconds >= 10 ? Math.max(1, Math.round((totalWords / spanSeconds) * 60)) : 0;
    return {
      totalWords,
      readTimeMinutes,
      estimatedWpm,
      totalLines: videoData.lines.length };
  }, [videoData, plainText]);

  // Intelligent Chapters Generator (derived directly from extracted lines)
  const generatedChapters = useMemo(() => {
    if (!videoData || videoData.lines.length === 0) return [];
    const lines = videoData.lines;
    if (videoData.source === "description-chapters") {
      return lines.map((l) => ({ time: l.start, title: l.text }));
    }

    const chapters: Array<{ time: string; title: string }> = [];
    const introSnippet = lines[0].text
      .split(/\s+/)
      .slice(0, 6)
      .join(" ")
      .replace(/[,.;!?]+$/, "");
    chapters.push({ time: "0:00", title: introSnippet || "Intro" });

    const step = Math.max(2, Math.floor(lines.length / 6));
    for (let i = step; i < lines.length; i += step) {
      const line = lines[i];
      const words = line.text
        .split(/\s+/)
        .slice(0, 6)
        .join(" ")
        .replace(/[,.;!?]+$/, "");
      if (words) {
        chapters.push({ time: line.start, title: words });
      }
    }
    return chapters;
  }, [videoData]);

  const chaptersFormattedText = useMemo(() => {
    return generatedChapters.map((c) => `${c.time} - ${c.title}`).join("\n");
  }, [generatedChapters]);

  // Intelligent SEO Blog Article Generator (grounded in actual extracted lines)
  const generatedArticle = useMemo(() => {
    if (!videoData) return { title: "", tldr: "", markdown: "", html: "" };
    const cleanTitle = videoData.title.replace(/\(Demo\)/gi, "").trim();
    const tldr = videoData.lines.slice(0, 3).map((l) => l.text).join(" ");

    const lines = videoData.lines;
    const partSize = Math.max(1, Math.ceil(lines.length / 3));
    const sec1Text = lines.slice(0, partSize).map((l) => l.text).join(" ");
    const sec2Text = lines.slice(partSize, partSize * 2).map((l) => l.text).join(" ");
    const sec3Text = lines.slice(partSize * 2).map((l) => l.text).join(" ");

    const markdown = `# ${cleanTitle}

> **Executive Summary (TL;DR):** ${tldr}

---

## 1. Opening Context & Core Idea
${sec1Text}

## 2. Key Details & Main Walkthrough
${sec2Text || sec1Text}

## 3. Closing Takeaways
${sec3Text || sec2Text || sec1Text}
`;

    const html = `<h1>${cleanTitle}</h1>
<p><strong>Executive Summary (TL;DR):</strong> ${tldr}</p>
<hr/>
<h2>1. Opening Context &amp; Core Idea</h2>
<p>${sec1Text}</p>
<h2>2. Key Details &amp; Main Walkthrough</h2>
<p>${sec2Text || sec1Text}</p>
<h2>3. Closing Takeaways</h2>
<p>${sec3Text || sec2Text || sec1Text}</p>`;

    return { title: cleanTitle, tldr, markdown, html };
  }, [videoData]);

  // Dynamic Shorts / Reels Clip Moments extracted directly from the actual transcript
  const viralHooks = useMemo(() => {
    if (!videoData || videoData.lines.length === 0) return [];
    const lines = videoData.lines;
    const labels = [
      { type: "Opening Hook Clip", badge: "0-3s Opener", visualCue: "Bold kinetic caption synced to the opening line with tight framing." },
      { type: "Core Claim Clip", badge: "High Clarity", visualCue: "Add on-screen headline summarizing the key statement." },
      { type: "Mid-Video Insight", badge: "Retention Spike", visualCue: "Cut to supporting B-roll or screen capture while keeping captions centered." },
      { type: "Quotable Soundbite", badge: "Shareable Quote", visualCue: "Highlight the key keyword in accent color as each phrase lands." },
      { type: "Closing Payoff", badge: "CTA / Loop", visualCue: "End on a crisp takeaway that loops smoothly back to the opening frame." },
    ];

    const sliceCount = Math.min(5, Math.max(1, Math.ceil(lines.length / 2)));
    const step = Math.max(1, Math.floor(lines.length / sliceCount));
    const clips: Array<{
      id: number;
      type: string;
      duration: string;
      badge: string;
      script: string;
      visualCue: string;
    }> = [];

    for (let idx = 0; idx < sliceCount && idx < labels.length; idx++) {
      const startIdx = Math.min(idx * step, lines.length - 1);
      const endIdx = Math.min(startIdx + 2, lines.length - 1);
      const snippet = lines
        .slice(startIdx, endIdx + 1)
        .map((l) => l.text)
        .join(" ")
        .trim();
      if (!snippet) continue;
      clips.push({
        id: idx + 1,
        type: labels[idx].type,
        duration: `${lines[startIdx].start} – ${lines[endIdx].start}`,
        badge: labels[idx].badge,
        script: snippet,
        visualCue: labels[idx].visualCue,
      });
    }
    return clips;
  }, [videoData]);

  const handleCopyChapters = async () => {
    try {
      await navigator.clipboard.writeText(chaptersFormattedText);
      setChaptersCopied(true);
      setTimeout(() => setChaptersCopied(false), 2500);
    } catch {
      /* ignore */
    }
  };

  const handleCopyArticle = async () => {
    try {
      await navigator.clipboard.writeText(generatedArticle.markdown);
      setArticleCopied(true);
      setTimeout(() => setArticleCopied(false), 2500);
    } catch {
      /* ignore */
    }
  };

  const handleCopyHook = async (hookId: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedHookId(hookId);
      setTimeout(() => setCopiedHookId(null), 2500);
    } catch {
      /* ignore */
    }
  };

  // Download handler
  const handleDownload = (format: "txt" | "srt" | "csv") => {
    if (!videoData) return;
    let content = "";
    let mimeType = "text/plain";
    const filename = `transcript-${videoData.videoId || "export"}.${format}`;

    if (format === "txt") {
      content =
        viewMode === "timestamps"
          ? videoData.lines.map((l) => `[${l.start}] ${l.text}`).join("\n\n")
          : plainText;
      mimeType = "text/plain";
    } else if (format === "srt") {
      content = srtText;
      mimeType = "application/x-subrip";
    } else if (format === "csv") {
      content =
        "Timestamp,Seconds,Subtitle Text\n" +
        videoData.lines
          .map((l) => `"${l.start}",${l.seconds},"${l.text.replace(/"/g, '""')}"`)
          .join("\n");
      mimeType = "text/csv";
    }

    if (format === "csv") {
      downloadCsv(filename, content);
    } else {
      downloadText(filename, content, mimeType);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Input Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <FaFileAlt className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Extract Video Transcript & Subtitles
            </h2>
          </div>
          <button
            type="button"
            onClick={loadDemo}
            className="text-xs sm:text-sm font-semibold text-purple-600 hover:text-purple-700 underline underline-offset-4 flex items-center gap-1.5 cursor-pointer"
          >
            <FaPlay className="w-3 h-3" /> Load Sample Video
          </button>
        </div>

        <p className="text-sm text-slate-600 mb-4">
          Paste any YouTube URL or 11-character video ID to extract synchronized text captions, download as TXT/SRT, or inspect spoken SEO keywords.
        </p>

        <div className="mb-4">
          <PresetPills
            label="Try real video or instant demo"
            options={TRANSCRIPT_PRESETS.map((p, idx) => ({
              id: `preset-${idx}`,
              label: p.label.replace(/^\S+\s/, ""),
              icon: p.label.match(/^\S+/)?.[0],
            }))}
            activeId={activePreset}
            onSelect={(id) => {
              const idx = Number(id.replace("preset-", ""));
              const preset = TRANSCRIPT_PRESETS[idx];
              if (!preset) return;
              setActivePreset(id);
              setUrl(preset.url);
              void handleExtract(preset.url);
            }}
          />
        </div>

        <form
          toolname="extract_youtube_transcript"
          tooldescription="Extract complete transcripts, plain text, and SRT subtitles from any YouTube video"
          onSubmit={(e) => {
            e.preventDefault();
            void handleExtract();
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="flex-1">
            <Input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setActivePreset(null);
              }}
              placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ or dQw4w9WgXcQ"
              className="w-full text-base"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  void handleExtract();
                }
              }}
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 sm:w-auto w-full"
          >
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Extracting...
              </>
            ) : (
              <>
                <FaSearch className="w-4 h-4" />
                Extract Transcript
              </>
            )}
          </Button>
        </form>

        {error && (
          <ErrorNotice message={error} title="Extraction Notice" className="mt-4" />
        )}
      </div>

      {/* Empty state before first extraction */}
      {!loading && !error && !videoData && (
        <ToolEmptyState
          title="Transcript will appear here"
          description="Paste a YouTube URL or 11-character video ID above to extract synchronized captions with timestamps, keyword stats, and TXT / SRT / CSV downloads."
        />
      )}

      {/* Transcript Results */}
      {videoData && (
        <div className="space-y-6">
          {/* Extracted Video Info Header */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 truncate">
                  {videoData.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  {videoData.channel} · Duration {videoData.duration}
                  {videoData.languageName ? ` · ${videoData.languageName}${videoData.isAutoGenerated ? " (auto)" : ""}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 self-start sm:self-center shrink-0">
                {videoData.availableLanguages && videoData.availableLanguages.length > 1 && (
                  <select
                    aria-label="Caption language"
                    value={selectedLang || videoData.languageCode || ""}
                    onChange={(e) => {
                      const nextLang = e.target.value;
                      setSelectedLang(nextLang);
                      void handleExtract(url || videoData.videoId, nextLang);
                    }}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 focus:border-purple-500 focus:outline-none"
                  >
                    {videoData.availableLanguages.map((track) => (
                      <option key={`${track.languageCode}-${track.isAutoGenerated}`} value={track.languageCode}>
                        {track.name}{track.isAutoGenerated ? " (auto)" : ""}
                      </option>
                    ))}
                  </select>
                )}
                {videoData.source && (
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                      videoData.source === "youtube-captions"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : videoData.source === "description-chapters"
                          ? "border-amber-200 bg-amber-50 text-amber-800"
                          : "border-purple-200 bg-purple-50 text-purple-700"
                    }`}
                  >
                    {videoData.source === "youtube-captions"
                      ? "Verified YouTube Captions"
                      : videoData.source === "description-chapters"
                        ? "Description Chapters Only"
                        : "Interactive Sample Demo"}
                  </span>
                )}
              </div>
            </div>
            {videoData.notice && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-xs font-medium text-amber-900">
                {videoData.notice}
              </div>
            )}
          </div>

          {/* Metadata & Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="text-xs text-slate-500 uppercase font-semibold">Total Words</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {stats?.totalWords.toLocaleString()}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="text-xs text-slate-500 uppercase font-semibold">Reading Time</span>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                ~{stats?.readTimeMinutes} min
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="text-xs text-slate-500 uppercase font-semibold">Speaking Pace</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {stats?.estimatedWpm ? `${stats.estimatedWpm} WPM` : "N/A"}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="text-xs text-slate-500 uppercase font-semibold">Transcript Lines</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {stats?.totalLines}
              </p>
            </div>
          </div>

          {/* Keyword Extraction Panel */}
          {extractedKeywords.length > 0 && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50/80 via-white to-indigo-50/50 border border-purple-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <FaTags className="w-4 h-4 text-purple-600"/>
                <h3 className="text-base font-bold text-slate-900">
                  Spoken Keyword Frequency (SEO & Entity Salience)
                </h3>
              </div>
              <p className="text-xs text-slate-600 mb-4">
                These are the most prominent spoken terms extracted from the audio dialogue. YouTube NLP algorithms use these entities to index search relevance.
              </p>
              <div className="flex flex-wrap gap-2">
                {extractedKeywords.map(({ keyword, count }) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-purple-200 text-xs font-medium text-slate-800 shadow-xs"
                  >
                    <span className="font-semibold text-purple-600">{keyword}</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[11px] font-bold">
                      {count}x
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Main Transcript Viewer */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Top Toolbar */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-50/50">
              {/* View Mode Toggle */}
              <div className="inline-flex p-1 bg-slate-200/70 rounded-xl self-start">
                <button
                  type="button"
                  onClick={() => setViewMode("timestamps")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === "timestamps"
                      ? "bg-white text-purple-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <FaClock className="w-3.5 h-3.5" /> Timestamps
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("plain")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === "plain"
                      ? "bg-white text-purple-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <FaFileAlt className="w-3.5 h-3.5" /> Plain Text
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("srt")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === "srt"
                      ? "bg-white text-purple-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <FaListUl className="w-3.5 h-3.5" /> SRT Format
                </button>
              </div>

              {/* Search in Transcript */}
              {viewMode === "timestamps" && (
                <div className="relative flex-1 max-w-xs">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search dialogue..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <CopyButton
                  text={
                    viewMode === "timestamps"
                      ? videoData.lines.map((l) => `[${l.start}] ${l.text}`).join("\n\n")
                      : viewMode === "srt"
                      ? srtText
                      : plainText
                  }
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                />
                <button
                  type="button"
                  onClick={() => handleDownload("txt")}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <FaFileDownload className="w-3 h-3" /> TXT
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload("srt")}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <FaFileDownload className="w-3 h-3" /> SRT
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload("csv")}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <FaFileDownload className="w-3 h-3" /> CSV
                </button>
              </div>
            </div>

            {/* Transcript Body */}
            <div className="p-6 max-h-[500px] overflow-y-auto font-sans leading-relaxed text-slate-800">
              {viewMode === "timestamps" && (
                <div className="space-y-4">
                  {filteredLines.length > 0 ? (
                    filteredLines.map((line, idx) => (
                      <div
                        key={idx}
                        className="group flex items-start gap-4 p-2.5 rounded-xl hover:bg-purple-50/50 transition-colors"
                      >
                        <span className="inline-block px-2.5 py-1 text-xs font-mono font-semibold rounded-md bg-purple-100 text-purple-700 flex-shrink-0">
                          {line.start}
                        </span>
                        <p className="text-sm text-slate-700 group-hover:text-slate-900">
                          {line.text}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500 italic py-8 text-center">
                      No dialogue found matching "{searchFilter}"
                    </p>
                  )}
                </div>
              )}

              {viewMode === "plain" && (
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                  {plainText}
                </p>
              )}

              {viewMode === "srt" && (
                <pre className="font-mono text-xs whitespace-pre-wrap text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {srtText}
                </pre>
              )}
            </div>
          </div>

          {/* =========================================================================
              AI TRANSCRIPT REPURPOSING SUITE (CHAPTERS, BLOG & SHORTS HOOKS)
             ========================================================================= */}
          <div className="rounded-3xl border border-purple-200/90 bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/40 p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-black text-purple-700">
                    <FaMagic className="text-purple-600" /> Instant Repurposing Studio
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                    100% Free · Browser-Powered
                  </span>
                </div>
                <h3 className="mt-2 text-xl sm:text-2xl font-black text-slate-900">
                  Turn Video Transcript into 3 High-Growth Formats
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">
                  Convert the extracted dialogue directly into timestamp chapters, structured article drafts, and clip-ready Shorts quotes.
                </p>
              </div>
            </div>

            {/* Repurposing Action Tabs */}
            <div className="mt-6 flex flex-wrap gap-2 border-b border-purple-100 pb-4">
              <button
                type="button"
                onClick={() => setRepurposeTab("chapters")}
                className={`cursor-pointer flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition-all ${
                  repurposeTab === "chapters"
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
                }`}
              >
                <FaClock />
                <span>1. Generate Timestamp Chapters</span>
              </button>

              <button
                type="button"
                onClick={() => setRepurposeTab("article")}
                className={`cursor-pointer flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition-all ${
                  repurposeTab === "article"
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
                }`}
              >
                <FaBookOpen />
                <span>2. Video → SEO Blog Article</span>
              </button>

              <button
                type="button"
                onClick={() => setRepurposeTab("hooks")}
                className={`cursor-pointer flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition-all ${
                  repurposeTab === "hooks"
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
                }`}
              >
                <FaVideo />
                <span>3. Extract 5 Viral Shorts Hooks</span>
              </button>
            </div>

            {/* Tab 1: Timestamp Chapters */}
            {repurposeTab === "chapters" && (
              <div className="mt-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-xs text-slate-600">
                    Google Search features videos with valid timestamp chapters starting at <code>00:00</code> as interactive <strong>Key Moments</strong>.
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleCopyChapters}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg shadow-xs"
                    >
                      {chaptersCopied ? <FaCheck className="text-emerald-300" /> : <FaCopy />}
                      <span>{chaptersCopied ? "Chapters Copied!" : "Copy Chapters"}</span>
                    </Button>
                    <Link
                      href="/tools/youtube-timestamp-generator"
                      className="inline-flex items-center gap-1 rounded-lg border border-purple-200 bg-white px-3 py-1.5 text-xs font-bold text-purple-700 hover:bg-purple-50"
                    >
                      <span>Timestamp Generator</span>
                      <FaExternalLinkAlt className="text-[11px]" />
                    </Link>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-purple-200">
                  <pre className="whitespace-pre-wrap leading-relaxed">
                    {chaptersFormattedText}
                  </pre>
                </div>
              </div>
            )}

            {/* Tab 2: SEO Blog Article Converter */}
            {repurposeTab === "article" && (
              <div className="mt-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <span className="rounded-md bg-purple-100 px-2 py-0.5 text-purple-700">
                      ~{stats?.totalWords} Words
                    </span>
                    <span>Ready for WordPress, Ghost, Substack &amp; Medium</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleCopyArticle}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg shadow-xs"
                    >
                      {articleCopied ? <FaCheck className="text-emerald-300" /> : <FaCopy />}
                      <span>{articleCopied ? "Article Copied!" : "Copy Markdown Article"}</span>
                    </Button>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm max-h-[450px] overflow-y-auto">
                  <h2 className="text-lg font-bold text-slate-900">
                    {generatedArticle.title}
                  </h2>
                  <blockquote className="border-l-4 border-purple-500 bg-purple-50/50 p-3 my-3 text-xs italic text-slate-700">
                    <strong>Executive Summary (TL;DR):</strong> {generatedArticle.tldr}
                  </blockquote>
                  <hr className="my-4 border-slate-200" />
                  <pre className="text-xs font-mono whitespace-pre-wrap text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {generatedArticle.markdown}
                  </pre>
                </div>
              </div>
            )}

            {/* Tab 3: Extract 5 Viral Shorts / Reels Hooks */}
            {repurposeTab === "hooks" && (
              <div className="mt-5 space-y-4">
                <p className="text-xs text-slate-600">
                  The first 3 seconds of a YouTube Short determine whether viewers swipe or watch. These 5 high-retention hook scripts are extracted from the spoken dialogue.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {viralHooks.map((hook) => (
                    <div
                      key={hook.id}
                      className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-[11px] font-black uppercase text-purple-700">
                            {hook.type}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500">
                            {hook.duration}
                          </span>
                        </div>

                        <p className="text-xs font-medium text-slate-900 leading-relaxed">
                          &ldquo;{hook.script}&rdquo;
                        </p>

                        <div className="mt-3 rounded-xl bg-slate-50 p-2.5 text-[11px] text-slate-600 border border-slate-100">
                          <span className="font-bold text-purple-600 block mb-0.5">
                            Visual B-Roll Action:
                          </span>
                          {hook.visualCue}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-emerald-600">
                          ✓ {hook.badge}
                        </span>
                        <Button
                          onClick={() => handleCopyHook(hook.id, hook.script)}
                          size="sm"
                          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                        >
                          {copiedHookId === hook.id ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                          <span>{copiedHookId === hook.id ? "Copied" : "Copy Hook"}</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Next Workflow Step Bridge */}
          <WorkflowBridgeCard
            subtitle="Turn this extracted video transcript into an executive summary or audit its opening 30-second hook."
            actions={[
              {
                href: `/tools/youtube-video-summary-generator?v=${encodeURIComponent(videoData.videoId)}`,
                label: "Summarize With AI",
                description: "Convert this video into key notes, study guides, SEO articles, or Shorts scripts.",
              },
              {
                href: `/tools/hook-auditor?title=${encodeURIComponent(videoData.title)}`,
                label: "Audit Opening Hook",
                description: "Score sentence-1 promise delivery and remove retention-killing fluff.",
              },
            ]}
          />

          {/* Contextual Creator Software Affiliate Card */}
          <CreatorSoftwareCard defaultCategory="video" />
        </div>
      )}
    </div>
  );
}
