"use client";

import { useMemo, useState } from "react";
import { FaSearch, FaTimes, FaMagic, FaLayerGroup } from "react-icons/fa";
import { toolMeta } from "@/config/tool-meta";
import { ToolCard } from "@/components/ui/Card";

const CATEGORY_TABS = [
  { id: "all", label: "All Tools" },
  { id: "analytics-earnings", label: "Analytics & Earnings" },
  { id: "seo-metadata", label: "SEO & Metadata" },
  { id: "thumbnail-media", label: "Thumbnail & Media" },
  { id: "channel-growth", label: "Channel Growth" },
  { id: "utility-fun", label: "Utilities" },
] as const;

export default function ToolsFilterBar() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [aiOnly, setAiOnly] = useState(false);

  const countsByCategory = useMemo(() => {
    const counts: Record<string, number> = { all: toolMeta.length };
    for (const tool of toolMeta) {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
    }
    return counts;
  }, []);

  const isFiltering =
    query.trim().length > 0 || selectedCategory !== "all" || aiOnly;

  const filteredTools = useMemo(() => {
    if (!isFiltering) return [];
    const q = query.trim().toLowerCase();
    return toolMeta.filter((tool) => {
      if (selectedCategory !== "all" && tool.category !== selectedCategory) {
        return false;
      }
      if (aiOnly && !tool.isAI) {
        return false;
      }
      if (!q) return true;
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.slug.toLowerCase().includes(q)
      );
    });
  }, [isFiltering, query, selectedCategory, aiOnly]);

  const resetFilters = () => {
    setQuery("");
    setSelectedCategory("all");
    setAiOnly(false);
  };

  return (
    <section aria-label="Filter tools directory" className="mb-12">
      <div className="card-3d rounded-3xl p-4 sm:p-6">
        <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between mb-4">
          <div className="relative flex-1">
            <FaSearch
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search all ${toolMeta.length} YouTube tools (e.g., thumbnail, sponsorship, CPM, tags)...`}
              aria-label="Search YouTube tools"
              className="w-full h-11 pl-11 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search query"
                className="cursor-pointer absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
              >
                <FaTimes className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setAiOnly((v) => !v)}
            aria-pressed={aiOnly}
            className={`cursor-pointer inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all shrink-0 ${
              aiOnly
                ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:border-purple-300 hover:text-purple-700"
            }`}
          >
            <FaMagic className="w-3.5 h-3.5" />
            <span>AI Tools Only</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
            <FaLayerGroup className="w-3.5 h-3.5 text-purple-600" />
            Category:
          </span>
          {CATEGORY_TABS.map((tab) => {
            const active = selectedCategory === tab.id;
            const count = countsByCategory[tab.id] ?? 0;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                aria-pressed={active}
                className={`cursor-pointer px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  active
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 hover:text-purple-700"
                }`}
              >
                {tab.label} ({count})
              </button>
            );
          })}

          {isFiltering && (
            <button
              type="button"
              onClick={resetFilters}
              className="cursor-pointer ml-auto text-xs font-bold text-purple-700 hover:text-purple-900 hover:underline px-2 py-1"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {isFiltering && (
        <div className="mt-6 animate-fade-in">
          <div className="flex items-center justify-between gap-4 mb-5">
            <p className="text-sm font-semibold text-slate-700">
              Showing{" "}
              <span className="font-black text-slate-900">
                {filteredTools.length}
              </span>{" "}
              matching {filteredTools.length === 1 ? "tool" : "tools"}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="cursor-pointer text-xs font-bold text-slate-600 hover:text-purple-700"
            >
              Show full directory ↓
            </button>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.slug}
                  title={tool.name}
                  description={tool.shortDescription}
                  href={`/tools/${tool.slug}`}
                  isAI={tool.isAI}
                  category={tool.category}
                />
              ))}
            </div>
          ) : (
            <div className="card-3d rounded-2xl p-8 text-center">
              <p className="text-base font-bold text-slate-900 mb-1">
                No matching tools found
              </p>
              <p className="text-sm text-slate-600 mb-4">
                Try another keyword or clear your active category filter.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="cursor-pointer btn-3d-primary px-5 py-2.5 rounded-xl text-sm font-bold"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
