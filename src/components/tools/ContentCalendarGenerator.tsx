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
import { saveHistory } from "@/lib/history";

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

            increment("youtube-content-calendar-generator");

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

                // Save to Cloud History
                const historyContent = Array.isArray(parsed) ? { calendar: parsed } : parsed;
                try {
                    await saveHistory('youtube-content-calendar-generator', {
                        niche,
                        frequency,
                        days,
                        result: historyContent
                    });
                } catch (error) {
                    console.error("Failed to save to cloud history:", error);
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
            slug="youtube-content-calendar-generator"
            description="Plan your content schedule with AI-generated video ideas"
        >
            <div className="space-y-6">
                <UsageBanner type="ai" toolSlug="youtube-content-calendar-generator" />
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
                            <h3 className="text-lg font-semibold text-slate-900">
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
                                    <tr className="bg-slate-100">
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 rounded-tl-lg">
                                            Day
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                                            Video Title
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 rounded-tr-lg">
                                            Type
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {calendar.map((entry, i) => (
                                        <tr
                                            key={i}
                                            className="border-b border-slate-100 hover:bg-slate-50"
                                        >
                                            <td className="px-4 py-3 text-slate-900 font-medium">
                                                Day {entry.day}
                                            </td>
                                            <td className="px-4 py-3 text-slate-700">
                                                {entry.title}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium
                          ${entry.type === "Tutorial" ? "bg-blue-100 text-blue-700" :
                                                        entry.type === "Vlog" ? "bg-purple-100 text-purple-700" :
                                                            entry.type === "Short" ? "bg-pink-100 text-emerald-700" :
                                                                entry.type === "Review" ? "bg-green-100 text-green-700" :
                                                                    "bg-slate-100 text-slate-700"
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
