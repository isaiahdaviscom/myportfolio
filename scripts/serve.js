#!/usr/bin/env node
/**
 * Zero-dependency static file server.
 * Replaces http-server for `npm run serve` and `npm run storybook:serve`.
 *
 * Usage: node scripts/serve.js [dir=public] [port=8080]
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const dir = process.argv[2] || 'public';
const port = parseInt(process.argv[3] || '8080', 10);

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.webmanifest': 'application/manifest+json'
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0]; // strip query string
  let filePath = path.join(dir, urlPath === '/' ? 'index.html' : urlPath);

  // For paths without extension, try index.html in that directory
  if (!path.extname(filePath)) {
    filePath = path.join(filePath, 'index.html');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found: ' + urlPath);
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'no-cache'
    });
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Serving ./${dir} at http://localhost:${port}`);
  console.log('Press Ctrl+C to stop.');
});
