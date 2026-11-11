"use client";

import { FaExclamationTriangle } from "react-icons/fa";

interface ErrorNoticeProps {
    message: string;
    title?: string;
    onRetry?: () => void;
    className?: string;
}

/**
 * Standardized inline error banner for tool failures. One treatment for all
 * 45 tools (replaces ad-hoc green-on-red / plain text drift) using the
 * semantic danger tokens.
 */
export default function ErrorNotice({
    message,
    title = "Something went wrong",
    onRetry,
    className = "",
}: ErrorNoticeProps) {
    return (
        <div
            role="alert"
            className={`flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 ${className}`}
        >
            <FaExclamationTriangle aria-hidden="true" className="shrink-0 text-lg text-red-500" />
            <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-red-700">{title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-red-600">{message}</p>
            </div>
            {onRetry && (
                <button
                    type="button"
                    onClick={onRetry}
                    className="shrink-0 rounded-xl border border-red-300 bg-white px-3 py-1.5 text-xs font-bold text-red-700 transition-colors hover:bg-red-100"
                >
                    Try again
                </button>
            )}
        </div>
    );
}
