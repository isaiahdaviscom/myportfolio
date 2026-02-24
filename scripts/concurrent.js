#!/usr/bin/env node
/**
 * Zero-dependency concurrent process runner.
 * Replaces `concurrently` for dev workflows.
 *
 * Usage: node scripts/concurrent.js "cmd1" "cmd2" "cmd3"
 */
const { spawn } = require('child_process');

const commands = process.argv.slice(2);
if (!commands.length) {
  console.error('Usage: node scripts/concurrent.js "cmd1" "cmd2" ...');
  process.exit(1);
}

const isWin = process.platform === 'win32';
const colors = ['\x1b[36m', '\x1b[33m', '\x1b[35m', '\x1b[32m', '\x1b[34m'];
const reset = '\x1b[0m';

const procs = commands.map((cmd, i) => {
  const label = `[${i + 1}]`;
  const color = colors[i % colors.length];
  console.log(`${color}${label}${reset} Starting: ${cmd}`);

  const p = isWin
    ? spawn('cmd', ['/c', cmd], { stdio: 'inherit', shell: false })
    : spawn('sh', ['-c', cmd], { stdio: 'inherit', shell: false });

  p.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`${color}${label}${reset} Process exited with code ${code}: ${cmd}`);
    }
  });

  return p;
});

function shutdown() {
  procs.forEach((p) => {
    try {
      p.kill('SIGINT');
    } catch (_) {}
  });
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
