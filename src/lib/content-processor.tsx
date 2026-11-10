import Link from "next/link";
import NextImage from "next/image";
import { tools } from "@/config/tools";
import { FaInfoCircle, FaLightbulb, FaExclamationTriangle, FaBolt } from "react-icons/fa";
import EarningsCalculatorCTA from "@/components/blog/EarningsCalculatorCTA";
import GoogleAd from "@/components/ads/GoogleAd";
import { AD_SLOTS } from "@/lib/adsense";

// AEO Components
import QuickAnswer from "@/components/blog/aeo/QuickAnswer";
import KeyTakeaways from "@/components/blog/aeo/KeyTakeaways";
import ProsCons from "@/components/blog/aeo/ProsCons";
import ExpertQuote from "@/components/blog/aeo/ExpertQuote";
import { getClusterKeywordMap } from "@/lib/topic-clusters";


// Map of keywords to tool/resource/blog URLs for contextual internal links
const keywordMap: Record<string, string> = {};

// Populate from tools
tools.forEach((tool) => {
    // Exact match on name
    keywordMap[tool.name.toLowerCase()] = `/tools/${tool.slug}`;
});

// Manual keywords based on common terms (longer phrases first via sort at link time)
const manualKeywords: Record<string, string> = {
    "youtube transcript downloader": "/youtube-transcript-downloader",
    "download youtube transcript free": "/blog/youtube-transcript-downloader-extract-subtitles-free",
    "extract subtitles from youtube": "/blog/youtube-transcript-downloader-extract-subtitles-free",
    "youtube transcript keyword research": "/blog/youtube-transcript-downloader-extract-subtitles-free",
    "youtube video summary generator ai": "/blog/youtube-video-summary-generator-ai-free",
    "youtube video summary generator": "/blog/youtube-video-summary-generator-ai-free",
    "youtube video summary generator tool": "/tools/youtube-video-summary-generator",
    "free youtube video summary generator": "/tools/youtube-video-summary-generator",
    "youtube sponsorship rate calculator": "/blog/youtube-sponsorship-rate-calculator-pricing-formula",
    "how much to charge for youtube sponsorship": "/blog/youtube-sponsorship-rate-calculator-pricing-formula",
    "youtube brandconnect guide": "/blog/youtube-sponsorship-rate-calculator-pricing-formula",
    "youtube sponsorship pitch email templates": "/blog/youtube-sponsorship-rate-calculator-pricing-formula",
    "youtube ads cost calculator": "/tools/youtube-ads-cost-calculator",
    "youtube cpv calculator": "/tools/youtube-ads-cost-calculator",
    "youtube ad budget calculator": "/tools/youtube-ads-cost-calculator",
    "youtube subscribe link generator": "/tools/youtube-subscribe-link-generator",
    "auto subscribe link generator": "/tools/youtube-subscribe-link-generator",
    "sub_confirmation=1 link generator": "/tools/youtube-subscribe-link-generator",
    "youtube outlier calculator": "/tools/youtube-outlier-calculator",
    "video outlier calculator": "/tools/youtube-outlier-calculator",
    "youtube outlier multiplier": "/tools/youtube-outlier-calculator",
    "youtube embed code generator": "/tools/youtube-embed-code-generator",
    "responsive youtube embed generator": "/tools/youtube-embed-code-generator",
    "youtube iframe generator": "/tools/youtube-embed-code-generator",
    "adsense wire fee calculator": "/tools/youtube-adsense-fee-calculator",
    "adsense bank fee calculator": "/tools/youtube-adsense-fee-calculator",
    "youtube payout fee calculator": "/tools/youtube-adsense-fee-calculator",
    "adsense intermediary bank fee": "/tools/youtube-adsense-fee-calculator",
    "ai youtube summarizer free": "/blog/youtube-video-summary-generator-ai-free",
    "ai youtube summarizer": "/blog/youtube-video-summary-generator-ai-free",
    "summarize youtube video with ai": "/blog/youtube-video-summary-generator-ai-free",
    "summarize youtube video": "/blog/youtube-video-summary-generator-ai-free",
    "youtube video to blog post notes": "/blog/youtube-video-summary-generator-ai-free",
    "youtube channel valuation guide": "/blog/youtube-channel-valuation-calculator-guide",
    "thumbnail downloader": "/tools/youtube-thumbnail-downloader",
    "youtube thumbnail downloader": "/tools/youtube-thumbnail-downloader",
    "how to download youtube thumbnail": "/blog/how-to-download-youtube-thumbnail-2026",
    "youtube thumbnail size": "/blog/youtube-thumbnail-size-2026",
    "hd thumbnail": "/tools/youtube-thumbnail-downloader",
    "youtube description template": "/blog/youtube-description-template-2026",
    "youtube chapters template": "/blog/youtube-chapters-template-2026",
    "youtube channel name ideas": "/blog/youtube-channel-name-ideas-2026",
    "how to name a youtube channel": "/blog/youtube-channel-name-ideas-2026",
    "youtube channel names": "/blog/youtube-channel-name-ideas-2026",
    "youtube script formula": "/blog/youtube-script-formula-retention",
    "youtube script template": "/blog/youtube-script-formula-retention",
    "youtube hook examples": "/blog/youtube-script-formula-retention",
    "thumbnail text generator": "/tools/youtube-thumbnail-generator",
    "ai thumbnail generator": "/tools/youtube-ai-thumbnail-generator",
    "ai thumbnail prompt": "/tools/youtube-ai-thumbnail-prompt",
    "thumbnail generator": "/tools/youtube-thumbnail-generator",
    "youtube title generator guide": "/blog/youtube-title-generator-clickable-titles-free",
    "clickable youtube titles": "/blog/youtube-title-generator-clickable-titles-free",
    "how to write youtube titles": "/blog/youtube-title-generator-clickable-titles-free",
    "title generator": "/tools/youtube-title-generator",
    "youtube title generator": "/tools/youtube-title-generator",
    "youtube description generator guide": "/blog/youtube-description-generator-free-ai-tool-2026",
    "free ai youtube description generator": "/blog/youtube-description-generator-free-ai-tool-2026",
    "description generator": "/tools/youtube-description-generator",
    "youtube description generator": "/tools/youtube-description-generator",
    "tag generator": "/tools/youtube-tag-generator",
    "youtube tag generator": "/tools/youtube-tag-generator",
    "video ideas generator": "/tools/youtube-video-ideas-generator",
    "video ideas": "/tools/youtube-video-ideas-generator",
    "trend helper": "/tools/youtube-trend-helper",
    "content calendar generator": "/tools/youtube-content-calendar-generator",
    "content calendar": "/tools/youtube-content-calendar-generator",
    "earnings calculator": "/tools/youtube-earnings-calculator",
    "youtube earnings calculator": "/tools/youtube-earnings-calculator",
    "sponsorship calculator": "/tools/youtube-sponsorship-calculator",
    "youtube sponsorship calculator": "/tools/youtube-sponsorship-calculator",
    "brand deal calculator": "/tools/youtube-sponsorship-calculator",
    "channel valuation calculator": "/tools/youtube-channel-valuation-calculator",
    "channel worth calculator": "/tools/youtube-channel-valuation-calculator",
    "creator tax calculator": "/tools/youtube-tax-deduction-calculator",
    "youtube tax deductions": "/tools/youtube-tax-deduction-calculator",
    "cpm calculator": "/tools/youtube-earnings-calculator",
    "revenue calculator": "/tools/youtube-earnings-calculator",
    "channel name generator": "/tools/youtube-channel-name-generator",
    "hashtag generator": "/tools/youtube-hashtag-generator",
    "youtube hashtag generator": "/tools/youtube-hashtag-generator",
    "youtube hashtag generator guide": "/blog/youtube-hashtag-generator-best-tags-videos-2026",
    "how to use youtube hashtags": "/blog/youtube-hashtag-generator-best-tags-videos-2026",
    "best youtube hashtags": "/blog/youtube-hashtag-generator-best-tags-videos-2026",
    "youtube hashtags 2026": "/blog/youtube-hashtag-generator-best-tags-videos-2026",
    "intro script generator": "/tools/youtube-intro-script-generator",
    "intro script": "/tools/youtube-intro-script-generator",
    "tag extractor": "/tools/youtube-tag-extractor",
    "youtube tag extractor": "/tools/youtube-tag-extractor",
    "engagement calculator": "/tools/youtube-engagement-rate-calculator",
    "engagement rate calculator": "/tools/youtube-engagement-rate-calculator",
    "title a/b tester": "/tools/youtube-title-ab-tester",
    "title ab tester": "/tools/youtube-title-ab-tester",
    "channel id finder": "/tools/youtube-channel-id-finder",
    "playlist length calculator": "/tools/youtube-playlist-length-calculator",
    "comment picker": "/tools/youtube-comment-picker",
    "channel audit": "/tools/youtube-channel-audit",
    "youtube channel audit": "/tools/youtube-channel-audit",
    "shorts script": "/tools/youtube-shorts-script-planner",
    "banner maker": "/tools/youtube-banner-logo-maker",
    "tubebuddy alternative": "/tools/vs/tubebuddy",
    "vidiq alternative": "/tools/vs/vidiq",
    "youtube tools": "/tools",
    "creator tools": "/tools",
    "free youtube tools": "/tools",
    "youtube cpm rates": "/resources/youtube-cpm-rates",
    "youtube algorithm": "/resources/youtube-algorithm-guide",
    "youtube monetization": "/resources/youtube-monetization-guide",
    "1 million views": "/blog/youtube-monetization-truths-cpm-rpm",
    "1 million youtube views": "/blog/youtube-monetization-truths-cpm-rpm",
    "how much will youtube pay for 1 million views": "/blog/youtube-monetization-truths-cpm-rpm",
    "pay per 1000 views": "/blog/how-much-youtube-pays-per-1000-views-2026",
    "youtube pay per 1000 views": "/blog/how-much-youtube-pays-per-1000-views-2026",
    "youtube media kit": "/blog/youtube-media-kit-template-2026",
    "creator media kit": "/blog/youtube-media-kit-template-2026",
    "adsense payment schedule": "/blog/youtube-adsense-payment-schedule-2026",
    "when does youtube pay": "/blog/youtube-adsense-payment-schedule-2026",
    "1000 subscribers": "/blog/get-1000-subscribers-youtube-fast-2026",
    "first 1000 subscribers": "/blog/get-1000-subscribers-youtube-fast-2026",
};

