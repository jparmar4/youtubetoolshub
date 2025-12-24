"use client";

import { useState } from "react";
import { saveItem } from "@/lib/dashboard";
import ShareModal from "@/components/ui/ShareModal";
import { FaSearch, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaShareAlt, FaSpinner, FaYoutube, FaBookmark } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface AuditResult {
    score: number;
    grade: string;
    metrics: {
        name: string;
        score: number;
        status: "good" | "warning" | "bad";
        feedback: string;
    }[];
    summary: string;
}

export default function ChannelAudit() {
    const [channelInput, setChannelInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AuditResult | null>(null);
    const [saved, setSaved] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    const analyzeChannel = async () => {
        if (!channelInput) return;
        setLoading(true);
        setResult(null);
        setSaved(false);

        // Simulation of a complex analysis
        // In a real app, this would call the YouTube Data API
        await new Promise(resolve => setTimeout(resolve, 2500));

        // Deterministic "random" score based on input length to be consistent for the same input
        const seed = channelInput.length;
        const score = Math.min(98, Math.max(45, 70 + (seed % 30)));

        let grade = "B";
        if (score >= 90) grade = "A+";
        else if (score >= 80) grade = "A";
        else if (score >= 70) grade = "B";
        else if (score >= 60) grade = "C";
        else grade = "D";

        setResult({
            score,
            grade,
            metrics: [
                {
                    name: "Title Optimization",
                    score: Math.min(100, score + 10),
                    status: score > 70 ? "good" : "warning",
                    feedback: score > 70 ? "Your titles are catchy and well-structured." : "Try adding more emotional keywords to your titles."
                },
                {
                    name: "Thumbnail Quality",
                    score: Math.min(100, score - 5),
                    status: score > 80 ? "good" : "warning",
                    feedback: score > 80 ? "Great use of contrast and faces." : "Thumbnails need more vibrant colors and less text."
                },
                {
                    name: "Upload Consistency",
                    score: Math.min(100, score + 5),
                    status: "good",
                    feedback: "You have a solid upload schedule."
                },
                {
                    name: "Engagement Rate",
                    score: Math.min(100, score - 15),
                    status: score > 75 ? "good" : "bad",
                    feedback: score > 75 ? "Audience interaction is high." : "Reply to more comments to boost engagement."
                }
            ],
            summary: "Your channel has strong potential! Focus on improving click-through rates (CTR) by A/B testing your thumbnails. Your content strategy is solid, but engagement could be higher."
        });
        setLoading(false);
    };

    const handleSave = () => {
        if (!result) return;
        saveItem({
            type: 'audit',
            toolSlug: 'youtube-channel-audit',
            content: {
                score: result.score,
                summary: result.summary
            }
        });
        setSaved(true);
    };

    const getShareContent = () => {
        if (!result) return { title: "", text: "" };
        const bestMetric = result.metrics.reduce((prev, current) => (prev.score > current.score) ? prev : current);

        const text = `I just audited my YouTube channel health! 📊\n\n` +
            `🏆 Score: ${result.score}/100 (${result.grade})\n` +
            `✨ Top Strength: ${bestMetric.name}\n\n` +
            `Check your channel score for free 👇`;

        return {
            title: "Share Audit Result",
            text
        };
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            {/* Input Section */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Channel Health Checker
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Enter your Channel Handle or ID to get a comprehensive audit score.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaYoutube className="text-gray-400 text-xl" />
                        </div>
                        <input
                            type="text"
                            value={channelInput}
                            onChange={(e) => setChannelInput(e.target.value)}
                            placeholder="@MrBeast or Channel ID"
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                        />
                    </div>
                    <button
                        onClick={analyzeChannel}
                        disabled={loading || !channelInput}
                        className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-red-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
                    >
                        {loading ? (
                            <><FaSpinner className="animate-spin" /> Analyzing...</>
                        ) : (
                            "Audit Channel"
                        )}
                    </button>
                </div>
            </div>

            {/* Results Section */}
            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {/* Score Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full pointer-events-none" />

                            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                                {/* Gauge */}
                                <div className="relative w-48 h-48 flex-shrink-0">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="96"
                                            cy="96"
                                            r="88"
                                            stroke="currentColor"
                                            strokeWidth="12"
                                            fill="none"
                                            className="text-gray-100 dark:text-gray-700"
                                        />
                                        <circle
                                            cx="96"
                                            cy="96"
                                            r="88"
                                            stroke="currentColor"
                                            strokeWidth="12"
                                            fill="none"
                                            strokeDasharray={2 * Math.PI * 88}
                                            strokeDashoffset={2 * Math.PI * 88 * (1 - result.score / 100)}
                                            className={`transition-all duration-1000 ease-out ${result.score >= 90 ? "text-green-500" :
                                                result.score >= 70 ? "text-yellow-500" : "text-red-500"
                                                }`}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-5xl font-black text-gray-900 dark:text-white">
                                            {result.score}
                                        </span>
                                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Health Score</span>
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                                        <span className={`px-4 py-1 rounded-full text-sm font-bold border ${result.grade.startsWith("A") ? "bg-green-100 text-green-700 border-green-200" :
                                            result.grade === "B" ? "bg-blue-100 text-blue-700 border-blue-200" :
                                                "bg-yellow-100 text-yellow-700 border-yellow-200"
                                            }`}>
                                            Grade {result.grade}
                                        </span>
                                        <span className="text-gray-500 text-sm">Based on simulation logic</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                        Analysis Complete
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                        {result.summary}
                                    </p>

                                    <div className="flex items-center justify-center md:justify-start gap-4">
                                        <button
                                            onClick={handleSave}
                                            disabled={saved}
                                            className={`inline-flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all ${saved
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 shadow-lg hover:shadow-xl"
                                                }`}
                                        >
                                            {saved ? <FaCheckCircle /> : <FaBookmark />}
                                            {saved ? "Saved" : "Save Result"}
                                        </button>

                                        <button
                                            onClick={() => setShowShareModal(true)}
                                            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                                        >
                                            <FaShareAlt /> Share Result
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {result.metrics.map((metric, idx) => (
                                <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-bold text-gray-900 dark:text-white">{metric.name}</h4>
                                        {metric.status === "good" ? (
                                            <FaCheckCircle className="text-green-500 text-xl" />
                                        ) : metric.status === "warning" ? (
                                            <FaExclamationTriangle className="text-yellow-500 text-xl" />
                                        ) : (
                                            <FaTimesCircle className="text-red-500 text-xl" />
                                        )}
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mb-4">
                                        <div
                                            className={`h-2 rounded-full ${metric.score >= 80 ? "bg-green-500" :
                                                metric.score >= 60 ? "bg-yellow-500" : "bg-red-500"
                                                }`}
                                            style={{ width: `${metric.score}%` }}
                                        />
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {metric.feedback}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {result && (
                <ShareModal
                    isOpen={showShareModal}
                    onClose={() => setShowShareModal(false)}
                    title={getShareContent().title}
                    text={getShareContent().text}
                    url="https://youtubetoolshub.com/tools/youtube-channel-audit"
                />
            )}
        </div>
    );
}
