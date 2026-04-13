#!/usr/bin/env node
/**
 * Content & Asset Migration: Development → Production
 * =====================================================
 * Builds the production site and deploys to Netlify.
 *
 * Usage:
 *   node scripts/migrate-to-prod.js           # dry-run (build only, no deploy)
 *   node scripts/migrate-to-prod.js --deploy  # build + deploy to production
 *   node scripts/migrate-to-prod.js --status  # show Netlify site status only
 *
 * npm aliases:
 *   npm run migrate              → dry-run
 *   npm run migrate:deploy       → build + deploy
 *   npm run netlify:status       → site status
 */

const { execSync, spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectRoot = process.cwd();
const args = new Set(process.argv.slice(2));
const isDeploy = args.has('--deploy');
const isStatus = args.has('--status');
const dryRun = !isDeploy && !isStatus;

// ─── Helpers ────────────────────────────────────────────────────────────────

function run(cmd, opts = {}) {
  return execSync(cmd, { stdio: 'inherit', cwd: projectRoot, ...opts });
}

function runSafe(cmd) {
  const result = spawnSync(cmd, { shell: true, cwd: projectRoot, encoding: 'utf8' });
  return { ok: result.status === 0, stdout: result.stdout, stderr: result.stderr };
}

function header(text) {
  const line = '─'.repeat(text.length + 4);
  console.log(`\n┌${line}┐`);
  console.log(`│  ${text}  │`);
  console.log(`└${line}┘`);
}

function checkNetlifyCLI() {
  const result = runSafe('netlify --version');
  if (!result.ok) {
    console.error('\n❌ Netlify CLI not found. Install it with:');
    console.error('   npm install -g netlify-cli');
    process.exit(1);
  }
  return result.stdout.trim();
}

function checkPublicDir() {
  const publicPath = path.join(projectRoot, 'public');
  if (!fs.existsSync(publicPath)) {
    console.error('\n❌ public/ directory missing — run a build first.');
    process.exit(1);
  }
  const indexPath = path.join(publicPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('\n❌ public/index.html missing — build may have failed.');
    process.exit(1);
  }
}

function listChangedContent() {
  console.log('\n📋 Content files changed since last commit:');
  const result = runSafe('git status --short content/ static/images/uploads/');
  if (result.ok && result.stdout.trim()) {
    console.log(result.stdout);
  } else {
    console.log('   No uncommitted content changes.');
  }
}

function gitSyncStatus() {
  const result = runSafe('git log --oneline origin/master..HEAD 2>nul');
  if (result.ok && result.stdout.trim()) {
    console.log('\n📦 Commits not yet on master:');
    console.log(
      result.stdout
        .split('\n')
        .map(l => `   ${l}`)
        .join('\n')
    );
  } else {
    console.log('\n✅ Branch is in sync with origin/master.');
  }
}

// ─── Commands ────────────────────────────────────────────────────────────────

async function showStatus() {
  header('Netlify Site Status');
  checkNetlifyCLI();
  run('netlify status');
  run('netlify env:list 2>nul || echo "   (env vars require site link)"', { stdio: 'pipe' });
}

async function buildAndDeploy() {
  header('Production Migration');
  const netlifyVersion = checkNetlifyCLI();
  console.log(`\n🔧 Netlify CLI: ${netlifyVersion}`);

  // 1 — Show what's changing
  listChangedContent();
  gitSyncStatus();

  // 2 — Production build
  console.log('\n📦 Running production build...');
  run('node scripts/build-pipeline.js --prod');

  // 3 — Validate output
  checkPublicDir();
  const files = fs.readdirSync(path.join(projectRoot, 'public')).length;
  console.log(`\n✅ Build validated — ${files} items in public/`);

  if (dryRun) {
    console.log('\n───────────────────────────────────────────────');
    console.log('🧪 Dry-run complete. To deploy to production:');
    console.log('   npm run migrate:deploy');
    console.log('   node scripts/migrate-to-prod.js --deploy');
    console.log('───────────────────────────────────────────────');
    return;
  }

  // 4 — Deploy
  console.log('\n🚀 Deploying to Netlify production...');
  run('netlify deploy --prod --dir=public');

  console.log('\n✅ Migration complete! Your site is live.');
  console.log('   🌐 https://isaiahdavis.com');
}

// ─── Entry ───────────────────────────────────────────────────────────────────

(async () => {
  try {
    if (isStatus) {
      await showStatus();
    } else {
      await buildAndDeploy();
    }
  } catch (err) {
    console.error(`\n❌ Migration failed: ${err.message}`);
    process.exit(1);
  }
})();
