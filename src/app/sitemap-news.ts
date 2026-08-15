import { MetadataRoute } from "next";

/**
 * This site is not a Google News publisher. An empty news sitemap is safer
 * than submitting blog posts as "news" (that can look like spam).
 */
export default function newsSitemap(): MetadataRoute.Sitemap {
  return [];
}

export const dynamic = "force-static";
