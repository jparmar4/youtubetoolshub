"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  FaGlobeAmericas,
  FaChartLine,
  FaFileInvoiceDollar,
  FaArrowRight,
  FaCalculator,
} from "react-icons/fa";

interface Tier1CountryInfo {
  code: string;
  name: string;
  flag: string;
  slug: string;
  currency: string;
  cpmAvg: number;
  cpmRange: [number, number];
  rpmAvg: number;
  rpmRange: [number, number];
  topNiches: string[];
  taxNote: string;
}

const TIER1_BENCHMARKS: Tier1CountryInfo[] = [
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    slug: "usa",
    currency: "USD",
    cpmAvg: 14.5,
    cpmRange: [8.0, 25.0],
    rpmAvg: 8.5,
    rpmRange: [4.0, 15.0],
    topNiches: ["Personal Finance ($22-$45)", "SaaS & Tech ($15-$35)", "Real Estate ($18-$38)"],
    taxNote: "IRS Form 1099-NEC & Schedule C write-offs apply.",
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    slug: "australia",
    currency: "AUD",
    cpmAvg: 13.0,
    cpmRange: [7.5, 22.0],
    rpmAvg: 7.2,
    rpmRange: [3.5, 12.0],
    topNiches: ["Finance & Crypto", "Mining & B2B", "Tech Reviews"],
    taxNote: "ATO Business deductions & GST thresholds apply.",
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    slug: "canada",
    currency: "CAD",
    cpmAvg: 12.0,
    cpmRange: [6.5, 20.0],
    rpmAvg: 7.0,
    rpmRange: [3.2, 11.0],
    topNiches: ["Real Estate", "Fintech & Wealth", "Tech Tutorials"],
    taxNote: "CRA Form T2125 business expense deductions.",
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    slug: "uk",
    currency: "GBP",
    cpmAvg: 11.0,
    cpmRange: [6.0, 18.0],
    rpmAvg: 6.5,
    rpmRange: [3.0, 10.0],
    topNiches: ["Investing & Stocks", "Property & Mortgages", "SaaS Tools"],
    taxNote: "HMRC Self-Assessment allowable expenses.",
  },
  {
    code: "CH",
    name: "Switzerland",
    flag: "🇨🇭",
    slug: "switzerland",
    currency: "CHF",
    cpmAvg: 13.5,
    cpmRange: [7.0, 21.0],
    rpmAvg: 7.8,
    rpmRange: [3.5, 12.0],
    topNiches: ["Private Banking & Luxury", "Software & B2B", "Biotech"],
    taxNote: "Cantonal & federal income taxation.",
  },
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    slug: "germany",
    currency: "EUR",
    cpmAvg: 10.5,
    cpmRange: [5.5, 16.0],
    rpmAvg: 6.2,
    rpmRange: [2.8, 9.0],
    topNiches: ["Engineering & Automotive", "Business Finance", "Software"],
    taxNote: "Finanzamt Betriebsausgaben & Gewerbesteuer.",
  },
];

const VIEW_PRESETS = [
  { label: "10K Views", views: 10000 },
  { label: "50K Views", views: 50000 },
  { label: "100K Views", views: 100000 },
  { label: "250K Views", views: 250000 },
  { label: "500K Views", views: 500000 },
  { label: "1M Views", views: 1000000 },
];

