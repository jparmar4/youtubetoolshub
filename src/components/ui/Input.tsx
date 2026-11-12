"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", label, error, helperText, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-semibold text-slate-800 mb-1.5"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={`
            w-full px-4 py-2.5 sm:py-3 rounded-xl border
            bg-white
            border-slate-300/90 hover:border-slate-400
            text-slate-900 text-sm sm:text-base
            placeholder-slate-400
            shadow-2xs
            focus:border-purple-600 focus:ring-4 focus:ring-purple-500/10 focus:outline-none
            transition-all duration-200
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/15" : ""}
            ${className}
          `}
                    {...props}
                />
                {error && (
                    <p className="mt-1.5 text-sm font-medium text-red-600">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-500">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className = "", label, error, helperText, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-semibold text-slate-800 mb-1.5"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={inputId}
                    className={`
            w-full px-4 py-3 rounded-xl border
            bg-white
            border-slate-300/90 hover:border-slate-400
            text-slate-900 text-sm sm:text-base
            placeholder-slate-400
            shadow-2xs
            focus:border-purple-600 focus:ring-4 focus:ring-purple-500/10 focus:outline-none
            transition-all duration-200
            resize-y min-h-[120px]
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/15" : ""}
            ${className}
          `}
                    {...props}
                />
                {error && (
                    <p className="mt-1.5 text-sm font-medium text-red-600">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-500">{helperText}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";
