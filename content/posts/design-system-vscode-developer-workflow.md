---
title: "The Developer Workflow: VS Code, Autocomplete, and Keeping the System Honest"
description: "Part 3 of 3 — Closing the design system loop with VS Code. How the right extensions bring your token architecture into the editing experience, catch drift before it ships, and make the right choice the easy choice."
date: 2026-04-12T09:00:00-06:00
lastmod: 2026-04-12T09:00:00-06:00
draft: false
tags:
  - design-systems
  - vscode
  - developer-experience
  - design-tokens
  - tooling
categories:
  - design
series:
  - design-system-series
seriesOrder: 3
---

In [Part 1](/posts/building-a-design-system-from-scratch-with-storybook/), we built the component
foundation in Storybook. In [Part 2](/posts/design-system-figma-tokens-single-source-of-truth/),
we connected design tokens to Figma so both tools read from the same `tokens.json` file.

The last gap: the developer's editor.

Even with a sound token architecture, the path of least resistance in a code editor is to type a
hex value. You're looking at a design spec, you see `#0051e0`, you type `#0051e0`. You haven't
broken anything. But you've created a hardcoded value that doesn't update when the token changes,
doesn't communicate intent, and won't be caught by any lint rule unless you've specifically
configured one.

This post is about closing that gap at the point of entry — the moment the developer types.

---

## The Three Problems to Solve

There are three distinct failure modes that happen between "token file exists" and "token is used
correctly in production":

**Discovery failure.** The developer doesn't know which token to use. They know `--color-accent`
exists somewhere, but they can't remember the exact name, so they open `tokens.css`, search for
blue, find the hex, and type the hex. Token unused.

**Recall failure.** The developer knows tokens exist and wants to use them, but typing
`var(--color-` and waiting for autocomplete to surface 40 options is slower than typing a hex
value they know. Ergonomics win over discipline.

**Drift detection failure.** A hardcoded value gets committed. Nobody notices. Three months later
it's inconsistent with the token that "should have been used" and nobody knows if it was
intentional or a mistake.

VS Code's extension ecosystem has a direct answer to all three.

---

## Extension 1: CSS Variable Autocomplete

**[CSS Variable Autocomplete](https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-css-variables)**
is the most impactful single extension in a token-based workflow. It reads your CSS files, indexes
all custom properties, and provides IntelliSense completions for `var(--` in every supported file
type.

Install it. Then configure it in `.vscode/settings.json` to look at your token file specifically:

```jsonc
// .vscode/settings.json
{
  "cssVariables.lookupFiles": [
    "src/css/theme/tokens.css"
  ],
  "cssVariables.blacklistFolders": [
    "node_modules",
    "public",
    "resources"
  ]
}
```

The next time a developer types `var(--color-` in any CSS, SCSS, HTML, or JS file in the
workspace, they get a filtered autocomplete list from `tokens.css` only. The completion shows
the token name, its resolved value, and — for color tokens — a color swatch inline.

The result: using a token is now *faster* than typing a hex value. That's the ergonomic threshold
you need to cross to make system adoption habitual rather than aspirational.

---

## Extension 2: Inline Color Preview

**[Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)**
is often installed for its hex value decorators — the small color swatch that appears next to
`#0051e0` in your editor. That's useful but not the feature I rely on here.

The feature I configure it for is `var()` resolution. When the extension resolves `var(--color-accent)`
back to its hex value and shows a swatch inline, a hardcoded value and a token value look visibly
different in the editor: the token has a blue swatch via resolution, the hardcoded hex has the
same swatch but no `var()`. They're immediately distinguishable at a glance during code review.

Configuration in `.vscode/settings.json`:

```jsonc
{
  "color-highlight.matchWords": true,
  "color-highlight.matchCssVarStrings": true
}
```

---

## Extension 3: Stylelint With a Token Enforcement Rule

Autocomplete gets you to 90%. The last 10% is the hex value that slips through because the
developer was in a hurry, was working on a quick fix, or simply didn't have the editor set up.
That's where linting comes in.

