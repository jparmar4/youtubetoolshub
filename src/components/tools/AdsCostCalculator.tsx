"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import GoogleAd from "@/components/ads/GoogleAd";
import {
  FaBullhorn,
  FaGlobe,
  FaEye,
  FaLightbulb,
  FaSlidersH,
  FaMagic,
  FaCheck,
  FaCopy } from "react-icons/fa";

interface CountryTier {
  id: string;
  name: string;
  cpvMultiplier: number;
  cpmMultiplier: number;
}

const REGION_TIERS: CountryTier[] = [
  { id: "tier1-us", name: "United States (Top Tier)", cpvMultiplier: 1.0, cpmMultiplier: 1.0 },
  { id: "tier1-uk-ca-au", name: "UK, Canada & Australia", cpvMultiplier: 0.85, cpmMultiplier: 0.85 },
  { id: "tier1-eu", name: "Western Europe (Germany, France, Nordics)", cpvMultiplier: 0.75, cpmMultiplier: 0.75 },
  { id: "tier2", name: "Global Tier 2 (Brazil, Mexico, Poland, UAE)", cpvMultiplier: 0.40, cpmMultiplier: 0.40 },
  { id: "tier3", name: "Global Tier 3 / Emerging (India, SE Asia)", cpvMultiplier: 0.18, cpmMultiplier: 0.18 },
];

interface AdFormat {
  id: string;
  name: string;
  baseCpv: number;
  baseCpm: number;
  typicalCtr: number;
  viewRate: number;
  description: string;
}

const AD_FORMATS: AdFormat[] = [
  {
    id: "skippable-instream",
    name: "Skippable In-Stream Video Ads",
    baseCpv: 0.035,
    baseCpm: 18.0,
    typicalCtr: 1.2,
    viewRate: 35,
    description: "Plays before or during videos. Viewers can skip after 5 seconds. Billed on CPV (when viewer watches 30s or clicks)." },
  {
    id: "non-skippable",
    name: "Non-Skippable In-Stream (15–20s)",
    baseCpv: 0.065,
    baseCpm: 26.0,
    typicalCtr: 0.8,
    viewRate: 98,
    description: "Viewers must watch entire ad. Billed on Target CPM. Highest brand awareness impact." },
  {
    id: "bumper",
    name: "Bumper Ads (6 Seconds)",
    baseCpv: 0.022,
    baseCpm: 12.5,
    typicalCtr: 0.6,
    viewRate: 96,
    description: "Quick 6-second non-skippable mobile ads. Efficient frequency and reach builder." },
  {
    id: "shorts",
    name: "YouTube Shorts Video Ads",
    baseCpv: 0.025,
    baseCpm: 14.0,
    typicalCtr: 1.8,
    viewRate: 42,
    description: "Vertical video ads between Shorts in mobile feed. High click-through rate for app installs and DTC products." },
  {
    id: "in-feed",
    name: "In-Feed Video Ads (Search & Suggested)",
    baseCpv: 0.045,
    baseCpm: 16.5,
    typicalCtr: 2.4,
    viewRate: 100,
    description: "Appears in search results and related video rail. High intent; user clicks thumbnail to watch." },
];

interface NicheCost {
  id: string;
  name: string;
  multiplier: number;
  avgCpc: string;
}

const NICHES: NicheCost[] = [
  { id: "finance", name: "B2B SaaS, Finance & Investing", multiplier: 1.6, avgCpc: "$8.50 - $22.00" },
  { id: "tech", name: "Technology, AI & Software", multiplier: 1.35, avgCpc: "$5.00 - $14.00" },
  { id: "ecommerce", name: "E-Commerce & Consumer Brands", multiplier: 1.0, avgCpc: "$2.50 - $7.00" },
  { id: "education", name: "Online Courses & Education", multiplier: 0.9, avgCpc: "$2.00 - $6.50" },
  { id: "fitness", name: "Health, Fitness & Supplements", multiplier: 0.85, avgCpc: "$1.80 - $5.50" },
  { id: "gaming", name: "Gaming, Entertainment & Vlogs", multiplier: 0.65, avgCpc: "$0.80 - $3.20" },
];

