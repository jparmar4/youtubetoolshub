"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaLock, FaUser } from "react-icons/fa";
import Button from "@/components/ui/Button"; // Assuming Button exists

interface ToolAuthGuardProps {
    children: React.ReactNode;
    title?: string;
    message?: string;
}

export default function ToolAuthGuard({
    children,
    title = "Sign In Required",
    message = "This premium tool uses advanced AI models. Please sign in to continue using it (it's free!)."
}: ToolAuthGuardProps) {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="min-h-[300px] flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl animate-pulse">
                <div className="text-center text-slate-400">Loading...</div>
            </div>
        );
    }

    if (session) {
        return <>{children}</>;
    }

    return (
        <div className="relative min-h-[300px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
            {/* Blurred Background Preview */}
            <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900 blur-sm opacity-50 z-0 pointer-events-none">
                <div className="p-8 space-y-4">
                    <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded-lg w-full mb-4"></div>
                    <div className="h-40 bg-slate-300 dark:bg-slate-700 rounded-lg w-full"></div>
                    <div className="h-10 bg-blue-300 dark:bg-blue-700 rounded-lg w-1/3 mx-auto"></div>
                </div>
            </div>

            {/* Lock Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 dark:bg-slate-950/60 backdrop-blur-md p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <FaLock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 max-w-md mb-8 leading-relaxed">
                    {message}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                    <Link href="/sign-in" className="w-full">
                        <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg">
                            <FaUser className="mr-2" />
                            Sign In to Use
                        </Button>
                    </Link>
                </div>
                <p className="mt-4 text-xs text-slate-500">
                    No credit card required. 100% Free.
                </p>
            </div>
        </div>
    );
}
