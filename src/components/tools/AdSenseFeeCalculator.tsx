"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import GoogleAd from "@/components/ads/GoogleAd";
import {
  FaUniversity,
  FaDollarSign,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaGlobe,
  FaLightbulb,
  FaCopy,
  FaCheck,
} from "react-icons/fa";

interface CountryFeeProfile {
  id: string;
  name: string;
  currency: string;
  w8benRate: number; // Percentage on US-viewer revenue (approx 40% of channel total)
  avgWireFeeUsd: number;
  bankFxMarkupPercent: number; // e.g., 3.5%
  wiseFxMarkupPercent: number; // e.g., 0.45%
}

const COUNTRY_PROFILES: CountryFeeProfile[] = [
  { id: "uk", name: "United Kingdom (GBP)", currency: "£", w8benRate: 0, avgWireFeeUsd: 20, bankFxMarkupPercent: 3.2, wiseFxMarkupPercent: 0.42 },
  { id: "canada", name: "Canada (CAD)", currency: "C$", w8benRate: 0, avgWireFeeUsd: 15, bankFxMarkupPercent: 3.0, wiseFxMarkupPercent: 0.45 },
  { id: "australia", name: "Australia (AUD)", currency: "A$", w8benRate: 5, avgWireFeeUsd: 20, bankFxMarkupPercent: 3.4, wiseFxMarkupPercent: 0.45 },
  { id: "india", name: "India (INR)", currency: "₹", w8benRate: 15, avgWireFeeUsd: 25, bankFxMarkupPercent: 3.8, wiseFxMarkupPercent: 0.55 },
  { id: "germany", name: "Germany / EU (EUR)", currency: "€", w8benRate: 0, avgWireFeeUsd: 20, bankFxMarkupPercent: 2.8, wiseFxMarkupPercent: 0.40 },
  { id: "philippines", name: "Philippines (PHP)", currency: "₱", w8benRate: 15, avgWireFeeUsd: 25, bankFxMarkupPercent: 4.2, wiseFxMarkupPercent: 0.65 },
  { id: "brazil", name: "Brazil (BRL)", currency: "R$", w8benRate: 15, avgWireFeeUsd: 30, bankFxMarkupPercent: 4.5, wiseFxMarkupPercent: 0.70 },
  { id: "other", name: "Other Global Countries (SWIFT Wire)", currency: "$", w8benRate: 15, avgWireFeeUsd: 30, bankFxMarkupPercent: 4.0, wiseFxMarkupPercent: 0.60 },
];

