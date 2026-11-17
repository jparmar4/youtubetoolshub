"use client";

import { useMemo, useState } from "react";
import { FaBuilding, FaFileInvoiceDollar, FaSlidersH } from "react-icons/fa";
import {
  IRS_2026_CONSTANTS,
  UsStateCreatorTax,
  calculateCreatorStateTaxSummary,
} from "@/data/usStateCreatorTaxes";
import LLCvsSCorpCalculator from "@/components/tools/LLCvsSCorpCalculator";
import TaxDeductionCalculator from "@/components/tools/TaxDeductionCalculator";

interface StateCreatorTaxWorkspaceProps {
  state: UsStateCreatorTax;
  combinedAssumedRate: string;
}

const SLIDER_PRESETS = [
  { label: "$60K", value: 60_000 },
  { label: "$100K", value: 100_000 },
  { label: "$184.5K (SS Cap)", value: 184_500 },
  { label: "$250K", value: 250_000 },
  { label: "$400K", value: 400_000 },
];

export default function StateCreatorTaxWorkspace({
  state,
  combinedAssumedRate,
}: StateCreatorTaxWorkspaceProps) {
  const [netProfit, setNetProfit] = useState<number>(100_000);
  const [activeTab, setActiveTab] = useState<"scorp" | "writeoffs">("scorp");

  const scenario = useMemo(
    () => calculateCreatorStateTaxSummary(state, netProfit),
    [state, netProfit],
  );

  const effectiveTotalRate = useMemo(
    () => ((scenario.totalSolePropTax / scenario.netProfit) * 100).toFixed(1),
    [scenario],
  );

  return (
    <div className="space-y-8">
      {/* Interactive 2026 Net Creator Profit Slider + Live Breakdown */}
      <div className="rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-50/70 via-white to-emerald-50/60 p-5 sm:p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-blue-700">
              <FaSlidersH className="w-3 h-3" aria-hidden="true" />
              <span>2026 Interactive State Tax Estimator</span>
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 font-outfit mt-0.5">
              {state.stateName} Net Creator Profit: ${netProfit.toLocaleString("en-US")}/year
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {SLIDER_PRESETS.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => setNetProfit(preset.value)}
                className={`cursor-pointer px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                  netProfit === preset.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-700 border-slate-200 hover:border-blue-400"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <input
            type="range"
            min={30000}
            max={500000}
            step={5000}
            value={netProfit}
            onChange={(e) => setNetProfit(Number(e.target.value))}
            aria-label={`${state.stateName} annual net creator profit slider`}
            className="w-full accent-blue-600 cursor-pointer h-2.5 rounded-lg bg-slate-200"
          />
          <div className="flex justify-between text-[11px] font-bold text-slate-500">
            <span>$30,000</span>
            <span>$100,000 (Default)</span>
            <span>$184,500 (2026 SSA Cap)</span>
            <span>$500,000</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-xl bg-white border border-slate-200 p-3.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              2026 Federal SE Tax (15.3%)
            </span>
            <span className="text-xl font-black text-rose-700 font-outfit mt-0.5 block">
              ${scenario.federalSelfEmploymentTax.toLocaleString("en-US")}
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              12.4% SS up to ${IRS_2026_CONSTANTS.socialSecurityWageBase.toLocaleString("en-US")} + 2.9% Med
            </span>
          </div>

          <div className="rounded-xl bg-white border border-slate-200 p-3.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Est. Federal Income Tax
            </span>
            <span className="text-xl font-black text-slate-900 font-outfit mt-0.5 block">
              ${scenario.estimatedFederalIncomeTax.toLocaleString("en-US")}
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              After ${IRS_2026_CONSTANTS.standardDeductionSingle.toLocaleString("en-US")} std ded. + 20% QBI
            </span>
          </div>

          <div className="rounded-xl bg-white border border-slate-200 p-3.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Est. {state.stateCode} State Tax
            </span>
            <span className="text-xl font-black text-indigo-700 font-outfit mt-0.5 block">
              {state.topIncomeTaxRate === 0
                ? "$0"
                : `$${scenario.estimatedStateIncomeTax.toLocaleString("en-US")}`}
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              {state.topIncomeTaxRate === 0
                ? "0% state income tax"
                : `${state.effectiveRateAt100k}% eff. · ${state.topIncomeTaxRate}% top rate`}
            </span>
          </div>

          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
              Est. S-Corp Net Savings
            </span>
            <span className="text-xl font-black text-emerald-700 font-outfit mt-0.5 block">
              {scenario.estimatedSCorpNetSavings > 0
                ? `+$${scenario.estimatedSCorpNetSavings.toLocaleString("en-US")}/yr`
                : "$0 (Below $60K)"}
            </span>
            <span className="text-[11px] text-emerald-800/80 block mt-0.5">
              Total Sole-Prop Tax: ${scenario.totalSolePropTax.toLocaleString("en-US")} ({effectiveTotalRate}%)
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-600 border-t border-slate-200/70">
          <span>
            <strong>{state.stateName} LLC Setup:</strong> ${state.llcFilingFee} formation ·{" "}
            <strong>Annual Fee:</strong> ${state.llcAnnualFee}/yr ({state.annualFeeSchedule})
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full font-extrabold text-[11px] ${
              state.sCorpFriendly
                ? "bg-emerald-100 text-emerald-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {state.sCorpFriendly ? "S-Corp Election Friendly" : "Check Entity Tax Caution"}
          </span>
        </div>
      </div>

      {/* Granular Interactive Calculators (Pre-selected for State) */}
      <div className="space-y-5">
        <div
          className="inline-flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200"
          role="tablist"
          aria-label={`${state.stateName} detailed calculator tabs`}
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "scorp"}
            onClick={() => setActiveTab("scorp")}
            className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "scorp"
                ? "bg-white text-blue-700 shadow-xs border border-blue-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FaBuilding className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{state.stateCode} Custom S-Corp Modeler</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "writeoffs"}
            onClick={() => setActiveTab("writeoffs")}
            className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "writeoffs"
                ? "bg-white text-emerald-700 shadow-xs border border-emerald-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FaFileInvoiceDollar className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{state.stateCode} Gear &amp; Studio Write-Offs ({combinedAssumedRate}%)</span>
          </button>
        </div>

        {activeTab === "scorp" ? (
          <LLCvsSCorpCalculator
            key={netProfit}
            initialStateCode={state.stateCode}
            initialNetProfit={String(netProfit)}
          />
        ) : (
          <TaxDeductionCalculator initialAssumedRate={combinedAssumedRate} />
        )}
      </div>
    </div>
  );
}
