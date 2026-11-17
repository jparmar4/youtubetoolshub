import Link from "next/link";
import { FaYoutube } from "react-icons/fa";

export interface YouTubeApiAttributionProps {
  className?: string;
}

/**
 * Required YouTube API Services branding & legal attribution footer badge
 * displayed below tools that surface public metadata via YouTube API Services.
 */
export default function YouTubeApiAttribution({
  className = "",
}: YouTubeApiAttributionProps) {
  return (
    <div
      className={`mt-6 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-500 ${className}`.trim()}
    >
      <div className="inline-flex items-center gap-2 font-medium text-slate-600">
        <FaYoutube className="w-4 h-4 text-red-600 shrink-0" aria-hidden="true" />
        <span>Data powered by YouTube API Services</span>
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
        <a
          href="https://www.youtube.com/t/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-800 underline underline-offset-2"
        >
          YouTube Terms of Service
        </a>
        <span aria-hidden="true">·</span>
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-800 underline underline-offset-2"
        >
          Google Privacy Policy
        </a>
        <span aria-hidden="true">·</span>
        <Link
          href="/privacy-policy#youtube-api-services"
          className="hover:text-slate-800 underline underline-offset-2"
        >
          API Disclosure
        </Link>
      </div>
    </div>
  );
}
