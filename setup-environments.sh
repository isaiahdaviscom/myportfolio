#!/bin/bash

# Multi-Environment Setup Script
# This script helps you set up development and staging environments

echo "🚀 Setting up Multi-Environment Deployment..."

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Not in a git repository. Please run this from your project root."
    exit 1
fi

# Create develop branch if it doesn't exist
echo "📝 Setting up develop branch..."
if git show-ref --verify --quiet refs/heads/develop; then
    echo "✅ develop branch already exists"
    git checkout develop
else
    echo "🔧 Creating develop branch from master..."
    git checkout master
    git checkout -b develop
    echo "✅ develop branch created"
fi

# Push develop branch to origin
echo "📤 Pushing develop branch to GitHub..."
git push -u origin develop

echo ""
echo "✅ Multi-environment setup complete!"
echo ""
echo "🎯 Next Steps:"
echo "1. Go to Netlify Dashboard (https://app.netlify.com)"
echo "2. Create a second site for staging:"
echo "   - Repository: isaiahdaviscom/myportfolio"
echo "   - Branch: develop"
echo "   - Build command: npm run build:all"
echo "   - Publish directory: public"
echo ""
echo "🌍 Your deployment environments:"
echo "   🟢 Production: master branch → https://isaiahdavis.com"
echo "   🟡 Staging: develop branch → https://[staging-site].netlify.app"
echo "   🔵 Previews: Pull requests → Auto-generated URLs"
echo ""
echo "📋 Workflow:"
echo "   1. Feature branch → develop (staging testing)"
echo "   2. develop → master (production deployment)"
echo ""
echo "Happy deploying! 🎉"