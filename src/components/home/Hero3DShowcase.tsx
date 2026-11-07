"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  FaChartLine,
  FaDownload,
  FaBolt,
  FaCheckCircle,
  FaGlobeAmericas,
  FaMagic,
  FaPlay,
  FaArrowRight,
} from "react-icons/fa";

export default function Hero3DShowcase() {
  const [tilt, setTilt] = useState({ rotateX: 4, rotateY: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: Number((-y * 10 + 3).toFixed(2)),
      rotateY: Number((x * 12).toFixed(2)),
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 4, rotateY: 0 });
  }, []);

  return (
    <div
      className="relative max-w-6xl mx-auto mt-12 mb-6 px-2 sm:px-4 select-none"
      style={{ perspective: "1400px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient UHD 4K Backlight Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-fuchsia-500/20 to-emerald-500/20 rounded-[2.5rem] blur-3xl opacity-80"
      />

      {/* Floating Left 3D Satellite Badge (Desktop) */}
      <div
        className="hidden lg:flex items-center gap-3.5 absolute -left-6 top-10 z-30 bg-white/95 backdrop-blur-xl border border-purple-200/90 rounded-2xl px-4 py-3 shadow-[0_20px_40px_-10px_rgba(124,58,237,0.28),inset_0_1px_0_0_#fff] animate-float-3d"
        style={{
          transform: `translate3d(${tilt.rotateY * -0.9}px, ${tilt.rotateX * -0.9}px, 50px)`,
          transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white flex items-center justify-center shadow-md shadow-purple-500/30">
          <FaMagic className="w-4 h-4" />
        </div>
        <div className="text-left">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600">
            AI Packaging Engine
          </div>
          <div className="text-sm font-black text-slate-900">
            98.4 / 100 CTR Score
          </div>
        </div>
      </div>

      {/* Floating Right 3D Satellite Badge (Desktop) */}
      <div
        className="hidden lg:flex items-center gap-3.5 absolute -right-6 bottom-12 z-30 bg-slate-900/95 text-white backdrop-blur-xl border border-emerald-400/40 rounded-2xl px-4 py-3 shadow-[0_24px_48px_-12px_rgba(16,185,129,0.35),inset_0_1px_0_0_rgba(255,255,255,0.2)] animate-float-3d-delayed"
        style={{
          transform: `translate3d(${tilt.rotateY * 1.1}px, ${tilt.rotateX * 1.1}px, 60px)`,
          transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
          <FaGlobeAmericas className="w-5 h-5" />
        </div>
        <div className="text-left">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
            Tier-1 AdSense RPM
          </div>
          <div className="text-sm font-black text-white">
            $14.80 US • $23.10 CH
          </div>
        </div>
      </div>

      {/* Main 3D Tilt Stage */}
      <div
        className="relative rounded-[2rem] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-1.5 sm:p-2.5 shadow-[0_32px_70px_-15px_rgba(15,23,42,0.45),0_0_0_1px_rgba(255,255,255,0.12)]"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Top Specular Light Rim */}
        <div className="absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400/80 to-transparent" />

        {/* Inner UHD Studio Console */}
        <div className="rounded-[1.6rem] bg-slate-950/90 uhd-dark-grid border border-white/10 overflow-hidden">
          {/* Console Top Telemetry Chrome Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 py-3 bg-slate-900/90 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/90 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/90 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              <span className="ml-2 text-xs font-bold text-slate-300 tracking-wide">
                YouTube Tools Hub — 3D UHD Creator Command Studio
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                4K UHD Engine
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold">
                <FaCheckCircle className="w-2.5 h-2.5" />
                Zero Extension Needed
              </span>
            </div>
          </div>

          {/* 3-Column Interactive Studio Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-5 sm:p-7 text-left">
            {/* Column 1: 4K UHD Thumbnail & Visual Packaging Inspector (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-slate-900/95 to-slate-900/70 border border-white/10 p-4 sm:p-5 flex flex-col justify-between shadow-inner">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
                    <FaDownload className="w-3 h-3" />
                    4K Thumbnail &amp; CTR Studio
                  </span>
                  <span className="px-2 py-0.5 rounded bg-pink-500/20 border border-pink-400/30 text-pink-300 text-[10px] font-black">
                    MAXRESDEFAULT • 1080p/4K
                  </span>
                </div>

                {/* Simulated 3D 16:9 UHD Video Canvas */}
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/15 bg-gradient-to-tr from-purple-950 via-indigo-900 to-fuchsia-900 p-4 flex flex-col justify-between group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.35),transparent_60%)]" />
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/15">
                      16:9 UHD FRAME
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/90 text-slate-950 text-[10px] font-black shadow">
                      CTR +15.5%
                    </span>
                  </div>

                  {/* Center Play Emblem */}
                  <div className="relative z-10 my-auto flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg">
                      <FaPlay className="w-4 h-4 ml-0.5 text-pink-300" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-white tracking-tight uppercase">
                        Visual Hierarchy Verified
                      </div>
                      <div className="text-[11px] text-purple-200">
                        Instant WebP, JPG &amp; PNG Extraction
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-300 font-semibold">
                    <span>1280×720 HD</span>
                    <span>1920×1080 FHD</span>
                    <span className="text-amber-300 font-bold">3840×2160 4K</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Works on Videos, Shorts &amp; Lives
                </span>
                <Link
                  href="/tools/youtube-thumbnail-downloader"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 hover:text-pink-300 transition-colors"
                >
                  <span>Open Downloader</span>
                  <FaArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Column 2: Tier-1 Revenue & AdSense Telemetry (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl bg-gradient-to-br from-slate-900/95 to-purple-950/40 border border-white/10 p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <FaChartLine className="w-3.5 h-3.5" />
                    Tier-1 AdSense RPM &amp; Valuation Telemetry
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-black">
                    52 COUNTRIES • 2026 BENCHMARKS
                  </span>
                </div>

                {/* 3 Mini 3D Metric Cards */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <div className="text-[10px] font-bold uppercase text-slate-400">
                      US Finance RPM
                    </div>
                    <div className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5">
                      $18.40
                    </div>
                    <div className="text-[10px] text-emerald-300/80 font-semibold">
                      Top Tier-1 Auction
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <div className="text-[10px] font-bold uppercase text-slate-400">
                      Est. Monthly Pay
                    </div>
                    <div className="text-lg sm:text-xl font-black text-white mt-0.5">
                      $12,450
                    </div>
                    <div className="text-[10px] text-purple-300 font-semibold">
                      + S-Corp Tax Saved
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <div className="text-[10px] font-bold uppercase text-slate-400">
                      Channel Valuation
                    </div>
                    <div className="text-lg sm:text-xl font-black text-amber-300 mt-0.5">
                      $348K
                    </div>
                    <div className="text-[10px] text-amber-200/80 font-semibold">
                      28× Net Multiple
                    </div>
                  </div>
                </div>

                {/* UHD Vector Sparkline Bar Matrix */}
                <div className="rounded-xl bg-slate-950/70 border border-white/10 p-3.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 mb-2">
                    <span>Tier-1 Advertiser CPM Comparison</span>
                    <span className="text-emerald-400">Live 2026 Multipliers</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { country: "🇺🇸 United States", cpm: "$32.50 Peak CPM", pct: "w-[94%]", color: "from-emerald-400 to-teal-500" },
                      { country: "🇨🇭 Switzerland & 🇦🇺 AU", cpm: "$26.80 Peak CPM", pct: "w-[82%]", color: "from-purple-400 to-fuchsia-500" },
                      { country: "🇬🇧 UK, 🇨🇦 CA & 🇩🇪 DE", cpm: "$22.40 Peak CPM", pct: "w-[72%]", color: "from-sky-400 to-indigo-500" },
                    ].map((row) => (
                      <div key={row.country} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-300 font-semibold">{row.country}</span>
                          <span className="text-white font-bold">{row.cpm}</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                          <div className={`h-full rounded-full bg-gradient-to-r ${row.color} ${row.pct}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3 text-xs">
                  <Link
                    href="/tools/youtube-sponsorship-calculator"
                    className="text-slate-300 hover:text-white font-semibold underline decoration-purple-500/60 underline-offset-4"
                  >
                    Sponsor Rates
                  </Link>
                  <Link
                    href="/tools/youtube-llc-vs-s-corp-tax-savings-calculator"
                    className="text-slate-300 hover:text-white font-semibold underline decoration-emerald-500/60 underline-offset-4"
                  >
                    LLC vs S-Corp Tax
                  </Link>
                  <Link
                    href="/tools/youtube-channel-valuation-calculator"
                    className="text-slate-300 hover:text-white font-semibold underline decoration-amber-500/60 underline-offset-4"
                  >
                    Channel Exit Value
                  </Link>
                </div>
                <Link
                  href="/tools/youtube-earnings-calculator"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <FaBolt className="w-3 h-3" />
                  <span>Calculate Pay</span>
                  <FaArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
