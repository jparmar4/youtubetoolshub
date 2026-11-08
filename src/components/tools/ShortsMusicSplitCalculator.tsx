"use client";

import { useState, useMemo } from "react";
import { parseCalculatorInput } from "@/lib/calculator-input";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import GoogleAd from "@/components/ads/GoogleAd";
import Link from "next/link";
import {
  FaMusic,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaBolt } from "react-icons/fa";
import { AFFILIATE_TOOLS } from "@/config/affiliates";

export default function ShortsMusicSplitCalculator() {
  const [viewsInput, setViewsInput] = useState<string>("10000000");
  const [baseRpmInput, setBaseRpmInput] = useState<string>("0.08");
  const [zeroTrackPercent, setZeroTrackPercent] = useState<string>("30");
  const [oneTrackPercent, setOneTrackPercent] = useState<string>("50");
  const twoTrackPercent = useMemo(() => {
    const p0 = Number(zeroTrackPercent) || 0;
    const p1 = Number(oneTrackPercent) || 0;
    return String(Math.max(0, 100 - p0 - p1));
  }, [zeroTrackPercent, oneTrackPercent]);

  const calculations = useMemo(() => {
    const views = parseCalculatorInput(viewsInput);
    const baseRpm = parseCalculatorInput(baseRpmInput);
    if (!Number.isFinite(views) || views <= 0 || !Number.isFinite(baseRpm) || baseRpm <= 0) {
      return null;
    }

    const p0 = Math.max(0, parseCalculatorInput(zeroTrackPercent) || 0) / 100;
    const p1 = Math.max(0, parseCalculatorInput(oneTrackPercent) || 0) / 100;
    const p2 = Math.max(0, parseCalculatorInput(twoTrackPercent) || 0) / 100;

    const totalWeight = p0 + p1 + p2;
    const normP0 = totalWeight > 0 ? p0 / totalWeight : 1;
    const normP1 = totalWeight > 0 ? p1 / totalWeight : 0;
    const normP2 = totalWeight > 0 ? p2 / totalWeight : 0;

    // Gross potential if 100% original audio:
    // (views / 1000) * baseRpm
    const grossPotential = (views / 1000) * baseRpm;

    // YouTube Shorts Creator Pool Licensing Formula:
    // 0 tracks: 100% creator pool allocation
    // 1 track: 50% music publisher / 50% creator pool allocation
    // 2 tracks: 66.7% music publisher / 33.3% creator pool allocation
    const poolShare0 = normP0 * 1.0;
    const poolShare1 = normP1 * 0.50;
    const poolShare2 = normP2 * 0.333;

    const blendedCreatorPoolMultiplier = poolShare0 + poolShare1 + poolShare2;
    const netCreatorPayout = grossPotential * blendedCreatorPoolMultiplier;
    const musicPublisherCut = grossPotential - netCreatorPayout;
    const effectiveRpm = (netCreatorPayout / (views / 1000)).toFixed(3);

    const lostPercentage = Math.round((musicPublisherCut / grossPotential) * 100);

    return {
      views,
      baseRpm,
      grossPotential: Math.round(grossPotential),
      netCreatorPayout: Math.round(netCreatorPayout),
      musicPublisherCut: Math.round(musicPublisherCut),
      annualLostToMusic: Math.round(musicPublisherCut * 12),
      effectiveRpm,
      lostPercentage,
      normP0: Math.round(normP0 * 100),
      normP1: Math.round(normP1 * 100),
      normP2: Math.round(normP2 * 100) };
  }, [viewsInput, baseRpmInput, zeroTrackPercent, oneTrackPercent, twoTrackPercent]);

  const epidemicTool = AFFILIATE_TOOLS.epidemic;

  return (
    <ToolPageLayout
      title="YouTube Shorts Music Royalty & Revenue Split Calculator"
      slug="youtube-shorts-music-royalty-split-calculator"
      description="Calculate how commercial music tracks in YouTube Shorts slice your creator pool RPM and payout."
    >
      <div className="space-y-8">
        {/* Header Alert */}
        <div className="rounded-2xl border border-rose-200/80 bg-gradient-to-r from-rose-50/80 via-white to-orange-50/60 p-5 sm:p-6 dark:border-rose-900/40 dark:from-slate-900 dark:via-rose-950/20 dark:to-slate-900 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-black text-rose-700 dark:bg-rose-950/80 dark:text-rose-400">
                <FaMusic /> Official YouTube Shorts Monetization Model
              </span>
              <h2 className="mt-2 text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                The Hidden Cost of Using Trending Music in YouTube Shorts
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                When you add a commercial song from the YouTube Shorts audio picker, up to 66% of that video&apos;s allocated Creator Pool goes straight to record labels and publishers before you get paid.
              </p>
            </div>
            <Link
              href="/tools/youtube-earnings-calculator"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-rose-700 transition-all"
            >
              <span>Long-Form Earnings →</span>
            </Link>
          </div>
        </div>

        {/* Inputs */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Monthly Shorts Views
              </label>
              <Input
                type="text"
                inputMode="decimal"
                value={viewsInput}
                onChange={(e) => setViewsInput(e.target.value)}
                placeholder="e.g. 10000000"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Total monthly views across all published Shorts.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Baseline Shorts RPM ($)
              </label>
              <Input
                type="text"
                inputMode="decimal"
                value={baseRpmInput}
                onChange={(e) => setBaseRpmInput(e.target.value)}
                placeholder="e.g. 0.08"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Typically $0.04 to $0.15 for Tier-1 audiences.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                0 Tracks (% of views)
              </label>
              <Input
                type="text"
                inputMode="decimal"
                value={zeroTrackPercent}
                onChange={(e) => setZeroTrackPercent(e.target.value)}
                placeholder="30"
              />
              <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                Original Voice / SFX (100% pool)
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                1 Track (% of views)
              </label>
              <Input
                type="text"
                inputMode="decimal"
                value={oneTrackPercent}
                onChange={(e) => setOneTrackPercent(e.target.value)}
                placeholder="50"
              />
              <p className="mt-1 text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                1 Song (50% to music labels)
              </p>
            </div>
          </div>
        </div>

        {/* Results */}
        {calculations && (
          <div className="space-y-6">
            {/* Big Headline Stat */}
            <div className="rounded-2xl border border-rose-300 bg-gradient-to-br from-rose-50 via-white to-orange-50 p-6 text-center dark:border-rose-900/60 dark:from-slate-900 dark:via-rose-950/20 dark:to-slate-900 shadow-md">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                The YouTube Shorts &ldquo;Music Tax&rdquo;
              </span>
              <div className="mt-2 text-4xl sm:text-5xl font-black text-rose-600 dark:text-rose-400 font-outfit">
                -${calculations.musicPublisherCut.toLocaleString()}/month
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 max-w-lg mx-auto">
                You are giving away <strong>{calculations.lostPercentage}%</strong> of your potential Shorts earnings (<strong>${calculations.annualLostToMusic.toLocaleString()}/year</strong>) to music publishing partners because of licensed songs.
              </p>
            </div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <span className="text-xs font-bold uppercase text-slate-500 block mb-1">
                  100% Original Audio Potential
                </span>
                <div className="text-3xl font-black text-slate-800 dark:text-slate-100 font-outfit">
                  ${calculations.grossPotential.toLocaleString()}
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  What you would earn if all Shorts used your voice or royalty-free audio like Epidemic Sound.
                </p>
              </div>

              <div className="rounded-2xl border border-rose-200 bg-white p-5 shadow-sm dark:border-rose-900/40 dark:bg-slate-900">
                <span className="text-xs font-bold uppercase text-rose-600 block mb-1">
                  Music Publisher Deductions
                </span>
                <div className="text-3xl font-black text-rose-600 dark:text-rose-400 font-outfit">
                  -${calculations.musicPublisherCut.toLocaleString()}
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Subtracted from the Creator Pool to license universal record labels (Sony, Warner, UMG).
                </p>
              </div>

              <div className="rounded-2xl border-2 border-emerald-500 bg-white p-5 shadow-md dark:border-emerald-600 dark:bg-slate-900">
                <span className="text-xs font-bold uppercase text-emerald-600 block mb-1">
                  Your Net Creator Payout
                </span>
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-outfit">
                  ${calculations.netCreatorPayout.toLocaleString()}
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Effective RPM: <strong>${calculations.effectiveRpm}</strong> (down from ${calculations.baseRpm}).
                </p>
              </div>
            </div>

            {/* Strategic Advice Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                When Should You Use Trending Music vs. Original Audio?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <div className="rounded-xl border border-slate-100 p-4 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60">
                  <h4 className="font-bold text-slate-900 dark:text-slate-200 mb-1 flex items-center gap-1.5">
                    <FaBolt className="text-amber-500" /> Use Trending Commercial Songs For:
                  </h4>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Algorithmic sound feed discovery (tapping into viral TikTok audio waves).</li>
                    <li>Entertainment, comedy, and meme skits where the song punchline is essential.</li>
                    <li>Videos designed purely for subscriber acquisition rather than AdSense revenue.</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-emerald-100 p-4 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                    <FaCheckCircle className="text-emerald-600" /> Use Royalty-Free Audio (Epidemic) For:
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                    <li>Educational, commentary, finance, and storytelling videos.</li>
                    <li>High-view channels looking to maximize monthly AdSense payout.</li>
                    <li>Shorts that are also syndicated to Facebook Reels, TikTok &amp; LinkedIn.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contextual Epidemic Sound Affiliate Banner */}
            <div className="rounded-2xl border border-teal-200 bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-teal-500/10 p-5 sm:p-6 dark:border-teal-900/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-teal-700 dark:text-teal-400">
                    <FaMusic /> Keep 100% of Your Shorts Revenue
                  </div>
                  <h4 className="mt-1 text-lg font-black text-slate-900 dark:text-white">
                    Protect Your Shorts RPM with Epidemic Sound
                  </h4>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 max-w-xl">
                    By adding copyright-cleared background music instead of YouTube commercial tracks, you maintain 100% of the Creator Pool allocation on every view.
                  </p>
                </div>
                <a
                  href={epidemicTool.link}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-xs font-bold text-white shadow hover:bg-teal-700 transition-all"
                >
                  <span>{epidemicTool.ctaText}</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>
              </div>
            </div>

            {/* In-Tool Ad Placement */}
            <div className="pt-2 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Advertisement</p>
              <GoogleAd slot="8649718301" responsive className="w-full text-center" />
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
