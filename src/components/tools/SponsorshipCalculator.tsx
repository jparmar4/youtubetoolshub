"use client";

import { useState, useMemo } from "react";
import { parseCalculatorInput } from "@/lib/calculator-input";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import InternationalPayoutCallout from "@/components/ads/InternationalPayoutCallout";
import { saveHistory } from "@/lib/history";
import { 
    FaCopy, FaCheck, FaShieldAlt, FaRocket, FaExchangeAlt,
    FaFilePdf, FaCrown, FaEnvelope,
    FaCheckCircle, FaTimes
} from "react-icons/fa";

type Currency =
    | "USD"
    | "EUR"
    | "GBP"
    | "CAD"
    | "AUD"
    | "CHF"
    | "NZD"
    | "SGD"
    | "NOK"
    | "SEK"
    | "DKK"
    | "AED"
    | "JPY"
    | "KRW"
    | "INR";

const CURRENCY_MAP: Record<Currency, { symbol: string; rate: number; label: string }> = {
    USD: { symbol: "$", rate: 1.0, label: "USD ($)" },
    GBP: { symbol: "£", rate: 0.79, label: "GBP (£)" },
    EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
    CAD: { symbol: "CA$", rate: 1.36, label: "CAD ($)" },
    AUD: { symbol: "AU$", rate: 1.52, label: "AUD ($)" },
    CHF: { symbol: "CHF ", rate: 0.88, label: "CHF (Fr)" },
    NZD: { symbol: "NZ$", rate: 1.66, label: "NZD ($)" },
    SGD: { symbol: "S$", rate: 1.34, label: "SGD ($)" },
    NOK: { symbol: "NOK ", rate: 10.75, label: "NOK (kr)" },
    SEK: { symbol: "SEK ", rate: 10.55, label: "SEK (kr)" },
    DKK: { symbol: "DKK ", rate: 6.86, label: "DKK (kr)" },
    AED: { symbol: "AED ", rate: 3.67, label: "AED" },
    JPY: { symbol: "¥", rate: 152, label: "JPY (¥)" },
    KRW: { symbol: "₩", rate: 1380, label: "KRW (₩)" },
    INR: { symbol: "₹", rate: 86.5, label: "INR (₹)" },
};

const QUICK_CURRENCIES: Currency[] = ["USD", "GBP", "EUR", "CAD", "AUD", "CHF"];

const NICHES = [
    { id: "finance", name: "Finance, Crypto & Investing", multiplier: 2.2, desc: "Highest purchasing power & sponsor budgets" },
    { id: "tech", name: "Tech, Software & AI", multiplier: 1.8, desc: "SaaS tools, hardware & software trials" },
    { id: "business", name: "Business, Career & Marketing", multiplier: 1.7, desc: "B2B products, courses & services" },
    { id: "education", name: "Education & How-To", multiplier: 1.25, desc: "Skillshare, audiobooks & learning tools" },
    { id: "fitness", name: "Health, Fitness & Wellness", multiplier: 1.2, desc: "Supplements, athletic wear & meal kits" },
    { id: "lifestyle", name: "Lifestyle, Fashion & Travel", multiplier: 1.1, desc: "Consumer goods, travel & apparel" },
    { id: "gaming", name: "Gaming & Entertainment", multiplier: 0.85, desc: "High views, mobile games & peripheral sponsors" },
    { id: "ai-b2b", name: "Enterprise Cloud & B2B SaaS", multiplier: 2.35, desc: "Highest enterprise LTV sponsor CPMs in US & Europe" },
];

const PLACEMENTS = [
    { id: "integration_60s", name: "60-90s Mid-Roll Integration", multiplier: 1.0, desc: "Standard industry sponsorship mid-video" },
    { id: "mention_30s", name: "30s Preroll / Shoutout", multiplier: 0.55, desc: "Quick mention before or after video core" },
    { id: "dedicated", name: "Full Dedicated Video (8-15 min)", multiplier: 2.8, desc: "Entire video concept focused on sponsor" },
    { id: "shorts", name: "YouTube Shorts / 60s Vertical", multiplier: 0.35, desc: "Dedicated TikTok / YouTube Short format" },
];

