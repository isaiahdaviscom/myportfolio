# Hugo Cache Cleaner and Server Starter
# Run this script when HTML content isn't updating

param(
    [switch]$StartServer = $false,
    [switch]$ClearAll = $false
)

Write-Host "=== Hugo Cache Cleaner ===" -ForegroundColor Cyan

# Navigate to project root
$projectRoot = "C:\Users\IBlac\OneDrive\Desktop\MyProjects\myportfolio"
Set-Location $projectRoot

Write-Host "Working directory: $((Get-Location).Path)" -ForegroundColor Gray

# 1. Kill any running Hugo processes
Write-Host "1. Stopping Hugo processes..." -ForegroundColor Yellow
Get-Process -Name "hugo" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 1

# 2. Clear Hugo global cache
Write-Host "2. Clearing Hugo global cache..." -ForegroundColor Yellow
$hugoCacheDir = "$env:LOCALAPPDATA\hugo_cache"
if (Test-Path $hugoCacheDir) {
    Remove-Item $hugoCacheDir -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "   ✓ Global cache cleared" -ForegroundColor Green
} else {
    Write-Host "   ✓ No global cache found" -ForegroundColor Green
}

# 3. Clear local project cache
Write-Host "3. Clearing local project cache..." -ForegroundColor Yellow
$localCaches = @("public", "resources", ".hugo_build.lock")
foreach ($cache in $localCaches) {
    if (Test-Path $cache) {
        Remove-Item $cache -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "   ✓ Cleared $cache" -ForegroundColor Green
    }
}

# 4. Clear browser cache instruction
Write-Host "4. Browser cache clearing..." -ForegroundColor Yellow
Write-Host "   • Press Ctrl+Shift+R in your browser to hard refresh" -ForegroundColor White
Write-Host "   • Or press F12 → Network tab → check 'Disable cache'" -ForegroundColor White

# 5. Start Hugo server if requested
if ($StartServer) {
    Write-Host "5. Starting Hugo server with no caching..." -ForegroundColor Yellow
    Write-Host "   Starting in 3 seconds..." -ForegroundColor Gray
    Start-Sleep -Seconds 3
    
    # Start Hugo with all anti-cache flags
    hugo server -D --disableFastRender --noHTTPCache --navigateToChanged --gc --cleanDestinationDir --ignoreCache
}

if (!$StartServer) {
    Write-Host "`n=== Manual Start Command ===" -ForegroundColor Cyan
    Write-Host "hugo server -D --disableFastRender --noHTTPCache --navigateToChanged --gc --cleanDestinationDir" -ForegroundColor White
    Write-Host "`n=== Quick Start ===" -ForegroundColor Cyan
    Write-Host "Run: .\clear-cache.ps1 -StartServer" -ForegroundColor White
}