"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaMoon, FaSun, FaYoutube } from "react-icons/fa";
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

// Memoized theme toggle button
const ThemeToggle = memo(function ThemeToggle({
    isDark,
    onToggle
}: {
    isDark: boolean;
    onToggle: () => void;
}) {
    return (
        <button
            onClick={onToggle}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
        </button>
    );
});

const DashboardLink = memo(function DashboardLink() {
    const { data: session } = useSession();

    if (!session) return null;

    return (
        <Link
            href="/dashboard"
            className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 font-medium transition-colors flex items-center gap-1"
        >
            <span>🚀</span>
            Dashboard
        </Link>
    );
});

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Check initial theme on mount
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else if (storedTheme === 'light') {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDark(prefersDark);
            if (prefersDark) {
                document.documentElement.classList.add('dark');
            }
        }
    }, []);

    // Memoized toggle handler
    const toggleTheme = useCallback(() => {
        setIsDark(prev => {
            const newIsDark = !prev;
            if (newIsDark) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return newIsDark;
        });
    }, []);

    // Memoized menu toggle
    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    // Memoized close menu
    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group" prefetch={true}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center text-white shadow-lg group-hover:shadow-red-500/25 transition-shadow">
                            <FaYoutube className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-xl text-gray-900 dark:text-white hidden sm:block">
                            {siteConfig.name}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {siteConfig.nav.map((item) => (
                            <NavLink
                                key={item.name}
                                href={item.href}
                                className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 font-medium transition-colors"
                            >
                                {item.name}
                            </NavLink>
                        ))}
                        {/* Dashboard Link for Authenticated Users */}
                        <DashboardLink />
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle - only render after mount to avoid hydration mismatch */}
                        {mounted && (
                            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
                        )}

                        {/* User Menu */}
                        <UserMenu />

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex flex-col gap-2">
                            {siteConfig.nav.map((item) => (
                                <NavLink
                                    key={item.name}
                                    href={item.href}
                                    onClick={closeMenu}
                                    className="px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-red-500 font-medium transition-colors"
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
