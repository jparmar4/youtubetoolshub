"use client";

import { useState, useMemo } from "react";
import { parseCalculatorInput } from "@/lib/calculator-input";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import InternationalPayoutCallout from "@/components/ads/InternationalPayoutCallout";
import Link from "next/link";
import {
  FaCheck,
  FaTimes,
  FaYoutube,
  FaCoins } from "react-icons/fa";

export default function MembershipFeeCalculator() {
  const [membersInput, setMembersInput] = useState<string>("500");
  const [tierPriceInput, setTierPriceInput] = useState<string>("10.00");
  const [merchSalesInput, setMerchSalesInput] = useState<string>("1500");

  const calculations = useMemo(() => {
    const members = parseCalculatorInput(membersInput);
    const tierPrice = parseCalculatorInput(tierPriceInput);
    const merch = parseCalculatorInput(merchSalesInput);

    if (!Number.isFinite(members) || members <= 0 || !Number.isFinite(tierPrice) || tierPrice <= 0) {
      return null;
    }

    const validMerch = Number.isFinite(merch) ? Math.max(0, merch) : 0;
    const monthlyMembershipGross = members * tierPrice;
    const monthlyTotalGross = monthlyMembershipGross + validMerch;

    // 1. YouTube Channel Memberships
    // YouTube takes 30% flat on memberships (covers CC fees)
    // Merch through YouTube store partner (Spring/Shopify) ~12% average take
    const ytMembershipFee = monthlyMembershipGross * 0.30;
    const ytMerchFee = validMerch * 0.12;
    const ytTotalFees = ytMembershipFee + ytMerchFee;
    const ytNetMonthly = monthlyTotalGross - ytTotalFees;
    const ytNetAnnual = ytNetMonthly * 12;

    // 2. Patreon (Pro Plan: 8% platform fee + Stripe processing 2.9% + $0.30 per member)
    const patreonPlatformFee = monthlyMembershipGross * 0.08;
    const patreonStripeFee = (monthlyMembershipGross * 0.029) + (members * 0.30);
    const patreonMerchFee = (validMerch * 0.05) + (validMerch * 0.029);
    const patreonTotalFees = patreonPlatformFee + patreonStripeFee + patreonMerchFee;
    const patreonNetMonthly = Math.max(0, monthlyTotalGross - patreonTotalFees);
    const patreonNetAnnual = patreonNetMonthly * 12;

    // 3. Fourthwall
    // 0% platform fee on memberships! 5% on digital catalog. Standard Stripe 2.9% + $0.30
    const fourthwallPlatformFee = validMerch * 0.05;
    const fourthwallStripeFee = (monthlyTotalGross * 0.029) + (members * 0.30);
    const fourthwallTotalFees = fourthwallPlatformFee + fourthwallStripeFee;
    const fourthwallNetMonthly = Math.max(0, monthlyTotalGross - fourthwallTotalFees);
    const fourthwallNetAnnual = fourthwallNetMonthly * 12;

    // Lost revenue to YouTube vs Fourthwall
    const ytLostAnnual = Math.round(fourthwallNetAnnual - ytNetAnnual);
    const patreonLostAnnual = Math.round(fourthwallNetAnnual - patreonNetAnnual);

    return {
      monthlyTotalGross: Math.round(monthlyTotalGross),
      annualGross: Math.round(monthlyTotalGross * 12),
      yt: {
        fees: Math.round(ytTotalFees),
        netMonthly: Math.round(ytNetMonthly),
        netAnnual: Math.round(ytNetAnnual),
        effectiveFeeRate: ((ytTotalFees / monthlyTotalGross) * 100).toFixed(1) },
      patreon: {
        fees: Math.round(patreonTotalFees),
        netMonthly: Math.round(patreonNetMonthly),
        netAnnual: Math.round(patreonNetAnnual),
        effectiveFeeRate: ((patreonTotalFees / monthlyTotalGross) * 100).toFixed(1) },
      fourthwall: {
        fees: Math.round(fourthwallTotalFees),
        netMonthly: Math.round(fourthwallNetMonthly),
        netAnnual: Math.round(fourthwallNetAnnual),
        effectiveFeeRate: ((fourthwallTotalFees / monthlyTotalGross) * 100).toFixed(1) },
      ytLostAnnual,
      patreonLostAnnual };
  }, [membersInput, tierPriceInput, merchSalesInput]);

  return (
    <ToolPageLayout
      title="Patreon vs YouTube Memberships vs Fourthwall Fee Calculator"
      slug="patreon-vs-youtube-memberships-vs-fourthwall-fee-calculator"
      description="Compare platform cuts and Stripe processing fees to see how much creator income you keep each month."
    >
      <div className="space-y-8">
        {/* Header Alert */}
        <div className="rounded-2xl border border-purple-200/80 bg-gradient-to-r from-purple-50/80 via-white to-pink-50/60 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-black text-purple-700">
                <FaCoins /> Creator Monetization Economics
              </span>
              <h2 className="mt-2 text-xl sm:text-2xl font-black text-slate-900">
                How Much Money Are Platform Cuts Costing You?
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                YouTube takes a staggering 30% cut of every channel membership. Patreon takes 8% to 12% plus processing. Newer platforms like Fourthwall take 0% on memberships.
              </p>
            </div>
            <Link
              href="/tools/youtube-earnings-calculator"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-purple-700 transition-all"
            >
              <span>Earnings Calculator →</span>
            </Link>
          </div>
        </div>

        {/* Inputs */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Active Monthly Members / Patrons
              </label>
              <Input
                type="text"
                inputMode="decimal"
                value={membersInput}
                onChange={(e) => setMembersInput(e.target.value)}
                placeholder="e.g. 500"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Total recurring monthly paying supporters.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Average Membership Tier Price ($/mo)
              </label>
              <Input
                type="text"
                inputMode="decimal"
                value={tierPriceInput}
                onChange={(e) => setTierPriceInput(e.target.value)}
                placeholder="e.g. 10.00"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Weighted average of your $5, $10, and $25 tiers.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Monthly Digital &amp; Merch Sales ($)
              </label>
              <Input
                type="text"
                inputMode="decimal"
                value={merchSalesInput}
                onChange={(e) => setMerchSalesInput(e.target.value)}
                placeholder="e.g. 1500"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Apparel, presets, digital downloads &amp; courses.
              </p>
            </div>
          </div>
        </div>

        {/* Results */}
        {calculations && (
          <div className="space-y-6">
            {/* Top Callout */}
            <div className="rounded-2xl border border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 text-center shadow-md">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Annual Creator Take-Home Difference
              </span>
              <div className="mt-2 text-3xl sm:text-4xl font-black text-emerald-700 font-outfit">
                +${calculations.ytLostAnnual.toLocaleString()}/year Extra with Fourthwall
              </div>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
                YouTube Channel Memberships takes an extra <strong>${calculations.ytLostAnnual.toLocaleString()}</strong> of your money every single year compared to Fourthwall&apos;s 0% platform fee model.
              </p>
            </div>

            {/* 3-Platform Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* YouTube Memberships */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-sm">
                      <FaYoutube />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">
                        YouTube Memberships
                      </h4>
                      <span className="text-[11px] text-rose-600 font-semibold">
                        Flat 30% Platform Cut
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2.5 text-xs">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-slate-500">Monthly Fees Deducted</span>
                      <span className="font-bold text-rose-600">
                        -${calculations.yt.fees.toLocaleString()}/mo
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-slate-500">Effective Fee Rate</span>
                      <span className="font-bold text-slate-900">
                        {calculations.yt.effectiveFeeRate}%
                      </span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-500 font-semibold">Net Annual Take-Home</span>
                      <span className="font-black text-slate-900 text-sm">
                        ${calculations.yt.netAnnual.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-slate-50 p-3 text-[11px] text-slate-600">
                  ⚠️ YouTube does not give you member email addresses. If your channel is suspended, you lose your entire community.
                </div>
              </div>

              {/* Patreon */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white font-black text-sm">
                      P
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">
                        Patreon (Pro Plan)
                      </h4>
                      <span className="text-[11px] text-amber-600 font-semibold">
                        8% Cut + Stripe Processing
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2.5 text-xs">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-slate-500">Monthly Fees Deducted</span>
                      <span className="font-bold text-amber-600">
                        -${calculations.patreon.fees.toLocaleString()}/mo
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-slate-500">Effective Fee Rate</span>
                      <span className="font-bold text-slate-900">
                        {calculations.patreon.effectiveFeeRate}%
                      </span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-500 font-semibold">Net Annual Take-Home</span>
                      <span className="font-black text-slate-900 text-sm">
                        ${calculations.patreon.netAnnual.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-slate-50 p-3 text-[11px] text-slate-600">
                  ℹ️ Patreon gives you member emails and Discord sync, but charges 8%–12% platform fee + currency conversion charges.
                </div>
              </div>

              {/* Fourthwall */}
              <div className="rounded-2xl border-2 border-emerald-500 bg-gradient-to-b from-emerald-50/40 to-white p-6 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white font-black text-sm">
                        4
                      </div>
                      <div>
                        <h4 className="font-bold text-emerald-900 text-base">
                          Fourthwall
                        </h4>
                        <span className="text-[11px] text-emerald-600 font-semibold">
                          0% Platform Cut on Memberships
                        </span>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[11px] font-black text-white uppercase">
                      Winner
                    </span>
                  </div>

                  <div className="mt-4 space-y-2.5 text-xs">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-slate-500">Monthly Fees Deducted</span>
                      <span className="font-bold text-emerald-600">
                        -${calculations.fourthwall.fees.toLocaleString()}/mo
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-slate-500">Effective Fee Rate</span>
                      <span className="font-bold text-slate-900">
                        {calculations.fourthwall.effectiveFeeRate}%
                      </span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-500 font-semibold">Net Annual Take-Home</span>
                      <span className="font-black text-emerald-700 text-base">
                        ${calculations.fourthwall.netAnnual.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-emerald-100/60 p-3 text-[11px] text-emerald-900">
                  🎉 100% email list ownership, custom domain website, native merch shop, and you keep ~95% of every dollar.
                </div>
              </div>
            </div>

            {/* Feature Comparison Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="p-4 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">
                  Creator Freedom &amp; Feature Comparison
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="p-3">Feature</th>
                      <th className="p-3">YouTube Memberships</th>
                      <th className="p-3">Patreon</th>
                      <th className="p-3">Fourthwall</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3 font-semibold">Platform Cut on Memberships</td>
                      <td className="p-3 text-rose-600 font-bold">30% Flat</td>
                      <td className="p-3 text-amber-600 font-bold">8% – 12%</td>
                      <td className="p-3 text-emerald-600 font-bold">0% (Zero)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Own Supporter Emails (CSV Export)</td>
                      <td className="p-3 text-rose-500"><FaTimes /> No (Locked to YouTube)</td>
                      <td className="p-3 text-emerald-500"><FaCheck /> Yes</td>
                      <td className="p-3 text-emerald-500"><FaCheck /> Yes (Full Control)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Custom Domain (yourname.com)</td>
                      <td className="p-3 text-rose-500"><FaTimes /> No</td>
                      <td className="p-3 text-rose-500"><FaTimes /> No (patreon.com only)</td>
                      <td className="p-3 text-emerald-500"><FaCheck /> Yes (Free Custom Domain)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Integrated Physical Merch Fulfillment</td>
                      <td className="p-3">Via 3rd-party integration</td>
                      <td className="p-3">Limited / 3rd-party</td>
                      <td className="p-3 text-emerald-500"><FaCheck /> Built-in Print on Demand</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* International Payout Callout */}
            <InternationalPayoutCallout monthlyUsdEstimate={calculations.monthlyTotalGross} />
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
