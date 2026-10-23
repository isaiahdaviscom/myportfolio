---
name: site-build-verification
description: "Use when validating, building, linting, or reporting the status of changes to this Hugo portfolio."
---

# Site Build Verification

Use this skill before claiming that a site change builds or passes validation.

## Validation commands

- CSS-only changes: run Stylelint on changed source CSS, then
  `npm run build:css`.
- Template/content changes: run `npm run build:hugo`.
- Source JavaScript changes: run the applicable ESLint check and `npm run build:js`.
- Cross-cutting changes: run `npm run lint:css` and `npm run build:all`.
- Production changes: use the repository's production pipeline
  (`npm run build:prod`) when validating production-specific assets. A normal
  `build:all` does not by itself prove the production-optimized CSS path.
- Use browser checks for layout, navigation, responsive, or interaction changes.
  Run only checks relevant to the change; do not imply that a build checks
  behavior it does not exercise.

## Verification recipes

- Rebuild sequence for CSS changes: `npm run lint:css`, `npm run build:all`,
  then `npx postcss src/css/tailwind.css -o static/css/styles.min.css --env production`.
  Hugo errors from `js.html` mean a broken edit; fix before anything else.
- Print: `msedge --headless=new --no-pdf-header-footer --print-to-pdf=<file> <url>`
  and read the PDF; screen emulation alone is not proof.
- Jump links: click each link at desktop and ~390px and compare the target
  top with the jumplinks bottom (about 20px gap, no underlap) and check the
  active pill. Header should be about 64px desktop with no blank strip on mobile.
- Playwright through the browser tool: remove `dialog` overlays first, set
  `scrollBehavior='auto'`, wait about 2s after clicks, and capture screenshots
  twice because the first one lags.

## Reporting

- State the exact commands run and their pass/fail status.
- Distinguish build output from browser inspection; do not claim visual checks
  that were not performed.
- Report warnings when they affect the change. Do not treat unrelated existing
  warnings as successful test coverage.
- Check `git diff --check` and avoid overwriting generated or user-owned changes.
- Inspect existing worktree changes before running build steps that rewrite
  generated files; preserve user modifications.
