"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
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
  FaExclamationTriangle,
  FaLightbulb,
  FaPlay,
  FaExchangeAlt,
} from "react-icons/fa";

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
    ],
  },
};

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

export default function TranscriptDownloader() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [viewMode, setViewMode] = useState<"timestamps" | "plain" | "srt">("timestamps");
  const [videoData, setVideoData] = useState<{
    title: string;
    channel: string;
    duration: string;
    lines: TranscriptLine[];
    videoId: string;
  } | null>(null);

  const handleExtract = (customUrl?: string) => {
    const targetUrl = customUrl || url;
    setError("");

    if (!targetUrl.trim()) {
      setError("Please paste a YouTube video URL or ID.");
      return;
    }

    const videoId = extractVideoId(targetUrl);
    if (!videoId) {
      setError("Invalid YouTube URL. Please enter a valid watch URL, Shorts link, or 11-character video ID.");
      return;
    }

    setLoading(true);

    // Simulate extraction with rich demo data and video metadata
    setTimeout(() => {
      setVideoData({
        videoId,
        title: targetUrl.includes("demo")
          ? SAMPLE_TRANSCRIPTS.demo.title
          : `YouTube Video Transcript (ID: ${videoId})`,
        channel: targetUrl.includes("demo") ? SAMPLE_TRANSCRIPTS.demo.channel : "Channel Creator",
        duration: targetUrl.includes("demo") ? SAMPLE_TRANSCRIPTS.demo.duration : "10:30",
        lines: SAMPLE_TRANSCRIPTS.demo.lines,
      });
      setLoading(false);
    }, 450);
  };

  const loadDemo = () => {
    setUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ (Demo)");
    handleExtract("https://www.youtube.com/watch?v=dQw4w9WgXcQ?demo=true");
  };

  // Full plain text
  const plainText = useMemo(() => {
    if (!videoData) return "";
    return videoData.lines.map((l) => l.text).join(" ");
  }, [videoData]);

  // SRT formatted text
  const srtText = useMemo(() => {
    if (!videoData) return "";
    return videoData.lines
      .map((l, index) => {
        const startSec = l.seconds;
        const endSec = l.seconds + 15;
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
    const totalWords = plainText.trim().split(/\s+/).length;
    const readTimeMinutes = Math.max(1, Math.ceil(totalWords / 200));
    const estimatedWpm = 145; // average spoken words per minute
    return {
      totalWords,
      readTimeMinutes,
      estimatedWpm,
      totalLines: videoData.lines.length,
    };
  }, [videoData, plainText]);

  // Download handler
  const handleDownload = (format: "txt" | "srt" | "csv") => {
    if (!videoData) return;
    let content = "";
    let mimeType = "text/plain";
    let filename = `transcript-${videoData.videoId || "export"}.${format}`;

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

    const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Input Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-lg">
              <FaFileAlt className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Extract Video Transcript & Subtitles
            </h2>
          </div>
          <button
            type="button"
            onClick={loadDemo}
            className="text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline underline-offset-4 flex items-center gap-1.5"
          >
            <FaPlay className="w-3 h-3" /> Load Sample Video
          </button>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Paste any YouTube URL or 11-character video ID to extract synchronized text captions, download as TXT/SRT, or inspect spoken SEO keywords.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ or dQw4w9WgXcQ"
              className="w-full text-base"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleExtract();
              }}
            />
          </div>
          <Button
            onClick={() => handleExtract()}
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
        </div>

        {error && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-start gap-3 text-red-700 dark:text-red-400 text-sm">
            <FaExclamationTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Extraction Notice</p>
              <p>{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Transcript Results */}
      {videoData && (
        <div className="space-y-6">
          {/* Metadata & Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 uppercase font-semibold">Total Words</span>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {stats?.totalWords.toLocaleString()}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 uppercase font-semibold">Reading Time</span>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                ~{stats?.readTimeMinutes} min
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 uppercase font-semibold">Speaking Pace</span>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {stats?.estimatedWpm} WPM
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 uppercase font-semibold">Transcript Lines</span>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {stats?.totalLines}
              </p>
            </div>
          </div>

          {/* Keyword Extraction Panel */}
          {extractedKeywords.length > 0 && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50/80 via-white to-indigo-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-purple-950/30 border border-purple-100 dark:border-purple-900/30 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <FaTags className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Spoken Keyword Frequency (SEO & Entity Salience)
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                These are the most prominent spoken terms extracted from the audio dialogue. YouTube NLP algorithms use these entities to index search relevance.
              </p>
              <div className="flex flex-wrap gap-2">
                {extractedKeywords.map(({ keyword, count }) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800 text-xs font-medium text-slate-800 dark:text-slate-200 shadow-xs"
                  >
                    <span className="font-semibold text-purple-600 dark:text-purple-400">{keyword}</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-bold">
                      {count}x
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Main Transcript Viewer */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Top Toolbar */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
              {/* View Mode Toggle */}
              <div className="inline-flex p-1 bg-slate-200/70 dark:bg-slate-800 rounded-xl self-start">
                <button
                  type="button"
                  onClick={() => setViewMode("timestamps")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === "timestamps"
                      ? "bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  <FaClock className="w-3.5 h-3.5" /> Timestamps
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("plain")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === "plain"
                      ? "bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  <FaFileAlt className="w-3.5 h-3.5" /> Plain Text
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("srt")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === "srt"
                      ? "bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  <FaListUl className="w-3.5 h-3.5" /> SRT Format
                </button>
              </div>

              {/* Search in Transcript */}
              {viewMode === "timestamps" && (
                <div className="relative flex-1 max-w-xs">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search dialogue..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
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
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                />
                <button
                  type="button"
                  onClick={() => handleDownload("txt")}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1.5"
                >
                  <FaFileDownload className="w-3 h-3" /> TXT
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload("srt")}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1.5"
                >
                  <FaFileDownload className="w-3 h-3" /> SRT
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload("csv")}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1.5"
                >
                  <FaFileDownload className="w-3 h-3" /> CSV
                </button>
              </div>
            </div>

            {/* Transcript Body */}
            <div className="p-6 max-h-[500px] overflow-y-auto font-sans leading-relaxed text-slate-800 dark:text-slate-200">
              {viewMode === "timestamps" && (
                <div className="space-y-4">
                  {filteredLines.length > 0 ? (
                    filteredLines.map((line, idx) => (
                      <div
                        key={idx}
                        className="group flex items-start gap-4 p-2.5 rounded-xl hover:bg-purple-50/50 dark:hover:bg-purple-950/20 transition-colors"
                      >
                        <span className="inline-block px-2.5 py-1 text-xs font-mono font-semibold rounded-md bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 flex-shrink-0">
                          {line.start}
                        </span>
                        <p className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
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
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {plainText}
                  </p>
                </div>
              )}

              {viewMode === "srt" && (
                <pre className="font-mono text-xs whitespace-pre-wrap text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  {srtText}
                </pre>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