// Topic-cluster anchors expand internal linking across pillars & spokes
// Manual keywords win on conflicts (registered first)
Object.assign(keywordMap, getClusterKeywordMap(), manualKeywords);

// Precompute longest-first keyword entries once at module load
const sortedKeywordEntries = Object.keys(keywordMap)
    .sort((a, b) => b.length - a.length)
    .map((keyword) => ({
        keyword,
        lowerKeyword: keyword.toLowerCase(),
        url: keywordMap[keyword],
    }));

/**
 * Strips inline markdown syntax so heading IDs and Table of Contents labels
 * stay clean and consistent.
 */
export function cleanHeadingText(raw: string): string {
    return raw
        .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1')
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        .replace(/`([^`\n]+)`/g, '$1')
        .replace(/[*_]/g, '')
        .trim();
}

export function slugifyHeading(raw: string): string {
    return cleanHeadingText(raw)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

/**
 * Allocates unique heading anchor IDs in document order so duplicate headings
 * (e.g. repeated H2s/H3s) never produce duplicate DOM IDs or TOC keys.
 */
export function createHeadingIdGenerator(): (raw: string) => string {
    const counts = new Map<string, number>();
    return (raw: string) => {
        const base = slugifyHeading(raw) || 'section';
        const prev = counts.get(base) ?? 0;
        const next = prev + 1;
        counts.set(base, next);
        return next === 1 ? base : `${base}-${next}`;
    };
}

/**
 * Extracts Table of Contents H2 headings using the exact same code-fence skip
 * rules and deduplicated heading ID sequence as `processContent`.
 */
export function extractTocHeadings(content: string): { id: string; text: string }[] {
    const headings: { id: string; text: string }[] = [];
    const nextHeadingId = createHeadingIdGenerator();
    let inCodeBlock = false;

    for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed.startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            continue;
        }
        if (inCodeBlock) continue;

        const match = trimmed.match(/^(#{2,4})\s+(.+)$/);
        if (!match) continue;

        const level = match[1].length;
        const rawText = match[2];
        const id = nextHeadingId(rawText);
        if (level === 2) {
            const text = cleanHeadingText(rawText);
            if (text && id) {
                headings.push({ text, id });
            }
        }
    }

    return headings;
}

function normalizeImageSrc(rawSrc: string): string {
    // Normalize accidental spaces in markdown paths: "/images/blog / foo - bar.png"
    return rawSrc
        .trim()
        .replace(/\s*\/\s*/g, '/')
        .replace(/\s*-\s*/g, '-')
        .replace(/\s+/g, '');
}

type AlertType = 'NOTE' | 'TIP' | 'IMPORTANT' | 'WARNING' | 'CAUTION' | 'QUOTE';
type AeoType = 'QUICK_ANSWER' | 'KEY_TAKEAWAYS' | 'PROS_CONS' | 'EXPERT_QUOTE';

export type ProcessContentOptions = {
    /** Inject Earnings Calculator banner after the Nth H2 (monetization posts) */
    injectEarningsCtaAfterH2?: number;
};

export function processContent(
    content: string,
    options: ProcessContentOptions = {},
): React.ReactNode[] {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    const earningsAfterH2 = options.injectEarningsCtaAfterH2 ?? 0;
    let earningsCtaInserted = false;
    const nextHeadingId = createHeadingIdGenerator();

    /**
     * In-article ad placement, scaled to article length.
     *
     * Previously a single unit was injected after H2 #3, so a 3,000-word post
     * with a dozen sections carried one in-content impression — the dominant
     * cap on RPM here, since AdSense revenue tracks *viewable impressions per
     * pageview*, not pageviews. The rest of the inventory sat after the FAQ,
     * below where most readers leave.
     *
     * Placement walks whichever heading level actually structures the post.
     * Several long posts (e.g. the CPM-niche roundups) use only 3–4 H2s with
     * every real section as an H3, so an H2-only rule gave them zero in-article
     * inventory. When H2s are too sparse to host the target count, H3s become
     * eligible boundaries too.
     *
     * Rules that keep this on the right side of Google's "ads must not exceed
     * content" policy: never more than `MAX_IN_ARTICLE_ADS`, first unit only
     * after the reader has cleared two sections, `STRIDE` sections of
     * separation between units, and nothing injected within the last two
     * sections so this never stacks against the post-FAQ unit.
     */
    const MAX_IN_ARTICLE_ADS = 5;
    const FIRST_AD_AFTER = 2;
    const STRIDE = 2;
    // Leading whitespace is significant here: post bodies in blog.ts are indented
    // template literals, so headings arrive as "    ## Title". These counts must
    // agree with the trimmed matching in the line walker below, or no ad
    // positions are produced at all.
    const totalH2 = (content.match(/^[ \t]*##[ \t]/gm) ?? []).length;
    const totalH3 = (content.match(/^[ \t]*###[ \t]/gm) ?? []).length;
    const minHeadingsForFullRun =
        FIRST_AD_AFTER + STRIDE * (MAX_IN_ARTICLE_ADS - 1) + 1;
    // `## ` and `### ` are counted separately above, so H2+H3 is the real total.
    const countH3AsBoundary = totalH2 < minHeadingsForFullRun;
    const totalBoundaries = countH3AsBoundary ? totalH2 + totalH3 : totalH2;
    const inArticleSlots = AD_SLOTS.IN_ARTICLE;
    const adPositions = new Set<number>();
    for (
        let position = FIRST_AD_AFTER;
        position <= totalBoundaries - 1 && adPositions.size < MAX_IN_ARTICLE_ADS;
        position += STRIDE
    ) {
        adPositions.add(position);
    }
    let inArticleAdCount = 0;
    let boundaryCount = 0;

    /**
     * Advances the section counter and emits an in-article unit when this
     * boundary is one of the pre-computed slots. Called from the H2 branch
     * always, and from H3 only when H3s were counted as boundaries.
     */
    const injectAdIfDue = (index: number) => {
        if (!adPositions.has(++boundaryCount)) return;
        // Rotate slots so AdSense reports per-position performance and
        // inventory diversity keeps the fill rate up.
        const slot = inArticleSlots[inArticleAdCount % inArticleSlots.length];
        inArticleAdCount++;
        elements.push(
            <div key={`mid-ad-${index}`} className="my-8 not-prose" aria-hidden="true">
                <GoogleAd layout="in-article" format="fluid" slot={slot} className="text-center" />
            </div>,
        );
    };

    // State for standard lists
    let listItems: string[] = [];
    let listType: 'ul' | 'ol' | null = null;

    // State for blockquotes/alerts
    let blockquoteItems: string[] = [];
    let blockquoteType: AlertType | null = null;

    // State for AEO components
    let aeoType: AeoType | null = null;
    let aeoLines: string[] = [];

    let h2Count = 0;

    const flushList = (key: string) => {
        if (listItems.length > 0) {
            const ListTag = listType === 'ol' ? 'ol' : 'ul';
            elements.push(
                <ListTag key={key}>
                    {listItems.map((item, i) => {
                        if (listType === 'ul') {
                            const checkboxMatch = item.match(/^\[([ xX])\]\s+(.*)$/);
                            if (checkboxMatch) {
                                const isChecked = checkboxMatch[1].toLowerCase() === 'x';
                                const body = checkboxMatch[2];
                                return (
                                    <li key={i} className="list-none flex items-start gap-2.5 -ml-4">
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            readOnly
                                            tabIndex={-1}
                                            aria-label={isChecked ? "Completed checklist item" : "Checklist item"}
                                            className="mt-1.5 h-4 w-4 rounded border-slate-300 text-purple-600 accent-purple-600 shrink-0 pointer-events-none"
                                        />
                                        <span>{parseInlineMarkdown(body, `li-${key}-${i}`, true)}</span>
                                    </li>
                                );
                            }
                        }
                        return <li key={i}>{parseInlineMarkdown(item, `li-${key}-${i}`, true)}</li>;
                    })}
                </ListTag>
            );
            listItems = [];
            listType = null;
        }
    };

    const flushBlockquote = (key: string) => {
        if (blockquoteItems.length > 0 && blockquoteType) {
            const content: React.ReactNode[] = [];
            let bqBullets: string[] = [];
            let blockIdx = 0;

            const flushBqBullets = () => {
                if (bqBullets.length === 0) return;
                const ulIdx = blockIdx++;
                content.push(
                    <ul key={`bq-ul-${ulIdx}`} className="list-disc pl-5 space-y-1.5 my-2">
                        {bqBullets.map((b, bi) => (
                            <li key={bi}>{parseInlineMarkdown(b, `bq-${key}-${ulIdx}-${bi}`, true)}</li>
                        ))}
                    </ul>
                );
                bqBullets = [];
            };

            blockquoteItems.forEach((item) => {
                if (/^(?:[-*]\s+|-(?=\*\*|\[))/.test(item)) {
                    bqBullets.push(item.replace(/^(?:[-*]\s+|-(?=\*\*|\[))/, ''));
                } else {
                    flushBqBullets();
                    const pIdx = blockIdx++;
                    content.push(
                        <p key={`bq-p-${pIdx}`} className={pIdx > 0 ? 'mt-3' : undefined}>
                            {parseInlineMarkdown(item, `bq-${key}-${pIdx}`, true)}
                        </p>
                    );
                }
            });
            flushBqBullets();

            if (blockquoteType === 'QUOTE') {
                elements.push(
                    <blockquote key={key}>
                        {content}
                    </blockquote>
                );
            } else {
                // Alert styles
                let styles = "";
                let icon = null;
                let title = "";

                switch (blockquoteType) {
                    case 'NOTE':
                        styles = "bg-blue-50 border-blue-200 text-slate-700";
                        icon = <FaInfoCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />;
                        title = "Note";
                        break;
                    case 'TIP':
                        styles = "bg-emerald-50 border-emerald-200 text-slate-700";
                        icon = <FaLightbulb className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />;
                        title = "Pro Tip";
                        break;
                    case 'IMPORTANT':
                        styles = "bg-purple-50 border-purple-200 text-slate-700";
                        icon = <FaBolt className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />;
                        title = "Important";
                        break;
                    case 'WARNING':
                        styles = "bg-amber-50 border-amber-200 text-slate-800";
                        icon = <FaExclamationTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />;
                        title = "Warning";
                        break;
                    case 'CAUTION':
                        styles = "bg-red-50 border-red-200 text-slate-800";
                        icon = <FaExclamationTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />;
                        title = "Caution";
                        break;
                }

                elements.push(
                    <div key={key} className={`not-prose flex gap-4 p-6 my-8 rounded-xl border ${styles} shadow-sm items-start`}>
                        {icon}
                        <div className="flex-1">
                            <h4 className="font-bold text-sm uppercase tracking-wider opacity-90 mb-2 select-none">
                                {title}
                            </h4>
                            <div className="text-base leading-relaxed">
                                {content}
                            </div>
                        </div>
                    </div>
                );
            }

            blockquoteItems = [];
            blockquoteType = null;
        }
    };

    const flushAEO = (key: string) => {
        if (aeoType && aeoLines.length > 0) {
            switch (aeoType) {
                case 'QUICK_ANSWER':
                    // Just join lines with <br> or paragraphs
                    elements.push(
                        <QuickAnswer key={key}>
                            {aeoLines.map((line, i) => (
                                <p key={i} className={i > 0 ? "mt-2" : ""}>{parseInlineMarkdown(line, `qa-${key}-${i}`, true)}</p>
                            ))}
                        </QuickAnswer>
                    );
                    break;
                case 'KEY_TAKEAWAYS': {
                    // Expect lines starting with - ; parse markdown so **bold** and links render
                    const points = aeoLines
                        .filter((l) => l.trim().startsWith("-") || l.trim().startsWith("*"))
                        .map((l, i) =>
                            parseInlineMarkdown(
                                l.trim().replace(/^[-*]\s*/, ""),
                                `kt-${key}-${i}`,
                                true
                            )
                        );
                    if (points.length > 0) {
                        elements.push(<KeyTakeaways key={key} points={points} />);
                    }
                    break;
                }
                case 'PROS_CONS':
                    // Parse PROS: ... CONS: ...
                    // This is a bit manual
                    const pros: string[] = [];
                    const cons: string[] = [];
                    let currentSection: 'PROS' | 'CONS' | null = null;

                    aeoLines.forEach(line => {
                        const tLine = line.trim();
                        if (tLine.toUpperCase() === 'PROS:') { currentSection = 'PROS'; return; }
                        if (tLine.toUpperCase() === 'CONS:') { currentSection = 'CONS'; return; }

                        if (currentSection && (tLine.startsWith('+') || tLine.startsWith('-'))) {
                            const text = tLine.substring(1).trim();
                            if (currentSection === 'PROS') pros.push(text);
                            else cons.push(text);
                        }
                    });
                    elements.push(<ProsCons key={key} pros={pros} cons={cons} />);
                    break;
                case 'EXPERT_QUOTE':
                    // Parse key=value lines
                    const props: Record<string, string> = {};
                    aeoLines.forEach(line => {
                        const [k, ...v] = line.split('=');
                        if (k && v) props[k.trim()] = v.join('=').trim().replace(/^"|"$/g, '');
                    });
                    elements.push(
                        <ExpertQuote
                            key={key}
                            quote={props.quote || ""}
                            author={props.author || ""}
                            role={props.role || ""}
                            image={props.image}
                        />
                    );
                    break;
            }
            aeoType = null;
            aeoLines = [];
        }
    };

    // Keep track of which keywords we've already linked to avoid over-linking
    const linkedKeywords = new Set<string>();

    const parseInlineMarkdown = (text: string, keyPrefix: string, autoLink: boolean = false): React.ReactNode[] => {
        // Parse inline code, images, links, ***bold italic***, **bold**, and *italic*
        // All inner groups use non-capturing syntax so split() only emits top-level tokens
        const pattern = /(`[^`\n]+`)|(!\[[^\]]*\]\([^\)]+\))|(\[[^\]]+\]\([^\)]+\))|(\*\*\*[^*\n]+?\*\*\*)|(\*\*(?:\\.|(?!\*\*)[^\n])+?\*\*)|(\*(?!\*)(?:\\.|[^*\n])+?\*)/g;
        const parts = text.split(pattern).filter((p) => p !== undefined && p !== '');

        const nodes: React.ReactNode[] = [];

        parts.forEach((part, i) => {
            const key = `${keyPrefix}-${i}`;

            // Inline Code: `code`
            if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
                nodes.push(
                    <code key={key}>
                        {part.slice(1, -1)}
                    </code>
                );
                return;
            }

            // Inline Image fallback: ![alt](url) -> use phrasing-safe <span> elements inside <p>/<li>
            if (part.startsWith('![') && part.includes('](') && part.endsWith(')')) {
                const match = part.match(/^!\[([^\]]*)\]\(([^\)]+)\)$/);
                if (match) {
                    const alt = match[1];
                    const src = normalizeImageSrc(match[2]);
                    nodes.push(
                        <span key={key} className="not-prose block my-6 relative rounded-2xl overflow-hidden shadow-xl shadow-purple-900/5">
                            <NextImage
                                src={src}
                                alt={alt}
                                width={800}
                                height={450}
                                className="w-full h-auto object-cover"
                            />
                            {alt && <span className="block text-center text-sm text-slate-500 mt-3 italic">{alt}</span>}
                        </span>
                    );
                    return;
                }
            }

            // Bold Italic: ***text***
            if (part.startsWith('***') && part.endsWith('***') && part.length > 6) {
                const innerText = part.slice(3, -3);
                nodes.push(
                    <strong key={key}>
                        <em>{parseInlineMarkdown(innerText, `${key}-bi`, false)}</em>
                    </strong>
                );
                return;
            }

            // Bold: **text**
            if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
                const innerText = part.slice(2, -2);
                nodes.push(
                    <strong key={key}>
                        {parseInlineMarkdown(innerText, `${key}-bold`, false)}
                    </strong>
                );
                return;
            }

            // Italic: *text*
            if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**') && part.length > 2) {
                const innerText = part.slice(1, -1);
                nodes.push(
                    <em key={key}>
                        {parseInlineMarkdown(innerText, `${key}-em`, false)}
                    </em>
                );
                return;
            }

            // Link: [label](url)
            if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
                const match = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
                if (match) {
                    const label = match[1];
                    const url = match[2];
                    const isInternal = url.startsWith('/');
                    const renderedLabel = parseInlineMarkdown(label, `${key}-lbl`, false);

                    if (isInternal) {
                        nodes.push(
                            <Link key={key} href={url}>
                                {renderedLabel}
                            </Link>
                        );
                        return;
                    }

                    nodes.push(
                        <a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {renderedLabel}
                        </a>
                    );
                    return;
                }
            }

            // Unescape markdown-escaped asterisks (\* -> *) in rendered prose
            const cleanPart = part.replace(/\\\*/g, '*');

            // Plain text - apply auto-linking if enabled
            if (autoLink) {
                let textSegments: (string | React.ReactNode)[] = [cleanPart];

                // For each keyword in our longest-first map
                for (const { keyword, lowerKeyword, url } of sortedKeywordEntries) {
                    // Skip if we've already linked this keyword globally
                    if (linkedKeywords.has(keyword)) continue;

                    const newSegments: (string | React.ReactNode)[] = [];
                    let foundInThisBlock = false;

                    for (const segment of textSegments) {
                        if (typeof segment !== 'string') {
                            newSegments.push(segment);
                            continue;
                        }

                        // Case-insensitive search
                        const lowerSegment = segment.toLowerCase();
                        const idx = lowerSegment.indexOf(lowerKeyword);

                        if (idx !== -1 && !foundInThisBlock) {
                            // Split and link
                            const before = segment.slice(0, idx);
                            const match = segment.slice(idx, idx + keyword.length);
                            const after = segment.slice(idx + keyword.length);

                            if (before) newSegments.push(before);
                            newSegments.push(
                                <Link
                                    key={`${key}-${keyword}`}
                                    href={url}
                                    className="a-auto"
                                    title={`Try our ${keyword} tool`}
                                >
                                    {match}
                                </Link>
                            );
                            if (after) newSegments.push(after);

                            linkedKeywords.add(keyword);
                            foundInThisBlock = true;
                        } else {
                            newSegments.push(segment);
                        }
                    }
                    textSegments = newSegments;
                }
                nodes.push(...textSegments);
            } else {
                nodes.push(cleanPart);
            }
        });

        return nodes;
    };


    // State for code blocks
    let inCodeBlock = false;
    let codeBlockLang = '';
    let codeBlockLines: string[] = [];

    const flushCodeBlock = (key: string) => {
        if (codeBlockLines.length > 0 || inCodeBlock) {
            const rawCode = codeBlockLines.join('\n');
            elements.push(
                <div key={key} className="my-8 rounded-2xl overflow-hidden shadow-xl border border-slate-800 bg-slate-900 not-prose">
                    {codeBlockLang && (
                        <div className="flex items-center justify-between px-5 py-2.5 bg-slate-800/90 border-b border-slate-700/60 text-xs font-mono text-slate-300">
                            <span className="font-semibold uppercase tracking-wider text-purple-400">{codeBlockLang}</span>
                            <span className="text-[11px] text-slate-400 font-sans">Code Snippet</span>
                        </div>
                    )}
                    <pre className="p-5 overflow-x-auto text-sm text-slate-100 font-mono leading-relaxed whitespace-pre">
                        <code>{rawCode}</code>
                    </pre>
                </div>
            );
            codeBlockLines = [];
            codeBlockLang = '';
            inCodeBlock = false;
        }
    };

    // State for tables
    let tableLines: string[] = [];

    const flushTable = (key: string) => {
        if (tableLines.length > 0) {
            const lines = tableLines.filter(l => l.trim().startsWith('|'));
            if (lines.length < 2) {
                // Not a valid table structure (needs at least header and separator)
                tableLines.forEach((line, i) => {
                    elements.push(
                        <p key={`${key}-fallback-${i}`}>
                            {parseInlineMarkdown(line, `${key}-p-${i}`, true)}
                        </p>
                    );
                });
            } else {
                const headerLine = lines[0];
                const rowLines = lines.slice(2);

                const headers = headerLine.split('|').filter((_, i, arr) => i > 0 && i < arr.length - 1).map(h => h.trim());

                elements.push(
                    <div key={key} className="art-tbl not-prose">
                        <table>
                            <thead>
                                <tr>
                                    {headers.map((header, i) => (
                                        <th scope="col" key={i}>
                                            {parseInlineMarkdown(header, `th-${key}-${i}`, false)}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rowLines.map((row, i) => {
                                    const cells = row.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map(c => c.trim());
                                    return (
                                        <tr key={i}>
                                            {cells.map((cell, j) => (
                                                <td key={j}>
                                                    {parseInlineMarkdown(cell, `td-${key}-${i}-${j}`, true)}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            }
            tableLines = [];
        }
    };

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();

        // Code block line handling
        if (inCodeBlock) {
            if (trimmedLine.startsWith('```')) {
                flushCodeBlock(`code-${index}`);
                return;
            }
            codeBlockLines.push(line);
            return;
        }

        // Code block trigger
        if (trimmedLine.startsWith('```')) {
            flushList(`list-${index}`);
            flushBlockquote(`quote-${index}`);
            flushTable(`table-${index}`);
            inCodeBlock = true;
            codeBlockLang = trimmedLine.replace(/^```+/, '').trim();
            return;
        }

        // Empty line
        if (trimmedLine === '') {
            if (aeoType) {
                return;
            }
            flushList(`list-${index}`);
            flushBlockquote(`quote-${index}`);
            flushTable(`table-${index}`);
            return;
        }

        // Table Detection
        if (trimmedLine.startsWith('|')) {
            flushList(`list-${index}`);
            flushBlockquote(`quote-${index}`);
            tableLines.push(trimmedLine);
            return;
        }

        // If line does not start with |, flush any active table
        if (!trimmedLine.startsWith('|')) {
            flushTable(`table-${index}`);
        }

        // Custom AEO Block Start/End detection
        if (trimmedLine.startsWith(':::')) {
            if (aeoType) {
                // Close current block
                flushAEO(`aeo-${index}`);
            } else {
                // Start new block
                const type = trimmedLine.replace(':::', '').trim().toUpperCase();
                if (type === 'QUICK-ANSWER') aeoType = 'QUICK_ANSWER';
                else if (type === 'KEY-TAKEAWAYS') aeoType = 'KEY_TAKEAWAYS';
                else if (type === 'PROS-CONS') aeoType = 'PROS_CONS';
                else if (type === 'EXPERT-QUOTE') aeoType = 'EXPERT_QUOTE';
            }
            return; // Skip the delimiter line
        }

        // If inside AEO block, capture lines
        if (aeoType) {
            if (trimmedLine) aeoLines.push(trimmedLine);
            return;
        }

        // YouTube Embed Detection (Standalone Line)
        const ytRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^& \n<]+)(?:&.*)?$/;
        const ytMatch = trimmedLine.match(ytRegex);
        if (ytMatch && ytMatch[1]) {
            flushList(`list-${index}`);
            flushBlockquote(`quote-${index}`);
            elements.push(
                <div key={index} className="my-10 relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl shadow-purple-900/10">
                    <iframe
                        src={`https://www.youtube.com/embed/${ytMatch[1]}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full border-0"
                    />
                </div>
            );
            return;
        }

        // Check for Blockquotes/Alerts
        if (line.trim().startsWith('>')) {
            // If we are currently in a list, flush it
            flushList(`list-${index}`);

            // Logic to determine if this is a NEW alert or continuation
            // Alerts usually start with > [!TYPE]
            const alertMatch = trimmedLine.match(/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);

            if (alertMatch) {
                // If we were already in a blockquote, flush it first (though rare to have consecutive different ones without space)
                flushBlockquote(`quote-prev-${index}`);

                blockquoteType = alertMatch[1].toUpperCase() as AlertType;
                // If there is content on the same line after ]? Usually not in standard usage but let's handle empty
                // We don't add the [!NOTE] text itself to content
                return;
            }

            // If it's not a new alert start, it's either content for current alert, or a standard blockquote
            if (!blockquoteType) {
                blockquoteType = 'QUOTE';
            }

            // Extract content: remove '> ' or '>'
            const content = trimmedLine.replace(/^>\s?/, '');
            if (content) {
                blockquoteItems.push(content);
            }
            return;
        }

        // If line does not start with >, flush any active blockquote
        flushBlockquote(`quote-${index}`);

        // Horizontal rule: ---, ***, ___
        if (/^([-*_])(?:\s*\1){2,}$/.test(trimmedLine)) {
            flushList(`list-${index}`);
            elements.push(<hr key={index} className="my-10 border-t border-slate-200" />);
            return;
        }

        // H4 heading (must be checked before H3 and H2)
        if (trimmedLine.startsWith('#### ')) {
            flushList(`list-${index}`);
            const headingText = trimmedLine.replace(/^####\s+/, '');
            const headingId = nextHeadingId(headingText);
            elements.push(
                <h4 key={index} id={headingId}>
                    {parseInlineMarkdown(headingText, `h4-${index}`, false)}
                </h4>
            );
            return;
        }

        // H2 heading
        if (trimmedLine.startsWith('## ')) {
            flushList(`list-${index}`);
            const headingText = trimmedLine.replace(/^##\s+/, '');
            const headingId = nextHeadingId(headingText);
            elements.push(
                <h2 key={index} id={headingId}>
                    {parseInlineMarkdown(headingText, `h2-${index}`, false)}
                </h2>
            );
            // Insert an in-article ad at the pre-computed section boundaries.
            h2Count++;
            if (
                earningsAfterH2 > 0 &&
                !earningsCtaInserted &&
                h2Count === earningsAfterH2
            ) {
                elements.push(
                    <EarningsCalculatorCTA
                        key={`earnings-cta-h2-${index}`}
                        variant="banner"
                    />,
                );
                earningsCtaInserted = true;
            }

            injectAdIfDue(index);
            return;
        }

        // H3 heading
        if (trimmedLine.startsWith('### ')) {
            flushList(`list-${index}`);
            const headingText = trimmedLine.replace(/^###\s+/, '');
            const headingId = nextHeadingId(headingText);
            elements.push(
                <h3 key={index} id={headingId}>
                    {parseInlineMarkdown(headingText, `h3-${index}`, false)}
                </h3>
            );
            if (countH3AsBoundary) injectAdIfDue(index);
            return;
        }

        // Unordered list item (- item, -**bold**/-[link] item, or * item excluding single-line italics wrapped in * ... *)
        if (/^-(?:\s+|(?=\*\*|\[))/.test(trimmedLine) || (/^\*\s+/.test(trimmedLine) && !/^\*\s+[^*]+\*$/.test(trimmedLine))) {
            if (listType && listType !== 'ul') {
                flushList(`list-switch-${index}`);
            }
            listType = 'ul';
            listItems.push(trimmedLine.replace(/^(?:[-*]\s+|-(?=\*\*|\[))/, ''));
            return;
        }

        // Ordered list item
        if (/^\d+\.\s/.test(trimmedLine)) {
            if (listType && listType !== 'ol') {
                flushList(`list-switch-${index}`);
            }
            listType = 'ol';
            listItems.push(trimmedLine.replace(/^\d+\.\s/, ''));
            return;
        }

        // Standalone Image line: ![alt](url) — rendered as block <figure> outside <p>
        const standaloneImgMatch = trimmedLine.match(/^!\[([^\]]*)\]\(([^\)]+)\)$/);
        if (standaloneImgMatch) {
            flushList(`list-${index}`);
            const alt = standaloneImgMatch[1];
            const src = normalizeImageSrc(standaloneImgMatch[2]);
            elements.push(
                <figure key={index} className="not-prose my-10 relative rounded-2xl overflow-hidden shadow-xl shadow-purple-900/5">
                    <NextImage
                        src={src}
                        alt={alt}
                        width={800}
                        height={450}
                        className="w-full h-auto object-cover"
                    />
                    {alt && (
                        <figcaption className="text-center text-sm text-slate-500 mt-3 italic">
                            {alt}
                        </figcaption>
                    )}
                </figure>
            );
            return;
        }

        // Only auto-link in regular paragraphs and list items to avoid messy links in headers/bold
        const shouldAutoLink = true;

        // Bold paragraph (entire line wrapped in a single **...** span)
        if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**') && trimmedLine.length > 4 && !/\*\*/.test(trimmedLine.slice(2, -2))) {
            flushList(`list-${index}`);
            elements.push(
                <p key={index} className="p-strong">
                    {parseInlineMarkdown(trimmedLine.slice(2, -2), `p-${index}`, false)}
                </p>
            );

            return;
        }

        // Regular paragraph
        flushList(`list-${index}`);
        elements.push(
            <p key={index}>
                {parseInlineMarkdown(trimmedLine, `p-${index}`, shouldAutoLink)}
            </p>
        );



    });

    // Flush any remaining items
    flushList('list-final');
    flushBlockquote('quote-final');
    flushAEO('aeo-final');
    flushTable('table-final');
    flushCodeBlock('code-final');

    return elements;
}

// Helper to extract YouTube IDs for Schema
export function extractYoutubeVideoIds(content: string): string[] {
    const ids: string[] = [];
    // Regex for standard and short YouTube URLs
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
    let match;
    while ((match = regex.exec(content)) !== null) {
        if (match[1]) {
            ids.push(match[1]);
        }
    }
    return [...new Set(ids)]; // Unique IDs
}
