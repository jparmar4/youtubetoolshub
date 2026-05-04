const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');

// Set environment to production
process.env.NODE_ENV = 'production';

// ─── CRITICAL: Set PORT before requiring standalone server ───
// Hostinger assigns a dynamic port via process.env.PORT.
// Next.js standalone reads PORT at import time — it MUST be set first.
if (!process.env.PORT) {
  process.env.PORT = '3000';
}

console.log(`[server] Starting on port ${process.env.PORT}`);

// Ensure the current working directory is the root of the project
process.chdir(__dirname);

// ─── Static file directories ───
// Primary: Inside the standalone build (populated by copy-standalone.js)
const STANDALONE_STATIC = path.join(__dirname, '.next', 'standalone', '.next', 'static');
const STANDALONE_PUBLIC = path.join(__dirname, '.next', 'standalone', 'public');
// Fallback: Original build output (for direct builds without copy step)
const BUILD_STATIC = path.join(__dirname, '.next', 'static');
const BUILD_PUBLIC = path.join(__dirname, 'public');

// ─── MIME type mapping ───
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

/**
 * Serve a file from disk. Returns true if served, false if not found.
 */
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
  } catch {
    return false;
  }
}

/**
 * Custom static file request handler.
 * Checks local disk before falling through to Next.js.
 */
function handleStaticRequest(req, res, nextHandler) {
  // Parse the URL path safely
  let pathname = '/';
  try {
    pathname = decodeURIComponent(new URL(`http://localhost${req.url || '/'}`).pathname);
  } catch {
    pathname = (req.url || '/').split('?')[0];
  }

  // ── /_next/static/* — immutable JS/CSS/font chunks ──
  if (pathname.startsWith('/_next/static/')) {
    const relative = pathname.slice('/_next/static/'.length);
    if (
      serveFile(path.join(STANDALONE_STATIC, relative), res, true) ||
      serveFile(path.join(BUILD_STATIC, relative), res, true)
    ) return;
  }

  // ── Public files (/favicon.ico, /robots.txt, /og-image.png, etc.) ──
  // Skip API and Next internals — let Next.js handle those
  if (
    !pathname.startsWith('/_next/') &&
    !pathname.startsWith('/api/')
  ) {
    // Only try exact file paths (not directory index files)
    const filePath = pathname === '/' ? null : pathname;
    if (filePath && (
      serveFile(path.join(STANDALONE_PUBLIC, filePath), res, false) ||
      serveFile(path.join(BUILD_PUBLIC, filePath), res, false)
    )) return;
  }

  // ── Fall through: Next.js handles everything else ──
  nextHandler(req, res);
}

// ─── Monkey-patch http.createServer to wrap the Next.js handler ───
// This intercepts the server Next.js standalone creates so we can
// inject our static file logic before it gets to Next's handler.
const _createServer = http.createServer.bind(http);
http.createServer = function (optionsOrHandler, maybeHandler) {
  let opts = {};
  let handler;

  if (typeof optionsOrHandler === 'function') {
    handler = optionsOrHandler;
  } else {
    opts = optionsOrHandler || {};
    handler = maybeHandler;
  }

  const wrapped = (req, res) => handleStaticRequest(req, res, handler);
  return _createServer(opts, wrapped);
};

// ─── Load the Next.js standalone server ───
require('./.next/standalone/server.js');

// ─── Keep-alive ping (prevents Hostinger Passenger sleep) ───
const SITE_URL = process.env.AUTH_URL || `http://localhost:${process.env.PORT}`;

function keepAlive() {
  const pingUrl = new URL('/api/health', SITE_URL);
  const protocol = pingUrl.protocol === 'https:' ? https : http;
  const req = protocol.request(pingUrl, { method: 'GET', timeout: 10000 }, (r) => r.resume());
  req.on('error', () => { /* silently ignore */ });
  req.end();
}

// Wait 30 seconds for full startup, then ping every 5 minutes
setTimeout(() => {
  keepAlive();
  setInterval(keepAlive, 5 * 60 * 1000);
}, 30000);
