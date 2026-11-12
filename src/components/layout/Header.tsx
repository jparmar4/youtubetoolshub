"use client";

import { useState, useCallback, useEffect, memo, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaYoutube,
  FaSearch,
  FaChevronDown,
  FaArrowRight,
  FaDollarSign,
  FaTags,
  FaImage,
  FaRocket,
  FaTools,
} from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { toolMeta } from "@/config/tool-meta";
import { countryCPMData } from "@/lib/cpm-data";
import UserMenu from "@/components/auth/UserMenu";
import { useSession } from "next-auth/react";
import HeaderCurrencyPicker from "@/components/layout/HeaderCurrencyPicker";
import HeaderSavedTools from "@/components/layout/HeaderSavedTools";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import HeaderMegaMenu from "@/components/layout/HeaderMegaMenu";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const CommandPalette = dynamic(() => import("@/components/layout/CommandPalette"), {
  ssr: false,
});

const NavLink = memo(function NavLink({
  href,
  children,
  onClick,
  isActive,
  dotColor,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  dotColor?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`h-9 inline-flex items-center gap-1.5 px-2.5 xl:px-3.5 rounded-full text-[12.5px] xl:text-[13px] font-semibold whitespace-nowrap transition-all ${
        isActive
          ? "bg-purple-50 text-purple-800 border border-purple-200/80 shadow-2xs"
          : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 border border-transparent"
      }`}
      prefetch={false}
    >
      {dotColor && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} aria-hidden="true" />}
      <span>{children}</span>
    </Link>
  );
});

const DashboardLink = memo(function DashboardLink({
  onClick,
  isActive,
}: {
  onClick?: () => void;
  isActive?: boolean;
}) {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <Link
      href="/dashboard"
      onClick={onClick}
      rel="nofollow"
      className={`h-9 px-2.5 xl:px-3.5 rounded-full font-semibold transition-all inline-flex items-center gap-1.5 text-[12.5px] xl:text-[13px] whitespace-nowrap border ${
        isActive
          ? "bg-purple-50 text-purple-800 border-purple-200/80"
          : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 border-transparent"
      }`}
    >
      <span>Dashboard</span>
    </Link>
  );
});

