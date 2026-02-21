# Complete Netlify Deployment Guide with GitHub Integration

## 🔗 **GitHub Repository Setup**

### **1. Repository Settings (GitHub)**

#### **Branch Protection Rules (Optional but Recommended)**
1. Go to your GitHub repository: `https://github.com/isaiahdaviscom/myportfolio`
2. Navigate to **Settings** → **Branches**
3. Click **Add rule** for `master` branch
4. Configure protection settings:
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging**
   - ✅ **Include administrators**

#### **GitHub Actions (Optional)**
If you want to run builds on GitHub before Netlify:
1. Go to **Actions** tab in your repository
2. Enable Actions if not already enabled
3. Consider adding a build verification workflow

### **2. Repository Access Permissions**
1. Ensure your repository is **public** or Netlify has access to **private** repositories
2. If private: Grant Netlify access through GitHub Apps integration

---

## 🚀 **Netlify Deployment Setup**

### **Step 1: Connect Repository to Netlify**

1. **Login to Netlify**: Go to [netlify.com](https://netlify.com) and sign in with GitHub
2. **Import Project**:
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose **"Deploy with GitHub"**
   - Authorize Netlify to access your GitHub account
   - Select repository: `isaiahdaviscom/myportfolio`

### **Step 2: Configure Build Settings**

#### **Basic Build Settings**
```
Repository: isaiahdaviscom/myportfolio
Branch to deploy: master
Build command: npm run build:all
Publish directory: public
```

#### **Advanced Build Settings**
- **Base directory**: Leave empty (root)
- **Functions directory**: Leave empty (not using Netlify Functions)

### **Step 3: Environment Variables**

In Netlify Dashboard → **Site Settings** → **Environment Variables**, add:

```bash
# Hugo Configuration
HUGO_ENV=production
HUGO_VERSION=0.132.2
HUGO_ENABLEGITINFO=true

# Node.js Configuration
NODE_ENV=production
NODE_VERSION=18
NPM_VERSION=9

# Build Optimization
TZ=UTC
```

### **Step 4: Domain Configuration**

#### **Custom Domain Setup** (if using custom domain)
1. **Site Settings** → **Domain management**
2. **Add custom domain**: `isaiahdavis.com`
3. **Configure DNS**:
   - Add CNAME record: `www.isaiahdavis.com` → `your-site-name.netlify.app`
   - Add A record: `isaiahdavis.com` → Netlify's IP address
4. **SSL Certificate**: Netlify will auto-provision Let's Encrypt certificate

---

## ⚙️ **GitHub Webhook Configuration (Automatic)**

Netlify automatically configures webhooks when you connect your repository:

### **What Netlify Sets Up Automatically:**
- ✅ **Push webhook**: Triggers build on commits to `master`
- ✅ **Pull request webhook**: Creates deploy previews for PRs
- ✅ **Branch webhook**: Handles branch-specific deployments

### **Manual Webhook Verification** (if needed):
1. Go to GitHub repo → **Settings** → **Webhooks**
2. You should see a Netlify webhook with:
   - **Payload URL**: `https://api.netlify.com/hooks/github`
   - **Events**: Push, Pull request, Delete

---

## 🔧 **GitHub Repository Files to Commit**

Make sure these files are in your repository:

### **Required Files:**
```
.nvmrc                    # Node.js version (18)
netlify.toml             # Netlify configuration
package.json             # Dependencies and build scripts
.env.example             # Environment variables template
NETLIFY_DEPLOYMENT.md    # This deployment guide
```

### **Build Files:**
```
src/css/tailwind.css     # Source CSS
postcss.config.js        # PostCSS configuration
tailwind.config.js       # TailwindCSS configuration
hugo.toml               # Hugo configuration
```

---

## 🚦 **GitHub Actions Integration (Optional)**

### **Create Build Verification Workflow**

Create `.github/workflows/build-test.yml`:

```yaml
name: Build Test
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
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
    
    - name: Build site
      run: npm run build:all
    
    - name: Test build output
      run: |
        ls -la public/
        test -f public/index.html
```

---

## 📋 **Deployment Checklist**

### **Pre-Deployment (GitHub)**
- [ ] Repository is public or Netlify has access
- [ ] All required files are committed and pushed
- [ ] Latest changes are on `master` branch
- [ ] `.nvmrc` file exists with Node version 18
- [ ] `netlify.toml` has correct configuration

### **Netlify Configuration**
- [ ] Repository connected to Netlify
- [ ] Build command: `npm run build:all`
- [ ] Publish directory: `public`
- [ ] Environment variables configured
- [ ] Branch to deploy: `master`

### **Post-Deployment**
- [ ] Build completes successfully
- [ ] Site loads at Netlify URL
- [ ] CSS styles are applied
- [ ] JavaScript functionality works
- [ ] Images and assets load correctly
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active

---

## 🐛 **Troubleshooting Common Issues**

### **GitHub-Related Issues**

#### **Build Fails with Permission Error**
```bash
# Solution: Check repository access
1. Verify Netlify has permission to access repository
2. Re-authenticate GitHub connection in Netlify
3. Ensure repository is not archived or deleted
```

#### **Webhook Not Triggering Builds**
```bash
# Solution: Verify webhook configuration
1. Check GitHub repo → Settings → Webhooks
2. Ensure webhook is active and has correct events
3. Test webhook by pushing a small change
```

#### **Environment Variables Not Working**
```bash
# Solution: Check variable names and values
1. Verify exact variable names in Netlify dashboard
2. Ensure no typos in variable names
3. Check if variables are set for correct deploy context
```

### **Build-Related Issues**

#### **Hugo Version Mismatch**
```bash
# Error: Hugo version not found or incompatible
# Solution: Update netlify.toml
HUGO_VERSION=0.132.2  # Match your local version
```

#### **Node.js Version Issues**
```bash
# Error: Node.js version not supported
# Solution: Verify .nvmrc and environment variables
NODE_VERSION=18
```

#### **CSS/JS Build Failures**
```bash
# Error: PostCSS or ESBuild fails
# Solution: Check dependencies
npm ci  # Clean install dependencies
npm run build:css  # Test CSS build locally
npm run build:js   # Test JS build locally
```

---

## 🎯 **Deploy Commands**

### **Initial Deployment**
1. Push all changes to GitHub:
   ```bash
   git add .
   git commit -m "Configure Netlify deployment"
   git push origin master
   ```

2. Connect repository in Netlify dashboard

3. Configure build settings and environment variables

4. Trigger first deployment

### **Continuous Deployment**
After initial setup, deployments are automatic:
- **Push to master** → Automatic production deploy
- **Open Pull Request** → Automatic deploy preview
- **Merge PR** → Automatic production deploy

---

## 📞 **Support Resources**

- **Netlify Documentation**: [docs.netlify.com](https://docs.netlify.com)
- **Hugo on Netlify**: [docs.netlify.com/configure-builds/common-configurations/hugo](https://docs.netlify.com/configure-builds/common-configurations/hugo/)
- **GitHub Integration**: [docs.netlify.com/git/repo-permissions-linking](https://docs.netlify.com/git/repo-permissions-linking/)

Your Hugo portfolio is now ready for seamless GitHub → Netlify deployment! 🚀