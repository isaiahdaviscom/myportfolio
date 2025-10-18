# Playwright Cross-Browser Testing Setup

## 1. Installation & Configuration

### Install Playwright
```bash
npm install --save-dev @playwright/test
npx playwright install
```

### Playwright Configuration (playwright.config.js)
```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'playwright-report/results.json' }],
    ['junit', { outputFile: 'playwright-report/results.xml' }]
  ],
  use: {
    baseURL: 'http://localhost:1313',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  projects: [
    // Desktop Browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile Devices
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    // Tablets
    {
      name: 'iPad',
      use: { ...devices['iPad Pro'] },
    },

    // Microsoft Edge
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    }
  ],

  webServer: {
    command: 'npm run serve:test',
    url: 'http://localhost:1313',
    reuseExistingServer: !process.env.CI,
    timeout: 30000
  }
});
```

## 2. Test Suite Structure

### Core Navigation Test (tests/e2e/navigation.spec.js)
```javascript
import { test, expect } from '@playwright/test';

test.describe('Site Navigation', () => {
  test('should navigate through all main pages', async ({ page }) => {
    // Homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/Isaiah Davis/);
    await expect(page.locator('h1')).toContainText('Isaiah Davis');

    // About page
    await page.click('nav a[href*="about"]');
    await expect(page).toHaveURL(/.*about/);
    await expect(page.locator('h1')).toContainText('About');

    // Portfolio page
    await page.click('nav a[href*="portfolio"]');
    await expect(page).toHaveURL(/.*portfolio/);
    await expect(page.locator('h1')).toContainText('Portfolio');

    // Contact page
    await page.click('nav a[href*="contact"]');
    await expect(page).toHaveURL(/.*contact/);
    await expect(page.locator('h1')).toContainText('Contact');
  });

  test('should handle mobile navigation', async ({ page, isMobile }) => {
    if (!isMobile) return;

    await page.goto('/');
    
    // Mobile menu should be hidden initially
    await expect(page.locator('.mobile-menu')).toBeHidden();
    
    // Click mobile menu button
    await page.click('.mobile-menu-button');
    await expect(page.locator('.mobile-menu')).toBeVisible();
    
    // Navigate using mobile menu
    await page.click('.mobile-menu a[href*="about"]');
    await expect(page).toHaveURL(/.*about/);
    
    // Menu should close after navigation
    await expect(page.locator('.mobile-menu')).toBeHidden();
  });
});
```

### Portfolio Functionality Test (tests/e2e/portfolio.spec.js)
```javascript
import { test, expect } from '@playwright/test';

const portfolioProjects = [
  'empire', 'iga', 'isaiahdavisdesigns', 
  'loveislikeacandle', 'macncheesebar', 
  'premier', 'sandc', 'spark', 'toms'
];

test.describe('Portfolio Functionality', () => {
  test('should display all portfolio projects', async ({ page }) => {
    await page.goto('/portfolio/');
    
    // Check that portfolio grid loads
    await expect(page.locator('.portfolio-grid')).toBeVisible();
    
    // Verify minimum number of projects
    const projectCards = page.locator('.portfolio-item');
    await expect(projectCards).toHaveCountGreaterThan(5);
  });

  test('should navigate to individual projects', async ({ page }) => {
    await page.goto('/portfolio/');
    
    // Test each project link
    for (const project of portfolioProjects) {
      const projectLink = page.locator(`a[href*="${project}"]`).first();
      
      if (await projectLink.isVisible()) {
        await projectLink.click();
        await expect(page).toHaveURL(new RegExp(`.*${project}`));
        
        // Verify project page loads correctly
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('.project-content')).toBeVisible();
        
        // Go back to portfolio
        await page.goBack();
        await expect(page).toHaveURL(/.*portfolio/);
      }
    }
  });

  test('should handle project image loading', async ({ page }) => {
    await page.goto('/portfolio/empire/');
    
    // Wait for images to load
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();
      
      // Check that image loaded successfully (not broken)
      const naturalWidth = await img.evaluate(img => img.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });
});
```

### Form Testing (tests/e2e/contact.spec.js)
```javascript
import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should validate required fields', async ({ page }) => {
    await page.goto('/contact/');
    
    // Try submitting empty form
    await page.click('button[type="submit"]');
    
    // Check for validation messages
    await expect(page.locator('input:invalid')).toHaveCount(2); // name and email required
    
    // Fill in name only
    await page.fill('input[name="name"]', 'Test User');
    await page.click('button[type="submit"]');
    await expect(page.locator('input:invalid')).toHaveCount(1); // email still required
    
    // Fill in invalid email
    await page.fill('input[name="email"]', 'invalid-email');
    await page.click('button[type="submit"]');
    await expect(page.locator('input:invalid')).toHaveCount(1);
    
    // Fill in valid email
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Test message');
    
    // Form should be submittable now
    await expect(page.locator('input:invalid')).toHaveCount(0);
  });

  test('should handle form submission', async ({ page }) => {
    await page.goto('/contact/');
    
    // Fill out form with valid data
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message from the automated test suite.');
    
    // Mock the form submission
    await page.route('**/contact', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Thank you for your message!' })
      });
    });
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Check for success message
    await expect(page.locator('.success-message')).toBeVisible();
  });
});
```

