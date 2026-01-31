@echo off
REM MyPortfolio CLI - Windows batch wrapper
REM Usage: portfolio.bat <command>

setlocal enabledelayedexpansion
cd /d "%~dp0"
node cli.js %*
endlocal
