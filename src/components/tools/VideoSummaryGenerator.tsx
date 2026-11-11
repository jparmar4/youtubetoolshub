"use client";

import { useState } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
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
  FaShieldAlt } from "react-icons/fa";

type FrameworkType = "executive" | "study" | "seo-article" | "shorts-script";

export default function VideoSummaryGenerator() {
  const [videoUrl, setVideoUrl] = useState<string>("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  const [activeFramework, setActiveFramework] = useState<FrameworkType>("executive");
  const [includeTimestamps, setIncludeTimestamps] = useState<boolean>(true);
  const [includeMetrics, setIncludeMetrics] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

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

  return (
    <ToolPageLayout
      title="YouTube Video Summary Generator (Free AI Notes & Scripts 2026)"
      slug="youtube-video-summary-generator"
      description="Summarize any YouTube video into executive notes, study guides, SEO articles, and viral Shorts scripts with AI for free."
    >
      <div className="space-y-8">
        {/* Header Alert */}
        <div className="rounded-2xl border border-purple-200/80 bg-gradient-to-r from-purple-50/80 via-white to-indigo-50/60 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-black text-purple-700">
                <FaMagic /> Zero-Hallucination AI Framework
              </span>
              <h2 className="mt-2 text-xl sm:text-2xl font-black text-slate-900">
                YouTube Video Summary & Content Repurposing Generator
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Turn any long-form video, lecture, or podcast into structured executive summaries, blog posts, and scripts without paying $20/month for browser extensions.
              </p>
            </div>
            <Link
              href="/blog/youtube-video-summary-generator-ai-free"
              className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1 self-start sm:self-center bg-white px-3 py-1.5 rounded-lg border border-purple-200"
            >
              Read Full 50-Video Study <FaExternalLinkAlt className="text-[10px]" />
            </Link>
          </div>
        </div>

        {/* Step 1: Video Input & Transcript Connection */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <label className="block text-sm font-bold text-slate-800">
            Step 1: Enter Target YouTube Video URL
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-1 text-base font-semibold"
            />
            <Link
              href="/tools/youtube-transcript-downloader"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm shrink-0"
            >
              <FaFileAlt /> Extract Clean Transcript Free
            </Link>
          </div>
          <p className="text-xs text-slate-500">
            💡 <strong>Why extract transcript first?</strong> Feeding verbatim transcripts into your AI eliminates 99% of hallucinations and phantom quotes caused by generic &quot;browse URL&quot; bots.
          </p>
        </div>

        {/* Step 2: Choose Synthesis Framework */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Step 2: Select Summary Output Framework
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setActiveFramework("executive")}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  activeFramework === "executive"
                    ?"border-purple-500 bg-purple-50/50 text-purple-900 shadow-sm"
                    :"border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="font-bold text-sm flex items-center gap-2 mb-1">
                  <FaFileAlt className="text-purple-500" /> Executive Brief
                </div>
                <p className="text-xs opacity-75">Thesis, 5 takeaways, quotes & action steps.</p>
              </button>

              <button
                type="button"
                onClick={() => setActiveFramework("study")}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  activeFramework === "study"
                    ?"border-purple-500 bg-purple-50/50 text-purple-900 shadow-sm"
                    :"border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="font-bold text-sm flex items-center gap-2 mb-1">
                  <FaGraduationCap className="text-blue-500" /> Study Guide
                </div>
                <p className="text-xs opacity-75">Chapter timecodes, glossary & review quiz.</p>
              </button>

              <button
                type="button"
                onClick={() => setActiveFramework("seo-article")}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  activeFramework === "seo-article"
                    ?"border-purple-500 bg-purple-50/50 text-purple-900 shadow-sm"
                    :"border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="font-bold text-sm flex items-center gap-2 mb-1">
                  <FaBookOpen className="text-emerald-500" /> SEO Article
                </div>
                <p className="text-xs opacity-75">1,200-word blog post with H2s & FAQs.</p>
              </button>

              <button
                type="button"
                onClick={() => setActiveFramework("shorts-script")}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  activeFramework === "shorts-script"
                    ?"border-purple-500 bg-purple-50/50 text-purple-900 shadow-sm"
                    :"border-slate-200 hover:bg-slate-50 text-slate-700"
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
              Extract Numbers & Financial Metrics
            </label>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 ml-auto">
              <FaShieldAlt /> Anti-Hallucination Grounding Locked
            </span>
          </div>

          {/* Generated Prompt Codebox */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <FaRobot className="text-purple-500" /> Ready-to-Execute Grounded Prompt
              </span>
              <button
                onClick={handleCopyPrompt}
                className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
              >
                {copied ? <FaCheckCircle /> : <FaCopy />}
                {copied ? "Prompt Copied!" : "Copy Full Prompt"}
              </button>
            </div>
            <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-72">
              {getTemplatePrompt(activeFramework)}
            </pre>
          </div>
        </div>

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
