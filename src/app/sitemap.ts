import { MetadataRoute } from "next";
import { tools } from "@/config/tools";
import { getAllBlogPosts } from "@/config/blog";
import { siteConfig } from "@/config/site";
import { niches, programmaticTools } from "@/config/programmatic";
import { countryCPMData } from "@/lib/cpm-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const blogPosts = getAllBlogPosts();

  // Base routes (without locale)
  const routes = [
    "",
    "/tools",
    "/tools/thumbnail-tools",
    "/tools/seo-tools",
    "/tools/analytics-tools",
    "/about",
    "/contact",
    "/blog",
    "/faq",
    "/resources/youtube-creator-statistics",
    "/resources/link-to-us",
    "/pricing",
    "/privacy-policy",
    "/terms-of-use",
    "/disclaimer",
    "/refund-policy",
    "/tools/vs/tubebuddy",
    "/tools/vs/vidiq",
    "/blog/why-youtube-tools-hub",
  ];

  const allEntries: MetadataRoute.Sitemap = [];

  // Static pages with priority tiers
  const highPriorityRoutes = [
    "/tools",
    "/blog",
    "/about",
    "/faq",
    "/resources/link-to-us",
  ];
  for (const route of routes) {
    allEntries.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "daily" : "weekly",
      priority:
        route === "" ? 1 : highPriorityRoutes.includes(route) ? 0.8 : 0.7,
    });
  }

  // AI discovery files (help search engines and AI crawlers find these)
  const aiDiscoveryFiles = [
    { path: "/llms.txt", priority: 0.3 },
    { path: "/llms-full.txt", priority: 0.3 },
    { path: "/atom.xml", priority: 0.3 },
    { path: "/api/ai-context", priority: 0.2 },
  ];
  for (const file of aiDiscoveryFiles) {
    allEntries.push({
      url: `${baseUrl}${file.path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: file.priority,
    });
  }

  // Dynamic tool pages
  for (const tool of tools) {
    allEntries.push({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  // Dynamic blog pages
  for (const post of blogPosts) {
    allEntries.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // Dynamic programmatic niche pages
  for (const toolSlug of programmaticTools) {
    for (const niche of niches) {
      allEntries.push({
        url: `${baseUrl}/tools/${toolSlug}/${niche.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  // Country-specific earnings calculator pages
  for (const country of countryCPMData) {
    allEntries.push({
      url: `${baseUrl}/tools/youtube-earnings-calculator/${country.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return allEntries;
}
