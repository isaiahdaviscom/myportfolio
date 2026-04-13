#!/usr/bin/env node
/**
 * Complete Build Pipeline for Hugo Portfolio
 * Handles development and production builds with CSS optimization
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class BuildPipeline {
  constructor(options = {}) {
    this.projectRoot = process.cwd();
    this.environment = options.environment || process.env.NODE_ENV || 'development';
    this.verbose = options.verbose || false;
  }

  async run() {
    console.log(`🚀 Starting ${this.environment.toUpperCase()} build pipeline...\n`);

    try {
      // Step 1: Clean previous builds
      await this.clean();

      // Step 2: Build CSS
      await this.buildCSS();

      // Step 3: CSS Analysis and Optimization (production only)
      if (this.environment === 'production') {
        await this.optimizeCSS();
      }

      // Step 4: Build JavaScript
      await this.buildJS();

      // Step 5: Build Hugo site
      await this.buildHugo();

      // Step 6: Post-build validation
      await this.validate();

      console.log(`\n✅ ${this.environment.toUpperCase()} build completed successfully!`);
    } catch (error) {
      console.error(`❌ Build failed: ${error.message}`);
      process.exit(1);
    }
  }

  async clean() {
    console.log('🧹 Cleaning previous builds...');

    const cleanTargets = [
      'public',
      'static/css/styles.css',
      'static/css/styles.min.css',
      'static/js/main.js'
    ];

    for (const target of cleanTargets) {
      const targetPath = path.join(this.projectRoot, target);
      if (fs.existsSync(targetPath)) {
        if (fs.statSync(targetPath).isDirectory()) {
          fs.rmSync(targetPath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(targetPath);
        }
        this.log(`   Removed ${target}`);
      }
    }
  }

  async buildCSS() {
    console.log('\n🎨 Building CSS...');

    try {
      const cmd = 'npx postcss src/css/tailwind.css -o static/css/styles.css';
      execSync(cmd, { stdio: this.verbose ? 'inherit' : 'pipe' });

      const cssStats = fs.statSync(path.join(this.projectRoot, 'static/css/styles.css'));
      console.log(`   CSS built successfully (${this.formatBytes(cssStats.size)})`);
    } catch (error) {
      throw new Error(`CSS build failed: ${error.message}`);
    }
  }

  async optimizeCSS() {
    console.log('\n⚡ Optimizing CSS for production...');

    try {
      // Run CSS analysis
      execSync('node scripts/css-analyzer.js', { stdio: this.verbose ? 'inherit' : 'pipe' });
      console.log('   CSS analysis completed');

      // Run manual optimization
      execSync('node scripts/css-optimizer.js', { stdio: this.verbose ? 'inherit' : 'pipe' });
      console.log('   CSS optimization completed');

      // Compare sizes
      const originalStats = fs.statSync(path.join(this.projectRoot, 'static/css/styles.css'));
      const optimizedStats = fs.statSync(path.join(this.projectRoot, 'static/css/styles.min.css'));
      const savings = originalStats.size - optimizedStats.size;
      const percentSaved = ((savings / originalStats.size) * 100).toFixed(2);

      console.log(`   Size reduction: ${this.formatBytes(savings)} (${percentSaved}%)`);
    } catch (error) {
      console.warn(`   ⚠️  CSS optimization failed: ${error.message}`);
      // Copy original as fallback
      fs.copyFileSync(
        path.join(this.projectRoot, 'static/css/styles.css'),
        path.join(this.projectRoot, 'static/css/styles.min.css')
      );
      console.log('   Using original CSS as fallback');
    }
  }

  async buildJS() {
    console.log('\n📦 Building JavaScript...');

    try {
      const jsSource = path.join(this.projectRoot, 'themes/myPortfolio/assets/js/main.js');

      if (fs.existsSync(jsSource)) {
        const cmd = `npx esbuild ${jsSource} --bundle --outfile=static/js/main.js${this.environment === 'production' ? ' --minify' : ''}`;
        execSync(cmd, { stdio: this.verbose ? 'inherit' : 'pipe' });

        const jsStats = fs.statSync(path.join(this.projectRoot, 'static/js/main.js'));
        console.log(`   JavaScript built successfully (${this.formatBytes(jsStats.size)})`);
      } else {
        console.log('   No JavaScript source found, skipping');
      }
    } catch (error) {
      throw new Error(`JavaScript build failed: ${error.message}`);
    }
  }

  async buildHugo() {
    console.log('\n🏗️  Building Hugo site...');

    try {
      let cmd = 'hugo --gc --minify';

      if (this.environment === 'development') {
        cmd += ' --environment development --config hugo.toml,config.development.toml';
      } else if (this.environment === 'production') {
        cmd += ' --config hugo.toml,config.production.toml';
      }

      execSync(cmd, { stdio: this.verbose ? 'inherit' : 'pipe' });

      const publicPath = path.join(this.projectRoot, 'public');
      if (fs.existsSync(publicPath)) {
        const files = this.countFiles(publicPath);
        console.log(`   Hugo site built successfully (${files} files)`);
      }
    } catch (error) {
      throw new Error(`Hugo build failed: ${error.message}`);
    }
  }

  async validate() {
    console.log('\n✅ Validating build...');

    const checks = [
      { name: 'Hugo public directory', path: 'public' },
      {
        name: 'CSS file',
        path:
          this.environment === 'production' ? 'static/css/styles.min.css' : 'static/css/styles.css'
      },
      { name: 'Hugo index', path: 'public/index.html' }
    ];

    let allValid = true;

    for (const check of checks) {
      const fullPath = path.join(this.projectRoot, check.path);
      const exists = fs.existsSync(fullPath);

      if (exists) {
        const stats = fs.statSync(fullPath);
        const size = stats.isDirectory() ? 'directory' : this.formatBytes(stats.size);
        console.log(`   ✓ ${check.name}: ${size}`);
      } else {
        console.log(`   ✗ ${check.name}: missing`);
        allValid = false;
      }
    }

    if (!allValid) {
      throw new Error('Build validation failed');
    }
  }

  countFiles(dir) {
    let count = 0;

    const walk = currentDir => {
      try {
        const items = fs.readdirSync(currentDir, { withFileTypes: true });
        for (const item of items) {
          if (item.isDirectory()) {
            walk(path.join(currentDir, item.name));
          } else {
            count++;
          }
        }
      } catch (error) {
        // Directory read error
      }
    };

    walk(dir);
    return count;
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  log(message) {
    if (this.verbose) {
      console.log(message);
    }
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const environment =
    args.includes('--prod') || args.includes('--production')
      ? 'production'
      : args.includes('--dev') || args.includes('--development')
        ? 'development'
        : process.env.NODE_ENV || 'development';

  const verbose = args.includes('--verbose') || args.includes('-v');

  const pipeline = new BuildPipeline({ environment, verbose });
  pipeline.run().catch(error => {
    console.error('Pipeline failed:', error);
    process.exit(1);
  });
}

module.exports = BuildPipeline;
