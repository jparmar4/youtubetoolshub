"use client";

import { useState } from "react";
import { FaCode, FaTimes, FaCheck, FaCopy, FaExternalLinkAlt } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface EmbedModalProps {
  slug: string;
  toolName: string;
}

export default function EmbedModal({ slug, toolName }: EmbedModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [height, setHeight] = useState("600");

  // Traps Tab inside the dialog, closes on Escape, and restores focus on close.
  const dialogRef = useFocusTrap(isOpen, { onEscape: () => setIsOpen(false) });

  const embedUrl = `${siteConfig.url}/embed/tools/${slug}`;
  const toolUrl = `${siteConfig.url}/tools/${slug}`;

  const embedSnippet = `<iframe src="${embedUrl}" width="100%" height="${height}" frameborder="0" style="border:none;border-radius:12px;width:100%;max-width:100%;overflow:hidden;" loading="lazy" title="${toolName}"></iframe>\n<p style="font-size:12px;text-align:center;color:#64748b;margin-top:6px;font-family:sans-serif;">Tool powered by <a href="${toolUrl}" target="_blank" rel="noopener" style="color:#7c3aed;font-weight:600;text-decoration:none;">YouTube Tools Hub</a></p>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-purple-200 bg-purple-50 text-purple-700 text-xs font-bold hover:bg-purple-100 transition-colors shadow-sm"
        title="Embed this calculator or tool on your own website"
      >
        <FaCode className="w-3.5 h-3.5" />
        <span>Embed Tool</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div
            ref={dialogRef}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                  Free Website Widget
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Embed {toolName} on Your Website
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Add this live, mobile-responsive creator tool to your blog, agency site, or portal for free.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full text-slate-500 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>

            {/* Customization */}
            <div className="my-5 space-y-4">
              <div className="flex items-center gap-4 text-xs">
                <label className="font-semibold text-slate-700">
                  Height (px):
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-xs font-mono font-bold"
                  min="400"
                  max="1200"
                />
                <span className="text-slate-500">Width is automatically 100% responsive</span>
              </div>

              {/* Code Snippet Box */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-600">
                    HTML Embed Code
                  </span>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700"
                  >
                    {copied ? (
                      <>
                        <FaCheck className="text-green-500" />
                        <span className="text-green-600">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <FaCopy />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-slate-900 text-purple-300 text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all border border-slate-800 leading-relaxed">
                  {embedSnippet}
                </pre>
              </div>

              {/* CMS Integration Instructions */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1.5">
                <p className="font-bold text-slate-800">How to add to your CMS:</p>
                <ul className="list-disc pl-4 space-y-1 text-[11px] leading-relaxed">
                  <li><strong>WordPress:</strong> Add a <em>Custom HTML</em> block and paste the snippet.</li>
                  <li><strong>Webflow / Squarespace:</strong> Insert an <em>Embed</em> element.</li>
                  <li><strong>Ghost / Notion / HTML:</strong> Paste directly into raw HTML or an embed card.</li>
                </ul>
              </div>
            </div>

            {/* Live Preview Button & Close */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <a
                href={embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-purple-600 transition-colors"
              >
                <span>Open widget preview in new tab</span>
                <FaExternalLinkAlt className="text-[11px]" />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 transition-colors shadow-md shadow-purple-600/20"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
