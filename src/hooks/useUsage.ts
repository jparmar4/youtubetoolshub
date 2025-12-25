"use client";

import { useUsageContext } from "@/context/UsageContext";

// New hook implementation that just exposes the context
// This keeps the API identical so components don't break
export function useUsage() {
    return useUsageContext();
}
