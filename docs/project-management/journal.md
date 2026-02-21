# Project Journal

This file logs all requests, actions, and significant changes made to the project for future learning and review.

---

**2025-06-09**
- Journal.md created at project root. All future requests and actions will be appended here.

---

**2025-06-09**
- Provided a comprehensive summary of the project structure, technologies, workflow, customization practices, and best practices for Hugo + Tailwind CSS portfolio development.
- Noted the separation between theme (reusable) and non-theme (site-specific) files and folders.
- Documented the navigation/menu logic and the importance of matching menu entries to content files.
- Confirmed that all requests and actions will continue to be logged here for future learning and review.

---

**2025-06-08 to 2025-06-09**
- Enhanced project structure for clear separation between theme (reusable) and non-theme (site-specific) files and folders.
- Improved README with detailed developer quickstart, best practices, and clear theme vs. non-theme instructions.
- Updated VS Code workspace settings to reflect and clarify the separation of theme and site content, layouts, and assets.
- Created and improved partials for header, footer, gallery, and menu navigation, ensuring accessibility and maintainability.
- Converted Bootstrap classes to Tailwind CSS equivalents and added custom CSS for gallery and card components.
- Implemented a Journal.md file to log all significant requests and actions for future learning and review.
- Audited and fixed navigation/menu logic to ensure all menu links resolve correctly by matching menu entries to content files.
- Added and documented shortcodes and partials for reusable content and layout blocks.
- Provided comprehensive project summary and documentation for future reference and onboarding.
- Next Steps:
  - Continue to log all significant changes, requests, and decisions in Journal.md for a complete project history.
  - Review and test all navigation/menu links after adding or updating content files to ensure no broken links.
  - Expand and document additional shortcodes and partials as new reusable components are created.
  - Consider adding automated tests or a checklist for content and navigation integrity.
  - Refine and document the deployment process (Netlify, Firebase, etc.) for future maintainers.
  - Periodically review and update the README and Journal.md to keep documentation current and useful for onboarding or retrospectives.

---

## 2025-06-13

- Fixed gallery partial to use Hugo's correct range index pattern (range $i, $page := ...), ensuring the first image is not lazy loaded and all others are, improving LCP and performance.

- Ensured all navigation menu items (Home, Portfolio, Blog, About, Contact) are present, correctly linked, and styled with an active state for the current page.

- Verified and created missing content files for navigation pages (about.md, contact.md, portfolio.md, index.md, posts/_index.md) to ensure all menu links resolve to valid pages.

- Improved accessibility and crawlability of navigation by using semantic navigation elements with aria-label and ensuring all anchor tags have valid href attributes.

- Added Font Awesome via CDN to the head partial for icon support across the site.

- Implemented self-hosted Inter font with proper cache headers and updated CSS references for performance and control.

- Updated Netlify cache headers in netlify.toml for /images/*, /css/*, /js/*, and /fonts/* to enable efficient long-term caching of static assets.

- Ensured all gallery images use the picture element for next-gen formats, explicit width/height, and correct lazy loading strategy.

- Maintained accessibility improvements: aria-labelledby, focus-visible outlines, and color contrast in overlays.

- Confirmed that all navigation and gallery features are now working as intended and are production-ready.
