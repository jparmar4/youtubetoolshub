const https = require('https');
const http = require('http');

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

// Next.js standalone outputs a 'server.js' file in '.next/standalone'
// We require it here so Hostinger LiteSpeed/Passenger can start it
require('./.next/standalone/server.js');

// ─── Keep-alive ping to prevent cold starts on Hostinger ───
// Pings the server every 5 minutes so Passenger never puts it to sleep
const SITE_URL = process.env.AUTH_URL || `http://localhost:${process.env.PORT}`;
const PING_INTERVAL = 5 * 60 * 1000; // 5 minutes

function keepAlive() {
  const url = new URL('/api/health', SITE_URL);
  const client = url.protocol === 'https:' ? https : http;

  const req = client.request(url, { method: 'GET', timeout: 10000 }, (res) => {
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
