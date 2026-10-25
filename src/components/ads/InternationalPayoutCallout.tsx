"use client";

import { useState } from "react";
import { FaGlobeAmericas, FaExternalLinkAlt, FaInfoCircle, FaShieldAlt, FaCoins, FaCheckCircle } from "react-icons/fa";
import { AFFILIATE_TOOLS, DEFAULT_AFFILIATE_DISCLOSURE } from "@/config/affiliates";

interface InternationalPayoutCalloutProps {
  monthlyUsdEstimate?: number;
  className?: string;
}

export default function InternationalPayoutCallout({
  monthlyUsdEstimate = 2500,
  className = "",
}: InternationalPayoutCalloutProps) {
  const [provider, setProvider] = useState<"wise" | "payoneer">("wise");

  const monthlyLoss = Math.round(monthlyUsdEstimate * 0.038); // ~3.8% hidden FX markup & wire fee
  const annualLoss = monthlyLoss * 12;

  const currentTool = AFFILIATE_TOOLS[provider];

  return (
    <div
      className={`my-8 overflow-hidden rounded-2xl border border-emerald-300/80 bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-white dark:border-emerald-800/60 dark:from-slate-900 dark:via-emerald-950/20 dark:to-slate-900 shadow-md ${className}`}
    >
      <div className="border-b border-emerald-100 bg-emerald-600/10 px-5 py-3 dark:border-emerald-900/40">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            <FaGlobeAmericas className="text-emerald-600 dark:text-emerald-400" />
            <span>International Creator FinTech Alert</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
            Save 3%–5% on Wire Fees
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Stop losing ${monthlyLoss.toLocaleString()}/mo in AdSense wire &amp; FX conversion fees
            </h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              If you live outside the United States, traditional banks secretly charge a <strong className="text-emerald-700 dark:text-emerald-400">2.5%–4.5% foreign exchange markup</strong> plus flat $15–$30 incoming international SWIFT wire fees on every single YouTube AdSense &amp; brand sponsorship payout.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400">
                <FaCheckCircle className="text-emerald-500" /> Free US Routing &amp; Account Number
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400">
                <FaCheckCircle className="text-emerald-500" /> Real Mid-Market Exchange Rate
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400">
                <FaCheckCircle className="text-emerald-500" /> Zero Wire Intermediary Fees
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl border border-emerald-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-800/90">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-700">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Estimated Creator Loss:
                </span>
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                  -${annualLoss.toLocaleString()}/year lost to bank fees
                </span>
              </div>

              {/* Provider Selector Tabs */}
              <div className="mt-3 flex rounded-lg bg-slate-100 p-1 dark:bg-slate-900">
                <button
                  type="button"
                  onClick={() => setProvider("wise")}
                  className={`flex-1 rounded-md py-1.5 text-xs font-bold transition-all ${
                    provider === "wise"
                      ? "bg-white text-emerald-700 shadow-sm dark:bg-slate-800 dark:text-emerald-400"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
                  }`}
                >
                  Wise Business (Recommended)
                </button>
                <button
                  type="button"
                  onClick={() => setProvider("payoneer")}
                  className={`flex-1 rounded-md py-1.5 text-xs font-bold transition-all ${
                    provider === "payoneer"
                      ? "bg-white text-emerald-700 shadow-sm dark:bg-slate-800 dark:text-emerald-400"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
                  }`}
                >
                  Payoneer Global
                </button>
              </div>

              <div className="mt-4">
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {currentTool.tagline}
                </p>
                <a
                  href={currentTool.link}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-xs font-black text-white shadow hover:from-emerald-700 hover:to-teal-700 hover:shadow-md transition-all"
                >
                  <span>{currentTool.ctaText}</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center lg:text-left text-[11px] text-slate-400 dark:text-slate-500 italic">
          {DEFAULT_AFFILIATE_DISCLOSURE}
        </p>
      </div>
    </div>
  );
}
