/**
 * Server-side SEO body for tool pages.
 * Ensures every tool URL has substantial, unique, crawlable copy (Helpful Content + AEO).
 */

import type { Tool } from "@/config/tools";
import { tools } from "@/config/tools";
import { getClusterSiblings } from "@/lib/topic-clusters";

export type SeoSection = { title: string; content: string };
export type SeoFaq = { question: string; answer: string };

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function sectionsWordCount(sections: SeoSection[]): number {
  return sections.reduce((n, s) => n + wordCount(s.title) + wordCount(s.content), 0);
}

function categoryLabel(category: string): string {
  switch (category) {
    case "thumbnail-media":
      return "thumbnail and media";
    case "seo-metadata":
      return "SEO and metadata";
    case "channel-growth":
      return "channel research and growth";
    case "analytics-earnings":
      return "analytics and earnings";
    case "utility-fun":
      return "creator utilities";
    default:
      return "YouTube creator workflows";
  }
}

function relatedToolNames(tool: Tool, limit = 3): string {
  const related = tools
    .filter((t) => t.slug !== tool.slug && t.category === tool.category)
    .slice(0, limit)
    .map((t) => t.name);
  if (related.length) return related.join(", ");
  return tools
    .filter((t) => t.slug !== tool.slug)
    .slice(0, limit)
    .map((t) => t.name)
    .join(", ");
}

function keywordPhrase(tool: Tool): string {
  return (tool.keywords || []).slice(0, 4).join(", ") || tool.shortDescription;
}

/**
 * Generate unique supplemental sections for a tool.
 * Copy is derived from tool metadata so each page differs.
 */
export function buildSupplementalToolSections(tool: Tool): SeoSection[] {
  const cat = categoryLabel(tool.category);
  const keys = keywordPhrase(tool);
  const related = relatedToolNames(tool);
  const aiNote = tool.isAI
    ? "This tool uses AI-assisted generation. Treat every output as a draft: fact-check claims, remove hype that the video cannot deliver, and keep packaging aligned with YouTube policies."
    : "This tool runs as a browser utility without requiring a YouTube password. It works with public data or the inputs you provide, so you stay in control of what gets published.";

  const useCases =
    tool.category === "thumbnail-media"
      ? "thumbnail research, CTR packaging tests, competitor visual references, and recovering your own public artwork"
      : tool.category === "seo-metadata"
        ? "search-intent titles, tag research, description structure, and cleaner metadata before upload"
        : tool.category === "analytics-earnings"
          ? "revenue planning, engagement checks, and comparing country or niche assumptions"
          : tool.category === "channel-growth"
            ? "topic research, naming, calendars, and early channel positioning"
            : "day-to-day creator tasks that should stay fast and free";

  const sections: SeoSection[] = [
    {
      title: `What ${tool.name} is (and what it is not)`,
      content: `${tool.name} is a free ${cat} tool on YouTube Tools Hub designed for ${useCases}. ${tool.definitionBlock?.text || tool.description} ${aiNote} It is not a substitute for YouTube Studio analytics, official Partner Program decisions, or legal advice. Use it to move faster on drafts and planning, then verify important numbers and claims in primary sources.`,
    },
    {
      title: `Who should use ${tool.name}`,
      content: `Creators searching for ${keys} will get the most value when they already know their audience and video promise. Beginners can use ${tool.name} to learn a repeatable workflow. Growing channels can batch outputs across a content calendar. Teams can standardize how metadata or packaging is drafted before review. If you are comparing free alternatives to paid browser extensions, this page is meant to solve a focused job without forcing an install.`,
    },
    {
      title: `How to get better results with ${tool.name}`,
      content: `Start with a specific input—topic, URL, niche, or goal—not a vague phrase. Generate once, then edit for accuracy, brand voice, and policy safety. Pair ${tool.name} with related tools such as ${related} so packaging, metadata, and planning stay consistent across the same video. Track the outcome in YouTube Studio (CTR, retention, traffic sources) and feed those learnings back into the next draft. Consistency beats one-off “viral” experiments.`,
    },
    {
      title: `Best practices and common mistakes`,
      content: `Do: match title, thumbnail, and description to the actual video; prefer clarity over empty hype; keep tags and hashtags relevant; document what worked. Don't: publish unedited AI text as factual advice; stuff keywords; reuse other creators' thumbnails or scripts without rights; assume estimated earnings equal guaranteed AdSense payouts. For monetization tools, always compare estimates with your Studio RPM and audience geography.`,
    },
    {
      title: `Privacy, limits, and responsible use`,
      content: `${tool.name} is free to try in the browser. Some AI-backed features may enforce fair-use rate limits so the service stays available for everyone. We do not ask for your YouTube password. When a tool accepts a public video URL, it only uses publicly available information. You remain responsible for copyright, disclosures, and Community Guidelines on anything you publish.`,
    },
    {
      title: `Next steps after you finish`,
      content: `When you are happy with the draft from ${tool.name}, move the assets into YouTube Studio, set end screens and playlists, and schedule with a realistic cadence. Explore the free suite for adjacent jobs (${related}). For strategy depth, read the monetization, algorithm, and CPM resources on this site, then re-run this tool after you learn which topics earn attention and revenue for your channel.`,
    },
  ];

  // Category-specific extra section for more uniqueness
  if (tool.category === "analytics-earnings") {
    sections.splice(3, 0, {
      title: "How to read earnings estimates correctly",
      content:
        "Estimated earnings use a simple planning formula: (views ÷ 1,000) × RPM. RPM is not the same as advertiser CPM. Country mix, niche, seasonality, ad formats, and eligibility all change outcomes. Use country pages and the CPM rates table for directional ranges, then validate with your own Studio revenue report before making budget decisions.",
    });
  } else if (tool.category === "thumbnail-media") {
    sections.splice(3, 0, {
      title: "Thumbnail quality checklist",
      content:
        "Aim for 1280×720 (16:9), under 2MB, readable on a phone screen, one clear idea, and honest representation of the video. Test contrast against both light and dark YouTube UI. If you download a competitor thumbnail for research, use it for learning—not as your upload. Pair strong visuals with a title that completes the same promise.",
    });
  } else if (tool.category === "seo-metadata") {
    sections.splice(3, 0, {
      title: "Metadata that matches search intent",
      content:
        "Write for the query the viewer actually typed. Front-load the clearest keyword in the title when it still reads naturally. Use descriptions for context, chapters, and links—not walls of repeated phrases. Tags should clarify topic boundaries, not spam. After publishing, watch Search terms and Suggested traffic to see whether intent matched the packaging.",
    });
  }

  return sections;
}

