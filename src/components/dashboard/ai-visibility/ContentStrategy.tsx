import { ContentIdea } from "@/lib/ai-visibility-data";
import { FaLightbulb, FaChartBar, FaQuoteRight, FaFileAlt } from "react-icons/fa";

interface ContentStrategyProps {
    ideas: ContentIdea[];
}

export default function ContentStrategy({ ideas }: ContentStrategyProps) {

    const getIcon = (id: string) => {
        if (id === '4') return <FaFileAlt className="text-blue-500" />;
        if (id === '5') return <FaQuoteRight className="text-green-500" />;
        return <FaChartBar className="text-purple-500" />;
    };

    const getBgColor = (id: string) => {
        if (id === '4') return 'bg-blue-100 text-blue-500';
        if (id === '5') return 'bg-green-100 text-green-500';
        return 'bg-purple-100 text-purple-500';
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm mt-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                <FaLightbulb className="text-amber-500" />
                Content Strategy
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Recommended content to boost AI visibility
            </p>

            <div className="space-y-4">
                {ideas.map((idea) => (
                    <div key={idea.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white transition-colors">
                        <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getBgColor(idea.id)}`}>
                                {getIcon(idea.id)}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-slate-900">{idea.title}</h3>
                                    {idea.priority && (
                                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                                            {idea.priority}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-slate-500 mb-3">{idea.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {idea.tags.map(tag => (
                                        <span key={tag} className="text-xs px-2 py-1 rounded bg-white border border-slate-200 text-slate-600 font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
