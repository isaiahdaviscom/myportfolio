---
title: "Figma Tokens and the Single Source of Truth"
description: "Part 2 of 3 — How to connect your Storybook design system to Figma without manual syncing. A practical setup for design tokens that live in code and propagate to Figma automatically."
date: 2026-04-10T09:00:00-06:00
lastmod: 2026-04-10T09:00:00-06:00
draft: false
tags:
  - design-systems
  - figma
  - design-tokens
  - storybook
  - tooling
categories:
  - design
series:
  - design-system-series
seriesOrder: 2
---

In [Part 1](/posts/building-a-design-system-from-scratch-with-storybook/), I set up Storybook
as the development environment for the design system — folder structure, token stories, component
API design. By the end of that process, I had a working component library documented in code.

The problem: the designer was still working in Figma with hex values that didn't match my CSS
custom properties. She'd update a primary blue in the Figma library. I'd update `--color-accent`
in `tokens.css`. Two separate changes for one decision.

Every design system eventually hits this wall: your code and your design tool diverge, slowly and
silently, until someone ships a button that's `#0051e0` in production but `#4a90e2` in the
mockup. Nobody knows which is right. Both are wrong.

This post is about eliminating that wall.

---

## The Problem With Manual Sync

Manual token sync fails for a predictable reason: there's no single file to update. When you
change a color token, you have to update:

1. The CSS custom property in `tokens.css`
2. The Figma local color style
3. Any hardcoded values in components you forgot were there
4. The Storybook token documentation story
5. — and then notify the designer that the value changed

Four or five places for one decision. That's four or five opportunities to miss one.

The fix is a format that all three systems — code, Figma, and Storybook — can read from the same
source. That format is the **W3C Design Tokens Format** (DTCG), and the bridge is a tool called
**Token Studio for Figma** paired with **Style Dictionary**.

---

## The Token Architecture

My token file lives at `src/tokens/tokens.json`. It's the single source of truth. Everything
else is generated from it.

```json
{
  "color": {
    "bg": {
      "$value": "#f8f9fc",
      "$type": "color",
      "$description": "Page background — used on html/body"
    },
    "surface": {
      "$value": "#ffffff",
      "$type": "color",
      "$description": "Card and panel surfaces"
    },
    "accent": {
      "$value": "#0051e0",
      "$type": "color",
      "$description": "Primary interactive color — buttons, links, focus rings"
    },
    "accent-hover": {
      "$value": "#003eb0",
      "$type": "color",
      "$description": "Hover state for accent. Passes AA on white."
    },
    "text-primary": {
      "$value": "#0f172a",
      "$type": "color",
      "$description": "Primary body text — 15.3:1 contrast on surface"
    },
    "text-secondary": {
      "$value": "#475569",
      "$type": "color",
      "$description": "Supporting text — 4.6:1 contrast on surface, AA compliant"
    },
    "text-muted": {
      "$value": "#94a3b8",
      "$type": "color",
      "$description": "Decorative / timestamp / metadata text only. Do not use for meaningful content."
    }
  },
  "space": {
    "1":  { "$value": "4px",   "$type": "dimension" },
    "2":  { "$value": "8px",   "$type": "dimension" },
    "3":  { "$value": "12px",  "$type": "dimension" },
    "4":  { "$value": "16px",  "$type": "dimension" },
    "6":  { "$value": "24px",  "$type": "dimension" },
    "8":  { "$value": "32px",  "$type": "dimension" },
    "10": { "$value": "40px",  "$type": "dimension" },
    "12": { "$value": "48px",  "$type": "dimension" },
    "16": { "$value": "64px",  "$type": "dimension" }
  },
  "radius": {
    "sm":  { "$value": "4px",  "$type": "dimension" },
    "md":  { "$value": "8px",  "$type": "dimension" },
    "lg":  { "$value": "12px", "$type": "dimension" },
    "xl":  { "$value": "16px", "$type": "dimension" },
    "full": { "$value": "9999px", "$type": "dimension" }
  }
}
```

Three things to notice:

1. **`$description` on every token.** This is not optional decoration. Token descriptions are the
   documentation. They encode the *intent* — not just the value — so that when someone opens this
   file six months from now, they know why `text-muted` exists and what it's forbidden from doing.

2. **Spacing uses abstract numbers, not pixel labels.** `space.4` is 16px today. If the base unit
   changes, everything changes proportionally. The number is a position in the scale, not a size
   declaration.

3. **No semantic aliases yet.** I'll add those after the base tokens are stable. Aliases like
   `button-background: {color.accent}` come after the source values are settled, not before.

---

## Style Dictionary: Tokens → CSS

