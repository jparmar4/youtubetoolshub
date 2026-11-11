"use client";

import { useState, useMemo } from "react";
import { parseCalculatorInput } from "@/lib/calculator-input";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import InternationalPayoutCallout from "@/components/ads/InternationalPayoutCallout";
import Link from "next/link";
import {
  FaFileInvoiceDollar,
  FaBuilding,
  FaUserTie,
  FaCopy,
  FaCheck } from "react-icons/fa";

interface StateTaxRule {
  name: string;
  minFranchiseTax: number;
  note: string;
}

const US_STATES: Record<string, StateTaxRule> = {
  CA: { name: "California", minFranchiseTax: 800, note: "$800 annual minimum franchise tax" },
  TX: { name: "Texas", minFranchiseTax: 0, note: "0% state income tax, no min franchise fee for <$2.47M" },
  FL: { name: "Florida", minFranchiseTax: 150, note: "0% personal income tax, $150 annual report fee" },
  NY: { name: "New York", minFranchiseTax: 325, note: "State franchise tax based on gross payroll/capital" },
  WA: { name: "Washington", minFranchiseTax: 0, note: "0% personal income tax, B&O tax applies" },
  NV: { name: "Nevada", minFranchiseTax: 350, note: "0% personal income tax, $200 business license + $150 list fee" },
  TN: { name: "Tennessee", minFranchiseTax: 100, note: "0% personal income tax, $100 minimum franchise fee" },
  NC: { name: "North Carolina", minFranchiseTax: 200, note: "$200 minimum franchise tax, flat state personal tax" },
  IL: { name: "Illinois", minFranchiseTax: 150, note: "1.5% personal property replacement tax applies to S-Corps" },
  CO: { name: "Colorado", minFranchiseTax: 10, note: "Low $10–$25 annual Secretary of State periodic report" },
  MA: { name: "Massachusetts", minFranchiseTax: 456, note: "$456 minimum corporate excise tax for S-Corps" },
  GA: { name: "Georgia", minFranchiseTax: 50, note: "$50 annual registration fee; flat state income tax" },
  OTHER: { name: "Other States (Standard)", minFranchiseTax: 100, note: "Average state filing/annual fee" } };

