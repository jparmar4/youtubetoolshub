"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { FaCalendarAlt, FaDownload } from "react-icons/fa";
import { downloadAsFile, generateCSV } from "@/lib/utils";
import UsageBanner from "@/components/ui/UsageBanner";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import { useUsage } from "@/hooks/useUsage";

interface CalendarEntry {
    day: number;
    title: string;
    type: "Tutorial" | "Vlog" | "Short" | "Review" | "Other";
}

const frequencyOptions = [
    { value: "daily", label: "Daily (7 videos/week)" },
    { value: "weekly", label: "Weekly (1 video/week)" },
    { value: "biweekly", label: "Bi-Weekly (2 videos/week)" },
    { value: "triweekly", label: "Tri-Weekly (3 videos/week)" },
];

const faq = [
    {
        question: "How does the calendar generator work?",
        answer: "Our AI analyzes your niche and generates a balanced content schedule with diverse video types (Tutorials, Vlogs, Shorts, etc.) suitable for your posting frequency."
    },
    {
        question: "Can I edit the generated calendar?",
        answer: "Currently, you can download the calendar as a CSV file and edit it in Excel or Google Sheets. In-app editing is coming soon."
    },
    {
        question: "What's the best posting frequency?",
        answer: "Consistency is key. It's better to post one high-quality video weekly than to burn out trying to post daily. Choose a schedule you can maintain long-term."
    },
];

const howTo = [
    "Enter your channel's niche or main topic",
    "Select how often you want to post videos",
    "Choose the duration for your calendar (e.g., 30 days)",
    "Click 'Generate Calendar' to get a complete content plan",
    "Review your scheduled video ideas and types",
    "Download the calendar as a CSV file to track your progress"
];

const seoContent = `Plan your YouTube success with our AI Content Calendar Generator. Create a consistent, strategic content schedule in seconds. Whether you're a daily vlogger or a weekly educator, our tool generates engaging video ideas and organizes them into a balanced calendar to keep your audience growing and engaged.`;

export default function ContentCalendarGenerator() {
    const [niche, setNiche] = useState("");
    const [frequency, setFrequency] = useState("weekly");
    const [days, setDays] = useState("30");
    const [calendar, setCalendar] = useState<CalendarEntry[]>([]);
    const [loading, setLoading] = useState(false);


    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const handleGenerate = async () => {
        if (!niche.trim()) return;

        if (!checkLimit("youtube-content-calendar")) {
            return;
        }

        setLoading(true);
        setCalendar([]);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 45000);

            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tool: "content-calendar",
                    topic: niche,
                    frequency: frequencyOptions.find(f => f.value === frequency)?.label,
                    duration: parseInt(days) || 30,
                }),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);
            const data = await response.json();

            if (data.error) {
                console.error("API Error:", data.error);
                return;
            }

            increment("youtube-content-calendar");

            let resultStr = data.result || "";
            resultStr = resultStr.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

            try {
                const parsed = JSON.parse(resultStr);
                if (Array.isArray(parsed)) {
                    setCalendar(parsed);
                } else if (typeof parsed === "object" && parsed.calendar) {
                    setCalendar(parsed.calendar);
                } else {
                    throw new Error("Invalid format");
                }
            } catch (e) {
                console.error("Parsing error", e);
            }
        } catch (error) {
            console.error("Generation error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadCSV = () => {
        const csvData = calendar.map(entry => ({
            Day: entry.day,
            Title: entry.title,
            Type: entry.type
        }));
        const csv = generateCSV(csvData, ["Day", "Title", "Type"]);
        downloadAsFile(csv, "content-calendar.csv", "text/csv");
    };

    return (
        <ToolPageLayout
            title="YouTube Content Calendar Generator"
            description="Plan your content schedule with AI-generated video ideas"
            faq={faq}
            howTo={howTo}
            seoContent={seoContent}
        >
            <div className="space-y-6">
                <UsageBanner type="ai" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                {/* Input Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                        <Input
                            label="Channel Niche"
                            placeholder="e.g., Tech tutorials, Travel vlogs"
                            value={niche}
                            onChange={(e) => setNiche(e.target.value)}
                        />
                    </div>
                    <Select
                        label="Posting Frequency"
                        options={frequencyOptions}
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                    />
                    <Input
                        type="number"
                        label="Number of Days"
                        placeholder="30"
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                        min={7}
                        max={90}
                    />
                </div>

                <Button onClick={handleGenerate} isLoading={loading}>
                    <FaCalendarAlt className="mr-2" />
                    Generate Calendar
                </Button>

                {/* Results Section */}
                {calendar.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Content Calendar
                            </h3>
                            <Button variant="secondary" onClick={handleDownloadCSV}>
                                <FaDownload className="mr-2" />
                                Download as CSV
                            </Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-700">
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white rounded-tl-lg">
                                            Day
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                            Video Title
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white rounded-tr-lg">
                                            Type
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {calendar.map((entry, i) => (
                                        <tr
                                            key={i}
                                            className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                        >
                                            <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">
                                                Day {entry.day}
                                            </td>
                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                {entry.title}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium
                          ${entry.type === "Tutorial" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" :
                                                        entry.type === "Vlog" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" :
                                                            entry.type === "Short" ? "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300" :
                                                                entry.type === "Review" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" :
                                                                    "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                                    }
                        `}>
                                                    {entry.type}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
