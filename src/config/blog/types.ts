export interface BlogPost {
  slug: string;
  title: string;
  /**
   * Optional hand-written `<title>` for search results, used verbatim.
   * Set this when `title` is longer than ~60 characters: automatic shortening
   * can only cut on a word boundary, which often leaves a dangling phrase
   * ("… Create Professional"). Aim for 50–60 chars, keyword front-loaded.
   */
  seoTitle?: string;
  excerpt: string;
  date: string;
  /**
   * Editorial "Last updated" date (e.g. "September 24, 2026"). Same format as
   * `date`. Only set when content was materially revised — a real value drives
   * dateModified, sitemap lastmod, and the visible "Updated" line. Leave
   * undefined rather than fabricating freshness.
   */
  updatedAt?: string;
  category: string;
  author: string;
  authorRole: string;
  readTime: string;
  content: string;
  metaDescription: string;
  keywords: string[];
  coverImage: string;
  imageAlt: string;
  faq: {
    question: string;
    answer: string;
  }[];
  rating?: {
    ratingValue: string;
    ratingCount: string;
    bestRating?: string;
    worstRating?: string;
  };
  video?: {
    title: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    duration: string;
    embedUrl: string;
  };
}
