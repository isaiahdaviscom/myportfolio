#!/usr/bin/env node
/**
 * CSS Tree-Shaking Scanner for Hugo Projects
 * Analyzes Hugo templates and content files for CSS class usage
 * Generates optimized CSS bundles with unused classes removed
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class CSSTreeShaker {
  constructor(options = {}) {
    this.projectRoot = options.projectRoot || process.cwd();
    this.outputDir = options.outputDir || path.join(this.projectRoot, 'static', 'css');
    this.sourceCSS =
      options.sourceCSS || path.join(this.projectRoot, 'static', 'css', 'styles.css');
    this.customCSS = options.customCSS || path.join(this.projectRoot, 'src', 'css', 'custom.css');

    // Hugo-specific file patterns
    this.hugoPatterns = {
      templates: ['layouts/**/*.html', 'themes/**/layouts/**/*.html'],
      content: ['content/**/*.md', 'content/**/*.html'],
      partials: ['layouts/partials/**/*.html', 'themes/**/layouts/partials/**/*.html'],
      shortcodes: ['layouts/shortcodes/**/*.html', 'themes/**/layouts/shortcodes/**/*.html'],
      static: ['static/**/*.html', 'themes/**/static/**/*.html']
    };

    // CSS class extraction patterns
    this.classPatterns = [
      /class\s*=\s*["']([^"']+)["']/gi, // class="..."
      /class\s*=\s*`([^`]+)`/gi, // class=`...`
      /classList\.(add|remove|toggle)\(["']([^"']+)["']\)/gi, // classList methods
      /@apply\s+([^;]+);?/gi, // Tailwind @apply
      /\.([a-zA-Z][\w-]*)\s*{/gi, // CSS selectors
      /hover:([a-zA-Z][\w-]*)/gi, // Tailwind hover states
      /focus:([a-zA-Z][\w-]*)/gi, // Tailwind focus states
      /active:([a-zA-Z][\w-]*)/gi, // Tailwind active states
      /group-hover:([a-zA-Z][\w-]*)/gi, // Tailwind group states
      /\b([a-z]+:[a-zA-Z][\w-]*)/gi, // Tailwind responsive/state prefixes
      /\b(sm|md|lg|xl|2xl):([a-zA-Z][\w-]*)/gi // Tailwind responsive breakpoints
    ];

    // Safelist - classes to always preserve
    this.safelist = [
      // Hugo-specific classes
      'hugo-*',
      'highlight',
      'chroma',
      'highlight-*',
      // Dark mode classes
      'dark',
      'light',
      'theme-*',
      // Animation classes that might be added dynamically
      'animate-*',
      'transition-*',
      // Common utility patterns
      'sr-only',
      'not-sr-only',
      // Common interactive states
      'hover\\:*',
      'focus\\:*',
      'active\\:*',
      'group-hover\\:*',
      'group-focus\\:*'
    ];

    this.usedClasses = new Set();
    this.allFiles = [];
    this.stats = {
      filesScanned: 0,
      classesFound: 0,
      originalSize: 0,
      optimizedSize: 0
    };
  }

  /**
   * Main execution method
   */
  async run() {
    console.log('🚀 Starting CSS Tree-Shaking Analysis...\n');

    try {
      // Step 1: Discover all relevant files
      await this.discoverFiles();

      // Step 2: Extract classes from all files
      await this.extractClasses();

      // Step 3: Analyze current CSS file
      await this.analyzeCSS();

      // Step 4: Generate optimized CSS
      await this.generateOptimizedCSS();

      // Step 5: Generate report
      await this.generateReport();

      console.log('\n✅ CSS Tree-Shaking completed successfully!');
    } catch (error) {
      console.error('❌ Error during CSS optimization:', error.message);
      process.exit(1);
    }
  }

  /**
   * Discover all files to scan
   */
  async discoverFiles() {
    console.log('📁 Discovering files to scan...');

    for (const [type, patterns] of Object.entries(this.hugoPatterns)) {
      for (const pattern of patterns) {
        const files = this.glob(pattern);
        this.allFiles.push(...files.map(f => ({ path: f, type })));
      }
    }

    console.log(`   Found ${this.allFiles.length} files to analyze`);
  }

  /**
   * Extract CSS classes from all discovered files
   */
  async extractClasses() {
    console.log('\n🔍 Extracting CSS classes...');

    for (const file of this.allFiles) {
      try {
        const content = fs.readFileSync(file.path, 'utf8');
        const classes = this.extractClassesFromContent(content);

        classes.forEach(cls => this.usedClasses.add(cls));
        this.stats.filesScanned++;

        if (classes.length > 0) {
          console.log(
            `   ${file.type}: ${path.relative(this.projectRoot, file.path)} (${classes.length} classes)`
          );
        }
      } catch (error) {
        console.warn(`   ⚠️  Could not read ${file.path}: ${error.message}`);
      }
    }

    this.stats.classesFound = this.usedClasses.size;
    console.log(`\n   Total unique classes found: ${this.stats.classesFound}`);
  }

  /**
   * Extract classes from file content
   */
  extractClassesFromContent(content) {
    const classes = new Set();

    for (const pattern of this.classPatterns) {
      let match;
      const regex = new RegExp(pattern.source, pattern.flags);

      while ((match = regex.exec(content)) !== null) {
        // Handle different capture groups
        const classString = match[1] || match[2] || match[0];

        if (classString) {
          // Split multiple classes and clean them
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
   * Validate if a string is a valid CSS class
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
   * Analyze current CSS file size and content
   */
  async analyzeCSS() {
    console.log('\n📊 Analyzing current CSS...');

    try {
      const cssStats = fs.statSync(this.sourceCSS);
      this.stats.originalSize = cssStats.size;
      console.log(`   Original CSS size: ${this.formatBytes(this.stats.originalSize)}`);
    } catch (error) {
      console.warn(`   ⚠️  Could not analyze ${this.sourceCSS}: ${error.message}`);
      this.stats.originalSize = 0;
    }
  }

  /**
   * Generate optimized CSS using PurgeCSS
   */
  async generateOptimizedCSS() {
    console.log('\n⚡ Generating optimized CSS...');

    // Create PurgeCSS configuration
    const purgeConfig = this.createPurgeCSSConfig();
    const configPath = path.join(this.projectRoot, 'purgecss.config.js');

    fs.writeFileSync(configPath, this.generatePurgeCSSConfig(purgeConfig));

    try {
      // Install PurgeCSS if not present
      this.ensurePurgeCSSInstalled();

      // Run PurgeCSS
      const outputPath = path.join(this.outputDir, 'styles.optimized.css');

      // Use proper Windows path format for PurgeCSS
      const configPathForCmd = configPath.replace(/\\/g, '/');
      const outputPathForCmd = outputPath.replace(/\\/g, '/');
      const cmd = `npx purgecss --config "${configPathForCmd}" --output "${outputPathForCmd}"`;

      console.log('   Running PurgeCSS...');
      execSync(cmd, { stdio: 'pipe' });

      // Analyze optimized file
      if (fs.existsSync(outputPath)) {
        const optimizedStats = fs.statSync(outputPath);
        this.stats.optimizedSize = optimizedStats.size;
        console.log(`   Optimized CSS size: ${this.formatBytes(this.stats.optimizedSize)}`);

        // Create production version
        fs.copyFileSync(outputPath, path.join(this.outputDir, 'styles.min.css'));
        console.log('   Created production CSS: styles.min.css');
      }

      // Cleanup
      fs.unlinkSync(configPath);
    } catch (error) {
      console.error('   ❌ Error generating optimized CSS:', error.message);
    }
  }

  /**
   * Create PurgeCSS configuration
   */
  createPurgeCSSConfig() {
    return {
      content: [
        'layouts/**/*.html',
        'themes/**/layouts/**/*.html',
        'content/**/*.md',
        'static/**/*.html',
        'static/**/*.js'
      ],
      css: [this.sourceCSS],
      safelist: {
        standard: this.safelist,
        deep: [
          /^hljs-/, // Code highlighting
          /^chroma/, // Hugo syntax highlighting
          /^highlight/, // Hugo highlighting
          /^language-/, // Language tags
          /^token/, // Prism.js tokens
          /^theme-/, // Theme classes
          /^dark/, // Dark mode
          /^light/ // Light mode
        ],
        greedy: [
          /^hover:/, // Tailwind hover states
          /^focus:/, // Tailwind focus states
          /^group-/, // Tailwind group states
          /^sm:/,
          /^md:/,
          /^lg:/,
          /^xl:/,
          /^2xl:/ // Responsive
        ]
      },
      keyframes: true,
      fontFace: true,
      variables: true
    };
  }

  /**
   * Generate PurgeCSS configuration file content
   */
  generatePurgeCSSConfig(config) {
    return `module.exports = ${JSON.stringify(config, null, 2)};`;
  }

  /**
   * Ensure PurgeCSS is installed
   */
  ensurePurgeCSSInstalled() {
    try {
      execSync('npm list purgecss', { stdio: 'pipe' });
    } catch (error) {
      console.log('   Installing PurgeCSS...');
      execSync('npm install --save-dev purgecss', { stdio: 'inherit' });
    }
  }

  /**
   * Generate optimization report
   */
  async generateReport() {
    const report = this.createReport();
    const reportPath = path.join(this.projectRoot, 'css-optimization-report.md');

    fs.writeFileSync(reportPath, report);
    console.log(`\n📋 Optimization report saved to: css-optimization-report.md`);
  }

  /**
   * Create detailed optimization report
   */
  createReport() {
    const savings = this.stats.originalSize - this.stats.optimizedSize;
    const percentSaved =
      this.stats.originalSize > 0 ? ((savings / this.stats.originalSize) * 100).toFixed(2) : 0;

    return `# CSS Optimization Report

