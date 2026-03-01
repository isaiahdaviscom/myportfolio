#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');

// ─── Project root detection ───────────────────────────────────────────────────

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
} catch {
  console.warn('⚠️  Could not read package.json, proceeding with defaults');
}

// ─── Lazy-load scripts that may not exist in all environments ────────────────

function requireScript(name) {
  return require(path.join(projectRoot, 'scripts', name));
}

// ─── Args ────────────────────────────────────────────────────────────────────

const rawArgs = process.argv.slice(2);
const command = (rawArgs[0] || 'help').toLowerCase();
const restArgs = rawArgs.slice(1);
const flags = new Set(restArgs.filter(a => a.startsWith('-')));
const positionals = restArgs.filter(a => !a.startsWith('-'));
const verbose = flags.has('--verbose') || flags.has('-v');

function hasFlag(...names) {
  return names.some(n => flags.has(n));
}

// ─── UI helpers ──────────────────────────────────────────────────────────────

const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

function col(color, text) {
  return `${C[color]}${text}${C.reset}`;
}

function printHelp() {
  const name = pkg.name || 'pf';
  const ver = pkg.version || '0.0.0';
  console.log(`\n${C.bold}${C.cyan}${name}${C.reset} ${C.dim}v${ver}${C.reset}`);
  console.log(`${C.dim}Usage: pf <command> [options]${C.reset}\n`);

  const section = label => console.log(`\n${C.bold}${C.yellow}${label}${C.reset}`);
  const cmd = (name, desc, hint = '') =>
    console.log(
      `  ${col('green', name.padEnd(26))}${desc}${hint ? C.dim + '  ' + hint + C.reset : ''}`
    );

  section('Development');
  cmd('serve', 'Hugo + CSS watch (full dev mode)', 'http://localhost:1313');
  cmd('serve --cms', 'Hugo + CSS watch + CMS proxy', 'http://localhost:1313/admin/');
  cmd('serve --no-css', 'Hugo server only (skip CSS watch)');
  cmd('dev:cms', 'Alias for serve --cms', 'http://localhost:1313/admin/');
  cmd('watch', 'Watch & rebuild Tailwind CSS only');

  section('Build');
  cmd('dev', 'Full development build');
  cmd('prod', 'Full production build');
  cmd('build [--prod|--dev]', 'Run build pipeline', 'default: dev');

  section('Content');
  cmd('new post <slug>', 'Create a new blog post draft');
  cmd('new project <slug>', 'Create a new portfolio project');
  cmd('cms', 'Start local CMS proxy server');
  cmd('cms --open', 'Start proxy + open browser');

  section('Deploy');
  cmd('migrate', 'Production build dry-run');
  cmd('migrate --deploy', 'Build + deploy to Netlify');
  cmd('netlify status', 'Show Netlify site link & env vars');

  section('Storybook');
  cmd('storybook', 'Start Storybook component dev server', 'http://localhost:6006');
  cmd('storybook:build', 'Build static Storybook to storybook-static/');
  cmd('design', 'CSS watch + Storybook together (design workflow)');

  section('Maintenance');
  cmd('clean [level]', 'Remove build artifacts', 'light|deep|nuclear|cache');
  cmd('lint', 'Run CSS + JS + MD linters');
  cmd('format', 'Prettier format all files');
  cmd('css audit', 'Analyze & report unused CSS');

  section('Info');
  cmd('status', 'Show project & build status');
  cmd('version', 'Show CLI version');
  cmd('help', 'Show this help text');

  console.log(`\n${C.dim}  Options: --verbose/-v  Verbose output${C.reset}\n`);
}

// ─── Runners ─────────────────────────────────────────────────────────────────

function runProcess(cmd, args = [], opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      stdio: 'inherit',
      shell: true,
      cwd: projectRoot,
      ...opts
    });
    child.on('close', code =>
      code === 0 ? resolve() : reject(new Error(`${cmd} exited with code ${code}`))
    );
  });
}

function runNpm(script) {
  return runProcess('npm', ['run', script]);
}

async function runBuild(environment) {
  const BuildPipeline = requireScript('build-pipeline.js');
  await new BuildPipeline({ environment, verbose }).run();
}

