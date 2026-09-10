/** Editorial examples, not measured outcomes or market benchmarks. */
export const toolExamples: Record<string, { title: string; input: string; output: string; explanation: string }> = {
    "youtube-thumbnail-downloader": {
        title: "Which thumbnail size should I download?",
        input: "Paste a public YouTube video or Shorts URL, then preview the available images.",
        output: "Choose the largest image that actually loads. A maximum-resolution image is often 1280 × 720; availability depends on the video.",
        explanation: "The downloader retrieves available images; it does not upscale them or guarantee 4K. Downloading an image does not grant permission to republish it.",
    },
    "youtube-title-generator": {
        title: "Example: turn a broad topic into a specific title",
        input: "Topic: a beginner tutorial showing how to light a desk recording setup with one lamp.",
        output: "Illustrative title: How to Light Your YouTube Setup With One Desk Lamp",
        explanation: "The title identifies the viewer, task and constraint. Treat generated titles as drafts and choose one your video delivers on. This example is editorial, not a measured CTR result.",
    },
    "youtube-tag-generator": {
        title: "Example: choose tags that describe the actual video",
        input: "Video: a step-by-step OBS screen recording tutorial for beginners.",
        output: "Illustrative tags: OBS screen recording, OBS tutorial for beginners, record screen with OBS.",
        explanation: "Keep only tags that match the tutorial. Tags do not guarantee rankings or suggested-video reach. Review the title, thumbnail and description alongside the tag list.",
    },
    "youtube-sponsorship-calculator": {
        title: "Worked example: a 25,000-view sponsorship quote",
        input: "25,000 views, Tech niche (1.8×), standard integration (1×), pinned link (+10%), USD.",
        output: "$1,260 base fee; $126 add-on; $1,386 target quote. Rounded quote range: $1,081–$1,871.",
        explanation: "The model uses 25,000 ÷ 1,000 × $28 × 1.8, then adds 10%. The range is 78%–135% of the target. These are calculator assumptions, not observed brand offers; negotiate scope, audience fit and usage rights separately.",
    },
    "youtube-channel-valuation-calculator": {
        title: "Worked example: valuing a profitable creator business",
        input: "$2,500 AdSense net, $1,800 sponsorship net and $700 affiliate net per month; steady growth; faceless model.",
        output: "$5,000 monthly profit × the capped 45× multiple = $225,000 illustrative value.",
        explanation: "The model starts at 28× and applies 1.25× growth, 1.2× operating model and 1.12× diversification factors, capped at 45×. Use profit after allocating costs. A buyer may price the business differently after reviewing its records and transfer risks.",
    },
    "youtube-tax-deduction-calculator": {
        title: "Worked example: an expense planning scenario",
        input: "$45,000 revenue, $18,400 entered expenses and a user-selected 30% rate assumption.",
        output: "$26,600 revenue less expenses; $5,520 illustrative tax reduction.",
        explanation: "The simplified reduction is min(revenue, entered expenses) × assumed rate. It does not determine deductible amounts or tax owed. Equipment depreciation, personal-use allocation, losses and local rules require separate review.",
    },
};
