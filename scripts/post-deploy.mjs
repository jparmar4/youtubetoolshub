/**
 * Post-deploy automation for YouTube Tools Hub.
 *
 * 1. Wait until production /api/health is OK
 * 2. Submit priority URLs to IndexNow (fast path)
 * 3. Optionally submit full sitemap
 * 4. Optionally run live SEO smoke checks
 *
 * Usage:
 *   node scripts/post-deploy.mjs
 *   node scripts/post-deploy.mjs --full
 *   node scripts/post-deploy.mjs --skip-check
 *   node scripts/post-deploy.mjs --base https://www.youtubetoolshub.com
 *   node scripts/post-deploy.mjs --via-api   # hits /api/indexnow with secret
 *
 * Env:
 *   SITE_URL                 default https://www.youtubetoolshub.com
 *   INDEXNOW_ADMIN_SECRET    required for --via-api
 *   POST_DEPLOY_WAIT_MS      default 5000 between retries
 *   POST_DEPLOY_RETRIES      default 12
 */

import { spawn } from "child_process";
import https from "https";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
const wantFull = args.includes("--full");
const skipCheck = args.includes("--skip-check");
const viaApi = args.includes("--via-api");
const baseIdx = args.indexOf("--base");
const BASE = (
  process.env.SITE_URL ||
  (baseIdx >= 0 ? args[baseIdx + 1] : null) ||
  "https://www.youtubetoolshub.com"
).replace(/\/$/, "");

const WAIT_MS = Number(process.env.POST_DEPLOY_WAIT_MS || 5000);
const RETRIES = Number(process.env.POST_DEPLOY_RETRIES || 12);

function log(msg) {
  console.log(`[post-deploy] ${msg}`);
}

function fetchUrl(url, options = {}) {
  return new Promise((resolve) => {
    const lib = url.startsWith("https") ? https : http;
    const u = new URL(url);
    const req = lib.request(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: options.method || "GET",
        headers: {
          "User-Agent": "YouTubeToolsHub-PostDeploy/1.0",
          ...(options.headers || {}),
        },
        timeout: 25000,
      },
      (res) => {
        let body = "";
        res.on("data", (c) => {
          if (body.length < 50000) body += c;
        });
        res.on("end", () =>
          resolve({ status: res.statusCode || 0, body }),
        );
      },
    );
    req.on("error", (e) => resolve({ status: 0, body: e.message }));
    req.on("timeout", () => {
      req.destroy();
      resolve({ status: 0, body: "timeout" });
    });
    if (options.body) req.write(options.body);
    req.end();
  });
}

function runNode(scriptRel, scriptArgs = []) {
  return new Promise((resolve) => {
    const child = spawn(
      process.execPath,
      [path.join(root, scriptRel), ...scriptArgs],
      { cwd: root, stdio: "inherit", env: process.env },
    );
    child.on("close", (code) => resolve(code ?? 1));
  });
}

async function waitForHealth() {
  const healthUrl = `${BASE}/api/health`;
  log(`Waiting for health: ${healthUrl}`);
  for (let i = 1; i <= RETRIES; i++) {
    const r = await fetchUrl(healthUrl);
    if (r.status === 200) {
      log(`Health OK (attempt ${i}/${RETRIES})`);
      return true;
    }
    log(
      `Health not ready (${r.status || r.body}) — retry ${i}/${RETRIES} in ${WAIT_MS}ms`,
    );
    await new Promise((r) => setTimeout(r, WAIT_MS));
  }
  return false;
}

async function submitViaApi() {
  const secret = process.env.INDEXNOW_ADMIN_SECRET;
  if (!secret) {
    log("INDEXNOW_ADMIN_SECRET missing — cannot use --via-api");
    return 1;
  }
  log("Submitting via GET /api/indexnow (server-side full URL list)");
  const r = await fetchUrl(`${BASE}/api/indexnow`, {
    headers: { "x-indexnow-secret": secret },
  });
  log(`API IndexNow status ${r.status}: ${r.body.slice(0, 300)}`);
  return r.status === 200 || r.status === 202 ? 0 : 1;
}

async function main() {
  log(`Base: ${BASE}`);
  log(
    `Mode: ${viaApi ? "api" : "cli"} | full sitemap: ${wantFull} | checks: ${!skipCheck}`,
  );

  const healthy = await waitForHealth();
  if (!healthy) {
    log("ABORT: site never became healthy");
    process.exitCode = 1;
    return;
  }

  // Brief settle after health (CDN/process warm)
  await new Promise((r) => setTimeout(r, 2000));

  let code = 0;

  if (viaApi) {
    code = (await submitViaApi()) || code;
  } else {
    log("IndexNow priority URLs…");
    code =
      (await runNode("scripts/submit-indexnow.mjs", ["--priority"])) || code;
    if (wantFull) {
      log("IndexNow full sitemap…");
      code = (await runNode("scripts/submit-indexnow.mjs")) || code;
    }
  }

  if (!skipCheck) {
    log("Running post-deploy SEO smoke checks…");
    const checkCode = await runNode("scripts/deploy-checklist.mjs", [
      "--post",
      "--base",
      BASE,
    ]);
    if (checkCode !== 0) code = checkCode;
  }

  if (code === 0) {
    log("Post-deploy complete ✓");
    log("Next: GSC request indexing for /tools/youtube-earnings-calculator");
  } else {
    log(`Post-deploy finished with issues (exit ${code})`);
  }
  process.exitCode = code;
}

main();
