#!/usr/bin/env node
const fs   = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');

// ─── Project root ──────────────────────────────────────────────────────────────

function findProjectRoot(startDir) {
  let current = startDir;
  while (true) {
    if (fs.existsSync(path.join(current, 'package.json'))) return current;
    const parent = path.dirname(current);
    if (parent === current) return null;
    current = parent;
  }
}

const projectRoot = findProjectRoot(process.cwd()) || path.resolve(__dirname);
process.chdir(projectRoot);

let pkg = { name: 'myportfolio', version: '0.0.0' };
try {
  pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
} catch { /* proceed with defaults */ }

// ─── Lazy-load scripts ────────────────────────────────────────────────────────

function requireScript(name) {
  return require(path.join(projectRoot, 'scripts', name));
}

// ─── Args ─────────────────────────────────────────────────────────────────────

const rawArgs     = process.argv.slice(2);
const command     = (rawArgs[0] || 'help').toLowerCase();
const restArgs    = rawArgs.slice(1);
const flags       = new Set(restArgs.filter(a => a.startsWith('-')));
const positionals = restArgs.filter(a => !a.startsWith('-'));
const verbose     = flags.has('--verbose') || flags.has('-v');

function hasFlag(...names) { return names.some(n => flags.has(n)); }

// ─── Colour palette ───────────────────────────────────────────────────────────

const C = {
  reset:   '\x1b[0m',
  bold:    '\x1b[1m',
  dim:     '\x1b[2m',
  red:     '\x1b[31m',
  green:   '\x1b[32m',
  yellow:  '\x1b[33m',
  blue:    '\x1b[34m',
  magenta: '\x1b[35m',
  cyan:    '\x1b[36m',
};

function col(color, text) { return `${C[color]}${text}${C.reset}`; }

// ─── Shared UI primitives ─────────────────────────────────────────────────────

const W = Math.min(process.stdout.columns || 72, 72);

function rule()    { return C.dim + '\u2500'.repeat(W) + C.reset; }
function ok(msg)   { console.log(`  ${col('green',  '\u2713')} ${msg}`); }
function info(msg) { console.log(`  ${col('cyan',   '\u00b7')} ${C.dim}${msg}${C.reset}`); }
function warn(msg) { console.log(`  ${col('yellow', '\u26a0')} ${col('yellow', msg)}`); }
function fail(msg) { console.log(`  ${col('red',    '\u2717')} ${col('red', msg)}`); }

/** Top banner — title + optional subtitle + optional rows */
function banner(title, subtitle = '', rows = []) {
  console.log();
  console.log(rule());
  const sub = subtitle ? `  ${C.dim}${subtitle}${C.reset}` : '';
  console.log(`  ${C.bold}${C.cyan}${title}${C.reset}${sub}`);
  if (rows.length) {
    console.log(rule());
    for (const [icon, label, hint] of rows)
      console.log(`  ${icon} ${C.bold}${label}${C.reset}${hint ? `  ${C.dim}${hint}${C.reset}` : ''}`);
  }
  console.log(rule());
  console.log();
}

/** Printed when an async command completes successfully */
function done(msg = 'Done') {
  console.log();
  console.log(rule());
  ok(`${C.bold}${msg}${C.reset}`);
  console.log(rule());
  console.log();
}

// ─── Help ─────────────────────────────────────────────────────────────────────

