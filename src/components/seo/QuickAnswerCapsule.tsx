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
      className={`quick-answer relative overflow-hidden rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50 via-white to-teal-50/70 p-5 md:p-6 shadow-[inset_0_1px_0_0_#fff,0_3px_0_0_rgba(167,243,208,0.55),0_12px_28px_-10px_rgba(16,185,129,0.18)] ${className}`}
      data-speakable="true"
      aria-label={question || badgeText}
    >
      {/* Top accent glow line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <FaBolt className="text-emerald-500 animate-pulse" />
          {badgeText}
        </span>
      </div>

      {question && (
        <h2 className="text-lg md:text-xl font-black text-slate-900 mb-2.5 tracking-tight">
          {question}
        </h2>
      )}

      <p className="text-slate-800 text-base md:text-lg leading-relaxed font-medium summary mb-4">
        {answer}
      </p>

      {keyPoints.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-emerald-500/20 key-facts key-takeaways">
          {keyPoints.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-xs md:text-sm text-slate-700 font-medium"
            >
              <FaCheckCircle className="text-emerald-700 mt-0.5 shrink-0 text-xs" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      {verifiedNote && (
        <p className="mt-3.5 text-[11px] text-slate-500 italic">
          ✓ {verifiedNote}
        </p>
      )}
    </aside>
  );
}
