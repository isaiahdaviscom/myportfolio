# MyPortfolio CLI Setup Guide

## Overview
The MyPortfolio CLI is a command-line interface for managing your portfolio project. It simplifies common development tasks with an intuitive command structure.

## Installation

### Option 1: Direct Node.js Execution (Recommended)
The CLI is already ready to use via Node.js:

```powershell
# Long form
node cli.js <command>

# Using PowerShell wrapper (aliases)
.\portfolio.ps1 <command>
.\pf.ps1 <command>
```

### Option 2: Global NPM Install (Advanced)
To use the CLI from anywhere, you can set up an npm alias in your `package.json`:

```json
{
  "bin": {
    "portfolio": "cli.js",
    "pf": "cli.js"
  }
}
```

Then run:
```powershell
npm link
```

### Option 3: Windows PATH Setup
Add the project folder to your Windows PATH environment variable to use `portfolio.bat` from anywhere.

## Available Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `dev` | Start Hugo dev server + CSS watch | `portfolio dev` |
| `build` | Build production assets | `portfolio build` |
| `build:dev` | Build with draft content | `portfolio build:dev` |
| `watch` | Watch CSS for changes | `portfolio watch` |
| `clean` | Remove public build directory | `portfolio clean` |
| `serve` | Serve built site locally (port 8080) | `portfolio serve` |
| `fulldev` | Full dev: Hugo + CSS watch + serve | `portfolio fulldev` |
| `help` | Display help and command reference | `portfolio help` |

## Quick Start

### 1. Start Development Server
```powershell
.\portfolio.ps1 dev
```
This starts:
- Hugo development server on `http://localhost:1313`
- CSS watcher for live style updates

### 2. Build for Production
```powershell
.\portfolio.ps1 build
```
Cleans the public directory and builds optimized assets.

### 3. Serve the Built Site
```powershell
.\portfolio.ps1 serve
```
Starts a local server on `http://localhost:8080` to preview your built site.

### 4. Watch CSS Only
```powershell
.\portfolio.ps1 watch
```
Useful when you just want to work on styles.

## Usage Examples

```powershell
# Using PowerShell wrapper (recommended for Windows)
.\portfolio.ps1 dev
.\pf.ps1 build

# Direct Node.js execution
node cli.js dev
node cli.js build:dev

# Using batch file (if added to PATH)
portfolio.bat serve
```

## Keyboard Shortcuts

While running any server command (`dev`, `serve`, `fulldev`):
- **Ctrl+C** - Stop the server

## Troubleshooting

### Command Not Found
- Make sure you're in the project root directory
- Use the full path: `.\portfolio.ps1` or `node cli.js`

### Node.js Not Found
- Install Node.js from https://nodejs.org
- Verify installation: `node --version`

### Hugo Not Found
- Install Hugo from https://gohugo.io
- Add Hugo to your PATH

### npm scripts not found
- Run `npm install` to ensure all dependencies are installed
- Check that `package.json` exists in the project root

## Features

✨ **Color-coded output** - Easy to read status messages
✨ **Parallel execution** - Dev command runs Hugo and CSS watch together
✨ **Automatic cleanup** - Build command cleans old artifacts automatically
✨ **Cross-platform** - Works on Windows, macOS, and Linux
✨ **Multiple aliases** - Use `portfolio`, `pf`, or direct Node.js invocation
✨ **Detailed help** - Run `portfolio help` for full command reference

## Development

To modify the CLI, edit `cli.js`. The script is self-documented with inline comments explaining each command.

### Adding New Commands

1. Open `cli.js`
2. Add a new entry to the `commands` object:

```javascript
newcommand: {
  description: 'What this command does',
  run: async () => {
    header('✨ Starting Command');
    // Your code here
  },
}
```

3. The command is automatically available via `portfolio <command>`

## Architecture

```
myportfolio/
├── cli.js              # Main CLI script (Node.js)
├── portfolio.ps1       # PowerShell wrapper
├── pf.ps1              # Short alias (PowerShell)
├── portfolio.bat       # Windows batch wrapper
├── CLI_SETUP.md        # This file
├── package.json        # NPM scripts config
└── ... (rest of project)
```

---

**Happy coding! 🚀**
