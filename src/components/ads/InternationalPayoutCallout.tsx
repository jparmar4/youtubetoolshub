"use client";

import { useState } from "react";
import { FaGlobeAmericas, FaExternalLinkAlt, FaCheckCircle } from "react-icons/fa";
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
      className={`my-8 overflow-hidden rounded-2xl border border-emerald-300/80 bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-white shadow-md ${className}`}
    >
      <div className="border-b border-emerald-100 bg-emerald-600/10 px-5 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <FaGlobeAmericas className="text-emerald-600" />
            <span>International Creator FinTech Alert</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
            Save 3%–5% on Wire Fees
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="text-lg sm:text-xl font-black text-slate-900">
              Stop losing ${monthlyLoss.toLocaleString()}/mo in AdSense wire &amp; FX conversion fees
            </p>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              If you live outside the United States, traditional banks secretly charge a <strong className="text-emerald-700">2.5%–4.5% foreign exchange markup</strong> plus flat $15–$30 incoming international SWIFT wire fees on every single YouTube AdSense &amp; brand sponsorship payout.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
                <FaCheckCircle className="text-emerald-500" /> Free US Routing &amp; Account Number
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
                <FaCheckCircle className="text-emerald-500" /> Real Mid-Market Exchange Rate
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
                <FaCheckCircle className="text-emerald-500" /> Zero Wire Intermediary Fees
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl border border-emerald-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-semibold text-slate-500">
                  Estimated Creator Loss:
                </span>
                <span className="text-xs font-bold text-rose-600">
                  -${annualLoss.toLocaleString()}/year lost to bank fees
                </span>
              </div>

              {/* Provider Selector Tabs */}
              <div className="mt-3 flex rounded-lg bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setProvider("wise")}
                  className={`flex-1 rounded-md py-1.5 text-xs font-bold transition-all ${
                    provider === "wise"
                      ? "bg-white text-emerald-700 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Wise Business (Recommended)
                </button>
                <button
                  type="button"
                  onClick={() => setProvider("payoneer")}
                  className={`flex-1 rounded-md py-1.5 text-xs font-bold transition-all ${
                    provider === "payoneer"
                      ? "bg-white text-emerald-700 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Payoneer Global
                </button>
              </div>

              <div className="mt-4">
                <p className="text-xs text-slate-600">
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

        <p className="mt-4 text-center lg:text-left text-[11px] text-slate-600 italic">
          {DEFAULT_AFFILIATE_DISCLOSURE}
        </p>
      </div>
    </div>
  );
}
