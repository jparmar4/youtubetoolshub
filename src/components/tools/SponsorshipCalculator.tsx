"use client";

import { useState, useMemo } from "react";
import { parseCalculatorInput } from "@/lib/calculator-input";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import GoogleAd from "@/components/ads/GoogleAd";
import { saveHistory } from "@/lib/history";
import { 
    FaCopy, FaCheck, FaShieldAlt, FaRocket, FaExchangeAlt 
} from "react-icons/fa";

type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD";

const CURRENCY_MAP: Record<Currency, { symbol: string; rate: number; label: string }> = {
    USD: { symbol: "$", rate: 1.0, label: "USD ($)" },
    GBP: { symbol: "£", rate: 0.79, label: "GBP (£)" },
    EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
    CAD: { symbol: "CA$", rate: 1.36, label: "CAD ($)" },
    AUD: { symbol: "AU$", rate: 1.52, label: "AUD ($)" },
};

const NICHES = [
    { id: "finance", name: "Finance, Crypto & Investing", multiplier: 2.2, desc: "Highest purchasing power & sponsor budgets" },
    { id: "tech", name: "Tech, Software & AI", multiplier: 1.8, desc: "SaaS tools, hardware & software trials" },
    { id: "business", name: "Business, Career & Marketing", multiplier: 1.7, desc: "B2B products, courses & services" },
    { id: "education", name: "Education & How-To", multiplier: 1.25, desc: "Skillshare, audiobooks & learning tools" },
    { id: "fitness", name: "Health, Fitness & Wellness", multiplier: 1.2, desc: "Supplements, athletic wear & meal kits" },
    { id: "lifestyle", name: "Lifestyle, Fashion & Travel", multiplier: 1.1, desc: "Consumer goods, travel & apparel" },
    { id: "gaming", name: "Gaming & Entertainment", multiplier: 0.85, desc: "High views, mobile games & peripheral sponsors" },
];

const PLACEMENTS = [
    { id: "integration_60s", name: "60-90s Mid-Roll Integration", multiplier: 1.0, desc: "Standard industry sponsorship mid-video" },
    { id: "mention_30s", name: "30s Preroll / Shoutout", multiplier: 0.55, desc: "Quick mention before or after video core" },
    { id: "dedicated", name: "Full Dedicated Video (8-15 min)", multiplier: 2.8, desc: "Entire video concept focused on sponsor" },
    { id: "shorts", name: "YouTube Shorts / 60s Vertical", multiplier: 0.35, desc: "Dedicated TikTok / YouTube Short format" },
];

