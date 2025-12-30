"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";

function AuthErrorContent() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    const errorMessages: Record<string, { title: string; message: string }> = {
        Configuration: {
            title: "Server Configuration Error",
            message: "There's an issue with the authentication setup. Please make sure the Google OAuth credentials are correctly configured.",
        },
        AccessDenied: {
            title: "Access Denied",
            message: "You do not have permission to sign in.",
        },
        Verification: {
            title: "Verification Error",
            message: "The sign-in link is no longer valid.",
        },
        OAuthSignin: {
            title: "OAuth Sign-In Error",
            message: "Could not start the sign-in process. Check Google OAuth configuration.",
        },
        OAuthCallback: {
            title: "OAuth Callback Error",
            message: "Could not complete sign-in. Check redirect URI configuration.",
        },
        OAuthCreateAccount: {
            title: "Account Creation Error",
            message: "Could not create your account. Please try again.",
        },
        Callback: {
            title: "Callback Error",
            message: "There was an error during authentication callback.",
        },
        Default: {
            title: "Authentication Error",
            message: "An error occurred during authentication. Please try again.",
        },
    };

    const errorInfo = errorMessages[error || ""] || errorMessages.Default;

    return (
        <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="max-w-md w-full mx-auto px-4">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-emerald-500 mb-6"
                >
                    <FaArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl mb-4">
                        <FaExclamationTriangle className="w-8 h-8 text-emerald-500" />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {errorInfo.title}
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {errorInfo.message}
                    </p>

                    {error === "Configuration" && (
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 mb-6 text-left">
                            <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium mb-2">
                                Check these environment variables:
                            </p>
                            <ul className="text-xs text-yellow-600 dark:text-yellow-400 space-y-1">
                                <li>• GOOGLE_CLIENT_ID</li>
                                <li>• GOOGLE_CLIENT_SECRET</li>
                                <li>• NEXTAUTH_SECRET</li>
                                <li>• AUTH_SECRET (same as NEXTAUTH_SECRET)</li>
                            </ul>
                        </div>
                    )}

                    <div className="flex flex-col gap-3">
                        <Link
                            href="/sign-in"
                            className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-orange-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                        >
                            Try Again
                        </Link>
                        <Link
                            href="/"
                            className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            Go to Homepage
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AuthErrorPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="animate-pulse">Loading...</div>
            </div>
        }>
            <AuthErrorContent />
        </Suspense>
    );
}
