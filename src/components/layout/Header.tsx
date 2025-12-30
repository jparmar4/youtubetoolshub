"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaYoutube } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import UserMenu from "@/components/auth/UserMenu";
import { useSession } from "next-auth/react";

// Memoized navigation link component
const NavLink = memo(function NavLink({
    href,
    children,
    onClick,
    className
}: {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={className}
            prefetch={true}
        >
            {children}
        </Link>
    );
});

// Memoized theme toggle button - Hidden/Removed as requested, but keeping component structure if needed, or just simplify.
// Reverting to previous style for DashboardLink

const DashboardLink = memo(function DashboardLink({ onClick }: { onClick?: () => void }) {
    const { data: session } = useSession();

    if (!session) return null;

    return (
        <Link
            href="/dashboard"
            onClick={onClick}
            className="text-slate-600 hover:text-purple-600 font-medium transition-colors flex items-center gap-1 md:w-auto w-full md:px-0 px-4 md:py-0 py-3 md:hover:bg-transparent hover:bg-purple-50 rounded-xl"
        >
            <span>🚀</span>
            Dashboard
        </Link>
    );
});

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // Memoized menu toggle
    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    // Memoized close menu
    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    return (
        <header className="sticky top-0 z-50 glass-premium border-b border-white/5">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group" prefetch={true}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
                            <FaYoutube className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-xl text-slate-900 hidden sm:block tracking-tight group-hover:text-purple-600 transition-colors">
                            {siteConfig.name}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {/* Home Link (Always First) */}
                        {siteConfig.nav.filter(item => item.href === '/').map((item) => (
                            <NavLink
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors"
                            >
                                {item.name}
                            </NavLink>
                        ))}

                        {/* Dashboard Link (After Home) */}
                        <DashboardLink />

                        {/* Other Links */}
                        {siteConfig.nav.filter(item => item.href !== '/').map((item) => (
                            <NavLink
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors"
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle - only render after mount to avoid hydration mismatch */}
                        {/* Theme toggle removed - single Emerald theme only */}

                        {/* User Menu */}
                        <UserMenu />

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden p-2 rounded-xl bg-slate-800 text-slate-300"
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-slate-800 animate-fade-in-up">
                        <div className="flex flex-col gap-2">
                            {/* Home Link (First) */}
                            {siteConfig.nav.filter(item => item.href === '/').map((item) => (
                                <NavLink
                                    key={item.name}
                                    href={item.href}
                                    onClick={closeMenu}
                                    className="px-4 py-3 rounded-xl text-slate-300 hover:bg-purple-900/20 hover:text-purple-400 font-medium transition-colors"
                                >
                                    {item.name}
                                </NavLink>
                            ))}

                            {/* Dashboard Link (After Home) */}
                            <DashboardLink onClick={closeMenu} />

                            {/* Other Links */}
                            {siteConfig.nav.filter(item => item.href !== '/').map((item) => (
                                <NavLink
                                    key={item.name}
                                    href={item.href}
                                    onClick={closeMenu}
                                    className="px-4 py-3 rounded-xl text-slate-300 hover:bg-purple-900/20 hover:text-purple-400 font-medium transition-colors"
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default memo(Header);
