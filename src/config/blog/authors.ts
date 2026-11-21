/**
 * Canonical author roster for blog E-E-A-T.
 *
 * This site has exactly one real author: the founder. Earlier post data used
 * 15 drifting bylines (three "Sarah" variants, four "Alex" variants, a joke
 * pen name) mapped onto fictional personas — a pattern Google's scaled-content
 * systems penalize. Every byline now resolves to the one verifiable human
 * behind the site, so bylines, Person JSON-LD, and the author page all
 * strengthen the same entity instead of fragmenting it.
 *
 * Bios describe only what the author actually does — no invented employment
 * history, credentials, or teams.
 */

export interface AuthorSocialLink {
  name: string;
  url: string;
}

export interface AuthorProfile {
  /** URL slug for /blog/author/[slug] */
  slug: string;
  name: string;
  role: string;
  bio: string;
  /** Legacy post-data bylines that resolve to this profile */
  aliases: string[];
  /** Real photo (public path). Initial-avatar fallback when absent. */
  photo?: string;
  /** Verifiable external profiles — author-page links + Person schema sameAs */
  socialLinks?: AuthorSocialLink[];
}

export const authors: AuthorProfile[] = [
  {
    slug: "jitu",
    name: "Jitu",
    role: "Founder & Author",
    bio: "Jitu is the founder of YouTube Tools Hub and the only author of its guides. He built the site's free browser-based creator tools and researches YouTube monetization, CPM/RPM benchmarks, and channel growth from public YouTube data — with every estimate clearly labeled as such.",
    aliases: [
      // Legacy bylines from earlier post data — all resolve to the real
      // author so historical posts never render a fictional persona.
      "Alex Rivera",
      "Alex Turner",
      "Alex Rodriguez",
      "Jordan Lee",
      "Alex Chen",
      "David Chen",
      "Marcus Chen",
      "Sarah Jenkins",
      "Sarah Mitchell",
      "Sarah Martinez",
      "David Park",
      "Chris Park",
      "Ryan Mitchell",
      "Emma Richardson",
    ],
    socialLinks: [{ name: "X (Twitter)", url: "https://x.com/JITU20" }],
  },
];

const byAlias = new Map<string, AuthorProfile>();
for (const author of authors) {
  for (const alias of author.aliases) {
    byAlias.set(alias.toLowerCase(), author);
  }
}

const primaryAuthor = authors[0];

/**
 * Resolve a post's byline to its canonical profile. Unknown names (legacy
 * data, typos) resolve to the primary author instead of inventing a
 * contributor that has no verifiable identity.
 */
export function resolveAuthor(name: string): AuthorProfile {
  return byAlias.get(name.trim().toLowerCase()) ?? primaryAuthor;
}

export function getAuthorBySlug(slug: string): AuthorProfile | undefined {
  return authors.find((author) => author.slug === slug);
}

export function getAuthorPageUrl(author: AuthorProfile): string {
  return `/blog/author/${author.slug}`;
}
