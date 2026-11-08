"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import GoogleAd from "@/components/ads/GoogleAd";
import {
  FaCode,
  FaCopy,
  FaCheckCircle,
  FaShieldAlt,
  FaTv,
  FaLaptopCode } from "react-icons/fa";

type RatioType = "16:9" | "9:16" | "4:3" | "1:1";

export default function EmbedCodeGenerator() {
  const [videoUrl, setVideoUrl] = useState<string>("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  const [aspectRatio, setAspectRatio] = useState<RatioType>("16:9");
  const [privacyMode, setPrivacyMode] = useState<boolean>(true);
  const [autoplay, setAutoplay] = useState<boolean>(false);
  const [loop, setLoop] = useState<boolean>(false);
  const [hideControls, setHideControls] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const embedData = useMemo(() => {
    let videoId = "dQw4w9WgXcQ";

    // Extract Video ID
    const url = videoUrl.trim();
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split(/[?&]/)[0] || videoId;
    } else if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1]?.split("&")[0] || videoId;
    } else if (url.includes("shorts/")) {
      videoId = url.split("shorts/")[1]?.split(/[?&]/)[0] || videoId;
    } else if (url.includes("embed/")) {
      videoId = url.split("embed/")[1]?.split(/[?&]/)[0] || videoId;
    } else if (url.length === 11 && !url.includes(" ")) {
      videoId = url;
    }

    const domain = privacyMode ? "https://www.youtube-nocookie.com" : "https://www.youtube.com";

    // Build URL Query Params
    const params = new URLSearchParams();
    if (autoplay) {
      params.set("autoplay", "1");
      // Autoplay requires mute in modern browsers
      params.set("mute", "1");
    } else if (mute) {
      params.set("mute", "1");
    }
    if (loop) {
      params.set("loop", "1");
      params.set("playlist", videoId);
    }
    if (hideControls) {
      params.set("controls", "0");
    }
    params.set("rel", "0");
    params.set("modestbranding", "1");

    if (startTime) {
      const s = parseInt(startTime, 10);
      if (!isNaN(s) && s > 0) params.set("start", s.toString());
    }
    if (endTime) {
      const e = parseInt(endTime, 10);
      if (!isNaN(e) && e > 0) params.set("end", e.toString());
    }

    const queryString = params.toString() ? `?${params.toString()}` : "";
    const iframeSrc = `${domain}/embed/${videoId}${queryString}`;

    // Aspect ratio styles
    let paddingBottom = "56.25%"; // 16:9
    if (aspectRatio === "9:16") paddingBottom = "177.77%";
    else if (aspectRatio === "4:3") paddingBottom = "75%";
    else if (aspectRatio === "1:1") paddingBottom = "100%";

    const responsiveHtml = `<div style="position:relative;width:100%;padding-bottom:${paddingBottom};height:0;overflow:hidden;border-radius:12px;">
  <iframe 
    src="${iframeSrc}" 
    title="YouTube video player" 
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerpolicy="strict-origin-when-cross-origin" 
    allowfullscreen>
  </iframe>
</div>`;

    const reactCode = `<div className="relative w-full ${aspectRatio === "9:16" ? "aspect-[9/16]" : aspectRatio === "1:1" ? "aspect-square" : "aspect-video"} rounded-xl overflow-hidden">
  <iframe
    className="absolute top-0 left-0 w-full h-full border-0"
    src="${iframeSrc}"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />
</div>`;

    return {
      videoId,
      iframeSrc,
      responsiveHtml,
      reactCode };
  }, [videoUrl, aspectRatio, privacyMode, autoplay, loop, hideControls, mute, startTime, endTime]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <ToolPageLayout
      title="YouTube Responsive Embed Code Generator (Privacy-Enhanced)"
      slug="youtube-embed-code-generator"
      description="Generate mobile-responsive, GDPR-friendly YouTube embed iframe code with custom start times, autoplay, and aspect ratios."
    >
      <div className="space-y-8">
        {/* Header Alert */}
        <div className="rounded-2xl border border-blue-200/80 bg-gradient-to-r from-blue-50/80 via-white to-cyan-50/60 p-5 sm:p-6 dark:border-blue-900/40 dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-700 dark:bg-blue-950/80 dark:text-blue-400">
                <FaCode /> Developer &amp; Blogger Utility
              </span>
              <h2 className="mt-2 text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Responsive &amp; Privacy-Enhanced YouTube Embed Code Generator
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Generate 100% mobile-friendly responsive embed code that never overflows your container and uses GDPR-safe <code className="text-blue-600 dark:text-blue-400 font-bold">youtube-nocookie.com</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Input & Options Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                YouTube Video or Shorts URL
              </label>
              <Input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="text-base font-semibold"
              />
            </div>

            {/* Aspect Ratio Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(["16:9", "9:16", "4:3", "1:1"] as RatioType[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setAspectRatio(r)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      aspectRatio === r
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {r === "9:16" ? "9:16 (Shorts)" : r}
                  </button>
                ))}
              </div>
            </div>

            {/* Timestamps */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Start Time (seconds)
                </label>
                <Input
                  type="number"
                  min="0"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="0"
                  className="text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  End Time (seconds)
                </label>
                <Input
                  type="number"
                  min="0"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  placeholder="120"
                  className="text-sm font-semibold"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <label className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacyMode}
                  onChange={(e) => setPrivacyMode(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <FaShieldAlt className="text-emerald-500" /> Use Privacy-Enhanced Mode (youtube-nocookie.com)
              </label>
              <label className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={mute}
                  onChange={(e) => setMute(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                Start Video Muted
              </label>
              <label className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoplay}
                  onChange={(e) => setAutoplay(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                Autoplay Video (Muted automatically per browser policy)
              </label>
              <label className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={loop}
                  onChange={(e) => setLoop(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                Loop Video Continuously
              </label>
              <label className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hideControls}
                  onChange={(e) => setHideControls(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                Hide Player Controls
              </label>
            </div>
          </div>

          {/* Live Preview & Code Panel */}
          <div className="lg:col-span-6 space-y-4">
            {/* Live Preview */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <FaTv className="text-blue-500" /> Live Embed Preview
              </span>
              <div
                className="relative w-full rounded-xl overflow-hidden bg-black"
                style={{
                  paddingBottom:
                    aspectRatio === "9:16"
                      ? "177.77%"
                      : aspectRatio === "4:3"
                      ? "75%"
                      : aspectRatio === "1:1"
                      ? "100%"
                      : "56.25%" }}
              >
                <iframe
                  src={embedData.iframeSrc}
                  title="YouTube Preview"
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* HTML / React Code Exports */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <FaLaptopCode className="text-indigo-500" /> Responsive HTML + CSS Code
                </span>
                <button
                  onClick={() => handleCopy(embedData.responsiveHtml, "html")}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
                >
                  {copiedKey === "html" ? <FaCheckCircle /> : <FaCopy />}
                  {copiedKey === "html" ? "Copied HTML!" : "Copy Code"}
                </button>
              </div>
              <pre className="bg-slate-900 text-slate-200 p-3 rounded-lg text-xs font-mono overflow-x-auto whitespace-pre-wrap max-h-36">
                {embedData.responsiveHtml}
              </pre>
            </div>
          </div>
        </div>

        {/* Ad unit */}
        <GoogleAd slot="8649718301" responsive className="w-full text-center" />
      </div>
    </ToolPageLayout>
  );
}