export default function AdsCostCalculator() {
  const [calcMode, setCalcMode] = useState<"budget" | "views">("budget");
  const [budgetInput, setBudgetInput] = useState<string>("1000");
  const [viewsInput, setViewsInput] = useState<string>("35000");
  const [selectedRegion, setSelectedRegion] = useState<string>("tier1-us");
  const [selectedFormat, setSelectedFormat] = useState<string>("skippable-instream");
  const [selectedNiche, setSelectedNiche] = useState<string>("tech");
  const [copied, setCopied] = useState<boolean>(false);

  const applyPreset = (nicheId: string, formatId: string, regionId: string, budget: string) => {
    setSelectedNiche(nicheId);
    setSelectedFormat(formatId);
    setSelectedRegion(regionId);
    setCalcMode("budget");
    setBudgetInput(budget);
  };

  const handleCopyPlan = async () => {
    const nicheName = NICHES.find((n) => n.id === selectedNiche)?.name || selectedNiche;
    const formatName = AD_FORMATS.find((f) => f.id === selectedFormat)?.name || selectedFormat;
    const regionName = REGION_TIERS.find((r) => r.id === selectedRegion)?.name || selectedRegion;

    const report = `📊 YouTube Ads Campaign Forecast (YouTube Tools Hub)
-------------------------------------------------------
• Niche Target: ${nicheName}
• Ad Format: ${formatName}
• Target Region: ${regionName}
• Planned Budget: $${results.totalBudget.toLocaleString()}
• Projected Views: ${results.expectedViews.toLocaleString()} views
• Average CPV: $${results.effectiveCpv}
• Target CPM: $${results.effectiveCpm}
• Total Impressions: ${results.estimatedImpressions.toLocaleString()} (${results.viewRate}% View Rate)
• Expected Clicks: ~${results.estimatedClicks.toLocaleString()} (${results.ctr}% CTR)

Generated with: https://www.youtubetoolshub.com/tools/youtube-ads-cost-calculator`;

    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* ignore */
    }
  };

  const results = useMemo(() => {
    const region = REGION_TIERS.find((r) => r.id === selectedRegion) || REGION_TIERS[0];
    const format = AD_FORMATS.find((f) => f.id === selectedFormat) || AD_FORMATS[0];
    const niche = NICHES.find((n) => n.id === selectedNiche) || NICHES[1];

    const effectiveCpv = format.baseCpv * region.cpvMultiplier * niche.multiplier;
    const effectiveCpm = format.baseCpm * region.cpmMultiplier * niche.multiplier;

    let totalBudget = 0;
    let expectedViews = 0;

    if (calcMode === "budget") {
      totalBudget = Math.max(10, parseFloat(budgetInput) || 0);
      expectedViews = Math.round(totalBudget / effectiveCpv);
    } else {
      expectedViews = Math.max(100, parseFloat(viewsInput) || 0);
      totalBudget = Math.round(expectedViews * effectiveCpv);
    }

    // Impressions needed based on view rate
    const viewRateFraction = format.viewRate / 100;
    const estimatedImpressions = Math.round(expectedViews / viewRateFraction);
    const estimatedClicks = Math.round(estimatedImpressions * (format.typicalCtr / 100));

    return {
      totalBudget,
      expectedViews,
      estimatedImpressions,
      estimatedClicks,
      effectiveCpv: effectiveCpv.toFixed(3),
      effectiveCpm: effectiveCpm.toFixed(2),
      viewRate: format.viewRate,
      ctr: format.typicalCtr,
      nicheAvgCpc: niche.avgCpc };
  }, [calcMode, budgetInput, viewsInput, selectedRegion, selectedFormat, selectedNiche]);

  return (
    <ToolPageLayout
      title="YouTube Video Ads Cost Calculator (CPV & CPM 2026)"
      slug="youtube-ads-cost-calculator"
      description="Estimate your YouTube advertising costs, Cost Per View (CPV), CPM, and total view reach across formats and countries."
    >
      <div className="space-y-8">
        {/* Header Alert */}
        <div className="rounded-2xl border border-indigo-200/80 bg-gradient-to-r from-indigo-50/80 via-white to-blue-50/60 p-5 sm:p-6 dark:border-indigo-900/40 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-900 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-black text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-400">
                <FaBullhorn /> 2026 Google Ads for YouTube Benchmark
              </span>
              <h2 className="mt-2 text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                YouTube Ads Budget & CPV/CPM Calculator
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Calculate expected views, required spend, and impressions based on current auction bids across US, European, and global audiences.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 rounded-lg">
                Updated for 2026
              </span>
            </div>
          </div>
        </div>

        {/* Calculator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
            {/* Quick Industry Presets */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span className="inline-flex items-center gap-1.5"><FaMagic className="text-indigo-500" /> 1-Click Industry Presets</span>
                </label>
                <span className="text-[11px] text-slate-400">Click to autofill 2026 benchmarks</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "💰 Finance & SaaS", niche: "finance", format: "skippable-instream", region: "tier1-us", budget: "1500" },
                  { label: "💻 Tech & AI", niche: "tech", format: "skippable-instream", region: "tier1-us", budget: "1000" },
                  { label: "🛍️ E-Commerce", niche: "ecommerce", format: "shorts", region: "tier1-us", budget: "500" },
                  { label: "🎓 Courses", niche: "education", format: "skippable-instream", region: "tier1-us", budget: "750" },
                  { label: "🎮 Gaming & App", niche: "gaming", format: "bumper", region: "tier1-us", budget: "300" },
                  { label: "🥗 Fitness & Wellness", niche: "fitness", format: "shorts", region: "tier1-us", budget: "400" },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => applyPreset(preset.niche, preset.format, preset.region, preset.budget)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      selectedNiche === preset.niche && budgetInput === preset.budget
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode Switcher */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Calculation Goal
              </label>
              <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl">
                <button
                  type="button"
                  onClick={() => setCalcMode("budget")}
                  className={`py-2 px-4 rounded-lg font-bold text-sm transition-all ${
                    calcMode === "budget"
                      ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  Calculate Views from Budget
                </button>
                <button
                  type="button"
                  onClick={() => setCalcMode("views")}
                  className={`py-2 px-4 rounded-lg font-bold text-sm transition-all ${
                    calcMode === "views"
                      ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  Calculate Budget for Target Views
                </button>
              </div>
            </div>

            {/* Main Value Input */}
            <div>
              {calcMode === "budget" ? (
                <div>
                  <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Total Ad Budget (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                    <Input
                      type="number"
                      min="10"
                      step="50"
                      value={budgetInput}
                      onChange={(e) => setBudgetInput(e.target.value)}
                      className="pl-8 text-lg font-bold"
                      placeholder="1000"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Recommended test budget: $250 - $1,500.</p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Target Video Views
                  </label>
                  <Input
                    type="number"
                    min="100"
                    step="5000"
                    value={viewsInput}
                    onChange={(e) => setViewsInput(e.target.value)}
                    className="text-lg font-bold"
                    placeholder="35000"
                  />
                  <p className="text-xs text-slate-500 mt-1">Number of paid 30-second video views desired.</p>
                </div>
              )}
            </div>

            {/* Target Region Dropdown */}
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                Target Audience Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {REGION_TIERS.map((tier) => (
                  <option key={tier.id} value={tier.id}>
                    {tier.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Ad Format Dropdown */}
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                YouTube Ad Format
              </label>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {AD_FORMATS.map((format) => (
                  <option key={format.id} value={format.id}>
                    {format.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                {AD_FORMATS.find((f) => f.id === selectedFormat)?.description}
              </p>
            </div>

            {/* Industry / Niche Dropdown */}
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                Channel / Campaign Niche
              </label>
              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {NICHES.map((niche) => (
                  <option key={niche.id} value={niche.id}>
                    {niche.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Display Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-lg space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                Campaign Projection
              </span>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-3.5 backdrop-blur-sm">
                  <p className="text-xs text-slate-300 font-medium">Projected Views</p>
                  <p className="text-2xl font-black text-indigo-300 mt-1">
                    {results.expectedViews.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-3.5 backdrop-blur-sm">
                  <p className="text-xs text-slate-300 font-medium">Estimated Budget</p>
                  <p className="text-2xl font-black text-emerald-400 mt-1">
                    ${results.totalBudget.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="mt-5 space-y-3 divide-y divide-white/10 text-sm">
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">Average Cost Per View (CPV):</span>
                  <span className="font-bold text-white">${results.effectiveCpv}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">Effective CPM (Impressions):</span>
                  <span className="font-bold text-white">${results.effectiveCpm}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">Total Ad Impressions:</span>
                  <span className="font-bold text-indigo-200">
                    {results.estimatedImpressions.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">Expected Website Clicks (CTR):</span>
                  <span className="font-bold text-emerald-300">
                    ~{results.estimatedClicks.toLocaleString()} clicks
                  </span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">View Rate Benchmark:</span>
                  <span className="font-bold text-white">{results.viewRate}%</span>
                </div>
              </div>
            </div>

            {/* Copy Report Action */}
            <button
              type="button"
              onClick={handleCopyPlan}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md shadow-indigo-600/30"
            >
              {copied ? (
                <>
                  <FaCheck className="text-emerald-300" />
                  <span>Campaign Plan Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <FaCopy />
                  <span>Copy Campaign Forecast Report</span>
                </>
              )}
            </button>

            {/* Quick Strategy Note */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-slate-300">
              <span className="font-bold text-indigo-300 flex items-center gap-1.5 mb-1">
                <FaLightbulb /> Creator Ad Tip:
              </span>
              Set a Maximum CPV bid of 10% below your target rate in Google Ads. YouTube's second-price auction ensures you only pay the minimum needed to beat the next bidder.
            </div>
          </div>
        </div>

        {/* High-Value Educational Content for SEO & AEO */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            How YouTube Video Advertising Costs Are Calculated in 2026
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            YouTube ads operate on an automated real-time bidding auction through Google Ads. Unlike traditional TV advertising with fixed rate cards, your actual <strong>Cost Per View (CPV)</strong> and <strong>Cost Per Mille (CPM)</strong> vary based on audience demographics, niche competition, video ad format, and viewer engagement.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <FaGlobe className="text-indigo-500" /> Geographic Tiers
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Tier-1 US audiences command average CPVs of $0.03 to $0.06 due to high purchasing power. Emerging markets average $0.005 to $0.015.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <FaEye className="text-indigo-500" /> The 30-Second Rule
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                For skippable in-stream ads, you are only charged if the viewer watches at least 30 seconds (or the entire ad if shorter) or clicks an on-screen element.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <FaSlidersH className="text-indigo-500" /> Bidding Strategies
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Use <em>Maximum CPV</em> for organic view velocity and channel subscriber acquisition; use <em>Target CPM</em> for brand awareness campaigns.
              </p>
            </div>
          </div>
        </div>

        {/* Ad unit */}
        <GoogleAd slot="8649718301" responsive className="w-full text-center" />
      </div>
    </ToolPageLayout>
  );
}