export function buildSupplementalFaqs(tool: Tool): SeoFaq[] {
  const keys = keywordPhrase(tool);
  return [
    {
      question: `Is ${tool.name} free?`,
      answer: `Yes. Core access to ${tool.name} on YouTube Tools Hub is free in the browser. Optional Pro limits may apply to heavy AI usage on some tools, but you can start without a credit card.`,
    },
    {
      question: `Do I need to install an extension for ${tool.name}?`,
      answer: `No. ${tool.name} runs on the website. You do not need TubeBuddy, VidIQ, or another browser extension for this workflow.`,
    },
    {
      question: `Does ${tool.name} access my private YouTube account?`,
      answer: `No. The tool does not ask for your YouTube password. It works with public URLs or the text you enter. Always review outputs before publishing.`,
    },
    {
      question: `What keywords is ${tool.name} useful for?`,
      answer: `Creators typically use it when researching or producing content related to: ${keys}. Focus on one clear job per session for better drafts.`,
    },
    {
      question: `How is this different from paid YouTube SEO tools?`,
      answer: `${tool.name} focuses on a specific free workflow rather than a full paid suite. Many creators use free tools for drafts and only pay for software when they need deeper competitor databases or team features.`,
    },
    {
      question: `Can I use the output commercially on my channel?`,
      answer: `You can use drafts you generate for your own channel, but you must ensure the final content complies with copyright, trademark, and YouTube policies. AI drafts can be wrong—edit carefully.`,
    },
  ];
}

/** Merge existing tool content with supplements until word floor is met */
export function getToolSeoSections(tool: Tool, minWords = 380): SeoSection[] {
  const existing = tool.content ? [...tool.content] : [];
  if (sectionsWordCount(existing) >= minWords) {
    return existing;
  }

  const supplemental = buildSupplementalToolSections(tool);
  const seen = new Set(existing.map((s) => s.title.toLowerCase()));
  const merged = [...existing];
  for (const section of supplemental) {
    if (sectionsWordCount(merged) >= minWords) break;
    if (seen.has(section.title.toLowerCase())) continue;
    seen.add(section.title.toLowerCase());
    merged.push(section);
  }
  return merged;
}

export function getToolSeoFaqs(tool: Tool, minCount = 6): SeoFaq[] {
  const existing = tool.faqs ? [...tool.faqs] : [];
  if (existing.length >= minCount) return existing;

  const seen = new Set(existing.map((f) => f.question.toLowerCase()));
  const merged = [...existing];
  for (const faq of buildSupplementalFaqs(tool)) {
    if (merged.length >= minCount) break;
    if (seen.has(faq.question.toLowerCase())) continue;
    seen.add(faq.question.toLowerCase());
    merged.push(faq);
  }
  return merged;
}

/** Plain-text internal link targets for a tool path */
export function getToolClusterLinks(toolSlug: string): { path: string; title: string }[] {
  return getClusterSiblings(`/tools/${toolSlug}`, 5).map((s) => ({
    path: s.path,
    title: s.title,
  }));
}

export function getToolSeoStats(tool: Tool): {
  sectionWords: number;
  faqCount: number;
  meetsFloor: boolean;
} {
  const sections = getToolSeoSections(tool);
  const faqs = getToolSeoFaqs(tool);
  const sectionWords = sectionsWordCount(sections);
  return {
    sectionWords,
    faqCount: faqs.length,
    meetsFloor: sectionWords >= 380 && faqs.length >= 6,
  };
}
