---
title: "How I Cut Page Load Times by 72% Without a Single Framework"
description: "A practical walkthrough of the audit-first, vanilla-JS approach that brought three enterprise dashboards from 6-second loads down to 1.7 seconds — inside a corporate IT environment with strict security review."
date: 2026-02-10T09:00:00-06:00
lastmod: 2026-02-10T09:00:00-06:00
draft: false
tags:
  - performance
  - frontend
  - accessibility
  - vanilla-js
  - case-study
categories:
  - engineering
---

When the project brief landed, it read like a reasonable ask: reduce page load times across three
internal dashboards by at least 65% within six months. What the brief *didn't* mention was that the
solution couldn't introduce any new framework dependencies — because every npm package in a corporate
environment is a security review, and security reviews take months.

No React. No Vue. No build pipeline worth its name. The clock was already ticking.

That constraint turned out to be the most useful design brief I've ever received.

---

## Step One: Measure Before You Touch Anything

The single most common frontend performance mistake is reaching for solutions before you understand
the problem. I've seen developers swap out rendering libraries, rewrite entire components, and
refactor routing logic — only to discover the bottleneck was a 2 MB uncompressed image loaded
synchronously in the `<head>`.

The first two weeks of this project were measurement-only. No code. Just data.

I ran every dashboard through:

- **Chrome DevTools Performance tab** — waterfall timing, long task identification, scripting vs.
  rendering vs. painting breakdowns
- **Lighthouse** — not just the score, but the individual opportunity breakdown with estimated
  savings
- **WebPageTest** — filmstrip view to see *when* users perceived the page as usable vs. when it was
  technically "loaded"
- **Network tab with throttling** — simulating the corporate VPN (which was, effectively, a 3G
  connection for half the users on-site)

The audit told the real story: roughly **60% of the load-time problem was three things**.

1. CSS delivered as one 800 KB uncompressed monolith with approximately 70% dead rules
2. A synchronous third-party analytics script loading in the `<head>` before a single pixel painted
3. A global JavaScript bundle that declared every utility function used site-wide, even on pages
   that used two of them

Nothing exotic. Nothing that required a framework to fix.

---

## The Three Changes That Moved the Needle

### 1. Purge and split the CSS

The CSS had accreted over four years of "just add it to the bottom of styles.css." I ran the
stylesheet through PurgeCSS against the actual template markup, removed dead rules, and split the
remaining code into a tiny critical-path inline block and a deferred non-critical file.

**Result: the stylesheet went from 800 KB to roughly 47 KB.** That's not a clever optimization — it's
housekeeping. But housekeeping done rigorously on a legacy codebase creates outsized dividends.

The critical CSS — the rules needed to render above-the-fold content — was inlined directly in
`<head>`. The rest loaded non-render-blocking via `<link rel="preload">` + an `onload` swap.

### 2. Defer everything that isn't the page

The synchronous analytics script was moved to `defer`, and all JavaScript was pushed to
`<script type="module">` at the bottom of `<body>`. Pages that didn't use a JavaScript feature
didn't load that JavaScript — I broke the monolithic bundle into small, page-specific modules that
Hugo's asset pipeline assembled per template.

This alone moved **Time to First Contentful Paint (FCP) from ~4.8 s to ~1.4 s** on the VPN
connection.

### 3. Replace JavaScript-driven layout with CSS custom properties

Several interactive states — expanded sidebar, dark/light panel switches, active indicator
positions — were being managed by JavaScript setting inline styles on DOM nodes, which triggered
layout recalculations on every update.

The fix was to move all variable state to **CSS custom properties** updated on a single root
element. JavaScript only touched `document.documentElement.style.setProperty('--sidebar-state',
'open')` — one assignment, no layout thrash, no querying the DOM for child nodes.

---

## Why "Vanilla-First" Actually Fits Enterprise Constraints

The kneejerk reaction to performance problems in 2026 is to reach for a modern framework with
better tree-shaking, a build tool with smarter bundling, or a rendering library with a virtual DOM.
All of those are legitimately useful tools. But in an environment where every dependency is a
six-month security review, the best dependency is the one you don't have.

CSS custom properties are supported by every browser used in enterprise environments today. Module
scripts are in baseline. The platform has caught up. You don't need a framework to build a fast,
maintainable UI — you need a clear mental model of how rendering works and the discipline to measure
before you change.

The component library I shipped on this project — pure CSS custom properties and vanilla JS modules,
zero npm dependencies — is still the foundation the team builds on today. That longevity is the real
performance win: it never needs upgrading, never breaks on a dependency version bump, and never
requires a JavaScript developer to read changelog notes before a routine content update.

---

## The Numbers That Came Out the Other Side

- Average page load: **~6 s → 1.7 s** on all three dashboards (72% improvement, exceeding the 65%
  target)
- Uncompressed asset weight: reduced by **~41%**
- Reported UI support tickets: down **~30%** in the quarter following launch
- WCAG 2.1 AA compliance: achieved across all updated views

The timeline: six months, one developer, zero framework dependencies added to the security queue.

---

## What This Taught Me About Performance Work

Performance optimization has a reputation as arcane — the domain of obsessives who shave
microseconds. In practice, the highest-impact improvements are almost always obvious once you've
looked at the real data. The discipline is in *making yourself look at the data first*, instead of
reaching for the most interesting technical solution to a problem you haven't yet confirmed exists.

Measure first. Root-cause second. Fix third. Ship fourth. Measure again.

Every bit of that 72% improvement came from that loop. None of it required a new framework.

---

*This work is part of my [S&C Electric Company case study](/portfolio/sandc/). If you're working on
a similar legacy modernization, I'm happy to talk through the approach — [reach out](/contact/).*
