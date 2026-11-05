"use client";

import { useState, useRef, useEffect, memo } from "react";
import Link from "next/link";
import { FaStar, FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import { useFavoriteTools } from "@/lib/favorites";
import { getToolBySlug } from "@/config/tools";
import { toast } from "@/components/ui/Toast";

function HeaderSavedTools() {
  const { favorites, removeFavorite } = useFavoriteTools();
  const [isOpen, setIsOpen] = useState(false);
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
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-bold transition-all shadow-2xs hover:shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
          favorites.length > 0
            ? "bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 hover:bg-amber-100/80"
            : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80"
        }`}
        aria-label="View saved favorite tools"
        aria-expanded={isOpen}
      >
        <FaStar className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
        <span className="hidden sm:inline">Saved</span>
        {favorites.length > 0 && (
          <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black">
            {favorites.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200/90 dark:border-slate-800/90 py-3 z-50 animate-fade-in-up">
          <div className="px-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <FaStar className="w-3.5 h-3.5 text-amber-500" />
              Pinned Quick Tools
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              {favorites.length} pinned
            </span>
          </div>

          <div className="py-2 max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {savedToolObjects.length === 0 ? (
              <div className="p-4 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  No tools pinned yet!
                </p>
                <p className="text-[11px] text-slate-400">
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
                    className="flex items-center justify-between gap-3 px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    <Link
                      href={`/tools/${tool.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 flex-1 min-w-0"
                    >
                      <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0 text-xs">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 truncate transition-colors">
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
                      className="p-1 text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 rounded-md transition-colors flex-shrink-0"
                      aria-label={`Unpin ${tool.name}`}
                      title="Unpin"
                    >
                      <FaTimes className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {savedToolObjects.length > 0 && (
            <div className="px-4 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Fast 1-click launch</span>
              <Link
                href="/tools"
                onClick={() => setIsOpen(false)}
                className="text-purple-600 dark:text-purple-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>Browse All</span>
                <FaExternalLinkAlt className="w-2.5 h-2.5" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(HeaderSavedTools);
