"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import {
  FaTrophy,
  FaCopy,
  FaCheck,
  FaPrint,
  FaCheckCircle,
} from "react-icons/fa";
import { parseCalculatorInput } from "@/lib/calculator-input";
import { saveHistory } from "@/lib/history";

interface MilestoneGoal {
  title: string;
  targetSubs: number;
  award: string;
  badgeColor: string;
  benefits: string;
}

const MILESTONES: MilestoneGoal[] = [
  {
    title: "1,000 Subscribers",
    targetSubs: 1000,
    award: "YouTube Partner Program (YPP)",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    benefits: "Unlocks AdSense revenue sharing, Super Chats, channel memberships, and live stream monetization.",
  },
  {
    title: "10,000 Subscribers",
    targetSubs: 10000,
    award: "Merch Shelf & Brand Tier 1",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    benefits: "Unlocks YouTube Shopping / Merch Shelf integration, Creator Studio features, and entry-level brand deals.",
  },
  {
    title: "100,000 Subscribers",
    targetSubs: 100000,
    award: "Silver Creator Award (Silver Play Button)",
    badgeColor: "bg-slate-200 text-slate-800 border-slate-300",
    benefits: "Official physical Silver Play Button plaque from YouTube, dedicated channel manager support, and mid-tier sponsorships ($1,500–$5,000/video).",
  },
  {
    title: "1,000,000 Subscribers",
    targetSubs: 1000000,
    award: "Gold Creator Award (Gold Play Button)",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    benefits: "Official physical Gold Play Button, agency representation, Tier-1 media visibility, and 6-figure annualized sponsorship potential.",
  },
  {
    title: "10,000,000 Subscribers",
    targetSubs: 10000000,
    award: "Diamond Creator Award",
    badgeColor: "bg-cyan-100 text-cyan-900 border-cyan-300",
    benefits: "Top 0.01% elite creator tier, Diamond Play Button crystal plaque, and global multi-platform brand equity.",
  },
];

