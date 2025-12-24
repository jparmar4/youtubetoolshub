"use client";

import { useEffect, useState } from "react";
import { getHistory, deleteHistory, HistoryItem } from "@/lib/history";
import { FaHistory, FaTrash, FaCopy, FaImage, FaFileAlt, FaVideo, FaHashtag, FaCalendarAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "@/lib/utils";
import CopyButton from "@/components/ui/CopyButton";

export default function ToolHistory({ toolSlug }: { toolSlug: string }) {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHistory();
    }, [toolSlug]);

    const loadHistory = async () => {
        try {
            setLoading(true);
            // Fetch only history for this specific tool
            const data = await getHistory(toolSlug);
            setHistory(data);
        } catch (err) {
            console.error("Failed to load tool history", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            await deleteHistory(id);
            setHistory(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            console.error("Failed to delete item", err);
        }
    };

    if (loading) return <ToolHistorySkeleton />;
    if (history.length === 0) return null;

    return (
        <div className="mt-12 border-t border-gray-100 dark:border-gray-800 pt-10">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                    <FaHistory />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Recent Generations
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {history.slice(0, 6).map((item, index) => ( // Limit to 6 items for the tool view
                        <MiniHistoryCard
                            key={item.id}
                            item={item}
                            index={index}
                            onDelete={() => handleDelete(item.id)}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {history.length > 6 && (
                <div className="text-center mt-6">
                    <a href="/history" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                        View All History →
                    </a>
                </div>
            )}
        </div>
    );
}

function MiniHistoryCard({ item, index, onDelete }: { item: HistoryItem, index: number, onDelete: () => void }) {
    // Simplified content extraction
    const title = item.content.title || item.content.topic || item.content.prompt || "Untitled";

    // Description logic
    const getDescription = (content: any) => {
        if (content.description) return content.description;
        if (content.concept) return content.concept;
        if (content.script) return content.script.slice(0, 80) + "...";
        if (Array.isArray(content)) return `${content.length} items`;
        if (content.results && Array.isArray(content.results)) return `${content.results.length} results`;
        return JSON.stringify(content).slice(0, 60);
    };

    const isImage = item.tool_slug.includes('thumbnail') && (item.content.images || item.content.thumbnail_concept);
    const copyText = typeof item.content === 'string' ? item.content : JSON.stringify(item.content, null, 2);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
        >
            <div className="flex justify-between items-start mb-3">
                <span className="text-xs text-gray-400 font-medium">
                    {formatDate(item.created_at)}
                </span>
                <button
                    onClick={onDelete}
                    className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete"
                >
                    <FaTrash size={12} />
                </button>
            </div>

            <h4 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 text-sm">
                {title}
            </h4>

            {isImage && item.content.images && item.content.images[0] && (
                <div className="mb-3 rounded-lg overflow-hidden h-24 bg-gray-100 dark:bg-gray-700">
                    <img src={item.content.images[0]} alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
            )}

            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 h-8">
                {getDescription(item.content)}
            </p>

            <div className="flex justify-end">
                <CopyButton text={copyText} variant="icon" className="!p-1.5 h-7 w-7" />
            </div>
        </motion.div>
    );
}

function ToolHistorySkeleton() {
    return (
        <div className="mt-12 border-t border-gray-100 dark:border-gray-800 pt-10">
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-6 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-40 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
                ))}
            </div>
        </div>
    );
}
