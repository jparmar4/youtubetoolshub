import { GeoAeoHeadProps } from "@/config/geo-aeo";
import { siteConfig } from "@/config/site";

/**
 * Page-level GEO/AEO signals for search + AI answer engines.
 *
 * Always emits exactly one WebPage entity for the URL, linked to the site graph.
 *
 * It deliberately does NOT adopt `entityType` as its own `@type`. Tool and blog
 * pages already emit their primary entity (SoftwareApplication / BlogPosting)
 * with its own @id; if this component also claimed that type for the same URL,
 * the page would ship two competing primary entities and Google tends to ignore
 * both. The specific type is expressed as `mainEntity` instead, which is what
 * "this page is about a SoftwareApplication" actually means in schema.org.
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

  const pageSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    name: title || siteConfig.name,
    url: pageUrl,
    description: description || siteConfig.description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    isAccessibleForFree: true,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [
        "h1",
        "[data-speakable]",
        ".summary",
        ".quick-answer",
        ".key-takeaways",
        ".key-facts",
      ],
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

  // What the page is primarily about. `conciseAnswer` is the AEO citation
  // snippet answer engines can lift; the type comes from entityType/isTool.
  const mainEntityType =
    entityType && entityType !== "WebPage"
      ? entityType
      : isTool
        ? "SoftwareApplication"
        : null;

  if (conciseAnswer) {
    pageSchema.abstract = conciseAnswer;
  }
  if (mainEntityType || conciseAnswer) {
    pageSchema.mainEntity = {
      "@type": mainEntityType ?? "Thing",
      name: toolName || primaryTopic || title || siteConfig.name,
      ...(conciseAnswer ? { description: conciseAnswer } : {}),
    };
  }

  if (keyFacts && keyFacts.length > 0) {
    pageSchema.keywords = keyFacts.join(", ");
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
    />
  );
}
