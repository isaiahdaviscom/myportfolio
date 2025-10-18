# Multi-Environment Deployment Strategy

## 🌍 **Deployment Environments Overview**

Your Hugo portfolio now supports multiple deployment environments for safe testing and staging:

### **Environment Structure:**
```
🟢 Production  → master branch     → https://isaiahdavis.com
🟡 Staging     → develop branch    → https://myportfolio-develop.netlify.app  
🔵 Preview     → Pull Requests     → https://deploy-preview-[PR#]-myportfolio.netlify.app
🟠 Feature     → feature/* branches → https://[branch]-myportfolio.netlify.app
```

---

## 🚀 **Setup Instructions**

### **Step 1: Create Development Branch**

```bash
# Create and switch to develop branch
git checkout -b develop

# Push develop branch to GitHub
git push -u origin develop
```

### **Step 2: Configure Netlify Sites**

#### **Production Site** (Main Site)
1. **Repository**: `isaiahdaviscom/myportfolio`
2. **Branch**: `master`
3. **URL**: Custom domain (`isaiahdavis.com`)
4. **Environment**: Production

#### **Staging Site** (Development Testing)
1. **Create New Site** in Netlify
2. **Repository**: Same (`isaiahdaviscom/myportfolio`)  
3. **Branch**: `develop`
4. **URL**: `https://myportfolio-staging.netlify.app`
5. **Environment**: Development

### **Step 3: Environment Variables Per Site**

#### **Production Site Environment Variables:**
```bash
HUGO_ENV=production
HUGO_VERSION=0.132.2
NODE_ENV=production
NODE_VERSION=18
HUGO_BASEURL=https://isaiahdavis.com
HUGO_ENABLEGITINFO=true
```

#### **Staging Site Environment Variables:**
```bash
HUGO_ENV=development
HUGO_VERSION=0.132.2
NODE_ENV=development
NODE_VERSION=18
HUGO_BASEURL=https://myportfolio-staging.netlify.app
HUGO_ENABLEGITINFO=true
NETLIFY_ENVIRONMENT=staging
```

---

## 🔄 **Deployment Workflow**

### **Development → Staging → Production**

#### **1. Feature Development**
```bash
# Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/new-portfolio-item

# Make changes, commit, push
git add .
git commit -m "Add new portfolio item"
git push origin feature/new-portfolio-item

# Create Pull Request: feature/new-portfolio-item → develop
```

#### **2. Staging Deployment**
```bash
# Merge feature to develop (triggers staging deployment)
git checkout develop
git merge feature/new-portfolio-item
git push origin develop

# 🎯 Staging site automatically deploys at:
# https://myportfolio-develop.netlify.app
```

#### **3. Production Deployment**
```bash
# After testing on staging, merge to master
git checkout master
git pull origin master
git merge develop
git push origin master

# 🎯 Production site automatically deploys at:
# https://isaiahdavis.com
```

---

## 🧪 **Testing Strategy**

### **Automated Testing Pipeline**

Update `.github/workflows/build-test.yml`:

```yaml
name: Build & Test

on:
  push:
    branches: [ master, develop ]
  pull_request:
    branches: [ master, develop ]

jobs:
  build-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        environment: [development, production]
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Setup Hugo
      uses: peaceiris/actions-hugo@v2
      with:
        hugo-version: '0.132.2'
        extended: true
    
    - name: Install dependencies
      run: npm ci
    
    - name: Set environment
      run: |
        echo "HUGO_ENV=${{ matrix.environment }}" >> $GITHUB_ENV
        echo "NODE_ENV=${{ matrix.environment }}" >> $GITHUB_ENV
    
    - name: Build site
      run: npm run build:all
    
    - name: Test build output
      run: |
        echo "Testing ${{ matrix.environment }} build..."
        test -f public/index.html
        test -f public/css/styles.css  
        test -f public/js/main.js
        echo "✅ Build test passed for ${{ matrix.environment }}"
    
    - name: Lighthouse CI (Production only)
      if: matrix.environment == 'production'
      uses: treosh/lighthouse-ci-action@v9
      with:
        configPath: './.lighthouserc.json'
        uploadArtifacts: true
```

