import { GeoAeoHeadProps } from "@/config/geo-aeo";
import { siteConfig } from "@/config/site";

/**
 * Adds one truthful page-level entity to the structured-data graph.
 *
 * Search engines do not award rankings for the volume of schema markup. Keeping
 * this component to a single stable WebPage record prevents conflicting
 * WebApplication, Service, ProfilePage, and freshness claims on every page.
 */
export default function GeoAeoHead({
  title,
  description,
  primaryTopic,
  dateModified,
  author,
  authorRole,
  disabled = false,
  pathname,
}: GeoAeoHeadProps & { pathname: string }) {
  if (disabled) return null;

  const suppressedPaths = ["/dashboard", "/sign-in", "/auth", "/history", "/upgrade"];
  if (suppressedPaths.some((path) => pathname.startsWith(path))) return null;

  const pageUrl = `${siteConfig.url}${pathname || ""}`;
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    name: title || siteConfig.name,
    url: pageUrl,
    description: description || siteConfig.description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    ...(primaryTopic
      ? {
          about: {
            "@type": "Thing",
            name: primaryTopic,
          },
        }
      : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(author
      ? {
          author: {
            "@type": "Person",
            name: author,
            ...(authorRole ? { jobTitle: authorRole } : {}),
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
    />
  );
}
