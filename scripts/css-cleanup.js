#!/usr/bin/env node
/**
 * CSS Cleanup Tool
 * Safely removes unused CSS classes based on analysis results
 */

const fs = require('fs');
const path = require('path');

class CSSCleanup {
  constructor(options = {}) {
    this.projectRoot = options.projectRoot || process.cwd();
    this.dryRun = options.dryRun !== false; // Default to dry run
    this.backupEnabled = options.backupEnabled !== false; // Default to backup
    this.cssFiles = [
      path.join(this.projectRoot, 'static', 'css', 'styles.css'),
      path.join(this.projectRoot, 'src', 'css', 'custom.css')
    ];

    this.cleanupResults = {
      filesProcessed: 0,
      classesRemoved: 0,
      linesRemoved: 0,
      sizeSaved: 0
    };
  }

  /**
   * Main cleanup execution
   */
  async run(confidenceLevel = 'high') {
    console.log(`🧹 Starting CSS Cleanup (${confidenceLevel} confidence)...`);
    console.log(`   Mode: ${this.dryRun ? 'DRY RUN' : 'ACTUAL CLEANUP'}`);
    console.log(`   Backup: ${this.backupEnabled ? 'ENABLED' : 'DISABLED'}\n`);

    try {
      // Step 1: Load cleanup suggestions
      const suggestions = await this.loadCleanupSuggestions();

      // Step 2: Get classes to remove based on confidence level
      const classesToRemove = this.getClassesToRemove(suggestions, confidenceLevel);

      if (classesToRemove.length === 0) {
        console.log('✅ No classes to remove at this confidence level');
        return;
      }

      console.log(`📋 Found ${classesToRemove.length} classes to remove:`);
      classesToRemove.forEach(cls => console.log(`   - ${cls}`));
      console.log('');

      // Step 3: Process each CSS file
      for (const cssFile of this.cssFiles) {
        if (fs.existsSync(cssFile)) {
          await this.processCSSFile(cssFile, classesToRemove);
        }
      }

      // Step 4: Generate results
      await this.generateCleanupReport();

      console.log('\n✅ CSS cleanup completed successfully!');
    } catch (error) {
      console.error('❌ Error during CSS cleanup:', error.message);
      process.exit(1);
    }
  }

  /**
   * Load cleanup suggestions from analysis
   */
  async loadCleanupSuggestions() {
    const suggestionsPath = path.join(this.projectRoot, 'css-cleanup-suggestions.json');

    if (!fs.existsSync(suggestionsPath)) {
      throw new Error('Cleanup suggestions not found. Run "npm run css:unused" first.');
    }

    return JSON.parse(fs.readFileSync(suggestionsPath, 'utf8'));
  }

  /**
   * Get classes to remove based on confidence level
   */
  getClassesToRemove(suggestions, confidenceLevel) {
    switch (confidenceLevel) {
      case 'high':
        return suggestions.highConfidence || [];
      case 'medium':
        return [...(suggestions.highConfidence || []), ...(suggestions.mediumRisk || [])];
      case 'all':
        return [
          ...(suggestions.highConfidence || []),
          ...(suggestions.mediumRisk || []),
          ...(suggestions.preserveClasses || [])
        ];
      default:
        return suggestions.highConfidence || [];
    }
  }

