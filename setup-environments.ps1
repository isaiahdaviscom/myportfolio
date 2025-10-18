# Multi-Environment Setup Script for Windows
# This script helps you set up development and staging environments

Write-Host "🚀 Setting up Multi-Environment Deployment..." -ForegroundColor Green

# Check if we're in a git repository
try {
    git rev-parse --git-dir | Out-Null
}
catch {
    Write-Host "❌ Not in a git repository. Please run this from your project root." -ForegroundColor Red
    exit 1
}

# Create develop branch if it doesn't exist
Write-Host "📝 Setting up develop branch..." -ForegroundColor Blue

$developExists = git show-ref --verify --quiet refs/heads/develop 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ develop branch already exists" -ForegroundColor Green
    git checkout develop
} else {
    Write-Host "🔧 Creating develop branch from master..." -ForegroundColor Yellow
    git checkout master
    git checkout -b develop
    Write-Host "✅ develop branch created" -ForegroundColor Green
}

# Push develop branch to origin
Write-Host "📤 Pushing develop branch to GitHub..." -ForegroundColor Blue
git push -u origin develop

Write-Host ""
Write-Host "✅ Multi-environment setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Go to Netlify Dashboard (https://app.netlify.com)" -ForegroundColor White
Write-Host "2. Create a second site for staging:" -ForegroundColor White
Write-Host "   - Repository: isaiahdaviscom/myportfolio" -ForegroundColor Gray
Write-Host "   - Branch: develop" -ForegroundColor Gray
Write-Host "   - Build command: npm run build:all" -ForegroundColor Gray
Write-Host "   - Publish directory: public" -ForegroundColor Gray
Write-Host ""
Write-Host "🌍 Your deployment environments:" -ForegroundColor Cyan
Write-Host "   🟢 Production: master branch → https://isaiahdavis.com" -ForegroundColor White
Write-Host "   🟡 Staging: develop branch → https://[staging-site].netlify.app" -ForegroundColor White
Write-Host "   🔵 Previews: Pull requests → Auto-generated URLs" -ForegroundColor White
Write-Host ""
Write-Host "📋 Workflow:" -ForegroundColor Cyan
Write-Host "   1. Feature branch → develop (staging testing)" -ForegroundColor White
Write-Host "   2. develop → master (production deployment)" -ForegroundColor White
Write-Host ""
Write-Host "Happy deploying! 🎉" -ForegroundColor Green