function printHelp() {
  const H = (label) => console.log(`\n  ${C.bold}${C.yellow}${label}${C.reset}`);
  const R = (name, desc, hint = '') =>
    console.log(`    ${col('green', name.padEnd(28))}${desc}${hint ? `  ${C.dim}${hint}${C.reset}` : ''}`);

  console.log();
  console.log(rule());
  console.log(`  ${C.bold}${C.cyan}pf${C.reset}  ${C.dim}${pkg.name} v${pkg.version}${C.reset}`);
  console.log(`  ${C.dim}Usage: pf <command> [options]${C.reset}`);
  console.log(rule());

  H('Development');
  R('serve',               'Hugo + CSS watch (full dev mode)',      'http://localhost:1313');
  R('serve --cms',         'Hugo + CSS + CMS proxy',                'http://localhost:1313/admin/');
  R('serve --storybook',   'Hugo + CSS + Storybook dev',             'http://localhost:1313 + :6006');
  R('serve --no-css',      'Hugo only (skip CSS watch)');
  R('dev:cms',             'Alias for serve --cms');
  R('watch',               'Watch & rebuild Tailwind CSS only');

  H('Build');
  R('dev',                 'Full development build');
  R('prod',                'Full production build');
  R('build [--prod]',      'Run build pipeline',                    'default: dev');

  H('Content');
  R('new post <slug>',     'Create a new blog post draft');
  R('new project <slug>',  'Create a new portfolio project');
  R('cms',                 'Start local CMS proxy server');
  R('cms --open',          'Start proxy + open browser');

  H('Deploy');
  R('migrate',             'Production build dry-run');
  R('migrate --deploy',    'Build + deploy to Netlify');
  R('netlify status',      'Show Netlify site & env info');

  H('Storybook');
  R('storybook',           'Start Storybook dev server',            'http://localhost:6006');
  R('storybook build',     'Build static Storybook');
  R('design',              'CSS watch + Storybook (design flow)');

  H('Maintenance');
  R('clean [level]',       'Remove build artifacts',                'light|deep|nuclear|cache');
  R('lint',                'Run CSS + JS + Markdown linters');
  R('format',              'Prettier format all files');
  R('css <sub>',           'CSS tools',                             'audit|analyze|unused|optimize|cleanup');

  H('Info');
  R('status',              'Project & build status dashboard');
  R('open [url]',          'Open browser to dev server', 'default: http://localhost:1313');
  R('audit',               'Run npm security audit');
  R('perf',                'Run performance test suite');
  R('version',             'Print CLI version');
  R('help',                'Show this help text');

  console.log();
  console.log(`  ${C.dim}Options:  --verbose / -v   verbose output${C.reset}`);
  console.log(rule());
  console.log();
}

// ─── Runners ──────────────────────────────────────────────────────────────────

function runProcess(cmd, args = [], opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      stdio: 'inherit',
      shell: true,
      cwd: projectRoot,
      ...opts,
    });
    child.on('close', code =>
      code === 0 ? resolve() : reject(new Error(`${cmd} exited with code ${code}`))
    );
  });
}

function runNpm(script) {
  return runProcess('npm', ['run', script]);
}

// ─── pf build / dev / prod ────────────────────────────────────────────────────

async function runBuild(environment) {
  const isProd = environment === 'production';
  banner(`${isProd ? '\uD83D\uDE80' : '\uD83C\uDFD7'}  build  ${isProd ? 'prod' : 'dev'}`,
         `${pkg.name} v${pkg.version}`);
  const BuildPipeline = requireScript('build-pipeline.js');
  await new BuildPipeline({ environment, verbose }).run();
}

// ─── pf clean ────────────────────────────────────────────────────────────────

async function runClean(level) {
  const labels = { light: 'light', deep: 'deep', nuclear: '\u2622  nuclear', cache: 'cache' };
  banner(`\uD83E\uDDF9 clean  ${labels[level] || level}`, `${pkg.name} v${pkg.version}`);
  const ProjectCleaner = requireScript('clean-command.js');
  const cleaner = new ProjectCleaner({ projectRoot, verbose });
  const map = { deep: 'deepClean', nuclear: 'nuclearClean', cache: 'cacheClean' };
  const method = map[level] || 'lightClean';
  if (!cleaner[method]) {
    fail(`Unknown clean level "${level}".  Use: light | deep | nuclear | cache`);
    process.exitCode = 1;
    return;
  }
  await cleaner[method]();
}

// ─── pf serve ────────────────────────────────────────────────────────────────

