#!/usr/bin/env node
/**
 * Unused CSS Classes Detector for Hugo Projects
 * Compares defined CSS classes against actual usage in templates
 * Generates report of unused classes that can be safely removed
 */

const fs = require('fs');
const path = require('path');

class UnusedCSSDetector {
  constructor(options = {}) {
    this.projectRoot = options.projectRoot || process.cwd();
    this.cssFiles = options.cssFiles || [
      path.join(this.projectRoot, 'static', 'css', 'styles.css'),
      path.join(this.projectRoot, 'src', 'css', 'custom.css'),
      path.join(this.projectRoot, 'src', 'css', '**', '*.css')
    ];

    // Template scanning paths
    this.scanPaths = [
      path.join(this.projectRoot, 'layouts'),
      path.join(this.projectRoot, 'themes'),
      path.join(this.projectRoot, 'content'),
      path.join(this.projectRoot, 'static')
    ];

    // CSS class patterns for extraction from CSS files
    this.cssClassPatterns = [
      /\.([a-zA-Z][\w-]*)\s*{/g, // .class-name {
      /\.([a-zA-Z][\w-]*)\s*,/g, // .class-name,
      /\.([a-zA-Z][\w-]*)\s*\./g, // .class-name.another
      /\.([a-zA-Z][\w-]*):hover/g, // .class-name:hover
      /\.([a-zA-Z][\w-]*):focus/g, // .class-name:focus
      /\.([a-zA-Z][\w-]*):active/g, // .class-name:active
      /\.([a-zA-Z][\w-]*)::before/g, // .class-name::before
      /\.([a-zA-Z][\w-]*)::after/g // .class-name::after
    ];

    // HTML class patterns for extraction from templates
    this.htmlClassPatterns = [
      /class\s*=\s*["']([^"']+)["']/gi, // class="..."
      /class\s*=\s*`([^`]+)`/gi, // class=`...`
      /classList\.(add|remove|toggle)\(["']([^"']+)["']\)/gi // classList methods
    ];

    this.definedClasses = new Set();
    this.usedClasses = new Set();
    this.unusedClasses = new Set();
    this.cssFileAnalysis = [];
    this.stats = {
      cssFilesScanned: 0,
      templateFilesScanned: 0,
      classesDefinedInCSS: 0,
      classesUsedInTemplates: 0,
      unusedClasses: 0
    };
  }

  /**
   * Main execution method
   */
  async run() {
    console.log('🔍 Starting Unused CSS Classes Detection...\n');

    try {
      // Step 1: Extract classes defined in CSS files
      await this.extractDefinedClasses();

      // Step 2: Extract classes used in templates
      await this.extractUsedClasses();

      // Step 3: Compare and find unused classes
      await this.findUnusedClasses();

      // Step 4: Generate reports
      await this.generateReports();

      console.log('\n✅ Unused CSS analysis completed successfully!');
    } catch (error) {
      console.error('❌ Error during unused CSS analysis:', error.message);
      process.exit(1);
    }
  }

  /**
   * Extract all classes defined in CSS files
   */
  async extractDefinedClasses() {
    console.log('📄 Scanning CSS files for defined classes...');

    // Scan main CSS files
    for (const cssFile of this.cssFiles) {
      if (fs.existsSync(cssFile)) {
        await this.scanCSSFile(cssFile);
      }
    }

    // Scan src/css directory recursively
    const srcCssDir = path.join(this.projectRoot, 'src', 'css');
    if (fs.existsSync(srcCssDir)) {
      await this.walkCSSDirectory(srcCssDir);
    }

    this.stats.classesDefinedInCSS = this.definedClasses.size;
    console.log(
      `   Found ${this.stats.classesDefinedInCSS} classes defined in ${this.stats.cssFilesScanned} CSS files`
    );
  }

  /**
   * Recursively scan CSS directory
   */
  async walkCSSDirectory(dir) {
    try {
      const items = fs.readdirSync(dir, { withFileTypes: true });

      for (const item of items) {
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {
          await this.walkCSSDirectory(fullPath);
        } else if (item.isFile() && path.extname(item.name) === '.css') {
          await this.scanCSSFile(fullPath);
        }
      }
    } catch (error) {
      console.warn(`   ⚠️  Could not read CSS directory ${dir}: ${error.message}`);
    }
  }

  /**
   * Scan individual CSS file for class definitions
   */
  async scanCSSFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const classes = this.extractClassesFromCSS(content);
      const relativePath = path.relative(this.projectRoot, filePath);

      classes.forEach(cls => this.definedClasses.add(cls));

      this.cssFileAnalysis.push({
        file: relativePath,
        classes: classes.length,
        classList: classes
      });

      this.stats.cssFilesScanned++;
      console.log(`   ${relativePath}: ${classes.length} classes`);
    } catch (error) {
      console.warn(`   ⚠️  Could not read CSS file ${filePath}: ${error.message}`);
    }
  }

  /**
   * Extract class names from CSS content
   */
  extractClassesFromCSS(content) {
    const classes = new Set();

    for (const pattern of this.cssClassPatterns) {
      let match;
      const regex = new RegExp(pattern.source, pattern.flags);

      while ((match = regex.exec(content)) !== null) {
        const className = match[1];
        if (className && this.isValidCSSClass(className)) {
          classes.add(className);
        }
      }
    }

    return Array.from(classes);
  }

  /**
   * Extract classes used in templates (reuse from css-analyzer)
   */
  async extractUsedClasses() {
    console.log('\n🔍 Scanning templates for used classes...');

    for (const scanPath of this.scanPaths) {
      if (fs.existsSync(scanPath)) {
        await this.walkTemplateDirectory(scanPath);
      }
    }

    this.stats.classesUsedInTemplates = this.usedClasses.size;
    console.log(
      `   Found ${this.stats.classesUsedInTemplates} classes used in ${this.stats.templateFilesScanned} template files`
    );
  }

  /**
   * Recursively walk template directory
   */
  async walkTemplateDirectory(dir) {
    try {
      const items = fs.readdirSync(dir, { withFileTypes: true });

      for (const item of items) {
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {
          // Skip node_modules, .git, etc.
          if (!['node_modules', '.git', 'public', '.vscode'].includes(item.name)) {
            await this.walkTemplateDirectory(fullPath);
          }
        } else if (item.isFile()) {
          const ext = path.extname(item.name);
          if (['.html', '.md', '.js'].includes(ext)) {
            await this.scanTemplateFile(fullPath);
          }
        }
      }
    } catch (error) {
      console.warn(`   ⚠️  Could not read template directory ${dir}: ${error.message}`);
    }
  }

  /**
   * Scan individual template file for class usage
   */
  async scanTemplateFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const classes = this.extractClassesFromHTML(content);

      classes.forEach(cls => this.usedClasses.add(cls));
      this.stats.templateFilesScanned++;
    } catch (error) {
      console.warn(`   ⚠️  Could not read template file ${filePath}: ${error.message}`);
    }
  }

  /**
   * Extract class names from HTML content
   */
  extractClassesFromHTML(content) {
    const classes = new Set();

    for (const pattern of this.htmlClassPatterns) {
      let match;
      const regex = new RegExp(pattern.source, pattern.flags);

      while ((match = regex.exec(content)) !== null) {
        const classString = match[1] || match[2] || match[0];

        if (classString) {
          const classList = classString
            .split(/\s+/)
            .map(cls => cls.trim())
            .filter(cls => cls.length > 0 && this.isValidCSSClass(cls));

          classList.forEach(cls => classes.add(cls));
        }
      }
    }

    return Array.from(classes);
  }

  /**
   * Compare defined vs used classes to find unused ones
   */
  async findUnusedClasses() {
    console.log('\n🧹 Identifying unused classes...');

    for (const definedClass of this.definedClasses) {
      if (!this.usedClasses.has(definedClass)) {
        // Additional checks for commonly preserved classes
        if (!this.shouldPreserveClass(definedClass)) {
          this.unusedClasses.add(definedClass);
        }
      }
    }

    this.stats.unusedClasses = this.unusedClasses.size;
    console.log(`   Found ${this.stats.unusedClasses} unused classes`);
  }

  /**
   * Check if a class should be preserved (safelist logic)
   */
  shouldPreserveClass(className) {
    const preservePatterns = [
      /^theme-/, // Theme classes
      /^dark/, // Dark mode
      /^light/, // Light mode
      /^hljs-/, // Code highlighting
      /^chroma/, // Hugo syntax highlighting
      /^highlight/, // Hugo highlighting
      /^language-/, // Language tags
      /^token/, // Prism.js tokens
      /^sr-only$/, // Screen reader only
      /^not-sr-only$/, // Not screen reader only
      /^animate-/, // Animations (might be added dynamically)
      /^transition-/ // Transitions
    ];

    return preservePatterns.some(pattern => pattern.test(className));
  }

  /**
   * Validate CSS class name
   */
  isValidCSSClass(cls) {
    // Basic validation for CSS class names
    return (
      /^[a-zA-Z][\w-]*$/.test(cls) ||
      /^[a-z]+:[\w-]+$/.test(cls) || // Tailwind prefixes
      cls.includes('-') || // Allow hyphenated classes
      cls.includes(':')
    ); // Allow pseudo-classes
  }

  /**
   * Generate comprehensive reports
   */
  async generateReports() {
    console.log('\n📋 Generating reports...');

    // Generate unused classes JSON
    await this.generateUnusedClassesJSON();

    // Generate detailed markdown report
    await this.generateUnusedClassesReport();

    // Generate CSS cleanup suggestions
    await this.generateCleanupSuggestions();
  }

  /**
   * Generate unused classes JSON file
   */
  async generateUnusedClassesJSON() {
    const unusedData = {
      timestamp: new Date().toISOString(),
      summary: {
        cssFilesScanned: this.stats.cssFilesScanned,
        templateFilesScanned: this.stats.templateFilesScanned,
        classesDefinedInCSS: this.stats.classesDefinedInCSS,
        classesUsedInTemplates: this.stats.classesUsedInTemplates,
        unusedClasses: this.stats.unusedClasses,
        unusedPercentage: (
          (this.stats.unusedClasses / this.stats.classesDefinedInCSS) *
          100
        ).toFixed(2)
      },
      unusedClasses: Array.from(this.unusedClasses).sort(),
      cssFileAnalysis: this.cssFileAnalysis,
      recommendations: [
        'Review unused classes before removing - some may be used dynamically',
        'Test thoroughly after removing any classes',
        'Consider keeping utility classes that might be used in future development',
        'Check for classes used in JavaScript that might not be detected'
      ]
    };

    const outputPath = path.join(this.projectRoot, 'unused-classes.json');
    fs.writeFileSync(outputPath, JSON.stringify(unusedData, null, 2));
    console.log(`   Unused classes JSON saved to: unused-classes.json`);
  }

  /**
   * Generate detailed markdown report
   */
  async generateUnusedClassesReport() {
    const report = this.createUnusedClassesReport();
    const reportPath = path.join(this.projectRoot, 'unused-css-report.md');

    fs.writeFileSync(reportPath, report);
    console.log(`   Unused CSS report saved to: unused-css-report.md`);
  }

  /**
   * Create detailed unused classes report
   */
  createUnusedClassesReport() {
    const unusedPercentage = (
      (this.stats.unusedClasses / this.stats.classesDefinedInCSS) *
      100
    ).toFixed(2);
    const unusedArray = Array.from(this.unusedClasses).sort();

    return `# Unused CSS Classes Report

Generated: ${new Date().toISOString()}

## Summary

- **CSS Files Scanned**: ${this.stats.cssFilesScanned}
- **Template Files Scanned**: ${this.stats.templateFilesScanned}
- **Classes Defined in CSS**: ${this.stats.classesDefinedInCSS}
- **Classes Used in Templates**: ${this.stats.classesUsedInTemplates}
- **Unused Classes**: ${this.stats.unusedClasses} (${unusedPercentage}%)

## CSS File Analysis

${this.cssFileAnalysis
  .map(
    file =>
      `### ${file.file}
- **Classes Defined**: ${file.classes}
- **Sample Classes**: ${file.classList
        .slice(0, 10)
        .map(cls => `\`${cls}\``)
        .join(', ')}${file.classList.length > 10 ? '...' : ''}`
  )
  .join('\n\n')}

## Unused Classes by Category

### Custom Classes
${unusedArray
  .filter(
    cls =>
      !/^(sm:|md:|lg:|xl:|2xl:|hover:|focus:|active:|group-)/.test(cls) &&
      !/^(text-|bg-|p-|m-|w-|h-|flex|grid|border)/.test(cls)
  )
  .slice(0, 20)
  .map(cls => `- \`${cls}\``)
  .join('\n')}

