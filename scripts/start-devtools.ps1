# Chrome DevTools Development Launch Script for Windows
# This script starts Hugo server and Chrome with DevTools configuration

Write-Host "🚀 Starting Chrome DevTools Development Environment..." -ForegroundColor Green

# Check if Hugo is available
if (-not (Get-Command "hugo" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Hugo not found. Please install Hugo first." -ForegroundColor Red
    exit 1
}

# Start Hugo server in background
Write-Host "📝 Starting Hugo server on port 1313..." -ForegroundColor Blue
$hugoJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    hugo server -D --port=1313 --bind=0.0.0.0
}

# Wait a moment for Hugo to start
Start-Sleep -Seconds 3

# Check if Chrome is available
$chromeCmd = $null
$chromePaths = @(
    "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "${env:LOCALAPPDATA}\Google\Chrome\Application\chrome.exe"
)

foreach ($path in $chromePaths) {
    if (Test-Path $path) {
        $chromeCmd = $path
        break
    }
}

if (-not $chromeCmd) {
    Write-Host "❌ Chrome not found. Please install Google Chrome." -ForegroundColor Red
    Stop-Job $hugoJob
    Remove-Job $hugoJob
    exit 1
}

# Create debug profile directory
$debugProfile = ".\.chrome-debug-profile"
if (-not (Test-Path $debugProfile)) {
    New-Item -ItemType Directory -Path $debugProfile | Out-Null
}

# Launch Chrome with DevTools configuration
Write-Host "🔧 Starting Chrome with DevTools configuration..." -ForegroundColor Blue
$chromeArgs = @(
    "--remote-debugging-port=9222",
    "--user-data-dir=.\.chrome-debug-profile",
    # "--disable-web-security",
    "--disable-features=VizDisplayCompositor",
    "http://localhost:1313"
)

$chromeProcess = Start-Process -FilePath $chromeCmd -ArgumentList $chromeArgs -PassThru

Write-Host "✅ Development environment started!" -ForegroundColor Green
Write-Host "📋 Chrome DevTools: http://localhost:1313" -ForegroundColor Cyan
Write-Host "🔍 Remote Debugging: http://localhost:9222" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 To set up DevTools workspace:" -ForegroundColor Yellow
Write-Host "   1. Open DevTools (F12)" -ForegroundColor White
Write-Host "   2. Go to Sources tab" -ForegroundColor White  
Write-Host "   3. Click 'Add folder to workspace'" -ForegroundColor White
Write-Host "   4. Select this project folder" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers..." -ForegroundColor Yellow

# Function to cleanup on exit
function Cleanup {
    Write-Host ""
    Write-Host "🛑 Shutting down development environment..." -ForegroundColor Red
    Stop-Job $hugoJob -ErrorAction SilentlyContinue
    Remove-Job $hugoJob -ErrorAction SilentlyContinue
    if ($chromeProcess -and -not $chromeProcess.HasExited) {
        $chromeProcess.Kill()
    }
    Write-Host "✅ Cleanup complete!" -ForegroundColor Green
}

# Set up cleanup on Ctrl+C
try {
    # Wait for user to press Ctrl+C
    while ($true) {
        Start-Sleep -Seconds 1
        
        # Check if Hugo job is still running
        if ($hugoJob.State -eq "Failed" -or $hugoJob.State -eq "Completed") {
            Write-Host "❌ Hugo server stopped unexpectedly." -ForegroundColor Red
            break
        }
    }
}
finally {
    Cleanup
}