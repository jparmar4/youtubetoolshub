/**
 * Tool comparison content generator for programmatic SEO.
 * Generates unique comparison pages for every pair of tools.
 * Pattern follows programmatic.ts getNicheContent().
 */

import { Tool, tools } from "@/config/tools";

export interface ComparisonContent {
  title: string;
  description: string;
  sections: { title: string; content: string }[];
  faqs: { question: string; answer: string }[];
}

/**
 * Generate all valid comparison pairs (sorted alphabetically to prevent duplicates).
 * Returns 351 pairs for 27 tools (27 choose 2).
 */
export function getComparisonPairs(): { toolA: string; toolB: string }[] {
  const slugs = tools.map((t) => t.slug).sort();
  const pairs: { toolA: string; toolB: string }[] = [];

  for (let i = 0; i < slugs.length; i++) {
    for (let j = i + 1; j < slugs.length; j++) {
      pairs.push({ toolA: slugs[i], toolB: slugs[j] });
    }
  }

  return pairs;
}

/** Shorten tool name for readability */
function shortName(name: string): string {
  return name.replace(/^YouTube\s+/i, "").replace(/\s+Generator$/i, " Generator");
}

/**
 * Generate comparison content for two tools.
 */
export function getComparisonContent(
  toolA: Tool,
  toolB: Tool,
): ComparisonContent {
  const a = shortName(toolA.name);
  const b = shortName(toolB.name);
  const catA = toolA.category;
  const catB = toolB.category;
  const sameCategory = catA === catB;

  return {
    title: `${toolA.name} vs ${toolB.name}: Which Should You Use?`,
    description: `Compare ${a} and ${b} side by side. Discover which free YouTube tool fits your creator workflow — features, use cases, and recommendations.`,
    sections: [
      {
        title: `${a} vs ${b} — Quick Overview`,
        content: `Both ${a} and ${b} are free tools on YouTube Tools Hub designed to help creators optimize their workflow. ${a} falls under ${catA} and focuses on ${toolA.shortDescription.toLowerCase()}. ${b} falls under ${catB} and focuses on ${toolB.shortDescription.toLowerCase()}. ${sameCategory ? `Since both are ${catA} tools, choosing between them depends on your specific task.` : `They serve different purposes — ${a} for ${catA.toLowerCase()} tasks and ${b} for ${catB.toLowerCase()} tasks — and work best when used together.`}`,
      },
      {
        title: `When to Use ${a}`,
        content: `${toolA.name} is best when you need to ${toolA.shortDescription.toLowerCase()}. ${toolA.isAI ? "It uses AI-assisted generation to save you time and suggest optimized outputs." : "It runs entirely in your browser with no signup required."} Typical use cases include preparing metadata before publishing, optimizing existing content, or brainstorming new ideas. ${toolA.faqs?.[0]?.answer ? toolA.faqs[0].answer.slice(0, 150) + "..." : ""}`,
      },
      {
        title: `When to Use ${b}`,
        content: `${toolB.name} is best when you need to ${toolB.shortDescription.toLowerCase()}. ${toolB.isAI ? "It uses AI-assisted generation to deliver tailored suggestions based on your input." : "It provides instant results directly in your browser — no extension or signup needed."} This tool shines when you want to ${catB === "SEO" ? "improve your search rankings" : catB === "Thumbnail" ? "improve your click-through rate" : catB === "Analytics" ? "understand your channel performance" : "streamline your creator workflow"}.`,
      },
      {
        title: `Feature Comparison`,
        content: `${a}: Category — ${catA}. ${toolA.isAI ? "AI-powered" : "Browser-based"}. Free to use. ${toolA.keywords.slice(0, 4).join(", ")}.\n\n${b}: Category — ${catB}. ${toolB.isAI ? "AI-powered" : "Browser-based"}. Free to use. ${toolB.keywords.slice(0, 4).join(", ")}.\n\nBoth tools are completely free and require no browser extension, account, or credit card. They complement each other in a full YouTube optimization workflow.`,
      },
      {
        title: `Using ${a} and ${b} Together`,
        content: `The best creators don't choose one tool — they combine several. ${sameCategory ? `Even within ${catA}, ${a} and ${b} serve different angles. Use ${a} first to ${toolA.shortDescription.toLowerCase()}, then switch to ${b} to ${toolB.shortDescription.toLowerCase()}.` : `Start with ${a} for your ${catA.toLowerCase()} needs, then use ${b} for ${catB.toLowerCase()}. This gives you a complete workflow from content planning to publishing.`} Pair these with other free tools like the Title Generator, Tag Generator, and Thumbnail Downloader for a full optimization pipeline.`,
      },
      {
        title: `Which Tool Should You Pick?`,
        content: `If your primary goal is ${toolA.shortDescription.toLowerCase()}, start with ${a}. If you need to ${toolB.shortDescription.toLowerCase()}, go with ${b}. For most creators, both tools are part of a healthy pre-publish checklist. Since they're free, try both and see which fits your workflow. Neither requires a subscription or browser extension — unlike paid alternatives like TubeBuddy or VidIQ.`,
      },
    ],
    faqs: [
      {
        question: `Is ${toolA.name} better than ${toolB.name}?`,
        answer: `They serve different purposes. ${a} focuses on ${toolA.shortDescription.toLowerCase()}, while ${b} focuses on ${toolB.shortDescription.toLowerCase()}. Most creators benefit from using both as part of their workflow.`,
      },
      {
        question: `Are both tools free to use?`,
        answer: `Yes. Both ${a} and ${b} are 100% free on YouTube Tools Hub. No signup, no extension, and no credit card required. Some AI features may have daily usage limits.`,
      },
      {
        question: `Can I use ${a} and ${b} together?`,
        answer: `Absolutely. They complement each other well. Use ${a} for ${catA.toLowerCase()} optimization and ${b} for ${catB.toLowerCase()} tasks. Together they cover more of your pre-publish checklist.`,
      },
      {
        question: `Do I need TubeBuddy or VidIQ instead?`,
        answer: `Not necessarily. Both ${a} and ${b} offer free browser-based alternatives to many features found in paid tools. Start here and upgrade to extensions only if you need features like bulk processing or real-time analytics overlays.`,
      },
      {
        question: `Which tool helps with YouTube SEO more?`,
        answer: `${catA === "SEO" ? a : catB === "SEO" ? b : `Neither is a dedicated SEO tool, but both contribute to better optimization. For dedicated SEO, try the Tag Generator or Description Generator.`}${catA === "SEO" ? ` is specifically designed for SEO tasks.` : catB === "SEO" ? ` is specifically designed for SEO tasks.` : ""}`,
      },
      {
        question: `How often should I use these tools?`,
        answer: `Use them every time you publish a new video. Running your titles, tags, descriptions, and thumbnails through optimization tools before uploading consistently improves CTR and discoverability over time.`,
      },
    ],
  };
}