async function runServe(withCms = false, noCss = false, withStorybook = false) {
  const hugoCmd = 'hugo server -D --config hugo.toml,config.development.toml';
  const cssCmd  = 'npm run watch';
  const cmsCmd  = 'npx netlify-cms-proxy-server';
  const sbCmd   = 'npm run storybook';

  const rows = [];
  if (!noCss) rows.push(['\uD83C\uDFA8', 'CSS',  'PostCSS watch  \u2192  static/css/styles.css']);
  rows.push(['\uD83C\uDFD7', 'Hugo', col('bold', 'http://localhost:1313')]);
  if (withCms)       rows.push(['\uD83D\uDCDD', 'CMS',       col('bold', 'http://localhost:1313/admin/')]);
  if (withStorybook) rows.push(['\uD83D\uDCDA', 'Storybook', col('bold', 'http://localhost:6006')]);
  banner('\u26A1 serve', `${pkg.name} v${pkg.version}`, rows);

  const procConfigs = [
    { cmd: hugoCmd, label: 'HUGO', color: 'blue'    },
    ...(!noCss        ? [{ cmd: cssCmd, label: ' CSS', color: 'magenta' }] : []),
    ...(withCms       ? [{ cmd: cmsCmd, label: ' CMS', color: 'yellow'  }] : []),
    ...(withStorybook ? [{ cmd: sbCmd,  label: '  SB', color: 'cyan'    }] : []),
  ];

  const SKIP = [
    /^>\s+\S+@\S+\s+\w/,
    /^hugo v\d+\.\d+\.\d+/,
    /^Watching for changes in /,
    /^Watching for config changes in /,
    /^Running in Fast Render Mode/,
    /^Environment:/,
    /^Serving pages from disk/,
    /^-{3,}\+-{3,}/,
    /^\s*\|\s*EN\s*$/,
  ];

  const isWin = process.platform === 'win32';

  const procs = procConfigs.map(({ cmd, label, color }) => {
    const proc = isWin
      ? spawn('cmd', ['/c', cmd], { stdio: ['inherit', 'pipe', 'pipe'], shell: false, cwd: projectRoot })
      : spawn('sh',  ['-c', cmd], { stdio: ['inherit', 'pipe', 'pipe'], shell: false, cwd: projectRoot });

    const prefix = `${C.dim}[${C[color]}${label}${C.dim}]${C.reset} `;

    function processLine(raw) {
      raw = raw.trimEnd();
      if (!raw) return;
      if (SKIP.some(r => r.test(raw))) return;

      if (/^\s+(Pages|Paginator pages|Non-page files|Static files|Processed images|Aliases|Cleaned)\s+\|/.test(raw)) {
        const [key, val] = raw.split('|');
        const count  = (val || '').trim();
        const isZero = count === '0';
        console.log(`${prefix}  ${C.dim}${key.trim().padEnd(22)}${C.reset}${isZero ? C.dim : C.green}${count}${C.reset}`);
        return;
      }
      if (/^Built in \d+/.test(raw)) {
        console.log(`${prefix}${C.green}\u2713 ${raw}${C.reset}\n`);
        return;
      }
      if (/^Web Server is available at/.test(raw)) {
        const url = raw.match(/https?:\/\/[^\s)]+/)?.[0] || 'http://localhost:1313';
        console.log(`${prefix}${C.bold}${C.cyan}\uD83C\uDF10  Ready  \u2192  ${url}${C.reset}`);
        return;
      }
      if (/^Start building sites/.test(raw)) {
        console.log(`${prefix}${C.yellow}\u2699  Building...${C.reset}`);
        return;
      }
      if (/^Change of/.test(raw)) {
        const what = raw.match(/Change of (.+?) detected/)?.[1] || 'files';
        console.log(`\n${prefix}${C.yellow}\u21BB  ${what} changed \u2014 rebuilding${C.reset}`);
        return;
      }
      if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(raw)) {
        console.log(`${prefix}${C.dim}${raw}${C.reset}`);
        return;
      }
      if (/^Syncing /.test(raw)) {
        const match = raw.match(/Syncing (.+?) to/);
        console.log(`${prefix}${C.dim}\u2192 synced ${match?.[1] || raw}${C.reset}`);
        return;
      }
      if (/error|ERROR/.test(raw)) { console.log(`${prefix}${C.red}${raw}${C.reset}`);    return; }
      if (/WARN|warn/.test(raw))   { console.log(`${prefix}${C.yellow}${raw}${C.reset}`); return; }
      console.log(`${prefix}${C.dim}${raw}${C.reset}`);
    }

    let buf = '';
    function onData(chunk) {
      buf += chunk.toString();
      const lines = buf.split('\n');
      buf = lines.pop();
      lines.forEach(processLine);
    }
    proc.stdout.on('data', onData);
    proc.stderr.on('data', onData);
    return proc;
  });

  function shutdown() {
    procs.forEach(p => { try { p.kill('SIGINT'); } catch (_) {} });
    console.log();
    console.log(rule());
    info('Server stopped.');
    console.log(rule());
    console.log();
    process.exit(0);
  }
  process.on('SIGINT',  shutdown);
  process.on('SIGTERM', shutdown);

  await Promise.all(procs.map(p => new Promise(r => p.on('close', r))));
}

