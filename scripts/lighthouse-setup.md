# Lighthouse CI Integration Setup

## 1. Installation & Configuration

### Install Lighthouse CI
```bash
npm install --save-dev @lhci/cli
```

### Lighthouse CI Configuration (.lighthouserc.js)
```javascript
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:1313/',
        'http://localhost:1313/about/',
        'http://localhost:1313/portfolio/',
        'http://localhost:1313/contact/',
        'http://localhost:1313/portfolio/empire/',
        'http://localhost:1313/portfolio/iga/'
      ],
      startServerCommand: 'cd public && python -m http.server 1313',
      startServerReadyPattern: 'Serving HTTP',
      numberOfRuns: 3, // Run 3 times and take median scores
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage --headless',
        preset: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1
        }
      }
    },
    assert: {
      // Performance budgets
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:pwa': ['warn', { minScore: 0.8 }],
        
        // Core Web Vitals
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'first-meaningful-paint': ['warn', { maxNumericValue: 2000 }],
        'speed-index': ['warn', { maxNumericValue: 3500 }],
        'interactive': ['error', { maxNumericValue: 3500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        
        // Resource optimization
        'unused-css-rules': ['warn', { maxNumericValue: 20000 }],
        'unused-javascript': ['warn', { maxNumericValue: 20000 }],
        'modern-image-formats': ['warn', { minScore: 0.8 }],
        'offscreen-images': ['warn', { maxNumericValue: 100000 }],
        'render-blocking-resources': ['warn', { maxNumericValue: 500 }],
        
        // Best practices
        'uses-https': ['error', { minScore: 1 }],
        'uses-http2': ['warn', { minScore: 0.5 }],
        'uses-responsive-images': ['warn', { minScore: 0.8 }],
        'efficient-animated-content': ['warn', { maxNumericValue: 500000 }],
        
        // SEO requirements
        'meta-description': ['error', { minScore: 1 }],
        'document-title': ['error', { minScore: 1 }],
        'crawlable-anchors': ['error', { minScore: 1 }],
        'robots-txt': ['warn', { minScore: 1 }],
        'structured-data': ['warn', { minScore: 0.8 }],
        
        // Accessibility requirements
        'color-contrast': ['error', { minScore: 1 }],
        'image-alt': ['error', { minScore: 1 }],
        'label': ['error', { minScore: 1 }],
        'link-name': ['error', { minScore: 1 }],
        'heading-order': ['warn', { minScore: 1 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    },
    server: {
      port: 9001,
      storage: {
        storageMethod: 'sql',
        sqlDialect: 'sqlite3',
        sqlConnectionSsl: false,
        sqlConnectionUrl: 'sqlite:lighthouse-ci.db'
      }
    }
  }
};
```

### Mobile Configuration (.lighthouserc.mobile.js)
```javascript
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:1313/',
        'http://localhost:1313/about/',
        'http://localhost:1313/portfolio/',
        'http://localhost:1313/contact/'
      ],
      startServerCommand: 'cd public && python -m http.server 1313',
      startServerReadyPattern: 'Serving HTTP',
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage --headless',
        preset: 'mobile',
        formFactor: 'mobile',
        throttling: {
          rttMs: 150,
          throughputKbps: 1600,
          cpuSlowdownMultiplier: 4
        },
        screenEmulation: {
          mobile: true,
          width: 375,
          height: 667,
          deviceScaleFactor: 2,
          disabled: false
        }
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.85 }], // Slightly lower for mobile
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 4000 }], // Mobile allowance
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'interactive': ['error', { maxNumericValue: 5000 }] // Mobile allowance
      }
    }
  }
};
```

