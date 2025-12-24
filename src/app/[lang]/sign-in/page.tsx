"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaCrown, FaArrowLeft } from "react-icons/fa";
import SignInButton from "@/components/auth/SignInButton";

function SignInContent() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/tools";

    return (
        <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="max-w-md w-full mx-auto px-4">
                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500 mb-6"
                >
                    <FaArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                {/* Sign In Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl mb-4">
                            <FaCrown className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Welcome to YouTube Tools Hub
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Sign in to access all our free YouTube tools
                        </p>
                    </div>

                    {/* Sign In Options */}
                    <div className="space-y-4">
                        <SignInButton callbackUrl={callbackUrl} />
                    </div>

                    {/* Terms */}
                    <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
                        By signing in, you agree to our{" "}
                        <Link href="/terms-of-use" className="text-red-500 hover:underline">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy-policy" className="text-red-500 hover:underline">
                            Privacy Policy
                        </Link>
                    </p>
                </div>

                {/* Benefits */}
                <div className="mt-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <FaCrown className="text-yellow-500" />
                        <span className="font-semibold text-gray-900 dark:text-white">
                            What you get with free access
                        </span>
                    </div>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>✓ All YouTube optimization tools</li>
                        <li>✓ AI-powered title & description generators</li>
                        <li>✓ Thumbnail downloader & analyzer</li>
                        <li>✓ Tag extractor & generator</li>
                        <li>✓ Analytics calculators</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default function SignInPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="animate-pulse">Loading...</div>
            </div>
        }>
            <SignInContent />
        </Suspense>
    );
}
