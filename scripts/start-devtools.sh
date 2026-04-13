#!/bin/bash

# Chrome DevTools Development Launch Script
# This script starts Hugo server and Chrome with DevTools configuration

echo "🚀 Starting Chrome DevTools Development Environment..."

# Check if Hugo is available
if ! command -v hugo &> /dev/null; then
    echo "❌ Hugo not found. Please install Hugo first."
    exit 1
fi

# Start Hugo server in background
echo "📝 Starting Hugo server on port 1313..."
hugo server -D --port=1313 --bind=0.0.0.0 &
HUGO_PID=$!

# Wait a moment for Hugo to start
sleep 3

# Check if Chrome is available (try different possible names)
CHROME_CMD=""
if command -v google-chrome &> /dev/null; then
    CHROME_CMD="google-chrome"
elif command -v chrome &> /dev/null; then
    CHROME_CMD="chrome"
elif command -v chromium &> /dev/null; then
    CHROME_CMD="chromium"
else
    echo "❌ Chrome not found. Please install Chrome or Chromium."
    kill $HUGO_PID
    exit 1
fi

# Create debug profile directory
mkdir -p .chrome-debug-profile

# Launch Chrome with DevTools configuration
echo "🔧 Starting Chrome with DevTools configuration..."
$CHROME_CMD \
    --remote-debugging-port=9222 \
    --user-data-dir=./.chrome-debug-profile \
    # --disable-web-security \
    --disable-features=VizDisplayCompositor \
    http://localhost:1313 &

CHROME_PID=$!

echo "✅ Development environment started!"
echo "📋 Chrome DevTools: http://localhost:1313"
echo "🔍 Remote Debugging: http://localhost:9222"
echo ""
echo "💡 To set up DevTools workspace:"
echo "   1. Open DevTools (F12)"
echo "   2. Go to Sources tab"
echo "   3. Click 'Add folder to workspace'"
echo "   4. Select this project folder"
echo ""
echo "Press Ctrl+C to stop both servers..."

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down development environment..."
    kill $HUGO_PID 2>/dev/null
    kill $CHROME_PID 2>/dev/null
    echo "✅ Cleanup complete!"
    exit 0
}

# Set up trap for cleanup
trap cleanup SIGINT SIGTERM

# Wait for processes
wait