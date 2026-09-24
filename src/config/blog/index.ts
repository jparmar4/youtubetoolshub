// Blog post data - SEO optimized, human-written content

import { NOINDEX_BLOG_SLUGS } from "@/config/index-policy";

import type { BlogPost } from "./types";
import { posts1 } from "./data/posts-1";
import { posts2 } from "./data/posts-2";
import { posts3 } from "./data/posts-3";
import { posts4 } from "./data/posts-4";
import { posts5 } from "./data/posts-5";

export type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [
  ...posts1,
  ...posts2,
  ...posts3,
  ...posts4,
  ...posts5,
];

// Posts retained only as permanent redirects. Keeping them out of every public
// collection prevents redirecting URLs from leaking into the sitemap, feeds,
// search results, and related-post modules.
const RETIRED_BLOG_SLUGS = new Set<string>([]);

const isPublishedBlogPost = (post: BlogPost): boolean =>
  !RETIRED_BLOG_SLUGS.has(post.slug);

// Helper functions

/**
 * Parse editorial dates like "July 31, 2026" into a stable ISO string.
 * Uses the local calendar day at UTC noon so schema dates don't shift
 * back one day in positive UTC offsets (e.g. IST).
 */
export function toBlogIsoDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Date(
    Date.UTC(
      parsed.getFullYear(),
      parsed.getMonth(),
      parsed.getDate(),
      12,
      0,
      0,
    ),
  ).toISOString();
}

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(
    (post) => post.slug === slug && isPublishedBlogPost(post),
  );
};

export const getAllBlogPosts = (): BlogPost[] => {
  // Dedupe by slug (safety if array ever re-acquires duplicates)
  const bySlug = new Map<string, BlogPost>();
  for (const post of blogPosts) {
    if (!isPublishedBlogPost(post)) continue;
    if (!bySlug.has(post.slug)) bySlug.set(post.slug, post);
  }
  return [...bySlug.values()].sort(
    (a, b) =>
      new Date(toBlogIsoDate(b.date)).getTime() -
      new Date(toBlogIsoDate(a.date)).getTime(),
  );
};

/** Posts allowed in sitemaps, related modules, and AI discovery files. */
export const getIndexableBlogPosts = (): BlogPost[] => {
  return getAllBlogPosts().filter((post) => !NOINDEX_BLOG_SLUGS.has(post.slug));
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(
    (post) => post.category === category && isPublishedBlogPost(post),
  );
};

export const getRelatedPosts = (
  currentSlug: string,
  limit: number = 3,
): BlogPost[] => {
  const currentPost = getBlogPostBySlug(currentSlug);
  if (!currentPost) return [];

  return getIndexableBlogPosts()
    .filter((post) => post.slug !== currentSlug)
    .filter(
      (post) =>
        post.category === currentPost.category ||
        post.keywords.some((keyword) => currentPost.keywords.includes(keyword)),
    )
    .slice(0, limit);
};
