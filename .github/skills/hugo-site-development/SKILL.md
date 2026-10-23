---
name: hugo-site-development
description: "Use when implementing or changing Hugo templates, content, page navigation, data wiring, CSS asset pipelines, or site builds in this repository."
---

# Hugo Site Development

Use this skill for implementation work in the Hugo portfolio.

## Repository patterns

- Inspect both root `layouts/` and `themes/myPortfolio/layouts/` before editing:
  root layouts may override theme layouts.
- Keep content and data-driven values in `content/` or `data/` when existing
  patterns support them; keep reusable markup in theme partials.
- Keep site-specific styles in `src/css/`. Add imports in
  `src/css/tailwind.css` in the established module order.
- Treat `static/css/styles.css` and `static/css/styles.min.css` as generated
  outputs. Regenerate with existing npm scripts rather than editing by hand.
- Maintain anchor correctness: every in-page link must resolve to a unique
  target, and sticky headers/navigation must not obscure the target.
- Preserve semantic HTML, accessible names, keyboard behavior, and Hugo
  front-matter conventions.

## Sticky offsets and jump links

- Single source of truth: each anchor target's `scroll-margin-top`
  (`utilities/motion.css`, `[id]`) =
  `--header-h + --jumplinks-offset + space`. Never add `scroll-padding-top` on
  `html`; it stacks with scroll-margin and double-counts the header.
- `--header-h` and `--jumplinks-offset` are measured at runtime by
  `syncStickyOffsets()` in `partials/foot/js.html`. It must tolerate a missing
  header (plain layouts such as `/links/`). Do not feed the measured value into
  `--jumplinks-h` (the inner min-height).
- Place `partials/jumplinks.html` outside any narrowed wrapper (for example
  `.lk-page`) so the bar spans the full grid and sticks correctly. Order links
  as the sections appear in the DOM.
- The active pill switches when a section's top reaches its own
  `scroll-margin-top`; the page bottom selects the last section.
- After editing `js.html`, rebuild and confirm Hugo parses it: a stray edit
  there breaks every page ("unexpected = in expression"). Re-view the edited
  block, since multi-line `old_str` replacements can leave fragments.

## Data, SEO and print

- Résumé facts live in `data/resume.yaml` and feed `seo-schema.html` (JSON-LD
  via `safeJS`), `llms.txt`/`llms-full.txt` and `print-cv.html`. Change facts
  there, not per template. Keep one JSON-LD source (not in `breadcrumb.html`).
- In descriptions use `trim ... " \n\t"`, not `strings.TrimSpace` (unsupported
  in Hugo 0.132.2).
- Image fields vary by section: portfolio uses `featured_image`; posts have
  none yet. Fall back to `/images/514/isaiahdavis-cover.jpg`.
- The production service worker caches CSS (`portfolio-cache-v…`); when a user
  reports stale styles or print, suggest a hard refresh before debugging.

## Workflow

1. Inspect the current implementation, the closest existing example, and the
   working-tree status.
2. Make the smallest complete change that preserves existing behavior.
3. Run targeted checks first. Use `npm run build:all` for full CSS, JS, and Hugo
   integration validation when the change affects generated assets or templates.
4. Inspect relevant rendered pages and mobile behavior when visual output changes.
5. Report changed source files, checks run, and any limitations.
