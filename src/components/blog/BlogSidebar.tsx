"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaDollarSign,
  FaDownload,
  FaTags,
  FaClock,
  FaHandshake,
  FaArrowRight,
  FaGlobeAmericas,
} from "react-icons/fa";
import GoogleAd from "@/components/ads/GoogleAd";
import { AD_SLOTS } from "@/lib/adsense";

const QUICK_LAUNCH_TOOLS = [
  {
    name: "YouTube Earnings Calculator",
    href: "/tools/youtube-earnings-calculator",
    badge: "Tier-1",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    icon: FaDollarSign,
    iconBg: "from-emerald-500 to-teal-600",
  },
  {
    name: "4K Thumbnail Downloader",
    href: "/tools/youtube-thumbnail-downloader",
    badge: "UHD",
    badgeColor: "bg-pink-100 text-pink-800 border-pink-200",
    icon: FaDownload,
    iconBg: "from-pink-500 to-rose-600",
  },
  {
    name: "Viral Video Tag Generator",
    href: "/tools/youtube-tag-generator",
    badge: "AI",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    icon: FaTags,
    iconBg: "from-purple-600 to-fuchsia-600",
  },
  {
    name: "4,000 Watch Hours Planner",
    href: "/tools/youtube-watch-hours-calculator",
    badge: "YPP",
    badgeColor: "bg-sky-100 text-sky-800 border-sky-200",
    icon: FaClock,
    iconBg: "from-sky-500 to-indigo-600",
  },
  {
    name: "Sponsorship Rate Calculator",
    href: "/tools/youtube-sponsorship-calculator",
    badge: "Pro",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    icon: FaHandshake,
    iconBg: "from-amber-500 to-orange-600",
  },
];

export default function BlogSidebar() {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <aside className="hidden lg:block self-start w-full min-w-[260px] lg:sticky lg:top-24 space-y-6">
      {/* 1. 3D Quick-Launch Creator Tools Dock */}
      <div className="card-3d rounded-3xl p-5 overflow-hidden relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-emerald-500" />
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
            Flagship Creator Tools
          </span>
          <Link
            href="/tools"
            className="text-[11px] font-bold text-purple-700 hover:underline flex items-center gap-1"
          >
            <span>All 44</span>
            <FaArrowRight className="w-2.5 h-2.5" />
          </Link>
        </div>

        <div className="space-y-2">
          {QUICK_LAUNCH_TOOLS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between gap-2.5 p-2.5 rounded-2xl bg-white/80 hover:bg-purple-50/70 border border-slate-200/70 hover:border-purple-300 transition-all shadow-2xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-8 h-8 rounded-xl bg-gradient-to-br ${item.iconBg} text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-purple-700 truncate">
                    {item.name}
                  </span>
                </div>
                <span
                  className={`shrink-0 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full border ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 2. Tier-1 CPM Quick Reference Card */}
      <div className="rounded-3xl bg-slate-950 uhd-dark-grid border border-purple-500/30 p-5 text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <FaGlobeAmericas className="w-3.5 h-3.5" />
            2026 Tier-1 RPM Index
          </span>
          <span className="text-[10px] font-bold text-slate-400">52 Markets</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { code: "US", rpm: "$8.50–$18+", label: "United States" },
            { code: "CH", rpm: "$7.80–$21+", label: "Switzerland" },
            { code: "AU", rpm: "$7.20–$15+", label: "Australia" },
            { code: "GB", rpm: "$6.50–$14+", label: "United Kingdom" },
          ].map((m) => (
            <div
              key={m.code}
              className="rounded-xl bg-white/[0.06] border border-white/10 p-2.5"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-300 font-bold">
                <span className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-white">
                  {m.code}
                </span>
                <span className="text-emerald-400 font-black">{m.rpm}</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1 truncate">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/resources/youtube-cpm-rates"
          className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors shadow-md"
        >
          <span>Full 52-Country CPM Table</span>
          <FaArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* 3. Sticky Vertical AdSense Slot */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-3 shadow-xs">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 text-center">
          Sponsored
        </p>
        {desktop ? (
          <GoogleAd
            slot={AD_SLOTS.SIDEBAR}
            format="auto"
            responsive
            lazy={false}
            style={{ display: "block" }}
            className="w-full"
          />
        ) : (
          <div className="w-full min-h-[60px]" aria-hidden />
        )}
      </div>
    </aside>
  );
}