const MOBILE_CATEGORY_HUBS = [
  { href: "/tools/analytics-tools", label: "Monetization", icon: FaDollarSign, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { href: "/tools/seo-tools", label: "SEO & Tags", icon: FaTags, color: "text-purple-600 bg-purple-50 border-purple-200" },
  { href: "/tools/thumbnail-tools", label: "Thumbnails", icon: FaImage, color: "text-pink-600 bg-pink-50 border-pink-200" },
  { href: "/tools/channel-tools", label: "Growth", icon: FaRocket, color: "text-sky-600 bg-sky-50 border-sky-200" },
  { href: "/tools/utility-tools", label: "Utilities", icon: FaTools, color: "text-amber-600 bg-amber-50 border-amber-200" },
];

function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const megaMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaMenuOpenTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaMenuOpenedByHoverAtRef = useRef<number>(0);
  const toolsTriggerRef = useRef<HTMLButtonElement>(null);

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
      megaMenuOpenedByHoverAtRef.current = Date.now();
      setIsMegaMenuOpen(true);
    }, 140);
  }, [isMegaMenuOpen]);

  const handleMegaMenuAreaLeave = useCallback(() => {
    if (megaMenuOpenTimeoutRef.current) {
      clearTimeout(megaMenuOpenTimeoutRef.current);
      megaMenuOpenTimeoutRef.current = null;
    }
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 220);
  }, []);

  const handleToolsTriggerClick = useCallback(() => {
    cancelMegaMenuTimeout();
    setIsMegaMenuOpen((prev) => {
      if (!prev) {
        megaMenuOpenedByHoverAtRef.current = 0;
        return true;
      }
      if (megaMenuOpenedByHoverAtRef.current && Date.now() - megaMenuOpenedByHoverAtRef.current < 600) {
        megaMenuOpenedByHoverAtRef.current = 0;
        return true;
      }
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

  const drawerRef = useFocusTrap(isMenuOpen, { onEscape: closeMenu });

  const closeMegaMenu = useCallback(() => {
    cancelMegaMenuTimeout();
    setIsMegaMenuOpen(false);
  }, [cancelMegaMenuTimeout]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (isMenuOpen) return;
      if (isMegaMenuOpen) {
        setIsMegaMenuOpen(false);
        cancelMegaMenuTimeout();
        toolsTriggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, isMegaMenuOpen, cancelMegaMenuTimeout]);

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
      {isMegaMenuOpen && (
        <div
          aria-hidden="true"
          onClick={closeMegaMenu}
          className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[1px] transition-opacity"
        />
      )}

      <div className="sticky top-0 z-50">
        <AnnouncementBar />

        <header className="relative transition-all">
          <div className="h-[2px] w-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-emerald-500" />

          <div className="bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-[0_6px_28px_-12px_rgba(15,23,42,0.08)]">
            <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8" aria-label="Main navigation">
              <div className="flex items-center justify-between h-16 gap-2 sm:gap-3">
                {/* 1. Brand Lockup */}
                <div className="shrink-0 flex items-center">
                  <Link href="/" className="flex items-center gap-2.5 group whitespace-nowrap">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-600 via-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-600/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
                      <FaYoutube className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-extrabold text-base sm:text-[17px] text-slate-950 tracking-tight group-hover:text-purple-700 transition-colors leading-tight font-outfit">
                        {siteConfig.name}
                      </span>
                      <span className="hidden xl:inline-block text-[11px] font-semibold text-slate-600 leading-tight">
                        Creator Studio · {toolMeta.length} Free Tools
                      </span>
                    </div>
                  </Link>
                </div>

                {/* 2. Clean Primary Navigation (Desktop) */}
                <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 shrink-0">
                  <div
                    className="relative flex items-center"
                    onMouseEnter={handleMegaMenuAreaEnter}
                    onMouseLeave={handleMegaMenuAreaLeave}
                  >
                    <button
                      type="button"
                      ref={toolsTriggerRef}
                      onClick={handleToolsTriggerClick}
                      className={`h-9 inline-flex items-center gap-1.5 px-2.5 xl:px-3.5 rounded-full text-[12.5px] xl:text-[13px] font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                        isMegaMenuOpen || pathname?.startsWith("/tools")
                          ? "bg-purple-50 text-purple-800 border-purple-200/80 shadow-2xs"
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

              {/* Mobile Drawer Navigation */}
              {isMenuOpen && (
                <div
                  id="mobile-nav-drawer"
                  ref={drawerRef}
                  className="lg:hidden py-4 border-t border-slate-200/80 max-h-[calc(100vh-5rem)] overflow-y-auto animate-fade-in-up"
                >
                  <div className="flex sm:hidden items-center justify-between gap-2 mb-3">
                    <HeaderCurrencyPicker />
                    <HeaderSavedTools />
                  </div>

                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={() => {
                        closeMenu();
                        setIsCommandOpen(true);
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
                  </div>

                  {/* Category Shortcuts */}
                  <div className="mb-4">
                    <p className="px-2 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Tool Categories
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/tools"
                        onClick={closeMenu}
                        className="col-span-2 flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-purple-700 text-white text-xs font-bold transition-colors"
                      >
                        <span>Browse All {toolMeta.length} Tools</span>
                        <FaArrowRight className="w-3 h-3" />
                      </Link>
                      {MOBILE_CATEGORY_HUBS.map((hub) => {
                        const HubIcon = hub.icon;
                        return (
                          <Link
                            key={hub.href}
                            href={hub.href}
                            onClick={closeMenu}
                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800 hover:bg-purple-50 hover:border-purple-200 transition-colors"
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

                  {/* Flagship Calculators & Resources */}
                  <div className="mb-3">
                    <p className="px-2 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Flagship &amp; Resources
                    </p>
                    <div className="flex flex-col gap-1">
                      <Link
                        href="/tools/youtube-earnings-calculator"
                        onClick={closeMenu}
                        className="px-3.5 py-2.5 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-700 font-semibold transition-colors flex items-center justify-between text-sm"
                      >
                        <span>YouTube Earnings Calculator</span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                          Tier-1
                        </span>
                      </Link>

                      <Link
                        href="/tools/youtube-thumbnail-downloader"
                        onClick={closeMenu}
                        className="px-3.5 py-2.5 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-700 font-semibold transition-colors flex items-center justify-between text-sm"
                      >
                        <span>Thumbnail Downloader</span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-pink-50 border border-pink-200 text-pink-700">
                          HD
                        </span>
                      </Link>

                      <Link
                        href="/resources/youtube-cpm-rates"
                        onClick={closeMenu}
                        className="px-3.5 py-2.5 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-700 font-semibold transition-colors flex items-center justify-between text-sm"
                      >
                        <span>YouTube CPM Rates 2026</span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700">
                          {countryCPMData.length} Markets
                        </span>
                      </Link>

                      <Link
                        href="/blog"
                        onClick={closeMenu}
                        className="px-3.5 py-2.5 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-700 font-semibold transition-colors text-sm"
                      >
                        Creator Growth Guides
                      </Link>

                      <Link
                        href="/pricing"
                        onClick={closeMenu}
                        className="px-3.5 py-2.5 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-700 font-semibold transition-colors text-sm"
                      >
                        Pricing
                      </Link>

                      <div className="grid grid-cols-2 gap-1 pt-1">
                        <Link
                          href="/tools/vs/tubebuddy"
                          onClick={closeMenu}
                          className="px-3.5 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
                        >
                          vs. TubeBuddy
                        </Link>
                        <Link
                          href="/tools/vs/vidiq"
                          onClick={closeMenu}
                          className="px-3.5 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
                        >
                          vs. VidIQ
                        </Link>
                      </div>

                      <DashboardLink onClick={closeMenu} />
                    </div>
                  </div>
                </div>
              )}
            </nav>
          </div>

          {isMegaMenuOpen && (
            <HeaderMegaMenu
              isOpen={isMegaMenuOpen}
              onClose={closeMegaMenu}
              onMouseEnter={handleMegaMenuAreaEnter}
              onMouseLeave={handleMegaMenuAreaLeave}
            />
          )}
        </header>
      </div>

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