### Utility Classes
${unusedArray
  .filter(cls => /^(text-|bg-|p-|m-|w-|h-|flex|grid|border)/.test(cls))
  .slice(0, 20)
  .map(cls => `- \`${cls}\``)
  .join('\n')}

### Responsive Classes
${unusedArray
  .filter(cls => /^(sm:|md:|lg:|xl:|2xl:)/.test(cls))
  .slice(0, 10)
  .map(cls => `- \`${cls}\``)
  .join('\n')}

### State Classes
${unusedArray
  .filter(cls => /^(hover:|focus:|active:|group-)/.test(cls))
  .slice(0, 10)
  .map(cls => `- \`${cls}\``)
  .join('\n')}

## Cleanup Recommendations

### ⚠️  Before Removing Classes

1. **Manual Review Required**: Some classes might be used dynamically via JavaScript
2. **Test Thoroughly**: Remove classes in small batches and test each change
3. **Check Documentation**: Some classes might be documented for future use
4. **Consider Component Libraries**: Some classes might be part of imported libraries

### 🧹 Safe to Remove (High Confidence)

Classes that appear to be truly unused and safe to remove:

${unusedArray
  .filter(
    cls =>
      !cls.includes('hover') &&
      !cls.includes('focus') &&
      !cls.includes('active') &&
      !cls.includes('sm:') &&
      !cls.includes('md:') &&
      !cls.includes('lg:')
  )
  .slice(0, 15)
  .map(cls => `- \`${cls}\``)
  .join('\n')}

