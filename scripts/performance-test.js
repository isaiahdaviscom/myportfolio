#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Performance Testing Script
 * Checks bundle sizes, image optimization, and build performance
 */

class PerformanceTest {
  constructor() {
    this.limits = {
      css: 100 * 1024,      // 100KB
      js: 50 * 1024,        // 50KB
      image: 1024 * 1024,   // 1MB per image
      total: 50 * 1024 * 1024 // 50MB total
    };
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0
    };
  }

  log(type, message) {
    const colors = {
      success: '\x1b[32m✅',
      error: '\x1b[31m❌',
      warning: '\x1b[33m⚠️',
      info: '\x1b[36mℹ️'
    };
    console.log(`${colors[type]} ${message}\x1b[0m`);
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  checkFileSize(filePath, limit, description) {
    if (!fs.existsSync(filePath)) {
      this.log('warning', `${description}: File not found - ${filePath}`);
      this.results.warnings++;
      return;
    }

    const stats = fs.statSync(filePath);
    const size = stats.size;
    const passed = size <= limit;

    if (passed) {
      this.log('success', `${description}: ${this.formatBytes(size)} (limit: ${this.formatBytes(limit)})`);
      this.results.passed++;
    } else {
      this.log('error', `${description}: ${this.formatBytes(size)} exceeds limit of ${this.formatBytes(limit)}`);
      this.results.failed++;
    }

    return passed;
  }

  checkDirectorySize(dirPath, limit, description) {
    if (!fs.existsSync(dirPath)) {
      this.log('warning', `${description}: Directory not found - ${dirPath}`);
      this.results.warnings++;
      return;
    }

    const totalSize = this.calculateDirectorySize(dirPath);
    const passed = totalSize <= limit;

    if (passed) {
      this.log('success', `${description}: ${this.formatBytes(totalSize)} (limit: ${this.formatBytes(limit)})`);
      this.results.passed++;
    } else {
      this.log('error', `${description}: ${this.formatBytes(totalSize)} exceeds limit of ${this.formatBytes(limit)}`);
      this.results.failed++;
    }

    return passed;
  }

  calculateDirectorySize(dirPath) {
    let totalSize = 0;

    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(dirPath, file.name);
      
      if (file.isDirectory()) {
        totalSize += this.calculateDirectorySize(fullPath);
      } else {
        const stats = fs.statSync(fullPath);
        totalSize += stats.size;
      }
    }

    return totalSize;
  }

  checkImages() {
    this.log('info', 'Checking image optimization...');
    
    const imageDirs = ['static/images', 'public/images'];
    let imageCount = 0;
    
    imageDirs.forEach(dir => {
      if (fs.existsSync(dir)) {
        this.checkImagesInDirectory(dir);
        imageCount++;
      }
    });

    if (imageCount === 0) {
      this.log('warning', 'No image directories found');
      this.results.warnings++;
    }
  }

  checkImagesInDirectory(dirPath) {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dirPath, file.name);
      
      if (file.isDirectory()) {
        this.checkImagesInDirectory(fullPath);
      } else if (this.isImageFile(file.name)) {
        this.checkFileSize(
          fullPath, 
          this.limits.image, 
          `Image: ${path.relative('.', fullPath)}`
        );
      }
    }
  }

  isImageFile(filename) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const ext = path.extname(filename).toLowerCase();
    return imageExtensions.includes(ext);
  }

  checkBundleSizes() {
    this.log('info', 'Checking bundle sizes...');
    
    // Check CSS bundle
    this.checkFileSize('static/css/styles.css', this.limits.css, 'CSS Bundle');
    
    // Check JS bundle
    this.checkFileSize('static/js/main.js', this.limits.js, 'JS Bundle');
  }

  checkTotalBuildSize() {
    this.log('info', 'Checking total build size...');
    this.checkDirectorySize('public', this.limits.total, 'Total Build Size');
  }

  checkAssetOptimization() {
    this.log('info', 'Checking asset optimization...');
    
    // Check for unminified files in production
    const publicDir = 'public';
    if (fs.existsSync(publicDir)) {
      this.findUnoptimizedAssets(publicDir);
    }
  }

  findUnoptimizedAssets(dirPath) {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dirPath, file.name);
      
      if (file.isDirectory()) {
        this.findUnoptimizedAssets(fullPath);
      } else {
        // Check for unminified JS/CSS files
        if ((file.name.endsWith('.js') || file.name.endsWith('.css')) && 
            !file.name.includes('.min.')) {
          
          const stats = fs.statSync(fullPath);
          if (stats.size > 10 * 1024) { // Files larger than 10KB should be minified
            this.log('warning', `Large unminified asset: ${path.relative('.', fullPath)} (${this.formatBytes(stats.size)})`);
            this.results.warnings++;
          }
        }
      }
    }
  }

  async run() {
    console.log('\n🔍 Running Performance Tests...\n');

    this.checkBundleSizes();
    this.checkImages();
    this.checkTotalBuildSize();
    this.checkAssetOptimization();

    console.log('\n📊 Performance Test Results:');
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`⚠️  Warnings: ${this.results.warnings}`);

    if (this.results.failed > 0) {
      console.log('\n💡 Recommendations:');
      console.log('• Optimize large images with tools like ImageOptim or TinyPNG');
      console.log('• Consider code splitting for large bundles');
      console.log('• Remove unused CSS/JS code');
      console.log('• Enable gzip compression on your server');
      
      process.exit(1);
    } else if (this.results.warnings > 0) {
      console.log('\n✅ All critical checks passed, but consider addressing warnings');
      process.exit(0);
    } else {
      console.log('\n🎉 All performance tests passed!');
      process.exit(0);
    }
  }
}

// Run the tests
const perfTest = new PerformanceTest();
perfTest.run().catch(error => {
  console.error('❌ Performance test failed:', error);
  process.exit(1);
});