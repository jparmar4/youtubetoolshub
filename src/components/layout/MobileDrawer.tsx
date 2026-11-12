"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaSearch,
  FaArrowRight,
  FaDollarSign,
  FaTags,
  FaImage,
  FaRocket,
  FaTools,
} from "react-icons/fa";
import { toolMeta } from "@/config/tool-meta";
import { countryCPMData } from "@/lib/cpm-data";
import HeaderCurrencyPicker from "./HeaderCurrencyPicker";
import HeaderSavedTools from "./HeaderSavedTools";
import { DashboardLink } from "./NavLinks";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const MOBILE_CATEGORY_HUBS = [
  { href: "/tools/analytics-tools", label: "Monetization", icon: FaDollarSign, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { href: "/tools/seo-tools", label: "SEO & Tags", icon: FaTags, color: "text-purple-600 bg-purple-50 border-purple-200" },
  { href: "/tools/thumbnail-tools", label: "Thumbnails", icon: FaImage, color: "text-pink-600 bg-pink-50 border-pink-200" },
  { href: "/tools/channel-tools", label: "Growth", icon: FaRocket, color: "text-sky-600 bg-sky-50 border-sky-200" },
  { href: "/tools/utility-tools", label: "Utilities", icon: FaTools, color: "text-amber-600 bg-amber-50 border-amber-200" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Slide-over navigation drawer for < lg screens. Rendered inside the Header
 * (always mounted; the panel itself only mounts while open) with an animated
 * backdrop, body scroll lock, and focus trap.
 */
export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const drawerRef = useFocusTrap<HTMLDivElement>(open, { onEscape: onClose });

  // Lock page scroll behind the drawer.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div key="mobile-drawer" className="fixed inset-0 z-[70] lg:hidden">
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]"
          />
          <motion.div
            id="mobile-nav-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: EASE }}
            className="absolute inset-y-0 right-0 w-[86%] max-w-sm bg-white shadow-2xl border-l border-slate-200/80 overflow-y-auto"
          >
            {/* Drawer header */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                Menu
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-white text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors border border-slate-200/90 shadow-2xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="px-4 py-4">
              {/* Currency + saved tools for phones */}
              <div className="flex sm:hidden items-center justify-between gap-2 mb-3">
                <HeaderCurrencyPicker />
                <HeaderSavedTools />
              </div>

              {/* Search */}
              <div className="mb-4">
                <MobileSearchButton onClose={onClose} />
              </div>

              {/* Category Shortcuts */}
              <div className="mb-4">
                <p className="px-2 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Tool Categories
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/tools"
                    onClick={onClose}
                    className="col-span-2 flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-purple-700 text-white text-xs font-bold transition-colors"
                  >
                    <span>Browse All {toolMeta.length} Tools</span>
                    <FaArrowRight className="w-3 h-3" />
                  </Link>
                  {MOBILE_CATEGORY_HUBS.map((hub, index) => {
                    const HubIcon = hub.icon;
                    return (
                      <Link
                        key={hub.href}
                        href={hub.href}
                        onClick={onClose}
                        className="animate-menu-item flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800 hover:bg-purple-50 hover:border-purple-200 transition-colors"
                        style={{ animationDelay: `${Math.min(index * 30, 150)}ms` }}
                      >
                        <span className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 ${hub.color}`}>
                          <HubIcon className="w-3 h-3" />
                        </span>
                        <span className="truncate">{hub.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Flagship & Resources */}
              <div className="mb-3">
                <p className="px-2 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Flagship &amp; Resources
                </p>
                <div className="flex flex-col gap-1">
                  <Link
                    href="/tools/youtube-earnings-calculator"
                    onClick={onClose}
                    className="px-3.5 py-2.5 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-700 font-semibold transition-colors flex items-center justify-between text-sm"
                  >
                    <span>YouTube Earnings Calculator</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                      Tier-1
                    </span>
                  </Link>

                  <Link
                    href="/tools/youtube-thumbnail-downloader"
                    onClick={onClose}
                    className="px-3.5 py-2.5 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-700 font-semibold transition-colors flex items-center justify-between text-sm"
                  >
                    <span>Thumbnail Downloader</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-pink-50 border border-pink-200 text-pink-700">
                      HD
                    </span>
                  </Link>

                  <Link
                    href="/resources/youtube-cpm-rates"
                    onClick={onClose}
                    className="px-3.5 py-2.5 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-700 font-semibold transition-colors flex items-center justify-between text-sm"
                  >
                    <span>YouTube CPM Rates 2026</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700">
                      {countryCPMData.length} Markets
                    </span>
                  </Link>

                  <Link
                    href="/blog"
                    onClick={onClose}
                    className="px-3.5 py-2.5 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-700 font-semibold transition-colors text-sm"
                  >
                    Creator Growth Guides
                  </Link>

                  <Link
                    href="/pricing"
                    onClick={onClose}
                    className="px-3.5 py-2.5 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-700 font-semibold transition-colors text-sm"
                  >
                    Pricing
                  </Link>

                  <div className="grid grid-cols-2 gap-1 pt-1">
                    <Link
                      href="/tools/vs/tubebuddy"
                      onClick={onClose}
                      className="px-3.5 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
                    >
                      vs. TubeBuddy
                    </Link>
                    <Link
                      href="/tools/vs/vidiq"
                      onClick={onClose}
                      className="px-3.5 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
                    >
                      vs. VidIQ
                    </Link>
                  </div>

                  <DashboardLink onClick={onClose} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/**
 * Drawer search button — needs to close the drawer and open the command
 * palette. The palette state lives in Header, so this dispatches a window
 * event Header listens for (kept decoupled to avoid prop drilling).
 */
function MobileSearchButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={() => {
        onClose();
        window.dispatchEvent(new CustomEvent("open-command-palette"));
      }}
      className="w-full min-h-11 flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
    >
      <span className="flex items-center gap-2">
        <FaSearch className="text-purple-600" />
        Search {toolMeta.length} tools &amp; {countryCPMData.length} CPM markets...
      </span>
      <span className="text-[11px] bg-white border border-slate-200 px-1.5 py-0.5 rounded font-bold text-slate-600">
        ⌘K
      </span>
    </button>
  );
}
