"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import NextImage from "next/image";
import { FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";

export default function UserMenu() {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [imageError, setImageError] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (status === "loading") {
        return (
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
        );
    }

    if (!session?.user) {
        return (
            <Link
                href="/sign-in"
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-orange-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
                Sign In
            </Link>
        );
    }

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 focus:outline-none"
            >
                {session.user.image && !imageError ? (
                    <NextImage
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-emerald-500 object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-600 to-orange-500 flex items-center justify-center border-2 border-emerald-500">
                        {session.user.name ? (
                            <span className="text-white font-bold text-lg">
                                {session.user.name.charAt(0).toUpperCase()}
                            </span>
                        ) : (
                            <FaUser className="w-5 h-5 text-white" />
                        )}
                    </div>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                            {session.user.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {session.user.email}
                        </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="w-4 h-4 flex items-center justify-center">🚀</span>
                            My Dashboard
                        </Link>
                        <Link
                            href="/tools"
                            className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => setIsOpen(false)}
                        >
                            <FaCog className="w-4 h-4" />
                            All Tools
                        </Link>
                    </div>

                    {/* Sign Out */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex items-center gap-3 px-4 py-2 w-full text-left text-emerald-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <FaSignOutAlt className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
