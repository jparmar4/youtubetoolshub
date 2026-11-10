"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import { parseCalculatorInput } from "@/lib/calculator-input";
import GoogleAd from "@/components/ads/GoogleAd";
import {
  FaYoutube,
  FaChartLine,
  FaClock,
  FaUserPlus,
  FaBalanceScale,
  FaLightbulb,
  FaCheckCircle,
  FaCopy,
} from "react-icons/fa";

interface NicheBenchmark {
  name: string;
  longFormRpm: number;
  shortsRpm: number;
}

const NICHES: Record<string, NicheBenchmark> = {
  finance: { name: "Personal Finance & Investing", longFormRpm: 12.5, shortsRpm: 0.065 },
  tech: { name: "Tech & Software", longFormRpm: 7.8, shortsRpm: 0.055 },
  business: { name: "Business, Career & SaaS", longFormRpm: 9.2, shortsRpm: 0.06 },
  education: { name: "Education & How-To", longFormRpm: 5.4, shortsRpm: 0.05 },
  fitness: { name: "Fitness & Health", longFormRpm: 4.8, shortsRpm: 0.045 },
  gaming: { name: "Gaming & Streaming", longFormRpm: 2.9, shortsRpm: 0.035 },
  entertainment: { name: "Comedy & Entertainment", longFormRpm: 3.2, shortsRpm: 0.04 },
  lifestyle: { name: "Lifestyle & Vlogs", longFormRpm: 3.8, shortsRpm: 0.04 },
};

