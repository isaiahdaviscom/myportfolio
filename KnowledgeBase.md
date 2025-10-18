# Knowledge Base: Hugo + Tailwind Portfolio Lessons Learned

## Project Structure & Organization

- **Theme vs. Site Separation:**
  - Keep reusable theme files (layouts, partials, assets, shortcodes) in `themes/myPortfolio/`.
  - Place site-specific content, static assets, and layout overrides in the project root (`content/`, `static/`, `layouts/`).
  - Use VS Code workspace folders and documentation to clarify this separation for all contributors.

- **Documentation:**
  - Maintain a detailed `README.md` for onboarding, best practices, and workflow.
  - Use `Journal.md` to log all significant changes, requests, and lessons for future reference and retrospectives.
  - Create a `KnowledgeBase.md` (this file) to summarize key technical lessons and resources.

## Dependency Setup & Tooling

- **Initial Setup:**
  - Install [Node.js](https://nodejs.org/) (LTS recommended).
  - Install [Hugo](https://gohugo.io/getting-started/installing/) (extended version recommended for asset pipeline support).
  - Clone the repository and run the following in the project root:

    ```pwsh
    npm install
    ```

  - This will install all dependencies listed in `package.json` (Tailwind, PostCSS, cssnano, esbuild, etc.).

- **Tailwind CSS & PostCSS:**
  - Tailwind is configured via `postcss.config.js` and `src/css/tailwind.css`.
  - Run `npm run watch` for development (auto-builds CSS on changes).
  - Run `npm run build:css` for a production build (minified, purged CSS).

- **JavaScript:**
  - Custom JS is in `themes/myPortfolio/assets/js/main.js`.
  - Run `npm run build:js` to bundle and minify JS with esbuild.

- **Hugo Tasks:**
  - Use `npm run hugo` or the VS Code task "Hugo: Start Dev Server" for live reload during development.
  - Use `npm run build` or the "Hugo: Build Site" task for a production build.

- **Automation:**
  - Use VS Code tasks (see `.vscode/tasks.json`) for creating new partials, pages, and subdomains via PowerShell scripts.

## Navigation & Menus

- **Menu Configuration:**
  - Define all navigation items in `hugo.toml` under `[[menus.main]]`.
  - Ensure every menu entry has a corresponding content file (e.g., `about.md`, `contact.md`, `portfolio.md`, `posts/_index.md`, `index.md`).
  - Use semantic `<nav aria-label="Main Navigation">` and valid `<a href>` for accessibility and SEO crawlability.
  - Style the active navigation link using Hugo's `.IsMenuCurrent` for clear user feedback (e.g., bold, blue, underline).
  - Test navigation after changes to ensure all links resolve and the active state is correct.

## Content Management

- **Content Files:**
  - Use consistent front matter for metadata (title, description, cover, role, dates, etc.).
  - Organize portfolio items in `content/portfolio/` and blog posts in `content/posts/`.
  - Use `_index.md` for section landing pages (e.g., `/posts`, `/portfolio`).

- **Automation:**
  - Use VS Code tasks and PowerShell scripts to automate creation of new partials and pages from templates for rapid iteration and consistency.

## Templating & Reusability

- **Hugo Range Indexing:**
  - Use `range $i, $page := ...` for index-based logic (e.g., LCP image loading). Avoid `$index = add $index 1` as it does not work in Hugo.
  - Use partials and shortcodes for reusable layout and content blocks (e.g., gallery, portfolio-cards, header, footer, menu).
  - Document all custom shortcodes and partials in a reference file for easy reuse.

## Accessibility

- **Navigation:**
  - Use `aria-label` on nav elements and `aria-labelledby` on interactive elements for screen reader support.
  - Add skip links for keyboard users.
  - Ensure all anchor tags have valid `href` attributes and are not missing or using JavaScript.
  - Use focus-visible outlines and strong color contrast in overlays and badges.

- **Content:**
  - Use semantic HTML and headings for structure.
  - Avoid inline HTML in markdown unless necessary for forms or advanced layouts.

## Performance & Optimization

- **Images:**
  - Use `<picture>` for next-gen image formats (WebP), with fallback to JPEG/PNG.
  - Set explicit `width` and `height` on images for layout stability.
  - Use `loading="lazy"` and `decoding="async"` for all images except the LCP (first) image, which should load eagerly.
  - Use Hugo image processing for resizing and optimizing images before deployment.

- **Fonts:**
  - Self-host fonts (e.g., Inter) in `static/fonts/` and reference them in CSS for full cache control and performance.
  - Add cache headers for `/fonts/*` in `netlify.toml` or `firebase.json`.

- **CSS & JS:**
  - Minify CSS with Tailwind + PostCSS + cssnano (production only).
  - Minify JS with esbuild or Hugo Pipes.
  - Only include necessary JS; remove unused libraries and scripts.

- **Caching:**
  - Add cache headers for `/images/*`, `/css/*`, `/js/*`, `/fonts/*` in `netlify.toml` for efficient static asset caching (1 year, immutable).
  - For third-party fonts, self-host to control caching.

- **LCP & bfcache:**
  - Preload the LCP image if possible.
  - Add a script to prevent back/forward cache restoration for dynamic content:

    ```html
    <script>
    window.addEventListener('pageshow', function(event) {
      if (event.persisted) {
        window.location.reload();
      }
    });
    </script>
    ```

## Icons & Fonts

- **Font Awesome:**
  - Add via CDN in the head partial for easy icon usage throughout the site.
  - Use `<i class="fa ..."></i>` or `<span class="fa ..."></span>` for icons.

- **Inter Font:**
  - Download and self-host WOFF2 files in `static/fonts/`.
  - Reference in `static/css/inter-font.css` and include in the head partial.

## Automation & Developer Workflow

- **VS Code Tasks:**
  - Use tasks for building, watching, and deploying (Hugo, Tailwind, JS minification, Firebase/Netlify deploy).
  - Use tasks and scripts to automate creation of new partials and pages from templates.

- **Documentation:**
  - Keep `Journal.md` up to date with all significant changes, requests, and lessons.
  - Periodically review and update `README.md`, `KnowledgeBase.md`, and other docs for onboarding and best practices.

## Deployment

- **Netlify/Firebase:**
  - Use Netlify or Firebase for static hosting.
  - Configure cache headers for all static assets.
  - Test navigation and content after changes to ensure all links resolve and the active state is correct.
  - Use build scripts to ensure minification and optimization in production.

## Helpful Resources

- [Hugo Documentation](https://gohugo.io/documentation/)
- [Hugo Templates: Range with Index](https://gohugo.io/templates/intro/#the-range-function)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Font Awesome Docs](https://fontawesome.com/docs)
- [Web.dev: Largest Contentful Paint (LCP)](https://web.dev/lcp/)
- [Web.dev: Efficient Cache Policy](https://web.dev/uses-long-cache-ttl/)
- [MDN: picture element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture)
- [MDN: Lazy Loading Images](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)
- [MDN: ARIA Landmarks](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Landmark_Roles)
- [Hugo Pipes (Asset Pipeline)](https://gohugo.io/hugo-pipes/introduction/)
- [Netlify Headers Documentation](https://docs.netlify.com/routing/headers/)
- [Firebase Hosting Headers](https://firebase.google.com/docs/hosting/full-config#headers)

---

**Tips:**

- For rapid iteration, keep the dev server running (`npm run start`) and edit content, layouts, or styles. Hugo and Tailwind will auto-reload your changes.
- Use Journal.md to document all significant actions and lessons for future reference.
- Periodically review and update documentation to keep onboarding and best practices current.
- Test your site in production to verify caching, navigation, accessibility, and performance improvements are working as intended.
