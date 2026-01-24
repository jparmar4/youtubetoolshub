import { CompetitorData } from "@/lib/ai-visibility-data";
import { FaChartBar } from "react-icons/fa";

interface GapAnalysisProps {
    data: CompetitorData[];
}

export default function GapAnalysis({ data }: GapAnalysisProps) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm h-full">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                <FaChartBar className="text-purple-500" />
                Competitive Gap Analysis
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                How you compare to each competitor
            </p>

            <div className="space-y-8">
                {data.map((competitor, idx) => (
                    <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-slate-900 dark:text-white">{competitor.name}</h3>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${competitor.status === 'losing' ? 'bg-red-50 text-red-500' :
                                    competitor.status === 'winning' ? 'bg-green-50 text-green-500' :
                                        'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                                }`}>
                                {competitor.status === 'losing' ? competitor.diff + '%' :
                                    competitor.status === 'winning' ? '+' + competitor.diff + '%' :
                                        'Tied'}
                            </span>
                        </div>

                        <div className="space-y-4 mb-3">
                            {/* YOU Bar */}
                            <div className="flex items-center gap-4 text-xs">
                                <span className="w-8 text-slate-500 text-right">You</span>
                                <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
                                        style={{ width: `${competitor.you}%` }}
                                    />
                                </div>
                                <span className="w-8 text-right font-medium text-slate-700 dark:text-slate-300">{competitor.you}%</span>
                            </div>

                            {/* THEM Bar */}
                            <div className="flex items-center gap-4 text-xs">
                                <span className="w-8 text-slate-500 text-right">Them</span>
                                <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full"
                                        style={{ width: `${competitor.them}%` }}
                                    />
                                </div>
                                <span className="w-8 text-right font-medium text-slate-700 dark:text-slate-300">{competitor.them}%</span>
                            </div>
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            {competitor.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