export default function LLCvsSCorpCalculator() {
  const [netProfitInput, setNetProfitInput] = useState<string>("120000");
  const [salaryPercent, setSalaryPercent] = useState<string>("50");
  const [complianceOverhead, setComplianceOverhead] = useState<string>("1800");
  const [selectedState, setSelectedState] = useState<string>("CA");
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  const calculations = useMemo(() => {
    const profit = parseCalculatorInput(netProfitInput);
    if (!Number.isFinite(profit) || profit <= 0) return null;

    const salaryRatio = parseCalculatorInput(salaryPercent) / 100;
    const overhead = parseCalculatorInput(complianceOverhead);
    const validOverhead = Number.isFinite(overhead) ? Math.max(0, overhead) : 1800;

    // IRS 2026 Social Security Wage Base Cap is approx $168,600
    const SS_CAP = 168600;
    const stateRule = US_STATES[selectedState] || US_STATES.OTHER;

    // --- LLC Sole Proprietorship Taxation (Disregarded Entity) ---
    // 92.35% of net self-employment earnings subject to SE tax
    const seEarnings = profit * 0.9235;
    const llcSocialSecurity = Math.min(seEarnings, SS_CAP) * 0.124;
    const llcMedicare = seEarnings * 0.029;
    // Additional Medicare tax 0.9% for earnings over $200k
    const llcAddlMedicare = seEarnings > 200000 ? (seEarnings - 200000) * 0.009 : 0;
    const llcTotalSeTax = llcSocialSecurity + llcMedicare + llcAddlMedicare;

    // --- S-Corporation Election (Form 2553) ---
    // Owner pays reasonable W-2 salary, remainder is dividend distribution
    const clampedSalaryRatio = Math.min(0.85, Math.max(0.3, Number.isFinite(salaryRatio) ? salaryRatio : 0.5));
    const w2Salary = Math.round(profit * clampedSalaryRatio);
    const shareholderDistribution = Math.max(0, profit - w2Salary);

    // FICA taxes only applied to W-2 Salary
    const scorpSocialSecurity = Math.min(w2Salary, SS_CAP) * 0.124;
    const scorpMedicare = w2Salary * 0.029;
    const scorpAddlMedicare = w2Salary > 200000 ? (w2Salary - 200000) * 0.009 : 0;
    const scorpFicaTax = scorpSocialSecurity + scorpMedicare + scorpAddlMedicare;

    // SE Tax Savings from Distributions
    const grossTaxSavings = llcTotalSeTax - scorpFicaTax;

    // Net Cash Savings after Gusto/CPA compliance & state fees
    const totalSCorpOverhead = validOverhead + stateRule.minFranchiseTax;
    const netAnnualSavings = Math.round(grossTaxSavings - totalSCorpOverhead);

    // Break-even net profit estimate where S-Corp saves more than overhead
    // Break-even occurs roughly when: (profit * (1 - ratio) * 0.153) > totalSCorpOverhead
    const breakEvenProfit = Math.round(totalSCorpOverhead / ((1 - clampedSalaryRatio) * 0.141));

    return {
      profit,
      w2Salary,
      shareholderDistribution,
      llcTotalSeTax: Math.round(llcTotalSeTax),
      scorpFicaTax: Math.round(scorpFicaTax),
      grossTaxSavings: Math.round(grossTaxSavings),
      totalSCorpOverhead: Math.round(totalSCorpOverhead),
      netAnnualSavings,
      breakEvenProfit,
      isProfitable: netAnnualSavings > 0,
      stateRule };
  }, [netProfitInput, salaryPercent, complianceOverhead, selectedState]);

  return (
    <ToolPageLayout
      title="YouTube LLC vs S-Corp Tax Savings Calculator"
      slug="youtube-llc-vs-s-corp-tax-savings-calculator"
      description="Compare IRS Self-Employment taxes vs S-Corp shareholder distributions to calculate your exact creator tax savings."
    >
      <div className="space-y-8">
        {/* Top Header Card */}
        <div className="rounded-2xl border border-blue-200/80 bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/60 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-700">
                <FaFileInvoiceDollar /> Full-Time Creator FinTech Guide (IRS Form 2553)
              </span>
              <h2 className="mt-2 text-xl sm:text-2xl font-black text-slate-900">
                Should You Elect S-Corp Status for Your YouTube Business?
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                As a sole-proprietor LLC, you pay a steep 15.3% Self-Employment tax on 100% of your AdSense, sponsorship, and affiliate profits. With an S-Corp, you only pay FICA on your salary.
              </p>
            </div>
            <Link
              href="/tools/youtube-tax-deduction-calculator"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-blue-700 transition-all"
            >
              <span>Creator Write-Offs Tool →</span>
            </Link>
          </div>
        </div>

        {/* Input Parameters */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-slate-600">Creator Profit Benchmarks:</span>
            {["75000", "120000", "200000", "350000", "500000"].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setNetProfitInput(val)}
                className={`px-2.5 py-1 rounded-lg font-bold border transition-colors ${
                  netProfitInput === val
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-400"
                }`}
              >
                ${(parseInt(val, 10) / 1000).toLocaleString()}K
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Annual Creator Net Profit ($)
              </label>
              <Input
                type="text"
                inputMode="decimal"
                value={netProfitInput}
                onChange={(e) => setNetProfitInput(e.target.value)}
                placeholder="e.g. 120000"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Gross revenue minus gear, editor &amp; software expenses.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                W-2 Reasonable Salary Ratio (%)
              </label>
              <Input
                type="text"
                inputMode="decimal"
                value={salaryPercent}
                onChange={(e) => setSalaryPercent(e.target.value)}
                placeholder="e.g. 50"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                IRS requires reasonable pay (typically 40%–60% for creators).
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Annual S-Corp CPA &amp; Payroll Cost
              </label>
              <Input
                type="text"
                inputMode="decimal"
                value={complianceOverhead}
                onChange={(e) => setComplianceOverhead(e.target.value)}
                placeholder="e.g. 1800"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Gusto ($480/yr) + Form 1120-S corporate tax return ($1,200).
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                State of Residence
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-medium text-slate-800"
              >
                {Object.entries(US_STATES).map(([code, s]) => (
                  <option key={code} value={code}>
                    {s.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-[11px] text-slate-500">
                {US_STATES[selectedState]?.note}
              </p>
            </div>
          </div>
        </div>

        {/* Calculations Display */}
        {calculations && (
          <div className="space-y-6">
            {/* Big Headline Summary Box */}
            <div
              className={`rounded-2xl border p-6 text-center shadow-lg transition-all ${
                calculations.isProfitable
                  ?"border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-teal-50"
                  :"border-amber-300 bg-gradient-to-br from-amber-50 via-white to-yellow-50"
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Annual Creator Take-Home Decision
              </span>
              <div
                className={`mt-2 text-4xl sm:text-5xl font-black font-outfit ${
                  calculations.isProfitable
                    ?"text-emerald-700"
                    :"text-amber-700"
                }`}
              >
                {calculations.isProfitable
                  ? `+$${calculations.netAnnualSavings.toLocaleString()}/yr Saved`
                  : `Stay Default LLC (Save $${Math.abs(calculations.netAnnualSavings).toLocaleString()})`}
              </div>
              <p className="mt-2 text-sm text-slate-700 max-w-xl mx-auto">
                {calculations.isProfitable
                  ? `By electing S-Corporation tax status with IRS Form 2553, you pocket an estimated $${calculations.netAnnualSavings.toLocaleString()} extra in cash after paying for Gusto payroll and CPA tax filing.`
                  : `At your current profit of $${calculations.profit.toLocaleString()}, S-Corporation overhead ($${calculations.totalSCorpOverhead.toLocaleString()}) exceeds the self-employment tax savings. We recommend waiting until you reach $${calculations.breakEvenProfit.toLocaleString()}/year in profit.`}
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    const summary = `YouTube LLC vs S-Corp Tax Analysis (${calculations.stateRule.name})\n• Net Profit: $${calculations.profit.toLocaleString()}\n• Standard LLC SE Tax: $${calculations.llcTotalSeTax.toLocaleString()}\n• S-Corp W-2 Salary: $${calculations.w2Salary.toLocaleString()} (FICA Tax: $${calculations.scorpFicaTax.toLocaleString()})\n• Shareholder Distribution: $${calculations.shareholderDistribution.toLocaleString()}\n• Compliance + State Overhead: $${calculations.totalSCorpOverhead.toLocaleString()}\n• Net Annual Savings: ${calculations.isProfitable ? `+$${calculations.netAnnualSavings.toLocaleString()}` : `-$${Math.abs(calculations.netAnnualSavings).toLocaleString()}`}/yr\n• Break-Even Profit: ~$${calculations.breakEvenProfit.toLocaleString()}\nSource: https://www.youtubetoolshub.com/tools/youtube-llc-vs-s-corp-tax-savings-calculator`;
                    try {
                      await navigator.clipboard.writeText(summary);
                      setCopiedSummary(true);
                      setTimeout(() => setCopiedSummary(false), 2500);
                    } catch {
                      /* ignore */
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 px-3.5 py-2 text-xs font-bold text-white transition-all shadow-xs"
                >
                  {copiedSummary ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                  <span>{copiedSummary ? "CPA Summary Copied!" : "Copy CPA Summary"}</span>
                </button>
                <Link
                  href="/tools/youtube-adsense-fee-calculator"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 px-3.5 py-2 text-xs font-bold text-slate-700 transition-colors"
                >
                  <span>Audit AdSense Wire Fees →</span>
                </Link>
              </div>
            </div>

            {/* Side-by-Side Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Option 1: Standard LLC Sole Proprietorship */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 text-slate-800 font-black text-lg mb-4">
                  <FaBuilding className="text-slate-500" />
                  <span>Standard LLC (Disregarded Entity)</span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">Net Business Profit</span>
                    <span className="font-bold text-slate-900">
                      ${calculations.profit.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">Profit Subject to 15.3% SE Tax</span>
                    <span className="font-bold text-rose-600">
                      100% (${Math.round(calculations.profit * 0.9235).toLocaleString()})
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">Total Self-Employment Tax</span>
                    <span className="font-bold text-rose-600">
                      ${calculations.llcTotalSeTax.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Corporate Compliance Cost</span>
                    <span className="font-bold text-emerald-600">$0 (Schedule C)</span>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                  ⚠️ <strong>The SE Tax Trap:</strong> Every single dollar from AdSense or brand deals is hit with 15.3% Social Security &amp; Medicare taxes before income taxes even begin.
                </div>
              </div>

              {/* Option 2: S-Corporation Election */}
              <div className="rounded-2xl border-2 border-blue-500 bg-gradient-to-b from-blue-50/40 to-white p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-blue-900 font-black text-lg">
                    <FaUserTie className="text-blue-600" />
                    <span>S-Corp Election (Form 2553)</span>
                  </div>
                  <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase">
                    Tax Optimizer
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">W-2 Reasonable Salary (FICA)</span>
                    <span className="font-bold text-slate-900">
                      ${calculations.w2Salary.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">Shareholder Distribution (0% SE Tax)</span>
                    <span className="font-bold text-emerald-600">
                      ${calculations.shareholderDistribution.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">Total FICA Payroll Tax</span>
                    <span className="font-bold text-blue-600">
                      ${calculations.scorpFicaTax.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Gusto &amp; CPA Overhead</span>
                    <span className="font-bold text-slate-700">
                      -${calculations.totalSCorpOverhead.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-blue-100/60 p-3 text-xs text-blue-900">
                  ✨ <strong>The S-Corp Advantage:</strong> Your ${calculations.shareholderDistribution.toLocaleString()} distribution avoids 15.3% SE tax completely, saving you ${calculations.grossTaxSavings.toLocaleString()} in raw tax liability!
                </div>
              </div>
            </div>

            {/* S-Corp Educational Checklist */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-3">
                IRS Guidelines for Full-Time YouTube Creators
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 leading-relaxed">
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">
                    1. The Reasonable Salary Rule
                  </h4>
                  <p>
                    The IRS requires S-Corp shareholder-employees to pay themselves a fair market salary based on their duties. For YouTubers, 40%–50% of net profits is common practice among CPAs.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">
                    2. Automated Payroll (Gusto)
                  </h4>
                  <p>
                    You cannot just write yourself a personal check for salary. You must run official W-2 payroll with federal/state tax withholdings using software like Gusto or OnPay.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">
                    3. Corporate Tax Return (Form 1120-S)
                  </h4>
                  <p>
                    S-Corps file their own informational return by March 15th each year and issue you a Schedule K-1, which flows through to your personal Form 1040.
                  </p>
                </div>
              </div>
            </div>

            {/* International Creator Payout Callout */}
            <InternationalPayoutCallout monthlyUsdEstimate={calculations.profit / 12} />
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