export default function Tier1ComparisonMatrix() {
  const [selectedViews, setSelectedViews] = useState<number>(100000);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("US");

  const activeCountry = useMemo(() => {
    return (
      TIER1_BENCHMARKS.find((c) => c.code === selectedCountryCode) ||
      TIER1_BENCHMARKS[0]
    );
  }, [selectedCountryCode]);

  // Calculations for active country
  const stats = useMemo(() => {
    const monthlyAdSenseAvg = (selectedViews / 1000) * activeCountry.rpmAvg;
    const monthlyAdSenseMin = (selectedViews / 1000) * activeCountry.rpmRange[0];
    const monthlyAdSenseMax = (selectedViews / 1000) * activeCountry.rpmRange[1];

    const annualAdSenseAvg = monthlyAdSenseAvg * 12;

    // Sponsorship estimation based on typical Tier 1 CPMs ($25 - $45 per 1,000 views)
    const sponsorPerVideoMin = (selectedViews / 1000) * 22;
    const sponsorPerVideoMax = (selectedViews / 1000) * 45;

    // Estimated channel valuation run rate (24x - 36x monthly revenue)
    const channelValueMin = monthlyAdSenseAvg * 24;
    const channelValueMax = monthlyAdSenseAvg * 36;

    return {
      monthlyAdSenseAvg: Math.round(monthlyAdSenseAvg),
      monthlyAdSenseMin: Math.round(monthlyAdSenseMin),
      monthlyAdSenseMax: Math.round(monthlyAdSenseMax),
      annualAdSenseAvg: Math.round(annualAdSenseAvg),
      sponsorPerVideoMin: Math.round(sponsorPerVideoMin),
      sponsorPerVideoMax: Math.round(sponsorPerVideoMax),
      channelValueMin: Math.round(channelValueMin),
      channelValueMax: Math.round(channelValueMax),
    };
  }, [selectedViews, activeCountry]);

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 px-6 sm:px-8 py-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-bold uppercase tracking-wider mb-2">
              <FaGlobeAmericas className="w-3.5 h-3.5" />
              Tier 1 High-RPM Benchmark Matrix
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Compare Tier 1 YouTube AdSense & Payouts
            </h3>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Tier 1 viewers (US, UK, CA, AU, DE, CH) generate up to 15x–30x higher RPM than emerging
              markets due to advertiser purchasing power.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/resources/youtube-cpm-rates"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-purple-600/30"
            >
              <span>View All 50+ Countries</span>
              <FaArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Controls: Country selector & View selector */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Country Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              1. Select Tier 1 Country
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {TIER1_BENCHMARKS.map((c) => {
                const isSelected = c.code === selectedCountryCode;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setSelectedCountryCode(c.code)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-purple-50 border-purple-500 text-purple-950 font-bold shadow-xs ring-1 ring-purple-500"
                        : "bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-white hover:border-purple-300"
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-lg font-mono text-xs font-black flex items-center justify-center shrink-0 shadow-2xs ${
                        isSelected
                          ? "bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white"
                          : "bg-white border border-slate-200 text-slate-700"
                      }`}
                    >
                      {c.code}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold leading-tight text-slate-900">{c.name}</div>
                      <div className="text-[11px] text-purple-700 font-semibold mt-0.5">
                        ~${c.rpmAvg.toFixed(2)} RPM
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Views Preset Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              2. Select Monthly View Milestone
            </label>
            <div className="grid grid-cols-3 gap-2">
              {VIEW_PRESETS.map((p) => {
                const isSelected = p.views === selectedViews;
                return (
                  <button
                    key={p.views}
                    type="button"
                    onClick={() => setSelectedViews(p.views)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs ring-1 ring-emerald-500"
                        : "bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="text-sm font-bold">{p.label}</div>
                    <div className="text-[10px] text-slate-400">/ month</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Calculated Revenue Result Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Monthly AdSense */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
            <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">
              Estimated Monthly AdSense
            </div>
            <div className="text-3xl font-black tracking-tight">
              ${stats.monthlyAdSenseAvg.toLocaleString()}
            </div>
            <div className="text-xs opacity-80 mt-1">
              Range: ${stats.monthlyAdSenseMin.toLocaleString()} – ${stats.monthlyAdSenseMax.toLocaleString()}
            </div>
            <div className="text-[10px] opacity-70 mt-3 pt-2 border-t border-white/20">
              Based on ${activeCountry.rpmAvg.toFixed(2)} average RPM
            </div>
          </div>

          {/* Annualized Run Rate */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
            <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">
              Annualized Run Rate
            </div>
            <div className="text-3xl font-black tracking-tight">
              ${stats.annualAdSenseAvg.toLocaleString()}
            </div>
            <div className="text-xs opacity-80 mt-1">
              12-Month Ad Revenue
            </div>
            <div className="text-[10px] opacity-70 mt-3 pt-2 border-t border-white/20">
              Excluding seasonal Q4 spikes (+20–50%)
            </div>
          </div>

          {/* Sponsor Value Per Video */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
            <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">
              Brand Deal / Sponsor Rate
            </div>
            <div className="text-2xl sm:text-3xl font-black tracking-tight">
              ${stats.sponsorPerVideoMin.toLocaleString()} – ${stats.sponsorPerVideoMax.toLocaleString()}
            </div>
            <div className="text-xs opacity-80 mt-1">
              Per 60s Video Integration
            </div>
            <div className="text-[10px] opacity-70 mt-3 pt-2 border-t border-white/20">
              Tier 1 Brand Direct Placement
            </div>
          </div>

          {/* Estimated Asset Value */}
          <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
            <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">
              Channel Sale Valuation
            </div>
            <div className="text-2xl sm:text-3xl font-black tracking-tight">
              ${stats.channelValueMin.toLocaleString()} – ${stats.channelValueMax.toLocaleString()}
            </div>
            <div className="text-xs opacity-80 mt-1">
              24x–36x Monthly Net Multiple
            </div>
            <div className="text-[10px] opacity-70 mt-3 pt-2 border-t border-white/20">
              Broker standard (Flippa / Empire Flippers)
            </div>
          </div>
        </div>

        {/* Deep Context Table: Why this country pays premium */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-mono text-sm font-black flex items-center justify-center shadow-md shrink-0">
                {activeCountry.code}
              </span>
              <div>
                <h4 className="font-extrabold text-slate-900 text-lg">
                  {activeCountry.name} Monetization Intelligence (2026)
                </h4>
                <p className="text-xs text-slate-500">
                  Advertiser CPM Range: ${activeCountry.cpmRange[0].toFixed(2)} – ${activeCountry.cpmRange[1].toFixed(2)} · Creator RPM Avg: ${activeCountry.rpmAvg.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/tools/youtube-earnings-calculator/${activeCountry.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-purple-700 hover:bg-purple-50 text-xs font-bold transition-colors shadow-2xs"
              >
                <FaCalculator className="w-3.5 h-3.5" />
                <span>{activeCountry.name} Calculator</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
            <div className="bg-white p-4 rounded-xl border border-slate-200/80">
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <FaChartLine className="w-3.5 h-3.5 text-purple-600" />
                Highest-Paying Niches in {activeCountry.name}
              </div>
              <ul className="space-y-1 text-xs text-slate-600 mt-2">
                {activeCountry.topNiches.map((niche, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span>{niche}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80">
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <FaFileInvoiceDollar className="w-3.5 h-3.5 text-emerald-600" />
                Tax Write-Off & Operating Notes
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {activeCountry.taxNote} Camera equipment, lighting, studio rent, and software
                subscriptions (Adobe, Final Cut, DaVinci) are typically 100% tax deductible as business
                expenses.
              </p>
              <Link
                href="/tools/youtube-tax-deduction-calculator"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:underline mt-2"
              >
                <span>Calculate your tax deductions</span>
                <FaArrowRight className="w-2.5 h-2.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
