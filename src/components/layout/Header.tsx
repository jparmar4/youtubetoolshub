"use client";

import { useState, useCallback, useEffect, memo, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaTimes, FaYoutube, FaSearch, FaChevronDown } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { toolMeta } from "@/config/tool-meta";
import UserMenu from "@/components/auth/UserMenu";
import HeaderCurrencyPicker from "@/components/layout/HeaderCurrencyPicker";
import HeaderSavedTools from "@/components/layout/HeaderSavedTools";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import HeaderMegaMenu from "@/components/layout/HeaderMegaMenu";
import MobileDrawer from "@/components/layout/MobileDrawer";
import { NavLink, DashboardLink } from "@/components/layout/NavLinks";
import { useScrolled } from "@/hooks/useScrolled";

const CommandPalette = dynamic(() => import("@/components/layout/CommandPalette"), {
  ssr: false,
});

// Shared premium motion curve (matches globals.css easing signature).
const EASE = [0.22, 1, 0.36, 1] as const;

function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled(12);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const megaMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaMenuOpenTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaMenuOpenedByHoverAtRef = useRef<number>(0);
  const isMegaMenuPinnedRef = useRef<boolean>(false);
  const toolsTriggerRef = useRef<HTMLButtonElement>(null);
  const megaPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    // Mobile drawer search button closes itself and opens the palette.
    const openPalette = () => setIsCommandOpen(true);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", openPalette);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", openPalette);
    };
  }, []);

  const cancelMegaMenuTimeout = useCallback(() => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
      megaMenuTimeoutRef.current = null;
    }
    if (megaMenuOpenTimeoutRef.current) {
      clearTimeout(megaMenuOpenTimeoutRef.current);
      megaMenuOpenTimeoutRef.current = null;
    }
  }, []);

  const handleMegaMenuAreaEnter = useCallback(() => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
      megaMenuTimeoutRef.current = null;
    }
    if (isMegaMenuOpen || megaMenuOpenTimeoutRef.current) return;
    megaMenuOpenTimeoutRef.current = setTimeout(() => {
      megaMenuOpenTimeoutRef.current = null;
      isMegaMenuPinnedRef.current = false;
      megaMenuOpenedByHoverAtRef.current = Date.now();
      setIsMegaMenuOpen(true);
    }, 130);
  }, [isMegaMenuOpen]);

  const handleMegaMenuAreaLeave = useCallback(() => {
    if (megaMenuOpenTimeoutRef.current) {
      clearTimeout(megaMenuOpenTimeoutRef.current);
      megaMenuOpenTimeoutRef.current = null;
    }
    // Keep the menu open when explicitly pinned via click until outside click / Escape / toggle.
    if (isMegaMenuPinnedRef.current) return;
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 260);
  }, []);

  const handleToolsTriggerClick = useCallback(() => {
    cancelMegaMenuTimeout();
    setIsMegaMenuOpen((prev) => {
      if (!prev) {
        isMegaMenuPinnedRef.current = true;
        megaMenuOpenedByHoverAtRef.current = 0;
        return true;
      }
      // If hover just auto-opened the menu right before the user clicked,
      // pin it open instead of unexpectedly closing on their click.
      if (
        !isMegaMenuPinnedRef.current &&
        megaMenuOpenedByHoverAtRef.current &&
        Date.now() - megaMenuOpenedByHoverAtRef.current < 650
      ) {
        isMegaMenuPinnedRef.current = true;
        megaMenuOpenedByHoverAtRef.current = 0;
        return true;
      }
      isMegaMenuPinnedRef.current = false;
      megaMenuOpenedByHoverAtRef.current = 0;
      return false;
    });
  }, [cancelMegaMenuTimeout]);

  useEffect(() => {
    return () => cancelMegaMenuTimeout();
  }, [cancelMegaMenuTimeout]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const closeMegaMenu = useCallback(() => {
    cancelMegaMenuTimeout();
    isMegaMenuPinnedRef.current = false;
    megaMenuOpenedByHoverAtRef.current = 0;
    setIsMegaMenuOpen(false);
  }, [cancelMegaMenuTimeout]);

  // Close mega menu when clicking anywhere outside the trigger button or panel.
  useEffect(() => {
    if (!isMegaMenuOpen) return;
    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node | null;
      if (!target) return;
      if (toolsTriggerRef.current?.contains(target)) return;
      if (megaPanelRef.current?.contains(target)) return;
      closeMegaMenu();
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isMegaMenuOpen, closeMegaMenu]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (isMenuOpen) return;
      if (isMegaMenuOpen) {
        closeMegaMenu();
        toolsTriggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, isMegaMenuOpen, closeMegaMenu]);

  useEffect(() => {
    if (!isMegaMenuOpen) {
      isMegaMenuPinnedRef.current = false;
      megaMenuOpenedByHoverAtRef.current = 0;
    }
  }, [isMegaMenuOpen]);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (isMegaMenuOpen) {
      setIsMegaMenuOpen(false);
    }
    if (isMenuOpen) setIsMenuOpen(false);
  }

  if (pathname?.startsWith("/embed")) {
    return null;
  }

  return (
    <>
      {/* Announcement bar scrolls away with the page — only the nav bar pins. */}
      <AnnouncementBar />

      {/* Backdrop lives outside the sticky z-50 header so it never covers or blocks the nav bar */}
      <AnimatePresence>
        {isMegaMenuOpen && (
          <motion.div
            key="mega-backdrop"
            aria-hidden="true"
            onClick={closeMegaMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="fixed inset-0 z-40 bg-slate-950/25 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <div className="sticky top-0 z-50">
        <header className="relative">
          <div className="relative z-50">
            <div className="h-[2px] w-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-emerald-500" />

            <div
              className={`transition-all duration-300 border-b ${
                scrolled
                  ? "bg-white/85 backdrop-blur-2xl border-slate-200 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.22)]"
                  : "bg-white/95 backdrop-blur-xl border-slate-200/90 shadow-[0_6px_28px_-12px_rgba(15,23,42,0.08)]"
              }`}
            >
              <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8" aria-label="Main navigation">
                <div
                  className={`flex items-center justify-between gap-2 sm:gap-3 transition-all duration-300 ${
                    scrolled ? "h-14" : "h-16"
                  }`}
                >
                  {/* 1. Brand Lockup */}
                  <div className="shrink-0 flex items-center">
                    <Link href="/" className="flex items-center gap-2.5 group whitespace-nowrap">
                      <div
                        className={`rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_12px_-2px_rgba(124,58,237,0.45)] group-hover:scale-105 group-hover:-rotate-3 transition-all duration-200 shrink-0 ${
                          scrolled ? "w-8 h-8" : "w-9 h-9"
                        }`}
                      >
                        <FaYoutube className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-extrabold text-base sm:text-[17px] text-slate-950 tracking-tight group-hover:text-purple-700 transition-colors leading-tight font-heading">
                          {siteConfig.name}
                        </span>
                        <span
                          className={`hidden xl:inline-block text-[11px] font-semibold text-slate-600 leading-tight transition-opacity duration-300 ${
                            scrolled ? "opacity-0" : "opacity-100"
                          }`}
                        >
                          Creator Studio · {toolMeta.length} Free Tools
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* 2. Clean Primary Navigation (Desktop) */}
                  <div className="hidden lg:flex items-center self-stretch gap-0.5 xl:gap-1 shrink-0">
                    <div
                      className="relative flex items-center self-stretch"
                      onMouseEnter={handleMegaMenuAreaEnter}
                      onMouseLeave={handleMegaMenuAreaLeave}
                    >
                      <button
                        type="button"
                        ref={toolsTriggerRef}
                        onClick={handleToolsTriggerClick}
                        className={`h-9 inline-flex items-center gap-1.5 px-2.5 xl:px-3.5 rounded-full text-[12.5px] xl:text-[13px] font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                          isMegaMenuOpen || pathname?.startsWith("/tools")
                            ? "bg-gradient-to-b from-purple-50 to-purple-100/70 text-purple-800 border-purple-300/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_2px_6px_-2px_rgba(124,58,237,0.25)]"
                            : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 border-transparent"
                        }`}
                        aria-expanded={isMegaMenuOpen}
                        aria-haspopup="true"
                      >
                        <span>Tools</span>
                        <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-purple-600 text-white leading-none">
                          {toolMeta.length}
                        </span>
                        <FaChevronDown
                          aria-hidden="true"
                          className={`w-2.5 h-2.5 text-slate-500 transition-transform duration-200 ${
                            isMegaMenuOpen ? "rotate-180 text-purple-700" : ""
                          }`}
                        />
                      </button>
                    </div>

                  <NavLink
                    href="/tools/youtube-earnings-calculator"
                    dotColor="bg-emerald-500"
                    isActive={Boolean(pathname?.includes("earnings"))}
                  >
                    Earnings
                  </NavLink>

                  <NavLink
                    href="/resources/youtube-cpm-rates"
                    isActive={Boolean(pathname?.includes("cpm"))}
                  >
                    CPM Rates
                  </NavLink>

                  <NavLink
                    href="/resources"
                    isActive={pathname === "/resources"}
                  >
                    Resources
                  </NavLink>

                  <div className="hidden xl:inline-flex">
                    <NavLink
                      href="/blog"
                      isActive={Boolean(pathname?.startsWith("/blog"))}
                    >
                      Guides
                    </NavLink>
                  </div>

                  <NavLink
                    href="/pricing"
                    isActive={pathname === "/pricing"}
                  >
                    Pricing
                  </NavLink>

                  <DashboardLink isActive={pathname === "/dashboard"} />
                </div>

                {/* 3. Right Utilities Cluster */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsCommandOpen(true)}
                    className="hidden xl:inline-flex h-9 items-center gap-2 px-3 rounded-full bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-purple-300 text-slate-700 text-xs font-medium transition-all duration-200 cursor-pointer shadow-2xs w-52 group shrink-0"
                  >
                    <FaSearch aria-hidden="true" className="w-3 h-3 text-purple-600 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate text-slate-600 text-left flex-1">
                      Search tools...
                    </span>
                    <kbd aria-hidden="true" className="inline-flex items-center text-[11px] font-bold text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded shrink-0">
                      ⌘K
                    </kbd>
                  </button>

                  <div className="hidden sm:block">
                    <HeaderCurrencyPicker />
                  </div>

                  <div className="hidden sm:block">
                    <HeaderSavedTools />
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsCommandOpen(true)}
                    className="xl:hidden w-9 h-9 inline-flex items-center justify-center rounded-full bg-white text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors border border-slate-200/90 shadow-2xs shrink-0 cursor-pointer"
                    aria-label="Open search palette"
                  >
                    <FaSearch className="w-3.5 h-3.5" />
                  </button>

                  <UserMenu />

                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="lg:hidden w-9 h-9 inline-flex items-center justify-center rounded-full bg-white text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors border border-slate-200/90 shadow-2xs shrink-0 cursor-pointer"
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-nav-drawer"
                  >
                    {isMenuOpen ? <FaTimes className="w-3.5 h-3.5" /> : <FaBars className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </nav>
            </div>
          </div>

          {/* Mega menu — sits at z-40 inside the z-50 sticky container (below navbar, above backdrop) */}
          <AnimatePresence>
            {isMegaMenuOpen && (
              <motion.div
                key="mega-panel"
                ref={megaPanelRef}
                initial={{ opacity: 0, y: -8, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.985 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="absolute inset-x-0 top-full z-40"
              >
                <HeaderMegaMenu
                  onClose={closeMegaMenu}
                  onMouseEnter={handleMegaMenuAreaEnter}
                  onMouseLeave={handleMegaMenuAreaLeave}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      </div>

      {/* Mobile slide-over drawer */}
      <MobileDrawer open={isMenuOpen} onClose={closeMenu} />

      {isCommandOpen && (
        <CommandPalette
          isOpen={isCommandOpen}
          onClose={() => setIsCommandOpen(false)}
        />
      )}
    </>
  );
}

export default memo(Header);