async function runClean(level) {
  const ProjectCleaner = requireScript('clean-command.js');
  const cleaner = new ProjectCleaner({ projectRoot, verbose });
  const map = { deep: 'deepClean', nuclear: 'nuclearClean', cache: 'cacheClean' };
  const method = map[level] || 'lightClean';
  if (!cleaner[method]) {
    console.log(`Unknown clean level "${level}". Use: light | deep | nuclear | cache`);
    process.exitCode = 1;
    return;
  }
  await cleaner[method]();
}

async function runServe(withCms = false, noCss = false) {
  const hugoCmd = 'hugo server -D --config hugo.toml,config.development.toml';
  const cssCmd  = 'npm run watch';
  const cmsCmd  = 'npx netlify-cms-proxy-server';

  const commands = [hugoCmd];
  if (!noCss) commands.push(cssCmd);
  if (withCms) commands.push(cmsCmd);

  console.log(col('cyan', '\n🚀 Starting dev server...'));
  if (!noCss) console.log(col('dim', '   🎨 CSS watch active'));
  console.log(col('dim',  '   🖥️  Hugo:  http://localhost:1313'));
  if (withCms) console.log(col('dim', '   📝 Admin: http://localhost:1313/admin/'));
  console.log();

  const isWin = process.platform === 'win32';
  const procs = commands.map(cmd => {
    return isWin
      ? spawn('cmd', ['/c', cmd], { stdio: 'inherit', shell: false, cwd: projectRoot })
      : spawn('sh',  ['-c', cmd], { stdio: 'inherit', shell: false, cwd: projectRoot });
  });

  function shutdown() {
    procs.forEach(p => { try { p.kill('SIGINT'); } catch (_) {} });
    process.exit(0);
  }
  process.on('SIGINT',  shutdown);
  process.on('SIGTERM', shutdown);

  await Promise.all(procs.map(p => new Promise(r => p.on('close', r))));
}

async function runStorybook(build = false) {
  if (build) {
    console.log(col('cyan', '\n📦 Building Storybook → storybook-static/ ...\n'));
    await runNpm('storybook:build');
    console.log(col('green', '\n✅ Storybook built to storybook-static/'));
    console.log(col('dim', '   Preview: pf storybook:serve\n'));
  } else {
    console.log(col('cyan', '\n🎨 Starting Storybook dev server...'));
    console.log(col('dim', '   http://localhost:6006\n'));
    await runNpm('storybook');
  }
}

async function runNew(type, slug) {
  if (!slug) {
    console.error(`❌ Usage: pf new ${type} <slug>`);
    process.exit(1);
  }
  const hugoType = type === 'post' ? 'posts' : 'portfolio';
  const filename = type === 'post' ? `posts/${slug}.md` : `portfolio/${slug}.md`;
  console.log(col('cyan', `\n📝 Creating ${hugoType}/${slug}.md ...`));
  await runProcess('hugo', ['new', filename, '--config', 'hugo.toml,config.development.toml']);
  const fullPath = path.join(projectRoot, 'content', filename);
  if (fs.existsSync(fullPath)) {
    console.log(col('green', `✅ Created: content/${filename}`));
    console.log(col('dim', `   Open: ${fullPath}`));
  }
}

async function runMigrate(deploy = false) {
  const args = deploy ? ['--deploy'] : [];
  await runProcess('node', ['scripts/migrate-to-prod.js', ...args]);
}

async function runNetlify(sub) {
  await runProcess('node', ['scripts/migrate-to-prod.js', '--status']);
}

