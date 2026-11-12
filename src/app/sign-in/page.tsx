"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaCrown, FaArrowLeft } from "react-icons/fa";
import SignInButton from "@/components/auth/SignInButton";
import { toolMeta } from "@/config/tool-meta";

function SignInContent() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/tools";

    return (
        <div className="min-h-screen py-12 relative overflow-hidden flex items-center justify-center bg-slate-50">
            {/* Background Decorations */}
            <div className="nebula-bg" />

            <div className="max-w-md w-full mx-auto px-4 relative z-10">
                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-700 font-semibold text-sm mb-6 transition-colors"
                >
                    <FaArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                {/* Sign In Card */}
                <div className="card-3d rounded-2xl p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-2xl mb-4 shadow-lg shadow-purple-500/20">
                            <FaCrown className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 mb-2 font-outfit">
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
                    <p className="mt-6 text-xs text-center text-slate-600">
                        By signing in, you agree to our{" "}
                        <Link href="/terms-of-use" className="text-purple-700 hover:underline font-medium">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy-policy" className="text-purple-700 hover:underline font-medium">
                            Privacy Policy
                        </Link>
                    </p>
                </div>

                {/* Benefits */}
                <div className="mt-6 bg-white/85 backdrop-blur-sm border border-purple-200/70 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                        <FaCrown className="text-purple-600" />
                        <span className="font-bold text-slate-900 font-outfit">
                            Free Account Benefits
                        </span>
                    </div>
                    <ul className="text-sm text-slate-600 space-y-2">
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                            Access to all {toolMeta.length} YouTube tools
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                            Daily free generation credits
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
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
            <div className="min-h-screen py-12 bg-slate-50 flex items-center justify-center">
                <div className="animate-pulse text-slate-600 font-medium">Loading...</div>
            </div>
        }>
            <SignInContent />
        </Suspense>
    );
}
