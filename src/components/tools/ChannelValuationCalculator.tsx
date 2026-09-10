"use client";

import { useState, useMemo } from "react";
import { parseCalculatorInput } from "@/lib/calculator-input";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import GoogleAd from "@/components/ads/GoogleAd";
import { 
    FaCoins, FaCheckCircle, FaExchangeAlt, FaLightbulb 
} from "react-icons/fa";

type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD";

const CURRENCY_MAP: Record<Currency, { symbol: string; rate: number; label: string }> = {
    USD: { symbol: "$", rate: 1.0, label: "USD ($)" },
    GBP: { symbol: "£", rate: 0.79, label: "GBP (£)" },
    EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
    CAD: { symbol: "CA$", rate: 1.36, label: "CAD ($)" },
    AUD: { symbol: "AU$", rate: 1.52, label: "AUD ($)" },
};

const GROWTH_TIERS = [
    { id: "declining", name: "Declining (-10% or more YoY)", factor: 0.75, desc: "Audience retention or views waning" },
    { id: "flat", name: "Stable / Flat (0–5% YoY)", factor: 1.0, desc: "Consistent predictable cash flow" },
    { id: "moderate", name: "Steady Growth (10–25% YoY)", factor: 1.25, desc: "Healthy positive channel momentum" },
    { id: "hyper", name: "Hyper-Growth (50%+ YoY)", factor: 1.5, desc: "Surging organic algorithm distribution" },
];

const CHANNEL_MODELS = [
    { id: "faceless", name: "Faceless / Media Brand (Highest)", factor: 1.2, desc: "Video essays, tutorials, animation, software (turnkey operational transfer)" },
    { id: "hybrid", name: "Hybrid / Multi-Host / Podcast", factor: 1.0, desc: "Team-operated, guests, or rotating presenters" },
    { id: "personal", name: "Solo Personal Creator / Vlogger", factor: 0.8, desc: "Key-man risk discount (audience loyal primarily to your personal face)" },
];

