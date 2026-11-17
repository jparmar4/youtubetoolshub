"use client";

import { useState } from "react";
import { ToolContextProvider } from "@/components/tools/ToolContext";
import ToolComponentRenderer from "@/components/tools/ToolComponentRenderer";

export interface EmbeddedToolOption {
  slug: string;
  label: string;
}

export default function AlternativeToolEmbed({
  tools,
}: {
  tools: EmbeddedToolOption[];
}) {
  const [activeSlug, setActiveSlug] = useState(tools[0]?.slug || "");

  if (!activeSlug) return null;

  return (
    <div className="space-y-5">
      {tools.length > 1 && (
        <div
          className="inline-flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200"
          role="tablist"
          aria-label="Embedded tool selector"
        >
          {tools.map((item) => (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={activeSlug === item.slug}
              onClick={() => setActiveSlug(item.slug)}
              className={`cursor-pointer px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeSlug === item.slug
                  ? "bg-white text-purple-700 shadow-xs border border-purple-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <ToolContextProvider value={{ hideHeader: true }}>
        <ToolComponentRenderer slug={activeSlug} />
      </ToolContextProvider>
    </div>
  );
}