export default function ShortsVsLongformCalculator() {
  const [niche, setNiche] = useState<string>("tech");
  const [longViewsInput, setLongViewsInput] = useState<string>("50000");
  const [videoLengthMins, setVideoLengthMins] = useState<number>(10);
  const [retentionPercent, setRetentionPercent] = useState<number>(45);

  const [shortsCount, setShortsCount] = useState<number>(3);
  const [shortsViewsInput, setShortsViewsInput] = useState<string>("80000");
  const [copied, setCopied] = useState(false);

  const activeNiche = NICHES[niche] || NICHES.tech;

  const calculations = useMemo(() => {
    const longViews = parseCalculatorInput(longViewsInput);
    const shortViewsPerClip = parseCalculatorInput(shortsViewsInput);
    const totalShortViews = shortViewsPerClip * shortsCount;

    if (longViews <= 0 && totalShortViews <= 0) return null;

    // Long-Form Calculations
    const longRevenue = +((longViews / 1000) * activeNiche.longFormRpm).toFixed(2);
    const longAvgWatchSecs = (videoLengthMins * 60) * (retentionPercent / 100);
    const longWatchHours = Math.round((longViews * longAvgWatchSecs) / 3600);
    const longSubscribers = Math.round(longViews * 0.0035); // 0.35% sub rate

    // Shorts Calculations (40s average, 80% retention)
    const shortsRevenue = +((totalShortViews / 1000) * activeNiche.shortsRpm).toFixed(2);
    const shortsAvgWatchSecs = 40 * 0.8;
    const shortsWatchHours = Math.round((totalShortViews * shortsAvgWatchSecs) / 3600);
    const shortsSubscribers = Math.round(totalShortViews * 0.0014); // 0.14% sub rate

    // Combined Totals
    const totalRevenue = +(longRevenue + shortsRevenue).toFixed(2);
    const revenueMultiple = shortsRevenue > 0 ? (longRevenue / shortsRevenue).toFixed(1) : "N/A";
    const totalWatchHours = longWatchHours + shortsWatchHours;
    const totalSubscribers = longSubscribers + shortsSubscribers;

    return {
      longViews,
      totalShortViews,
      longRevenue,
      shortsRevenue,
      totalRevenue,
      revenueMultiple,
      longWatchHours,
      shortsWatchHours,
      totalWatchHours,
      longSubscribers,
      shortsSubscribers,
      totalSubscribers,
    };
  }, [longViewsInput, videoLengthMins, retentionPercent, shortsCount, shortsViewsInput, activeNiche]);

  const handleCopySummary = () => {
    if (!calculations) return;
    const summary = `📊 YouTube Strategy Splitter (${activeNiche.name}):
- Long-Form (${calculations.longViews.toLocaleString()} views): $${calculations.longRevenue.toLocaleString()} AdSense | ${calculations.longWatchHours.toLocaleString()} Watch Hrs | +${calculations.longSubscribers.toLocaleString()} Subs
- Repurposed Shorts (${calculations.totalShortViews.toLocaleString()} views): $${calculations.shortsRevenue.toLocaleString()} AdSense | ${calculations.shortsWatchHours.toLocaleString()} Watch Hrs | +${calculations.shortsSubscribers.toLocaleString()} Subs
- Total Combined: $${calculations.totalRevenue.toLocaleString()} & +${calculations.totalSubscribers.toLocaleString()} New Subscribers
Generated on youtubetoolshub.com`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <ToolPageLayout
      title="YouTube Shorts vs. Long-Form Revenue Splitter & Strategy Calculator"
      description="Compare projected AdSense earnings, watch hours, and subscriber velocity between long-form videos and repurposed Shorts for any niche."
    >
      <form
        toolname="estimate_shorts_vs_longform"
        tooldescription="Compare projected revenue and subscriber reach between long-form videos and Shorts"
        className="space-y-8"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          {/* Column 1: Long-Form Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <span className="p-2 rounded-lg bg-red-100 text-red-600">
                <FaYoutube className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900">Long-Form Video Parameters</h3>
                <p className="text-xs text-slate-500">Full 16:9 hero video performance</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Niche & RPM Benchmark
              </label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:ring-2 focus:ring-purple-500 outline-none"
              >
                {Object.entries(NICHES).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.name} (Long RPM: ${val.longFormRpm} | Shorts: ${val.shortsRpm})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Expected Long-Form Views
              </label>
              <Input
                value={longViewsInput}
                onChange={(e) => setLongViewsInput(e.target.value)}
                placeholder="e.g. 50000 or 50k"
                className="font-semibold text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Video Duration (Mins)
                </label>
                <input
                  type="number"
                  min="2"
                  max="60"
                  value={videoLengthMins}
                  onChange={(e) => setVideoLengthMins(Math.max(1, Number(e.target.value) || 10))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm font-semibold text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Avg Retention ({retentionPercent}%)
                </label>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={retentionPercent}
                  onChange={(e) => setRetentionPercent(Number(e.target.value))}
                  className="w-full accent-purple-600 mt-2"
                />
              </div>
            </div>
          </div>

          {/* Column 2: Repurposed Shorts Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <span className="p-2 rounded-lg bg-purple-100 text-purple-600">
                <FaChartLine className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900">Repurposed Shorts Funnel</h3>
                <p className="text-xs text-slate-500">Vertical clips cut from the same topic</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Shorts Produced
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={shortsCount}
                  onChange={(e) => setShortsCount(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm font-semibold text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Avg Views Per Short
                </label>
                <Input
                  value={shortsViewsInput}
                  onChange={(e) => setShortsViewsInput(e.target.value)}
                  placeholder="e.g. 80000 or 80k"
                  className="font-semibold text-slate-900"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <FaLightbulb className="text-purple-600 shrink-0" />
                Shorts Algorithm Multiplier
              </p>
              <p>
                {shortsCount} Shorts totaling {(calculations?.totalShortViews || 0).toLocaleString()} projected views
                will serve as high-velocity top-of-funnel discovery for your long-form video.
              </p>
            </div>
          </div>
        </div>

        {/* Results Showcase */}
        {calculations && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1: Revenue Comparison */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                    <FaBalanceScale className="w-3.5 h-3.5" /> Total AdSense
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-800">
                    {calculations.revenueMultiple}x Ratio
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-slate-900 mb-1">
                  ${calculations.totalRevenue.toLocaleString()}
                </div>
                <div className="text-xs text-slate-600 space-y-1 mt-3 pt-3 border-t border-emerald-200/60">
                  <div className="flex justify-between">
                    <span>Long-Form:</span>
                    <span className="font-bold text-slate-800">${calculations.longRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{shortsCount} Shorts:</span>
                    <span className="font-bold text-slate-800">${calculations.shortsRevenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Watch Hours */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-sky-800 uppercase tracking-wider flex items-center gap-1.5">
                    <FaClock className="w-3.5 h-3.5" /> Watch Hours
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-200/80 text-sky-800">
                    YPP Fuel
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-slate-900 mb-1">
                  {calculations.totalWatchHours.toLocaleString()} hrs
                </div>
                <div className="text-xs text-slate-600 space-y-1 mt-3 pt-3 border-t border-sky-200/60">
                  <div className="flex justify-between">
                    <span>Long-Form:</span>
                    <span className="font-bold text-slate-800">{calculations.longWatchHours.toLocaleString()} hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shorts:</span>
                    <span className="font-bold text-slate-800">{calculations.shortsWatchHours.toLocaleString()} hrs</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Subscribers */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-purple-800 uppercase tracking-wider flex items-center gap-1.5">
                    <FaUserPlus className="w-3.5 h-3.5" /> Subscribers
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-200/80 text-purple-800">
                    Audience Growth
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-slate-900 mb-1">
                  +{calculations.totalSubscribers.toLocaleString()}
                </div>
                <div className="text-xs text-slate-600 space-y-1 mt-3 pt-3 border-t border-purple-200/60">
                  <div className="flex justify-between">
                    <span>Long-Form:</span>
                    <span className="font-bold text-slate-800">+{calculations.longSubscribers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shorts:</span>
                    <span className="font-bold text-slate-800">+{calculations.shortsSubscribers.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy Roadmap Capsule */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-500" />
                  Recommended 2026 Hybrid Publishing Strategy
                </h4>
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold hover:bg-purple-100 transition-colors self-start sm:self-auto"
                >
                  <FaCopy className="w-3 h-3" />
                  {copied ? "Copied Summary!" : "Copy Strategy Report"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs text-slate-600">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="font-bold text-slate-800 block mb-1">Day 0: Long-Form Launch</span>
                  Publish the 10-minute long-form hero video first to capitalize on subscriber browse notification velocity.
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="font-bold text-slate-800 block mb-1">Day 2: Short #1 Hook</span>
                  Release Short #1 linking directly to the full video via YouTube Studio&apos;s &quot;Related video&quot; feature.
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="font-bold text-slate-800 block mb-1">Day 5: Short #2 & #3</span>
                  Extract key counter-intuitive moments to trigger feed recommendations and reactivate browse traffic.
                </div>
              </div>
            </div>
          </div>
        )}

        <GoogleAd slot="4112285121" />
      </form>
    </ToolPageLayout>
  );
}
