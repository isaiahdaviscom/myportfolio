# MyPortfolio CLI Setup Guide

## Overview
The MyPortfolio CLI is a comprehensive command-line interface for managing your Hugo portfolio project. It integrates the full ecosystem including NetlifyCMS content management, automated workflows, and complete development environment control.

## 🚀 **Quick Start**

```powershell
# Show all available commands
portfolio help

# Start full development environment (Hugo + CSS + CMS)
portfolio fulldev

# Start content management workflow  
portfolio content

# Open CMS admin interface
portfolio cms local        # Local development
portfolio cms prod          # Production environment
```

---

## 📖 **Installation & Setup**

### Option 1: Direct Node.js Execution (Recommended)
The CLI is ready to use via Node.js:

```powershell
# Long form
node cli.js <command>

# Using PowerShell wrapper (if available)
.\portfolio.ps1 <command>
.\pf.ps1 <command>
```

### Option 2: Global NPM Install (Advanced)
Add npm alias in your `package.json` for global access:

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
portfolio help
```

### Option 3: Windows PATH Setup
Add the project folder to your Windows PATH environment variable for global `portfolio.bat` access.

---

## 🎯 **Command Categories**

### 📖 **Core Commands**
| Command | Description | Example |
|---------|-------------|---------|
| `help` | Show complete help with all commands | `portfolio help` |
| `version` | Show version and project information | `portfolio version` |
| `status` | Display project status dashboard | `portfolio status` |
| `info` | Show project info and environment URLs | `portfolio info` |

### 🛠️ **Build Commands**
| Command | Description | Example |
|---------|-------------|---------|
| `build [--prod\|--dev]` | Run build pipeline (default: dev) | `portfolio build --prod` |
| `dev` | Build in development mode | `portfolio dev` |
| `prod` | Build in production mode | `portfolio prod` |
| `clean [level]` | Clean artifacts (light\|deep\|nuclear\|cache) | `portfolio clean deep` |

### 🌐 **Development Commands**
| Command | Description | Example |
|---------|-------------|---------|
| `serve` | Start Hugo development server | `portfolio serve` |
| `watch` | Watch and compile Tailwind CSS | `portfolio watch` |
| `fulldev` | Complete development environment | `portfolio fulldev` |
| `content` | Content management workflow | `portfolio content` |

### 📝 **CMS Commands**
| Command | Description | Example |
|---------|-------------|---------|
| `cms [local\|prod]` | Open CMS interface (auto-detect) | `portfolio cms local` |
| `cms:local` | Start local CMS proxy server | `portfolio cms:local` |
| `cms:admin` | Open local admin interface | `portfolio cms:admin` |
| `cms:prod` | Open production CMS interface | `portfolio cms:prod` |

### 🎯 **Workflow Commands**
| Command | Description | Example |
|---------|-------------|---------|
| `workflow:dev` | Full development workflow | `portfolio workflow:dev` |
| `workflow:content` | Content management workflow | `portfolio workflow:content` |
| `workflow:build` | Complete build and test workflow | `portfolio workflow:build` |

### 🧪 **Quality Commands**
| Command | Description | Example |
|---------|-------------|---------|
| `test` | Run complete test suite | `portfolio test` |
| `lint` | Run all linters (CSS, JS, Markdown) | `portfolio lint` |
| `format` | Format code with Prettier | `portfolio format` |
| `css:audit` | Complete CSS analysis and cleanup | `portfolio css:audit` |

### 📚 **Documentation Commands**
| Command | Description | Example |
|---------|-------------|---------|
| `docs` | Open main documentation hub | `portfolio docs` |
| `docs:quick-start` | Open getting started guide | `portfolio docs:quick-start` |
| `docs:deployment` | Open deployment documentation | `portfolio docs:deployment` |

---

## 🔥 **Common Workflows**

### **🆕 First-Time Setup**
```powershell
# 1. Check project status
portfolio status

# 2. Start development environment
portfolio fulldev

# 3. Open documentation  
portfolio docs:quick-start
```

### **📝 Content Creation Workflow**
```powershell
# 1. Start content management
portfolio content

# 2. Open CMS admin (opens automatically)
# Navigate to: http://localhost:1313/admin/

# 3. Create/edit content in CMS interface
```

### **🚀 Production Deployment Workflow**  
```powershell
# 1. Run complete build workflow
portfolio workflow:build

# 2. Deploy (handled by Netlify automatically)

# 3. Manage production content
portfolio cms prod
```

### **🛠️ Development Workflow**
```powershell
# Option 1: Full development environment
portfolio fulldev              # Hugo + CSS + CMS