  /**
   * Process individual CSS file
   */
  async processCSSFile(filePath, classesToRemove) {
    const relativePath = path.relative(this.projectRoot, filePath);
    console.log(`🔧 Processing ${relativePath}...`);

    try {
      const originalContent = fs.readFileSync(filePath, 'utf8');
      const originalSize = originalContent.length;
      const originalLines = originalContent.split('\n').length;

      // Create backup if enabled and not dry run
      if (this.backupEnabled && !this.dryRun) {
        const backupPath = `${filePath}.backup.${Date.now()}`;
        fs.writeFileSync(backupPath, originalContent);
        console.log(`   📄 Backup created: ${path.basename(backupPath)}`);
      }

      // Remove unused classes
      let cleanedContent = originalContent;
      let removedClasses = 0;

      for (const className of classesToRemove) {
        const classPatterns = [
          new RegExp(`\\.${this.escapeRegExp(className)}\\s*{[^}]*}`, 'gi'), // .class { ... }
          new RegExp(`\\.${this.escapeRegExp(className)}\\s*,`, 'gi'), // .class,
          new RegExp(`\\.${this.escapeRegExp(className)}\\s*\\.`, 'gi'), // .class.another
          new RegExp(`\\.${this.escapeRegExp(className)}:hover\\s*{[^}]*}`, 'gi'), // .class:hover { ... }
          new RegExp(`\\.${this.escapeRegExp(className)}:focus\\s*{[^}]*}`, 'gi') // .class:focus { ... }
        ];

        for (const pattern of classPatterns) {
          const matches = cleanedContent.match(pattern);
          if (matches) {
            cleanedContent = cleanedContent.replace(pattern, '');
            removedClasses += matches.length;
          }
        }
      }

      // Clean up empty lines and excess whitespace
      cleanedContent = this.cleanupWhitespace(cleanedContent);

      const newSize = cleanedContent.length;
      const newLines = cleanedContent.split('\n').length;
      const sizeSaved = originalSize - newSize;
      const linesSaved = originalLines - newLines;

      // Write cleaned content if not dry run
      if (!this.dryRun) {
        fs.writeFileSync(filePath, cleanedContent);
      }

      // Update stats
      this.cleanupResults.filesProcessed++;
      this.cleanupResults.classesRemoved += removedClasses;
      this.cleanupResults.linesRemoved += linesSaved;
      this.cleanupResults.sizeSaved += sizeSaved;

      console.log(`   ✓ Removed ${removedClasses} class definitions`);
      console.log(`   ✓ Saved ${this.formatBytes(sizeSaved)} (${linesSaved} lines)`);
    } catch (error) {
      console.error(`   ❌ Error processing ${relativePath}: ${error.message}`);
    }
  }

  /**
   * Cleanup excessive whitespace
   */
  cleanupWhitespace(content) {
    return content
      .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove multiple blank lines
      .replace(/\s*{\s*/g, ' { ') // Normalize brace spacing
      .replace(/;\s*}/g, '; }') // Normalize closing braces
      .trim(); // Remove leading/trailing whitespace
  }

  /**
   * Escape string for regex
   */
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Generate cleanup report
   */
  async generateCleanupReport() {
    const report = {
      timestamp: new Date().toISOString(),
      mode: this.dryRun ? 'dry-run' : 'actual-cleanup',
      results: this.cleanupResults,
      recommendations: this.dryRun
        ? [
            'This was a dry run - no files were modified',
            'Review the results and run with --actual to apply changes',
            'Make sure to backup your files before actual cleanup'
          ]
        : [
            'Cleanup completed successfully',
            'Test your site thoroughly to ensure no functionality was broken',
            'Backup files were created with .backup.timestamp extension'
          ]
    };

    const reportPath = path.join(
      this.projectRoot,
      `css-cleanup-${this.dryRun ? 'dryrun-' : ''}report.json`
    );
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log(`\n📋 Cleanup report saved to: ${path.basename(reportPath)}`);
    console.log(`   Files processed: ${this.cleanupResults.filesProcessed}`);
    console.log(`   Classes removed: ${this.cleanupResults.classesRemoved}`);
    console.log(`   Size saved: ${this.formatBytes(this.cleanupResults.sizeSaved)}`);
  }

  /**
   * Format bytes to human readable format
   */
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
  const args = process.argv.slice(2);

  const confidenceLevel = args.find(arg => ['high', 'medium', 'all'].includes(arg)) || 'high';
  const dryRun = !args.includes('--actual');
  const backupEnabled = !args.includes('--no-backup');

  console.log(`CSS Cleanup Tool`);
  console.log(`Confidence Level: ${confidenceLevel}`);
  console.log(`Dry Run: ${dryRun}`);
  console.log(`Backup: ${backupEnabled}\n`);

  if (dryRun) {
    console.log('🔍 Running in DRY RUN mode - no files will be modified');
    console.log('   Add --actual flag to perform actual cleanup\n');
  }

  const cleanup = new CSSCleanup({
    projectRoot: process.cwd(),
    dryRun,
    backupEnabled
  });

  cleanup.run(confidenceLevel).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = CSSCleanup;