[Style Dictionary](https://amzn.github.io/style-dictionary/) is an Amazonian open-source tool
that transforms token files into any format a platform needs: CSS custom properties, Sass
variables, iOS Swift constants, Android XML, and more.

The config lives at `style-dictionary.config.js`:

```js
// style-dictionary.config.js
const StyleDictionary = require('style-dictionary');

module.exports = {
  source: ['src/tokens/tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'color',
      buildPath: 'src/css/theme/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            selector: ':root',
          },
        },
      ],
    },
    // Future: add 'ios', 'android' platforms here
  },
};
```

Running `npx style-dictionary build` outputs `src/css/theme/tokens.css`:

```css
:root {
  /* color */
  --color-bg:             #f8f9fc;
  --color-surface:        #ffffff;
  --color-accent:         #0051e0;
  --color-accent-hover:   #003eb0;
  --color-text-primary:   #0f172a;
  --color-text-secondary: #475569;
  --color-text-muted:     #94a3b8;

  /* space */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-full: 9999px;
}
```

This file is what the PostCSS pipeline imports. More importantly, it's generated — not hand-edited.
You don't touch `tokens.css`. You touch `tokens.json`, run Style Dictionary, and the CSS updates.

{{< storybook-link
    story="components-badge--default"
    title="Badge Component"
    description="The Badge component tokens in action — the same values Style Dictionary generates into CSS. Inspect the source in Storybook to see how token names map directly to rendered output."
    section="Components"
>}}

---

## Token Studio: Tokens → Figma

[Token Studio for Figma](https://tokens.studio/) (formerly Figma Tokens) is a Figma plugin that
reads the same W3C Design Tokens format JSON file and applies it to Figma's local variables.

Setup:

1. **Install Token Studio** from the Figma plugin registry
2. **Connect to your token repository** — Token Studio can sync from a GitHub repository, so the
   `tokens.json` file in your repo *is* the Figma library's source
3. **Map token groups to Figma variable collections** — `color.*` tokens become Color Variables,
   `space.*` tokens become Number Variables
4. **Apply on open** — configure the plugin to push the latest token values every time the Figma
   file is opened

The result: when a token value changes in `tokens.json`, the next time the designer opens the
Figma file, the plugin prompts them to pull the updated values. The primary blue is the same hex
in Figma's variable panel as it is in your deployed CSS.

---

## The Workflow: One Change, All Systems

The updated workflow looks like this:

```
tokens.json
     │
     ├─── npx style-dictionary build ──→ src/css/theme/tokens.css ──→ component CSS
     │                                                                    │
     │                                                                    ▼
     └─── Token Studio (Figma plugin) ──→ Figma variables ──→ designer specs
```

One change propagates to both design and code. Neither side is waiting for the other to manually
update a value.

Practical implications:

- **Designer updates a color in Figma:** they change the Figma variable, which should trigger a PR
  to `tokens.json`. With a [GitHub sync configured in Token Studio](https://docs.tokens.studio/sync/github),
  pushes to the token file happen from inside Figma.
  
- **Developer updates a color in code:** they edit `tokens.json`, run Style Dictionary, and push.
  The designer sees the update next time they open the file.

Which direction does the change originate? Both are valid. The important thing is that neither
direction requires a second manual step to sync the other system.

---

## Dark Mode Without Extra Tokens

Once the token pipeline is established, dark mode is a layer on top of the existing token set —
not a parallel duplicate of it.

```json
{
  "color": {
    "bg":          { "$value": "#f8f9fc", "$type": "color" },
    "surface":     { "$value": "#ffffff", "$type": "color" },
    "text-primary":{ "$value": "#0f172a", "$type": "color" }
  }
}
```

```css
/* Generated light-mode defaults via Style Dictionary */
:root {
  --color-bg:           #f8f9fc;
  --color-surface:      #ffffff;
  --color-text-primary: #0f172a;
}

/* Dark mode — same token names, different resolved values */
[data-theme="dark"] {
  --color-bg:           #0c1525;
  --color-surface:      #0f1e35;
  --color-text-primary: #f1f5f9;
}
```

Components use `var(--color-bg)`. They don't know which mode they're in. The token resolves to the
correct value at the `:root` level. This is why semantic token naming matters: `--color-bg` can
mean something different in dark mode. `--color-f8f9fc` cannot.

In Figma, this maps directly to variable modes. One variable collection, two modes: `Light` and
`Dark`. The designer switches modes in Figma; the developer switches `data-theme` in the DOM.
They're manipulating the same conceptual system, in different tools, with the same vocabulary.

---

## What This Setup Pays Off

After this pipe is in place, three things stop being recurring problems:

**Spec/implementation mismatch.** The designer's blue and the developer's blue are the same blue,
always, because they come from the same file.

**"What's the dark mode value for this?"** It's in the same token file. One lookup, not a
context-switch to a different Figma frame labeled "Dark Mode Specs – DO NOT EDIT."

**Seasonal redesigns.** When the brand color changes, you change one value in `tokens.json`, run
Style Dictionary, push. Both Figma and CSS update from the same commit.

---

## What's Next

The token pipeline is established and Figma is in sync. In
[Part 3](/posts/design-system-vscode-developer-workflow/), I'll close the loop with the developer
side: how VS Code extensions (particularly the CSS Variables Autocomplete and Token Lens plugins)
connect this token architecture directly into the editing experience, so developers are selecting
from the token palette in their IDE rather than guessing hex values from the design file.

*Part 3: [The Developer Workflow: VS Code, Autocomplete, and Keeping the System Honest](/posts/design-system-vscode-developer-workflow/)*
