# Search and AI discovery: findings and next steps

## Baseline and limits

The supplied Search Console screenshots cover September 2–8, 2026: 8,930 web impressions, 47 clicks, 0.5% CTR, average position 14.4, and 15 generative AI impressions. These aggregates do not identify the pages or queries responsible. AI impressions are not referral visits. Seven days and 15 AI impressions are insufficient to diagnose an AI visibility trend.

The live SEO smoke check passed all 29 configured paths on September 10. Public pages returned 200 with the expected basic SEO elements; tested missing pages returned 404; retired paths redirected permanently; search results carried noindex. This confirms the sampled public responses, not Google's indexing decisions, CDN behavior for every crawler, Core Web Vitals, or all URLs.

## Local improvements prepared

- Six tool pages now include server-rendered editorial examples: thumbnail downloader, title generator, tag generator, sponsorship calculator, channel valuation, and tax planning. Calculator examples disclose formulas and assumptions; none are represented as measured results.
- Title and tag generator search titles and descriptions now describe concrete outputs without promising viral reach. Tool search titles avoid automatically appending the brand to already descriptive titles.
- Generic tool summaries no longer claim algorithm-standard verification, universal real-time output, or that no personal data is stored.
- The quick-answer component no longer automatically labels every answer as officially verified.
- Software schema has a stable entity identifier. Tool WebPage schema links to that identifier and no longer equates every tool topic with the YouTube entity. Unsupported fallback publication and modification dates are omitted.
- Homepage visible copy and metadata derive the number of tools from the actual catalog. Sitemap modification dates reflect this homepage edit and the shared tool-template change, without refreshing unrelated blog dates.

These changes are local until deployed. They are improvements to clarity and reliability, not evidence that rankings or traffic will increase.

### Follow-up implementation

- Related-tool selection now puts topic matches before broad category defaults. Sponsorship/media-kit, valuation and tax topics have explicit matches to the new tools. Regression checks cover these rankings and duplicate suppression.
- The AI context API, FAQ API, GEO presets and shared machine-readable facts now derive the tool count from the catalog, keeping those surfaces aligned when tools are added.
- Sponsorship explanatory copy now discloses fixed exchange rates and the actual quote factors. Valuation copy now documents the actual 28x baseline and 16x–45x adjusted bounds instead of a conflicting purported industry formula.
- Calculator regression checks still pass after the content and linking changes. No outreach or deployment was performed.

## Next measurement cycle

1. Export Search Console Web performance for the most recent complete 28 days and the preceding 28 days. Include Queries, Pages, Countries and Devices. For priority pages, filter to each page and export its queries; separate overall Queries and Pages tables do not provide a query-to-page mapping.
2. Select five pages with relevant query impressions and achievable ranking opportunities. Use positions approximately 5–20 as an initial filter, then compare by device, country and search intent. Prioritize relevance rather than a site-wide CTR target.
3. Record each edited page's deployment date, target queries, clicks, impressions, CTR and position. Review after another complete 28-day window. Changes in query mix and seasonality can affect the result; before/after differences are not proof of causation.
4. Inspect representative URLs in Search Console after deployment. Check the selected canonical, indexing status and rendered content. Confirm sitemap processing in Google and Bing webmaster tools.
5. Check analytics landing pages and referral sources for AI traffic separately from Search Console AI impressions. Referral attribution can be incomplete, so record that limitation.

## Editorial priorities

- Improve existing pages before creating more overlapping articles. Add demonstrations, downloadable examples, explicit methodology and relevant links to the next tool in the workflow.
- Review first-person research claims in blog content. The live homepage promotes an article claiming tests on 84 uploads across three channels and another claiming a 60-day experiment. Preserve such claims only if supporting records exist; otherwise rewrite them as illustrative examples. No underlying experiment records were reviewed in this audit.
- Country CPM figures and sponsorship or valuation multipliers need a clear distinction between sourced observations and model assumptions. Refresh dates only when a substantive review or edit occurs.
- Seek relevant mentions by sharing useful demonstrations or original data with creator communities. No outreach messages, paid links or directory submissions were sent in this task.

Google's guidance emphasizes useful, distinctive content, accessible pages and sound SEO fundamentals for generative AI visibility: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
