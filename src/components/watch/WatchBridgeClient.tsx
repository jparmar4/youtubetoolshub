"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaArrowRight,
  FaClosedCaptioning,
  FaCompressAlt,
  FaEye,
  FaFire,
  FaFlask,
  FaIdCard,
  FaImage,
  FaMicrophone,
  FaSearch,
  FaTags,
  FaYoutube,
} from "react-icons/fa";
import { extractVideoId, getThumbnailUrls } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import YouTubeApiAttribution from "@/components/ui/YouTubeApiAttribution";

export default function WatchBridgeClient({
  initialVideoId = "",
}: {
  initialVideoId?: string;
}) {
  const router = useRouter();
  const [input, setInput] = useState(initialVideoId);
  const [error, setError] = useState("");

  const activeVideoId = useMemo(
    () => extractVideoId(initialVideoId) || extractVideoId(input) || "",
    [initialVideoId, input],
  );

  const thumbs = useMemo(
    () => (activeVideoId ? getThumbnailUrls(activeVideoId) : []),
    [activeVideoId],
  );

  const handleLoad = (e: React.FormEvent) => {
    e.preventDefault();
    const id = extractVideoId(input);
    if (!id) {
      setError("Please paste a valid YouTube Video URL, Shorts link, or 11-character video ID.");
      return;
    }
    setError("");
    router.push(`/watch?v=${encodeURIComponent(id)}`);
  };

  const watchUrl = activeVideoId
    ? `https://www.youtube.com/watch?v=${activeVideoId}`
    : "";

  return (
    <div className="space-y-8">
      <div className="card-3d rounded-3xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-extrabold uppercase tracking-wider mb-3">
          <FaYoutube className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Video X-Ray Audit Workspace</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight mb-2">
          {activeVideoId ? `Video Audit: ${activeVideoId}` : "YouTube Video X-Ray Audit"}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mb-6 max-w-2xl">
          Inspect any YouTube video or Short from a single hub and launch thumbnails, transcripts, backend tags, and AI summaries with one click.
        </p>

        <form onSubmit={handleLoad} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste YouTube watch URL, youtu.be link, Shorts URL, or 11-char ID..."
              error={error}
            />
          </div>
          <Button type="submit" className="shrink-0">
            <FaSearch className="mr-2" />
            Load Video
          </Button>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-500">Flagship X-Ray Workflows:</span>
          <Link
            href={
              activeVideoId
                ? `/tools/thumbnail-critique?v=${encodeURIComponent(activeVideoId)}`
                : "/tools/thumbnail-critique"
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 hover:border-rose-400 font-bold transition-colors"
          >
            <FaEye className="w-3 h-3" /> Thumbnail Critique
          </Link>
          <Link
            href="/tools/hook-auditor"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 hover:border-amber-400 font-bold transition-colors"
          >
            <FaMicrophone className="w-3 h-3" /> Hook &amp; Promise Auditor
          </Link>
          <Link
            href="/tools/ab-packaging-studio"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200 hover:border-purple-400 font-bold transition-colors"
          >
            <FaFlask className="w-3 h-3" /> 3-Way Packaging Studio
          </Link>
          <Link
            href="/tools/channel-outlier-scanner"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 hover:border-emerald-400 font-bold transition-colors"
          >
            <FaFire className="w-3 h-3" /> Channel Outlier Scanner
          </Link>
        </div>
      </div>

      {activeVideoId && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 card-3d rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Thumbnail Preview
              </span>
              <code className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                {activeVideoId}
              </code>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbs[0]?.url || `https://img.youtube.com/vi/${activeVideoId}/hqdefault.jpg`}
                alt={`Thumbnail preview for YouTube video ${activeVideoId}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>1280×720 MaxRes</span>
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-purple-700 hover:underline"
              >
                Open on YouTube ↗
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "AI Thumbnail Critique & Glance Test",
                desc: "Audit this video's thumbnail across 168px mobile feeds, glance blur, and word count.",
                href: `/tools/thumbnail-critique?v=${encodeURIComponent(activeVideoId)}`,
                icon: FaEye,
                color: "text-rose-600 bg-rose-50 border-rose-200",
              },
              {
                title: "First 30s Hook & Promise Auditor",
                desc: "Test whether your opening script delivers the title promise and cut fluff.",
                href: "/tools/hook-auditor",
                icon: FaMicrophone,
                color: "text-amber-700 bg-amber-50 border-amber-200",
              },
              {
                title: "3-Way Test & Compare Studio",
                desc: "Generate 3 psychological packaging concepts for YouTube A/B tests.",
                href: "/tools/ab-packaging-studio",
                icon: FaFlask,
                color: "text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200",
              },
              {
                title: "Download 4K / HD Thumbnails",
                desc: "Fetch all available resolutions (MaxRes, SD, HQ, MQ) for this video.",
                href: "/tools/youtube-thumbnail-downloader",
                icon: FaImage,
                color: "text-pink-600 bg-pink-50 border-pink-200",
              },
              {
                title: "Extract Transcript & Keywords",
                desc: "Pull spoken captions as TXT/SRT and inspect keyword salience.",
                href: "/youtube-transcript-downloader",
                icon: FaClosedCaptioning,
                color: "text-indigo-600 bg-indigo-50 border-indigo-200",
              },
              {
                title: "Extract Hidden Video Tags",
                desc: "Inspect backend YouTube metadata tags used by this upload.",
                href: "/tools/youtube-tag-extractor",
                icon: FaTags,
                color: "text-purple-600 bg-purple-50 border-purple-200",
              },
              {
                title: "AI Video Summary & Notes",
                desc: "Turn long-form dialogue into structured notes and Shorts hooks.",
                href: "/tools/youtube-video-summary-generator",
                icon: FaCompressAlt,
                color: "text-emerald-600 bg-emerald-50 border-emerald-200",
              },
              {
                title: "Channel Outlier Scanner",
                desc: "Benchmark channel uploads against median views to find 2x+ outliers.",
                href: "/tools/channel-outlier-scanner",
                icon: FaFire,
                color: "text-orange-600 bg-orange-50 border-orange-200",
              },
              {
                title: "Resolve Channel ID & Stats",
                desc: "Look up the parent channel ID, subscriber count, and total views.",
                href: "/tools/youtube-channel-id-finder",
                icon: FaIdCard,
                color: "text-sky-600 bg-sky-50 border-sky-200",
              },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group card-3d rounded-2xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 ${action.color}`}>
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <h2 className="font-extrabold text-base text-slate-900 group-hover:text-purple-700 transition-colors">
                      {action.title}
                    </h2>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {action.desc}
                    </p>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-purple-700">
                    <span>Open Tool</span>
                    <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <YouTubeApiAttribution />
    </div>
  );
}