[Stylelint](https://stylelint.io/) has a plugin ecosystem that includes rules for design token
enforcement. The relevant rule is `plugin/no-unsupported-browser-features` — actually, more
useful here is a custom rule pattern using `declaration-property-value-disallowed-list` to block
specific hardcoded values, or the community plugin
**`stylelint-declaration-use-variable`** to require that specific properties use CSS variables.

A minimal `.stylelintrc.json` configuration:

```json
{
  "extends": ["stylelint-config-standard"],
  "plugins": ["stylelint-declaration-use-variable"],
  "rules": {
    "sh-waqar/declaration-use-variable": [
      ["color", "background-color", "border-color", "outline-color"],
      {
        "ignoreValues": ["transparent", "inherit", "currentColor", "white", "black"]
      }
    ],
    "color-no-invalid-hex": true,
    "color-named": "never"
  }
}
```

What this enforces:

- `color`, `background-color`, `border-color`, and `outline-color` declarations **must** use a
  CSS variable (`var(--)`), not a hardcoded value
- Named colors (like `red`, `blue`) are disallowed entirely
- Hex values on color properties will fail the lint check

With this rule active, a `git push` that introduces `color: #0051e0` directly in a component
fails the lint step in CI. The correct form is `color: var(--color-accent)`.

The rule's `ignoreValues` list covers the legitimate exceptions: `transparent` backgrounds,
`currentColor` for icon fills, `inherit` for typography inheritance chains. These are semantic
values, not design decisions — they shouldn't require a token.

---

## The `.vscode` Workspace Config as a System Artifact

Treat your `.vscode/settings.json` and `.vscode/extensions.json` as first-class design system
artifacts. They're the mechanism by which the system installs itself on a new contributor's
machine.

A complete `.vscode/extensions.json` for this stack:

```json
{
  "recommendations": [
    "vunguyentuan.vscode-css-variables",
    "naumovs.color-highlight",
    "stylelint.vscode-stylelint",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint"
  ]
}
```

When a developer clones the repo and opens it in VS Code, the editor prompts: *"This workspace
has recommended extensions. Install all?"* One click, and they have the token-aware editing
environment without needing a setup guide.

This matters because the weakest link in any design system is the onboarding experience. If using
the system correctly requires knowing to install four specific extensions and configure them in
five specific ways, most developers will skip it. If the correct setup arrives automatically on
`git clone`, correctness is the default state.

---

## Connecting Storybook to VS Code

One last integration worth setting up: the Storybook development server running in a VS Code
task, available via the command palette without leaving the editor.

In `.vscode/tasks.json`, alongside your Hugo and PostCSS tasks:

```json
{
  "label": "📦 Storybook",
  "type": "shell",
  "command": "npm run storybook",
  "group": "build",
  "isBackground": true,
  "presentation": {
    "reveal": "silent",
    "panel": "dedicated"
  },
  "problemMatcher": {
    "pattern": {
      "regexp": "^(ERROR|WARN):(.*)$",
      "severity": 1,
      "message": 2
    },
    "background": {
      "activeOnStart": true,
      "beginsPattern": "Starting Storybook",
      "endsPattern": "Storybook .* started"
    }
  }
}
```

Now `Ctrl+Shift+B` → "Storybook" starts the component development server without leaving VS Code.
The stories are live at `localhost:6006`. Changes to component files hot-reload immediately.

The practical effect: the designer's Figma file, the component stories, and the production CSS
are all running from the same token values, visible in the same workflow, editable from the same
editor.

{{< storybook-link
    story="pages-blog--series-layout"
    title="Blog Series Layout"
    description="The series layout powering this post — rendered in Storybook with live controls. The same tokens your editor autocompletes from drive every spacing value, color, and typographic scale visible here."
    section="Pages"
>}}

---

## The System in Review

Three posts, three integration points. Here's the full picture:

```
tokens.json  ← single source of truth
    │
    ├── Style Dictionary build
    │       └── src/css/theme/tokens.css  ← consumed by component CSS
    │                                        verified by Stylelint
    │                                        surfaced by CSS Variable Autocomplete
    │
    ├── Token Studio (Figma plugin)
    │       └── Figma variables           ← designer specs
    │           (two modes: Light / Dark)
    │
    └── Storybook stories
            └── localhost:6006            ← component documentation
                (VS Code task)              acceptance criteria
                                            living contract
```

The payoff isn't any single integration. It's the combination: a developer who opens a CSS file
gets autocomplete from the token list. A lint check blocks hardcoded values before they're pushed.
A designer who opens Figma sees the same values. Storybook stories render the same tokens the
browser renders.

When all three systems read from the same file, the system has one failure mode: the file is
wrong. That's a dramatically smaller failure surface than three systems with three possible points
of drift.

---

## The Honest Assessment

This setup takes time to build and more time to maintain. Token Studio's GitHub sync has occasional
edge cases. Style Dictionary's configuration syntax has its own learning curve. Stylelint rules
need tuning to avoid false positives that developers learn to suppress instead of fix.

None of that changes the fundamental case. The alternative — manual sync, no enforcement,
ad-hoc token usage — is a system that degrades over time by default. The token pipeline is a
system that stays consistent over time by default.

For a team of one, it's probably overbuilt. For a team of three or more, it's the minimum viable
infrastructure that keeps the design system from becoming a design suggestion.

Build it once. Let it run.
