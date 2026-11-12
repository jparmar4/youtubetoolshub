"use client";

import { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";
import { toast } from "./Toast";

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
            toast.error("Copy failed — your browser blocked clipboard access. Select the text and copy manually.");
        }
    };

    if (variant === "icon") {
        return (
            <button
                type="button"
                onClick={handleCopy}
                className={`
          p-2.5 min-w-10 min-h-10 inline-flex items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer
          ${copied
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700"
                    }
          ${className}
        `}
                title={copied ? "Copied!" : "Copy to clipboard"}
                aria-label={copied ? "Copied!" : "Copy to clipboard"}
            >
                {copied ? <FaCheck className="w-3.5 h-3.5" /> : <FaCopy className="w-3.5 h-3.5" />}
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={handleCopy}
            className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 cursor-pointer
        ${copied
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-purple-300 hover:text-purple-700 shadow-2xs"
                }
        ${className}
      `}
        >
            {copied ? <FaCheck className="w-3.5 h-3.5" /> : <FaCopy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : label}
        </button>
    );
}
