import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

/**
 * Underscore alias kept for legacy crawlers/bookmarks.
 * Canonical index is /sitemap-index.xml — 301 here to avoid dual submission.
 */
export async function GET() {
  return NextResponse.redirect(`${siteConfig.url}/sitemap-index.xml`, 301);
}
