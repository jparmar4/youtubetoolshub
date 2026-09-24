/**
 * Canonical author roster for blog E-E-A-T.
 *
 * Post data historically used 15 drifting bylines (three "Sarah" variants,
 * four "Alex" variants, a joke pen name). `resolveAuthor` maps any legacy
 * byline onto one canonical profile so bylines, Person JSON-LD, and author
 * pages all strengthen the same entity instead of fragmenting it.
 *
 * Bios deliberately describe what the author writes for this site — no
 * invented employment history or credentials.
 */

export interface AuthorProfile {
  /** URL slug for /blog/author/[slug] */
  slug: string;
  name: string;
  role: string;
  bio: string;
  /** Legacy post-data bylines that resolve to this profile */
  aliases: string[];
}

export const authors: AuthorProfile[] = [
  {
    slug: "alex-rivera",
    name: "Alex Rivera",
    role: "YouTube Growth Strategist",
    bio: "Alex Rivera is the lead contributor at YouTube Tools Hub, covering channel growth, YouTube SEO, and monetization strategy. Alex has authored more than half of the site's library, including the CPM rate breakdowns and earnings-planning guides that power the site's calculators.",
    aliases: ["Alex Rivera", "Alex Turner", "Alex Rodriguez"],
  },
  {
    slug: "jordan-lee",
    name: "Jordan Lee",
    role: "YouTube Monetization Expert",
    bio: "Jordan Lee writes the monetization and creator-economy guides at YouTube Tools Hub, from YouTube Partner Program walkthroughs to sponsorship and Super Thanks explainers, with a focus on practical numbers creators can plan with.",
    aliases: ["Jordan Lee"],
  },
  {
    slug: "alex-chen",
    name: "Alex Chen",
    role: "AI Content Strategist",
    bio: "Alex Chen covers AI-assisted content workflows at YouTube Tools Hub — thumbnail prompts, title generation, and how to use AI tools without losing audience trust.",
    aliases: ["Alex Chen"],
  },
  {
    slug: "david-chen",
    name: "David Chen",
    role: "YouTube SEO Specialist",
    bio: "David Chen writes the technical-SEO side of YouTube Tools Hub: tag research, keyword strategy, metadata optimization, and how YouTube search actually ranks videos.",
    aliases: ["David Chen"],
  },
  {
    slug: "marcus-chen",
    name: "Marcus Chen",
    role: "YouTube Production Specialist",
    bio: "Marcus Chen covers production and equipment at YouTube Tools Hub — cameras, microphones, lighting, and editing workflows for creators at every budget.",
    aliases: ["Marcus Chen", "Marcus Aurelius"],
  },
  {
    slug: "sarah-jenkins",
    name: "Sarah Jenkins",
    role: "YouTube Growth Strategist",
    bio: "Sarah Jenkins writes audience-growth guides at YouTube Tools Hub, from subscriber milestones and community building to Shorts strategy and content batching.",
    aliases: ["Sarah Jenkins", "Sarah Mitchell", "Sarah Martinez"],
  },
  {
    slug: "david-park",
    name: "David Park",
    role: "YouTube Revenue Analyst",
    bio: "David Park analyzes creator revenue at YouTube Tools Hub — earnings breakdowns, country-by-country CPM comparisons, and the tax and payment mechanics YouTubers actually deal with.",
    aliases: ["David Park", "Chris Park"],
  },
  {
    slug: "ryan-mitchell",
    name: "Ryan Mitchell",
    role: "YouTube Production Specialist",
    bio: "Ryan Mitchell writes gear and production guides at YouTube Tools Hub, with hands-on coverage of the equipment that moves the needle for growing channels.",
    aliases: ["Ryan Mitchell"],
  },
  {
    slug: "emma-richardson",
    name: "Emma Richardson",
    role: "Visual Content Designer",
    bio: "Emma Richardson covers thumbnail design and visual branding at YouTube Tools Hub, translating click psychology into design choices creators can apply today.",
    aliases: ["Emma Richardson"],
  },
];

const byAlias = new Map<string, AuthorProfile>();
for (const author of authors) {
  for (const alias of author.aliases) {
    byAlias.set(alias.toLowerCase(), author);
  }
}

/** Resolve a post's byline to its canonical profile; unknown names get a sensible fallback. */
export function resolveAuthor(name: string): AuthorProfile {
  return (
    byAlias.get(name.trim().toLowerCase()) ?? {
      slug: name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      name: name.trim(),
      role: "Contributor",
      bio: `${name.trim()} contributes YouTube growth and monetization guides to the YouTube Tools Hub editorial team.`,
      aliases: [name],
    }
  );
}

export function getAuthorBySlug(slug: string): AuthorProfile | undefined {
  return authors.find((author) => author.slug === slug);
}

export function getAuthorPageUrl(author: AuthorProfile): string {
  return `/blog/author/${author.slug}`;
}