## 2. GitHub Actions Integration (.github/workflows/lighthouse.yml)
```yaml
name: Lighthouse CI Performance Audit
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lighthouse-desktop:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.132.2'
          extended: true

      - name: Build site
        run: |
          npm run build:css
          hugo --minify

      - name: Run Lighthouse CI (Desktop)
        run: |
          npx lhci autorun --config=.lighthouserc.js
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}

      - name: Upload Lighthouse results
        uses: actions/upload-artifact@v3
        with:
          name: lighthouse-desktop-results
          path: .lighthouseci/
          retention-days: 30

  lighthouse-mobile:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Setup Hugo
        uses: actions/setup-hugo@v2
        with:
          hugo-version: '0.132.2'
          extended: true

      - name: Build site
        run: |
          npm run build:css
          hugo --minify

      - name: Run Lighthouse CI (Mobile)
        run: |
          npx lhci autorun --config=.lighthouserc.mobile.js
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}

      - name: Upload Lighthouse results
        uses: actions/upload-artifact@v3
        with:
          name: lighthouse-mobile-results
          path: .lighthouseci/
          retention-days: 30

  lighthouse-comment:
    runs-on: ubuntu-latest
    needs: [lighthouse-desktop, lighthouse-mobile]
    if: github.event_name == 'pull_request'
    steps:
      - name: Download desktop results
        uses: actions/download-artifact@v3
        with:
          name: lighthouse-desktop-results
          path: ./desktop-results

      - name: Download mobile results
        uses: actions/download-artifact@v3
        with:
          name: lighthouse-mobile-results
          path: ./mobile-results

      - name: Comment PR with Lighthouse results
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            
            // Function to read Lighthouse results
            function readLighthouseResults(path) {
              try {
                const manifestPath = `${path}/manifest.json`;
                if (fs.existsSync(manifestPath)) {
                  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
                  const latestRun = manifest[manifest.length - 1];
                  const summaryPath = `${path}/${latestRun.summary}`;
                  return JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
                }
              } catch (error) {
                console.error('Error reading results:', error);
              }
              return null;
            }
            
            const desktopResults = readLighthouseResults('./desktop-results');
            const mobileResults = readLighthouseResults('./mobile-results');
            
            let comment = `## 🔍 Lighthouse Performance Report
            
            ### Desktop Results
            `;
            
            if (desktopResults) {
              comment += `
              | Metric | Score | Status |
              |--------|-------|--------|
              | Performance | ${Math.round(desktopResults.performance * 100)} | ${desktopResults.performance >= 0.9 ? '✅' : '⚠️'} |
              | Accessibility | ${Math.round(desktopResults.accessibility * 100)} | ${desktopResults.accessibility >= 0.9 ? '✅' : '⚠️'} |
              | Best Practices | ${Math.round(desktopResults['best-practices'] * 100)} | ${desktopResults['best-practices'] >= 0.9 ? '✅' : '⚠️'} |
              | SEO | ${Math.round(desktopResults.seo * 100)} | ${desktopResults.seo >= 0.9 ? '✅' : '⚠️'} |
              `;
            } else {
              comment += '\n❌ Desktop results not available\n';
            }
            
            comment += '\n### Mobile Results\n';
            
            if (mobileResults) {
              comment += `
              | Metric | Score | Status |
              |--------|-------|--------|
              | Performance | ${Math.round(mobileResults.performance * 100)} | ${mobileResults.performance >= 0.85 ? '✅' : '⚠️'} |
              | Accessibility | ${Math.round(mobileResults.accessibility * 100)} | ${mobileResults.accessibility >= 0.9 ? '✅' : '⚠️'} |
              | Best Practices | ${Math.round(mobileResults['best-practices'] * 100)} | ${mobileResults['best-practices'] >= 0.9 ? '✅' : '⚠️'} |
              | SEO | ${Math.round(mobileResults.seo * 100)} | ${mobileResults.seo >= 0.9 ? '✅' : '⚠️'} |
              `;
            } else {
              comment += '\n❌ Mobile results not available\n';
            }
            
            comment += `
            ### Core Web Vitals
            - **LCP Goal**: < 2.5s (Desktop), < 4.0s (Mobile)
            - **CLS Goal**: < 0.1
            - **FID/TTI Goal**: < 100ms / < 3.5s
            
            [View detailed reports](https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }})
            `;
            
            // Find existing comment and update or create new
            const { data: comments } = await github.rest.issues.listComments({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
            });
            
            const lighthouseComment = comments.find(comment => 
              comment.body.includes('🔍 Lighthouse Performance Report')
            );
            
            if (lighthouseComment) {
              await github.rest.issues.updateComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                comment_id: lighthouseComment.id,
                body: comment
              });
            } else {
              await github.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: context.issue.number,
                body: comment
              });
            }
```

## 3. Package.json Scripts
```json
{
  "scripts": {
    "lighthouse": "lhci autorun",
    "lighthouse:desktop": "lhci autorun --config=.lighthouserc.js",
    "lighthouse:mobile": "lhci autorun --config=.lighthouserc.mobile.js",
    "lighthouse:serve": "cd public && python -m http.server 1313 &",
    "lighthouse:open": "lhci server --port=9001",
    "perf:audit": "npm run build:all && npm run lighthouse:desktop && npm run lighthouse:mobile"
  }
}
```

## 4. Performance Budget Configuration (budget.json)
```json
{
  "budgets": [
    {
      "path": "/*",
      "timings": [
        {
          "metric": "first-contentful-paint",
          "budget": 2000
        },
        {
          "metric": "largest-contentful-paint",
          "budget": 2500
        },
        {
          "metric": "speed-index",
          "budget": 3500
        },
        {
          "metric": "interactive",
          "budget": 3500
        }
      ],
      "resourceSizes": [
        {
          "resourceType": "script",
          "budget": 50
        },
        {
          "resourceType": "stylesheet",
          "budget": 100
        },
        {
          "resourceType": "image",
          "budget": 1000
        },
        {
          "resourceType": "document",
          "budget": 30
        },
        {
          "resourceType": "font",
          "budget": 100
        },
        {
          "resourceType": "total",
          "budget": 1500
        }
      ],
      "resourceCounts": [
        {
          "resourceType": "script",
          "budget": 10
        },
        {
          "resourceType": "stylesheet",
          "budget": 5
        },
        {
          "resourceType": "image",
          "budget": 20
        },
        {
          "resourceType": "font",
          "budget": 5
        }
      ]
    }
  ]
}
```

