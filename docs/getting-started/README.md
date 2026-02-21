# Hugo + Tailwind CSS Portfolio: Developer Quickstart

This guide is focused on making it easy for developers to edit and extend the core parts of this Hugo + Tailwind CSS portfolio project.

---

## Project Structure Overview

### Project Root (Non-Theme)
- **content/**: Markdown files for pages and posts (`_index.md`, `about.md`, etc.)
- **static/**: Static assets (images, compiled CSS, favicon, etc.)
- **src/css/**: Source CSS (Tailwind entry point)
- **public/**: Hugo build output (do not edit manually)
- **archetypes/**: Archetype templates for new content
- **config files**: `hugo.toml`, `netlify.toml`, `package.json`, etc.

### Theme Directory (`themes/myPortfolio/`)
- **layouts/**: All theme templates (base, partials, shortcodes)
  - `_default/`: Base, single, list, home layouts
  - `partials/`: Header, footer, menu, gallery, etc.
  - `shortcodes/`: Custom shortcodes (e.g., `portfolio-cards.html`)
- **assets/**: Theme-specific CSS/JS (processed by Hugo Pipes)
- **static/**: Theme-specific static assets (overrides project static if same path)
- **archetypes/**: Theme archetypes
- **content/**: Theme demo content (optional, not used in production)
- **theme.toml**: Theme metadata

---

## 1. Prerequisites
- [Hugo](https://gohugo.io/getting-started/installing/)
- [Node.js & npm](https://nodejs.org/)

---

## 2. Local Development
**Install dependencies:**
```bash
npm install
```
**Start development server (auto-reloads on changes):**
```bash
npm run start
```

---

## 3. Editing Content (Non-Theme)
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
