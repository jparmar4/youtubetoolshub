const http = require('http');
const path = require('path');
const fs = require('fs');

// Set environment to production if not already set
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// ─── CRITICAL: Set PORT before requiring standalone server ───
if (!process.env.PORT) {
  process.env.PORT = '3000';
}

console.log(`[server] Starting on port ${process.env.PORT}`);

// Ensure the current working directory is the root of the project
process.chdir(__dirname);

// ─── Static file directories ───
// We look in multiple possible locations to be absolutely sure we find them
const STATIC_PATHS = [
  path.join(__dirname, '.next', 'static'),
  path.join(__dirname, '.next', 'standalone', '.next', 'static'),
];

const PUBLIC_PATHS = [
  path.join(__dirname, 'public'),
  path.join(__dirname, '.next', 'standalone', 'public'),
];

const MIME_TYPES = {
  '.js':          'application/javascript; charset=utf-8',
  '.mjs':         'application/javascript; charset=utf-8',
  '.css':         'text/css; charset=utf-8',
  '.html':        'text/html; charset=utf-8',
  '.json':        'application/json; charset=utf-8',
  '.jsonld':      'application/ld+json; charset=utf-8',
  '.png':         'image/png',
  '.jpg':         'image/jpeg',
  '.jpeg':        'image/jpeg',
  '.gif':         'image/gif',
  '.svg':         'image/svg+xml',
  '.ico':         'image/x-icon',
  '.webp':        'image/webp',
  '.avif':        'image/avif',
  '.woff':        'font/woff',
  '.woff2':       'font/woff2',
  '.ttf':         'font/ttf',
  '.eot':         'application/vnd.ms-fontobject',
  '.txt':         'text/plain; charset=utf-8',
  '.xml':         'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
};

function serveFile(filePath, res, isImmutable) {
  try {
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) return false;

    const ext = path.extname(filePath).toLowerCase();
    const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': mimeType,
      'Content-Length': stat.size,
      'Cache-Control': isImmutable
        ? 'public, max-age=31536000, immutable'
        : 'public, max-age=86400',
    });

    fs.createReadStream(filePath).pipe(res);
    return true;
  } catch {
    // File doesn't exist or is unreadable
    return false;
  }
}

function handleStaticRequest(req, res, nextHandler) {
  let pathname = '/';
  try {
    const urlObj = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    pathname = decodeURIComponent(urlObj.pathname);
  } catch {
    pathname = (req.url || '/').split('?')[0];
  }

  // ── Serve /_next/static/* ──
  if (pathname.startsWith('/_next/static/')) {
    const relative = pathname.slice('/_next/static/'.length);
    let served = false;
    for (const base of STATIC_PATHS) {
      const resolved = path.resolve(base, relative);
      // SECURITY: Prevent path traversal — resolved path must stay within base
      if (!resolved.startsWith(base)) continue;
      if (serveFile(resolved, res, true)) {
        served = true;
        break;
      }
    }
    if (!served) {
      // Explicit 404 for missing static chunks instead of falling through to Next.js handler.
      // If Next.js handles it, it returns an HTML 404 which causes strict MIME checking errors in the browser,
      // preventing the Next.js client router from recovering gracefully.
      res.writeHead(404, { 'Content-Type': 'application/javascript; charset=utf-8' });
      res.end();
    }
    return;
  }

  // ── Serve public files ──
  if (!pathname.startsWith('/_next/') && !pathname.startsWith('/api/')) {
    const cleanPath = pathname === '/' ? null : pathname;
    if (cleanPath) {
      for (const base of PUBLIC_PATHS) {
        const resolved = path.resolve(base, cleanPath);
        // SECURITY: Prevent path traversal — resolved path must stay within base
        if (!resolved.startsWith(base)) continue;
        if (serveFile(resolved, res, false)) return;
      }
    }
  }

  // ── Fall through to Next.js ──
  nextHandler(req, res);
}

// Intercept server creation
const _createServer = http.createServer.bind(http);
http.createServer = function (opts, handler) {
  const h = typeof opts === 'function' ? opts : handler;
  const o = typeof opts === 'function' ? {} : opts;
  
  return _createServer(o, (req, res) => handleStaticRequest(req, res, h));
};

// Start Next.js
try {
  require('./.next/standalone/server.js');
} catch (e) {
  console.error('[server] Failed to load standalone server:', e.message);
  console.log('[server] Attempting fallback to build directory...');
  // If standalone is missing, this is likely local dev or a broken build
  process.exit(1);
}

// Keep-alive ping — use localhost to avoid unnecessary external DNS resolution
const KEEP_ALIVE_URL = `http://localhost:${process.env.PORT}/api/health`;
setInterval(() => {
  try {
    http.get(KEEP_ALIVE_URL, (r) => r.resume()).on('error', () => {});
  } catch {}
}, 5 * 60 * 1000);

// ─── Optional: IndexNow only after successful health (host deploy) ───
// Enable on Hostinger with AUTO_INDEXNOW=1 in environment.
// Uses a lock file so restarts within INDEXNOW_MIN_HOURS do not re-submit.
function maybeRunIndexNowOnBoot() {
  if (process.env.AUTO_INDEXNOW !== '1' && process.env.AUTO_INDEXNOW !== 'true') {
    return;
  }

  const minHours = Number(process.env.INDEXNOW_MIN_HOURS || 20);
  const lockPath = path.join(__dirname, '.indexnow-last-run');
  const fullSitemap =
    process.env.AUTO_INDEXNOW_FULL === '1' ||
    process.env.AUTO_INDEXNOW_FULL === 'true';

  try {
    if (fs.existsSync(lockPath)) {
      const last = Number(fs.readFileSync(lockPath, 'utf8').trim());
      if (last && Date.now() - last < minHours * 60 * 60 * 1000) {
        console.log(
          `[server] AUTO_INDEXNOW skipped (last run < ${minHours}h ago)`,
        );
        return;
      }
    }
  } catch {
    // ignore lock read errors
  }

  const maxAttempts = Number(process.env.INDEXNOW_BOOT_RETRIES || 12);
  const delayMs = Number(process.env.INDEXNOW_BOOT_DELAY_MS || 5000);
  let attempt = 0;

  const tryHealthThenIndex = () => {
    attempt += 1;
    http
      .get(KEEP_ALIVE_URL, (res) => {
        res.resume();
        if (res.statusCode === 200) {
          console.log(
            `[server] Health OK — running post-deploy IndexNow (attempt ${attempt})`,
          );
          const { spawn } = require('child_process');
          const script = path.join(__dirname, 'scripts', 'post-deploy.mjs');
          const args = fullSitemap
            ? [script, '--full', '--skip-check']
            : [script, '--skip-check'];
          const child = spawn(process.execPath, args, {
            cwd: __dirname,
            env: process.env,
            stdio: 'inherit',
            detached: true,
          });
          child.unref();
          try {
            fs.writeFileSync(lockPath, String(Date.now()), 'utf8');
          } catch (e) {
            console.warn('[server] Could not write IndexNow lock:', e.message);
          }
          return;
        }
        scheduleRetry();
      })
      .on('error', scheduleRetry);
  };

  const scheduleRetry = () => {
    if (attempt >= maxAttempts) {
      console.warn(
        `[server] AUTO_INDEXNOW aborted: health never OK after ${maxAttempts} tries`,
      );
      return;
    }
    setTimeout(tryHealthThenIndex, delayMs);
  };

  // First attempt after short settle so standalone can finish boot
  setTimeout(tryHealthThenIndex, delayMs);
}

maybeRunIndexNowOnBoot();
