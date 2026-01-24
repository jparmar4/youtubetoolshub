import { AIResponse } from "@/lib/ai-visibility-data";
import { FaCommentAlt } from "react-icons/fa";

interface AIQuotesProps {
    quotes: AIResponse[];
}

export default function AIQuotes({ quotes }: AIQuotesProps) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm h-full">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                <FaCommentAlt className="text-teal-500" />
                What AI Says About You
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Direct quotes from AI responses mentioning your brand
            </p>

            <div className="space-y-4">
                {quotes.map((quote) => (
                    <div key={quote.id} className={`p-4 rounded-xl border-l-4 ${quote.sentiment === 'Positive' ? 'bg-green-50 border-green-500 dark:bg-green-900/10' :
                            quote.sentiment === 'Negative' ? 'bg-red-50 border-red-500 dark:bg-red-900/10' :
                                'bg-slate-50 border-slate-300 dark:bg-slate-800'
                        }`}>
                        <div className="flex items-start gap-3">
                            <p className="text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed flex-1">
                                {quote.text}
                            </p>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                            <span className="text-xs font-semibold px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                                {quote.source}
                            </span>
                            <span className="text-xs font-semibold px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                                {quote.type}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
