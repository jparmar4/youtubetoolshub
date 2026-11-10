"use client";

import { useState, useRef, useEffect, memo } from "react";
import Link from "next/link";
import { FaStar, FaTimes, FaExternalLinkAlt, FaClock, FaTrashAlt } from "react-icons/fa";
import { useFavoriteTools } from "@/lib/favorites";
import { useRecentTools } from "@/lib/recent-tools";
import { getToolMetaBySlug, toolMeta } from "@/config/tool-meta";
import { toast } from "@/components/ui/Toast";

function HeaderSavedTools() {
  const { favorites, removeFavorite, addFavorite, isFavorite } = useFavoriteTools();
  const { recentSlugs, clear: clearRecents } = useRecentTools();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"pinned" | "recent">("pinned");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const savedToolObjects = favorites
    .map((slug) => getToolMetaBySlug(slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const recentToolObjects = recentSlugs
    .map((slug) => getToolMetaBySlug(slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <div ref={containerRef} className="relative inline-block text-left shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`h-9 inline-flex items-center gap-1.5 px-3 rounded-full border text-xs font-bold transition-all shadow-[inset_0_1px_0_0_#fff,0_1px_2px_rgba(15,23,42,0.05)] focus:outline-none focus:ring-2 focus:ring-amber-500/40 whitespace-nowrap ${
          favorites.length > 0
            ? "bg-amber-50/90 border-amber-200/90 text-amber-900 hover:bg-amber-100/90"
            : "bg-white border-slate-200/90 text-slate-700 hover:bg-slate-50 hover:border-purple-300"
        }`}
        aria-expanded={isOpen}
      >
        <FaStar className="w-3.5 h-3.5 text-amber-500 shrink-0" aria-hidden="true" />
        <span className="sr-only xl:not-sr-only">Saved</span>
        <span className="sr-only"> tools and recents</span>
        {favorites.length > 0 && (
          <span className="px-1.5 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-black leading-none">
            {favorites.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-84 rounded-2xl bg-white shadow-2xl border border-slate-200/90 py-3 z-50 animate-fade-in-up">
          {/* Segmented Tab Controls */}
          <div className="px-3 pb-2 border-b border-slate-100 flex items-center justify-between gap-2">
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("pinned")}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg font-bold transition-all ${
                  activeTab === "pinned"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <FaStar className="w-3 h-3 text-amber-500" />
                <span>Pinned</span>
                <span className="text-[10px] px-1 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  {favorites.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("recent")}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg font-bold transition-all ${
                  activeTab === "recent"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <FaClock className="w-3 h-3 text-purple-600" />
                <span>Recent</span>
                {recentToolObjects.length > 0 && (
                  <span className="text-[10px] px-1 py-0.5 rounded-full bg-purple-100 text-purple-800">
                    {recentToolObjects.length}
                  </span>
                )}
              </button>
            </div>

            {activeTab === "recent" && recentToolObjects.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  clearRecents();
                  toast.info("Cleared recent tools history.");
                }}
                className="text-[10px] text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
                title="Clear history"
              >
                <FaTrashAlt className="w-2.5 h-2.5" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {/* List Content */}
          <div className="py-2 max-h-72 overflow-y-auto divide-y divide-slate-100">
            {activeTab === "pinned" ? (
              savedToolObjects.length === 0 ? (
                <div className="p-4 text-center">
                  <p className="text-xs text-slate-500 mb-2">No tools pinned yet!</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Click the <FaStar className="inline w-3 h-3 text-amber-400" /> star on any tool
                    page or card to pin it here for instant 1-click access.
                  </p>
                </div>
              ) : (
                savedToolObjects.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <div
                      key={tool.slug}
                      className="flex items-center justify-between gap-3 px-3.5 py-2 hover:bg-slate-50 transition-colors group"
                    >
                      <Link
                        href={`/tools/${tool.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2.5 flex-1 min-w-0"
                      >
                        <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 text-xs">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-bold text-slate-800 group-hover:text-purple-600 truncate transition-colors">
                            {tool.name}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">
                            {tool.shortDescription}
                          </p>
                        </div>
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          removeFavorite(tool.slug);
                          toast.info(`Unpinned "${tool.name}"`);
                        }}
                        className="p-1 text-slate-300 hover:text-red-500 rounded-md transition-colors flex-shrink-0"
                        aria-label={`Unpin ${tool.name}`}
                        title="Unpin"
                      >
                        <FaTimes className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )
            ) : recentToolObjects.length === 0 ? (
              <div className="p-4 text-center">
                <p className="text-xs text-slate-500 mb-2">No recent tools viewed yet!</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  As you browse creator tools, your most recently visited tools will appear here
                  automatically.
                </p>
              </div>
            ) : (
              recentToolObjects.map((tool) => {
                const Icon = tool.icon;
                const favorited = isFavorite(tool.slug);

                return (
                  <div
                    key={tool.slug}
                    className="flex items-center justify-between gap-3 px-3.5 py-2 hover:bg-slate-50 transition-colors group"
                  >
                    <Link
                      href={`/tools/${tool.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 flex-1 min-w-0"
                    >
                      <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 text-xs">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-bold text-slate-800 group-hover:text-purple-600 truncate transition-colors">
                          {tool.name}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {tool.shortDescription}
                        </p>
                      </div>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        if (favorited) {
                          removeFavorite(tool.slug);
                          toast.info(`Unpinned "${tool.name}"`);
                        } else {
                          addFavorite(tool.slug);
                          toast.star(`Pinned "${tool.name}"!`);
                        }
                      }}
                      className={`p-1 rounded-md transition-colors flex-shrink-0 ${
                        favorited
                          ? "text-amber-500 hover:text-amber-600"
                          : "text-slate-300 hover:text-amber-400"
                      }`}
                      aria-label={favorited ? "Unpin tool" : "Pin tool"}
                      title={favorited ? "Pinned" : "Pin to favorites"}
                    >
                      <FaStar className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          <div className="px-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Fast 1-click launch</span>
            <Link
              href="/tools"
              onClick={() => setIsOpen(false)}
              className="text-purple-600 font-bold hover:underline flex items-center gap-1"
            >
              <span>Browse All {toolMeta.length}</span>
              <FaExternalLinkAlt className="w-2.5 h-2.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(HeaderSavedTools);
