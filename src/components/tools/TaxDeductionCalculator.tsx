"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import GoogleAd from "@/components/ads/GoogleAd";
import { 
    FaFileInvoiceDollar, 
    FaCheckCircle, FaExclamationTriangle, FaExchangeAlt, FaRegLightbulb 
} from "react-icons/fa";

type TaxRegion = "US" | "UK" | "CA" | "AU";

interface RegionConfig {
    name: string;
    currency: string;
    symbol: string;
    taxAgency: string;
    avgMarginalRate: number; // Combined self-employment + federal/state/provincial effective rate
    formName: string;
}

const REGION_CONFIGS: Record<TaxRegion, RegionConfig> = {
    US: {
        name: "United States (IRS)",
        currency: "USD",
        symbol: "$",
        taxAgency: "IRS Schedule C & 1099-NEC",
        avgMarginalRate: 0.30, // 15.3% SE tax + ~15% income tax
        formName: "Schedule C (Form 1040)",
    },
    UK: {
        name: "United Kingdom (HMRC)",
        currency: "GBP",
        symbol: "£",
        taxAgency: "HMRC Self-Assessment",
        avgMarginalRate: 0.29, // Class 4 NICs + Basic Rate
        formName: "Self-Assessment SA100",
    },
    CA: {
        name: "Canada (CRA)",
        currency: "CAD",
        symbol: "CA$",
        taxAgency: "CRA Form T2125",
        avgMarginalRate: 0.31, // CPP + Federal/Provincial
        formName: "T2125 Statement of Business Activities",
    },
    AU: {
        name: "Australia (ATO)",
        currency: "AUD",
        symbol: "AU$",
        taxAgency: "ATO Individual Tax Return",
        avgMarginalRate: 0.32, // Medicare levy + marginal bracket
        formName: "Business & Professional Items Schedule",
    },
};

