// WebMCP In-Browser Agent Tool Registration (SEP-1649 / WebMCP)
// Exposes in-browser tools on navigator.modelContext for AI agents
(function () {
  function callMcp(name, args) {
    return fetch("/api/mcp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "webmcp-" + name,
        method: "tools/call",
        params: { name: name, arguments: args || {} },
      }),
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (d) {
        try {
          return d.result && d.result.content && d.result.content[0] && d.result.content[0].text
            ? JSON.parse(d.result.content[0].text)
            : d;
        } catch {
          return d;
        }
      });
  }

  function registerWebMCP() {
    if (typeof navigator === "undefined" || !navigator.modelContext) return;
    var mc = navigator.modelContext;

    if (typeof mc.provideContext === "function") {
      try {
        mc.provideContext({
          tools: [
            { name: "estimate_youtube_earnings", description: "Calculate estimated YouTube AdSense revenue (RPM and CPM) for any view count and country across 52 supported regions." },
            { name: "list_youtube_tools", description: "List or search all 45 free YouTube creator tools on YouTube Tools Hub by category or keyword." },
            { name: "get_country_cpm_rates", description: "Retrieve 2026 YouTube CPM and RPM benchmark ranges across 52 countries." },
            { name: "get_youtube_thumbnail_urls", description: "Resolve direct 4K/HD/SD YouTube thumbnail image URLs for any YouTube video ID or URL." },
            { name: "estimate_sponsorship_rate", description: "Estimate recommended YouTube brand deal / sponsor fee and CPM benchmarks based on expected video views and niche." },
            { name: "estimate_channel_valuation", description: "Calculate YouTube channel asset sale valuation multiple (24x-36x monthly net earnings)." },
            { name: "estimate_shorts_earnings", description: "Calculate YouTube Shorts AdSense revenue based on views and 2026 Shorts RPM benchmarks ($0.03 - $0.07 per 1,000 views)." },
            { name: "calculate_youtube_tax_deductions", description: "Calculate estimated eligible business tax write-offs, taxable income reduction, and tax savings for YouTube creators." }
          ]
        });
      } catch {}
    }

    if (typeof mc.registerTool === "function") {
      var tools = [
        {
          name: "estimate_youtube_earnings",
          description: "Calculate estimated YouTube AdSense revenue (RPM and CPM) for any view count and country across 52 supported regions.",
          inputSchema: {
            type: "object",
            properties: {
              views: { type: "number", description: "Number of monthly or daily video views." },
              country: { type: "string", description: "Country slug or code (e.g. 'usa', 'uk', 'canada', 'australia', 'germany', 'india')." },
            },
            required: ["views"],
          },
          execute: function (args) {
            return callMcp("estimate_youtube_earnings", args);
          },
        },
        {
          name: "list_youtube_tools",
          description: "List or search all 45 free YouTube creator tools on YouTube Tools Hub by category or keyword.",
          inputSchema: {
            type: "object",
            properties: {
              category: { type: "string", description: "Optional tool category filter." },
              query: { type: "string", description: "Optional search keyword." },
            },
          },
          execute: function (args) {
            return callMcp("list_youtube_tools", args);
          },
        },
        {
          name: "get_country_cpm_rates",
          description: "Retrieve 2026 YouTube CPM and RPM benchmark ranges across 52 countries.",
          inputSchema: {
            type: "object",
            properties: {
              country: { type: "string", description: "Optional country name, code, or slug filter." },
            },
          },
          execute: function (args) {
            return callMcp("get_country_cpm_rates", args);
          },
        },
        {
          name: "get_youtube_thumbnail_urls",
          description: "Resolve direct 4K/HD/SD YouTube thumbnail image URLs for any YouTube video ID or URL.",
          inputSchema: {
            type: "object",
            properties: {
              videoIdOrUrl: { type: "string", description: "YouTube video URL or 11-character video ID." },
            },
            required: ["videoIdOrUrl"],
          },
          execute: function (args) {
            return callMcp("get_youtube_thumbnail_urls", args);
          },
        },
        {
          name: "estimate_sponsorship_rate",
          description: "Estimate recommended YouTube brand deal / sponsor fee and CPM benchmarks based on expected video views and niche.",
          inputSchema: {
            type: "object",
            properties: {
              views: { type: "number", description: "Expected video views." },
              niche: { type: "string", description: "Creator niche (e.g. 'finance', 'tech', 'gaming')." },
            },
            required: ["views"],
          },
          execute: function (args) {
            return callMcp("estimate_sponsorship_rate", args);
          },
        },
        {
          name: "estimate_channel_valuation",
          description: "Calculate YouTube channel asset sale valuation multiple (24x-36x monthly net earnings).",
          inputSchema: {
            type: "object",
            properties: {
              monthlyRevenue: { type: "number", description: "Average monthly net earnings (USD)." },
            },
            required: ["monthlyRevenue"],
          },
          execute: function (args) {
            return callMcp("estimate_channel_valuation", args);
          },
        },
        {
          name: "estimate_shorts_earnings",
          description: "Calculate YouTube Shorts AdSense revenue based on views and 2026 Shorts RPM benchmarks ($0.03 - $0.07 per 1,000 views).",
          inputSchema: {
            type: "object",
            properties: {
              views: { type: "number", description: "Number of YouTube Shorts views." },
              rpm: { type: "number", description: "Optional custom Shorts RPM in USD (defaults to $0.05)." },
            },
            required: ["views"],
          },
          execute: function (args) {
            return callMcp("estimate_shorts_earnings", args);
          },
        },
        {
          name: "calculate_youtube_tax_deductions",
          description: "Calculate estimated eligible business tax write-offs, taxable income reduction, and tax savings for YouTube creators.",
          inputSchema: {
            type: "object",
            properties: {
              annualRevenue: { type: "number", description: "Gross annual creator revenue from YouTube and sponsors (USD)." },
              equipmentAndGear: { type: "number", description: "Annual spending on gear/cameras (USD)." },
              softwareAndSubscriptions: { type: "number", description: "Annual spending on software/plugins (USD)." },
            },
            required: ["annualRevenue"],
          },
          execute: function (args) {
            return callMcp("calculate_youtube_tax_deductions", args);
          },
        },
      ];

      tools.forEach(function (t) {
        try {
          mc.registerTool(t);
        } catch {}
      });
    }
  }

  registerWebMCP();
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", registerWebMCP);
    }
    window.addEventListener("load", registerWebMCP);
  }
  if (typeof window !== "undefined") {
    window.addEventListener("modelcontextready", registerWebMCP);
  }
})();
