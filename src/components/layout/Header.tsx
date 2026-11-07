"use client";

import { useState, useCallback, useEffect, memo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaYoutube,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import { siteConfig } from "@/config/site";
import UserMenu from "@/components/auth/UserMenu";
import { useSession } from "next-auth/react";
import CommandPalette from "@/components/layout/CommandPalette";
import HeaderMegaMenu from "@/components/layout/HeaderMegaMenu";
import HeaderCurrencyPicker from "@/components/layout/HeaderCurrencyPicker";
import HeaderSavedTools from "@/components/layout/HeaderSavedTools";
import AnnouncementBar from "@/components/layout/AnnouncementBar";

const NavLink = memo(function NavLink({
  href,
  children,
  onClick,
  isActive,
  badge,
  badgeColor = "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white",
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  badge?: string;
  badgeColor?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative h-8 inline-flex items-center gap-1.5 px-3 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
        isActive
          ? "bg-white text-purple-700 shadow-xs border border-slate-200/80"
          : "text-slate-700 hover:text-slate-950 hover:bg-white/60"
      }`}
      prefetch={true}
    >
      <span>{children}</span>
      {badge && (
        <span
          className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full leading-none whitespace-nowrap ${badgeColor}`}
        >
          {badge}
        </span>
      )}
    </Link>
  );
});

const DashboardLink = memo(function DashboardLink({ onClick }: { onClick?: () => void }) {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <Link
      href="/dashboard"
      onClick={onClick}
      rel="nofollow"
      className="h-8 px-3 rounded-full text-slate-700 hover:text-purple-700 hover:bg-white/60 font-bold transition-colors inline-flex items-center gap-1.5 text-xs whitespace-nowrap"
    >
      <span>Dashboard</span>
    </Link>
  );
});

