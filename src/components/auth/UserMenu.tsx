"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import NextImage from "next/image";
import { FaUser, FaSignOutAlt, FaCog, FaRocket } from "react-icons/fa";

export default function UserMenu() {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [imageError, setImageError] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const closeMenu = useCallback(() => setIsOpen(false), []);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                closeMenu();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [closeMenu]);

    // Close menu on Escape and return focus to trigger
    useEffect(() => {
        if (!isOpen) return;
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                closeMenu();
                buttonRef.current?.focus();
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, closeMenu]);

    if (status === "loading") {
        return (
            <div className="w-[74px] h-9 rounded-full bg-slate-200 animate-pulse shrink-0" />
        );
    }

    if (!session?.user) {
        return (
            <Link
                href="/sign-in"
                rel="nofollow"
                className="h-9 px-4 inline-flex items-center justify-center text-xs font-bold bg-slate-900 hover:bg-purple-700 text-white rounded-full shadow-xs transition-all whitespace-nowrap shrink-0"
            >
                Sign In
            </Link>
        );
    }

    return (
        <div className="relative" ref={menuRef}>
            <button
                ref={buttonRef}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-label="Account menu"
                className="flex items-center gap-2 rounded-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
                {session.user.image && !imageError ? (
                    <NextImage
                        src={session.user.image}
                        alt=""
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full border-2 border-purple-500 object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 flex items-center justify-center border-2 border-purple-500">
                        {session.user.name ? (
                            <span className="text-white font-bold text-sm" aria-hidden="true">
                                {session.user.name.charAt(0).toUpperCase()}
                            </span>
                        ) : (
                            <FaUser className="w-4 h-4 text-white" />
                        )}
                    </div>
                )}
            </button>

            {isOpen && (
                <div
                    role="menu"
                    aria-label="Account"
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50"
                >
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-slate-200">
                        <p className="font-medium text-slate-900 truncate">
                            {session.user.name}
                        </p>
                        <p className="text-sm text-slate-600 truncate">
                            {session.user.email}
                        </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        <Link
                            href="/dashboard"
                            role="menuitem"
                            rel="nofollow"
                            className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-purple-50 hover:text-purple-700 focus-visible:bg-purple-50 focus-visible:text-purple-700 font-medium"
                            onClick={closeMenu}
                        >
                            <FaRocket className="w-4 h-4 text-purple-600 shrink-0" aria-hidden="true" />
                            My Dashboard
                        </Link>
                        <Link
                            href="/tools"
                            role="menuitem"
                            className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-purple-50 hover:text-purple-700 focus-visible:bg-purple-50 focus-visible:text-purple-700"
                            onClick={closeMenu}
                        >
                            <FaCog className="w-4 h-4" aria-hidden="true" />
                            All Tools
                        </Link>
                    </div>

                    {/* Sign Out */}
                    <div className="border-t border-slate-200 pt-2">
                        <button
                            type="button"
                            role="menuitem"
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex items-center gap-3 px-4 py-2 w-full text-left text-purple-700 hover:bg-purple-50 focus-visible:bg-purple-50 cursor-pointer"
                        >
                            <FaSignOutAlt className="w-4 h-4" aria-hidden="true" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