// ─── pf storybook ────────────────────────────────────────────────────────────

async function runStorybook(build = false) {
  if (build) {
    banner('\uD83D\uDCE6 storybook build', `${pkg.name} v${pkg.version}`);
    await runNpm('storybook:build');
    done('Storybook built \u2192 storybook-static/');
    info('Preview with: pf storybook serve');
    console.log();
  } else {
    banner('\uD83C\uDFA8 storybook', `${pkg.name} v${pkg.version}`, [
      ['\u00b7', 'Storybook dev', col('bold', 'http://localhost:6006')],
    ]);
    await runNpm('storybook');
  }
}

// ─── pf new ───────────────────────────────────────────────────────────────────

// Security: only lowercase letters, digits, and hyphens; no path traversal,
// no shell metacharacters, no directory separators.
const SAFE_SLUG_RE = /^[a-z0-9][a-z0-9-]{0,79}$/;

async function runNew(type, slug) {
  if (!slug) {
    fail(`Usage: pf new ${type} <slug>`);
    process.exit(1);
  }
  // Guard against path traversal (e.g. ../../../etc/passwd) and injection
  if (!SAFE_SLUG_RE.test(slug)) {
    fail(`Invalid slug "${slug}".`);
    info('Use only lowercase letters, digits, and hyphens (e.g. my-project-2026).');
    info('Must start with a letter or digit. Max 80 characters.');
    process.exit(1);
  }
  const hugoType = type === 'post' ? 'posts' : 'portfolio';
  const filename  = type === 'post' ? `posts/${slug}.md` : `portfolio/${slug}.md`;
  banner(`\uD83D\uDCDD new ${type}`, slug);
  info(`Running Hugo archetype for ${hugoType}/${slug}.md ...`);
  await runProcess('hugo', ['new', filename, '--config', 'hugo.toml,config.development.toml']);
  const fullPath = path.join(projectRoot, 'content', filename);
  if (fs.existsSync(fullPath)) {
    done(`Created: content/${filename}`);
    info(`Full path: ${fullPath}`);
    console.log();
  }
}

// ─── pf migrate ───────────────────────────────────────────────────────────────

async function runMigrate(deploy = false) {
  const icon  = deploy ? '\uD83D\uDE80' : '\uD83D\uDD0D';
  const label = deploy ? 'migrate --deploy' : 'migrate (dry-run)';
  banner(`${icon} ${label}`, `${pkg.name} v${pkg.version}`);
  await runProcess('node', ['scripts/migrate-to-prod.js', ...(deploy ? ['--deploy'] : [])]);
}

// ─── pf netlify ───────────────────────────────────────────────────────────────

async function runNetlify() {
  banner('\u2601  netlify status', `${pkg.name} v${pkg.version}`);
  await runProcess('node', ['scripts/migrate-to-prod.js', '--status']);
}

// ─── pf lint ──────────────────────────────────────────────────────────────────

async function runLint() {
  banner('\uD83D\uDD0D lint', `${pkg.name} v${pkg.version}`, [
    ['\u00b7', 'CSS',       'stylelint src/**/*.css  themes/**/*.css'],
    ['\u00b7', 'JS',        'eslint themes/**/assets/js/**/*.js'],
    ['\u00b7', 'Markdown',  'markdownlint **/*.md'],
  ]);
  await runNpm('lint');
  done('All linters passed');
}

// ─── pf format ────────────────────────────────────────────────────────────────

async function runFormat() {
  banner('\u270F  format', `${pkg.name} v${pkg.version}`, [
    ['\u00b7', 'Prettier', '**/*.{js,css,html,json,yml,yaml}'],
  ]);
  await runNpm('format');
  done('All files formatted');
}

// ─── pf watch ────────────────────────────────────────────────────────────────