export default function ChannelValuationCalculator() {
    const [adsense, setAdsense] = useState<string>("2500");
    const [sponsorships, setSponsorships] = useState<string>("1800");
    const [affiliates, setAffiliates] = useState<string>("700");
    const [growth, setGrowth] = useState<string>("moderate");
    const [model, setModel] = useState<string>("faceless");
    const [currency, setCurrency] = useState<Currency>("USD");

    const activeCurrency = CURRENCY_MAP[currency];
    const activeGrowth = GROWTH_TIERS.find(g => g.id === growth) || GROWTH_TIERS[2];
    const activeModel = CHANNEL_MODELS.find(m => m.id === model) || CHANNEL_MODELS[0];

    const calculations = useMemo(() => {
        const adsVal = parseCalculatorInput(adsense);
        const sponsorsVal = parseCalculatorInput(sponsorships);
        const affiliateVal = parseCalculatorInput(affiliates);

        const totalMonthlyNet = adsVal + sponsorsVal + affiliateVal;
        if (!Number.isFinite(totalMonthlyNet) || totalMonthlyNet <= 0) return null;

        const annualRunRate = totalMonthlyNet * 12;

        // Revenue diversification check
        const adsenseRatio = adsVal / totalMonthlyNet;
        let diversificationFactor = 1.0;
        if (adsenseRatio > 0.85) {
            diversificationFactor = 0.92; // Heavy platform single-point-of-failure risk
        } else if (sponsorsVal > 0 && affiliateVal > 0) {
            diversificationFactor = 1.12; // Healthy 3-legged stool
        }

        // Industry standard baseline multiple: 28x monthly earnings (~2.33x annual)
        const baseMultiple = 28.0;
        let effectiveMultiple = baseMultiple * activeGrowth.factor * activeModel.factor * diversificationFactor;
        
        // Bounded within realistic digital asset ranges (16x to 45x monthly)
        if (effectiveMultiple < 16) effectiveMultiple = 16;
        if (effectiveMultiple > 45) effectiveMultiple = 45;

        const fairMarketValue = totalMonthlyNet * effectiveMultiple;
        const conservativeValue = fairMarketValue * 0.78; // Quick cash offer / auction floor
        const strategicValue = fairMarketValue * 1.32; // Strategic buyer / media portfolio syndicate

        // Inputs and outputs are in the selected currency; no conversion is needed.
        const rate = 1;

        return {
            totalMonthlyNet: Math.round(totalMonthlyNet * rate),
            annualRunRate: Math.round(annualRunRate * rate),
            fairMarketValue: Math.round(fairMarketValue * rate),
            conservativeValue: Math.round(conservativeValue * rate),
            strategicValue: Math.round(strategicValue * rate),
            monthlyMultiple: effectiveMultiple.toFixed(1),
            annualMultiple: (effectiveMultiple / 12).toFixed(2),
            adsensePct: Math.round((adsVal / totalMonthlyNet) * 100),
            sponsorPct: Math.round((sponsorsVal / totalMonthlyNet) * 100),
            affiliatePct: Math.round((affiliateVal / totalMonthlyNet) * 100),
        };
    }, [adsense, sponsorships, affiliates, activeGrowth, activeModel]);

    return (
        <ToolPageLayout
            title="YouTube Channel Valuation Calculator"
            slug="youtube-channel-valuation-calculator"
            description="Estimate the market value, acquisition price, and net worth of any YouTube channel based on monthly net profit and creator multiples."
        >
            <div className="space-y-8">
                {!calculations && <p role="status" className="text-sm text-amber-700 dark:text-amber-300">Enter valid non-negative numbers up to 1 trillion, with a positive total. Use a decimal point and optional thousands commas.</p>}
                {/* Currency Selector Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                        <FaExchangeAlt className="text-emerald-600" />
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Valuation Currency:</span>
                        <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900">
                            {(Object.keys(CURRENCY_MAP) as Currency[]).map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setCurrency(c)}
                                    className={`px-3 py-1.5 text-xs font-bold transition-all ${
                                        currency === c
                                            ? "bg-emerald-600 text-white"
                                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="text-xs text-slate-500">
                        Illustrative model: 28× monthly profit, adjusted by growth, model and income mix. Not a broker appraisal.
                    </div>
                </div>

                <p className="text-sm text-slate-500">Enter monthly profit after allocating operating costs across each income stream. All amounts use the selected currency; changing currency relabels amounts without converting them. This model supports profitable channels only.</p>
                {/* Financial Inputs */}
                <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                        <FaCoins className="text-emerald-600" />
                        1. Monthly Net Cash Flow Breakdown
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Input
                            label={`Monthly AdSense Net (${activeCurrency.symbol})`}
                            type="text"
                            inputMode="decimal"
                            placeholder="2500"
                            value={adsense}
                            onChange={(e) => setAdsense(e.target.value)}
                        />
                        <Input
                            label={`Monthly Sponsorship Net (${activeCurrency.symbol})`}
                            type="text"
                            inputMode="decimal"
                            placeholder="1800"
                            value={sponsorships}
                            onChange={(e) => setSponsorships(e.target.value)}
                        />
                        <Input
                            label={`Monthly Affiliates/Merch Net (${activeCurrency.symbol})`}
                            type="text"
                            inputMode="decimal"
                            placeholder="700"
                            value={affiliates}
                            onChange={(e) => setAffiliates(e.target.value)}
                        />
                    </div>
                </div>

                {/* Qualitative Drivers: Growth & Model */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">
                            Year-Over-Year Channel Trajectory
                        </label>
                        <select
                            value={growth}
                            onChange={(e) => setGrowth(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            {GROWTH_TIERS.map((g) => (
                                <option key={g.id} value={g.id}>
                                    {g.name}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-slate-500 mt-1.5">{activeGrowth.desc}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">
                            Channel Model & Operational Transferability
                        </label>
                        <select
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            {CHANNEL_MODELS.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.name}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-slate-500 mt-1.5">{activeModel.desc}</p>
                    </div>
                </div>

                {/* Results Section */}
                {calculations && (
                    <div className="space-y-8 pt-4 border-t border-slate-200 dark:border-slate-700 animate-fade-in">
                        <div className="text-center">
                            <span className="inline-block text-xs font-black tracking-widest text-emerald-600 uppercase bg-emerald-100 dark:bg-emerald-900/40 px-3 py-1 rounded-full mb-2">
                                2026 Asset Valuation Estimate
                            </span>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white font-outfit">
                                Estimated Channel Enterprise Value
                            </h3>
                        </div>

                        {/* Valuation Tiers Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Conservative */}
                            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                                    Liquidation / Quick Sale
                                </div>
                                <div className="text-3xl font-black text-slate-700 dark:text-slate-200 font-outfit">
                                    {activeCurrency.symbol}{calculations.conservativeValue.toLocaleString()}
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    Immediate cash buyout from private equity aggregators.
                                </p>
                            </div>

                            {/* Fair Market */}
                            <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/40 dark:to-slate-900 border-2 border-emerald-500 shadow-xl text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-bl-lg">
                                    Fair Market Value
                                </div>
                                <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                                    Estimated Broker Price
                                </div>
                                <div className="text-4xl font-black text-emerald-700 dark:text-emerald-300 font-outfit">
                                    {activeCurrency.symbol}{calculations.fairMarketValue.toLocaleString()}
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-medium">
                                    Standard list price on digital asset marketplaces (e.g. Empire Flippers).
                                </p>
                            </div>

                            {/* Strategic */}
                            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                                <div className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">
                                    Strategic Buyer / M&A
                                </div>
                                <div className="text-3xl font-black text-purple-600 dark:text-purple-400 font-outfit">
                                    {activeCurrency.symbol}{calculations.strategicValue.toLocaleString()}
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    Media companies cross-selling products to your specific audience.
                                </p>
                            </div>
                        </div>

                        {/* Revenue Diversification Bar & Metrics */}
                        <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-semibold">
                                <span className="text-slate-700 dark:text-slate-200">
                                    Monthly Net Cash Flow: <strong>{activeCurrency.symbol}{calculations.totalMonthlyNet.toLocaleString()}</strong> ({activeCurrency.symbol}{calculations.annualRunRate.toLocaleString()}/yr)
                                </span>
                                <span className="text-emerald-600 dark:text-emerald-400">
                                    Valuation Multiple: <strong>{calculations.monthlyMultiple}x Monthly</strong> ({calculations.annualMultiple}x Annual SDE)
                                </span>
                            </div>

                            {/* Ratio Bar */}
                            <div className="space-y-1.5">
                                <div className="text-xs font-semibold text-slate-500 flex justify-between">
                                    <span>Revenue Stream Mix</span>
                                    <span>{calculations.adsensePct}% AdSense · {calculations.sponsorPct}% Sponsors · {calculations.affiliatePct}% Affiliates</span>
                                </div>
                                <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
                                    <div style={{ width: `${calculations.adsensePct}%` }} className="bg-red-500 h-full" title="AdSense" />
                                    <div style={{ width: `${calculations.sponsorPct}%` }} className="bg-purple-600 h-full" title="Sponsorships" />
                                    <div style={{ width: `${calculations.affiliatePct}%` }} className="bg-emerald-500 h-full" title="Affiliates" />
                                </div>
                            </div>
                        </div>

                        {/* Value Drivers Checklist */}
                        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                                <FaLightbulb className="text-amber-500" />
                                How to Increase Your Channel’s Selling Multiple
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
                                <div className="flex items-start gap-2">
                                    <FaCheckCircle className="text-emerald-500 shrink-0 mt-0.5" />
                                    <span><strong>Evergreen Backlog:</strong> Videos continuing to generate views 12+ months post-upload demand the highest multiples.</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <FaCheckCircle className="text-emerald-500 shrink-0 mt-0.5" />
                                    <span><strong>Build an Email List:</strong> Direct audience access outside YouTube can reduce platform dependence.</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <FaCheckCircle className="text-emerald-500 shrink-0 mt-0.5" />
                                    <span><strong>SOP Documentation:</strong> Standard operating procedures for scripting, editing, and thumbnail design prove turnkey operations.</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <FaCheckCircle className="text-emerald-500 shrink-0 mt-0.5" />
                                    <span><strong>Clean Brand Standing:</strong> Zero active copyright strikes and verified Google Brand Account ownership.</span>
                                </div>
                            </div>
                        </div>

                        {/* High-Value In-Tool Ad Placement */}
                        <div className="pt-4 text-center">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Advertisement</p>
                            <GoogleAd slot="8649718301" responsive className="w-full text-center" />
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
