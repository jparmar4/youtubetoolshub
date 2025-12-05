import { Metadata } from "next";
import Link from "next/link";
import { FaCrown, FaGoogle, FaEnvelope, FaArrowLeft } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to access your YouTube Tools Hub account and premium features.",
};

export default function SignInPage() {
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
                            Welcome Back
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Sign in to access your account
                        </p>
                    </div>

                    {/* Sign In Options */}
                    <div className="space-y-4">
                        <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                            <FaGoogle className="w-5 h-5 text-red-500" />
                            <span className="font-medium text-gray-700 dark:text-white">
                                Continue with Google
                            </span>
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">
                                    or
                                </span>
                            </div>
                        </div>

                        <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <FaEnvelope className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            <span className="font-medium text-gray-700 dark:text-white">
                                Continue with Email
                            </span>
                        </button>
                    </div>

                    {/* Demo Mode Notice */}
                    <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                        <p className="text-sm text-yellow-700 dark:text-yellow-300 text-center">
                            <strong>Demo Mode:</strong> Authentication is not yet configured.
                            For testing, you can enable Pro mode from the browser console:
                        </p>
                        <code className="block mt-2 text-xs bg-yellow-100 dark:bg-yellow-900/40 p-2 rounded text-yellow-800 dark:text-yellow-200 text-center">
                            localStorage.setItem(&apos;yt_tools_pro&apos;, &apos;true&apos;)
                        </code>
                    </div>

                    {/* Terms */}
                    <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
                        By signing in, you agree to our{" "}
                        <Link href="/terms" className="text-red-500 hover:underline">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-red-500 hover:underline">
                            Privacy Policy
                        </Link>
                    </p>
                </div>

                {/* Pro Benefits (if coming from pricing) */}
                <div className="mt-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <FaCrown className="text-yellow-500" />
                        <span className="font-semibold text-gray-900 dark:text-white">
                            Pro Benefits
                        </span>
                    </div>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>✓ Unlimited AI generations</li>
                        <li>✓ 10 image generations per day</li>
                        <li>✓ Ad-free experience</li>
                        <li>✓ Priority support</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