export default function AdSenseFeeCalculator() {
  const [monthlyEarnings, setMonthlyEarnings] = useState<string>("3000");
  const [selectedCountry, setSelectedCountry] = useState<string>("uk");
  const [usViewerPercent, setUsViewerPercent] = useState<string>("45");
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyBreakdown = async () => {
    const report = `💳 YouTube AdSense Bank Fee & Payout Audit (YouTube Tools Hub)
---------------------------------------------------------------
• Gross AdSense Earnings: $${results.grossMonthly.toLocaleString()}/mo
• Country Profile: ${results.country.name}
• Estimated US Audience Share: ${usViewerPercent}%
${results.usWithholdingMonthly > 0 ? `• US Withholding Tax (W-8BEN): -$${results.usWithholdingMonthly.toLocaleString()}/mo
` : ''}• SWIFT Intermediary Wire Deductions: -$${results.fixedWireFee}/mo
• Bank Hidden FX Spread (${results.country.bankFxMarkupPercent}%): -$${results.bankFxSpread.toLocaleString()}/mo
---------------------------------------------------------------
• Traditional Bank Net Payout: ~$${results.traditionalNetMonthly.toLocaleString()}/mo
• Multi-Currency Account Net: ~$${results.modernNetMonthly.toLocaleString()}/mo
• Recoverable Annual Leakage: +$${results.annualSavings.toLocaleString()} / year

Audited with: https://www.youtubetoolshub.com/tools/youtube-adsense-fee-calculator`;

    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* ignore */
    }
  };

  const results = useMemo(() => {
    const grossMonthly = Math.max(0, parseFloat(monthlyEarnings) || 0);
    const country = COUNTRY_PROFILES.find((c) => c.id === selectedCountry) || COUNTRY_PROFILES[0];
    const usRatio = Math.min(100, Math.max(0, parseFloat(usViewerPercent) || 45)) / 100;

    // 1. US Withholding Tax (W-8BEN applies only to revenue generated from US viewers)
    const usRevenue = grossMonthly * usRatio;
    const usWithholdingMonthly = usRevenue * (country.w8benRate / 100);

    const postTaxMonthly = grossMonthly - usWithholdingMonthly;

    // 2. Traditional Bank Wire Losses:
    // Fixed Intermediary & Inward Wire Fee ($15 - $30)
    const fixedWireFee = postTaxMonthly > 0 ? country.avgWireFeeUsd : 0;
    // Hidden FX Spread on remaining payout
    const bankFxSpread = (postTaxMonthly - fixedWireFee) * (country.bankFxMarkupPercent / 100);
    const totalTraditionalLossMonthly = fixedWireFee + bankFxSpread;
    const traditionalNetMonthly = postTaxMonthly - totalTraditionalLossMonthly;

    // 3. Multi-Currency Business Account (Wise / Relay / Mercury):
    // Zero wire receiving fee for USD ACH + transparent mid-market FX fee
    const modernFxSpread = postTaxMonthly * (country.wiseFxMarkupPercent / 100);
    const modernNetMonthly = postTaxMonthly - modernFxSpread;

    const monthlySavings = modernNetMonthly - traditionalNetMonthly;
    const annualSavings = monthlySavings * 12;

    return {
      grossMonthly,
      usWithholdingMonthly: Math.round(usWithholdingMonthly),
      fixedWireFee,
      bankFxSpread: Math.round(bankFxSpread),
      totalTraditionalLossMonthly: Math.round(totalTraditionalLossMonthly),
      traditionalNetMonthly: Math.round(traditionalNetMonthly),
      modernNetMonthly: Math.round(modernNetMonthly),
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      country,
    };
  }, [monthlyEarnings, selectedCountry, usViewerPercent]);

  return (
    <ToolPageLayout
      title="YouTube AdSense Wire Transfer Fee & Creator Banking Calculator"
      slug="youtube-adsense-fee-calculator"
      description="Calculate hidden bank wire fees, FX currency conversion markups, and W-8BEN tax deductions on international YouTube AdSense payouts."
    >
      <div className="space-y-8">
        {/* Header Alert */}
        <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50/80 via-white to-teal-50/60 p-5 sm:p-6 dark:border-emerald-900/40 dark:from-slate-900 dark:via-emerald-950/20 dark:to-slate-900 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400">
                <FaUniversity /> International Creator Payout Audit
              </span>
              <h2 className="mt-2 text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                YouTube AdSense Wire Fee &amp; FX Spread Calculator
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Uncover the hidden 3% to 5% foreign exchange spread and intermediary SWIFT wire deductions your bank charges on Google AdSense payouts.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 rounded-lg">
                High-CPC Fintech Model
              </span>
            </div>
          </div>
        </div>

        {/* Inputs & Calculation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                Monthly YouTube AdSense Payout (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <Input
                  type="number"
                  min="50"
                  step="100"
                  value={monthlyEarnings}
                  onChange={(e) => setMonthlyEarnings(e.target.value)}
                  className="pl-8 text-lg font-bold"
                  placeholder="3000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                Your Payout Receiving Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {COUNTRY_PROFILES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                Estimated % of Views from United States
              </label>
              <div className="relative">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={usViewerPercent}
                  onChange={(e) => setUsViewerPercent(e.target.value)}
                  className="pr-8 text-base font-semibold"
                  placeholder="45"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Google withholding tax (W-8BEN) applies strictly to income generated from viewers located in the US.
              </p>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Hidden Banking Cost Audit
              </span>

              <div className="mt-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <p className="text-xs text-slate-300">You Can Recover Annually:</p>
                <p className="text-4xl font-black text-emerald-400 mt-1">
                  +${results.annualSavings.toLocaleString()} / yr
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  By switching from traditional SWIFT bank wires to modern multi-currency creator accounts.
                </p>
              </div>

              {/* Monthly Breakdown */}
              <div className="mt-5 space-y-2.5 text-xs sm:text-sm divide-y divide-white/10">
                <div className="flex justify-between pt-1">
                  <span className="text-slate-400">Gross Monthly AdSense:</span>
                  <span className="font-bold text-white">${results.grossMonthly.toLocaleString()}</span>
                </div>
                {results.usWithholdingMonthly > 0 && (
                  <div className="flex justify-between pt-2 text-rose-300">
                    <span>US W-8BEN Tax Withholding:</span>
                    <span className="font-bold">-${results.usWithholdingMonthly.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 text-amber-300">
                  <span>SWIFT Intermediary Wire Fee:</span>
                  <span className="font-bold">-${results.fixedWireFee}</span>
                </div>
                <div className="flex justify-between pt-2 text-amber-300">
                  <span>Bank Hidden FX Spread ({results.country.bankFxMarkupPercent}%):</span>
                  <span className="font-bold">-${results.bankFxSpread.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 font-bold text-white text-base">
                  <span>Traditional Bank Net Received:</span>
                  <span>~${results.traditionalNetMonthly.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 font-bold text-emerald-400 text-base">
                  <span>Multi-Currency Account Net:</span>
                  <span>~${results.modernNetMonthly.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Copy Payout Audit Button */}
            <button
              type="button"
              onClick={handleCopyBreakdown}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md shadow-emerald-600/30"
            >
              {copied ? (
                <>
                  <FaCheck className="text-emerald-200" />
                  <span>Payout Audit Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <FaCopy />
                  <span>Copy Payout Fee Audit Report</span>
                </>
              )}
            </button>

            <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl text-xs text-slate-300">
              <span className="font-bold text-emerald-300 flex items-center gap-1.5 mb-1">
                <FaCheckCircle /> Creator Banking Pro-Tip:
              </span>
              Avoid direct USD wire transfers into non-USD accounts. Link an ACH multi-currency routing number (such as Wise or Relay) to AdSense to receive USD at zero fee, then convert at mid-market spot rates.
            </div>
          </div>
        </div>

        {/* Ad unit */}
        <GoogleAd slot="8649718301" responsive className="w-full text-center" />
      </div>
    </ToolPageLayout>
  );
}
