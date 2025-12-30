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
        <div className="min-h-screen py-12 relative overflow-hidden flex items-center justify-center bg-slate-50">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-200/20 blur-[100px] rounded-full -z-10" />

            <div className="max-w-md w-full mx-auto px-4 relative z-10">
                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-purple-600 mb-8 transition-colors"
                >
                    <FaArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                {/* Sign In Card */}
                <div className="bg-white rounded-2xl shadow-xl shadow-purple-900/10 p-8 border border-slate-100">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-2xl mb-4 shadow-lg shadow-purple-500/20">
                            <FaCrown className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-slate-600">
                            Sign in to access your professional YouTube tools
                        </p>
                    </div>

                    {/* Sign In Options */}
                    <div className="space-y-4">
                        <SignInButton callbackUrl={callbackUrl} />
                    </div>

                    {/* Terms */}
                    <p className="mt-6 text-xs text-center text-slate-400">
                        By signing in, you agree to our{" "}
                        <Link href="/terms-of-use" className="text-purple-600 hover:underline">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy-policy" className="text-purple-600 hover:underline">
                            Privacy Policy
                        </Link>
                    </p>
                </div>

                {/* Benefits */}
                <div className="mt-6 bg-white/60 backdrop-blur-sm border border-purple-100 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                        <FaCrown className="text-purple-500" />
                        <span className="font-semibold text-slate-900">
                            Free Account Benefits
                        </span>
                    </div>
                    <ul className="text-sm text-slate-600 space-y-2">
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            Access to all 16+ YouTube tools
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            Daily free generation credits
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            Save your history automatically
                        </li>
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
