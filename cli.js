#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

function findProjectRoot(startDir) {
	let current = startDir;
	while (true) {
		if (fs.existsSync(path.join(current, 'package.json'))) {
			return current;
		}

		const parent = path.dirname(current);
		if (parent === current) {
			return null;
		}

		current = parent;
	}
}

const projectRoot = findProjectRoot(process.cwd()) || path.resolve(__dirname);
process.chdir(projectRoot);

let pkg = { name: 'portfolio', version: '0.0.0' };
try {
	pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
} catch (error) {
	console.warn('⚠️ Could not read package.json, proceeding with defaults');
}

const BuildPipeline = require(path.join(projectRoot, 'scripts', 'build-pipeline.js'));
const ProjectCleaner = require(path.join(projectRoot, 'scripts', 'clean-command.js'));

const rawArgs = process.argv.slice(2);
const command = (rawArgs[0] || 'help').toLowerCase();
const restArgs = rawArgs.slice(1);

const flags = new Set(restArgs.filter((arg) => arg.startsWith('-')));
const positionals = restArgs.filter((arg) => !arg.startsWith('-'));

const verbose = flags.has('--verbose') || flags.has('-v');

function hasFlag(...names) {
	return names.some((name) => flags.has(name));
}

function printHeader(title) {
	console.log(`\n=== ${title} ===`);
}

function printHelp() {
	printHeader(`${pkg.name || 'portfolio'} CLI`);
	console.log('Usage: portfolio <command> [options]');
	console.log('\nCommands:');
	console.log('  help                 Show this help text');
	console.log('  version              Show version');
	console.log('  build [--prod|--dev] Run build pipeline (default: dev)');
	console.log('  dev                  Build in development mode');
	console.log('  prod                 Build in production mode');
	console.log('  clean [level]        Clean artifacts (light|deep|nuclear|cache)');
	console.log('  serve                Start Hugo dev server (-D)');
	console.log('  watch                Watch Tailwind CSS');
	console.log('\nOptions:');
	console.log('  --verbose, -v        Verbose output for build/clean');
}

async function runBuild(environment) {
	const pipeline = new BuildPipeline({ environment, verbose });
	await pipeline.run();
}

async function runClean(level) {
	const cleaner = new ProjectCleaner({ projectRoot, verbose });

	switch (level) {
		case 'deep':
			await cleaner.deepClean();
			break;
		case 'nuclear':
			await cleaner.nuclearClean();
			break;
		case 'cache':
			await cleaner.cacheClean();
			break;
		case 'light':
		case undefined:
		case null:
		case '':
			await cleaner.lightClean();
			break;
		default:
			console.log(`Unknown clean level "${level}".`);
			printHelp();
			process.exitCode = 1;
	}
}

function runProcess(cmd, args) {
	return new Promise((resolve, reject) => {
		const child = spawn(cmd, args, {
			stdio: 'inherit',
			shell: true,
			cwd: projectRoot
		});

		child.on('close', (code) => {
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(`${cmd} exited with code ${code}`));
			}
		});
	});
}

async function runServe() {
	await runProcess('hugo', ['server', '-D']);
}

async function runWatch() {
	await runProcess('npm', ['run', 'watch']);
}

(async () => {
	try {
		switch (command) {
			case 'help':
				printHelp();
				break;
			case 'version':
				console.log(`${pkg.name || 'portfolio'} v${pkg.version || '0.0.0'}`);
				break;
			case 'build': {
				const env = hasFlag('--prod', '--production')
					? 'production'
					: hasFlag('--dev', '--development')
					? 'development'
					: 'development';

				await runBuild(env);
				break;
			}
			case 'dev':
				await runBuild('development');
				break;
			case 'prod':
			case 'production':
				await runBuild('production');
				break;
			case 'clean': {
				const level = positionals[0] || 'light';
				await runClean(level);
				break;
			}
			case 'serve':
				await runServe();
				break;
			case 'watch':
				await runWatch();
				break;
			default:
				console.log(`Unknown command "${command}".`);
				printHelp();
				process.exitCode = 1;
		}
	} catch (error) {
		console.error(`❌ ${error.message}`);
		process.exit(1);
	}
})();
