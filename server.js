const path = require('path');

// Set environment to production
process.env.NODE_ENV = 'production';

// Ensure the current working directory is the root of the project
process.chdir(__dirname);

// Next.js standalone outputs a 'server.js' file in '.next/standalone'
// We require it here so Hostinger LiteSpeed/Passenger can start it
require('./.next/standalone/server.js');
