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

// Memoized navigation link component
const NavLink = memo(function NavLink({
  href,
  children,
  onClick,
  className,
  badge,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative inline-flex items-center gap-1.5 transition-colors ${className}`}
      prefetch={true}
    >
      <span>{children}</span>
      {badge && (
        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white tracking-wide shadow-2xs">
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
      className="text-slate-600 hover:text-purple-600 font-medium transition-colors flex items-center gap-1.5 md:w-auto w-full md:px-0 px-4 md:py-0 py-3 md:hover:bg-transparent hover:bg-purple-50 rounded-xl text-sm"
    >
      <span>🚀</span>
      Dashboard
    </Link>
  );
});

function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const megaMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Global Cmd+K / Ctrl+K listener
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

  // Mega-menu hover: open immediately, close with delay to bridge gap
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
    }, 320);
  }, []);

  // Cleanup timeout on unmount
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

  // Escape closes all open menus
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

  // Auto-close menus on route change (render-phase safe pattern)
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
      {/* Sticky wrapper: announcement + header + mega-menu all stick together */}
      <div className="sticky top-0 z-50">
        {/* 1. Global Announcement / Ticker Bar */}
        <AnnouncementBar />

        {/* 2. Main Header with Ambient Gradient Accent Line */}
        <header className="relative transition-all">
          {/* Dynamic Glowing Accent Top Border */}
          <div className="h-[2px] w-full bg-gradient-to-r from-red-600 via-purple-600 to-amber-500" />

          <div className="bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.06)]">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16 md:h-20 gap-3">
                {/* Logo & Brand */}
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-red-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-purple-500/25 group-hover:scale-105 group-hover:shadow-purple-500/40 transition-all duration-300">
                      <FaYoutube className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight group-hover:text-purple-600 transition-colors">
                        {siteConfig.name}
                      </span>
                      <span className="hidden sm:inline-block text-[10px] font-bold text-purple-700 tracking-wider uppercase -mt-0.5">
                        Free Creator Suite • 44 Tools
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex items-center h-full gap-1 xl:gap-2">
                  {/* Tools Mega-Menu Trigger */}
                  <div
                    className="relative h-full flex items-center"
                    onMouseEnter={handleMegaMenuAreaEnter}
                    onMouseLeave={handleMegaMenuAreaLeave}
                  >
                    <button
                      type="button"
                      onClick={() => setIsMegaMenuOpen((prev) => !prev)}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                        isMegaMenuOpen || pathname?.startsWith("/tools")
                          ? "text-purple-600 bg-purple-50"
                          : "text-slate-700 hover:text-purple-600 hover:bg-slate-50"
                      }`}
                      aria-expanded={isMegaMenuOpen}
                      aria-label="Explore tools catalog"
                    >
                      <span>Tools</span>
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-purple-600 text-white">
                        44
                      </span>
                      <FaChevronDown
                        className={`w-2.5 h-2.5 text-slate-400 transition-transform duration-200 ${
                          isMegaMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Direct High-CTR Links */}
                  <NavLink
                    href="/tools/youtube-earnings-calculator"
                    badge="Tier 1"
                    className={`px-3 py-2 rounded-xl text-sm font-semibold ${
                      pathname?.includes("earnings")
                        ? "text-purple-600 bg-purple-50 font-bold"
                        : "text-slate-700 hover:text-purple-600 hover:bg-slate-50"
                    }`}
                  >
                    Earnings
                  </NavLink>

                  <NavLink
                    href="/resources/youtube-cpm-rates"
                    badge="2026"
                    className={`px-3 py-2 rounded-xl text-sm font-semibold ${
                      pathname?.includes("cpm")
                        ? "text-purple-600 bg-purple-50 font-bold"
                        : "text-slate-700 hover:text-purple-600 hover:bg-slate-50"
                    }`}
                  >
                    CPM Rates
                  </NavLink>

                  <NavLink
                    href="/pricing"
                    className="px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-purple-600 hover:bg-slate-50 transition-colors"
                  >
                    Pricing
                  </NavLink>

                  <NavLink
                    href="/blog"
                    className="px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-purple-600 hover:bg-slate-50 transition-colors"
                  >
                    Blog
                  </NavLink>

                  <DashboardLink />
                </div>

                {/* Desktop Search Bar Trigger */}
                <button
                  type="button"
                  onClick={() => setIsCommandOpen(true)}
                  className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-500 text-xs font-medium transition-all duration-200 cursor-pointer shadow-2xs max-w-xs xl:max-w-sm w-full group"
                  aria-label="Search all tools and guides"
                >
                  <FaSearch className="w-3.5 h-3.5 text-purple-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate text-slate-500">
                    Search 44+ tools, CPM data...
                  </span>
                  <kbd className="ml-auto inline-flex items-center gap-0.5 text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs flex-shrink-0">
                    ⌘K
                  </kbd>
                </button>

                {/* Right Utilities Section */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  {/* 1. Global Multi-Currency Picker */}
                  <HeaderCurrencyPicker />

                  {/* 2. Pinned / Saved Tools Star Drawer */}
                  <HeaderSavedTools />

                  {/* 3. Mobile Search Trigger */}
                  <button
                    type="button"
                    onClick={() => setIsCommandOpen(true)}
                    className="md:hidden p-2.5 min-w-10 min-h-10 inline-flex items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition-colors border border-slate-200"
                    aria-label="Open search palette"
                  >
                    <FaSearch className="w-4 h-4" />
                  </button>

                  {/* 4. User Account / Login Menu */}
                  <UserMenu />

                  {/* 5. Mobile Hamburger Menu Button */}
                  <button
                    onClick={toggleMenu}
                    className="lg:hidden p-2.5 min-w-10 min-h-10 inline-flex items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition-colors border border-slate-200"
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                  >
                    {isMenuOpen ? <FaTimes className="w-4 h-4" /> : <FaBars className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Mobile Drawer Navigation */}
              {isMenuOpen && (
                <div className="lg:hidden py-4 border-t border-slate-200/80 animate-fade-in-up">
                  {/* Quick Search Button in Mobile Menu */}
                  <div className="mb-3 px-2">
                    <button
                      type="button"
                      onClick={() => {
                        closeMenu();
                        setIsCommandOpen(true);
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 text-xs font-semibold"
                    >
                      <span className="flex items-center gap-2">
                        <FaSearch className="text-purple-600" />
                        Search 44+ creator tools...
                      </span>
                      <span className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded font-bold">
                        ⌘K
                      </span>
                    </button>
                  </div>

                  {/* Mobile Navigation Links */}
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
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white">
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
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-pink-500 text-white">
                        HD
                      </span>
                    </Link>

                    <Link
                      href="/resources/youtube-cpm-rates"
                      onClick={closeMenu}
                      className="px-4 py-2.5 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-600 font-bold transition-colors flex items-center justify-between text-sm"
                    >
                      <span>YouTube CPM Rates 2026</span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-600 text-white">
                        Global
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
                      Creator Growth Blog
                    </Link>

                    <DashboardLink onClick={closeMenu} />
                  </div>
                </div>
              )}
            </nav>
          </div>

          {/* 3. Desktop Interactive Mega Menu Dropdown — inside header for hover bridging */}
          <HeaderMegaMenu
            isOpen={isMegaMenuOpen}
            onClose={closeMegaMenu}
            onMouseEnter={handleMegaMenuAreaEnter}
            onMouseLeave={handleMegaMenuAreaLeave}
          />
        </header>
      </div>

      {/* 4. Universal Command Palette Search Modal */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </>
  );
}

export default memo(Header);
