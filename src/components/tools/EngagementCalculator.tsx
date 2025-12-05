"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { FaChartBar } from "react-icons/fa";
import { calculateEngagementRate, formatNumber } from "@/lib/utils";

const faq = [
    {
        question: "What is a good engagement rate on YouTube?",
        answer: "Generally, 2-5% is average, 5-10% is good, and 10%+ is excellent. However, rates vary by niche and channel size. Smaller channels often have higher engagement rates."
    },
    {
        question: "How is engagement rate calculated?",
        answer: "Engagement rate = ((Likes + Comments + Shares) / Views) × 100. This measures how actively viewers interact with your content."
    },
    {
        question: "Why is engagement important?",
        answer: "High engagement signals to YouTube's algorithm that your content is valuable, potentially leading to better recommendations and more views."
    },
];

const howTo = [
    "Enter the total number of views on your video",
    "Enter the total number of likes received",
    "Enter the total number of comments",
    "Enter the total number of shares (if known)",
    "Click 'Calculate Engagement' to see your rate"
];

const seoContent = `Calculate your YouTube video's engagement rate with our free calculator. Measure how actively your audience interacts with your content based on views, likes, comments, and shares. Understand if your engagement is below average, good, or excellent compared to industry benchmarks.`;

export default function EngagementCalculator() {
    const [views, setViews] = useState("");
    const [likes, setLikes] = useState("");
    const [comments, setComments] = useState("");
    const [shares, setShares] = useState("");
    const [result, setResult] = useState<{ rate: number; rating: string } | null>(null);

    const handleCalculate = () => {
        const viewsNum = parseFloat(views.replace(/,/g, "")) || 0;
        const likesNum = parseFloat(likes.replace(/,/g, "")) || 0;
        const commentsNum = parseFloat(comments.replace(/,/g, "")) || 0;
        const sharesNum = parseFloat(shares.replace(/,/g, "")) || 0;

        if (viewsNum === 0) return;

        const engagement = calculateEngagementRate(viewsNum, likesNum, commentsNum, sharesNum);
        setResult(engagement);
    };

    const getRatingColor = (rating: string) => {
        switch (rating) {
            case "Excellent":
                return "text-green-500 bg-green-100 dark:bg-green-900/30";
            case "Good":
                return "text-blue-500 bg-blue-100 dark:bg-blue-900/30";
            case "Average":
                return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30";
            case "Needs Improvement":
                return "text-red-500 bg-red-100 dark:bg-red-900/30";
            default:
                return "text-gray-500 bg-gray-100 dark:bg-gray-700";
        }
    };

    return (
        <ToolPageLayout
            title="YouTube Engagement Rate Calculator"
            description="Calculate your video's engagement rate and compare to benchmarks"
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-6">
                {/* Input Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Input
                        type="text"
                        label="Total Views"
                        placeholder="e.g., 10000"
                        value={views}
                        onChange={(e) => setViews(e.target.value)}
                    />
                    <Input
                        type="text"
                        label="Total Likes"
                        placeholder="e.g., 500"
                        value={likes}
                        onChange={(e) => setLikes(e.target.value)}
                    />
                    <Input
                        type="text"
                        label="Total Comments"
                        placeholder="e.g., 50"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    />
                    <Input
                        type="text"
                        label="Total Shares"
                        placeholder="e.g., 10"
                        value={shares}
                        onChange={(e) => setShares(e.target.value)}
                    />
                </div>

                <Button onClick={handleCalculate}>
                    <FaChartBar className="mr-2" />
                    Calculate Engagement
                </Button>

                {/* Results Section */}
                {result && (
                    <div className="mt-8">
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-center">
                            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                                Engagement Rate
                            </h3>
                            <p className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
                                {result.rate.toFixed(2)}%
                            </p>
                            <span className={`inline-block px-6 py-2 rounded-full text-lg font-semibold ${getRatingColor(result.rating)}`}>
                                {result.rating}
                            </span>
                        </div>

                        {/* Breakdown */}
                        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {formatNumber(parseFloat(views.replace(/,/g, "")) || 0)}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Views</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm">
                                <p className="text-2xl font-bold text-blue-500">
                                    {formatNumber(parseFloat(likes.replace(/,/g, "")) || 0)}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Likes</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm">
                                <p className="text-2xl font-bold text-green-500">
                                    {formatNumber(parseFloat(comments.replace(/,/g, "")) || 0)}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Comments</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm">
                                <p className="text-2xl font-bold text-purple-500">
                                    {formatNumber(parseFloat(shares.replace(/,/g, "")) || 0)}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Shares</p>
                            </div>
                        </div>

                        {/* Benchmarks */}
                        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                Engagement Benchmarks
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div><span className="text-red-500 font-medium">&lt; 2%</span> Needs Work</div>
                                <div><span className="text-yellow-500 font-medium">2-5%</span> Average</div>
                                <div><span className="text-blue-500 font-medium">5-10%</span> Good</div>
                                <div><span className="text-green-500 font-medium">10%+</span> Excellent</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