# Option 2: Simple development  
portfolio serve                # Hugo only
portfolio watch                # CSS only (separate terminal)

# Option 3: Content-focused
portfolio content              # Hugo + CMS
```

---

## 📊 **Environment Integration**

### **🌐 Environment URLs**
| Environment | Site URL | CMS URL | CLI Command |
|-------------|----------|---------|-------------|
| **Local Development** | `http://localhost:1313` | `http://localhost:1313/admin/` | `portfolio cms local` |
| **Production** | `https://isaiahdavis.com` | `https://isaiahdavis.com/admin/` | `portfolio cms prod` |

### **📝 CMS Integration**
```powershell
# Local CMS Development
portfolio cms:local            # Start CMS proxy server
portfolio cms:admin            # Open local CMS interface

# Production CMS
portfolio cms:prod             # Open production CMS in browser

# Auto-detect environment  
portfolio cms                  # Detects and opens appropriate CMS
```

### **🔄 Multi-Environment Workflows**
```powershell
# Development → Staging → Production
portfolio workflow:dev         # Develop locally
portfolio test                 # Validate changes
portfolio workflow:build       # Production build
# Git push triggers automatic deployment
```

---

## ⚙️ **Advanced Usage**

### **🔧 Build Pipeline Control**
```powershell
# Development builds
portfolio dev                  # Quick development build
portfolio build --dev          # Full development build

# Production builds  
portfolio prod                 # Optimized production build
portfolio build --prod         # Full production build with all optimizations

# Custom build components
npm run build:css              # CSS only
npm run build:js               # JavaScript only  
npm run build:hugo             # Hugo only
```

### **🧹 Project Maintenance**
```powershell
# Cleaning (progressive levels)
portfolio clean light          # Remove build artifacts
portfolio clean deep           # Deep clean including caches
portfolio clean nuclear        # Nuclear clean (everything)
portfolio clean cache          # Cache-specific cleaning

# Code quality
portfolio lint                 # All linters
portfolio format               # Code formatting
portfolio test                 # Complete test suite
```

### **🔍 Project Analysis**
```powershell
# CSS analysis
portfolio css:audit            # Complete CSS audit
npm run css:analyze            # CSS architecture analysis
npm run css:unused             # Unused CSS detection

# Performance testing
npm run test:performance       # Performance analysis
npm run test:security          # Security audit
```

---

## 🎨 **Customization**

### **Adding Custom Commands**
Edit `cli.js` to add project-specific commands:

```javascript
case 'mycustom':
    console.log('🎨 Running custom command...');
    await runProcess('npm', ['run', 'my:custom:script']);
    break;
```

### **Environment Variables**
Set environment-specific configurations:

```powershell
# Development
$env:HUGO_ENV="development"
portfolio dev

# Production
$env:HUGO_ENV="production"  
portfolio prod
```

---

## 🆘 **Troubleshooting**

### **Common Issues**

**CLI not found:**
```powershell
# Use full path
node cli.js help

# Or add to PATH (see installation options)
```

**CMS proxy issues:**
```powershell
# Install globally if missing
npm install -g netlify-cms-proxy-server

# Restart proxy
portfolio cms:local
```

**Build failures:**
```powershell
# Check dependencies
npm install

# Clean and rebuild
portfolio clean deep
portfolio build --dev
```

### **Debug Mode**
```powershell
# Verbose output for build and clean operations
portfolio build --verbose
portfolio clean deep --verbose
```

---

## 📋 **Quick Reference**

### **Most Used Commands**
```powershell
portfolio help                 # 📖 Show all commands
portfolio status               # 📊 Project status  
portfolio fulldev              # 🚀 Complete development
portfolio content              # 📝 Content management
portfolio cms local            # 🌐 Local CMS
portfolio workflow:build       # 🏗️ Production build
portfolio docs                 # 📚 Documentation
```

### **Development Shortcuts**
```powershell
portfolio serve                # Hugo server only
portfolio watch                # CSS watch only
portfolio test                 # Quality checks
portfolio clean                # Quick cleanup
```

---

## 🎯 **Next Steps**

1. **Explore Commands**: Run `portfolio help` to see all available options
2. **Start Development**: Use `portfolio fulldev` for complete environment
3. **Create Content**: Use `portfolio content` to start content management
4. **Read Documentation**: Use `portfolio docs` to access comprehensive guides

---

**The CLI provides a complete development ecosystem for your Hugo portfolio, integrating everything from content management to production deployment in a single, intuitive interface.** 🚀
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
