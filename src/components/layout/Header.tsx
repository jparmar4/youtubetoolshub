"use client";

import { useState, useCallback, useEffect, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaYoutube, FaSearch } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import UserMenu from "@/components/auth/UserMenu";
import { useSession } from "next-auth/react";
import CommandPalette from "@/components/layout/CommandPalette";

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
            className={`relative inline-flex items-center gap-1.5 ${className}`}
            prefetch={true}
        >
            <span>{children}</span>
            {badge && (
                <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white tracking-wide shadow-2xs">
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

    // Memoized menu toggle
    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    // Memoized close menu
    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    // Escape closes the mobile menu
    useEffect(() => {
        if (!isMenuOpen) return;
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") setIsMenuOpen(false);
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isMenuOpen]);

    if (pathname?.startsWith("/embed")) {
        return null;
    }

    return (
        <>
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20 gap-3">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="flex items-center gap-2.5 group">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-purple-500/25 group-hover:scale-105 group-hover:shadow-purple-500/40 transition-all duration-300">
                                    <FaYoutube className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight group-hover:text-purple-600 transition-colors">
                                        {siteConfig.name}
                                    </span>
                                    <span className="hidden sm:inline-block text-[10px] font-semibold text-purple-700 tracking-wider uppercase -mt-0.5">
                                        Free Creator Suite
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* Search Bar Trigger - Desktop */}
                        <button
                            type="button"
                            onClick={() => setIsCommandOpen(true)}
                            className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-500 hover:text-slate-800 text-xs font-medium transition-all duration-200 cursor-pointer shadow-2xs max-w-xs xl:max-w-sm w-full"
                            aria-label="Search all tools and guides"
                        >
                            <FaSearch className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                            <span className="truncate text-slate-500">Search 44+ free tools, CPM rates...</span>
                            <kbd className="ml-auto inline-flex items-center gap-0.5 text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs flex-shrink-0">
                                ⌘K
                            </kbd>
                        </button>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-5 xl:gap-6">
                            {siteConfig.nav.map((item) => {
                                const isCpm = item.href.includes("cpm");
                                const isEarnings = item.href.includes("earnings");
                                const badge = isCpm ? "2026" : isEarnings ? "Tier 1" : undefined;
                                return (
                                    <NavLink
                                        key={item.name}
                                        href={item.href}
                                        badge={badge}
                                        className="text-sm font-semibold text-slate-700 hover:text-purple-600 transition-colors py-1"
                                    >
                                        {item.name}
                                    </NavLink>
                                );
                            })}
                            <DashboardLink />
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Mobile/Tablet Search Button */}
                            <button
                                type="button"
                                onClick={() => setIsCommandOpen(true)}
                                className="md:hidden p-2.5 min-w-10 min-h-10 inline-flex items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition-colors border border-slate-200"
                                aria-label="Open search palette"
                            >
                                <FaSearch className="w-4 h-4" />
                            </button>

                            {/* User Menu */}
                            <UserMenu />

                            {/* Mobile Menu Button */}
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

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="lg:hidden py-4 border-t border-slate-200/80 animate-fade-in-up">
                            <div className="flex flex-col gap-1">
                                {siteConfig.nav.map((item) => {
                                    const isCpm = item.href.includes("cpm");
                                    const isEarnings = item.href.includes("earnings");
                                    const badge = isCpm ? "2026" : isEarnings ? "Tier 1" : undefined;
                                    return (
                                        <NavLink
                                            key={item.name}
                                            href={item.href}
                                            badge={badge}
                                            onClick={closeMenu}
                                            className="px-4 py-3 rounded-xl text-slate-700 hover:bg-purple-50 hover:text-purple-600 font-semibold transition-colors flex items-center justify-between"
                                        >
                                            {item.name}
                                        </NavLink>
                                    );
                                })}
                                <DashboardLink onClick={closeMenu} />
                            </div>
                        </div>
                    )}
                </nav>
            </header>

            {/* Universal Command Palette Modal */}
            <CommandPalette
                isOpen={isCommandOpen}
                onClose={() => setIsCommandOpen(false)}
            />
        </>
    );
}

export default memo(Header);