### 🤔 Review Carefully (Medium Risk)

Classes that might be used dynamically or for specific states:

${unusedArray
  .filter(
    cls =>
      cls.includes('hover') ||
      cls.includes('focus') ||
      cls.includes('active') ||
      cls.includes('sm:') ||
      cls.includes('md:') ||
      cls.includes('lg:')
  )
  .slice(0, 10)
  .map(cls => `- \`${cls}\``)
  .join('\n')}

## Cleanup Process

1. **Backup First**: Commit current state to git before making changes
2. **Remove in Batches**: Remove 10-20 classes at a time
3. **Test Each Batch**: Verify site functionality after each removal
4. **Monitor**: Watch for any visual or functional issues
5. **Rollback if Needed**: Use git to revert problematic changes

## Automation Opportunities

Consider creating a CSS cleanup task that:
- Removes classes with high confidence scores
- Preserves classes matching safelist patterns  
- Generates before/after comparison reports
- Integrates with your build pipeline

See \`unused-classes.json\` for the complete list and detailed analysis data.
`;
  }

  /**
   * Generate CSS cleanup suggestions
   */
  async generateCleanupSuggestions() {
    const suggestions = {
      highConfidence: Array.from(this.unusedClasses).filter(
        cls =>
          !cls.includes('hover') &&
          !cls.includes('focus') &&
          !cls.includes('active') &&
          !cls.includes('sm:') &&
          !cls.includes('md:') &&
          !cls.includes('lg:') &&
          !cls.includes('xl:') &&
          !this.shouldPreserveClass(cls)
      ),
      mediumRisk: Array.from(this.unusedClasses).filter(
        cls =>
          cls.includes('hover') ||
          cls.includes('focus') ||
          cls.includes('active') ||
          cls.includes('sm:') ||
          cls.includes('md:') ||
          cls.includes('lg:') ||
          cls.includes('xl:')
      ),
      preserveClasses: Array.from(this.unusedClasses).filter(cls => this.shouldPreserveClass(cls))
    };

    const cleanupPath = path.join(this.projectRoot, 'css-cleanup-suggestions.json');
    fs.writeFileSync(cleanupPath, JSON.stringify(suggestions, null, 2));
    console.log(`   Cleanup suggestions saved to: css-cleanup-suggestions.json`);
  }
}

// CLI execution
if (require.main === module) {
  const detector = new UnusedCSSDetector({
    projectRoot: process.cwd()
  });

  detector.run().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = UnusedCSSDetector;
