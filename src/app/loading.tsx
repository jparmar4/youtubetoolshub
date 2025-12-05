export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                {/* Animated loader */}
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-500 animate-spin"></div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Loading...</p>
            </div>
        </div>
    );
}
