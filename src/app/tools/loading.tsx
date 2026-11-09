export default function Loading() {
    return (
        <div className="min-h-[40vh] flex items-center justify-center bg-transparent">
            <div className="h-8 w-8 rounded-full border-2 border-purple-200 border-t-purple-600 animate-spin" aria-label="Loading" />
        </div>
    );
}
