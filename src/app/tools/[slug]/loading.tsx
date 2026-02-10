export default function Loading() {
    return (
        <div className="w-full">
            <div className="max-w-6xl mx-auto">
                {/* Header Skeleton */}
                <div className="text-center mb-10">
                    <div className="h-10 w-3/4 md:w-1/2 bg-slate-200 rounded-lg mx-auto mb-4 animate-pulse" />
                    <div className="h-6 w-full md:w-2/3 bg-slate-100 rounded-lg mx-auto animate-pulse" />
                </div>

                {/* Content Skeleton */}
                <div className="glass-premium rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 mb-8 bg-white/50">
                    <div className="space-y-6">
                        <div className="h-12 w-full bg-slate-100 rounded-xl animate-pulse" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="h-32 bg-slate-100 rounded-xl animate-pulse" />
                            <div className="h-32 bg-slate-100 rounded-xl animate-pulse" />
                        </div>
                        <div className="h-12 w-1/3 bg-slate-200 rounded-xl mx-auto animate-pulse" />
                    </div>
                </div>

                {/* FAQ Skeleton */}
                <div className="glass-premium rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 bg-white/50">
                    <div className="h-8 w-1/3 bg-slate-200 rounded-lg mb-6 animate-pulse" />
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="border-b border-slate-200 pb-6 last:border-b-0 last:pb-0">
                                <div className="h-6 w-3/4 bg-slate-100 rounded mb-2 animate-pulse" />
                                <div className="h-4 w-full bg-slate-50 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
