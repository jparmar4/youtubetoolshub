"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { tools } from "@/config/tools";
import {
  FaSearch,
  FaTimes,
  FaCalculator,
  FaImage,
  FaRobot,
  FaChartLine,
  FaBook,
  FaArrowRight,
} from "react-icons/fa";

interface SearchItem {
  id: string;
  title: string;
  description: string;
  href: string;
  category: "calculator" | "thumbnail" | "seo" | "ai" | "resource" | "other";
  categoryLabel: string;
  badge?: string;
  isTier1?: boolean;
}

const STATIC_RESOURCES: SearchItem[] = [
  {
    id: "res-cpm",
    title: "YouTube CPM Rates by Country 2026",
    description: "Full benchmark data table for 50+ markets (US, UK, CA, AU, DE, IN)",
    href: "/resources/youtube-cpm-rates",
    category: "resource",
    categoryLabel: "Resources & Data",
    badge: "2026 Data",
    isTier1: true,
  },
  {
    id: "res-stats",
    title: "YouTube Creator Statistics 2026",
    description: "Subscriber benchmarks, monetization percentages, and average views",
    href: "/resources/youtube-creator-statistics",
    category: "resource",
    categoryLabel: "Resources & Data",
    badge: "Industry Stats",
  },
  {
    id: "res-monetization",
    title: "YouTube Monetization Guide 2026",
    description: "YPP requirements, AdSense setup, tax forms, and revenue streams",
    href: "/resources/youtube-monetization-guide",
    category: "resource",
    categoryLabel: "Resources & Data",
  },
  {
    id: "res-algorithm",
    title: "YouTube Algorithm Blueprint 2026",
    description: "How the recommendation engine ranks long-form videos and Shorts",
    href: "/resources/youtube-algorithm-guide",
    category: "resource",
    categoryLabel: "Resources & Data",
  },
  {
    id: "res-tubebuddy",
    title: "Free TubeBuddy Alternative Comparison",
    description: "Compare free browser tools vs paid extensions without account required",
    href: "/tools/vs/tubebuddy",
    category: "resource",
    categoryLabel: "Comparisons",
    badge: "100% Free",
  },
  {
    id: "res-vidiq",
    title: "Free VidIQ Alternative Comparison",
    description: "Keyword research, tag generation, and channel audit comparison",
    href: "/tools/vs/vidiq",
    category: "resource",
    categoryLabel: "Comparisons",
    badge: "100% Free",
  },
];

