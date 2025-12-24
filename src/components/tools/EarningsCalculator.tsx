"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import UsageBanner from "@/components/ui/UsageBanner";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import { useUsage } from "@/hooks/useUsage";
import { FaCalculator, FaDollarSign, FaHandshake, FaChartLine, FaSpinner, FaRocket } from "react-icons/fa";
import { formatCurrency, formatNumber, calculateEarnings, safeJSONParse } from "@/lib/utils";
import Select from "@/components/ui/Select";

const faq = [
    {
        question: "How is sponsorship value calculated?",
        answer: "Our AI analyzes your niche and view counts against current market CPM rates (Cost Per Mille) to give a realistic deal range."
    },
    {
        question: "What is RPM?",
        answer: "RPM (Revenue Per Mille) is the revenue you earn per 1,000 views. It varies by niche, audience location, and time of year. Typical RPM ranges from $0.25 to $10+."
    },
    {
        question: "When do I get paid by YouTube?",
        answer: "YouTube pays between the 21st and 26th of each month for the previous month's earnings, once you've reached the $100 threshold."
    },
];

const howTo = [
    "Choose 'Ad Revenue' or 'Sponsorships' tab",
    "Enter your average views and niche details",
    "Click 'Calculate' to see your potential income",
    "Review the 'Growth Forecast' to see future earnings"
];

const seoContent = `Estimate your potential YouTube earnings with our free Earnings Calculator & Sponsorship Estimator. Calculate ad revenue based on RPM and get AI-powered valuation for brand deals based on your niche.`;

interface SponsorshipResult {
    lowEstimate: number;
    highEstimate: number;
    currency: string;
    explanation: string;
    pitchTip: string;
}

const niches = [
    { value: "tech", label: "Tech & Software" },
    { value: "finance", label: "Finance & Business" },
    { value: "lifestyle", label: "Vlog & Lifestyle" },
    { value: "gaming", label: "Gaming" },
    { value: "education", label: "Education" },
    { value: "entertainment", label: "Entertainment" },
];

export default function EarningsCalculator() {
    const [activeTab, setActiveTab] = useState<"ads" | "sponsorships">("ads");

    // Ad Revenue State
    const [views, setViews] = useState("");
    const [rpm, setRpm] = useState("2.5");
    const [adResult, setAdResult] = useState<{ monthly: number; yearly: number } | null>(null);

    // Sponsorship State
    const [dealViews, setDealViews] = useState("");
    const [subscribers, setSubscribers] = useState("");
    const [niche, setNiche] = useState("tech");
    const [sponsorResult, setSponsorResult] = useState<SponsorshipResult | null>(null);
    const [loading, setLoading] = useState(false);

    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const handleCalculateAds = () => {
        const monthlyViews = parseFloat(views.replace(/,/g, ""));
        const rpmValue = parseFloat(rpm);
        if (isNaN(monthlyViews) || isNaN(rpmValue)) return;
        setAdResult(calculateEarnings(monthlyViews, rpmValue));
    };

    const handleEstimateSponsorship = async () => {
        if (!dealViews || !subscribers) return;

        if (!checkLimit("youtube-earnings-calculator")) return;

        setLoading(true);
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tool: "sponsorship-estimator", // We need to update API route for this case
                    niche: niches.find(n => n.value === niche)?.label,
                    dealViews,
                    subscribers
                }),
            });
            const data = await response.json();
            increment("youtube-earnings-calculator");
            const parsed = safeJSONParse<SponsorshipResult>(data.result, null as unknown as SponsorshipResult);
            setSponsorResult(parsed);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ToolPageLayout
            title="YouTube Income & Deal Calculator"
            description="Project your AdSense revenue and estimate sponsorship deal values with AI."
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-8">
                <UsageBanner type="ai" toolSlug="youtube-earnings-calculator" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                {/* Tabs */}
                <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <button
                        onClick={() => setActiveTab("ads")}
                        className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all ${activeTab === "ads" ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"}`}
                    >
                        <FaCalculator className="inline mr-2" /> Ad Revenue
                    </button>
                    <button
                        onClick={() => setActiveTab("sponsorships")}
                        className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all ${activeTab === "sponsorships" ? "bg-white dark:bg-gray-700 shadow-sm text-purple-600" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"}`}
                    >
                        <FaHandshake className="inline mr-2" /> Sponsorships
                    </button>
                </div>

                {/* Ad Revenue Tab */}
                {activeTab === "ads" && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input
                                label="Monthly Views"
                                placeholder="e.g., 100000"
                                value={views}
                                onChange={(e) => setViews(e.target.value)}
                            />
                            <Input
                                label="RPM ($)"
                                type="number"
                                placeholder="2.5"
                                value={rpm}
                                onChange={(e) => setRpm(e.target.value)}
                                step="0.1"
                            />
                            <div className="flex items-end">
                                <Button onClick={handleCalculateAds} className="w-full h-[46px]">
                                    Calculate Ads
                                </Button>
                            </div>
                        </div>

                        {adResult && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-20">
                                        <FaDollarSign className="w-24 h-24" />
                                    </div>
                                    <p className="opacity-80 mb-1">Estimated Monthly</p>
                                    <p className="text-4xl font-bold mb-4">{formatCurrency(adResult.monthly)}</p>
                                    <div className="bg-white/20 rounded-lg p-3 text-sm">
                                        <p className="font-semibold mb-1 flex items-center"><FaRocket className="mr-2" /> Growth Forecast (Year 1)</p>
                                        <div className="flex justify-between items-center opacity-90">
                                            <span>If you grow 10%/mo:</span>
                                            <span className="font-bold">{formatCurrency(adResult.monthly * 1.1)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                                    <h4 className="text-gray-500 font-medium mb-4 flex items-center">
                                        <FaChartLine className="mr-2" /> Yearly Projection
                                    </h4>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        {formatCurrency(adResult.yearly)}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        *Excludes taxes and platform fees.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Sponsorship Tab */}
                {activeTab === "sponsorships" && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Avg Views Per Video"
                                placeholder="e.g., 25000"
                                value={dealViews}
                                onChange={(e) => setDealViews(e.target.value)}
                            />
                            <Input
                                label="Subscriber Count"
                                placeholder="e.g., 50000"
                                value={subscribers}
                                onChange={(e) => setSubscribers(e.target.value)}
                            />
                            <div className="md:col-span-2">
                                <Select
                                    label="Channel Niche"
                                    options={niches}
                                    value={niche}
                                    onChange={(e) => setNiche(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button onClick={handleEstimateSponsorship} isLoading={loading} className="w-full">
                            {loading ? "Analyzing Market Rates..." : "💰 Estimate Deal Value"}
                        </Button>

                        {sponsorResult && (
                            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
                                <h3 className="text-lg font-medium opacity-80 mb-2">Estimated Rate Per Video</h3>
                                <div className="text-4xl font-bold mb-6">
                                    ${formatNumber(sponsorResult.lowEstimate)} - ${formatNumber(sponsorResult.highEstimate)}
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                                    <p className="font-semibold text-purple-200 mb-2">💡 Market Insight</p>
                                    <p className="mb-4">{sponsorResult.explanation}</p>
                                    <div className="border-t border-white/20 pt-4">
                                        <p className="font-semibold text-purple-200 mb-2">📢 Pitch Tip</p>
                                        <p className="italic">"{sponsorResult.pitchTip}"</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
