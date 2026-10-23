---
name: frontend-accessibility
description: "Use when implementing or reviewing accessible frontend markup, navigation, forms, interactive controls, keyboard behavior, focus states, color contrast, reduced motion, or WCAG conformance in this portfolio."
---

# Frontend Accessibility

Build on the repository's semantic HTML, CSS tokens, and existing interaction
patterns. Accessibility improvements should preserve the visual design and work
without requiring a mouse or a specific display mode.

## Review and implementation

1. Inspect the relevant template/component, styles, and JavaScript together.
2. Prefer native semantic elements and controls. Give controls accessible names,
   valid relationships, and programmatically represented state.
3. Verify keyboard order, visible focus, activation, dismissal, and focus
   restoration for interactive behavior.
4. Check text and control contrast in light and dark modes. Do not rely on color
   alone to communicate status or selection.
5. Respect `prefers-reduced-motion`; provide a static or reduced alternative
   where motion is not essential.
6. For anchors and sticky navigation, confirm every target exists and remains
   visible below fixed or sticky UI.
7. Test the affected behavior at narrow and wide viewports. Use automated
   accessibility checks when available, but do not treat them as a substitute
   for keyboard and rendered-page verification.

## Project specifics

- Focus indicators are a square 2px accent outline with 2px offset and must not
  replace the active/current state indicator (`aria-current="location"`).
- Decorative dials and cover thumbnails use `alt=""` or `aria-hidden`; the link
  or row carries the accessible name. Always-visible thumbnail text needs a
  dark scrim for contrast.
- Native `select` option lists need themed colours and `color-scheme` in dark
  mode so they stay legible.

## Scope and claims

- Follow existing project patterns and make the smallest complete change.
- Do not claim WCAG conformance from a partial automated scan or visual
  inspection alone.
- Report checks actually performed and note any unverified assistive-technology
  behavior.
