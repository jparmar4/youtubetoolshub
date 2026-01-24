import { QuickWin } from "@/lib/ai-visibility-data";
import { FaCheckCircle, FaBolt, FaArrowRight, FaMagic } from "react-icons/fa";

interface QuickWinsProps {
    wins: QuickWin[];
}

export default function QuickWins({ wins }: QuickWinsProps) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm h-full">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="text-green-500"><FaCheckCircle /></span>
                <span className="text-orange-500"><FaBolt /></span>
                Quick Wins
            </h2>

            <div className="space-y-4">
                {wins.map((win) => (
                    <div
                        key={win.id}
                        className={`group p-5 rounded-xl border transition-all cursor-pointer ${win.id === '1' ? 'bg-amber-50 border-amber-100' : 'bg-green-50 border-green-100'
                            }`}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className={`font-bold ${win.id === '1' ? 'text-amber-900' : 'text-green-900'
                                        }`}>
                                        {win.title}
                                    </h3>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${win.id === '1' ? 'bg-green-100 text-green-700' : 'bg-white text-green-700'
                                        }`}>
                                        {win.badge}
                                    </span>
                                </div>
                                <p className={`text-sm mb-3 leading-relaxed ${win.id === '1' ? 'text-amber-800/80' : 'text-green-800/80'
                                    }`}>
                                    {win.description}
                                </p>
                                <div className={`flex items-start gap-2 text-xs font-semibold ${win.id === '1' ? 'text-amber-700' : 'text-green-700'
                                    }`}>
                                    <FaMagic className="mt-0.5" />
                                    <span>{win.impact}</span>
                                </div>
                            </div>
                            <FaArrowRight className={`${win.id === '1' ? 'text-amber-300 group-hover:text-amber-500' : 'text-green-300 group-hover:text-green-500'
                                } transition-colors`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
