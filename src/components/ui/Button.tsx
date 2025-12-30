"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

        const variants = {
            primary: "bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white shadow-lg hover:shadow-purple-500/25 focus:ring-purple-500",
            secondary: "bg-gradient-to-r from-violet-900 to-violet-800 hover:from-violet-950 hover:to-violet-900 text-white shadow-lg focus:ring-violet-500",
            outline: "border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white focus:ring-purple-500",
            ghost: "text-slate-400 hover:text-purple-400 hover:bg-purple-500/10",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Loading...
                    </>
                ) : children}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;
