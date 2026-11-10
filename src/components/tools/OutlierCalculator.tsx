"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import GoogleAd from "@/components/ads/GoogleAd";
import {
  FaFire,
  FaBolt, FaCopy, FaCheck } from "react-icons/fa";

export default function OutlierCalculator() {
  const [videoViews, setVideoViews] = useState<string>("250000");
  const [channelMedian, setChannelMedian] = useState<string>("30000");
  const [daysSinceUpload, setDaysSinceUpload] = useState<string>("14");
  const [copied, setCopied] = useState<boolean>(false);

  const applyPreset = (views: string, median: string, days: string) => {
    setVideoViews(views);
    setChannelMedian(median);
    setDaysSinceUpload(days);
  };

  const handleCopyReport = async () => {
    const report = `🔥 YouTube Video Outlier Analysis (YouTube Tools Hub)
-------------------------------------------------------
• Target Video Views: ${results.views.toLocaleString()} views
• Channel Baseline (Median): ${results.median.toLocaleString()} views
• Outlier Multiplier: ${results.multiplier}x
• Anomaly Classification: ${results.tierLabel}
• Daily Velocity: ~${results.dailyVelocity.toLocaleString()} views/day (over ${results.days} days)
• Strategic Assessment: ${results.tierDescription}

Analyzed with: https://www.youtubetoolshub.com/tools/youtube-outlier-calculator`;

    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* ignore */
    }
  };

  const results = useMemo(() => {
    const views = Math.max(0, parseFloat(videoViews) || 0);
    const median = Math.max(1, parseFloat(channelMedian) || 1);
    const days = Math.max(1, parseFloat(daysSinceUpload) || 1);

    const multiplier = views / median;
    const dailyVelocity = Math.round(views / days);

    let tierLabel = "";
    let tierColor = "";
    let tierDescription = "";

    if (multiplier >= 10) {
      tierLabel = "🚀 Mega Viral Outlier (Top 1%)";
      tierColor ="text-purple-600 bg-purple-50 border-purple-200";
      tierDescription = "This video broke out of your core subscriber bubble and triggered mass Browse Features (YouTube Homepage recommendations).";
    } else if (multiplier >= 5) {
      tierLabel = "🔥 Major Outlier (Top 5%)";
      tierColor ="text-rose-600 bg-rose-50 border-rose-200";
      tierDescription = "Strong packaging (CTR) and above-average retention. YouTube is pushing this heavily to Suggested video sidebars.";
    } else if (multiplier >= 2) {
      tierLabel = "📈 Solid Performer (Top 20%)";
      tierColor ="text-emerald-600 bg-emerald-50 border-emerald-200";
      tierDescription = "Outperformed your channel median. Indicates your audience resonated with this specific angle or title hook.";
    } else if (multiplier >= 0.8) {
      tierLabel = "⚖️ Baseline Video (Core Audience)";
      tierColor ="text-blue-600 bg-blue-50 border-blue-200";
      tierDescription = "Normal performance. Watched primarily by your loyal existing subscriber base.";
    } else {
      tierLabel = "📉 Packaging Underperformer";
      tierColor ="text-amber-600 bg-amber-50 border-amber-200";
      tierDescription = "Underperformed your channel average. Typically caused by low thumbnail CTR or a weak 15-second opening hook.";
    }

    return {
      views,
      median,
      days,
      multiplier: multiplier.toFixed(2),
      dailyVelocity,
      tierLabel,
      tierColor,
      tierDescription };
  }, [videoViews, channelMedian, daysSinceUpload]);

  return (
    <ToolPageLayout
      title="YouTube Outlier Video & Viral Ratio Calculator (Free 1of10 Alternative)"
      slug="youtube-outlier-calculator"
      description="Find true outlier videos on YouTube. Calculate viral multipliers, daily view velocity, and algorithmic growth patterns."
    >
      <div className="space-y-8">
        {/* Header Alert */}
        <div className="rounded-2xl border border-rose-200/80 bg-gradient-to-r from-rose-50/80 via-white to-amber-50/60 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-black text-rose-700">
                <FaFire /> Algorithm Intelligence Formula
              </span>
              <h2 className="mt-2 text-xl sm:text-2xl font-black text-slate-900">
                YouTube Outlier Video & Viral Ratio Finder
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Identify whether a video is a true statistical viral outlier or standard channel volume. Free alternative to 1of10 and VidIQ outlier finders.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg">
                100% Free
              </span>
            </div>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs Panel */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500">Presets:</span>
              <button
                type="button"
                onClick={() => applyPreset("350000", "25000", "7")}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                14x Viral Breakout
              </button>
              <button
                type="button"
                onClick={() => applyPreset("90000", "30000", "14")}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                3x Solid Outlier
              </button>
              <button
                type="button"
                onClick={() => applyPreset("32000", "30000", "21")}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                1.0x Baseline
              </button>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">
                Target Video Views
              </label>
              <Input
                type="number"
                min="0"
                step="5000"
                value={videoViews}
                onChange={(e) => setVideoViews(e.target.value)}
                placeholder="250000"
                className="text-lg font-bold"
              />
              <p className="text-xs text-slate-500 mt-1">Total public views on the specific video.</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">
                Channel Median View Count (Baseline)
              </label>
              <Input
                type="number"
                min="1"
                step="1000"
                value={channelMedian}
                onChange={(e) => setChannelMedian(e.target.value)}
                placeholder="30000"
                className="text-lg font-bold"
              />
              <p className="text-xs text-slate-500 mt-1">
                Median view count across the creator&apos;s last 10–20 videos (exclude viral anomalies).
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">
                Days Since Upload
              </label>
              <Input
                type="number"
                min="1"
                max="3650"
                value={daysSinceUpload}
                onChange={(e) => setDaysSinceUpload(e.target.value)}
                placeholder="14"
                className="text-base font-semibold"
              />
              <p className="text-xs text-slate-500 mt-1">Used to measure daily view velocity and momentum.</p>
            </div>
          </div>

          {/* Results Scorecard */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between space-y-6">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Viral Multiplier Score
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-indigo-300">
                  Outlier Index
                </span>
              </div>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-5xl font-black text-rose-400">
                  {results.multiplier}x
                </span>
                <span className="text-sm font-semibold text-slate-300">
                  vs channel baseline
                </span>
              </div>

              {/* Status Badge */}
              <div className={`mt-4 p-3.5 rounded-xl border font-bold text-sm ${results.tierColor}`}>
                {results.tierLabel}
                <p className="text-xs font-normal mt-1 opacity-90 text-slate-200">
                  {results.tierDescription}
                </p>
              </div>

              {/* Velocity & Metrics */}
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                  <span className="text-xs text-slate-400 block">Daily View Velocity</span>
                  <span className="font-bold text-white text-lg mt-0.5 block">
                    ~{results.dailyVelocity.toLocaleString()} / day
                  </span>
                </div>
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                  <span className="text-xs text-slate-400 block">Baseline Multiple</span>
                  <span className="font-bold text-emerald-300 text-lg mt-0.5 block">
                    +{(parseFloat(results.multiplier) * 100 - 100).toFixed(0)}% Lift
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-xs text-slate-300">
              <span className="font-bold text-amber-300 flex items-center gap-1.5 mb-0.5">
                <FaBolt /> Next Step:
              </span>
              If a competitor video scores <strong>3x+ Outlier</strong>, create your own take on the topic within 14 days to ride YouTube&apos;s active recommendation graph.
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleCopyReport}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
              >
                {copied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                {copied ? "Analysis Copied!" : "Copy Report"}
              </button>
            </div>
          </div>
        </div>

        {/* Educational Content for SEO/AEO */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <h3 className="text-xl font-black text-slate-900">
            What Is an Outlier Video on YouTube? (And Why Paid SaaS Tools Charge $79/mo for It)
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            In YouTube analytics, an <strong>Outlier Video</strong> is an upload that garners significantly more views than the channel’s median performance. For instance, if a creator with 50,000 subscribers averages 10,000 views per video, but one specific video hits 150,000 views, that video has an <strong>Outlier Score of 15.0x</strong>.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Studying outliers is the secret weapon used by top YouTube producers (including MrBeast, Colin &amp; Samir, and Ali Abdaal). When a video becomes an outlier, it proves that the <strong>Topic + Title + Thumbnail packaging</strong> broke out of the creator&apos;s existing subscriber circle and appealed to broad casual viewers on YouTube&apos;s home feed.
          </p>
        </div>

        {/* Ad unit */}
        <GoogleAd slot="8649718301" responsive className="w-full text-center" />
      </div>
    </ToolPageLayout>
  );
}
