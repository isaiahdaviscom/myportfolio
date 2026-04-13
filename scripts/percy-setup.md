# Percy Visual Regression Testing Setup

## 1. Install Percy CLI
```bash
npm install --save-dev @percy/cli @percy/puppeteer
```

## 2. Percy Configuration (percy.config.js)
```javascript
module.exports = {
  version: 2,
  discovery: {
    allowedHostnames: ['localhost:1313'],
    networkIdleTimeout: 750
  },
  snapshot: {
    widths: [375, 768, 1024, 1280, 1920],
    minHeight: 1024,
    percyCSS: `
      /* Hide dynamic content that changes between snapshots */
      .last-modified { display: none !important; }
      .dynamic-timestamp { display: none !important; }
    `
  },
  static: {
    baseUrl: 'http://localhost:1313',
    snapshots: [
      { name: 'Homepage', url: '/' },
      { name: 'About Page', url: '/about/' },
      { name: 'Portfolio Page', url: '/portfolio/' },
      { name: 'Contact Page', url: '/contact/' },
      { name: 'Empire Project', url: '/portfolio/empire/' },
      { name: 'IGA Project', url: '/portfolio/iga/' },
      { name: 'Mobile Navigation', url: '/', execute: () => {
        // Test mobile menu functionality
        document.querySelector('.mobile-menu-button')?.click();
      }}
    ]
  }
};
```

## 3. GitHub Actions Integration (.github/workflows/percy.yml)
```yaml
name: Percy Visual Testing
on: [push, pull_request]

jobs:
  percy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

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

      - name: Start local server
        run: |
          cd public
          python -m http.server 1313 &
          sleep 5

      - name: Run Percy snapshots
        run: npx percy snapshot
        env:
          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}

      - name: Comment PR with Percy results
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            const { data: comments } = await github.rest.issues.listComments({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
            });
            
            const percyComment = comments.find(comment => 
              comment.body.includes('Percy Visual Review')
            );
            
            const body = `## 🎨 Percy Visual Review
            
            Visual regression testing has completed for this PR.
            
            🔍 **Review Changes**: Check the Percy dashboard for visual diffs
            📸 **Screenshots**: Captured across 5 breakpoints (375px - 1920px)
            🎯 **Pages Tested**: 7 key pages including portfolio projects
            
            [View Percy Results](https://percy.io/${context.repo.owner}/${context.repo.repo}/builds)`;
            
            if (percyComment) {
              await github.rest.issues.updateComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                comment_id: percyComment.id,
                body: body
              });
            } else {
              await github.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: context.issue.number,
                body: body
              });
            }
```

## 4. Package.json Scripts
```json
{
  "scripts": {
    "percy:snapshot": "percy snapshot public --base-url http://localhost:1313",
    "percy:serve": "cd public && python -m http.server 1313",
    "percy:test": "npm run build:all && npm run percy:serve & sleep 5 && npm run percy:snapshot"
  }
}
```

## 5. Setup Instructions

### Step 1: Create Percy Account
1. Go to https://percy.io
2. Sign up with GitHub
3. Create a new project
4. Get your `PERCY_TOKEN`

### Step 2: Add Percy Token to GitHub
1. Go to your GitHub repo → Settings → Secrets and Variables → Actions
2. Add new secret: `PERCY_TOKEN` = your Percy token

### Step 3: Test Locally
```bash
# Build and test Percy locally
npm install
npm run percy:test
```

### Step 4: Automatic Testing
- Every PR will automatically capture visual snapshots
- Compare against the main branch baseline
- Review changes in Percy dashboard
- Approve or reject visual changes

## 6. What Percy Catches

### Layout Breaks
- CSS Grid/Flexbox issues
- Responsive breakpoint problems
- Element positioning changes

### Design Changes  
- Color variations
- Font rendering differences
- Spacing/margin shifts

### Cross-Browser Issues
- Safari-specific rendering
- Firefox font differences
- Chrome vs Edge layouts

### Component Issues
- Button state changes
- Navigation menu problems
- Form field styling

## 7. Percy Dashboard Features

### Visual Diff Viewer
- Side-by-side comparison
- Highlighted differences
- Zoom and inspect tools

### Approval Workflow
- Approve legitimate changes
- Reject unintended modifications
- Batch approve multiple changes

### Historical Tracking
- Track visual changes over time
- Identify when regressions were introduced
- Compare any two builds

## 8. Cost & Limits

### Free Tier
- 5,000 screenshots per month
- Perfect for small-medium sites
- Full feature access

### Paid Plans
- $49/month for 25,000 screenshots
- $99/month for 100,000 screenshots
- Enterprise options available

## 9. Best Practices

### Stable Selectors
```css
/* Use stable selectors for Percy CSS overrides */
.percy-hide { display: none !important; }
.percy-static-content { content: "Static Content" !important; }
```

### Dynamic Content Handling
```javascript
// Hide time-sensitive content
const percyCSS = `
  .timestamp, .last-updated, .random-id { 
    display: none !important; 
  }
  
  /* Replace dynamic images with placeholders */
  .user-avatar { 
    background-image: url('/static/placeholder-avatar.png') !important; 
  }
`;
```

### Test Coverage Strategy
```javascript
// Test all critical user paths
const snapshots = [
  // Landing pages
  { name: 'Homepage', url: '/' },
  { name: 'About', url: '/about/' },
  
  // Portfolio showcase
  { name: 'Portfolio Grid', url: '/portfolio/' },
  { name: 'Project Detail', url: '/portfolio/empire/' },
  
  // Interactive states
  { name: 'Mobile Menu Open', url: '/', execute: () => {
    document.querySelector('.mobile-toggle').click();
  }},
  
  // Form states
  { name: 'Contact Form', url: '/contact/' },
  { name: 'Form Validation', url: '/contact/', execute: () => {
    document.querySelector('input[required]').focus();
    document.querySelector('input[required]').blur(); // Trigger validation
  }}
];
```

This Percy setup will automatically catch visual regressions across your entire portfolio site, ensuring your design stays consistent as you make updates! 🎨