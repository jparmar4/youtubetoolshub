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
                        className="block text-sm font-medium text-slate-700 mb-2"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={`
            w-full px-4 py-3 rounded-xl border-2 
            bg-white
            border-slate-200
            text-slate-900
            placeholder-slate-400
            focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none
            transition-all duration-200
            ${error ? "border-red-500" : ""}
            ${className}
          `}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1 text-sm text-slate-500">{helperText}</p>
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
                        className="block text-sm font-medium text-slate-700 mb-2"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={inputId}
                    className={`
            w-full px-4 py-3 rounded-xl border-2 
            bg-white
            border-slate-200
            text-slate-900
            placeholder-slate-400
            focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none
            transition-all duration-200
            resize-y min-h-[120px]
            ${error ? "border-red-500" : ""}
            ${className}
          `}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-400">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1 text-sm text-slate-400">{helperText}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";
