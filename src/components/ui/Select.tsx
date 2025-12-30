"use client";

import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: SelectOption[];
    error?: string;
    helperText?: string;
    icon?: React.ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className = "", label, options, error, helperText, id, icon, ...props }, ref) => {
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
                <div className="relative">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none z-10 text-lg">
                            {icon}
                        </div>
                    )}
                    <select
                        ref={ref}
                        id={inputId}
                        className={`
                            w-full py-3 rounded-xl border-2 
                            bg-white 
                            border-slate-200
                            text-slate-900
                            focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none
                            transition-all duration-200
                            appearance-none cursor-pointer
                            bg-no-repeat bg-right
                            ${icon ? "pl-11 pr-10" : "px-4"}
                            ${error ? "border-red-500" : ""}
                            ${className}
                        `}
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: "right 0.75rem center",
                            backgroundSize: "1.5em 1.5em",
                        }}
                        {...props}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value} className="bg-white text-slate-900">
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
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

Select.displayName = "Select";

export default Select;
