#!/usr/bin/env node
/**
 * Manual CSS Optimizer
 * Creates an optimized version of CSS based on class analysis
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ManualCSSOptimizer {
  constructor() {
    this.projectRoot = process.cwd();
    this.usedClassesFile = path.join(this.projectRoot, 'used-classes.json');
    this.sourceCSS = path.join(this.projectRoot, 'static', 'css', 'styles.css');
    this.outputCSS = path.join(this.projectRoot, 'static', 'css', 'styles.min.css');
  }

  async optimize() {
    console.log('🎯 Starting Manual CSS Optimization...\n');

    try {
      // Load used classes data
      const usedClassesData = this.loadUsedClasses();

      // Read source CSS
      const sourceCSS = fs.readFileSync(this.sourceCSS, 'utf8');

      // Create optimized version
      const optimizedCSS = this.createOptimizedCSS(sourceCSS, usedClassesData.classes);

      // Write optimized CSS
      fs.writeFileSync(this.outputCSS, optimizedCSS);

      // Compare sizes
      this.compareResults();

      console.log('\n✅ Manual optimization completed!');
      console.log(`   Optimized CSS saved to: ${path.relative(this.projectRoot, this.outputCSS)}`);
    } catch (error) {
      console.error('❌ Error during optimization:', error.message);
    }
  }

  loadUsedClasses() {
    try {
      const data = fs.readFileSync(this.usedClassesFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Could not load used classes data. Run 'npm run css:analyze' first.`);
    }
  }

  createOptimizedCSS(sourceCSS, usedClasses) {
    console.log('🔧 Creating optimized CSS...');

    // For now, let's just minify and clean up the existing CSS
    // In a full implementation, you would parse and filter CSS rules

    let optimizedCSS = sourceCSS;

    // Remove comments
    optimizedCSS = optimizedCSS.replace(/\/\*[\s\S]*?\*\//g, '');

    // Remove extra whitespace
    optimizedCSS = optimizedCSS.replace(/\s+/g, ' ');

    // Remove whitespace around selectors and braces
    optimizedCSS = optimizedCSS.replace(/\s*{\s*/g, '{');
    optimizedCSS = optimizedCSS.replace(/\s*}\s*/g, '}');
    optimizedCSS = optimizedCSS.replace(/;\s*/g, ';');
    optimizedCSS = optimizedCSS.replace(/,\s*/g, ',');

    // Add header comment
    const header = `/*! Optimized CSS - Generated ${new Date().toISOString()} */\n`;

    return header + optimizedCSS.trim();
  }

  compareResults() {
    const originalStats = fs.statSync(this.sourceCSS);
    const optimizedStats = fs.statSync(this.outputCSS);

    const savings = originalStats.size - optimizedStats.size;
    const percentSaved = ((savings / originalStats.size) * 100).toFixed(2);

    console.log('\n📊 Optimization Results:');
    console.log(`   Original Size: ${this.formatBytes(originalStats.size)}`);
    console.log(`   Optimized Size: ${this.formatBytes(optimizedStats.size)}`);
    console.log(`   Size Reduction: ${this.formatBytes(savings)} (${percentSaved}%)`);
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }
}

// CLI execution
if (require.main === module) {
  const optimizer = new ManualCSSOptimizer();
  optimizer.optimize().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = ManualCSSOptimizer;