async function runWatch() {
  banner('\uD83C\uDFA8 watch', `${pkg.name} v${pkg.version}`, [
    ['\u00b7', 'PostCSS', 'src/css/tailwind.css  \u2192  static/css/styles.css'],
  ]);
  await runNpm('watch');
}

// ─── pf css ───────────────────────────────────────────────────────────────────

const cssSubMap = {
  audit:    { script: 'css:audit',    icon: '\uD83D\uDD0E', label: 'CSS audit'    },
  analyze:  { script: 'css:analyze',  icon: '\uD83D\uDCCA', label: 'CSS analyze'  },
  report:   { script: 'css:report',   icon: '\uD83D\uDCCB', label: 'CSS report'   },
  unused:   { script: 'css:unused',   icon: '\uD83D\uDDD1', label: 'CSS unused'   },
  optimize: { script: 'css:optimize', icon: '\u26A1',        label: 'CSS optimize' },
  cleanup:  { script: 'css:cleanup',  icon: '\uD83E\uDDF9', label: 'CSS cleanup'  },
};

async function runCss(sub) {
  const entry = cssSubMap[sub];
  if (!entry) {
    fail(`Unknown css subcommand "${sub}".`);
    info('Use: audit | analyze | report | unused | optimize | cleanup');
    process.exitCode = 1;
    return;
  }
  banner(`${entry.icon} ${entry.label}`, `${pkg.name} v${pkg.version}`);
  await runNpm(entry.script);
  done(`${entry.label} complete`);
}

// ─── pf design ───────────────────────────────────────────────────────────────

async function runDesign() {
  banner('\uD83C\uDFA8 design workflow', `${pkg.name} v${pkg.version}`, [
    ['\u00b7', 'CSS',       'PostCSS watch  \u2192  static/css/styles.css'],
    ['\u00b7', 'Storybook', 'http://localhost:6006'],
  ]);
  await runNpm('workflow:design');
}

// ─── pf open ─────────────────────────────────────────────────────────────────

function runOpen(url = 'http://localhost:1313') {
  banner('\uD83C\uDF10 open', url);
  const cmd = process.platform === 'win32' ? `start "${url}"`
            : process.platform === 'darwin' ? `open "${url}"`
            : `xdg-open "${url}"`;
  execSync(cmd, { stdio: 'inherit', shell: true, cwd: projectRoot });
}

// ─── pf audit ────────────────────────────────────────────────────────────────

async function runAudit() {
  banner('\uD83D\uDD10 audit', `${pkg.name} v${pkg.version}`, [
    ['\u00b7', 'npm audit', '--audit-level moderate'],
  ]);
  await runProcess('npm', ['audit', '--audit-level', 'moderate']);
  done('Audit complete');
}

// ─── pf perf ─────────────────────────────────────────────────────────────────

async function runPerf() {
  banner('\u26A1 perf', `${pkg.name} v${pkg.version}`, [
    ['\u00b7', 'Performance test', 'scripts/performance-test.js'],
  ]);
  await runNpm('test:performance');
  done('Performance test complete');
}

// ─── pf cms ───────────────────────────────────────────────────────────────────

async function runCms(openBrowser = false) {
  banner('\uD83D\uDCDD cms', `${pkg.name} v${pkg.version}`, [
    ['\u00b7', 'Admin proxy', col('bold', 'http://localhost:1313/admin/')],
  ]);
  if (openBrowser) await runProcess('npm', ['run', 'cms:admin']);
  await runProcess('npx', ['netlify-cms-proxy-server']);
}

// ─── pf status ───────────────────────────────────────────────────────────────

