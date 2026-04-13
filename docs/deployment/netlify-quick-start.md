# Netlify Quick Start Guide

Get your Hugo portfolio deployed to Netlify in minutes with this streamlined guide.

## 📋 **Prerequisites**

Before you begin, ensure you have:
- ✅ GitHub repository: `isaiahdaviscom/myportfolio` 
- ✅ All files committed and pushed to `master` branch
- ✅ Hugo version 0.132.2 locally
- ✅ Node.js version 18

## 🚀 **Step 1: Connect Repository**

1. **Login to Netlify**: Go to [app.netlify.com](https://app.netlify.com) and sign in with GitHub
2. **Import Project**:
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose **"Deploy with GitHub"**
   - Authorize Netlify to access your GitHub account
   - Select repository: `isaiahdaviscom/myportfolio`

## ⚙️ **Step 2: Configure Build Settings**

### **Basic Settings**
```
Repository: isaiahdaviscom/myportfolio
Branch to deploy: master
Build command: npm run build:all
Publish directory: public
```

### **Advanced Settings**
- **Base directory**: Leave empty (root)
- **Functions directory**: Leave empty

## 🌍 **Step 3: Set Environment Variables**

In Netlify Dashboard → **Site Settings** → **Environment Variables**, add:

```bash
HUGO_ENV=production
HUGO_VERSION=0.132.2
NODE_ENV=production
NODE_VERSION=18
NPM_VERSION=9
HUGO_ENABLEGITINFO=true
TZ=UTC
```

## 🎯 **Step 4: Deploy**

1. Click **"Deploy site"** 
2. Netlify will automatically:
   - Build your site using `npm run build:all`
   - Deploy to `https://[random-name].netlify.app`
   - Set up SSL certificate
   - Configure CDN

## 🌐 **Step 5: Custom Domain (Optional)**

1. **Site Settings** → **Domain management**
2. **Add custom domain**: `isaiahdavis.com`
3. **Configure DNS** as instructed by Netlify:
   - Add CNAME record: `www.isaiahdavis.com` → `your-site-name.netlify.app`
   - Add A record: `isaiahdavis.com` → Netlify's IP address
4. **SSL Certificate**: Auto-provisioned by Netlify

## ✅ **Post-Deployment Verification**

Verify your deployment by checking:
- [ ] Site loads correctly at Netlify URL
- [ ] CSS styles are applied
- [ ] JavaScript functionality works  
- [ ] Images and assets load
- [ ] Navigation works properly
- [ ] Mobile responsive design
- [ ] Performance is acceptable

## 🔄 **What Happens Next**

After initial setup, deployments are automatic:
- ✅ **Push to master** → Automatic production deploy
- ✅ **Pull Requests** → Deploy previews created automatically  
- ✅ **SSL Certificate** → Auto-renewed by Netlify
- ✅ **CDN** → Global content distribution

## 🐛 **Quick Troubleshooting**

### **Build Fails**
- Check build logs in Netlify dashboard
- Verify environment variables are set correctly
- Ensure all dependencies are in `package.json`

### **CSS Not Loading**
- Verify PostCSS build completed successfully
- Check if `static/css/styles.css` exists in build output

### **JavaScript Errors** 
- Verify ESBuild completed without errors
- Check if `static/js/main.js` exists in build output

## 📚 **Next Steps**

- **Advanced Setup**: See [github-integration.md](github-integration.md) for branch protection and GitHub Actions
- **Multiple Environments**: See [multi-environment.md](multi-environment.md) for staging/production workflow  
- **Build Optimization**: See [build-optimization.md](build-optimization.md) for performance tuning

## 📞 **Support Resources**

- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Hugo on Netlify**: [docs.netlify.com/configure-builds/common-configurations/hugo](https://docs.netlify.com/configure-builds/common-configurations/hugo/)
- **Build Logs**: Available in Netlify Dashboard → Deploys

**Your Hugo portfolio is ready to go live! 🎉**