import React from 'react';
import { FaListUl } from 'react-icons/fa';

export interface TocHeading {
  id: string;
  text: string;
}

export interface TableOfContentsProps {
  headings: TocHeading[];
  className?: string;
}

export default function TableOfContents({ headings, className = '' }: TableOfContentsProps) {
  if (!headings || headings.length < 2) return null;

  return (
    <nav
      className={`rounded-2xl border border-purple-100 dark:border-slate-800 bg-gradient-to-br from-purple-50/60 via-slate-50 to-white dark:from-slate-900/60 dark:to-slate-800/60 p-6 shadow-sm my-8 ${className}`}
      aria-label="Table of Contents"
    >
      <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-purple-100 dark:border-slate-700">
        <FaListUl className="text-purple-600 dark:text-purple-400 text-base" />
        <h2 className="text-base md:text-lg font-black text-slate-900 dark:text-white tracking-tight m-0">
          In This Article (Table of Contents)
        </h2>
      </div>

      <ol className="space-y-2.5 m-0 p-0 list-none">
        {headings.map((h, i) => (
          <li key={h.id} className="flex items-start gap-2.5 text-sm md:text-base leading-snug">
            <span className="font-bold text-purple-600 dark:text-purple-400 text-xs mt-0.5 shrink-0 select-none">
              {(i + 1).toString().padStart(2, '0')}.
            </span>
            <a
              href={`#${h.id}`}
              className="text-slate-700 dark:text-slate-300 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors hover:underline underline-offset-2"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
