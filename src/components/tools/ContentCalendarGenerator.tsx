"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { FaCalendarAlt, FaDownload } from "react-icons/fa";
import { safeJSONParse, downloadAsFile, generateCSV } from "@/lib/utils";

const frequencyOptions = [
    { value: "daily", label: "Daily" },
    { value: "3x-week", label: "3x per Week" },
    { value: "2x-week", label: "2x per Week" },
    { value: "weekly", label: "Weekly" },
];

const faq = [
    {
        question: "How far ahead should I plan content?",
        answer: "Having at least 2-4 weeks of content planned helps maintain consistency. Our generator can create up to 30 days of content ideas at once."
    },
    {
        question: "Should I stick rigidly to my calendar?",
        answer: "Use it as a guide, not a strict schedule. Stay flexible enough to cover trending topics or respond to audience requests while maintaining your core content plan."
    },
    {
        question: "How do I export my calendar?",
        answer: "Click the 'Download as CSV' button to export your calendar. You can import this into Google Sheets, Excel, or any calendar app that supports CSV."
    },
];

const howTo = [
    "Enter your channel's niche or topic",
    "Select how often you plan to post",
    "Enter the number of days you want to plan for",
    "Click 'Generate Calendar' to create your content plan",
    "Review the generated calendar table",
    "Download as CSV to import into your preferred tool"
];

const seoContent = `Plan your YouTube content in advance with our AI-powered Content Calendar Generator. Create a structured posting schedule with video ideas for your niche. Export your calendar as CSV to import into Google Sheets, Notion, or any planning tool. Stay consistent and never run out of content ideas.`;

interface CalendarEntry {
    day: number;
    title: string;
    type: string;
}

export default function ContentCalendarGenerator() {
    const [niche, setNiche] = useState("");
    const [frequency, setFrequency] = useState("weekly");
    const [days, setDays] = useState("30");
    const [calendar, setCalendar] = useState<CalendarEntry[]>([]);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!niche.trim()) return;

        setLoading(true);
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tool: "calendar-generator",
                    niche,
                    frequency: frequencyOptions.find(f => f.value === frequency)?.label,
                    days: parseInt(days) || 30,
                }),
            });

            const data = await response.json();
            const parsed = safeJSONParse<CalendarEntry[]>(data.result, []);
            setCalendar(parsed);
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