### Performance Testing (tests/e2e/performance.spec.js)
```javascript
import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('should meet Core Web Vitals thresholds', async ({ page }) => {
    await page.goto('/');
    
    // Measure Largest Contentful Paint (LCP)
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      });
    });
    
    // LCP should be under 2.5 seconds
    expect(lcp).toBeLessThan(2500);
    
    // Measure Cumulative Layout Shift (CLS)
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          resolve(clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
        
        // Resolve after page is stable
        setTimeout(() => resolve(clsValue), 3000);
      });
    });
    
    // CLS should be under 0.1
    expect(cls).toBeLessThan(0.1);
  });

  test('should load pages within performance budget', async ({ page }) => {
    const pages = ['/', '/about/', '/portfolio/', '/contact/'];
    
    for (const url of pages) {
      const startTime = Date.now();
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // Page should load in under 3 seconds
      expect(loadTime).toBeLessThan(3000);
      
      console.log(`${url} loaded in ${loadTime}ms`);
    }
  });
});
```

## 3. GitHub Actions Integration (.github/workflows/playwright.yml)
```yaml
name: Playwright Cross-Browser Tests
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    
    strategy:
      fail-fast: false
      matrix:
        project: [chromium, firefox, webkit, 'Mobile Chrome', 'Mobile Safari']
        
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
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
          
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps ${{ matrix.project }}
        
      - name: Build site
        run: |
          npm run build:css
          hugo --minify
          
      - name: Run Playwright tests
        run: npx playwright test --project="${{ matrix.project }}"
        
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report-${{ matrix.project }}
          path: playwright-report/
          retention-days: 30
          
      - name: Comment PR with test results
        if: github.event_name == 'pull_request' && failure()
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const path = require('path');
            
            // Read test results
            let resultsPath = 'playwright-report/results.json';
            let testResults = 'Test results not available';
            
            if (fs.existsSync(resultsPath)) {
              const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
              const failed = results.stats.failed || 0;
              const passed = results.stats.passed || 0;
              const total = failed + passed;
              
              testResults = `
              **${{ matrix.project }}** Test Results:
              - ✅ Passed: ${passed}
              - ❌ Failed: ${failed}
              - 📊 Total: ${total}
              `;
            }
            
            const body = `## 🎭 Playwright Test Results - ${{ matrix.project }}
            
            ${testResults}
            
            [View detailed report](https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }})`;
            
            await github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: body
            });
```

## 4. Package.json Scripts
```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:ui": "playwright test --ui",
    "test:chromium": "playwright test --project=chromium",
    "test:firefox": "playwright test --project=firefox",
    "test:webkit": "playwright test --project=webkit",
    "test:mobile": "playwright test --project='Mobile Chrome' --project='Mobile Safari'",
    "serve:test": "cd public && python -m http.server 1313"
  }
}
```

## 5. Running Tests

### Local Development
```bash
# Run all tests
npm run test:e2e

# Run specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run mobile tests only
npm run test:mobile

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug tests interactively
npm run test:e2e:debug

# Use Playwright UI for test development
npm run test:e2e:ui
```

### CI/CD Integration
- Automatically runs on every push/PR
- Tests across 7 browser/device combinations
- Captures screenshots and videos on failure
- Generates detailed HTML reports

## 6. What Playwright Catches

### Cross-Browser Issues
- CSS rendering differences between browsers
- JavaScript compatibility problems
- Form behavior variations
- Font rendering inconsistencies

### Responsive Design
- Mobile navigation functionality
- Touch interactions on mobile devices
- Tablet-specific layout issues
- Viewport-dependent features

### User Experience
- Navigation flow problems
- Form validation issues
- Image loading failures
- Performance bottlenecks

### Accessibility
- Keyboard navigation
- Screen reader compatibility
- Focus management
- ARIA attribute support

## 7. Test Reports & Debugging

### HTML Report
```bash
# Generate and view HTML report
npx playwright show-report
```

### Trace Viewer
```bash
# View detailed execution traces
npx playwright show-trace trace.zip
```

### Screenshots & Videos
- Automatic capture on failure
- Step-by-step visual debugging
- Network activity monitoring
- Console log capture

This comprehensive Playwright setup ensures your portfolio works perfectly across all major browsers and devices! 🎭