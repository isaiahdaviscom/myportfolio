#!/usr/bin/env node
/**
 * CSS Tree-Shaking Analyzer for Hugo Projects
 * Analyzes Hugo templates and content files for CSS class usage
 * Generates optimization reports and production-ready CSS
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class CSSAnalyzer {
  constructor(options = {}) {
    this.projectRoot = options.projectRoot || process.cwd();
    this.outputDir = options.outputDir || path.join(this.projectRoot, 'static', 'css');
    this.sourceCSS = options.sourceCSS || path.join(this.projectRoot, 'static', 'css', 'styles.css');
    
    // Hugo-specific file patterns
    this.scanPaths = [
      path.join(this.projectRoot, 'layouts'),
      path.join(this.projectRoot, 'themes'),
      path.join(this.projectRoot, 'content'),
      path.join(this.projectRoot, 'static')
    ];

    // CSS class extraction patterns
    this.classPatterns = [
      /class\s*=\s*["']([^"']+)["']/gi,        // class="..."
      /class\s*=\s*`([^`]+)`/gi,               // class=`...`
      /classList\.(add|remove|toggle)\(["']([^"']+)["']\)/gi, // classList methods
      /@apply\s+([^;]+);?/gi,                  // Tailwind @apply
      /hover:([a-zA-Z][\w-]*)/gi,             // Tailwind hover states
      /focus:([a-zA-Z][\w-]*)/gi,             // Tailwind focus states
      /active:([a-zA-Z][\w-]*)/gi,            // Tailwind active states
      /group-hover:([a-zA-Z][\w-]*)/gi,       // Tailwind group states
      /\b([a-z]+:[a-zA-Z][\w-]*)/gi,          // Tailwind responsive/state prefixes
      /\b(sm|md|lg|xl|2xl):([a-zA-Z][\w-]*)/gi // Tailwind responsive breakpoints
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
    console.log('🚀 Starting CSS Analysis...\n');
    
    try {
      // Step 1: Discover all relevant files
      await this.discoverFiles();
      
      // Step 2: Extract classes from all files
      await this.extractClasses();
      
      // Step 3: Analyze current CSS file
      await this.analyzeCSS();
      
      // Step 4: Generate production CSS using PostCSS
      await this.generateProductionCSS();
      
      // Step 5: Generate report
      await this.generateReport();
      
      console.log('\n✅ CSS Analysis completed successfully!');
    } catch (error) {
      console.error('❌ Error during CSS analysis:', error.message);
      process.exit(1);
    }
  }

  /**
   * Discover all files to scan
   */
  async discoverFiles() {
    console.log('📁 Discovering files to scan...');
    
    for (const scanPath of this.scanPaths) {
      if (fs.existsSync(scanPath)) {
        this.walkDirectory(scanPath);
      }
    }

    console.log(`   Found ${this.allFiles.length} files to analyze`);
  }

  /**
   * Recursively walk directory and collect relevant files
   */
  walkDirectory(dir) {
    try {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = path.join(dir, item.name);
        
        if (item.isDirectory()) {
          // Skip node_modules, .git, etc.
          if (!['node_modules', '.git', 'public', '.vscode'].includes(item.name)) {
            this.walkDirectory(fullPath);
          }
        } else if (item.isFile()) {
          const ext = path.extname(item.name);
          if (['.html', '.md', '.js'].includes(ext)) {
            const relativePath = path.relative(this.projectRoot, fullPath);
            let type = 'other';
            
            if (relativePath.includes('layouts')) type = 'templates';
            else if (relativePath.includes('content')) type = 'content';
            else if (relativePath.includes('static')) type = 'static';
            
            this.allFiles.push({ path: fullPath, type, relativePath });
          }
        }
      }
    } catch (error) {
      console.warn(`   ⚠️  Could not read directory ${dir}: ${error.message}`);
    }
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
          console.log(`   ${file.type}: ${file.relativePath} (${classes.length} classes)`);
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
          const classList = classString.split(/\s+/)
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
    return /^[a-zA-Z][\w-]*$/.test(cls) || 
           /^[a-z]+:[\w-]+$/.test(cls) || // Tailwind prefixes
           cls.includes('-') || // Allow hyphenated classes
           cls.includes(':'); // Allow pseudo-classes
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
   * Generate production CSS using PostCSS with PurgeCSS
   */
  async generateProductionCSS() {
    console.log('\n⚡ Generating production CSS...');
    
    try {
      // Set production environment and run PostCSS
      process.env.NODE_ENV = 'production';
      
      const cmd = 'npx postcss src/css/tailwind.css -o static/css/styles.min.css --env production';
      console.log('   Running PostCSS with PurgeCSS...');
      
      execSync(cmd, { stdio: 'inherit' });
      
      // Analyze optimized file
      const optimizedPath = path.join(this.outputDir, 'styles.min.css');
      if (fs.existsSync(optimizedPath)) {
        const optimizedStats = fs.statSync(optimizedPath);
        this.stats.optimizedSize = optimizedStats.size;
        console.log(`   Production CSS size: ${this.formatBytes(this.stats.optimizedSize)}`);
      }
      
    } catch (error) {
      console.error('   ❌ Error generating production CSS:', error.message);
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
    
    // Also create a used-classes.json for reference
    const usedClassesPath = path.join(this.projectRoot, 'used-classes.json');
    const classData = {
      timestamp: new Date().toISOString(),
      totalClasses: this.stats.classesFound,
      classes: Array.from(this.usedClasses).sort(),
      fileAnalysis: this.allFiles.map(f => ({
        file: f.relativePath,
        type: f.type
      }))
    };
    
    fs.writeFileSync(usedClassesPath, JSON.stringify(classData, null, 2));
    console.log(`   Used classes data saved to: used-classes.json`);
  }

  /**
   * Create detailed optimization report
   */
  createReport() {
    const savings = this.stats.originalSize - this.stats.optimizedSize;
    const percentSaved = this.stats.originalSize > 0 ? 
      ((savings / this.stats.originalSize) * 100).toFixed(2) : 0;

    return `# CSS Optimization Report

Generated: ${new Date().toISOString()}

## Summary

- **Files Scanned**: ${this.stats.filesScanned}
- **Unique Classes Found**: ${this.stats.classesFound}
- **Original CSS Size**: ${this.formatBytes(this.stats.originalSize)}
- **Production CSS Size**: ${this.formatBytes(this.stats.optimizedSize)}
- **Size Reduction**: ${this.formatBytes(savings)} (${percentSaved}%)

## Analysis Details

### Files by Type
- **Templates**: ${this.allFiles.filter(f => f.type === 'templates').length}
- **Content**: ${this.allFiles.filter(f => f.type === 'content').length}
- **Static**: ${this.allFiles.filter(f => f.type === 'static').length}
- **Other**: ${this.allFiles.filter(f => f.type === 'other').length}

### Most Common Class Patterns

${this.getClassPatternAnalysis()}

## Production Integration

### Hugo Templates
Update your Hugo templates to use the optimized CSS in production:

\`\`\`html
{{ if eq hugo.Environment "production" }}
  <link rel="stylesheet" href="{{ "css/styles.min.css" | relURL }}">
{{ else }}
  <link rel="stylesheet" href="{{ "css/styles.css" | relURL }}">
{{ end }}
\`\`\`

### Build Commands
- **Development**: \`npm run build:css\`
- **Production**: \`npm run css:optimize\`

## Recommendations

1. **Use production CSS**: Switch to \`styles.min.css\` for production builds
2. **Monitor class usage**: Re-run analysis when adding new templates
3. **CI/CD Integration**: Add optimization to your build pipeline
4. **Regular audits**: Run monthly to catch CSS bloat

## Class Usage Details

See \`used-classes.json\` for complete list of detected classes.
`;
  }

  /**
   * Analyze class patterns
   */
  getClassPatternAnalysis() {
    const classes = Array.from(this.usedClasses);
    const patterns = {
      'Tailwind Utilities': classes.filter(c => /^(text-|bg-|p-|m-|w-|h-|flex|grid|border)/.test(c)).length,
      'Responsive Classes': classes.filter(c => /^(sm:|md:|lg:|xl:|2xl:)/.test(c)).length,
      'Hover States': classes.filter(c => c.startsWith('hover:')).length,
      'Focus States': classes.filter(c => c.startsWith('focus:')).length,
      'Custom Classes': classes.filter(c => !/^(sm:|md:|lg:|xl:|2xl:|hover:|focus:|active:|group-)/.test(c) && !/^(text-|bg-|p-|m-|w-|h-|flex|grid|border)/.test(c)).length
    };

    return Object.entries(patterns)
      .map(([pattern, count]) => `- **${pattern}**: ${count}`)
      .join('\n');
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
  const analyzer = new CSSAnalyzer({
    projectRoot: process.cwd(),
    sourceCSS: process.argv[2] || path.join(process.cwd(), 'static', 'css', 'styles.css'),
    outputDir: process.argv[3] || path.join(process.cwd(), 'static', 'css')
  });

  analyzer.run().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = CSSAnalyzer;