export default function TaxDeductionCalculator() {
    const [region, setRegion] = useState<TaxRegion>("US");
    const [grossIncome, setGrossIncome] = useState<string>("45000");

    // Expense Categories
    const [camerasGear, setCamerasGear] = useState<string>("3500");
    const [computersTech, setComputersTech] = useState<string>("2400");
    const [softwareSubs, setSoftwareSubs] = useState<string>("1200");
    const [contractors, setContractors] = useState<string>("4800");
    const [homeStudio, setHomeStudio] = useState<string>("3000");
    const [internetMobile, setInternetMobile] = useState<string>("1500");
    const [propsWardrobe, setPropsWardrobe] = useState<string>("800");
    const [travelTraining, setTravelTraining] = useState<string>("1200");

    const currentRegion = REGION_CONFIGS[region];

    const calculations = useMemo(() => {
        const gross = parseFloat(grossIncome.replace(/,/g, "")) || 0;
        if (gross <= 0) return null;

        const gearVal = parseFloat(camerasGear.replace(/,/g, "")) || 0;
        const techVal = parseFloat(computersTech.replace(/,/g, "")) || 0;
        const softVal = parseFloat(softwareSubs.replace(/,/g, "")) || 0;
        const contrVal = parseFloat(contractors.replace(/,/g, "")) || 0;
        const studioVal = parseFloat(homeStudio.replace(/,/g, "")) || 0;
        const netMobVal = parseFloat(internetMobile.replace(/,/g, "")) || 0;
        const propsVal = parseFloat(propsWardrobe.replace(/,/g, "")) || 0;
        const travelVal = parseFloat(travelTraining.replace(/,/g, "")) || 0;

        const totalDeductions = gearVal + techVal + softVal + contrVal + studioVal + netMobVal + propsVal + travelVal;
        const taxableNetIncome = Math.max(0, gross - totalDeductions);
        const estimatedTaxSavings = Math.round(totalDeductions * currentRegion.avgMarginalRate);
        const deductionRatio = Math.min(100, Math.round((totalDeductions / gross) * 100));

        return {
            gross,
            totalDeductions,
            taxableNetIncome,
            estimatedTaxSavings,
            deductionRatio,
            marginalRatePercent: Math.round(currentRegion.avgMarginalRate * 100),
        };
    }, [grossIncome, camerasGear, computersTech, softwareSubs, contractors, homeStudio, internetMobile, propsWardrobe, travelTraining, currentRegion]);

    return (
        <ToolPageLayout
            title="YouTube Creator Tax & Write-Off Calculator"
            slug="youtube-tax-deduction-calculator"
            description="Estimate legitimate business tax deductions, lower your taxable net profit, and calculate tax savings on your creator revenue."
        >
            <div className="space-y-8">
                {/* Region Selector */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                        <FaExchangeAlt className="text-emerald-600" />
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Tax Jurisdiction:</span>
                        <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900">
                            {(Object.keys(REGION_CONFIGS) as TaxRegion[]).map((r) => (
                                <button
                                    key={r}
                                    type="button"
                                    onClick={() => setRegion(r)}
                                    className={`px-3 py-1.5 text-xs font-bold transition-all ${
                                        region === r
                                            ? "bg-emerald-600 text-white"
                                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    }`}
                                >
                                    {r} ({REGION_CONFIGS[r].symbol})
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                        Standard filing: <strong>{currentRegion.formName}</strong>
                    </div>
                </div>

                {/* Gross Creator Income Input */}
                <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                    <div className="max-w-md">
                        <Input
                            label={`Gross Annual Creator Revenue (${currentRegion.symbol})`}
                            type="text"
                            placeholder="e.g. 45000"
                            value={grossIncome}
                            onChange={(e) => setGrossIncome(e.target.value)}
                        />
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                            Total revenue from AdSense, sponsorships, affiliate commissions, and merchandise before expenses.
                        </p>
                    </div>
                </div>

                {/* Itemized Creator Expenses Form */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <FaFileInvoiceDollar className="text-emerald-600" />
                        Eligible Creator Business Expenses (Annual Totals in {currentRegion.symbol})
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <Input
                                label="Cameras & Audio Gear"
                                type="text"
                                placeholder="0"
                                value={camerasGear}
                                onChange={(e) => setCamerasGear(e.target.value)}
                            />
                            <span className="text-[11px] text-slate-500">Mics, lights, tripods, lenses</span>
                        </div>

                        <div>
                            <Input
                                label="Computers & Storage"
                                type="text"
                                placeholder="0"
                                value={computersTech}
                                onChange={(e) => setComputersTech(e.target.value)}
                            />
                            <span className="text-[11px] text-slate-500">PC/Mac, SSDs, monitors</span>
                        </div>

                        <div>
                            <Input
                                label="Software & Subscriptions"
                                type="text"
                                placeholder="0"
                                value={softwareSubs}
                                onChange={(e) => setSoftwareSubs(e.target.value)}
                            />
                            <span className="text-[11px] text-slate-500">Adobe, Epidemic, VidIQ, Canva</span>
                        </div>

                        <div>
                            <Input
                                label="Contractors & Editors"
                                type="text"
                                placeholder="0"
                                value={contractors}
                                onChange={(e) => setContractors(e.target.value)}
                            />
                            <span className="text-[11px] text-slate-500">Thumbnail artists, freelance editors</span>
                        </div>

                        <div>
                            <Input
                                label="Home Studio / Rent"
                                type="text"
                                placeholder="0"
                                value={homeStudio}
                                onChange={(e) => setHomeStudio(e.target.value)}
                            />
                            <span className="text-[11px] text-slate-500">Dedicated filming space allocation</span>
                        </div>

                        <div>
                            <Input
                                label="Internet & Mobile (%)"
                                type="text"
                                placeholder="0"
                                value={internetMobile}
                                onChange={(e) => setInternetMobile(e.target.value)}
                            />
                            <span className="text-[11px] text-slate-500">Business share of WiFi & phone bill</span>
                        </div>

                        <div>
                            <Input
                                label="Props, Wardrobe & Sets"
                                type="text"
                                placeholder="0"
                                value={propsWardrobe}
                                onChange={(e) => setPropsWardrobe(e.target.value)}
                            />
                            <span className="text-[11px] text-slate-500">Items solely purchased for videos</span>
                        </div>

                        <div>
                            <Input
                                label="Conferences & Education"
                                type="text"
                                placeholder="0"
                                value={travelTraining}
                                onChange={(e) => setTravelTraining(e.target.value)}
                            />
                            <span className="text-[11px] text-slate-500">VidCon, travel to shoot, courses</span>
                        </div>
                    </div>
                </div>

                {/* Calculation Results Card */}
                {calculations && (
                    <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-700 animate-fade-in">
                        <div className="text-center">
                            <span className="inline-block text-xs font-black tracking-widest text-emerald-600 uppercase bg-emerald-100 dark:bg-emerald-900/40 px-3 py-1 rounded-full mb-2">
                                2026 Tax Deduction Summary
                            </span>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white font-outfit">
                                Estimated Tax Savings Breakdown
                            </h3>
                        </div>

                        {/* Top Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Total Write-Offs */}
                            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                                    Total Write-Offs Claimed
                                </div>
                                <div className="text-3xl font-black text-slate-800 dark:text-slate-100 font-outfit">
                                    {currentRegion.symbol}{calculations.totalDeductions.toLocaleString()}
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    {calculations.deductionRatio}% of gross revenue shielded from taxes.
                                </p>
                            </div>

                            {/* Estimated Tax Savings */}
                            <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/40 dark:to-slate-900 border-2 border-emerald-500 shadow-xl text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-bl-lg">
                                    Estimated Savings
                                </div>
                                <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                                    Cash Kept in Your Pocket
                                </div>
                                <div className="text-4xl font-black text-emerald-700 dark:text-emerald-300 font-outfit">
                                    {currentRegion.symbol}{calculations.estimatedTaxSavings.toLocaleString()}
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-medium">
                                    Based on estimated ~{calculations.marginalRatePercent}% combined self-employment bracket.
                                </p>
                            </div>

                            {/* Taxable Net Income */}
                            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                                <div className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">
                                    Adjusted Taxable Net
                                </div>
                                <div className="text-3xl font-black text-purple-600 dark:text-purple-400 font-outfit">
                                    {currentRegion.symbol}{calculations.taxableNetIncome.toLocaleString()}
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    Reportable net earnings on your {currentRegion.formName}.
                                </p>
                            </div>
                        </div>

                        {/* Practical Write-Off Rules & Pitfalls */}
                        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                                <FaRegLightbulb className="text-emerald-600" />
                                4 Golden Rules for Creator Tax Compliance
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
                                <div className="flex items-start gap-2">
                                    <FaCheckCircle className="text-emerald-500 shrink-0 mt-0.5" />
                                    <span><strong>Ordinary & Necessary Test:</strong> Every expense must directly contribute to producing, editing, distributing, or managing your channel.</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <FaCheckCircle className="text-emerald-500 shrink-0 mt-0.5" />
                                    <span><strong>Home Studio Exclusivity:</strong> Your filming space must be used regularly and exclusively for video production (not shared as a guest bedroom).</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <FaCheckCircle className="text-emerald-500 shrink-0 mt-0.5" />
                                    <span><strong>Digital Receipt Retention:</strong> Keep electronic copies of credit card receipts and software invoices for at least 3 to 5 years.</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <FaCheckCircle className="text-emerald-500 shrink-0 mt-0.5" />
                                    <span><strong>Contractor Form 1099s:</strong> In the US, issue Form 1099-NEC to any US-based freelance editor or designer you pay $600 or more in a calendar year.</span>
                                </div>
                            </div>
                        </div>

                        {/* Legal Disclaimer Box */}
                        <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-3 text-xs text-amber-800 dark:text-amber-200">
                            <FaExclamationTriangle className="shrink-0 text-amber-500 mt-0.5 text-base" />
                            <div>
                                <strong>Important Disclaimer:</strong> This calculator is an educational planning estimator based on standard self-employment deduction rules in {currentRegion.name}. It does not constitute certified legal or tax advice. Tax regulations change frequently; always verify your specific business situation with a licensed CPA, Enrolled Agent, or chartered tax accountant.
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
