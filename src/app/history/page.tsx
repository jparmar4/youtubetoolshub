"use client";

import { useEffect, useState } from "react";
import { getHistory, deleteHistory, HistoryItem } from "@/lib/history";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { FaHistory, FaSearch, FaFilter, FaTrash, FaCopy, FaImage, FaFileAlt, FaVideo, FaHashtag, FaCalendarAlt, FaCheck, FaExclamationCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Select from "@/components/ui/Select";
import { formatDate } from "@/lib/utils";
import CopyButton from "@/components/ui/CopyButton";

export default function HistoryPage() {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [toolFilter, setToolFilter] = useState("all");

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            setLoading(true);
            const data = await getHistory();
            setHistory(data);
        } catch (err) {
            console.error("Failed to load history", err);
            setError("Failed to load history. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm("Are you sure you want to delete this item?")) return;

        try {
            await deleteHistory(id);
            setHistory(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            console.error("Failed to delete item", err);
            alert("Failed to delete item");
        }
    };

    const filteredHistory = history.filter(item => {
        const matchesSearch = searchTerm === "" ||
            JSON.stringify(item.content).toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tool_slug.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesTool = toolFilter === "all" || item.tool_slug === toolFilter;

        return matchesSearch && matchesTool;
    });

    // Extract unique tools for filter dropdown
    const toolOptions = [
        { value: "all", label: "All Tools" },
        ...Array.from(new Set(history.map(item => item.tool_slug))).map(slug => ({
            value: slug,
            label: slug.replace('youtube-', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        }))
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-purple-100/50 via-blue-50/30 to-transparent dark:from-purple-900/20 dark:via-blue-900/10 dark:to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto space-y-8 relative z-10">

                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4"
                        >
                            <FaHistory /> Cloud History
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2"
                        >
                            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Creative Vault</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl"
                        >
                            Access, manage, and reuse your AI-generated content from any device.
                        </motion.p>
                    </div>

                    {/* Controls */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto"
                    >
                        <div className="relative flex-1 sm:w-64">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search history..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                            />
                        </div>
                        <div className="relative w-full sm:w-64">
                            <Select
                                options={toolOptions}
                                value={toolFilter}
                                onChange={(e) => setToolFilter(e.target.value)}
                                icon={<FaFilter />}
                                className="!py-3"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Content Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-64 rounded-2xl bg-white dark:bg-slate-900 p-6 animate-pulse border border-slate-200 dark:border-slate-800">
                                <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded mb-4" />
                                <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded mb-4" />
                                <div className="space-y-2">
                                    <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                                    <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                                    <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredHistory.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-24 text-center"
                    >
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500 dark:text-blue-400">
                            {searchTerm || toolFilter !== "all" ? <FaSearch size={32} /> : <FaHistory size={32} />}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            {searchTerm || toolFilter !== "all" ? "No matches found" : "Your vault is empty"}
                        </h3>
                        <p className="text-slate-500 max-w-md mx-auto mb-8">
                            {searchTerm || toolFilter !== "all"
                                ? "Try adjusting your search terms or filters to find what you're looking for."
                                : "Start generating amazing content with our AI tools to verify it here automatically."}
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {filteredHistory.map((item, index) => (
                                <HistoryCard
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    onDelete={(e) => handleDelete(item.id, e)}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}

function HistoryCard({ item, index, onDelete }: { item: HistoryItem, index: number, onDelete: (e: React.MouseEvent) => void }) {
    // Determine content type and display logic
    const isImage = item.tool_slug.includes('thumbnail') && (item.content.images || item.content.thumbnail_concept);
    const title = item.content.title || item.content.topic || item.content.prompt || "Untitled Generation";

    // Smart description extractor
    const getDescription = (content: any) => {
        if (content.description) return content.description;
        if (content.concept) return content.concept;
        if (content.hook) return content.hook;
        if (content.script) return content.script.slice(0, 150) + "...";
        if (Array.isArray(content)) return `${content.length} items generated`;
        if (content.results && Array.isArray(content.results)) return `${content.results.length} results generated`;
        if (content.calendar && Array.isArray(content.calendar)) return `${content.calendar.length} day calendar`;
        return JSON.stringify(content).slice(0, 100);
    };

    const getIcon = () => {
        if (item.tool_slug.includes('thumbnail')) return <FaImage />;
        if (item.tool_slug.includes('video')) return <FaVideo />;
        if (item.tool_slug.includes('calendar')) return <FaCalendarAlt />;
        if (item.tool_slug.includes('hashtag') || item.tool_slug.includes('tag')) return <FaHashtag />;
        return <FaFileAlt />;
    };

    const copyText = typeof item.content === 'string' ? item.content : JSON.stringify(item.content, null, 2);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.05 }}
            className="group relative flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:border-purple-500/30 transition-all duration-300 backdrop-blur-sm"
        >
            <div>
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                        {getIcon()}
                        <span>{item.tool_slug.split('-')[1]}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                        {formatDate(item.created_at)}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight line-clamp-2 group-hover:text-blue-500 transition-colors">
                    {title}
                </h3>

                {/* Image Preview (if applicable) */}
                {isImage && item.content.images && item.content.images[0] && (
                    <div className="mb-4 rounded-xl overflow-hidden aspect-video relative bg-slate-100 dark:bg-slate-800">
                        <img
                            src={item.content.images[0]}
                            alt="Generated content"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                )}

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 font-medium leading-relaxed">
                    {getDescription(item.content)}
                </p>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 mt-auto">
                <CopyButton text={copyText} variant="icon" className="text-slate-400 hover:text-blue-500" />

                <button
                    onClick={onDelete}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                    title="Delete item"
                >
                    <FaTrash size={14} />
                </button>
            </div>
        </motion.div>
    );
}
