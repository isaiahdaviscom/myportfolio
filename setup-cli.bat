@echo off
REM Quick setup for PowerShell global aliases
REM Run this once to enable 'portfolio' and 'pf' commands from anywhere

echo Setting up PowerShell profile for MyPortfolio CLI...
echo.

setlocal enabledelayedexpansion

REM Get the current directory (project root)
set PROJECT_ROOT=%~dp0

REM Get PowerShell profile path
for /f "tokens=*" %%i in ('powershell -NoProfile -Command "$PROFILE"') do set PS_PROFILE=%%i

echo Project Root: %PROJECT_ROOT%
echo PowerShell Profile: %PS_PROFILE%
echo.

REM Create the profile content
(
    echo # MyPortfolio CLI - Auto-loaded on profile start
    echo $projectRoot = "%PROJECT_ROOT%"
    echo.
    echo function portfolio {
    echo     param([string[]]$Arguments^)
    echo     ^& "$projectRoot\portfolio.ps1" @Arguments
    echo }
    echo.
    echo function pf {
    echo     param([string[]]$Arguments^)
    echo     ^& "$projectRoot\pf.ps1" @Arguments
    echo }
    echo.
    echo Write-Host "✓ MyPortfolio CLI loaded! Use 'portfolio' or 'pf' from anywhere." -ForegroundColor Green
) >> "%PS_PROFILE%"

echo.
echo ✓ Setup complete!
echo.
echo Now either:
echo   1. Restart PowerShell to activate the commands
echo   2. Or run: . $PROFILE
echo.
echo Then you can use:
echo   portfolio dev
echo   pf build
echo   portfolio help
echo.
pause
