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
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className = "", label, options, error, helperText, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                    >
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    id={inputId}
                    className={`
            w-full px-4 py-3 rounded-xl border-2 
            bg-white dark:bg-gray-800 
            border-gray-200 dark:border-gray-600
            text-gray-900 dark:text-white
            focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none
            transition-all duration-200
            appearance-none cursor-pointer
            bg-no-repeat bg-right
            ${error ? "border-red-500" : ""}
            ${className}
          `}
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: "right 0.75rem center",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                    }}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
                )}
            </div>
        );
    }
);

Select.displayName = "Select";

export default Select;
