"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import {
  FaClock,
  FaUsers,
  FaCheckCircle,
  FaExclamationTriangle,
  FaRocket,
  FaCopy,
  FaCheck,
  FaPrint,
  FaVideo,
} from "react-icons/fa";
import { parseCalculatorInput } from "@/lib/calculator-input";
import { saveHistory } from "@/lib/history";
import CreatorSoftwareCard from "@/components/ads/CreatorSoftwareCard";

export default function WatchHoursCalculator() {
  const [currentHours, setCurrentHours] = useState("1200");
  const [currentSubs, setCurrentSubs] = useState("450");
  const [avgVideoLength, setAvgVideoLength] = useState("10"); // minutes
  const [retentionPercent, setRetentionPercent] = useState("40"); // %
  const [weeklyUploads, setWeeklyUploads] = useState("2");
  const [copied, setCopied] = useState(false);

  const calculations = useMemo(() => {
    const hours = parseCalculatorInput(currentHours);
    const subs = parseCalculatorInput(currentSubs);
    const length = parseCalculatorInput(avgVideoLength);
    const retention = parseCalculatorInput(retentionPercent);
    const uploads = parseCalculatorInput(weeklyUploads);

    if (
      !Number.isFinite(hours) || hours < 0 ||
      !Number.isFinite(subs) || subs < 0 ||
      !Number.isFinite(length) || length <= 0 ||
      !Number.isFinite(retention) || retention <= 0 || retention > 100 ||
      !Number.isFinite(uploads) || uploads <= 0
    ) {
      return null;
    }

    const targetHours = 4000;
    const targetSubs = 1000;
    const remainingHours = Math.max(0, targetHours - hours);
    const remainingMinutes = remainingHours * 60;
    const remainingSubs = Math.max(0, targetSubs - subs);

    // Watch time per view in minutes
    const minutesPerView = length * (retention / 100);
    // Total views required to bridge the remaining minutes
    const totalViewsNeeded = Math.ceil(remainingMinutes / Math.max(0.1, minutesPerView));

    // Progress percentages
    const hoursProgress = Math.min(100, Math.round((hours / targetHours) * 100));
    const subsProgress = Math.min(100, Math.round((subs / targetSubs) * 100));
    const overallProgress = Math.round((hoursProgress + subsProgress) / 2);

    // Estimate weeks & days needed based on upload frequency and realistic view pace
    // If uploading `uploads` videos per week, how many views per video are needed to finish in 6 months (26 weeks)?
    const videosIn6Months = Math.max(1, uploads * 26);
    const viewsPerVideoFor6Months = Math.ceil(totalViewsNeeded / videosIn6Months);

    // Days needed if gaining 15 hours per week (realistic benchmark for active beginners)
    const hoursGainedPerWeekAtPace = uploads * 25; // ~25 hours per upload benchmark
    const estimatedWeeks = hoursGainedPerWeekAtPace > 0
      ? Math.ceil(remainingHours / hoursGainedPerWeekAtPace)
      : 52;

    const estimatedCompletionDate = new Date();
    estimatedCompletionDate.setDate(estimatedCompletionDate.getDate() + estimatedWeeks * 7);

    // Rolling 365-day risk assessment
    let riskLevel: "low" | "moderate" | "high" = "low";
    let riskNote = "You are on track to complete YPP watch hours well within the 365-day rolling window.";

    if (estimatedWeeks > 40) {
      riskLevel = "high";
      riskNote = "Warning: Watch hours older than 365 days expire continuously. Increase average retention or upload frequency to outpace the rolling window.";
    } else if (estimatedWeeks > 24) {
      riskLevel = "moderate";
      riskNote = "Pace is steady, but ensure consistent publishing so early video watch hours don't expire before you hit 4,000.";
    }

    // Shorts alternative requirement: 10M views in 90 days = ~111,111 views/day
    const shortsDailyNeeded = Math.round(10000000 / 90);

    return {
      hours,
      subs,
      targetHours,
      targetSubs,
      remainingHours,
      remainingSubs,
      minutesPerView,
      totalViewsNeeded,
      hoursProgress,
      subsProgress,
      overallProgress,
      estimatedWeeks,
      viewsPerVideoFor6Months,
      estimatedCompletionDate: estimatedCompletionDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      riskLevel,
      riskNote,
      shortsDailyNeeded,
    };
  }, [currentHours, currentSubs, avgVideoLength, retentionPercent, weeklyUploads]);

  const handleCopyPlan = async () => {
    if (!calculations) return;
    const text = `🎯 YouTube 4,000 Watch Hours Monetization Plan:
• Current Progress: ${calculations.hours.toLocaleString()} / 4,000 hours (${calculations.hoursProgress}%)
• Subscribers: ${calculations.subs.toLocaleString()} / 1,000 subs (${calculations.subsProgress}%)
• Remaining Watch Hours: ${calculations.remainingHours.toLocaleString()} hours
• Total Views Needed: ~${calculations.totalViewsNeeded.toLocaleString()} views (at ${calculations.minutesPerView.toFixed(1)} mins retention/view)
• Target Completion Date: ${calculations.estimatedCompletionDate} (${calculations.estimatedWeeks} weeks)
• 365-Day Rolling Window Risk: ${calculations.riskLevel.toUpperCase()}
Calculated via YouTube Tools Hub: https://www.youtubetoolshub.com/tools/youtube-watch-hours-calculator`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      saveHistory("youtube-watch-hours-calculator", {
        hours: calculations.hours,
        subs: calculations.subs,
        remainingHours: calculations.remainingHours,
        totalViewsNeeded: calculations.totalViewsNeeded,
      });
    } catch {
      /* ignore */
    }
  };

  const handlePrintPlan = () => {
    if (!calculations || typeof window === "undefined") return;
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>YouTube 4,000 Watch Hours Monetization Roadmap</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #0f172a; max-width: 800px; margin: 0 auto; }
            h1 { font-size: 26px; color: #059669; margin-bottom: 4px; }
            .badge { display: inline-block; padding: 4px 10px; background: #d1fae5; color: #065f46; border-radius: 999px; font-size: 12px; font-weight: bold; margin-bottom: 24px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
            .card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; background: #f8fafc; }
            .card h3 { font-size: 11px; text-transform: uppercase; color: #64748b; margin: 0 0 8px; }
            .card p { font-size: 22px; font-weight: 800; margin: 0; color: #0f172a; }
            .highlight { border: 2px solid #059669; background: #ecfdf5; }
            .highlight p { color: #065f46; font-size: 26px; }
            .footer { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #94a3b8; display: flex; justify-content: space-between; }
          </style>
        </head>
        <body>
          <h1>YouTube Partner Program (YPP) Monetization Roadmap</h1>
          <div class="badge">Verified 2026 Eligibility Blueprint · YouTubeToolsHub.com</div>
          
          <div class="grid">
            <div class="card highlight">
              <h3>Target Monetization Date</h3>
              <p>${calculations.estimatedCompletionDate}</p>
            </div>
            <div class="card">
              <h3>Remaining Watch Hours</h3>
              <p>${calculations.remainingHours.toLocaleString()} / 4,000 hrs</p>
            </div>
            <div class="card">
              <h3>Total Views Needed</h3>
              <p>~${calculations.totalViewsNeeded.toLocaleString()} views</p>
            </div>
            <div class="card">
              <h3>Subscribers Needed</h3>
              <p>${calculations.remainingSubs.toLocaleString()} more subs</p>
            </div>
          </div>

          <div class="card">
            <h3>Strategic Execution Checklist</h3>
            <p style="font-size: 14px; font-weight: normal; color: #475569; line-height: 1.6;">
              • Publishing Target: <strong>${weeklyUploads} videos / week</strong><br/>
              • Average Retention Goal: <strong>${calculations.minutesPerView.toFixed(1)} minutes per viewer</strong> (${retentionPercent}% on ${avgVideoLength}-min video)<br/>
              • 365-Day Rolling Window Risk: <strong>${calculations.riskLevel.toUpperCase()}</strong> (${calculations.riskNote})<br/>
              • Expected Views per Video for 6-Month Completion: <strong>~${calculations.viewsPerVideoFor6Months.toLocaleString()} views</strong>
            </p>
          </div>

          <div class="footer">
            <span>Generated on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>https://www.youtubetoolshub.com</span>
          </div>
          <script>window.onload = function() { window.print(); };</script>
        </body>
      </html>
    `;
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
    }
  };

  return (
    <ToolPageLayout
      title="YouTube 4,000 Watch Hours & Monetization Planner"
      slug="youtube-watch-hours-calculator"
      description="Calculate exactly how many views, videos, and retention minutes you need to reach 4,000 public watch hours and 1,000 subscribers for YouTube Partner Program monetization."
    >
      <div className="space-y-8">
        {!calculations && (
          <p role="status" className="text-sm text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200">
            Enter valid non-negative numbers for your watch hours, subscribers, and video duration.
          </p>
        )}

        {/* Input Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-6 bg-slate-50/70 rounded-3xl border border-slate-200/80">
          <div>
            <Input
              label="Current Public Watch Hours"
              type="text"
              inputMode="decimal"
              value={currentHours}
              onChange={(e) => setCurrentHours(e.target.value)}
              placeholder="e.g. 1200"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              From YouTube Studio Earn Tab (Goal: 4,000)
            </span>
          </div>

          <div>
            <Input
              label="Current Subscribers"
              type="text"
              inputMode="decimal"
              value={currentSubs}
              onChange={(e) => setCurrentSubs(e.target.value)}
              placeholder="e.g. 450"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Current live subscriber count (Goal: 1,000)
            </span>
          </div>

          <div>
            <Input
              label="Average Video Length (Minutes)"
              type="text"
              inputMode="decimal"
              value={avgVideoLength}
              onChange={(e) => setAvgVideoLength(e.target.value)}
              placeholder="e.g. 10"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Typical duration of your long-form videos
            </span>
          </div>

          <div>
            <Input
              label="Average Retention / View Duration (%)"
              type="text"
              inputMode="decimal"
              value={retentionPercent}
              onChange={(e) => setRetentionPercent(e.target.value)}
              placeholder="e.g. 40"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Average % of video viewers watch (35%–50% is standard)
            </span>
          </div>

          <div>
            <Input
              label="Weekly Upload Frequency"
              type="text"
              inputMode="decimal"
              value={weeklyUploads}
              onChange={(e) => setWeeklyUploads(e.target.value)}
              placeholder="e.g. 2"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              New videos you plan to publish each week
            </span>
          </div>

          <div className="flex items-end">
            <Button
              onClick={() => {
                setCurrentHours("2500");
                setCurrentSubs("750");
              }}
              variant="outline"
              className="w-full text-xs font-bold h-[42px]"
            >
              Set 50% Milestone Preset
            </Button>
          </div>
        </div>

        {/* Calculation Results Card */}
        {calculations && (
          <div className="space-y-6 pt-2 animate-fade-in">
            {/* Overall Progress Bar */}
            <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <span className="text-xs font-black tracking-widest text-emerald-700 uppercase bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    YPP Monetization Progress
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-outfit mt-1">
                    {calculations.overallProgress}% Overall Eligibility Complete
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Projected Monetization</span>
                  <span className="text-lg font-black text-emerald-700">
                    {calculations.estimatedCompletionDate}
                  </span>
                </div>
              </div>

              {/* Multi-Progress Meters */}
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Watch Hours: {calculations.hours.toLocaleString()} / 4,000 hrs</span>
                    <span className="text-emerald-700 font-extrabold">{calculations.hoursProgress}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                      style={{ width: `${calculations.hoursProgress}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Subscribers: {calculations.subs.toLocaleString()} / 1,000 subs</span>
                    <span className="text-purple-700 font-extrabold">{calculations.subsProgress}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full transition-all duration-500"
                      style={{ width: `${calculations.subsProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 4-Card Strategic Output Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Remaining Watch Hours */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center">
                    <FaClock className="mr-1.5 text-emerald-600" /> Remaining Hours
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-outfit">
                    {calculations.remainingHours.toLocaleString()} hrs
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Equals {(calculations.remainingHours * 60).toLocaleString()} minutes of watch time needed.
                </p>
              </div>

              {/* Total Views Needed */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center">
                    <FaVideo className="mr-1.5 text-blue-600" /> Total Views Needed
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-outfit">
                    ~{calculations.totalViewsNeeded.toLocaleString()}
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  At {calculations.minutesPerView.toFixed(1)} mins retention per viewer ({retentionPercent}% of {avgVideoLength}m).
                </p>
              </div>

              {/* Views per Upload Target */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center">
                    <FaRocket className="mr-1.5 text-purple-600" /> 6-Month Per-Video Target
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-outfit">
                    ~{calculations.viewsPerVideoFor6Months.toLocaleString()} views
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Average views needed across {weeklyUploads} uploads/week to monetize in 6 months.
                </p>
              </div>

              {/* Subscribers Remaining */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center">
                    <FaUsers className="mr-1.5 text-pink-600" /> Subscribers Needed
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-outfit">
                    {calculations.remainingSubs.toLocaleString()} more
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {calculations.remainingSubs === 0
                    ? "Subscriber requirement already met!"
                    : "Focus on strong end-screen subscribe CTAs."}
                </p>
              </div>
            </div>

            {/* Rolling 365-Day Window Warning Box */}
            <div
              className={`p-5 rounded-2xl border flex items-start gap-3.5 text-xs ${
                calculations.riskLevel === "high"
                  ?"bg-red-50 border-red-200 text-red-900"
                  : calculations.riskLevel === "moderate"
                  ?"bg-amber-50 border-amber-200 text-amber-900"
                  :"bg-emerald-50 border-emerald-200 text-emerald-900"
              }`}
            >
              {calculations.riskLevel === "high" ? (
                <FaExclamationTriangle className="text-red-600 shrink-0 text-base mt-0.5" />
              ) : (
                <FaCheckCircle className="text-emerald-600 shrink-0 text-base mt-0.5" />
              )}
              <div>
                <strong className="font-bold text-sm block mb-0.5">
                  Rolling 365-Day Window Status: {calculations.riskLevel.toUpperCase()} RISK
                </strong>
                <span>{calculations.riskNote}</span>
              </div>
            </div>

            {/* Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
              <div className="text-xs font-semibold text-emerald-950">
                Formula: ({calculations.remainingHours.toLocaleString()} hrs × 60) ÷ ({calculations.minutesPerView.toFixed(1)} mins/view) = {calculations.totalViewsNeeded.toLocaleString()} views
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyPlan}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
                >
                  {copied ? <FaCheck className="w-3.5 h-3.5" /> : <FaCopy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Plan Copied!" : "Copy Plan"}</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrintPlan}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
                >
                  <FaPrint className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Print Blueprint</span>
                </button>
                <Link
                  href="/tools/youtube-earnings-calculator"
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-emerald-600 text-xs font-bold transition-colors"
                >
                  <span>Estimate Earnings →</span>
                </Link>
              </div>
            </div>

            {/* High-CPC Creator Equipment & Editing Software Callout */}
            <CreatorSoftwareCard />
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