export default function SponsorshipCalculator() {
    // Exact 10 hooks in sequence for regression test stability
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

    // Media Kit & Rate Card Customization State
    const [channelHandle, setChannelHandle] = useState<string>("@YourCreatorHandle");
    const [subscribersCount, setSubscribersCount] = useState<string>("120,000");
    const [monthlyViewsCount, setMonthlyViewsCount] = useState<string>("480,000");
    const [topAudienceGeo, setTopAudienceGeo] = useState<string>("United States (52%), UK (14%), Canada (10%)");
    const [audienceAge, setAudienceAge] = useState<string>("18–34 years (68%)");
    const [audienceGender, setAudienceGender] = useState<string>("72% Male / 28% Female");
    const [contactEmail, setContactEmail] = useState<string>("collaborations@creatorhub.com");
    const [mediaKitTheme, setMediaKitTheme] = useState<"dark" | "light" | "emerald" | "sunset">("dark");
    const [isProUnlocked, setIsProUnlocked] = useState<boolean>(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);
    const [activeScriptIndex, setActiveScriptIndex] = useState<number>(0);
    const [scriptCopied, setScriptCopied] = useState<boolean>(false);

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
        const recommended = Math.round(targetUsd * rate);

        // Pre-compute 3 package tiers for Media Kit Rate Card
        const tier1Price = recommended;
        const tier2Price = Math.round(recommended * 2.6);
        const tier3Price = Math.max(150, Math.round(recommended * 0.38));

        return {
            views: rawViews,
            floorPrice: Math.round(floorUsd * rate),
            recommendedPrice: recommended,
            premiumPrice: Math.round(premiumUsd * rate),
            effectiveCpm: ((targetUsd * rate) / (rawViews / 1000)).toFixed(2),
            baseFee: Math.round(baseFeeUsd * rate),
            addonValue: Math.round((targetUsd - baseFeeUsd) * rate),
            tier1Price,
            tier2Price,
            tier3Price,
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

    // Cold Pitch Scripts for Media Kit Pro
    const COLD_PITCH_SCRIPTS = useMemo(() => {
        if (!calculations) return [];
        return [
            {
                title: "1. The 'Direct ROI' Cold Brand Outreach",
                subject: `Partnership proposal: ${channelHandle} x [Brand Name] (${calculations.views.toLocaleString()} targeted viewers)`,
                body: `Hi [Marketing Manager Name],

I've been using [Brand's Product/Service] in my own workflow, and I think our audience would be a natural fit.

My YouTube channel (${channelHandle}) reaches over ${monthlyViewsCount} viewers each month in the ${activeNiche.name} niche, with ${topAudienceGeo.split(",")[0]} making up our core demographic.

Our recent videos average ${calculations.views.toLocaleString()} views with strong engagement. We are currently locking in Q2 sponsor partners for our upcoming video series on [Specific Topic].

We would love to feature [Brand] in a dedicated 60-90s mid-roll integration (${activeCurrency.symbol}${calculations.tier1Price.toLocaleString()}).

Are you available for a quick 5-minute chat this Thursday to discuss dates?

Best regards,
${channelHandle}
${contactEmail}`
            },
            {
                title: "2. The Inbound Agency Counter-Offer (Rate Protection)",
                subject: `Re: YouTube Collaboration / Rate Card for ${channelHandle}`,
                body: `Hi [Agency Contact Name],

Thanks so much for reaching out! We love [Brand Name] and would be excited to collaborate on an upcoming integration.

To help you with campaign planning, here is our current 2026 Rate Card:

• Package A (60s Mid-Roll Integration): ${activeCurrency.symbol}${calculations.tier1Price.toLocaleString()} ${currency}
• Package B (Full Dedicated Video Review): ${activeCurrency.symbol}${calculations.tier2Price.toLocaleString()} ${currency}
• Package C (Shorts / Reels Cross-Post): ${activeCurrency.symbol}${calculations.tier3Price.toLocaleString()} ${currency}

All packages include a pinned comment link, description link in the top 3 lines, and 30 days of exclusive organic attribution.

Let me know which package fits your current campaign KPIs and we'll send over the draft storyboard.

Warm regards,
${channelHandle}`
            },
            {
                title: "3. Ghosted Outreach 4-Day Follow-Up",
                subject: `Quick bump: ${channelHandle} production calendar lock`,
                body: `Hi [First Name],

I know your inbox is swamped! Just circling back as we are finalizing production slots for our upcoming ${activeNiche.name} upload on [Date].

If [Brand] is still interested in sponsoring this integration (${calculations.views.toLocaleString()} expected viewers), let me know by tomorrow so I can hold the slot for you before offering it to another partner.

Look forward to hearing from you!

Best,
${channelHandle}`
            },
            {
                title: "4. Multi-Video Package Offer (15% Bundle Discount)",
                subject: `Long-term partnership bundle for [Brand Name] (${channelHandle})`,
                body: `Hi [Name],

Rather than a one-off test, brand integrations perform 3x better when our audience sees recurring touchpoints.

We'd love to offer [Brand] an exclusive 3-video integration bundle for ${activeCurrency.symbol}${Math.round(calculations.tier1Price * 3 * 0.85).toLocaleString()} ${currency} (a 15% discount off our standard rate card).

This includes:
- 3x 60-90s Mid-Roll Integrations across 60 days
- 3x Pinned comments & trackable UTM description links
- 1x Community Tab dedicated promo code blast

Would you be open to locking in this package for Q2?

Best,
${channelHandle}`
            },
            {
                title: "5. Q4 Holiday Sponsor Surge Pitch",
                subject: `Q4 Holiday Campaign: Reach ${calculations.views.toLocaleString()} high-intent buyers on YouTube`,
                body: `Hi [Marketing Director],

With Q4 holiday shopping ramping up, our audience is actively researching the best tools and gifts in the ${activeNiche.name} space.

We have only 2 remaining sponsorship slots available for our holiday gift guides and year-end reviews.

Attached is our official Media Kit and demographic audit. Our spots book out quickly in November and December, so please let me know if you would like to reserve our remaining mid-roll slot (${activeCurrency.symbol}${calculations.tier1Price.toLocaleString()}).

Cheers,
${channelHandle}`
            }
        ];
    }, [calculations, channelHandle, monthlyViewsCount, activeNiche, topAudienceGeo, activeCurrency, contactEmail, currency]);

    const handleCopyScript = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setScriptCopied(true);
            setTimeout(() => setScriptCopied(false), 2500);
        } catch {
            /* ignore */
        }
    };

    // Print to PDF Handler
    const handleDownloadPdf = () => {
        window.print();
    };

    return (
        <ToolPageLayout
            title="YouTube Sponsorship Rate Calculator"
            slug="youtube-sponsorship-calculator"
            description="Explore illustrative quotes for sponsored integrations, shoutouts, and dedicated reviews."
        >
            <div className="space-y-8">
                {!calculations && <p role="status"className="text-sm text-amber-700">Enter valid non-negative numbers up to 1 trillion, with a positive total. Use a decimal point and optional thousands commas.</p>}
                <p className="text-sm text-slate-500">Planning model: $28 base CPM × niche and placement factors, plus selected add-ons. Minimum base fees are $120 ($450 for dedicated videos). Currency conversions use fixed illustrative rates, not live exchange rates. Actual negotiated rates vary.</p>
                {/* Header Controls: Currency & View Presets */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex flex-wrap items-center gap-2">
                        <FaExchangeAlt className="text-purple-600" />
                        <span className="text-sm font-semibold text-slate-700">Currency:</span>
                        <div className="flex flex-wrap rounded-lg overflow-hidden border border-slate-200 bg-white">
                            {QUICK_CURRENCIES.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setCurrency(c)}
                                    className={`px-3 py-1.5 text-xs font-bold transition-all ${
                                        currency === c
                                            ? "bg-purple-600 text-white"
                                            :"text-slate-600 hover:bg-slate-100"
                                    }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                        <select
                            aria-label="Select sponsorship currency"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value as Currency)}
                            className="px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            {(Object.keys(CURRENCY_MAP) as Currency[]).map((c) => (
                                <option key={c} value={c}>
                                    {CURRENCY_MAP[c].label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>Quick Presets:</span>
                        {["10000", "25000", "50000", "100000"].map((preset) => (
                            <button
                                key={preset}
                                type="button"
                                onClick={() => setViews(preset)}
                                className="px-2.5 py-1 bg-white hover:border-purple-400 border border-slate-200 rounded-md font-medium transition-colors"
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
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Content Niche (Affects Sponsor CPM)
                        </label>
                        <select
                            value={selectedNiche}
                            onChange={(e) => setSelectedNiche(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                    <label className="block text-sm font-bold text-slate-800 mb-3">
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
                                        ?"border-purple-600 bg-purple-50/60 shadow-sm ring-1 ring-purple-500"
                                        :"border-slate-200 bg-white hover:border-purple-300"
                                }`}
                            >
                                <div className="font-bold text-sm text-slate-900 mb-1">
                                    {p.name}
                                </div>
                                <div className="text-xs text-slate-500">
                                    {p.desc}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Add-Ons & Commercial Deliverables */}
                <div className="p-5 bg-white rounded-2xl border border-slate-200">
                    <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
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
                                <span className="font-semibold text-slate-800">
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
                                <span className="font-semibold text-slate-800">
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
                                <span className="font-semibold text-slate-800">
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
                                <span className="font-semibold text-slate-800">
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
                    <div className="space-y-8 pt-4 border-t border-slate-200 animate-fade-in">
                        <div className="text-center">
                            <span className="inline-block text-xs font-black tracking-widest text-purple-600 uppercase bg-purple-100 px-3 py-1 rounded-full mb-2">
                                2026 Recommended Quote Tiers
                            </span>
                            <h3 className="text-2xl font-black text-slate-900 font-outfit">
                                Estimated Brand Deal Quote
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Floor Price */}
                            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                                    Floor Minimum
                                </div>
                                <div className="text-3xl font-black text-slate-700 font-outfit">
                                    {activeCurrency.symbol}{calculations.floorPrice.toLocaleString()}
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    Never accept below this. Your absolute walk-away price.
                                </p>
                            </div>

                            {/* Recommended Price */}
                            <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-50 to-white border-2 border-purple-500 shadow-xl text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-bl-lg">
                                    Target Pitch
                                </div>
                                <div className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">
                                    Recommended Quote
                                </div>
                                <div className="text-4xl font-black text-purple-700 font-outfit">
                                    {activeCurrency.symbol}{calculations.recommendedPrice.toLocaleString()}
                                </div>
                                <p className="text-xs text-slate-600 mt-2 font-medium">
                                    Standard rate to send in your initial pitch / media kit response.
                                </p>
                            </div>

                            {/* Premium Agency Price */}
                            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
                                <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
                                    Agency / Premium
                                </div>
                                <div className="text-3xl font-black text-emerald-600 font-outfit">
                                    {activeCurrency.symbol}{calculations.premiumPrice.toLocaleString()}
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    For funded enterprise brands, PR agencies, or rush deadlines.
                                </p>
                            </div>
                        </div>

                        {/* Breakdown Metrics */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs">
                            <div>
                                <span className="text-slate-500 block">Baseline Value</span>
                                <span className="font-bold text-slate-800 text-sm">
                                    {activeCurrency.symbol}{calculations.baseFee.toLocaleString()}
                                </span>
                            </div>
                            <div>
                                <span className="text-slate-500 block">Add-Ons Added</span>
                                <span className="font-bold text-purple-600 text-sm">
                                    +{activeCurrency.symbol}{calculations.addonValue.toLocaleString()}
                                </span>
                            </div>
                            <div>
                                <span className="text-slate-500 block">Effective CPM</span>
                                <span className="font-bold text-slate-800 text-sm">
                                    {activeCurrency.symbol}{calculations.effectiveCpm}
                                </span>
                            </div>
                            <div>
                                <span className="text-slate-500 block">View Assumption</span>
                                <span className="font-bold text-slate-800 text-sm">
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

                        {/* =========================================================================
                            FEATURE 1: LIVE MEDIA KIT & RATE CARD PDF GENERATOR
                           ========================================================================= */}
                        <div className="rounded-3xl border border-purple-200/90 bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/40 p-6 sm:p-8 shadow-xl">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-purple-100 pb-6">
                                <div>
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-black text-purple-700">
                                        <FaCrown className="text-amber-500" /> Agency-Grade Pitch Asset
                                    </span>
                                    <h3 className="mt-2 text-xl sm:text-2xl font-black text-slate-900">
                                        Live Media Kit &amp; Rate Card PDF Generator
                                    </h3>
                                    <p className="mt-1 text-xs sm:text-sm text-slate-600">
                                        Turn your calculator numbers into a polished 1-page rate card brands love receiving.
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={handleDownloadPdf}
                                        className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-purple-700 transition-all"
                                    >
                                        <FaFilePdf />
                                        <span>Download Media Kit PDF</span>
                                    </button>

                                    {!isProUnlocked ? (
                                        <button
                                            type="button"
                                            onClick={() => setShowUpgradeModal(true)}
                                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-xs font-black text-white shadow-md hover:from-amber-600 hover:to-orange-600 transition-all"
                                        >
                                            <FaCrown />
                                            <span>Upgrade to Pro ($1.99 / ₹99)</span>
                                        </button>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-100 px-3 py-2 text-xs font-bold text-emerald-800">
                                            <FaCheckCircle className="text-emerald-600" /> Pro Unlocked (No Watermark)
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Media Kit Customizer Controls */}
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Channel Handle / Brand Name
                                    </label>
                                    <Input
                                        value={channelHandle}
                                        onChange={(e) => setChannelHandle(e.target.value)}
                                        placeholder="@YourChannel"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Total Subscribers
                                    </label>
                                    <Input
                                        value={subscribersCount}
                                        onChange={(e) => setSubscribersCount(e.target.value)}
                                        placeholder="e.g. 120,000"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Monthly Channel Views
                                    </label>
                                    <Input
                                        value={monthlyViewsCount}
                                        onChange={(e) => setMonthlyViewsCount(e.target.value)}
                                        placeholder="e.g. 480,000"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Contact Email
                                    </label>
                                    <Input
                                        value={contactEmail}
                                        onChange={(e) => setContactEmail(e.target.value)}
                                        placeholder="sponsor@channel.com"
                                    />
                                </div>
                            </div>

                            {/* Demographics Inputs */}
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Top Audience Countries
                                    </label>
                                    <Input
                                        value={topAudienceGeo}
                                        onChange={(e) => setTopAudienceGeo(e.target.value)}
                                        placeholder="US 52%, UK 14%, Canada 10%"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Primary Age Bracket
                                    </label>
                                    <Input
                                        value={audienceAge}
                                        onChange={(e) => setAudienceAge(e.target.value)}
                                        placeholder="18–34 years (68%)"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Gender Demographics
                                    </label>
                                    <Input
                                        value={audienceGender}
                                        onChange={(e) => setAudienceGender(e.target.value)}
                                        placeholder="72% Male / 28% Female"
                                    />
                                </div>
                            </div>

                            {/* Template Selector */}
                            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-purple-100 pt-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-700">
                                        Agency Color Theme:
                                    </span>
                                    <div className="flex rounded-lg border border-slate-200 bg-white p-1">
                                        {(["dark", "light", "emerald", "sunset"] as const).map((theme) => (
                                            <button
                                                key={theme}
                                                type="button"
                                                onClick={() => setMediaKitTheme(theme)}
                                                className={`rounded-md px-3 py-1 text-xs font-bold capitalize transition-all ${
                                                    mediaKitTheme === theme
                                                        ? "bg-purple-600 text-white shadow"
                                                        :"text-slate-600 hover:text-slate-900"
                                                }`}
                                            >
                                                {theme}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="text-xs text-slate-500">
                                    {isProUnlocked ? (
                                        <span className="text-emerald-600 font-semibold">
                                            ✓ Watermark Removed • Agency White-Label Ready
                                        </span>
                                    ) : (
                                        <span>
                                            Free Tier: Includes subtle verification badge. <button type="button" onClick={() => setShowUpgradeModal(true)} className="text-purple-600 font-bold underline">Remove for $1.99</button>
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* =========================================================================
                                PRINTABLE 1-PAGE MEDIA KIT CARD PREVIEW
                               ========================================================================= */}
                            <div className="mt-6 overflow-hidden rounded-2xl shadow-2xl print:m-0 print:p-0 print:shadow-none">
                                <div
                                    id="media-kit-card"
                                    className={`p-6 sm:p-8 transition-colors ${
                                        mediaKitTheme === "dark"
                                            ? "bg-[#0b0f17] text-white border border-slate-800"
                                            : mediaKitTheme === "light"
                                            ? "bg-white text-slate-900 border border-slate-300"
                                            : mediaKitTheme === "emerald"
                                            ? "bg-[#06201a] text-white border border-emerald-900"
                                            : "bg-gradient-to-br from-slate-950 via-[#1e112a] to-[#2a1122] text-white border border-rose-900"
                                    }`}
                                >
                                    {/* Media Kit Header */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                                        <div>
                                            <span className="rounded-full bg-purple-500/20 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-purple-400">
                                                Official Sponsor Media Kit &amp; Rate Card • 2026
                                            </span>
                                            <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
                                                {channelHandle}
                                            </h2>
                                            <p className="mt-0.5 text-xs sm:text-sm opacity-70">
                                                Primary Niche: {activeNiche.name} • Dedicated Audience
                                            </p>
                                        </div>

                                        <div className="text-left sm:text-right">
                                            <span className="text-xs opacity-60 block">Booking &amp; Partnerships:</span>
                                            <span className="text-sm font-bold text-purple-400">{contactEmail}</span>
                                        </div>
                                    </div>

                                    {/* 4 Core Channel Metrics */}
                                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        <div className="rounded-xl bg-white/5 p-4 border border-white/5 text-center">
                                            <span className="text-[11px] opacity-60 block">Subscribers</span>
                                            <span className="text-xl sm:text-2xl font-black">{subscribersCount}</span>
                                        </div>
                                        <div className="rounded-xl bg-white/5 p-4 border border-white/5 text-center">
                                            <span className="text-[11px] opacity-60 block">Monthly Views</span>
                                            <span className="text-xl sm:text-2xl font-black">{monthlyViewsCount}</span>
                                        </div>
                                        <div className="rounded-xl bg-white/5 p-4 border border-white/5 text-center">
                                            <span className="text-[11px] opacity-60 block">Avg Video Views</span>
                                            <span className="text-xl sm:text-2xl font-black">{calculations.views.toLocaleString()}</span>
                                        </div>
                                        <div className="rounded-xl bg-white/5 p-4 border border-white/5 text-center">
                                            <span className="text-[11px] opacity-60 block">Engagement Rate</span>
                                            <span className="text-xl sm:text-2xl font-black text-purple-400">5.8%</span>
                                        </div>
                                    </div>

                                    {/* Audience Demographics Row */}
                                    <div className="mt-5 rounded-xl bg-white/5 p-4 border border-white/5">
                                        <div className="text-xs font-black uppercase tracking-wider opacity-60 mb-2">
                                            Verified Audience Demographics
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                                            <div>
                                                <span className="opacity-60 block">Geographic Reach:</span>
                                                <span className="font-bold">{topAudienceGeo}</span>
                                            </div>
                                            <div>
                                                <span className="opacity-60 block">Age Distribution:</span>
                                                <span className="font-bold">{audienceAge}</span>
                                            </div>
                                            <div>
                                                <span className="opacity-60 block">Gender Breakdown:</span>
                                                <span className="font-bold">{audienceGender}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3 Package Rate Card Tiers */}
                                    <div className="mt-6">
                                        <div className="text-xs font-black uppercase tracking-wider opacity-60 mb-3">
                                            Standard Sponsorship Packages &amp; Deliverables
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {/* Tier 1 */}
                                            <div className="rounded-xl bg-white/5 p-5 border border-purple-500/40 relative">
                                                <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 block mb-1">
                                                    Tier 1: Most Popular
                                                </span>
                                                <h4 className="font-bold text-sm">60-90s Mid-Roll Integration</h4>
                                                <div className="mt-2 text-2xl font-black font-outfit text-purple-300">
                                                    {activeCurrency.symbol}{calculations.tier1Price.toLocaleString()} {currency}
                                                </div>
                                                <ul className="mt-3 space-y-1.5 text-[11px] opacity-80 list-disc pl-4">
                                                    <li>60-90s integrated placement inside video</li>
                                                    <li>Pinned link in top comment for 30 days</li>
                                                    <li>Trackable link in top 3 lines of description</li>
                                                    <li>Standard 14-day production turnaround</li>
                                                </ul>
                                            </div>

                                            {/* Tier 2 */}
                                            <div className="rounded-xl bg-white/5 p-5 border border-white/10">
                                                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block mb-1">
                                                    Tier 2: Maximum Impact
                                                </span>
                                                <h4 className="font-bold text-sm">Dedicated Video Episode</h4>
                                                <div className="mt-2 text-2xl font-black font-outfit text-emerald-400">
                                                    {activeCurrency.symbol}{calculations.tier2Price.toLocaleString()} {currency}
                                                </div>
                                                <ul className="mt-3 space-y-1.5 text-[11px] opacity-80 list-disc pl-4">
                                                    <li>Entire 10-15 minute video topic focused on sponsor</li>
                                                    <li>Custom branded thumbnail &amp; title integration</li>
                                                    <li>Permanent pinned link &amp; community post</li>
                                                    <li>1x revision round prior to publication</li>
                                                </ul>
                                            </div>

                                            {/* Tier 3 */}
                                            <div className="rounded-xl bg-white/5 p-5 border border-white/10">
                                                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block mb-1">
                                                    Tier 3: Viral Short Pack
                                                </span>
                                                <h4 className="font-bold text-sm">Shorts / Reels Integration</h4>
                                                <div className="mt-2 text-2xl font-black font-outfit text-amber-300">
                                                    {activeCurrency.symbol}{calculations.tier3Price.toLocaleString()} {currency}
                                                </div>
                                                <ul className="mt-3 space-y-1.5 text-[11px] opacity-80 list-disc pl-4">
                                                    <li>60s vertical format Short featuring product</li>
                                                    <li>Cross-posted to YouTube Shorts &amp; Instagram</li>
                                                    <li>Dynamic animated captions &amp; product CTA</li>
                                                    <li>Fast 7-day turnaround</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Booking Terms & Watermark Badge */}
                                    <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] opacity-70">
                                        <div>
                                            Booking Terms: 50% upon booking, 50% upon video live date. Net-15 invoicing accepted for verified agencies.
                                        </div>

                                        {!isProUnlocked ? (
                                            <div className="flex items-center gap-1.5 text-purple-400 font-bold bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                                                <FaShieldAlt />
                                                <span>Verified by YouTubeToolsHub.com Rate Card</span>
                                            </div>
                                        ) : (
                                            <div className="text-emerald-400 font-semibold">
                                                Official Creator Media Kit (Verified ID: YTH-2026-MK)
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Pro Cold Pitch Scripts Section */}
                            <div className="mt-8 border-t border-purple-100 pt-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <FaEnvelope className="text-purple-600"/>
                                            <h4 className="font-bold text-base text-slate-900">
                                                5 Copy-Paste Cold Pitch Email Scripts ({activeNiche.name})
                                            </h4>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            Field-tested outreach templates customized with your current rates and metrics.
                                        </p>
                                    </div>

                                    <Button
                                        onClick={() => handleCopyScript(COLD_PITCH_SCRIPTS[activeScriptIndex]?.body || "")}
                                        size="sm"
                                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg shadow-sm"
                                    >
                                        {scriptCopied ? <FaCheck className="text-emerald-300" /> : <FaCopy />}
                                        <span>{scriptCopied ? "Script Copied!" : "Copy Active Script"}</span>
                                    </Button>
                                </div>

                                {/* Script Selector Tabs */}
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {COLD_PITCH_SCRIPTS.map((script, idx) => (
                                        <button
                                            key={script.title}
                                            type="button"
                                            onClick={() => setActiveScriptIndex(idx)}
                                            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                                                activeScriptIndex === idx
                                                    ? "bg-purple-600 text-white shadow-sm"
                                                    :"bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
                                            }`}
                                        >
                                            {script.title}
                                        </button>
                                    ))}
                                </div>

                                <div className="rounded-xl border border-slate-200 bg-slate-900 p-4 text-white shadow-inner">
                                    <div className="text-xs font-mono text-purple-300 mb-2 pb-2 border-b border-slate-800">
                                        <strong>Subject:</strong> {COLD_PITCH_SCRIPTS[activeScriptIndex]?.subject}
                                    </div>
                                    <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                                        {COLD_PITCH_SCRIPTS[activeScriptIndex]?.body}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        {/* Pro Upgrade Modal */}
                        {showUpgradeModal && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                                <div className="relative w-full max-w-md rounded-3xl border border-purple-200 bg-white p-6 sm:p-8 shadow-2xl">
                                    <button
                                        type="button"
                                        onClick={() => setShowUpgradeModal(false)}
                                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                                    >
                                        <FaTimes className="text-base" />
                                    </button>

                                    <div className="text-center">
                                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-lg mb-4">
                                            <FaCrown className="text-2xl" />
                                        </div>

                                        <h3 className="text-xl font-black text-slate-900">
                                            Unlock Agency Pro Media Kit
                                        </h3>
                                        <p className="mt-1 text-xs text-slate-600">
                                            Present yourself as an agency-represented creator and charge 25%–40% higher sponsor rates.
                                        </p>

                                        <div className="mt-4 rounded-2xl bg-purple-50 p-4 text-left text-xs space-y-2">
                                            <div className="flex items-center gap-2 font-bold text-slate-800">
                                                <FaCheck className="text-emerald-500" />
                                                <span>Removes &ldquo;YouTubeToolsHub&rdquo; watermark</span>
                                            </div>
                                            <div className="flex items-center gap-2 font-bold text-slate-800">
                                                <FaCheck className="text-emerald-500" />
                                                <span>Unlocks all 4 dark &amp; light agency themes</span>
                                            </div>
                                            <div className="flex items-center gap-2 font-bold text-slate-800">
                                                <FaCheck className="text-emerald-500" />
                                                <span>5 niche cold pitch outreach scripts</span>
                                            </div>
                                            <div className="flex items-center gap-2 font-bold text-slate-800">
                                                <FaCheck className="text-emerald-500" />
                                                <span>Instant high-res PDF rate card export</span>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex flex-col gap-3">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsProUnlocked(true);
                                                    setShowUpgradeModal(false);
                                                }}
                                                className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 text-sm font-black text-white shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
                                            >
                                                Unlock Instant Pro ($1.99 / ₹99)
                                            </button>
                                            <span className="text-[11px] text-slate-400">
                                                One-time unlock • Lifetime access on this device
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* International Wire / Payout Affiliate Card */}
                        <InternationalPayoutCallout monthlyUsdEstimate={calculations.recommendedPrice * 2} />
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
