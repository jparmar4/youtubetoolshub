/**
 * Server-side SEO body for tool pages.
 * Ensures every tool URL has substantial, category-differentiated, crawlable copy (Helpful Content + AEO).
 */

import type { Tool, ToolCategoryId } from "@/config/tools";
import { tools } from "@/config/tools";
import { getClusterSiblings } from "@/lib/topic-clusters";
import { toolExamples } from "@/lib/tool-examples";

export type SeoSection = { title: string; content: string };
export type SeoFaq = { question: string; answer: string };

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function sectionsWordCount(sections: SeoSection[]): number {
  return sections.reduce((n, s) => n + wordCount(s.title) + wordCount(s.content), 0);
}

function relatedToolNames(tool: Tool, limit = 3): string {
  const related = tools
    .filter((t) => t.slug !== tool.slug && t.primaryCategory === tool.primaryCategory)
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
  return (tool.keywords || []).slice(0, 5).join(", ") || tool.shortDescription;
}

function summarizeHowToSteps(tool: Tool): string {
  const steps = tool.howTo?.steps;
  if (!steps || steps.length === 0) {
    return `Enter your video topic, public URL, or creator parameters in ${tool.name}, review the generated workspace output, and pair it with ${relatedToolNames(tool, 2)} before publishing.`;
  }
  return steps
    .slice(0, 4)
    .map((s, i) => `Step ${i + 1} (${s.name}): ${s.text}`)
    .join(" ");
}