export default function SponsorshipCalculator() {
    const [views, setViews] = useState<string>("25000");
    const [selectedNiche, setSelectedNiche] = useState<string>("tech");
    const [selectedPlacement, setSelectedPlacement] = useState<string>("integration_60s");
    const [currency, setCurrency] = useState<Currency>("USD");
    
    // Add-on switches
    const [usageRights, setUsageRights] = useState<boolean>(false);
    const [exclusivity, setExclusivity] = useState<boolean>(false);
    const [pinnedComment, setPinnedComment] = useState<boolean>(true);
    const [communityPost, setCommunityPost] = useState<boolean>(false);

    const [copyError, setCopyError] = useState("");
    const [copied, setCopied] = useState<boolean>(false);

    const activeCurrency = CURRENCY_MAP[currency];
    const activeNiche = NICHES.find(n => n.id === selectedNiche) || NICHES[1];
    const activePlacement = PLACEMENTS.find(p => p.id === selectedPlacement) || PLACEMENTS[0];

    // Calculation
    const calculations = useMemo(() => {
        const rawViews = parseCalculatorInput(views);
        if (!Number.isFinite(rawViews) || rawViews <= 0) return null;

        // Base Sponsor CPM for a 60s integration in Tier-1 US market: ~$28.00 per 1,000 views
        const baseCpmUsd = 28.0;
        const effectiveCpmUsd = baseCpmUsd * activeNiche.multiplier * activePlacement.multiplier;
        
        let baseFeeUsd = (rawViews / 1000) * effectiveCpmUsd;

        // Minimum floor fee check (even small creators take min $100 for video effort)
        const minFee = activePlacement.id === "dedicated" ? 450 : 120;
        if (baseFeeUsd < minFee) baseFeeUsd = minFee;

        // Add-ons
        let addonPercentage = 0;
        if (usageRights) addonPercentage += 0.35; // +35% for 30-day paid ad whitelisting
        if (exclusivity) addonPercentage += 0.25; // +25% for 30-day competitor exclusivity
        if (pinnedComment) addonPercentage += 0.10; // +10% for pinned link & top description
        if (communityPost) addonPercentage += 0.15; // +15% for community tab shoutout

        const targetUsd = baseFeeUsd * (1 + addonPercentage);
        const floorUsd = targetUsd * 0.78; // Floor: 78% of target
        const premiumUsd = targetUsd * 1.35; // Premium: 135% of target (rush fee / agencies)

        // Convert to selected currency
        const rate = activeCurrency.rate;
        return {
            views: rawViews,
            floorPrice: Math.round(floorUsd * rate),
            recommendedPrice: Math.round(targetUsd * rate),
            premiumPrice: Math.round(premiumUsd * rate),
            effectiveCpm: ((targetUsd * rate) / (rawViews / 1000)).toFixed(2),
            baseFee: Math.round(baseFeeUsd * rate),
            addonValue: Math.round((targetUsd - baseFeeUsd) * rate),
        };
    }, [views, activeNiche, activePlacement, usageRights, exclusivity, pinnedComment, communityPost, activeCurrency]);

    const pitch = calculations ? `Hi [Brand / Agency Contact],

Thanks for reaching out! I would love to collaborate with [Brand Name] on an upcoming YouTube video.

Here is an overview of my standard sponsorship package:

• Deliverable: ${activePlacement.name}
• Estimated Views: ${calculations.views.toLocaleString()} median views
• Audience Niche: ${activeNiche.name}
• Package Rate: ${activeCurrency.symbol}${calculations.recommendedPrice.toLocaleString()} ${currency}
• Includes: Dedicated call-to-action${pinnedComment ? ", pinned comment and top description link" : ""}${usageRights ? ", 30-day paid ad usage rights" : ""}${exclusivity ? ", 30-day category exclusivity" : ""}${communityPost ? ", community tab post" : ""}.

I've attached our media kit and recent demographic analytics. Let me know if you would like me to reserve a date in our upcoming production calendar.

Best regards,
[Your Channel Name / Media Kit Link]` : "";

    const handleCopyPitch = async () => {
        if (!calculations) return;

        setCopyError("");
        try {
            await navigator.clipboard.writeText(pitch);
        } catch {
            setCopied(false);
            setCopyError("Could not copy. Select and copy the pitch below manually.");
            return;
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);

        try {
            await saveHistory("youtube-sponsorship-calculator", {
                views: calculations.views,
                niche: activeNiche.name,
                placement: activePlacement.name,
                recommendedPrice: calculations.recommendedPrice,
                currency,
            });
        } catch {
            /* ignore */
        }
    };

    return (
        <ToolPageLayout
            title="YouTube Sponsorship Rate Calculator"
            slug="youtube-sponsorship-calculator"
            description="Explore illustrative quotes for sponsored integrations, shoutouts, and dedicated reviews."
        >
            <div className="space-y-8">
                {!calculations && <p role="status" className="text-sm text-amber-700 dark:text-amber-300">Enter valid non-negative numbers up to 1 trillion, with a positive total. Use a decimal point and optional thousands commas.</p>}
                <p className="text-sm text-slate-500">Planning model: $28 base CPM × niche and placement factors, plus selected add-ons. Minimum base fees are $120 ($450 for dedicated videos). Currency conversions use fixed illustrative rates, not live exchange rates. Actual negotiated rates vary.</p>
                {/* Header Controls: Currency & View Presets */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                        <FaExchangeAlt className="text-purple-600" />
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Currency:</span>
                        <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900">
                            {(Object.keys(CURRENCY_MAP) as Currency[]).map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setCurrency(c)}
                                    className={`px-3 py-1.5 text-xs font-bold transition-all ${
                                        currency === c
                                            ? "bg-purple-600 text-white"
                                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>Quick Presets:</span>
                        {["10000", "25000", "50000", "100000"].map((preset) => (
                            <button
                                key={preset}
                                type="button"
                                onClick={() => setViews(preset)}
                                className="px-2.5 py-1 bg-white dark:bg-slate-700 hover:border-purple-400 border border-slate-200 dark:border-slate-600 rounded-md font-medium transition-colors"
                            >
                                {(parseInt(preset) / 1000)}k
                            </button>
                        ))}
                    </div>
                </div>

                {/* Primary Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Input
                            label="Average Views per Video (Median of last 10)"
                            type="text"
                            inputMode="decimal"
                            placeholder="e.g. 25000"
                            value={views}
                            onChange={(e) => setViews(e.target.value)}
                        />
                        <p className="text-xs text-slate-500 mt-1.5">
                            Use your median view count, excluding 1-2 abnormal viral outliers.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                            Content Niche (Affects Sponsor CPM)
                        </label>
                        <select
                            value={selectedNiche}
                            onChange={(e) => setSelectedNiche(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            {NICHES.map((n) => (
                                <option key={n.id} value={n.id}>
                                    {n.name} (CPM ×{n.multiplier})
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-slate-500 mt-1.5">{activeNiche.desc}</p>
                    </div>
                </div>

                {/* Sponsorship Placement Options */}
                <div>
                    <label className="block text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">
                        Sponsorship Placement Format
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {PLACEMENTS.map((p) => (
                            <button
                                type="button"
                                aria-pressed={selectedPlacement === p.id}
                                key={p.id}
                                onClick={() => setSelectedPlacement(p.id)}
                                className={`cursor-pointer p-4 rounded-xl border transition-all text-left ${
                                    selectedPlacement === p.id
                                        ? "border-purple-600 bg-purple-50/60 dark:bg-purple-950/30 shadow-sm ring-1 ring-purple-500"
                                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-purple-300"
                                }`}
                            >
                                <div className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                                    {p.name}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                    {p.desc}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Add-Ons & Commercial Deliverables */}
                <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                        <FaShieldAlt className="text-purple-600" />
                        Commercial Add-Ons & Usage Rights (High Value)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <label className="flex items-start gap-3 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={usageRights}
                                onChange={(e) => setUsageRights(e.target.checked)}
                                className="mt-1 rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                            />
                            <div>
                                <span className="font-semibold text-slate-800 dark:text-slate-200">
                                    Paid Ad Usage Rights (+35%)
                                </span>
                                <p className="text-xs text-slate-500">
                                    Brand can run your video clip as a paid TikTok or Meta Ad (Whitelisting).
                                </p>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={exclusivity}
                                onChange={(e) => setExclusivity(e.target.checked)}
                                className="mt-1 rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                            />
                            <div>
                                <span className="font-semibold text-slate-800 dark:text-slate-200">
                                    30-Day Competitor Exclusivity (+25%)
                                </span>
                                <p className="text-xs text-slate-500">
                                    Agreement not to promote direct competitors in the same vertical for 30 days.
                                </p>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={pinnedComment}
                                onChange={(e) => setPinnedComment(e.target.checked)}
                                className="mt-1 rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                            />
                            <div>
                                <span className="font-semibold text-slate-800 dark:text-slate-200">
                                    Pinned Comment & Top Link (+10%)
                                </span>
                                <p className="text-xs text-slate-500">
                                    Adds a visible sponsor link for viewers to find.
                                </p>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={communityPost}
                                onChange={(e) => setCommunityPost(e.target.checked)}
                                className="mt-1 rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                            />
                            <div>
                                <span className="font-semibold text-slate-800 dark:text-slate-200">
                                    Community Tab Post (+15%)
                                </span>
                                <p className="text-xs text-slate-500">
                                    Secondary impression boost for the sponsor’s special discount code.
                                </p>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Results Card */}
                {calculations && (
                    <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-700 animate-fade-in">
                        <div className="text-center">
                            <span className="inline-block text-xs font-black tracking-widest text-purple-600 uppercase bg-purple-100 dark:bg-purple-900/40 px-3 py-1 rounded-full mb-2">
                                2026 Recommended Quote Tiers
                            </span>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white font-outfit">
                                Estimated Brand Deal Quote
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Floor Price */}
                            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                                    Floor Minimum
                                </div>
                                <div className="text-3xl font-black text-slate-700 dark:text-slate-200 font-outfit">
                                    {activeCurrency.symbol}{calculations.floorPrice.toLocaleString()}
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    Never accept below this. Your absolute walk-away price.
                                </p>
                            </div>

                            {/* Recommended Price */}
                            <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/40 dark:to-slate-900 border-2 border-purple-500 shadow-xl text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-bl-lg">
                                    Target Pitch
                                </div>
                                <div className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">
                                    Recommended Quote
                                </div>
                                <div className="text-4xl font-black text-purple-700 dark:text-purple-300 font-outfit">
                                    {activeCurrency.symbol}{calculations.recommendedPrice.toLocaleString()}
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-medium">
                                    Standard rate to send in your initial pitch / media kit response.
                                </p>
                            </div>

                            {/* Premium Agency Price */}
                            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                                <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
                                    Agency / Premium
                                </div>
                                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-outfit">
                                    {activeCurrency.symbol}{calculations.premiumPrice.toLocaleString()}
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    For funded enterprise brands, PR agencies, or rush deadlines.
                                </p>
                            </div>
                        </div>

                        {/* Breakdown Metrics */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center text-xs">
                            <div>
                                <span className="text-slate-500 block">Baseline Value</span>
                                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                                    {activeCurrency.symbol}{calculations.baseFee.toLocaleString()}
                                </span>
                            </div>
                            <div>
                                <span className="text-slate-500 block">Add-Ons Added</span>
                                <span className="font-bold text-purple-600 dark:text-purple-400 text-sm">
                                    +{activeCurrency.symbol}{calculations.addonValue.toLocaleString()}
                                </span>
                            </div>
                            <div>
                                <span className="text-slate-500 block">Effective CPM</span>
                                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                                    {activeCurrency.symbol}{calculations.effectiveCpm}
                                </span>
                            </div>
                            <div>
                                <span className="text-slate-500 block">View Assumption</span>
                                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                                    30-Day Median
                                </span>
                            </div>
                        </div>

                        {/* One-Click Copyable Pitch Template */}
                        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <FaRocket className="text-purple-400" />
                                    <h4 className="font-bold text-sm text-purple-200">
                                        Ready-to-Send Sponsor Pitch Email
                                    </h4>
                                </div>
                                <Button
                                    onClick={handleCopyPitch}
                                    size="sm"
                                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all"
                                >
                                    {copied ? <FaCheck className="text-emerald-300" /> : <FaCopy />}
                                    {copied ? "Copied to Clipboard!" : "Copy Pitch Template"}
                                </Button>
                            </div>
                            {copyError && <p role="alert" className="mb-3 text-sm text-amber-300">{copyError}</p>}
                            <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed bg-slate-950/70 p-4 rounded-xl border border-slate-800 overflow-x-auto">
{pitch}
                            </pre>
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
