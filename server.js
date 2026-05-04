const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');

// Set environment to production
process.env.NODE_ENV = 'production';

// ─── CRITICAL: Set PORT before requiring standalone server ───
// Hostinger assigns a dynamic port via process.env.PORT.
// Next.js standalone reads PORT at import time — it MUST be set first.
// If PORT is not set (local dev), default to 3000.
if (!process.env.PORT) {
  process.env.PORT = '3000';
}

console.log(`[server] Starting on port ${process.env.PORT}`);

// Ensure the current working directory is the root of the project
process.chdir(__dirname);

const STATIC_DIR = path.join(__dirname, '.next', 'standalone', '.next', 'static');
const PUBLIC_DIR = path.join(__dirname, '.next', 'standalone', 'public');

// Fallback static directories (for local dev or if standalone copy wasn't run)
const STATIC_DIR_FALLBACK = path.join(__dirname, '.next', 'static');
const PUBLIC_DIR_FALLBACK = path.join(__dirname, 'public');

// MIME type mapping for common file extensions
const MIME_TYPES = {
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
};

/**
 * Try to serve a static file from one of the given directories.
 * Returns true if the file was served, false otherwise.
 */
function tryServeStaticFile(filePath, res) {
  if (!fs.existsSync(filePath)) return false;

  const stat = fs.statSync(filePath);
  if (!stat.isFile()) return false;

  const ext = path.extname(filePath).toLowerCase();
  const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': mimeType,
    'Content-Length': stat.size,
    // Cache static assets aggressively
    'Cache-Control': filePath.includes('/_next/static/')
      ? 'public, max-age=31536000, immutable'
      : 'public, max-age=86400',
  });

  fs.createReadStream(filePath).pipe(res);
  return true;
}

// ─── Intercept the original http.createServer to add static file fallback ───
const originalCreateServer = http.createServer.bind(http);
http.createServer = function (options, handler) {
  // Handle both (options, handler) and (handler) signatures
  if (typeof options === 'function') {
    handler = options;
    options = {};
  }

  const wrappedHandler = function (req, res) {
    let pathname = '/';
    try {
      // Use WHATWG URL API to parse the request URL (avoids url.parse() deprecation)
      const baseUrl = `http://localhost${req.url || '/'}`;
      pathname = decodeURIComponent(new URL(baseUrl).pathname);
    } catch {
      pathname = req.url ? req.url.split('?')[0] : '/';
    }

    // ── Serve /_next/static/* ──
    if (pathname.startsWith('/_next/static/')) {
      const relativePath = pathname.replace('/_next/static/', '');
      const filePath1 = path.join(STATIC_DIR, relativePath);
      const filePath2 = path.join(STATIC_DIR_FALLBACK, relativePath);

      if (tryServeStaticFile(filePath1, res)) return;
      if (tryServeStaticFile(filePath2, res)) return;
    }

    // ── Serve public files (e.g. /favicon.ico, /robots.txt) ──
    if (!pathname.startsWith('/_next/') && !pathname.startsWith('/api/')) {
      const cleanPath = pathname === '/' ? '' : pathname;
      const pubFile1 = path.join(PUBLIC_DIR, cleanPath);
      const pubFile2 = path.join(PUBLIC_DIR_FALLBACK, cleanPath);

      if (tryServeStaticFile(pubFile1, res)) return;
      if (tryServeStaticFile(pubFile2, res)) return;
    }

    // ── Fall through to Next.js handler ──
    handler(req, res);
  };

  return originalCreateServer(options, wrappedHandler);
};

// Next.js standalone outputs a 'server.js' file in '.next/standalone'
// We require it here so Hostinger LiteSpeed/Passenger can start it
require('./.next/standalone/server.js');

// ─── Keep-alive ping to prevent cold starts on Hostinger ───
// Pings the server every 5 minutes so Passenger never puts it to sleep
const SITE_URL = process.env.AUTH_URL || `http://localhost:${process.env.PORT}`;
const PING_INTERVAL = 5 * 60 * 1000; // 5 minutes

function keepAlive() {
  const pingUrl = new URL('/api/health', SITE_URL);
  const client = pingUrl.protocol === 'https:' ? https : http;

  // Temporarily bypass our wrapper for the keep-alive ping
  const req = client.request(pingUrl, { method: 'GET', timeout: 10000 }, (res) => {
    res.resume();
  });

  req.on('error', () => {
    // Silently ignore ping errors
  });

  req.end();
}

// Start pinging after 30 seconds (allow server to fully start first)
setTimeout(() => {
  keepAlive();
  setInterval(keepAlive, PING_INTERVAL);
}, 30000);
