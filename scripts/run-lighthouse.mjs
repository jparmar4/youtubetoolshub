// scripts/run-lighthouse.mjs
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function runAudit(strategy) {
  console.log(`\n==============================================`);
  console.log(`Running Lighthouse audit: [${strategy.toUpperCase()}]`);
  console.log(`==============================================`);

  const reportPath = path.join(process.cwd(), `lighthouse-${strategy}.json`);
  const presetArg = strategy === 'desktop' ? '--preset=desktop' : '';
  
  const cmd = `npx lighthouse https://www.youtubetoolshub.com --output=json --output-path="${reportPath}" --chrome-flags="--headless --no-sandbox" ${presetArg} --quiet`;
  
  execSync(cmd, { stdio: 'inherit' });

  const raw = fs.readFileSync(reportPath, 'utf8');
  const lh = JSON.parse(raw);
  const categories = lh.categories;
  const audits = lh.audits;

  console.log(`\n--- Scores (${strategy.toUpperCase()}) ---`);
  console.log(`Performance:    ${Math.round(categories.performance.score * 100)} / 100`);
  console.log(`Accessibility:  ${Math.round(categories.accessibility.score * 100)} / 100`);
  console.log(`Best Practices: ${Math.round(categories['best-practices'].score * 100)} / 100`);
  console.log(`SEO:            ${Math.round(categories.seo.score * 100)} / 100`);

  console.log(`\n--- Core Web Vitals & Key Metrics (${strategy.toUpperCase()}) ---`);
  const metrics = [
    'first-contentful-paint',
    'largest-contentful-paint',
    'total-blocking-time',
    'cumulative-layout-shift',
    'speed-index',
    'server-response-time',
  ];

  for (const m of metrics) {
    if (audits[m]) {
      console.log(`  ${audits[m].title}: ${audits[m].displayValue || (audits[m].numericValue ? audits[m].numericValue.toFixed(0) + ' ms' : '')}`);
    }
  }

  console.log(`\n--- Top Opportunities & Diagnostics (${strategy.toUpperCase()}) ---`);
  const oppAudits = Object.keys(audits)
    .filter(k => audits[k].details && (audits[k].details.type === 'opportunity' || audits[k].details.overallSavingsMs > 0 || audits[k].details.overallSavingsBytes > 0))
    .sort((a, b) => (audits[b].details?.overallSavingsMs || 0) - (audits[a].details?.overallSavingsMs || 0));

  for (const k of oppAudits.slice(0, 8)) {
    const a = audits[k];
    const ms = a.details?.overallSavingsMs ? ` (${Math.round(a.details.overallSavingsMs)} ms potential savings)` : '';
    const bytes = a.details?.overallSavingsBytes ? ` (${Math.round(a.details.overallSavingsBytes / 1024)} KB potential savings)` : '';
    console.log(`  * ${a.title}${a.displayValue ? ` [${a.displayValue}]` : ''}${ms}${bytes}`);
  }

  // Also check layout shift elements and heavy items
  if (audits['layout-shifts'] && audits['layout-shifts'].details?.items?.length) {
    console.log(`\n--- Cumulative Layout Shift Elements:`);
    for (const item of audits['layout-shifts'].details.items.slice(0, 3)) {
      console.log(`  - Shift: ${item.score?.toFixed(3)} on ${item.node?.snippet || item.node?.nodeLabel || 'node'}`);
    }
  }

  return { categories, audits };
}

try {
  runAudit('mobile');
  runAudit('desktop');
} catch (e) {
  console.error("Lighthouse execution error:", e);
  process.exit(1);
}