export default function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Map all tools into uniform SearchItems
  const allItems = useMemo<SearchItem[]>(() => {
    const toolItems: SearchItem[] = tools.map((t) => {
      let category: SearchItem["category"] = "other";
      let categoryLabel = "Tools";
      const isTier1 =
        t.slug.includes("earnings") ||
        t.slug.includes("sponsorship") ||
        t.slug.includes("tax") ||
        t.slug.includes("llc") ||
        t.slug.includes("valuation") ||
        t.slug.includes("ads-cost") ||
        t.slug.includes("watch-hours") ||
        t.slug.includes("shorts-vs-long-form") ||
        t.slug.includes("milestone");

      if (t.category === "analytics-earnings" || t.slug.includes("calculator")) {
        category = "calculator";
        categoryLabel = "Calculators & Money";
      } else if (t.category === "thumbnail-media") {
        category = "thumbnail";
        categoryLabel = "Thumbnails & Media";
      } else if (t.category === "seo-metadata") {
        category = "seo";
        categoryLabel = "SEO & Metadata";
      } else if (t.isAI) {
        category = "ai";
        categoryLabel = "AI Generators";
      }

      return {
        id: `tool-${t.slug}`,
        title: t.name,
        description: t.shortDescription || t.description.slice(0, 90),
        href: `/tools/${t.slug}`,
        category,
        categoryLabel,
        badge: isTier1 ? "Tier 1 High-RPM" : t.isAI ? "AI Powered" : undefined,
        isTier1,
      };
    });

    return [...toolItems, ...STATIC_RESOURCES];
  }, []);

  // Filter items by query and active tab
  const filteredItems = useMemo(() => {
    let results = allItems;

    if (activeTab === "calculators") {
      results = results.filter((i) => i.category === "calculator" || i.isTier1);
    } else if (activeTab === "media") {
      results = results.filter((i) => i.category === "thumbnail");
    } else if (activeTab === "seo") {
      results = results.filter((i) => i.category === "seo");
    } else if (activeTab === "ai") {
      results = results.filter((i) => i.category === "ai");
    } else if (activeTab === "resources") {
      results = results.filter((i) => i.category === "resource");
    }

    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return results.slice(0, 16);
    }

    return results
      .filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(trimmed);
        const descMatch = item.description.toLowerCase().includes(trimmed);
        const categoryMatch = item.categoryLabel.toLowerCase().includes(trimmed);
        return titleMatch || descMatch || categoryMatch;
      })
      .slice(0, 24);
  }, [allItems, query, activeTab]);

  const handleClose = useCallback(() => {
    setQuery("");
    setSelectedIndex(0);
    setActiveTab("all");
    onClose();
  }, [onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard navigation inside palette
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? Math.max(0, filteredItems.length - 1) : prev - 1,
        );
      } else if (e.key === "Enter" && filteredItems.length > 0) {
        e.preventDefault();
        const selected = filteredItems[selectedIndex];
        if (selected) {
          router.push(selected.href);
          handleClose();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    },
    [filteredItems, selectedIndex, router, handleClose],
  );

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(
      `[data-index="${selectedIndex}"]`,
    ) as HTMLElement | null;
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Universal Tool & Resource Search"
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 md:p-20 overflow-y-auto animate-fade-in"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Palette Modal */}
      <div
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col z-10 my-auto sm:my-0"
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 sm:px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <FaSearch className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search 43+ free YouTube tools, CPM rates, tax calculators..."
            className="w-full bg-transparent text-slate-900 text-base sm:text-lg placeholder-slate-400 focus:outline-none"
            aria-autocomplete="list"
          />
          {query ? (
            <button
              onClick={() => {
                setQuery("");
                setSelectedIndex(0);
              }}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg ml-2"
              aria-label="Clear search"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md ml-2">
              ESC
            </kbd>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 border-b border-slate-100 bg-white overflow-x-auto text-xs no-scrollbar">
          {[
            { id: "all", label: "All Items" },
            { id: "calculators", label: "Calculators (Tier 1)" },
            { id: "media", label: "Thumbnails & Media" },
            { id: "seo", label: "SEO & Titles" },
            { id: "ai", label: "AI Tools" },
            { id: "resources", label: "Resources & CPM" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="max-h-[380px] sm:max-h-[440px] overflow-y-auto divide-y divide-slate-100 p-2"
        >
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <FaSearch className="w-8 h-8 mx-auto text-slate-300 mb-3" />
              <p className="font-semibold text-slate-700">No matching tools found</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for "earnings", "cpm", "thumbnail", "sponsorship", or "tags"
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  data-index={index}
                  onClick={() => {
                    router.push(item.href);
                    handleClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? "bg-purple-50/90 text-purple-950 border border-purple-200/60 shadow-sm"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                        item.category === "calculator"
                          ? "bg-emerald-100 text-emerald-700"
                          : item.category === "thumbnail"
                          ? "bg-blue-100 text-blue-700"
                          : item.category === "seo"
                          ? "bg-amber-100 text-amber-700"
                          : item.category === "ai"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-pink-100 text-pink-700"
                      }`}
                    >
                      {item.category === "calculator" && <FaCalculator className="w-4 h-4" />}
                      {item.category === "thumbnail" && <FaImage className="w-4 h-4" />}
                      {item.category === "seo" && <FaChartLine className="w-4 h-4" />}
                      {item.category === "ai" && <FaRobot className="w-4 h-4" />}
                      {item.category === "resource" && <FaBook className="w-4 h-4" />}
                      {item.category === "other" && <FaArrowRight className="w-4 h-4" />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm sm:text-base truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              item.isTier1
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="hidden sm:inline-block text-[11px] font-medium text-slate-400">
                      {item.categoryLabel}
                    </span>
                    <FaArrowRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected
                          ? "text-purple-600 translate-x-0.5"
                          : "text-slate-300"
                      }`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-semibold text-slate-600">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-semibold text-slate-600">
                ↓
              </kbd>{" "}
              Navigate
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-semibold text-slate-600">
                ↵
              </kbd>{" "}
              Open
            </span>
          </div>
          <div className="text-[11px] text-purple-700 font-semibold">
            {tools.length} Free Tools & Data Hub
          </div>
        </div>
      </div>
    </div>
  );
}
