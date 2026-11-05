"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import {
  FaBalanceScale,
  FaCopy,
  FaCheck,
  FaMobileAlt,
  FaDesktop,
  FaGlobeAmericas,
} from "react-icons/fa";
import { parseCalculatorInput } from "@/lib/calculator-input";
import { formatCurrency } from "@/lib/utils";
import { saveHistory } from "@/lib/history";
import { usePreferredCurrency, SupportedCurrency } from "@/lib/currency";

export default function ShortsVsLongFormCalculator() {
  const { currency, setCurrency, rate, currencies } = usePreferredCurrency("USD");
  const [revenueTarget, setRevenueTarget] = useState("2000");
  const [longFormRpm, setLongFormRpm] = useState("7.50");
  const [shortsRpm, setShortsRpm] = useState("0.05");
  const [longFormEditHours, setLongFormEditHours] = useState("8");
  const [shortsEditHours, setShortsEditHours] = useState("1.5");
  const [copied, setCopied] = useState(false);

  const calculations = useMemo(() => {
    const target = parseCalculatorInput(revenueTarget);
    const lfRpm = parseCalculatorInput(longFormRpm);
    const shRpm = parseCalculatorInput(shortsRpm);
    const lfHours = parseCalculatorInput(longFormEditHours);
    const shHours = parseCalculatorInput(shortsEditHours);

    if (
      !Number.isFinite(target) || target <= 0 ||
      !Number.isFinite(lfRpm) || lfRpm <= 0 ||
      !Number.isFinite(shRpm) || shRpm <= 0 ||
      !Number.isFinite(lfHours) || lfHours <= 0 ||
      !Number.isFinite(shHours) || shHours <= 0
    ) {
      return null;
    }

    // Views required to hit target
    const longFormViewsNeeded = Math.ceil((target / lfRpm) * 1000);
    const shortsViewsNeeded = Math.ceil((target / shRpm) * 1000);

    // Multiplier: how many shorts views equal 1 long-form view
    const viewMultiplier = Math.round(lfRpm / shRpm);

    // Monthly video outputs assumed for steady income
    // E.g. 4 long-form videos/mo (weekly) vs 20 shorts/mo (5x/week)
    const longFormVideosPerMonth = 4;
    const shortsVideosPerMonth = 20;

    const totalLfHoursSpent = longFormVideosPerMonth * lfHours;
    const totalShHoursSpent = shortsVideosPerMonth * shHours;

    // Hourly earnings rate
    const lfHourlyRate = Math.round(target / totalLfHoursSpent);
    const shHourlyRate = Math.round(target / totalShHoursSpent);

    return {
      target,
      lfRpm,
      shRpm,
      longFormViewsNeeded,
      shortsViewsNeeded,
      viewMultiplier,
      totalLfHoursSpent,
      totalShHoursSpent,
      lfHourlyRate,
      shHourlyRate,
    };
  }, [revenueTarget, longFormRpm, shortsRpm, longFormEditHours, shortsEditHours]);

  const handleCopy = async () => {
    if (!calculations) return;
    const text = `⚖️ YouTube Shorts vs Long-Form Revenue Comparison:
• Monthly Revenue Goal: ${formatCurrency(calculations.target * rate, currency)}
• Long-Form Views Needed: ${calculations.longFormViewsNeeded.toLocaleString()} (at ${formatCurrency(calculations.lfRpm * rate, currency)} RPM)
• Shorts Views Needed: ${calculations.shortsViewsNeeded.toLocaleString()} (at ${formatCurrency(calculations.shRpm * rate, currency)} RPM)
• Revenue Multiplier: 1 Long-Form view = ${calculations.viewMultiplier} Shorts views
• Effective Hourly Rate: ${formatCurrency(calculations.lfHourlyRate * rate, currency)}/hr (Long-form) vs ${formatCurrency(calculations.shHourlyRate * rate, currency)}/hr (Shorts)
Calculated via YouTube Tools Hub: https://www.youtubetoolshub.com/tools/youtube-shorts-vs-long-form-calculator`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      saveHistory("youtube-shorts-vs-long-form-calculator", {
        target: calculations.target,
        longFormViews: calculations.longFormViewsNeeded,
        shortsViews: calculations.shortsViewsNeeded,
      });
    } catch {
      /* ignore */
    }
  };

  return (
    <ToolPageLayout
      title="YouTube Shorts vs. Long-Form Profitability & Effort Calculator"
      slug="youtube-shorts-vs-long-form-calculator"
      description="Compare the real AdSense earnings, required view volume, editing effort, and hourly wage between YouTube Shorts and long-form videos in 2026."
    >
      <div className="space-y-8">
        {!calculations && (
          <p role="status" className="text-sm text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200">
            Enter valid positive numbers for revenue target, RPMs, and editing hours.
          </p>
        )}

        {/* Global Currency Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/90 dark:border-slate-700">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
            <FaGlobeAmericas className="text-purple-600 dark:text-purple-400" />
            <span>Display Currency:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(currencies).map(([code, conf]) => (
              <button
                key={code}
                type="button"
                onClick={() => setCurrency(code as SupportedCurrency)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  currency === code
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
                }`}
              >
                {conf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-6 bg-slate-50/70 dark:bg-slate-800/40 rounded-3xl border border-slate-200/80 dark:border-slate-700">
          <div>
            <Input
              label={`Monthly Revenue Target (${currency})`}
              type="text"
              inputMode="decimal"
              value={revenueTarget}
              onChange={(e) => setRevenueTarget(e.target.value)}
              placeholder="e.g. 2000"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Desired monthly take-home AdSense revenue
            </span>
          </div>

          <div>
            <Input
              label="Long-Form Video RPM ($)"
              type="text"
              inputMode="decimal"
              value={longFormRpm}
              onChange={(e) => setLongFormRpm(e.target.value)}
              placeholder="7.50"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              US average: $4.00–$15.00+ per 1,000 views
            </span>
          </div>

          <div>
            <Input
              label="YouTube Shorts RPM ($)"
              type="text"
              inputMode="decimal"
              value={shortsRpm}
              onChange={(e) => setShortsRpm(e.target.value)}
              placeholder="0.05"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Global average: $0.03–$0.07 per 1,000 views
            </span>
          </div>

          <div>
            <Input
              label="Hours to Edit 1 Long-Form Video"
              type="text"
              inputMode="decimal"
              value={longFormEditHours}
              onChange={(e) => setLongFormEditHours(e.target.value)}
              placeholder="8"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Scripting, filming, editing, and thumbnail design
            </span>
          </div>

          <div>
            <Input
              label="Hours to Edit 1 Short"
              type="text"
              inputMode="decimal"
              value={shortsEditHours}
              onChange={(e) => setShortsEditHours(e.target.value)}
              placeholder="1.5"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Quick filming, captions, cuts, and sound effects
            </span>
          </div>

          <div className="flex items-end">
            <Button
              onClick={() => {
                setLongFormRpm("12.00");
                setShortsRpm("0.06");
                setRevenueTarget("5000");
              }}
              variant="outline"
              className="w-full text-xs font-bold h-[42px]"
            >
              US Finance Preset ($5K Goal)
            </Button>
          </div>
        </div>

        {/* Results Presentation */}
        {calculations && (
          <div className="space-y-6 pt-2 animate-fade-in">
            {/* The Equivalence Banner */}
            <div className="p-6 bg-gradient-to-r from-purple-900 to-indigo-950 text-white rounded-3xl shadow-xl text-center relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-black tracking-widest uppercase bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full border border-purple-400/30">
                  The Revenue Equivalence Multiplier
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black font-outfit tracking-tight">
                  1 Long-Form View = {calculations.viewMultiplier} Shorts Views
                </h3>
                <p className="text-sm text-purple-200 opacity-90 leading-relaxed">
                  Because long-form videos serve dedicated pre-roll, mid-roll, and post-roll ads, single long-form viewers generate the same revenue as {calculations.viewMultiplier} viewers flipping through the Shorts feed.
                </p>
              </div>
            </div>

            {/* Head-to-Head Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Long-Form Column */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-500/80 shadow-lg space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-emerald-600 font-black text-lg">
                    <FaDesktop />
                    <span>Long-Form Video</span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    High AdSense Yield
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase block">Views Needed for {formatCurrency(calculations.target * rate, currency)}</span>
                    <span className="text-3xl font-black text-slate-900 dark:text-white font-outfit">
                      {calculations.longFormViewsNeeded.toLocaleString()} views
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold block">Monthly Edit Time</span>
                      <span className="font-black text-slate-800 dark:text-slate-200">{calculations.totalLfHoursSpent} hours</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">Effective Wage</span>
                      <span className="font-black text-emerald-600">{formatCurrency(calculations.lfHourlyRate * rate, currency)} / hr</span>
                    </div>
                  </div>

                  <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pt-1">
                    <li className="flex items-center gap-2">✓ <strong>Evergreen Traffic:</strong> Continues earning 2–5 years via search</li>
                    <li className="flex items-center gap-2">✓ <strong>High Sponsor CPMs:</strong> Brands pay $15–$45 CPM for 60s mid-rolls</li>
                    <li className="flex items-center gap-2">✓ <strong>Strong Community:</strong> Higher conversion to Patreon &amp; merch</li>
                  </ul>
                </div>
              </div>

              {/* Shorts Column */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-purple-600 font-black text-lg">
                    <FaMobileAlt />
                    <span>YouTube Shorts</span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300">
                    High Viral Reach
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase block">Views Needed for {formatCurrency(calculations.target * rate, currency)}</span>
                    <span className="text-3xl font-black text-slate-900 dark:text-white font-outfit">
                      {calculations.shortsViewsNeeded.toLocaleString()} views
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold block">Monthly Edit Time</span>
                      <span className="font-black text-slate-800 dark:text-slate-200">{calculations.totalShHoursSpent} hours</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">Effective Wage</span>
                      <span className="font-black text-purple-600">{formatCurrency(calculations.shHourlyRate * rate, currency)} / hr</span>
                    </div>
                  </div>

                  <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pt-1">
                    <li className="flex items-center gap-2">• <strong>Fast Discovery:</strong> Best format for rapid sub acquisition</li>
                    <li className="flex items-center gap-2">• <strong>Short Shelf-Life:</strong> 85% of views occur in first 72 hours</li>
                    <li className="flex items-center gap-2">• <strong>Lower Sponsor Spend:</strong> Dedicated Shorts brand deals pay ~1/5th of long-form</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Strategic Recommendation */}
            <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <FaBalanceScale className="text-purple-600" />
                  Recommended 2026 Strategy: The 80/20 Hybrid Funnel
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                  Do not rely on Shorts for primary AdSense revenue. Use Shorts as an organic top-of-funnel discovery engine (1–2 clips per long-form video) to channel viewers toward your high-RPM long-form videos and sponsorship deals.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs"
                >
                  {copied ? <FaCheck className="w-3.5 h-3.5" /> : <FaCopy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Comparison"}</span>
                </button>
                <Link
                  href="/tools/youtube-earnings-calculator"
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-purple-600 text-xs font-bold transition-colors"
                >
                  <span>Full Earnings Calculator →</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
