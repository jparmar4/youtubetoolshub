"use client";

import { useEffect, useState, useRef } from "react";
import { getHistory, deleteHistory, HistoryItem } from "@/lib/history";
import { FaHistory, FaTrash, FaTimes, FaCopy, FaCheck } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function getString(value: unknown): string | undefined {
    return typeof value === "string" ? value : undefined;
}

function getStringArray(value: unknown): string[] {
    if (!Array.isArray(value)) return [];
    return value.filter((v): v is string => typeof v === "string");
}

export default function ToolHistory({ toolSlug }: { toolSlug: string }) {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                setLoading(true);
                const data = await getHistory(toolSlug);
                setHistory(data);
            } catch (err) {
                console.error("Failed to load tool history", err);
            } finally {
                setLoading(false);
            }
        };
        loadHistory();
    }, [toolSlug]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            await deleteHistory(id);
            setHistory(prev => prev.filter(item => item.id !== id));
            if (selectedItem?.id === id) {
                setSelectedItem(null);
            }
        } catch (err) {
            console.error("Failed to delete item", err);
        }
    };

    if (loading) return <ToolHistorySkeleton />;
    if (history.length === 0) return null;

    return (
        <>
            <div className="mt-12 border-t border-slate-200 pt-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <FaHistory />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        Recent Generations
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {history.slice(0, 6).map((item, index) => (
                            <MiniHistoryCard
                                key={item.id}
                                item={item}
                                index={index}
                                onClick={() => setSelectedItem(item)}
                                onDelete={(e) => {
                                    e.stopPropagation();
                                    handleDelete(item.id);
                                }}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {history.length > 6 && (
                    <div className="text-center mt-6">
                        <a href="/history" className="text-sm font-medium text-blue-600 hover:underline">
                            View All History →
                        </a>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <HistoryDetailModal
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                        onDelete={() => {
                            handleDelete(selectedItem.id);
                        }}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

function MiniHistoryCard({
    item,
    index,
    onClick,
    onDelete
}: {
    item: HistoryItem;
    index: number;
    onClick: () => void;
    onDelete: (e: React.MouseEvent) => void;
}) {
    const content = isRecord(item.content) ? item.content : {};
    const title =
        getString(content.title) ||
        getString(content.topic) ||
        getString(content.prompt) ||
        "Untitled";

    const getDescription = (value: unknown) => {
        if (typeof value === "string") return value;
        if (Array.isArray(value)) return `${value.length} items`;
        if (!isRecord(value)) return "Click to view details";
        if (value.description) return String(value.description);
        if (value.concept) return String(value.concept);
        if (value.script) return String(value.script).slice(0, 80) + "...";
        if (value.results && Array.isArray(value.results)) return `${value.results.length} results`;
        return "Click to view details";
    };

    const images = getStringArray(content.images);
    const isImage = item.tool_slug.includes("thumbnail") && (images.length > 0 || !!getString(content.thumbnail_concept));

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.05 }}
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClick();
                }
            }}
            className="group relative bg-white rounded-xl p-5 border border-slate-200 hover:shadow-lg hover:border-blue-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all cursor-pointer"
        >
            <div className="flex justify-between items-start mb-3">
                <span className="text-xs text-slate-400 font-medium">
                    {formatDate(item.created_at)}
                </span>
                <button
                    type="button"
                    onClick={onDelete}
                    onKeyDown={(e) => e.stopPropagation()}
                    aria-label={`Delete history item: ${title}`}
                    className="text-slate-400 hover:text-emerald-600 transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 p-2 -m-1 rounded focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                    <FaTrash size={12} aria-hidden="true" />
                </button>
            </div>

            <h4 className="font-bold text-slate-900 mb-2 line-clamp-2 text-sm">
                {title}
            </h4>

            {isImage && images[0] && (
                <div className="relative h-24 mb-3 rounded-lg overflow-hidden bg-slate-100">
                    <Image
                        src={images[0]}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>
            )}

            <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                {getDescription(item.content)}
            </p>

            <div className="flex justify-end">
                <span className="text-xs text-blue-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity font-medium">
                    Click to View →
                </span>
            </div>
        </motion.div>
    );
}

