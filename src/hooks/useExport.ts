"use client";

import { useCallback } from "react";

export interface ExportApi {
    /** Copy text to the clipboard. Returns false when the clipboard is unavailable. */
    copyText: (text: string) => Promise<boolean>;
    /** Trigger a client-side text file download (Blob + anchor). */
    downloadText: (filename: string, content: string, mime?: string) => void;
    /** Trigger a CSV download; accepts pre-joined text or row arrays (quoted automatically). */
    downloadCsv: (filename: string, data: string | string[][]) => void;
}

function escapeCsvCell(value: string): string {
    if (/[",\n]/.test(value)) {
        return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
}

function triggerDownload(filename: string, blob: Blob) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
}

/**
 * One shared implementation of the copy/CSV/TXT export actions previously
 * hand-rolled (differently) inside individual tool components.
 */
export function useExport(): ExportApi {
    const copyText = useCallback(async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            // Clipboard API can be missing on http:// or older browsers.
            return false;
        }
    }, []);

    const downloadText = useCallback((filename: string, content: string, mime = "text/plain") => {
        triggerDownload(filename, new Blob([content], { type: `${mime};charset=utf-8` }));
    }, []);

    const downloadCsv = useCallback((filename: string, data: string | string[][]) => {
        const csv =
            typeof data === "string"
                ? data
                : data.map((row) => row.map(escapeCsvCell).join(",")).join("\n");
        triggerDownload(filename, new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" }));
    }, []);

    return { copyText, downloadText, downloadCsv };
}

export default useExport;
