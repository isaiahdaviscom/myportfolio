@echo off
REM Hugo Development Server - No Cache
echo Starting Hugo with caching disabled...

REM Clear Hugo cache
echo Clearing Hugo cache...
rmdir /s /q "%LOCALAPPDATA%\hugo_cache" 2>nul
rmdir /s /q "resources" 2>nul
rmdir /s /q "public" 2>nul

REM Start Hugo server with no caching
echo Starting Hugo server...
hugo server -D --disableFastRender --noHTTPCache --navigateToChanged --gc --cleanDestinationDir --ignoreCache

pause