"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { toolMeta } from "@/config/tool-meta";
import { countryCPMData } from "@/lib/cpm-data";
import {
  FaChartLine,
  FaDownload,
  FaBolt,
  FaCheckCircle,
  FaGlobeAmericas,
  FaMagic,
  FaPlay,
  FaArrowRight,
  FaShieldAlt,
  FaLayerGroup,
} from "react-icons/fa";

export default function Hero3DShowcase() {
  const [tilt, setTilt] = useState({ rotateX: 3, rotateY: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: Number((-y * 8 + 2.5).toFixed(2)),
      rotateY: Number((x * 10).toFixed(2)),
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 3, rotateY: 0 });
  }, []);

  return (
    <div
      className="relative max-w-6xl mx-auto mt-10 mb-6 px-1 sm:px-4 select-none"
      style={{ perspective: "1400px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient UHD 4K Backlight Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.16),rgba(217,70,239,0.12)_50%,transparent_75%)] opacity-85"
      />

      {/* Top 3D Floating Telemetry Pods (No overlap with console header!) */}
      <div
        className="hidden md:grid grid-cols-3 gap-4 max-w-4xl mx-auto mb-4 relative z-20"
        style={{
          transform: `translate3d(${tilt.rotateY * -0.6}px, ${tilt.rotateX * -0.5}px, 35px)`,
          transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="flex items-center gap-3 bg-white/95 border border-purple-200/90 rounded-2xl px-4 py-2.5 shadow-[0_14px_30px_-8px_rgba(124,58,237,0.22),inset_0_1px_0_0_#fff]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white flex items-center justify-center shadow-md shadow-purple-500/30 shrink-0">
            <FaMagic className="w-4 h-4" />
          </div>
          <div className="text-left min-w-0">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-purple-700 truncate">
              AI Packaging Score
            </div>
            <div className="text-xs font-black text-slate-900 truncate">
              98.4 / 100 CTR Benchmark
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/95 border border-emerald-200/90 rounded-2xl px-4 py-2.5 shadow-[0_14px_30px_-8px_rgba(16,185,129,0.2),inset_0_1px_0_0_#fff]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 shrink-0">
            <FaGlobeAmericas className="w-4 h-4" />
          </div>
          <div className="text-left min-w-0">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 truncate">
              Tier-1 AdSense RPM
            </div>
            <div className="text-xs font-black text-slate-900 truncate">
              $14.80 US • $23.10 CH
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/95 border border-sky-200/90 rounded-2xl px-4 py-2.5 shadow-[0_14px_30px_-8px_rgba(14,165,233,0.2),inset_0_1px_0_0_#fff]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-sky-500/30 shrink-0">
            <FaShieldAlt className="w-4 h-4" />
          </div>
          <div className="text-left min-w-0">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-sky-700 truncate">
              Privacy-First Studio
            </div>
            <div className="text-xs font-black text-slate-900 truncate">
              No Extension • No OAuth
            </div>
          </div>
        </div>
      </div>

      {/* Main 3D Tilt Stage */}
      <div
        className="relative rounded-[2rem] bg-gradient-to-b from-slate-800 via-slate-950 to-slate-950 p-1.5 sm:p-2.5 shadow-[0_32px_70px_-15px_rgba(15,23,42,0.5),0_8px_0_0_#0f172a,0_0_0_1px_rgba(255,255,255,0.14)]"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Top Specular Light Rim */}
        <div className="absolute inset-x-10 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />

        {/* Inner UHD Studio Console */}
        <div className="rounded-[1.6rem] bg-slate-950/95 uhd-dark-grid border border-white/10 overflow-hidden">
          {/* Console Top Telemetry Chrome Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 py-3.5 bg-slate-900/95 border-b border-white/10">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white flex items-center justify-center shadow-sm shrink-0">
                <FaLayerGroup className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
              <span className="text-xs font-extrabold text-slate-100 tracking-wide truncate">
                YouTube Tools Hub — Creator Command Studio
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Instant Browser Engine
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-200 text-[11px] font-bold">
                <FaCheckCircle className="w-2.5 h-2.5" />
                {toolMeta.length} Instant Tools
              </span>
            </div>
          </div>

          {/* 2-Panel Interactive Studio Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-4 sm:p-6 text-left">
            {/* Left Panel: HD Thumbnail & Visual Packaging Inspector (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/80 border border-white/10 p-4 sm:p-5 flex flex-col justify-between shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-pink-300 flex items-center gap-1.5">
                    <FaDownload className="w-3 h-3" />
                    HD Thumbnail &amp; CTR Studio
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-pink-500/20 border border-pink-400/30 text-pink-200 text-[11px] font-black whitespace-nowrap">
                    MAXRES • HD
                  </span>
                </div>

                {/* Simulated 16:9 Video Canvas */}
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/15 bg-gradient-to-tr from-purple-950 via-indigo-900 to-fuchsia-900 p-4 flex flex-col justify-between shadow-lg">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(236,72,153,0.4),transparent_60%)]" />
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-black/75 text-[11px] font-bold text-white border border-white/15">
                      16:9 PREVIEW CANVAS
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-400 text-slate-950 text-[11px] font-black shadow">
                      CTR BENCHMARK
                    </span>
                  </div>

                  {/* Center Play Emblem */}
                  <div className="relative z-10 my-auto flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white shadow-lg shrink-0">
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

                  <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-200 font-semibold pt-2 border-t border-white/10">
                    <span>480×360 HQ</span>
                    <span>640×480 SD</span>
                    <span className="text-amber-300 font-black">1280×720 HD</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <span className="text-xs text-slate-300 font-medium">
                  Videos, Shorts &amp; Live Streams
                </span>
                <Link
                  href="/tools/youtube-thumbnail-downloader"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/30 text-xs font-bold text-pink-200 hover:text-white transition-all whitespace-nowrap"
                >
                  <span>Open Downloader</span>
                  <FaArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Right Panel: Tier-1 Revenue & AdSense Telemetry (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl bg-gradient-to-br from-slate-900 to-purple-950/50 border border-white/10 p-4 sm:p-5 flex flex-col justify-between shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                    <FaChartLine className="w-3.5 h-3.5" />
                    Tier-1 AdSense RPM &amp; Valuation Telemetry
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-[11px] font-black whitespace-nowrap">
                    {countryCPMData.length} COUNTRIES • 2026 DATA
                  </span>
                </div>

                {/* 3 Mini Metric Cards */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-4">
                  <div className="rounded-xl bg-white/[0.06] border border-white/10 p-3 shadow-inner">
                    <div className="text-[11px] font-bold uppercase text-slate-300 truncate">
                      US Finance RPM
                    </div>
                    <div className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5">
                      $18.40
                    </div>
                    <div className="text-[11px] text-emerald-200 font-semibold truncate">
                      Tier-1 Ad Auction
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.06] border border-white/10 p-3 shadow-inner">
                    <div className="text-[11px] font-bold uppercase text-slate-300 truncate">
                      Est. Monthly Pay
                    </div>
                    <div className="text-lg sm:text-xl font-black text-white mt-0.5">
                      $12,450
                    </div>
                    <div className="text-[11px] text-purple-200 font-semibold truncate">
                      + S-Corp Tax Saved
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.06] border border-white/10 p-3 shadow-inner">
                    <div className="text-[11px] font-bold uppercase text-slate-300 truncate">
                      Channel Valuation
                    </div>
                    <div className="text-lg sm:text-xl font-black text-amber-300 mt-0.5">
                      $348K
                    </div>
                    <div className="text-[11px] text-amber-200 font-semibold truncate">
                      28× Net Multiple
                    </div>
                  </div>
                </div>

                {/* UHD Vector Sparkline Bar Matrix (Clean ISO Badges instead of broken Windows flag emojis) */}
                <div className="rounded-xl bg-slate-950/80 border border-white/10 p-3.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 mb-2.5">
                    <span>Tier-1 Advertiser CPM Comparison</span>
                    <span className="text-emerald-400">Live 2026 Multipliers</span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { code: "US", country: "United States", cpm: "$32.50 Peak CPM", pct: "w-[94%]", color: "from-emerald-400 to-teal-500" },
                      { code: "CH / AU", country: "Switzerland & Australia", cpm: "$26.80 Peak CPM", pct: "w-[82%]", color: "from-purple-400 to-fuchsia-500" },
                      { code: "UK / CA", country: "UK, Canada & Germany", cpm: "$22.40 Peak CPM", pct: "w-[72%]", color: "from-sky-400 to-indigo-500" },
                    ].map((row) => (
                      <div key={row.code} className="space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-200 font-semibold flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-[11px] font-mono font-black text-white">
                              {row.code}
                            </span>
                            <span>{row.country}</span>
                          </span>
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
                <div className="flex flex-wrap items-center gap-3 text-xs">
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-xs font-bold text-emerald-300 hover:text-white transition-all whitespace-nowrap"
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