function runStatus() {
  const publicExists = fs.existsSync(path.join(projectRoot, 'public'));
  const cssExists = fs.existsSync(path.join(projectRoot, 'static/css/styles.css'));
  const jsExists = fs.existsSync(path.join(projectRoot, 'static/js/main.js'));
  const nodeExists = fs.existsSync(path.join(projectRoot, 'node_modules'));

  let gitBranch = 'unknown';
  let gitStatus = '';
  try {
    gitBranch = execSync('git rev-parse --abbrev-ref HEAD', {
      cwd: projectRoot,
      encoding: 'utf8'
    }).trim();
    const dirty = execSync('git status --porcelain', { cwd: projectRoot, encoding: 'utf8' }).trim();
    gitStatus = dirty
      ? col('yellow', ` (${dirty.split('\n').length} uncommitted)`)
      : col('green', ' (clean)');
  } catch {
    /* not a git repo */
  }

  const tick = col('green', '✓');
  const cross = col('yellow', '○');

  console.log(`\n${C.bold}Project Status${C.reset}  ${C.dim}${pkg.name} v${pkg.version}${C.reset}`);
  console.log(`${'─'.repeat(40)}`);
  console.log(`  ${nodeExists ? tick : cross} node_modules`);
  console.log(`  ${cssExists ? tick : cross} static/css/styles.css`);
  console.log(`  ${jsExists ? tick : cross} static/js/main.js`);
  console.log(`  ${publicExists ? tick : cross} public/ (built output)`);
  console.log(`\n  ${col('cyan', 'Branch:')} ${gitBranch}${gitStatus}`);
  console.log(`\n  ${col('cyan', 'URLs:')}`);
  console.log(`    Local:  http://localhost:1313`);
  console.log(`    Admin:  http://localhost:1313/admin/`);
  console.log(`    Prod:   https://isaiahdavis.com`);
  console.log();
}

// ─── Dispatch ────────────────────────────────────────────────────────────────

(async () => {
  try {
    switch (command) {
      // Info
      case 'help':
        printHelp();
        break;
      case 'version':
        console.log(`${pkg.name} v${pkg.version}`);
        break;
      case 'status':
        runStatus();
        break;

      // Dev server
      case 'serve':
        await runServe(hasFlag('--cms'), hasFlag('--no-css'));
        break;

      // Hugo + CMS proxy together (explicit alias — same as: pf serve --cms)
      case 'dev:cms':
        await runServe(true, false);
        break;

      // CSS watch
      case 'watch':
        await runNpm('watch');
        break;

      // Builds
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

      // Content creation
      case 'new': {
        const type = positionals[0]; // 'post' | 'project'
        const slug = positionals[1];
        if (!type || !['post', 'project'].includes(type)) {
          console.error('❌ Usage: pf new <post|project> <slug>');
          process.exit(1);
        }
        await runNew(type, slug);
        break;
      }

      // CMS proxy
      case 'cms':
        if (hasFlag('--open')) {
          await runProcess('npm', ['run', 'cms:admin']);
        }
        await runProcess('npx', ['netlify-cms-proxy-server']);
        break;

      // Deploy / migrate
      case 'migrate':
        await runMigrate(hasFlag('--deploy'));
        break;
      case 'netlify': {
        const sub = positionals[0] || 'status';
        await runNetlify(sub);
        break;
      }

      // Clean
      case 'clean': {
        const level = positionals[0] || 'light';
        await runClean(level);
        break;
      }

      // Lint / format
      case 'lint':
        await runNpm('lint');
        break;
      case 'format':
        await runNpm('format');
        break;

      // Storybook
      case 'storybook':
      case 'story': {
        const sub = positionals[0];
        if (sub === 'build') {
          await runStorybook(true);
        } else if (sub === 'serve') {
          await runNpm('storybook:serve');
        } else {
          await runStorybook(false);
        }
        break;
      }
      case 'storybook:build':
      case 'story:build':
        await runStorybook(true);
        break;
      case 'storybook:serve':
      case 'story:serve':
        await runNpm('storybook:serve');
        break;
      case 'design':
        console.log(col('cyan', '\n🎨 Design workflow: CSS watch + Storybook ...\n'));
        await runNpm('workflow:design');
        break;

      // CSS tools
      case 'css': {
        const sub = positionals[0] || 'audit';
        const cssMap = {
          audit: 'css:audit',
          analyze: 'css:analyze',
          report: 'css:report',
          unused: 'css:unused',
          optimize: 'css:optimize',
          cleanup: 'css:cleanup'
        };
        if (!cssMap[sub]) {
          console.error(
            `❌ Unknown css subcommand "${sub}". Use: audit | analyze | report | unused | optimize | cleanup`
          );
          process.exit(1);
        }
        await runNpm(cssMap[sub]);
        break;
      }

      default:
        console.log(`Unknown command "${command}". Run ${col('cyan', 'pf help')} for usage.`);
        process.exitCode = 1;
    }
  } catch (error) {
    console.error(`❌ ${error.message}`);
    process.exit(1);
  }
})();
