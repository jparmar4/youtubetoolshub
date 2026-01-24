import { BrandStrength } from "@/lib/ai-visibility-data";
import { FaTrophy, FaCheckCircle, FaDownload } from "react-icons/fa";

interface BrandStrengthProps {
    data: BrandStrength;
}

export default function BrandStrengthComponent({ data }: BrandStrengthProps) {
    return (
        <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100 shadow-sm h-full relative overflow-hidden">

            <div className="absolute top-0 right-0 p-4">
                <button className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                    <FaDownload /> Export Data
                </button>
            </div>

            <div className="text-center mb-8 pt-2">
                <h2 className="text-xl font-bold text-slate-900 flex items-center justify-center gap-2 mb-2">
                    <FaTrophy className="text-slate-600" />
                    AI Brand Strength
                </h2>
                <p className="text-xs text-slate-500 mb-6">Composite score based on visibility, sentiment, share of voice, and ranking</p>

                <div className="mb-2">
                    <span className="text-6xl font-bold text-orange-500">{data.score}</span>
                    <span className="text-2xl font-medium text-slate-400"> / {data.total}</span>
                </div>
                <p className="text-sm text-slate-500">YouTube Tools Hub&apos;s overall AI brand strength</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                    <div className="text-xs text-slate-500 mb-1">Visibility</div>
                    <div className="text-xl font-bold text-slate-900">{data.visibility}%</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                    <div className="text-xs text-slate-500 mb-1">Sentiment</div>
                    <div className="text-xl font-bold text-slate-900">{data.sentiment}%</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                    <div className="text-xs text-slate-500 mb-1">Share of Voice</div>
                    <div className="text-xl font-bold text-slate-900">{data.shareOfVoice}%</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                    <div className="text-xs text-slate-500 mb-1">Ranking</div>
                    <div className="text-xl font-bold text-slate-900">{data.ranking}%</div>
                </div>
            </div>

            <div className="space-y-4 mb-8">
                <div className="text-xs font-bold text-slate-500 mb-2">Top Competitors</div>
                {[
                    { name: 'TubeBuddy', score: 33, color: 'bg-orange-400' },
                    { name: 'VidIQ', score: 33, color: 'bg-orange-400' },
                    { name: 'InVideo', score: 22, color: 'bg-red-500' },
                    { name: 'YouTube Tool...', score: 39, color: 'bg-orange-600' }
                ].map((comp, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-xs font-medium">
                        <span className="w-20 text-slate-600 truncate">{comp.name}</span>
                        <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${comp.color}`} style={{ width: `${comp.score}%` }} />
                        </div>
                        <span className="w-8 text-right text-slate-600">{comp.score}</span>
                    </div>
                ))}
            </div>

            <hr className="border-amber-200 mb-6" />

            <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                        <div className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">AI Visibility Health</div>
                        <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                            <FaCheckCircle className="text-blue-500" />
                            {data.healthStatus}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            {data.healthDescription}
                        </p>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center text-lg font-bold text-slate-900">
                            {data.healthScore}
                        </div>
                        <span className="text-xs text-slate-400 mt-2">Health Score</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="rounded-xl p-4 bg-white border border-slate-200 text-center">
                    <div className="text-2xl font-bold text-orange-500 mb-1">{data.summary.visibilityScore}%</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Visibility Score</div>
                </div>
                <div className="rounded-xl p-4 bg-white border border-slate-200 text-center">
                    <div className="text-2xl font-bold text-blue-500 mb-1">#{data.summary.marketRank}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Market Rank</div>
                </div>
                <div className="rounded-xl p-4 bg-white border border-slate-200 text-center">
                    <div className="text-2xl font-bold text-purple-500 mb-1">{data.summary.actionItems}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Action Items</div>
                </div>
                <div className="rounded-xl p-4 bg-white border border-slate-200 text-center">
                    <div className="text-2xl font-bold text-green-500 mb-1">{data.summary.brandMentions}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Brand Mentions</div>
                </div>
            </div>

        </div>
    );
}