function buildCategoryDeepSections(tool: Tool, category: ToolCategoryId): SeoSection[] {
  const keys = keywordPhrase(tool);
  const siblings = relatedToolNames(tool, 3);
  const example = toolExamples[tool.slug];
  const howToSummary = summarizeHowToSteps(tool);
  const coreDesc = tool.definitionBlock?.text || tool.description;

  const workedWalkthrough = example
    ? `Practical ${tool.name} example: Given "${example.input}", the studio produces "${example.output}". Why this matters: ${example.explanation}`
    : `How the ${tool.name} workflow runs in practice: ${howToSummary}`;

  switch (category) {
    case "thumbnail-media":
      return [
        {
          title: `Visual Packaging & 168px Mobile Readability with ${tool.name}`,
          content: `${coreDesc} On YouTube Home and Suggested feeds, more than 70% of mobile impressions render thumbnails around 168 pixels wide. ${tool.name} helps creators inspect visual hierarchy, contrast, and text-to-subject balance so viewers understand the video promise in under 0.5 seconds without relying on tiny typography or cluttered overlays.`,
        },
        {
          title: `CTR Benchmarks, Safe Zones & Title Non-Redundancy`,
          content: `Most healthy channels track a 4%–10% Click-Through Rate in YouTube Studio Reach reports, depending on Browse vs. Search traffic sources. ${workedWalkthrough} Keep 1280×720 (16:9, under 2MB) exports sharp across light and dark themes, avoid putting critical text behind the bottom-right timestamp badge, and make sure your thumbnail complements rather than repeats your video title verbatim.`,
        },
        {
          title: `Step-by-Step Packaging Workflow & Creator Rights`,
          content: `${howToSummary} When researching competitor layouts for ${keys}, use visual patterns (color contrast, focal framing, expression cues) as design inspiration rather than re-uploading another creator's copyrighted artwork. Pair ${tool.name} with ${siblings} before running YouTube Studio's native Test & Compare A/B evaluation.`,
        },
        {
          title: `Connecting Visual Assets to Watch Time & Retention`,
          content: `High-CTR packaging only compounds when the opening 30 seconds of the video fulfill the thumbnail's exact claim—otherwise viewers click away and average view duration drops. Standardize your pre-upload check using ${tool.name} alongside ${siblings}, then compare Browse vs. Suggested CTR by traffic source inside YouTube Studio 48 hours after upload.`,
        },
      ];

    case "seo-metadata":
      return [
        {
          title: `How ${tool.name} Aligns With YouTube Search & Key Moments`,
          content: `${coreDesc} YouTube's neural discovery system indexes your front-loaded title keywords, the first 125–200 characters of your description, timestamped chapters (Google Key Moments), and spoken dialogue captions far more heavily than legacy backend tags. ${tool.name} structures clean metadata around ${keys} without keyword stuffing or misleading spam.`,
        },
        {
          title: `Metadata Budgets, 500-Character Tags & Practical Output`,
          content: `${workedWalkthrough} Keep primary video titles crisp (under 60–70 characters so mobile truncated previews preserve the hook), stay strictly within YouTube's 500-character tag budget using relevant topic synonyms, and place clickable chapter markers starting at 0:00 so both YouTube and Google Search can surface direct jump links.`,
        },
        {
          title: `Execution Steps for Search Intent & Transcript Indexing`,
          content: `${howToSummary} Spoken words inside your video transcript carry significant topical signal for long-tail queries, so confirm that your title, description lead, and spoken introduction reinforce the same entity terms. Combine ${tool.name} with ${siblings} to ship cohesive pre-upload metadata in minutes.`,
        },
        {
          title: `Evaluating Search Impressions vs. Suggested Velocity`,
          content: `After publishing, monitor the "YouTube Search terms" and "Impressions click-through rate" cards inside YouTube Studio Analytics. Metadata created with ${tool.name} targets clear viewer intent rather than empty hype; refine underperforming titles or description openers based on actual search queries driving impressions.`,
        },
      ];

    case "channel-growth":
      return [
        {
          title: `Outlier Velocity & Audience Signal Diagnosis via ${tool.name}`,
          content: `${coreDesc} Sustainable channel growth in 2026 relies on spotting outlier topics that outperform a channel's median views, locking in the first 30 seconds before retention drops, and engineering binge sessions across Suggested and Shorts Watch Series feeds. ${tool.name} turns public channel and topic signals around ${keys} into repeatable next-video decisions.`,
        },
        {
          title: `Retention Hooks, Cadence & Real Studio Calibration`,
          content: `${workedWalkthrough} Over 70% of long-form discovery originates from Home and Suggested feeds rather than Search alone, meaning packaging and immediate promise confirmation decide whether YouTube expands impressions. Use ${tool.name} to validate topic demand before committing filming hours.`,
        },
        {
          title: `Repeatable Growth Workflow Without OAuth or Extensions`,
          content: `${howToSummary} Unlike bloated browser extensions that inject overlays and ask for private YouTube OAuth permissions, ${tool.name} runs directly in your browser using public data and your own prompts. Connect insights from ${tool.name} directly into ${siblings} to plan your next 4-week upload sprint.`,
        },
        {
          title: `Turning Discovery Momentum Into Monetizable Sessions`,
          content: `Views alone do not guarantee predictable channel revenue unless viewers stay through multiple videos and come from high-advertiser markets. Pair ${tool.name} with end-screen bridges and playlist arcs, and track returning viewers vs. new viewers in YouTube Studio's Audience tab.`,
        },
      ];

    case "analytics-earnings":
      return [
        {
          title: `Tier-1 CPM vs. Net Creator RPM Mechanics in ${tool.name}`,
          content: `${coreDesc} Advertiser CPM measures gross spend per 1,000 ad impressions, whereas creator RPM reflects net take-home per 1,000 total video views after YouTube's standard 55% Watch Page share (or 45% Shorts Creator Pool after music licensing deductions) and non-monetized views. ${tool.name} models realistic ${keys} scenarios so creators avoid outdated $0.25–$4.00 static estimates.`,
        },
        {
          title: `Worked Financial Scenario & 2026 Threshold Assumptions`,
          content: `${workedWalkthrough} Tier-1 English markets (United States ~$8.50 avg RPM, Switzerland, Australia, Canada, and the UK) routinely yield 5x–15x higher ad revenue per 1,000 views than emerging markets, while 8+ minute videos unlock mid-roll inventory and Q4 (October–December) campaigns often lift advertiser bids by 20%–50%.`,
        },
        {
          title: `How to Run Accurate Revenue, Tax & Sponsorship Projections`,
          content: `${howToSummary} For US creators modeling Schedule C vs. Form 2553 S-Corp elections, 2026 benchmarks reflect the 15.3% federal self-employment tax (up to the $184,500 Social Security wage cap), $16,100 single standard deduction, and 20% QBI deduction—always confirm final tax filings with a licensed CPA and reconcile ad forecasts against your YouTube Studio Revenue tab.`,
        },
        {
          title: `Cross-Checking AdSense, Brand Deals & Exit Multiples`,
          content: `Full-time creators stack Watch Page AdSense with direct brand integrations ($20–$45+ Tier-1 sponsor CPMs), paid usage whitelisting boosts, and low-fee international payouts. Pair ${tool.name} with ${siblings} to compare AdSense cash flow, sponsorship pricing, wire FX spreads, and overall channel enterprise value.`,
        },
      ];

    case "utilities":
    default:
      return [
        {
          title: `Zero-Login Browser Processing & Privacy in ${tool.name}`,
          content: `${coreDesc} Core creator utilities should execute instantly in your browser—using native WebAudio, HTML5 Canvas, or deterministic client-side parsing—without forcing account creation, email gates, or third-party YouTube channel OAuth permissions. ${tool.name} focuses specifically on ${keys} with zero extension bloat.`,
        },
        {
          title: `Technical Precision & Worked Example Output`,
          content: `${workedWalkthrough} Whether calibrating YouTube's -14 LUFS loudness normalization target, generating responsive lazy-safe embed code, auditing playlist study hours, or extracting clean transcripts, deterministic browser utilities eliminate manual guesswork and formatting errors before upload.`,
        },
        {
          title: `Fast Creator Execution Steps`,
          content: `${howToSummary} Keep your production stack lightweight by bookmarking ${tool.name} alongside ${siblings}. Each utility is built to work equally cleanly on desktop workstations, locked corporate laptops, iPads, and mobile browsers where Chrome extensions cannot run.`,
        },
        {
          title: `Quality Assurance Before Publishing or Embedding`,
          content: `Before shipping final video assets, captions, or website embeds generated via ${tool.name}, run a quick final check on mobile viewport rendering, audio peak headroom (-1.0 dBTP ceiling), or URL tracking parameters so viewers get a friction-free experience across every screen.`,
        },
      ];
  }
}

