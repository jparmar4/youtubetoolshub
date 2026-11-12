"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaGlobeAmericas,
} from "react-icons/fa";
import AdSlot from "@/components/ads/AdSlot";
import { AD_SLOTS } from "@/lib/adsense";
import { toolMeta } from "@/config/tool-meta";
import { QUICK_LAUNCH_TOOLS } from "@/config/quick-launch";
import { countryCPMData } from "@/lib/cpm-data";

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
      {/* 1. Above-the-Fold Sticky Vertical AdSense Slot (auto-collapses if unfilled) */}
      {desktop && <AdSlot slot={AD_SLOTS.SIDEBAR} preset="sidebar" lazy={false} />}

      {/* 2. 3D Quick-Launch Creator Tools Dock */}
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
            <span>All {toolMeta.length}</span>
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
                  className={`shrink-0 text-[11px] font-black uppercase px-1.5 py-0.5 rounded-full border ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 3. Tier-1 CPM Quick Reference Card */}
      <div className="rounded-3xl bg-slate-950 uhd-dark-grid border border-purple-500/30 p-5 text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <FaGlobeAmericas className="w-3.5 h-3.5" />
            2026 Tier-1 RPM Index
          </span>
          <span className="text-[11px] font-bold text-slate-300">{countryCPMData.length} Markets</span>
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
              <div className="flex items-center justify-between text-[11px] text-slate-300 font-bold">
                <span className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-white">
                  {m.code}
                </span>
                <span className="text-emerald-400 font-black">{m.rpm}</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-1 truncate">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/resources/youtube-cpm-rates"
          className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors shadow-md"
        >
          <span>Full {countryCPMData.length}-Country CPM Table</span>
          <FaArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </aside>
  );
}
