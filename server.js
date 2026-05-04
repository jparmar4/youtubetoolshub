const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');

// Set environment to production
process.env.NODE_ENV = 'production';

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
    if (!fs.existsSync(filePath)) return false;
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
  } catch (e) {
    console.error(`[server] Error serving ${filePath}:`, e.message);
    return false;
  }
}

function handleStaticRequest(req, res, nextHandler) {
  let pathname = '/';
  try {
    const urlObj = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    pathname = decodeURIComponent(urlObj.pathname);
  } catch (e) {
    pathname = (req.url || '/').split('?')[0];
  }

  // ── Serve /_next/static/* ──
  if (pathname.startsWith('/_next/static/')) {
    const relative = pathname.slice('/_next/static/'.length);
    let served = false;
    for (const base of STATIC_PATHS) {
      if (serveFile(path.join(base, relative), res, true)) {
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
        if (serveFile(path.join(base, cleanPath), res, false)) return;
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

// Keep-alive ping
const SITE_URL = process.env.AUTH_URL || `http://localhost:${process.env.PORT}`;
setInterval(() => {
  try {
    const protocol = SITE_URL.startsWith('https') ? https : http;
    protocol.get(`${SITE_URL}/api/health`, (r) => r.resume()).on('error', () => {});
  } catch (e) {}
}, 5 * 60 * 1000);
