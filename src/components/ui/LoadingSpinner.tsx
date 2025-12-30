export default function LoadingSpinner({ size = "md", className = "" }: { size?: "sm" | "md" | "lg" | "xl", className?: string }) {
    const sizes = {
        sm: "w-5 h-5 border-2",
        md: "w-8 h-8 border-3",
        lg: "w-12 h-12 border-4",
        xl: "w-16 h-16 border-4"
    };

    return (
        <div className={`relative ${sizes[size]} ${className}`}>
            <div className={`absolute inset-0 rounded-full border-gray-200 dark:border-gray-800 ${sizes[size] === "w-5 h-5 border-2" ? "border-2" : "border-4"}`}></div>
            <div className={`absolute inset-0 rounded-full border-transparent border-t-emerald-500 animate-spin ${sizes[size] === "w-5 h-5 border-2" ? "border-2" : "border-4"}`}></div>
        </div>
    );
}