function HistoryDetailModal({
    item,
    onClose,
    onDelete
}: {
    item: HistoryItem;
    onClose: () => void;
    onDelete: () => void;
}) {
    const [copied, setCopied] = useState(false);
    const content = item.content;
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handleKeyDown);
        closeRef.current?.focus();
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Format content nicely
    const renderContent = () => {
        if (typeof content === 'string') {
            return (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{content}</p>
                </div>
            );
        }

        if (!isRecord(content)) {
            return (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{JSON.stringify(content, null, 2)}</p>
                </div>
            );
        }

        const title = getString(content.title);
        const concept = getString(content.concept);
        const description = getString(content.description);
        const thumbnailConcept = getString(content.thumbnail_concept);
        const difficulty = getString(content.difficulty);
        const angle = getString(content.angle);
        const images = getStringArray(content.images);
        const score = typeof content.score === "number" ? content.score : Number(content.score);

        // Render structured content
        return (
            <div className="space-y-4">
                {title && (
                    <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Title</span>
                        <div className="mt-1 bg-slate-50 rounded-lg p-3 flex justify-between items-start gap-2">
                            <p className="text-slate-800 font-medium">{title}</p>
                            <button
                                type="button"
                                onClick={() => handleCopy(title)}
                                aria-label="Copy title"
                                className="text-slate-400 hover:text-blue-500 transition-colors flex-shrink-0 p-1 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                <FaCopy size={14} aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                )}

                {concept && (
                    <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Concept</span>
                        <div className="mt-1 bg-slate-50 rounded-lg p-3 flex justify-between items-start gap-2">
                            <p className="text-slate-800">{concept}</p>
                            <button
                                type="button"
                                onClick={() => handleCopy(concept)}
                                aria-label="Copy concept"
                                className="text-slate-400 hover:text-blue-500 transition-colors flex-shrink-0 p-1 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                <FaCopy size={14} aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                )}

                {description && (
                    <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description</span>
                        <div className="mt-1 bg-slate-50 rounded-lg p-3 flex justify-between items-start gap-2">
                            <p className="text-slate-800 whitespace-pre-wrap">{description}</p>
                            <button
                                type="button"
                                onClick={() => handleCopy(description)}
                                aria-label="Copy description"
                                className="text-slate-400 hover:text-blue-500 transition-colors flex-shrink-0 p-1 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                <FaCopy size={14} aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                )}

                {thumbnailConcept && (
                    <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thumbnail Concept</span>
                        <div className="mt-1 bg-slate-50 rounded-lg p-3 flex justify-between items-start gap-2">
                            <p className="text-slate-800 italic">&quot;{thumbnailConcept}&quot;</p>
                            <button
                                type="button"
                                onClick={() => handleCopy(thumbnailConcept)}
                                aria-label="Copy thumbnail concept"
                                className="text-slate-400 hover:text-blue-500 transition-colors flex-shrink-0 p-1 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                <FaCopy size={14} aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                )}

                {Number.isFinite(score) && score > 0 && (
                    <div className="flex items-center gap-4">
                        <div>
                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</span>
                            <p className={`text-2xl font-black mt-1 ${score >= 90 ? "text-green-500" :
                                score >= 80 ? "text-blue-500" : "text-yellow-500"
                                }`}>
                                {score}
                            </p>
                        </div>
                        {difficulty && (
                            <div>
                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Difficulty</span>
                                <p className="text-sm font-medium mt-1 text-gray-700 dark:text-gray-300">{difficulty}</p>
                            </div>
                        )}
                        {angle && (
                            <div>
                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Angle</span>
                                <p className="text-sm font-medium mt-1 text-gray-700 dark:text-gray-300">{angle}</p>
                            </div>
                        )}
                    </div>
                )}

                {images.length > 0 && (
                    <div>
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Images</span>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            {images.map((img: string, i: number) => (
                                <div key={i} className="relative aspect-video rounded-lg overflow-hidden bg-slate-100">
                                    <Image
                                        src={img}
                                        alt=""
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const fullText = (() => {
        if (typeof content === "string") return content;
        if (!isRecord(content)) return JSON.stringify(content, null, 2);
        return [getString(content.title), getString(content.concept), getString(content.description), getString(content.thumbnail_concept)]
            .filter((v): v is string => typeof v === "string" && v.length > 0)
            .join("\n\n");
    })();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="history-detail-title"
                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden"
            >
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                    <h3 id="history-detail-title" className="font-bold text-slate-900">History Details</h3>
                    <button
                        ref={closeRef}
                        type="button"
                        onClick={onClose}
                        aria-label="Close history details"
                        className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        <FaTimes aria-hidden="true" />
                    </button>
                </div>

                <div className="p-4 overflow-y-auto max-h-[60vh]">
                    {renderContent()}
                </div>

                <div className="flex items-center justify-between p-4 border-t border-slate-100 bg-slate-50">
                    <button
                        onClick={onDelete}
                        className="text-sm text-emerald-500 hover:text-emerald-600 font-medium flex items-center gap-1"
                    >
                        <FaTrash size={12} /> Delete
                    </button>
                    <button
                        onClick={() => handleCopy(fullText)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${copied
                            ? "bg-green-500 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                    >
                        {copied ? <><FaCheck /> Copied!</> : <><FaCopy /> Copy All</>}
                    </button>
                </div>
            </motion.div>
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
