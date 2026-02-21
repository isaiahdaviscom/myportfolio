# Hugo + Tailwind CSS Portfolio

A modern, performance-optimized Hugo portfolio with comprehensive documentation and automated workflows.

## 📖 **Documentation Hub**

This project features comprehensive documentation organized by topic and workflow:

### 🚀 **[Getting Started](docs/getting-started/)**
- **[Project Overview](docs/getting-started/README.md)** - Main project documentation and setup
- **[CLI Tools Setup](docs/getting-started/cli-setup.md)** - Custom development tools
- **[Development Environment](docs/getting-started/devtools-setup.md)** - VS Code + Chrome DevTools

### 🌐 **[Deployment](docs/deployment/)**
- **[Quick Start Guide](docs/deployment/netlify-quick-start.md)** - 5-minute Netlify deployment
- **[GitHub Integration](docs/deployment/github-integration.md)** - Complete CI/CD automation
- **[Multi-Environment Strategy](docs/deployment/multi-environment.md)** - Dev/staging/production workflow

### ⚙️ **[CI/CD Pipeline](docs/ci-cd/)**
- **[Implementation Status](docs/ci-cd/implementation-status.md)** - Current CI/CD setup
- **[Advanced Features](docs/ci-cd/advanced-features.md)** - Complete CI/CD guide
- **[Future Enhancements](docs/ci-cd/future-enhancements.md)** - Next-generation features

### 🛠️ **[Development](docs/development/)**
- **[CSS Architecture](docs/development/css-architecture.md)** - Modular CSS with Tailwind
- **[Performance Optimization](docs/development/css-optimization.md)** - Tree-shaking and optimization
- **[SEO Protection](docs/development/seo-protection.md)** - Development environment safeguards

### 📝 **[Content Management](docs/content-management/)**
- **[CMS Implementation](docs/content-management/cms-implementation.md)** - NetlifyCMS integration
- **[CMS Usage Guide](docs/content-management/cms-usage-guide.md)** - Content workflow

### 📋 **[Project Management](docs/project-management/)**
- **[Development Journal](docs/project-management/journal.md)** - Project history and changes
- **[Knowledge Base](docs/project-management/knowledge-base.md)** - Technical insights

### 👥 **[Community](docs/community/)**
- **[Contributing Guidelines](docs/community/contributing.md)** - How to contribute
- **[Code of Conduct](docs/community/code-of-conduct.md)** - Community standards

---

## ⚡ **Quick Start**

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run start

# 3. Access your site
open http://localhost:1313
```

## 🎯 **Key Features**

- ✅ **Modern Architecture**: Hugo + Tailwind CSS v4 + PostCSS
- ✅ **Content Management**: NetlifyCMS with multi-environment support
- ✅ **Performance Optimized**: CSS tree-shaking, image optimization
- ✅ **Automated Deployment**: Netlify integration with CI/CD pipeline
- ✅ **Developer Experience**: Hot reload, linting, formatting
- ✅ **Comprehensive Documentation**: Organized guides for every aspect

## 📊 **Project Status**

| Component | Status | Documentation |
|-----------|--------|---------------|
| 🎨 **Frontend** | ✅ Complete | [Development Docs](docs/development/) |
| 🚀 **Deployment** | ✅ Complete | [Deployment Guides](docs/deployment/) |
| 📝 **CMS** | ✅ Complete | [Content Management](docs/content-management/) |
| ⚙️ **CI/CD** | ✅ Complete | [CI/CD Pipeline](docs/ci-cd/) |
| 📖 **Documentation** | ✅ Complete | [All Documentation](docs/) |

---

**Need help?** Start with the [Documentation Hub](docs/README.md) for comprehensive guides and resources.
- **Homepage:**  `content/_index.md`
- **Portfolio:**  `content/portfolio/`
- **Blog Posts:**  `content/posts/`
- **Other Pages:**  `content/about.md`, `content/contact.md`, etc.

---

## 4. Customizing Layouts & Components (Theme)
- **Main Layouts:**  `themes/myPortfolio/layouts/_default/`
- **Homepage Layout:**  `themes/myPortfolio/layouts/_default/home.html`
- **Partials:**  `themes/myPortfolio/layouts/partials/`
- **Shortcodes:**  `themes/myPortfolio/layouts/shortcodes/`

---

## 5. Styling with Tailwind CSS
- **Edit Tailwind source:**  `src/css/tailwind.css`
- **Build CSS:**  `npm run build:css` (or `npm run watch` for auto-rebuild)
- **Link CSS:**  Layouts include `/css/styles.css` from the `static/css/` directory.

---

## 6. Configuration
- **Site-wide settings:**  `hugo.toml` (site title, theme, params, menus, etc.)
- **Theme selection:**  Set `theme = "myPortfolio"` in `hugo.toml`.
- **Menu:**  Define navigation in `hugo.toml` under `[[menus.main]]` and ensure referenced content files exist.

---

## 7. Theme vs. Project Customization
- **To update the theme for all sites:** Edit files in `themes/myPortfolio/`.
- **To override a theme template for this site only:** Copy the file from `themes/myPortfolio/layouts/` to `layouts/` in the project root and edit there.
- **Static assets in `static/` at the project root override theme static assets of the same path.**

---

## 8. Adding New Features
- **New Section/Page:**  Add a Markdown file in `content/` and create/update a layout in `themes/myPortfolio/layouts/`.
- **New Component:**  Add a partial in `themes/myPortfolio/layouts/partials/` and include it in layouts as needed.
- **New Shortcode:**  Add to `themes/myPortfolio/layouts/shortcodes/` and use in Markdown as `{{< shortcode >}}`.

---

## 9. Best Practices & Tips
- **Keep theme and project customizations separate for easier upgrades.**
- **Use shortcodes for reusable content blocks in Markdown.**
- **Use partials for reusable layout components.**
- **Keep the dev server running (`npm run start`) for rapid iteration.**
- **Check the `public/` folder for build output, but do not edit it directly.**

---

## References
- [Hugo Documentation](https://gohugo.io/documentation/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Tip:**
For rapid iteration, keep the dev server running (`npm run start`) and edit content, layouts, or styles. Hugo and Tailwind will auto-reload your changes.

---
