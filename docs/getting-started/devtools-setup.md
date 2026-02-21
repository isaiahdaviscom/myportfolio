# Chrome DevTools Workspace Setup

This project is now configured for automatic Chrome DevTools workspace integration, enabling seamless debugging and live editing capabilities.

## 🚀 Quick Start

### Option 1: VS Code Launch Configuration
1. Open the project in VS Code
2. Press `F5` or go to Run & Debug
3. Select "Hugo + Chrome DevTools" from the dropdown
4. This will automatically start Hugo server and Chrome with DevTools

### Option 2: Manual Tasks
1. **Start Hugo Server**: `Ctrl+Shift+P` → "Tasks: Run Task" → "Hugo Server with DevTools"
2. **Start Chrome**: `Ctrl+Shift+P` → "Tasks: Run Task" → "Start Chrome with Remote Debugging" 
3. **Or run both**: `Ctrl+Shift+P` → "Tasks: Run Task" → "Full Development with DevTools"

## 📁 File Structure for DevTools

```
myportfolio/
├── .vscode/
│   ├── launch.json          # Chrome debugging configuration
│   ├── settings.json        # DevTools workspace settings
│   └── tasks.json          # Automated development tasks
├── src/css/
│   └── tailwind.css        # Source CSS (editable in DevTools)
├── static/
│   ├── css/styles.css      # Compiled CSS output
│   └── js/main.js          # JavaScript bundle
└── public/                 # Hugo build output (DevTools target)
```

## ⚙️ Configuration Details

### Launch Configurations
- **Launch Chrome with localhost**: Direct Chrome launch with debugging
- **Attach to Chrome**: Attach debugger to running Chrome instance  
- **Launch Hugo Server & Chrome**: Combined Hugo + Chrome startup
- **Hugo + Chrome DevTools**: Complete development environment

### Tasks Available
- `Hugo Server with DevTools`: Start Hugo on port 1313
- `Start Chrome with Remote Debugging`: Launch Chrome with debugging enabled
- `Watch CSS Changes`: Auto-compile Tailwind CSS on changes
- `Full Development with DevTools`: Complete setup in sequence

### Chrome Settings
- **Debugging Port**: 9222
- **User Profile**: `.chrome-debug-profile/` (isolated profile)
- **Security**: Web security disabled for local development
- **URL**: http://localhost:1313

## 🔧 DevTools Workspace Setup

### Automatic Setup (Recommended)
1. Run any of the launch configurations above
2. Chrome will open with DevTools-ready configuration
3. In DevTools Sources tab, click "Add folder to workspace"
4. Select your project root folder
5. Allow access when prompted

### Manual Chrome Launch
```bash
chrome --remote-debugging-port=9222 --user-data-dir=./.chrome-debug-profile --disable-web-security http://localhost:1313
```

## 🎯 Features Enabled

✅ **Live CSS Editing**: Edit styles directly in DevTools, saved to source files
✅ **JavaScript Debugging**: Full source map support with breakpoints  
✅ **File Synchronization**: Changes sync between DevTools and VS Code
✅ **Hot Reload**: Hugo automatically rebuilds on file changes
✅ **Source Mapping**: Compiled files map back to source locations
✅ **Network Debugging**: Monitor all requests and responses
✅ **Performance Profiling**: CPU, memory, and rendering analysis

## 🔍 Usage Tips

### CSS Development
- Edit CSS directly in DevTools Elements panel
- Changes are saved to `src/css/tailwind.css`
- PostCSS automatically recompiles on save
- Use DevTools color picker and visual editors

### JavaScript Debugging  
- Set breakpoints in original source files
- Use console for live JavaScript execution
- Profile performance with DevTools Performance tab

### Hugo Development
- Templates changes trigger automatic reload
- Content changes are reflected immediately
- Use DevTools Network tab to debug asset loading

## 🚨 Troubleshooting

### Chrome Won't Connect
- Ensure port 9222 isn't in use: `netstat -an | findstr :9222`
- Try closing all Chrome instances and restarting
- Check Windows Firewall isn't blocking the port

### Files Not Syncing
- Verify workspace folder is added in DevTools Sources
- Check file permissions on the project directory
- Ensure Hugo server is running on localhost:1313

### Source Maps Not Working
- Verify PostCSS is generating source maps
- Check Hugo is building with development settings
- Ensure files are served from localhost (not file://)

## 📋 Commands Reference

### VS Code Commands
- `F5`: Start debugging
- `Ctrl+Shift+P` → "Tasks: Run Task": Run any configured task
- `Ctrl+Shift+D`: Open Run & Debug panel

### Chrome DevTools
- `F12`: Open/close DevTools
- `Ctrl+Shift+C`: Element inspector
- `Ctrl+Shift+J`: Console
- `Ctrl+Shift+I`: DevTools (alternative)

This setup provides a professional development environment with seamless integration between VS Code, Hugo, and Chrome DevTools for efficient web development.