Generated: ${new Date().toISOString()}

## Summary

- **Files Scanned**: ${this.stats.filesScanned}
- **Unique Classes Found**: ${this.stats.classesFound}
- **Original CSS Size**: ${this.formatBytes(this.stats.originalSize)}
- **Optimized CSS Size**: ${this.formatBytes(this.stats.optimizedSize)}
- **Size Reduction**: ${this.formatBytes(savings)} (${percentSaved}%)

## Files Analyzed

### Templates
${this.allFiles
  .filter(f => f.type === 'templates')
  .map(f => `- ${path.relative(this.projectRoot, f.path)}`)
  .join('\n')}

### Content
${this.allFiles
  .filter(f => f.type === 'content')
  .map(f => `- ${path.relative(this.projectRoot, f.path)}`)
  .join('\n')}

## Most Common Classes

${Array.from(this.usedClasses)
  .sort()
  .slice(0, 50)
  .map(cls => `- \`${cls}\``)
  .join('\n')}

## Optimization Recommendations

1. **Use optimized CSS**: Replace \`styles.css\` with \`styles.min.css\` in production
2. **Monitor new classes**: Re-run optimization when adding new templates
3. **Review safelist**: Ensure critical classes are preserved
4. **Test thoroughly**: Verify all functionality works with optimized CSS

## Next Steps

1. Update Hugo templates to use \`styles.min.css\` in production builds
2. Add optimization to CI/CD pipeline
3. Set up automated monitoring for CSS bloat
`;
  }

  /**
   * Simple glob implementation
   */
  glob(pattern) {
    const files = [];

    const walk = dir => {
      try {
        const items = fs.readdirSync(dir, { withFileTypes: true });

        for (const item of items) {
          const fullPath = path.join(dir, item.name);

          if (item.isDirectory()) {
            walk(fullPath);
          } else if (item.isFile() && this.matchesPattern(fullPath, pattern)) {
            files.push(fullPath);
          }
        }
      } catch (error) {
        // Directory doesn't exist or can't be read
      }
    };

    // Start from project root and match pattern
    const basePath = this.getBasePath(pattern);
    walk(path.join(this.projectRoot, basePath));

    return files;
  }

  /**
   * Check if file matches pattern
   */
  matchesPattern(filePath, pattern) {
    const relativePath = path.relative(this.projectRoot, filePath);
    const normalizedPattern = pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*');
    const regex = new RegExp(`^${normalizedPattern}$`);
    return regex.test(relativePath.replace(/\\/g, '/'));
  }

  /**
   * Get base path from glob pattern
   */
  getBasePath(pattern) {
    const parts = pattern.split('/');
    const baseParts = [];

    for (const part of parts) {
      if (part.includes('*')) break;
      baseParts.push(part);
    }

    return baseParts.join('/') || '.';
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
  const treeshaker = new CSSTreeShaker({
    projectRoot: process.cwd(),
    sourceCSS: process.argv[2] || path.join(process.cwd(), 'static', 'css', 'styles.css'),
    outputDir: process.argv[3] || path.join(process.cwd(), 'static', 'css')
  });

  treeshaker.run().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = CSSTreeShaker;
