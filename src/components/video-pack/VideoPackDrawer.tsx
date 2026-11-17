"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaBoxOpen,
  FaCheck,
  FaCopy,
  FaFileDownload,
  FaPlus,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa";
import { useVideoPack } from "@/context/VideoPackContext";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useExport } from "@/hooks/useExport";
import { toast } from "@/components/ui/Toast";

const EASE = [0.22, 1, 0.36, 1] as const;

function SectionCopyButton({ text, label }: { text: string; label: string }) {
  const { copyText } = useExport();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text.trim()) return;
    const ok = await copyText(text);
    if (ok) {
      setCopied(true);
      toast.success(`Copied ${label}`);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!text.trim()}
      className="cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold text-slate-600 hover:text-purple-700 hover:bg-purple-50 border border-slate-200 bg-white transition-colors"
      aria-label={`Copy ${label}`}
    >
      {copied ? (
        <FaCheck className="w-2.5 h-2.5 text-emerald-600" aria-hidden="true" />
      ) : (
        <FaCopy className="w-2.5 h-2.5" aria-hidden="true" />
      )}
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

export default function VideoPackDrawer() {
  const {
    pack,
    isOpen,
    itemCount,
    closeDrawer,
    updatePack,
    selectTitle,
    saveTitleVariant,
    removeTitleVariant,
    removeTag,
    clearPack,
    exportBriefMarkdown,
  } = useVideoPack();

  const { copyText, downloadText } = useExport();
  const drawerRef = useFocusTrap<HTMLDivElement>(isOpen, { onEscape: closeDrawer });
  const [newVariant, setNewVariant] = useState("");
  const [newTagInput, setNewTagInput] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const chaptersText = pack.chapters.join("\n");
  const tagsCsv = pack.tags.join(", ");
  const tagCharCount = tagsCsv.length;

  const handleExportMarkdown = () => {
    const md = exportBriefMarkdown();
    const baseName = (pack.selectedTitle || pack.topic || "youtube-video-brief")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 50) || "youtube-video-brief";
    downloadText(`${baseName}.md`, md, "text/markdown");
    toast.success("Downloaded Video Brief (.md)");
  };

  const handleCopyFullBrief = async () => {
    const ok = await copyText(exportBriefMarkdown());
    if (ok) {
      toast.success("Copied complete Video Brief Markdown");
    }
  };

  const handleAddVariant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVariant.trim()) return;
    saveTitleVariant(newVariant, { select: !pack.selectedTitle.trim() });
    setNewVariant("");
  };

  const handleAddTags = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;
    const incoming = newTagInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (incoming.length === 0) return;
    updatePack({ tags: [...pack.tags, ...incoming] });
    setNewTagInput("");
  };

  const topicQuery = pack.topic.trim()
    ? `?topic=${encodeURIComponent(pack.topic.trim())}`
    : "";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80]">
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            onClick={closeDrawer}
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]"
          />

          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Active Video Pack"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: EASE }}
            className="absolute inset-y-0 right-0 w-full max-w-lg bg-white shadow-2xl border-l border-slate-200 flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/90 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <FaBoxOpen className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-black text-base text-slate-900 font-outfit truncate">
                      Active Video Pack
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[11px] font-black">
                      {itemCount} {itemCount === 1 ? "item" : "items"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">
                    {pack.updatedAt
                      ? `Saved locally · ${new Date(pack.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                      : "Stored locally in browser — no login required"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {itemCount > 0 && (
                  confirmClear ? (
                    <button
                      type="button"
                      onClick={() => {
                        clearPack();
                        setConfirmClear(false);
                        toast.info("Cleared Active Video Pack");
                      }}
                      className="cursor-pointer px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold transition-colors"
                    >
                      Confirm Clear
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmClear(true)}
                      aria-label="Clear Video Pack"
                      title="Clear Pack"
                      className="cursor-pointer p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <FaTrashAlt className="w-3.5 h-3.5" />
                    </button>
                  )
                )}

                <button
                  type="button"
                  onClick={closeDrawer}
                  aria-label="Close Video Pack Drawer"
                  className="cursor-pointer w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-purple-700 hover:border-purple-300 flex items-center justify-center transition-colors"
                >
                  <FaTimes className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Quick Tool Links */}
              <div className="rounded-2xl bg-purple-50/60 border border-purple-200/70 p-3.5">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-purple-800 mb-2">
                  Build Your Pack Across Tools
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: "Video Ideas", href: `/tools/youtube-video-ideas-generator${topicQuery}` },
                    { label: "Titles", href: `/tools/youtube-title-generator${topicQuery}` },
                    { label: "Description", href: `/tools/youtube-description-generator${topicQuery}` },
                    { label: "Tags", href: "/tools/youtube-tag-generator" },
                    { label: "Timestamps", href: "/tools/youtube-timestamp-generator" },
                  ].map((tool) => (
                    <Link
                      key={tool.label}
                      href={tool.href}
                      onClick={closeDrawer}
                      className="px-2.5 py-1 rounded-full bg-white border border-purple-200 text-purple-700 hover:bg-purple-600 hover:text-white text-[11px] font-bold transition-colors"
                    >
                      {tool.label} →
                    </Link>
                  ))}
                </div>
              </div>

              {/* 1. Topic */}
              <section className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="vp-topic" className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    Video Topic / Concept
                  </label>
                  <SectionCopyButton text={pack.topic} label="Topic" />
                </div>
                <input
                  id="vp-topic"
                  type="text"
                  value={pack.topic}
                  onChange={(e) => updatePack({ topic: e.target.value })}
                  placeholder="e.g., How to reach 4,000 watch hours faster in 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </section>

              {/* 2. Selected Title & Variants */}
              <section className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="vp-title" className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    Selected Title ({pack.selectedTitle.length} chars)
                  </label>
                  <SectionCopyButton text={pack.selectedTitle} label="Selected Title" />
                </div>
                <input
                  id="vp-title"
                  type="text"
                  value={pack.selectedTitle}
                  onChange={(e) => updatePack({ selectedTitle: e.target.value })}
                  placeholder="Pick or type your primary YouTube title..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                {pack.titleVariants.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-500 block">
                      Saved Title Variants ({pack.titleVariants.length}) — click to select
                    </span>
                    <div className="space-y-1.5">
                      {pack.titleVariants.map((variant) => {
                        const isSelected = variant === pack.selectedTitle;
                        return (
                          <div
                            key={variant}
                            className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl border text-xs transition-colors ${
                              isSelected
                                ? "bg-purple-50 border-purple-300 text-purple-950 font-bold"
                                : "bg-white border-slate-200 text-slate-700 hover:border-purple-200"
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => selectTitle(variant)}
                              className="cursor-pointer flex-1 text-left leading-snug"
                            >
                              {isSelected && (
                                <span className="inline-block mr-1.5 text-[10px] font-black uppercase text-purple-700">
                                  [Active]
                                </span>
                              )}
                              {variant}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeTitleVariant(variant)}
                              aria-label={`Remove title variant ${variant}`}
                              className="cursor-pointer p-1 text-slate-400 hover:text-rose-600 shrink-0"
                            >
                              <FaTimes className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <form onSubmit={handleAddVariant} className="flex gap-2">
                  <input
                    type="text"
                    value={newVariant}
                    onChange={(e) => setNewVariant(e.target.value)}
                    placeholder="Add a title A/B variant..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="submit"
                    className="cursor-pointer px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-800 text-xs font-bold inline-flex items-center gap-1"
                  >
                    <FaPlus className="w-2.5 h-2.5" /> Add
                  </button>
                </form>
              </section>

              {/* 3. SEO Description */}
              <section className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="vp-desc" className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    Description ({pack.description.length} / 5,000 chars)
                  </label>
                  <SectionCopyButton text={pack.description} label="Description" />
                </div>
                <textarea
                  id="vp-desc"
                  rows={5}
                  value={pack.description}
                  onChange={(e) => updatePack({ description: e.target.value })}
                  placeholder="Paste or save an SEO description from Description Generator..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </section>

              {/* 4. Chapters */}
              <section className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="vp-chapters" className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    Chapters ({pack.chapters.length})
                  </label>
                  <SectionCopyButton text={chaptersText} label="Chapters" />
                </div>
                <textarea
                  id="vp-chapters"
                  rows={4}
                  value={chaptersText}
                  onChange={(e) =>
                    updatePack({
                      chapters: e.target.value
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="00:00 Intro&#10;02:00 Main walkthrough"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-900 leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </section>

              {/* 5. Tags */}
              <section className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    Tags ({pack.tags.length}) ·{" "}
                    <span className={tagCharCount <= 500 ? "text-emerald-700" : "text-amber-700"}>
                      {tagCharCount}/500 chars
                    </span>
                  </span>
                  <SectionCopyButton text={tagsCsv} label="Tags (CSV)" />
                </div>

                {pack.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 max-h-36 overflow-y-auto">
                    {pack.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-800"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          aria-label={`Remove tag ${tag}`}
                          className="cursor-pointer text-slate-400 hover:text-rose-600"
                        >
                          <FaTimes className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <form onSubmit={handleAddTags} className="flex gap-2">
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    placeholder="Add comma-separated tags..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="submit"
                    className="cursor-pointer px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-800 text-xs font-bold inline-flex items-center gap-1"
                  >
                    <FaPlus className="w-2.5 h-2.5" /> Add
                  </button>
                </form>
              </section>

              {/* 6. Thumbnail Prompt */}
              <section className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="vp-thumb-prompt" className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    Thumbnail Concept / Prompt
                  </label>
                  <SectionCopyButton text={pack.thumbnailPrompt} label="Thumbnail Prompt" />
                </div>
                <textarea
                  id="vp-thumb-prompt"
                  rows={2}
                  value={pack.thumbnailPrompt}
                  onChange={(e) => updatePack({ thumbnailPrompt: e.target.value })}
                  placeholder="Visual hook or AI prompt for your thumbnail..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </section>

              {/* 7. Notes */}
              <section className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="vp-notes" className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    Production &amp; Strategy Notes
                  </label>
                  <SectionCopyButton text={pack.notes} label="Notes" />
                </div>
                <textarea
                  id="vp-notes"
                  rows={3}
                  value={pack.notes}
                  onChange={(e) => updatePack({ notes: e.target.value })}
                  placeholder="Hook notes, B-roll ideas, sponsor CTA reminders..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </section>
            </div>

            {/* Footer Actions */}
            <div className="px-5 py-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleExportMarkdown}
                className="btn-3d-primary cursor-pointer flex-1 py-3 px-4 rounded-xl font-black text-xs sm:text-sm inline-flex items-center justify-center gap-2"
              >
                <FaFileDownload className="w-3.5 h-3.5 text-emerald-300" aria-hidden="true" />
                <span>Export Complete Video Brief (.md)</span>
              </button>
              <button
                type="button"
                onClick={handleCopyFullBrief}
                className="btn-3d-glass cursor-pointer py-3 px-4 rounded-xl font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2"
              >
                <FaCopy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Copy Brief</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
