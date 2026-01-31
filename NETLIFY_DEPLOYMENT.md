# Netlify Deployment Checklist

## ✅ Pre-Deployment Requirements
- [x] Hugo version specified (0.132.2)
- [x] Node.js version specified (18)
- [x] Build command configured (`npm run build:all`)
- [x] Publish directory set (`public`)
- [x] CSS build process (PostCSS + TailwindCSS)
- [x] JavaScript build process (ESBuild)
- [x] Environment variables template created 

## 🔧 Build Configuration
- **Build Command**: `npm run build:all`
- **Publish Directory**: `public`
- **Hugo Version**: 0.132.2
- **Node Version**: 18

## 🌐 Environment Variables (Set in Netlify Dashboard)
Add these in **Site Settings > Environment Variables**:
```
HUGO_ENV=production
HUGO_VERSION=0.132.2
NODE_ENV=production
NODE_VERSION=18
NPM_VERSION=9
HUGO_ENABLEGITINFO=true
```

## 📁 Build Process Order
1. **CSS Build**: PostCSS processes `src/css/tailwind.css` → `static/css/styles.css`
2. **JS Build**: ESBuild processes `themes/myPortfolio/assets/js/main.js` → `static/js/main.js`
3. **Hugo Build**: Hugo processes all content and templates → `public/`

## 🚀 Deployment Steps
1. Connect repository to Netlify
2. Set build settings:
   - Build command: `npm run build:all`
   - Publish directory: `public`
3. Add environment variables (see above)
4. Deploy!

## 🔍 Troubleshooting
- **CSS not loading**: Check if PostCSS build completed successfully
- **JS errors**: Verify ESBuild completed without errors  
- **Hugo errors**: Check theme structure and content format
- **Build timeout**: Netlify free tier has 15-minute build limit

## 📋 Post-Deployment Verification
- [ ] Site loads correctly
- [ ] CSS styles applied
- [ ] JavaScript functionality works
- [ ] Images and assets load
- [ ] Navigation works
- [ ] Mobile responsive
- [ ] Performance check (PageSpeed Insights)