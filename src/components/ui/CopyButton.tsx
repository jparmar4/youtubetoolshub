"use client";

import { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

interface CopyButtonProps {
    text: string;
    className?: string;
    variant?: "icon" | "button";
    label?: string;
}

export default function CopyButton({
    text,
    className = "",
    variant = "icon",
    label = "Copy"
}: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    if (variant === "icon") {
        return (
            <button
                onClick={handleCopy}
                className={`
          p-2 rounded-lg transition-all duration-200
          ${copied
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    }
          ${className}
        `}
                title={copied ? "Copied!" : "Copy to clipboard"}
                aria-label={copied ? "Copied!" : "Copy to clipboard"}
            >
                {copied ? <FaCheck className="w-4 h-4" /> : <FaCopy className="w-4 h-4" />}
            </button>
        );
    }

    return (
        <button
            onClick={handleCopy}
            className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200
        ${copied
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                }
        ${className}
      `}
        >
            {copied ? <FaCheck className="w-4 h-4" /> : <FaCopy className="w-4 h-4" />}
            {copied ? "Copied!" : label}
        </button>
    );
}