### **Manual Testing Checklist**

#### **Staging Environment Testing:**
- [ ] Site loads without errors
- [ ] All pages render correctly
- [ ] CSS styles applied properly
- [ ] JavaScript functionality works
- [ ] Images and assets load
- [ ] Forms work (if any)
- [ ] Mobile responsiveness
- [ ] Performance acceptable
- [ ] SEO meta tags correct

#### **Production Readiness:**
- [ ] Staging tests all pass
- [ ] Content reviewed and approved
- [ ] No broken links
- [ ] Analytics configured
- [ ] SSL certificate valid
- [ ] Custom domain working

---

## 🎛️ **Branch Protection Strategy**

### **GitHub Branch Protection Rules**

#### **Master Branch (Production):**
```
✅ Require pull request reviews before merging
✅ Require status checks to pass before merging
✅ Require branches to be up to date before merging
✅ Require conversation resolution before merging
✅ Include administrators
```

#### **Develop Branch (Staging):**
```
✅ Require pull request reviews before merging
✅ Require status checks to pass before merging
✅ Require branches to be up to date before merging
```

---

## 🔧 **Netlify Configuration**

### **Staging Site Setup**

1. **Create Second Netlify Site:**
   - Go to Netlify Dashboard
   - Click "Add new site"
   - Connect same repository
   - Configure for `develop` branch

2. **Site Settings:**
   ```
   Site name: myportfolio-staging
   Branch: develop
   Build command: npm run build:all
   Publish directory: public
   ```

3. **Deploy Contexts:**
   - **Production context**: `master` branch
   - **Branch context**: `develop` branch  
   - **Deploy previews**: Pull requests
   - **Branch deploys**: Feature branches

### **Environment-Specific Features**

#### **Development Environment:**
- Debug information enabled
- Source maps included
- Unminified assets
- Extended logging
- Test data/content

#### **Production Environment:**
- Assets minified and optimized
- Source maps disabled
- Analytics enabled
- SEO optimized
- Production content only

---

## 🚨 **Rollback Strategy**

### **Quick Rollback Options:**

#### **Netlify Rollback:**
1. Go to Netlify Dashboard → Deploys
2. Find last known good deployment
3. Click "Publish deploy"
4. Site reverts immediately

#### **Git Rollback:**
```bash
# Revert to previous commit
git revert HEAD
git push origin master

# Or reset to specific commit (if safe)
git reset --hard <commit-hash>
git push --force origin master
```

#### **Emergency Hotfix:**
```bash
# Create hotfix branch from master
git checkout master
git checkout -b hotfix/critical-fix

# Make fix, test on staging first
git push origin hotfix/critical-fix

# Merge to both develop and master
git checkout develop
git merge hotfix/critical-fix
git checkout master  
git merge hotfix/critical-fix
git push origin develop master
```

---

## 📊 **Monitoring & Alerts**

### **Netlify Deploy Notifications**

Configure Slack/email notifications for:
- ✅ Successful production deploys
- ❌ Failed builds on any environment
- ⚠️ Deploy previews for review

### **Uptime Monitoring**

Set up monitoring for:
- **Production**: `https://isaiahdavis.com`
- **Staging**: `https://myportfolio-staging.netlify.app`

Tools: Netlify Analytics, Google Analytics, or external services like Pingdom

---

## 🎯 **Quick Commands Reference**

```bash
# Development workflow
git checkout develop                    # Switch to staging
git pull origin develop               # Get latest changes
git checkout -b feature/my-feature     # Create feature branch
# ... make changes ...
git push origin feature/my-feature     # Push feature
# Create PR: feature/my-feature → develop

# Deploy to staging
git checkout develop
git merge feature/my-feature
git push origin develop               # 🎯 Triggers staging deploy

# Deploy to production (after staging testing)
git checkout master
git merge develop  
git push origin master                # 🎯 Triggers production deploy

# Emergency rollback
git revert HEAD
git push origin master                # Quick revert
```

This multi-environment setup ensures you can safely test changes before they reach your live production site! 🚀