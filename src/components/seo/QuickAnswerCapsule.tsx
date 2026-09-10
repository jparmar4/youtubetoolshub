import React from "react";
import { FaBolt, FaCheckCircle } from "react-icons/fa";

export interface QuickAnswerCapsuleProps {
  /** The question or topic heading (e.g. "How much does YouTube pay per 1,000 views?") */
  question?: string;
  /** Direct, concise 30-50 word answer summary that AI engines can extract verbatim */
  answer: string;
  /** Key bullet points or fast facts */
  keyPoints?: string[];
  /** Badge text, defaults to "⚡ Quick Answer (2026 Summary)" */
  badgeText?: string;
  /** Citation or verification notice */
  verifiedNote?: string;
  /** Optional extra classes */
  className?: string;
}

export default function QuickAnswerCapsule({
  question,
  answer,
  keyPoints = [],
  badgeText = "Quick Answer (2026 Summary)",
  verifiedNote = "",
  className = "",
}: QuickAnswerCapsuleProps) {
  return (
    <aside
      className={`quick-answer relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-slate-900/40 p-5 md:p-6 backdrop-blur-md shadow-lg shadow-emerald-500/5 ${className}`}
      data-speakable="true"
      aria-label={question || badgeText}
    >
      {/* Top accent glow line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <FaBolt className="text-emerald-500 animate-pulse" />
          {badgeText}
        </span>
      </div>

      {question && (
        <h2 className="text-lg md:text-xl font-black text-slate-900 dark:text-white mb-2.5 tracking-tight">
          {question}
        </h2>
      )}

      <p className="text-slate-800 dark:text-slate-200 text-base md:text-lg leading-relaxed font-medium summary mb-4">
        {answer}
      </p>

      {keyPoints.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-emerald-500/20 key-facts key-takeaways">
          {keyPoints.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium"
            >
              <FaCheckCircle className="text-emerald-700 dark:text-emerald-400 mt-0.5 shrink-0 text-xs" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      {verifiedNote && (
        <p className="mt-3.5 text-[11px] text-slate-500 dark:text-slate-400 italic">
          ✓ {verifiedNote}
        </p>
      )}
    </aside>
  );
}
