import { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { getToolBySlug } from "@/config/tools";
import { siteConfig } from "@/config/site";

/**
 * Tool × niche landings were thin programmatic templates that were retired.
 * Instead of returning 404, this route permanently redirects all legacy/external
 * crawler requests back to the canonical parent tool page (or /tools fallback).
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; niche: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  const dest = tool ? `${siteConfig.url}/tools/${slug}` : `${siteConfig.url}/tools`;

  return {
    title: "Moved permanently",
    robots: { index: false, follow: true },
    alternates: { canonical: dest },
  };
}

export default async function ProgrammaticToolPage({
  params,
}: {
  params: Promise<{ slug: string; niche: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (tool) {
    permanentRedirect(`/tools/${slug}`);
  } else {
    permanentRedirect("/tools");
  }
}
