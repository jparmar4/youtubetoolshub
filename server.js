const path = require('path');
const http = require('http');

// Set environment to production
process.env.NODE_ENV = 'production';

// Ensure the current working directory is the root of the project
process.chdir(__dirname);

// Next.js standalone outputs a 'server.js' file in '.next/standalone'
// We require it here so Hostinger LiteSpeed/Passenger can start it
require('./.next/standalone/server.js');

// ─── Keep-alive ping to prevent cold starts on Hostinger ───
// Pings the server every 5 minutes so Passenger never puts it to sleep
const SITE_URL = process.env.AUTH_URL || 'http://localhost:3000';
const PING_INTERVAL = 5 * 60 * 1000; // 5 minutes

function keepAlive() {
  const url = new URL('/api/health', SITE_URL);
  const options = {
    hostname: url.hostname,
    port: url.port || (url.protocol === 'https:' ? 443 : 80),
    path: url.pathname,
    method: 'GET',
    timeout: 10000,
  };

  const req = http.request(options, (res) => {
    // Silently consume response
    res.resume();
  });

  req.on('error', () => {
    // Silently ignore ping errors (server might still be starting)
  });

  req.end();
}

// Start pinging after 30 seconds (allow server to fully start first)
setTimeout(() => {
  keepAlive();
  setInterval(keepAlive, PING_INTERVAL);
}, 30000);