/**
 * Generate category-differentiated supplemental sections for a tool.
 * Copy is derived from primaryCategory, toolExamples, howTo steps, and keywords.
 */
export function buildSupplementalToolSections(tool: Tool): SeoSection[] {
  return buildCategoryDeepSections(tool, tool.primaryCategory);
}

export function buildSupplementalFaqs(tool: Tool): SeoFaq[] {
  const keys = keywordPhrase(tool);
  const siblings = relatedToolNames(tool, 2);

  switch (tool.primaryCategory) {
    case "thumbnail-media":
      return [
        {
          question: `What image specs work best with ${tool.name}?`,
          answer: `Export YouTube thumbnails at 1280×720 pixels (16:9 aspect ratio) under 2MB in JPG, PNG, or WebP format. Check legibility at 168px mobile feed width before uploading.`,
        },
        {
          question: `Does ${tool.name} require a Chrome extension or YouTube login?`,
          answer: `No. ${tool.name} runs directly in your browser with zero login or extension install. It works across desktop, iPad, and mobile browsers.`,
        },
        {
          question: `Can I use downloaded or AI-generated visuals commercially?`,
          answer: `AI concepts and your own custom exports can be used on your channel, whereas third-party thumbnails extracted for ${keys} remain copyrighted by the original creator and should be used for design study only.`,
        },
        {
          question: `How can I test thumbnail performance in YouTube Studio?`,
          answer: `Upload 2–3 distinct packaging concepts into YouTube Studio's Test & Compare tool, monitor Watch Time share and CTR over 48–72 hours, and pair ${tool.name} with ${siblings}.`,
        },
        {
          question: `Is ${tool.name} completely free to use?`,
          answer: `Yes. Core thumbnail workflows on YouTube Tools Hub are free with no credit card required; heavy AI image generation features follow fair-use daily limits.`,
        },
        {
          question: `Why does mobile glance readability matter for CTR?`,
          answer: `Most YouTube Home and Suggested impressions happen on smartphones where thumbnails shrink to roughly 168px wide, so limiting overlay text to 2–4 bold words significantly improves scannability.`,
        },
      ];

    case "seo-metadata":
      return [
        {
          question: `How does ${tool.name} help videos rank in YouTube Search and Google?`,
          answer: `${tool.name} helps structure clear, intent-matched metadata for ${keys}—focusing on front-loaded title keywords, scannable first-200-character descriptions, clean chapters, and accurate transcripts rather than tag stuffing.`,
        },
        {
          question: `How many characters are allowed for YouTube titles and tags in 2026?`,
          answer: `YouTube titles allow up to 100 characters (aim for 50–65 so mobile feeds don't truncate the hook), and backend tags allow up to 500 total characters across relevant phrases.`,
        },
        {
          question: `Do I need VidIQ or TubeBuddy to use ${tool.name}?`,
          answer: `No. ${tool.name} runs online without installing a browser extension or granting YouTube OAuth permissions, and pairs cleanly with ${siblings}.`,
        },
        {
          question: `Are AI-assisted titles and descriptions safe under YouTube spam policies?`,
          answer: `Yes, provided you edit drafts so the title, description, and spoken video content accurately deliver on the viewer promise without misleading clickbait or repetitive keyword walls.`,
        },
        {
          question: `Is ${tool.name} free with no signup?`,
          answer: `Yes. Core SEO and metadata tools are free to use directly in your browser with no account required; AI-assisted generators include generous free daily limits.`,
        },
        {
          question: `Why do spoken transcripts and chapters affect discovery?`,
          answer: `YouTube indexes spoken captions and 0:00 timestamped chapters to match search queries and feed Google Key Moments snippets directly inside SERP results.`,
        },
      ];

    case "channel-growth":
      return [
        {
          question: `How does ${tool.name} evaluate channel and video growth potential?`,
          answer: `${tool.name} focuses on practical packaging, retention hooks, outlier ratios, and topic cadence around ${keys} using public channel inputs and structured benchmarks.`,
        },
        {
          question: `Does ${tool.name} need access to my private YouTube Studio account?`,
          answer: `No. It never asks for Google passwords or private OAuth read/write tokens—only public channel handles, video URLs, or the topic drafts you enter.`,
        },
        {
          question: `What is a healthy outlier score or retention benchmark in 2026?`,
          answer: `Videos achieving 2x–10x a channel's median view count signal strong topic-packaging fit, while holding attention past the first 30 seconds protects Browse and Suggested reach.`,
        },
        {
          question: `Can I use ${tool.name} for both YouTube Shorts and long-form channels?`,
          answer: `Yes. You can separate vertical Shorts spikes from long-form benchmarks, plan multi-part Watch Series loops, and connect workflows with ${siblings}.`,
        },
        {
          question: `Is ${tool.name} free to try without an account?`,
          answer: `Yes. You can run ${tool.name} immediately in your browser with no signup or credit card required.`,
        },
        {
          question: `How should creators act on results from ${tool.name}?`,
          answer: `Treat outputs as directional production drafts: test one packaging or hook change per upload and measure CTR, AVD, and returning viewers inside YouTube Studio.`,
        },
      ];

    case "analytics-earnings":
      return [
        {
          question: `How accurate are the estimates from ${tool.name} compared to YouTube Studio?`,
          answer: `${tool.name} provides 2026 directional benchmarks across 52 countries, niche RPM tiers, sponsorship CPMs, and IRS tax brackets for ${keys}. Always validate final payouts and deductions against YouTube Studio and a licensed CPA.`,
        },
        {
          question: `What is the difference between YouTube CPM and RPM?`,
          answer: `CPM is gross advertiser spend per 1,000 ad impressions; RPM is net creator earnings per 1,000 total video views after YouTube's revenue share (55% Watch Page / 45% Shorts pool) and non-monetized views.`,
        },
        {
          question: `Why do Tier-1 countries (US, UK, CA, AU, CH) earn higher RPM?`,
          answer: `Advertisers in Tier-1 economies bid significantly higher for finance, B2B software, insurance, and consumer purchase intent, frequently delivering 5x–15x higher RPM than emerging markets.`,
        },
        {
          question: `Do I need to sign in or connect AdSense to use ${tool.name}?`,
          answer: `No. All calculations for ${tool.name} run immediately in the browser without requiring Google AdSense OAuth or YouTube Studio access.`,
        },
        {
          question: `How do 8+ minute videos and Q4 seasonality change revenue?`,
          answer: `Videos 8 minutes or longer qualify for mid-roll ad breaks, and Q4 (October–December) holiday advertiser demand commonly lifts Tier-1 CPMs by 20%–50%.`,
        },
        {
          question: `Which other calculators pair well with ${tool.name}?`,
          answer: `Pair ${tool.name} with ${siblings} to model combined AdSense payouts, brand sponsorship fees, FX wire spreads, and state-level creator taxes.`,
        },
      ];

    case "utilities":
    default:
      return [
        {
          question: `Does ${tool.name} run locally in the browser without uploading files or logging in?`,
          answer: `Core client-side utilities run directly in your browser without requiring YouTube passwords, OAuth scopes, or paid Chrome extensions.`,
        },
        {
          question: `Is ${tool.name} free for unlimited creator workflows?`,
          answer: `Yes. Core utility operations for ${keys} are completely free with no signup wall or credit card required.`,
        },
        {
          question: `Can I use ${tool.name} on mobile, tablet, or locked computers?`,
          answer: `Yes. Because ${tool.name} is a web-based utility rather than a desktop Chrome extension, it works across Chrome, Safari, Firefox, Edge, iOS, and Android.`,
        },
        {
          question: `What should I verify after running ${tool.name}?`,
          answer: `Always review generated outputs, timestamps, audio headroom (-14 LUFS / -1.0 dBTP), or embed previews before publishing to YouTube or your website.`,
        },
        {
          question: `How does ${tool.name} fit into a complete YouTube upload checklist?`,
          answer: `Combine ${tool.name} with ${siblings} so your audio, captions, embeds, playlists, and packaging are verified before hitting Publish.`,
        },
        {
          question: `Do I need to install TubeBuddy or VidIQ alongside ${tool.name}?`,
          answer: `No. YouTube Tools Hub utilities operate independently without injecting browser overlays onto YouTube.`,
        },
      ];
  }
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
