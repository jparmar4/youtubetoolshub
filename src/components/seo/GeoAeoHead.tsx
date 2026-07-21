import { GeoAeoHeadProps } from "@/config/geo-aeo";
import { siteConfig } from "@/config/site";

/**
 * Page-level GEO/AEO signals for search + AI answer engines.
 *
 * Emits a single stable WebPage JSON-LD entity (linked to the site graph)
 * plus optional speakable / about fields. Avoids stacking conflicting
 * WebApplication + Service + ProfilePage claims on every URL.
 */
export default function GeoAeoHead({
  title,
  description,
  primaryTopic,
  dateModified,
  author,
  authorRole,
  conciseAnswer,
  keyFacts,
  entityType,
  isTool,
  toolName,
  toolCategory,
  disabled = false,
  pathname,
}: GeoAeoHeadProps & { pathname: string }) {
  if (disabled) return null;

  const suppressedPaths = [
    "/dashboard",
    "/sign-in",
    "/auth",
    "/history",
    "/upgrade",
  ];
  if (suppressedPaths.some((path) => pathname.startsWith(path))) return null;

  const pageUrl = `${siteConfig.url}${pathname || ""}`;
  const schemaType =
    entityType || (isTool ? "SoftwareApplication" : "WebPage");

  const pageSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "@id": `${pageUrl}#webpage`,
    name: title || siteConfig.name,
    url: pageUrl,
    description: description || siteConfig.description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    isAccessibleForFree: true,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]", ".summary", ".key-facts"],
    },
  };

  if (primaryTopic || toolName) {
    pageSchema.about = {
      "@type": "Thing",
      name: primaryTopic || toolName,
      ...(toolCategory ? { description: `Category: ${toolCategory}` } : {}),
    };
  }

  if (dateModified) {
    pageSchema.dateModified = dateModified;
  }

  if (author) {
    pageSchema.author = {
      "@type": "Person",
      name: author,
      ...(authorRole ? { jobTitle: authorRole } : {}),
    };
  }

  // AEO: concise answer engines can lift this as a citation snippet
  if (conciseAnswer) {
    pageSchema.abstract = conciseAnswer;
    pageSchema.mainEntity = {
      "@type": "Thing",
      name: primaryTopic || title || siteConfig.name,
      description: conciseAnswer,
    };
  }

  if (keyFacts && keyFacts.length > 0) {
    pageSchema.keywords = keyFacts.join(", ");
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      {/* Visible-to-crawlers micro-summary (not hidden CSS) for AEO/GEO */}
      {(conciseAnswer || (keyFacts && keyFacts.length > 0)) && (
        <div className="sr-only" aria-hidden="false">
          {conciseAnswer && (
            <p className="summary" data-speakable>
              {conciseAnswer}
            </p>
          )}
          {keyFacts && keyFacts.length > 0 && (
            <ul className="key-facts">
              {keyFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