function runStatus() {
  const checks = [
    ['node_modules',          fs.existsSync(path.join(projectRoot, 'node_modules'))],
    ['static/css/styles.css', fs.existsSync(path.join(projectRoot, 'static/css/styles.css'))],
    ['static/js/main.js',     fs.existsSync(path.join(projectRoot, 'static/js/main.js'))],
    ['public/ (built)',       fs.existsSync(path.join(projectRoot, 'public'))],
  ];

  let gitBranch = 'unknown';
  let gitDirty  = 0;
  try {
    gitBranch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: projectRoot, encoding: 'utf8' }).trim();
    const dirty = execSync('git status --porcelain', { cwd: projectRoot, encoding: 'utf8' }).trim();
    gitDirty = dirty ? dirty.split('\n').length : 0;
  } catch { /* not a git repo */ }

  console.log();
  console.log(rule());
  console.log(`  ${C.bold}${C.cyan}status${C.reset}  ${C.dim}${pkg.name} v${pkg.version}${C.reset}`);
  console.log(rule());
  for (const [label, exists] of checks) {
    const icon = exists ? col('green', '\u2713') : col('yellow', '\u25CB');
    console.log(`  ${icon}  ${exists ? label : col('dim', label)}`);
  }
  console.log();
  const branchTag = gitDirty
    ? col('yellow', ` (${gitDirty} uncommitted)`)
    : col('green', ' (clean)');
  console.log(`  ${col('cyan', 'Branch')}  ${col(gitDirty ? 'yellow' : 'green', gitBranch)}${branchTag}`);
  console.log();
  console.log(`  ${col('cyan', 'URLs')}`);
  console.log(`    ${C.dim}Local ${C.reset} ${C.bold}http://localhost:1313${C.reset}`);
  console.log(`    ${C.dim}Admin ${C.reset} ${C.bold}http://localhost:1313/admin/${C.reset}`);
  console.log(`    ${C.dim}Prod  ${C.reset} ${C.bold}https://isaiahdavis.com${C.reset}`);
  console.log();
  console.log(rule());
  console.log();
}

// ─── Dispatch ────────────────────────────────────────────────────────────────

(async () => {
  try {
    switch (command) {

      case 'help':
        printHelp();
        break;

      case 'version':
        console.log();
        console.log(`  ${C.bold}${C.cyan}${pkg.name}${C.reset}  ${C.dim}v${pkg.version}${C.reset}`);
        console.log();
        break;

      case 'status':
        runStatus();
        break;

      case 'serve':
        await runServe(hasFlag('--cms'), hasFlag('--no-css'), hasFlag('--storybook'));
        break;

      case 'dev:cms':
        await runServe(true, false);
        break;

      case 'watch':
        await runWatch();
        break;

      case 'dev':
        await runBuild('development');
        break;

      case 'prod':
      case 'production':
        await runBuild('production');
        break;

      case 'build': {
        const env = hasFlag('--prod', '--production') ? 'production' : 'development';
        await runBuild(env);
        break;
      }

      case 'new': {
        const type = positionals[0];
        const slug = positionals[1];
        if (!type || !['post', 'project'].includes(type)) {
          fail('Usage: pf new <post|project> <slug>');
          process.exit(1);
        }
        await runNew(type, slug);
        break;
      }

      case 'cms':
        await runCms(hasFlag('--open'));
        break;

      case 'migrate':
        await runMigrate(hasFlag('--deploy'));
        break;

      case 'netlify':
        await runNetlify();
        break;

      case 'clean': {
        const level = positionals[0] || 'light';
        await runClean(level);
        break;
      }

      case 'lint':
        await runLint();
        break;

      case 'format':
        await runFormat();
        break;

      case 'css':
        await runCss(positionals[0] || 'audit');
        break;

      case 'storybook':
      case 'story': {
        const sub = positionals[0];
        if      (sub === 'build') await runStorybook(true);
        else if (sub === 'serve') await runNpm('storybook:serve');
        else                      await runStorybook(false);
        break;
      }

      case 'storybook:build':
      case 'story:build':
        await runStorybook(true);
        break;

      case 'storybook:serve':
      case 'story:serve':
        banner('\uD83D\uDCE6 storybook serve', `${pkg.name} v${pkg.version}`, [
          ['\u00b7', 'Static preview', col('bold', 'http://localhost:6007')],
        ]);
        await runNpm('storybook:serve');
        break;

      case 'design':
        await runDesign();
        break;

      case 'open':
        runOpen(positionals[0]);
        break;

      case 'audit':
        await runAudit();
        break;

      case 'perf':
        await runPerf();
        break;

      default:
        fail(`Unknown command "${command}".`);
        info(`Run ${col('cyan', 'pf help')} to see all available commands.`);
        console.log();
        process.exitCode = 1;
    }
  } catch (error) {
    console.log();
    console.log(rule());
    fail(error.message);
    console.log(rule());
    console.log();
    process.exit(1);
  }
})();
