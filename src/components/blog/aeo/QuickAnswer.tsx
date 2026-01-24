import React from "react";
import { FaBolt } from "react-icons/fa";

interface QuickAnswerProps {
    children: React.ReactNode;
}

export default function QuickAnswer({ children }: QuickAnswerProps) {
    return (
        <div className="quick-answer my-8 border-l-4 border-purple-600 bg-purple-50 rounded-r-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-600 p-1.5 rounded-full">
                    <FaBolt className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 uppercase tracking-wide">
                    Quick Answer
                </h3>
            </div>
            <div className="text-slate-800 text-lg leading-relaxed font-medium">
                {children}
            </div>
        </div>
    );
}
