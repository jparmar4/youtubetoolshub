import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
            <div className="flex flex-col items-center gap-6">
                <LoadingSpinner size="xl" />
                <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">
                    Loading awesome tools...
                </p>
            </div>
        </div>
    );
}