## 5. Custom Performance Assertions (lighthouse-custom.js)
```javascript
// Custom Lighthouse audit for portfolio-specific requirements
const Audit = require('lighthouse/lighthouse-core/audits/audit.js');

class PortfolioProjectsAudit extends Audit {
  static get meta() {
    return {
      id: 'portfolio-projects-loaded',
      title: 'Portfolio projects are properly loaded',
      failureTitle: 'Portfolio projects failed to load correctly',
      description: 'Ensures all portfolio project cards are visible and functional',
      requiredArtifacts: ['DOMSnapshot']
    };
  }

  static audit(artifacts) {
    const dom = artifacts.DOMSnapshot;
    const portfolioItems = dom.querySelectorAll('.portfolio-item');
    
    if (portfolioItems.length === 0) {
      return {
        score: 0,
        displayValue: 'No portfolio items found'
      };
    }

    const itemsWithImages = dom.querySelectorAll('.portfolio-item img');
    const itemsWithLinks = dom.querySelectorAll('.portfolio-item a[href]');
    
    const hasImages = itemsWithImages.length > 0;
    const hasLinks = itemsWithLinks.length > 0;
    const hasMinimumItems = portfolioItems.length >= 5;
    
    const score = hasImages && hasLinks && hasMinimumItems ? 1 : 0;
    
    return {
      score,
      displayValue: `Found ${portfolioItems.length} portfolio items`,
      details: {
        type: 'table',
        headings: [
          { key: 'metric', itemType: 'text', text: 'Metric' },
          { key: 'value', itemType: 'text', text: 'Value' },
          { key: 'status', itemType: 'text', text: 'Status' }
        ],
        items: [
          {
            metric: 'Total Portfolio Items',
            value: portfolioItems.length,
            status: hasMinimumItems ? '✅' : '❌'
          },
          {
            metric: 'Items with Images',
            value: itemsWithImages.length,
            status: hasImages ? '✅' : '❌'
          },
          {
            metric: 'Items with Links',
            value: itemsWithLinks.length,
            status: hasLinks ? '✅' : '❌'
          }
        ]
      }
    };
  }
}

module.exports = PortfolioProjectsAudit;
```

## 6. Running Lighthouse CI

### Local Development
```bash
# Build and run complete audit
npm run perf:audit

# Desktop only
npm run lighthouse:desktop

# Mobile only  
npm run lighthouse:mobile

# Start Lighthouse server to view results
npm run lighthouse:open
```

### Understanding Results
```bash
# View HTML report
open .lighthouseci/lhr-*.html

# View JSON data
cat .lighthouseci/lhr-*.json | jq '.categories'

# Check specific metrics
cat .lighthouseci/lhr-*.json | jq '.audits["largest-contentful-paint"].numericValue'
```

## 7. Performance Optimization Workflow

### 1. Baseline Measurement
```bash
# Establish baseline scores
npm run lighthouse:desktop
npm run lighthouse:mobile
```

### 2. Identify Issues
Common issues Lighthouse catches:
- **Unused CSS/JS**: Remove dead code
- **Large Images**: Optimize and resize
- **Render-blocking Resources**: Critical CSS inlining
- **Missing Alt Text**: Add accessibility attributes
- **Slow Server Response**: Optimize backend/CDN

### 3. Fix and Re-test
```bash
# After making changes
npm run build:all
npm run lighthouse:desktop
```

### 4. Set Stricter Budgets
```javascript
// Gradually improve thresholds
'categories:performance': ['error', { minScore: 0.95 }],
'largest-contentful-paint': ['error', { maxNumericValue: 2000 }],
```

## 8. Advanced Lighthouse Configuration

### Custom Gathering
```javascript
// lighthouse-config.js
module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyAudits: [
      'first-contentful-paint',
      'largest-contentful-paint',
      'cumulative-layout-shift',
      'total-blocking-time'
    ]
  },
  audits: [
    './lighthouse-custom.js'
  ],
  categories: {
    'portfolio-performance': {
      title: 'Portfolio Performance',
      auditRefs: [
        { id: 'portfolio-projects-loaded', weight: 1 }
      ]
    }
  }
};
```

### Continuous Monitoring
```bash
# Set up Lighthouse CI server for long-term tracking
npx lhci server --port=9001 --storage.storageMethod=sql
```

This comprehensive Lighthouse CI setup ensures your portfolio meets Google's Core Web Vitals and maintains excellent performance scores! 🚀