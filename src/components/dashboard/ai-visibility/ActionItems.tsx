import { ActionItem } from "@/lib/ai-visibility-data";
import { FaBolt, FaArrowRight, FaMagic } from "react-icons/fa";

interface ActionItemsProps {
    items: ActionItem[];
}

export default function ActionItems({ items }: ActionItemsProps) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <FaBolt className="text-red-500" />
                <span role="img" aria-label="party">🎉</span>
                Priority Actions
            </h2>

            <div className="space-y-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="group bg-red-50 dark:bg-red-900/10 p-5 rounded-xl border border-red-100 dark:border-red-900/30 hover:border-red-200 transition-all cursor-pointer"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-bold text-red-900 dark:text-red-200">
                                        {item.title}
                                    </h3>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.effort === 'Medium Effort' ? 'bg-blue-100 text-blue-600' :
                                            item.effort === 'Strategic' ? 'bg-purple-100 text-purple-600' :
                                                'bg-slate-200 text-slate-600'
                                        }`}>
                                        {item.effort}
                                    </span>
                                </div>
                                <p className="text-sm text-red-800/80 dark:text-red-300/80 mb-3 leading-relaxed">
                                    {item.description}
                                </p>
                                <div className="flex items-start gap-2 text-xs font-semibold text-red-700 dark:text-red-300">
                                    <FaMagic className="mt-0.5" />
                                    <span>{item.impact}</span>
                                </div>
                            </div>
                            <FaArrowRight className="text-red-300 group-hover:text-red-500 transition-colors" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
