#!/usr/bin/env node
/**
 * Enhanced Clean Command for Hugo Portfolio
 * Provides different levels of cleaning based on needs
 */

const fs = require('fs');
const path = require('path');

class ProjectCleaner {
  constructor(options = {}) {
    this.projectRoot = options.projectRoot || process.cwd();
    this.verbose = options.verbose || false;
  }

  /**
   * Light clean - only generated assets
   */
  async lightClean() {
    console.log('🧹 Light Clean: Removing generated assets...');

    const targets = [
      'static/css/styles.css',
      'static/css/styles.min.css',
      'static/css/styles.css.map',
      'static/js/main.js',
      'static/js/main.js.map'
    ];

    this.removeTargets(targets);
    console.log('✅ Light clean completed');
  }

  /**
   * Deep clean - all build artifacts
   */
  async deepClean() {
    console.log('🧹 Deep Clean: Removing all build artifacts...');

    const targets = [
      'public',
      'resources',
      'static/css/styles.css',
      'static/css/styles.min.css',
      'static/css/styles.css.map',
      'static/js/main.js',
      'static/js/main.js.map',
      '.hugo_build.lock',
      'node_modules/.cache'
    ];

    this.removeTargets(targets);
    console.log('✅ Deep clean completed');
  }

  /**
   * Nuclear clean - everything including dependencies
   */
  async nuclearClean() {
    console.log('☢️ Nuclear Clean: Removing everything...');

    const targets = [
      'public',
      'resources',
      'node_modules',
      'static/css/styles.css',
      'static/css/styles.min.css',
      'static/css/styles.css.map',
      'static/js/main.js',
      'static/js/main.js.map',
      '.hugo_build.lock',
      'package-lock.json'
    ];

    this.removeTargets(targets);
    console.log('✅ Nuclear clean completed - run npm install to restore');
  }

  /**
   * Cache clean - only caches and temporary files
   */
  async cacheClean() {
    console.log('🗄️ Cache Clean: Clearing caches and temporary files...');

    const targets = [
      'resources',
      '.hugo_build.lock',
      'node_modules/.cache',
      'css-optimization-report.md',
      'unused-classes.json',
      'unused-css-report.md',
      'css-cleanup-suggestions.json'
    ];

    this.removeTargets(targets);
    console.log('✅ Cache clean completed');
  }

  /**
   * Remove target files/directories
   */
  removeTargets(targets) {
    let removed = 0;

    for (const target of targets) {
      const fullPath = path.join(this.projectRoot, target);

      if (fs.existsSync(fullPath)) {
        try {
          const stats = fs.statSync(fullPath);

          if (stats.isDirectory()) {
            fs.rmSync(fullPath, { recursive: true, force: true });
          } else {
            fs.unlinkSync(fullPath);
          }

          removed++;
          if (this.verbose) {
            console.log(`   ✓ Removed ${target}`);
          }
        } catch (error) {
          console.warn(`   ⚠️ Could not remove ${target}: ${error.message}`);
        }
      }
    }

    console.log(`   Removed ${removed} items`);
  }

  /**
   * Get cleaning recommendations
   */
  getRecommendations() {
    return {
      development: 'Use light clean or cache clean for daily development',
      debugging: 'Use deep clean when troubleshooting build issues',
      deployment: 'Use deep clean before production builds',
      maintenance: 'Use nuclear clean monthly for full refresh'
    };
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const cleanType = args[0] || 'light';
  const verbose = args.includes('--verbose') || args.includes('-v');

  const cleaner = new ProjectCleaner({
    projectRoot: process.cwd(),
    verbose
  });

  switch (cleanType) {
    case 'light':
      cleaner.lightClean();
      break;
    case 'deep':
      cleaner.deepClean();
      break;
    case 'nuclear':
      cleaner.nuclearClean();
      break;
    case 'cache':
      cleaner.cacheClean();
      break;
    default:
      console.log('Usage: node clean-command.js [light|deep|nuclear|cache] [--verbose]');
      console.log('');
      console.log('Clean Types:');
      console.log('  light   - Remove generated CSS/JS only (fast)');
      console.log('  deep    - Remove all build artifacts (recommended)');
      console.log('  nuclear - Remove everything including node_modules');
      console.log('  cache   - Remove only caches and temporary files');

      const recommendations = cleaner.getRecommendations();
      console.log('\nRecommendations:');
      Object.entries(recommendations).forEach(([use, desc]) => {
        console.log(`  ${use}: ${desc}`);
      });
  }
}

module.exports = ProjectCleaner;
