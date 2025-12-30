"use client";

import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

interface SignInButtonProps {
    callbackUrl?: string;
}

export default function SignInButton({ callbackUrl = "/" }: SignInButtonProps) {
    return (
        <button
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer"
        >
            <FaGoogle className="w-5 h-5 text-emerald-500" />
            <span className="font-medium text-gray-700 dark:text-white">
                Continue with Google
            </span>
        </button>
    );
}