export default function MilestoneCountdownCalculator() {
  const [currentSubs, setCurrentSubs] = useState("18500");
  const [monthlyGrowth, setMonthlyGrowth] = useState("1200");
  const [copied, setCopied] = useState(false);

  const calculations = useMemo(() => {
    const subs = parseCalculatorInput(currentSubs);
    const growth = parseCalculatorInput(monthlyGrowth);

    if (!Number.isFinite(subs) || subs < 0 || !Number.isFinite(growth) || growth <= 0) {
      return null;
    }

    const dailyVelocity = growth / 30;

    const milestonesWithDates = MILESTONES.map((m) => {
      const remaining = Math.max(0, m.targetSubs - subs);
      const isReached = subs >= m.targetSubs;
      const progressPercent = Math.min(100, Math.round((subs / m.targetSubs) * 100));

      if (isReached) {
        return {
          ...m,
          remaining: 0,
          isReached: true,
          progressPercent: 100,
          daysNeeded: 0,
          completionDate: "Unlocked!",
        };
      }

      const daysNeeded = Math.ceil(remaining / Math.max(0.1, dailyVelocity));
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + daysNeeded);

      return {
        ...m,
        remaining,
        isReached: false,
        progressPercent,
        daysNeeded,
        completionDate: targetDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
    });

    const nextMilestone = milestonesWithDates.find((m) => !m.isReached) || milestonesWithDates[milestonesWithDates.length - 1];

    return {
      subs,
      growth,
      dailyVelocity,
      milestonesWithDates,
      nextMilestone,
    };
  }, [currentSubs, monthlyGrowth]);

  const handleCopy = async () => {
    if (!calculations) return;
    const text = `🏆 YouTube Milestone & Play Button Roadmap:
• Current Subscribers: ${calculations.subs.toLocaleString()}
• Monthly Growth Rate: +${calculations.growth.toLocaleString()} subs/mo (~${calculations.dailyVelocity.toFixed(1)} subs/day)
• Next Big Goal: ${calculations.nextMilestone.title} (${calculations.nextMilestone.completionDate} · ${calculations.nextMilestone.daysNeeded} days remaining)
• Silver Play Button (100K): ${calculations.milestonesWithDates[2].completionDate}
• Gold Play Button (1M): ${calculations.milestonesWithDates[3].completionDate}
Calculated via YouTube Tools Hub: https://www.youtubetoolshub.com/tools/youtube-milestone-countdown-calculator`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      saveHistory("youtube-milestone-countdown-calculator", {
        subs: calculations.subs,
        growth: calculations.growth,
        nextGoal: calculations.nextMilestone.title,
      });
    } catch {
      /* ignore */
    }
  };

  const handlePrint = () => {
    if (!calculations || typeof window === "undefined") return;
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>YouTube Creator Award &amp; Milestone Roadmap</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #0f172a; max-width: 800px; margin: 0 auto; }
            h1 { font-size: 26px; color: #7e22ce; margin-bottom: 4px; }
            .badge { display: inline-block; padding: 4px 10px; background: #f3e8ff; color: #7e22ce; border-radius: 999px; font-size: 12px; font-weight: bold; margin-bottom: 24px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
            .card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; background: #f8fafc; }
            .card h3 { font-size: 11px; text-transform: uppercase; color: #64748b; margin: 0 0 8px; }
            .card p { font-size: 22px; font-weight: 800; margin: 0; color: #0f172a; }
            .table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            .table th, .table td { border-bottom: 1px solid #e2e8f0; padding: 10px; text-align: left; font-size: 13px; }
            .table th { background: #f1f5f9; color: #475569; }
            .footer { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #94a3b8; display: flex; justify-content: space-between; }
          </style>
        </head>
        <body>
          <h1>Official YouTube Creator Award Milestone Roadmap</h1>
          <div class="badge">Verified 2026 Milestone Projector · YouTubeToolsHub.com</div>

          <div class="grid">
            <div class="card">
              <h3>Current Subscribers</h3>
              <p>${calculations.subs.toLocaleString()}</p>
            </div>
            <div class="card">
              <h3>Daily Velocity</h3>
              <p>+${calculations.dailyVelocity.toFixed(1)} subs / day</p>
            </div>
          </div>

          <table class="table">
            <thead>
              <tr>
                <th>Milestone</th>
                <th>Target Award</th>
                <th>Status / Days</th>
                <th>Projected Date</th>
              </tr>
            </thead>
            <tbody>
              ${calculations.milestonesWithDates
                .map(
                  (m) => `
                <tr>
                  <td><strong>${m.title}</strong></td>
                  <td>${m.award}</td>
                  <td>${m.isReached ? "✓ Unlocked" : `${m.daysNeeded} days left`}</td>
                  <td><strong>${m.completionDate}</strong></td>
                </tr>`
                )
                .join("")}
            </tbody>
          </table>

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
      title="YouTube Milestone & Play Button Countdown Calculator"
      slug="youtube-milestone-countdown-calculator"
      description="Track your subscriber growth velocity and project the exact dates you will unlock YPP Monetization (1K), Silver Creator Award (100K), and Gold Play Button (1M)."
    >
      <div className="space-y-8">
        {!calculations && (
          <p role="status" className="text-sm text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200">
            Enter positive numbers for your subscriber count and monthly subscriber gain.
          </p>
        )}

        {/* Inputs Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-6 bg-slate-50/70 rounded-3xl border border-slate-200/80">
          <div>
            <Input
              label="Current Channel Subscribers"
              type="text"
              inputMode="decimal"
              value={currentSubs}
              onChange={(e) => setCurrentSubs(e.target.value)}
              placeholder="e.g. 18500"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Your exact current subscriber count
            </span>
          </div>

          <div>
            <Input
              label="Past 30-Day Subscriber Growth"
              type="text"
              inputMode="decimal"
              value={monthlyGrowth}
              onChange={(e) => setMonthlyGrowth(e.target.value)}
              placeholder="e.g. 1200"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Subscribers gained in last 30 days from YouTube Studio
            </span>
          </div>

          <div className="flex items-end">
            <Button
              onClick={() => {
                setCurrentSubs("65000");
                setMonthlyGrowth("3500");
              }}
              variant="outline"
              className="w-full text-xs font-bold h-[42px]"
            >
              Silver Play Button Stretch (65K)
            </Button>
          </div>
        </div>

        {/* Results Presentation */}
        {calculations && (
          <div className="space-y-6 pt-2 animate-fade-in">
            {/* Top Next-Goal Hero */}
            <div className="p-6 bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30">
                  Next Official Creator Award
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-outfit">
                  {calculations.nextMilestone.title} — {calculations.nextMilestone.award}
                </h3>
                <p className="text-xs text-purple-200 opacity-90">
                  Growing at ~<strong>{calculations.dailyVelocity.toFixed(1)} subscribers per day</strong> (+{calculations.growth.toLocaleString()}/month).
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center shrink-0 border border-white/20">
                <span className="text-xs uppercase font-extrabold tracking-wider text-purple-200 block mb-0.5">
                  Projected Date
                </span>
                <span className="text-2xl font-black text-white font-outfit block">
                  {calculations.nextMilestone.completionDate}
                </span>
                <span className="text-xs text-purple-300">
                  ({calculations.nextMilestone.daysNeeded} days remaining)
                </span>
              </div>
            </div>

            {/* Milestones Roadmap List */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FaTrophy className="text-amber-500" />
                Official Creator Award Timeline &amp; Privileges
              </h4>

              <div className="grid grid-cols-1 gap-3">
                {calculations.milestonesWithDates.map((m) => (
                  <div
                    key={m.title}
                    className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      m.isReached
                        ?"bg-slate-50 border-slate-200 opacity-80"
                        :"bg-white border-slate-200 shadow-xs"
                    }`}
                  >
                    <div className="space-y-2 max-w-xl">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-black uppercase px-2.5 py-0.5 rounded-full border ${m.badgeColor}`}>
                          {m.title}
                        </span>
                        <h5 className="font-bold text-slate-900 text-base">
                          {m.award}
                        </h5>
                        {m.isReached && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                            <FaCheckCircle /> Reached
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600">
                        {m.benefits}
                      </p>

                      {/* Progress bar */}
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-600 rounded-full transition-all duration-500"
                          style={{ width: `${m.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="text-left md:text-right shrink-0">
                      <span className="text-xs text-slate-500 block font-semibold">
                        {m.isReached ? "Status" : "Projected Completion"}
                      </span>
                      <span className="text-lg font-black text-slate-900 font-outfit">
                        {m.completionDate}
                      </span>
                      {!m.isReached && (
                        <span className="text-xs text-slate-500 block">
                          {m.remaining.toLocaleString()} subs to go ({m.daysNeeded} days)
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-purple-50/70 border border-purple-200 rounded-2xl">
              <div className="text-xs font-semibold text-purple-900">
                Pacing: +{calculations.dailyVelocity.toFixed(1)} subs/day · Next milestone in {calculations.nextMilestone.daysNeeded} days
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs"
                >
                  {copied ? <FaCheck className="w-3.5 h-3.5" /> : <FaCopy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Roadmap"}</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
                >
                  <FaPrint className="w-3.5 h-3.5 text-purple-600" />
                  <span>Print Milestone Plan</span>
                </button>
                <Link
                  href="/tools/youtube-earnings-calculator"
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-purple-600 text-xs font-bold transition-colors"
                >
                  <span>Calculate Revenue →</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
