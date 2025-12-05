import { memo } from "react";

interface SkeletonProps {
    className?: string;
    variant?: "text" | "circular" | "rectangular";
    width?: string | number;
    height?: string | number;
    lines?: number;
}

function Skeleton({
    className = "",
    variant = "rectangular",
    width,
    height,
    lines = 1,
}: SkeletonProps) {
    const baseClasses = "skeleton rounded animate-pulse";

    const variantClasses = {
        text: "h-4 w-full",
        circular: "rounded-full",
        rectangular: "rounded-lg",
    };

    const style: React.CSSProperties = {
        width: width || (variant === "circular" ? height : undefined),
        height: height,
    };

    if (variant === "text" && lines > 1) {
        return (
            <div className={`space-y-2 ${className}`}>
                {Array.from({ length: lines }).map((_, i) => (
                    <div
                        key={i}
                        className={`${baseClasses} ${variantClasses.text}`}
                        style={{
                            width: i === lines - 1 ? "75%" : "100%",
                            height: height || "1rem",
                        }}
                    />
                ))}
            </div>
        );
    }

    return (
        <div
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            style={style}
        />
    );
}

// Card Skeleton for tool cards
export function ToolCardSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-start gap-4">
                <Skeleton variant="rectangular" width={48} height={48} className="rounded-xl flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <Skeleton variant="text" height={20} className="mb-2" />
                    <Skeleton variant="text" lines={2} height={14} />
                </div>
            </div>
            <Skeleton variant="text" width={80} height={16} className="mt-4" />
        </div>
    );
}

// Blog Card Skeleton
export function BlogCardSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <Skeleton variant="rectangular" width={80} height={24} className="rounded-full mb-3" />
            <Skeleton variant="text" lines={2} height={18} className="mb-2" />
            <Skeleton variant="text" lines={2} height={14} className="mb-4" />
            <div className="flex items-center justify-between">
                <Skeleton variant="text" width={60} height={12} />
                <Skeleton variant="text" width={70} height={14} />
            </div>
        </div>
    );
}

// Section Skeleton
export function SectionSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <ToolCardSkeleton key={i} />
            ))}
        </div>
    );
}

// Page Header Skeleton
export function PageHeaderSkeleton() {
    return (
        <div className="text-center mb-12">
            <Skeleton variant="rectangular" width={200} height={40} className="mx-auto mb-4" />
            <Skeleton variant="text" width={400} height={20} className="mx-auto" />
        </div>
    );
}

export default memo(Skeleton);