function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const megaMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const cancelMegaMenuTimeout = useCallback(() => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
      megaMenuTimeoutRef.current = null;
    }
  }, []);

  const handleMegaMenuAreaEnter = useCallback(() => {
    cancelMegaMenuTimeout();
    setIsMegaMenuOpen(true);
  }, [cancelMegaMenuTimeout]);

  const handleMegaMenuAreaLeave = useCallback(() => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 280);
  }, []);

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
    setIsMegaMenuOpen(false);
  }, [cancelMegaMenuTimeout]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsMegaMenuOpen(false);
        cancelMegaMenuTimeout();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [cancelMegaMenuTimeout]);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (isMegaMenuOpen) setIsMegaMenuOpen(false);
    if (isMenuOpen) setIsMenuOpen(false);
  }

  if (pathname?.startsWith("/embed")) {
    return null;
  }

  return (
    <>
      <div className="sticky top-0 z-50">
        <AnnouncementBar />

        <header className="relative transition-all">
          {/* Specular Top Accent Line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-emerald-500" />

          <div className="bg-white/92 backdrop-blur-2xl border-b border-slate-200/85 shadow-[0_8px_28px_-10px_rgba(15,23,42,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)]">
            <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16 gap-2 sm:gap-3">
                {/* 1. Brand Logo & Emblem */}
                <div className="shrink-0 flex items-center">
                  <Link href="/" className="flex items-center gap-2.5 group whitespace-nowrap">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-red-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-[inset_0_1.5px_0_0_rgba(255,255,255,0.45),0_3px_0_0_#4c1d95,0_8px_16px_-4px_rgba(124,58,237,0.4)] group-hover:scale-105 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0">
                      <FaYoutube className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight group-hover:text-purple-700 transition-colors leading-tight">
                        {siteConfig.name}
                      </span>
                      <span className="hidden sm:inline-block text-[9px] font-extrabold text-purple-700 tracking-[0.14em] uppercase leading-tight">
                        4K Creator Suite • 44 Tools
                      </span>
                    </div>
                  </Link>
                </div>

                {/* 2. Center 3D Glass Pill Navigation Dock (Desktop) */}
                <div className="hidden lg:flex items-center bg-slate-100/90 p-1 rounded-full border border-slate-200/85 shadow-[inset_0_1px_2px_rgba(15,23,42,0.05)] gap-0.5 shrink-0">
                  <div
                    className="relative flex items-center"
                    onMouseEnter={handleMegaMenuAreaEnter}
                    onMouseLeave={handleMegaMenuAreaLeave}
                  >
                    <button
                      type="button"
                      onClick={() => setIsMegaMenuOpen((prev) => !prev)}
                      className={`h-8 inline-flex items-center gap-1.5 px-3 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        isMegaMenuOpen || pathname === "/tools"
                          ? "bg-white text-purple-700 shadow-xs border border-slate-200/80"
                          : "text-slate-700 hover:text-slate-950 hover:bg-white/60"
                      }`}
                      aria-expanded={isMegaMenuOpen}
                      aria-label="Explore tools catalog"
                    >
                      <span>Tools</span>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-purple-600 text-white leading-none">
                        44
                      </span>
                      <FaChevronDown
                        className={`w-2.5 h-2.5 text-slate-400 transition-transform duration-200 ${
                          isMegaMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <NavLink
                    href="/tools/youtube-earnings-calculator"
                    badge="Tier 1"
                    badgeColor="bg-emerald-600 text-white"
                    isActive={Boolean(pathname?.includes("earnings"))}
                  >
                    Earnings
                  </NavLink>

                  <NavLink
                    href="/resources/youtube-cpm-rates"
                    badge="52"
                    badgeColor="bg-purple-100 text-purple-800 border border-purple-200"
                    isActive={Boolean(pathname?.includes("cpm"))}
                  >
                    CPM Rates
                  </NavLink>

                  <NavLink
                    href="/pricing"
                    isActive={pathname === "/pricing"}
                  >
                    Pricing
                  </NavLink>

                  <NavLink
                    href="/blog"
                    isActive={Boolean(pathname?.startsWith("/blog"))}
                  >
                    Guides
                  </NavLink>

                  <DashboardLink />
                </div>

                {/* 3. Right Utilities Dock */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  {/* Desktop Command Search Trigger */}
                  <button
                    type="button"
                    onClick={() => setIsCommandOpen(true)}
                    className="hidden md:inline-flex h-9 items-center gap-2 px-3 rounded-full bg-slate-100/90 hover:bg-white border border-slate-200/90 hover:border-purple-300 text-slate-500 text-xs font-semibold transition-all duration-200 cursor-pointer shadow-[inset_0_1px_0_0_#fff] w-40 xl:w-52 group shrink-0"
                    aria-label="Search all tools and guides"
                  >
                    <FaSearch className="w-3 h-3 text-purple-600 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate text-slate-500 text-left flex-1">
                      Search 44 tools...
                    </span>
                    <kbd className="inline-flex items-center text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs shrink-0">
                      ⌘K
                    </kbd>
                  </button>

                  {/* Global Multi-Currency Picker (sm+ in bar, also accessible on desktop/tablet) */}
                  <div className="hidden sm:block">
                    <HeaderCurrencyPicker />
                  </div>

                  {/* Pinned / Saved Tools Drawer */}
                  <div className="hidden sm:block">
                    <HeaderSavedTools />
                  </div>

                  {/* Mobile Search Trigger */}
                  <button
                    type="button"
                    onClick={() => setIsCommandOpen(true)}
                    className="md:hidden w-9 h-9 inline-flex items-center justify-center rounded-full bg-white text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition-colors border border-slate-200/90 shadow-2xs shrink-0"
                    aria-label="Open search palette"
                  >
                    <FaSearch className="w-3.5 h-3.5" />
                  </button>

                  {/* User Account / Sign In */}
                  <UserMenu />

                  {/* Mobile Hamburger Menu Button */}
                  <button
                    onClick={toggleMenu}
                    className="lg:hidden w-9 h-9 inline-flex items-center justify-center rounded-full bg-white text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition-colors border border-slate-200/90 shadow-2xs shrink-0"
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                  >
                    {isMenuOpen ? <FaTimes className="w-3.5 h-3.5" /> : <FaBars className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Mobile Drawer Navigation */}
              {isMenuOpen && (
                <div className="lg:hidden py-4 border-t border-slate-200/80 animate-fade-in-up">
                  <div className="flex sm:hidden items-center justify-between gap-2 mb-3">
                    <HeaderCurrencyPicker />
                    <HeaderSavedTools />
                  </div>
                  <div className="mb-3">
                    <button
                      type="button"
                      onClick={() => {
                        closeMenu();
                        setIsCommandOpen(true);
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold"
                    >
                      <span className="flex items-center gap-2">
                        <FaSearch className="text-purple-600" />
                        Search 44 creator tools &amp; CPM data...
                      </span>
                      <span className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded font-bold">
                        ⌘K
                      </span>
                    </button>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Link
                      href="/tools"
                      onClick={closeMenu}
                      className="px-4 py-2.5 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-600 font-bold transition-colors flex items-center justify-between text-sm"
                    >
                      <span>All 44 Creator Tools</span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-600 text-white">
                        Catalog
                      </span>
                    </Link>

                    <Link
                      href="/tools/youtube-earnings-calculator"
                      onClick={closeMenu}
                      className="px-4 py-2.5 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-600 font-bold transition-colors flex items-center justify-between text-sm"
                    >
                      <span>YouTube Earnings Calculator</span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                        Tier-1
                      </span>
                    </Link>

                    <Link
                      href="/tools/youtube-watch-hours-calculator"
                      onClick={closeMenu}
                      className="px-4 py-2.5 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-600 font-bold transition-colors flex items-center justify-between text-sm"
                    >
                      <span>4,000 Watch Hours Countdown</span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-600 text-white">
                        New
                      </span>
                    </Link>

                    <Link
                      href="/tools/youtube-thumbnail-downloader"
                      onClick={closeMenu}
                      className="px-4 py-2.5 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-600 font-bold transition-colors flex items-center justify-between text-sm"
                    >
                      <span>4K Thumbnail Downloader</span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-pink-600 text-white">
                        UHD
                      </span>
                    </Link>

                    <Link
                      href="/resources/youtube-cpm-rates"
                      onClick={closeMenu}
                      className="px-4 py-2.5 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-600 font-bold transition-colors flex items-center justify-between text-sm"
                    >
                      <span>YouTube CPM Rates 2026</span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-sky-600 text-white">
                        52 Markets
                      </span>
                    </Link>

                    <Link
                      href="/pricing"
                      onClick={closeMenu}
                      className="px-4 py-2.5 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-600 font-semibold transition-colors text-sm"
                    >
                      Pricing
                    </Link>

                    <Link
                      href="/blog"
                      onClick={closeMenu}
                      className="px-4 py-2.5 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-600 font-semibold transition-colors text-sm"
                    >
                      Creator Growth Guides
                    </Link>

                    <DashboardLink onClick={closeMenu} />
                  </div>
                </div>
              )}
            </nav>
          </div>

          <HeaderMegaMenu
            isOpen={isMegaMenuOpen}
            onClose={closeMegaMenu}
            onMouseEnter={handleMegaMenuAreaEnter}
            onMouseLeave={handleMegaMenuAreaLeave}
          />
        </header>
      </div>

      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </>
  );
}

export default memo(Header);
