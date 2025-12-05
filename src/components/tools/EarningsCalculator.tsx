"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { FaCalculator, FaDollarSign } from "react-icons/fa";
import { formatCurrency, formatNumber, calculateEarnings } from "@/lib/utils";

const faq = [
    {
        question: "What is RPM?",
        answer: "RPM (Revenue Per Mille) is the revenue you earn per 1,000 views. It varies by niche, audience location, and time of year. Typical RPM ranges from $0.25 to $10+."
    },
    {
        question: "How accurate is this calculator?",
        answer: "This provides an estimate only. Actual earnings depend on many factors including viewer demographics, ad types, watch time, and YouTube's revenue share."
    },
    {
        question: "What's a good RPM?",
        answer: "Average RPM is $1-3 for most niches. Finance, tech, and business channels often see $5-15. Gaming and entertainment typically see $0.50-2."
    },
    {
        question: "When do I get paid by YouTube?",
        answer: "YouTube pays between the 21st and 26th of each month for the previous month's earnings, once you've reached the $100 threshold."
    },
];

const howTo = [
    "Enter your average monthly views",
    "Enter your estimated RPM (Revenue Per 1000 views)",
    "Click 'Calculate' to see your estimated earnings",
    "Review monthly and yearly projections"
];

const seoContent = `Estimate your potential YouTube earnings with our free Earnings Calculator. Enter your monthly views and RPM to see how much you could make from YouTube ads. Understand the relationship between views and revenue and plan your content strategy accordingly.`;

export default function EarningsCalculator() {
    const [views, setViews] = useState("");
    const [rpm, setRpm] = useState("");
    const [result, setResult] = useState<{ monthly: number; yearly: number } | null>(null);

    const handleCalculate = () => {
        const monthlyViews = parseFloat(views.replace(/,/g, ""));
        const rpmValue = parseFloat(rpm);

        if (isNaN(monthlyViews) || isNaN(rpmValue)) {
            return;
        }

        const earnings = calculateEarnings(monthlyViews, rpmValue);
        setResult(earnings);
    };

    return (
        <ToolPageLayout
            title="YouTube Earnings Calculator"
            description="Estimate your potential YouTube ad revenue based on views and RPM"
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-6">
                {/* Input Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        type="text"
                        label="Monthly Views"
                        placeholder="e.g., 100000"
                        value={views}
                        onChange={(e) => setViews(e.target.value)}
                        helperText="Your average monthly video views"
                    />
                    <Input
                        type="number"
                        label="RPM ($)"
                        placeholder="e.g., 2.5"
                        value={rpm}
                        onChange={(e) => setRpm(e.target.value)}
                        helperText="Revenue per 1,000 views (USD)"
                        step="0.1"
                        min="0"
                    />
                    <div className="flex items-end">
                        <Button onClick={handleCalculate} className="w-full">
                            <FaCalculator className="mr-2" />
                            Calculate
                        </Button>
                    </div>
                </div>

                {/* Results Section */}
                {result && (
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                            Estimated Earnings
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                        <FaDollarSign className="w-6 h-6" />
                                    </div>
                                    <span className="text-lg font-medium opacity-90">Monthly</span>
                                </div>
                                <p className="text-4xl font-bold">{formatCurrency(result.monthly)}</p>
                                <p className="text-sm opacity-75 mt-2">
                                    Based on {formatNumber(parseFloat(views.replace(/,/g, "")))} views
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                        <FaDollarSign className="w-6 h-6" />
                                    </div>
                                    <span className="text-lg font-medium opacity-90">Yearly</span>
                                </div>
                                <p className="text-4xl font-bold">{formatCurrency(result.yearly)}</p>
                                <p className="text-sm opacity-75 mt-2">
                                    Projected at current rate
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                <strong>Disclaimer:</strong> These are estimates only. Actual YouTube earnings
                                vary based on many factors including ad type, viewer location, watch time,
                                and YouTube&apos;s 45/55 revenue share. Consider diversifying income through
                                sponsorships, merchandise, and memberships.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
