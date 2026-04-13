---
title: "What Building a Hugo Portfolio Site Taught Me About Static Site Architecture"
description: "I built my own portfolio on Hugo with a custom CLI, PostCSS pipeline, and Netlify deploy workflow. Here's what the process surfaced about static site architecture decisions — and the tradeoffs I'd make differently."
date: 2026-03-12T09:00:00-06:00
lastmod: 2026-03-12T09:00:00-06:00
draft: false
tags:
  - hugo
  - static-sites
  - architecture
  - performance
  - tooling
categories:
  - engineering
---

I've built and shipped production sites on Hugo, Webflow, and WordPress. When it came time to build
my own portfolio, the choice of Hugo wasn't sentimental — it was a deliberate architectural
decision with specific tradeoffs I wanted to live with.

After building it, writing the content workflow tooling, integrating a PostCSS pipeline, and
tuning the CI/CD deployment to Netlify, I have more opinions about static site architecture than
I started with. Some of them surprised me.

---

## Why Hugo, Not a Framework

The default answer in 2026 is often Next.js or Astro — both genuinely capable tools. My reasoning
for Hugo came down to three factors:

**Build speed at scale.** Hugo builds this site, with all its content, partials, and shortcodes,
in under 300ms. A React-based SSG framework building the same content would take multiple seconds
minimum. For a content-heavy project where you're rebuilding on every `pf serve` cycle, 300ms vs.
4 seconds is the difference between a tight feedback loop and a friction-taxed workflow.

**Zero JavaScript runtime by default.** Hugo produces static HTML with no client-side JavaScript
payload unless you explicitly add it. For a portfolio site — primarily read-only, no auth, no
user state — this is the correct default. The page loads at the speed of HTML delivery, not at the
speed of JavaScript hydration.

**Go template syntax forces render discipline.** Hugo's templates are explicit: you can only render
what you have. There's no component lifecycle, no useEffect, no client-side fetch in the render
path. Every data access is either from front matter, from the content directory, or from a data
file you've explicitly loaded. This forces a clean separation between content, data, and rendering
that I find easier to reason about at maintenance time.

---

## The Content Architecture Decisions That Matter Most

The single most important architectural decision in a Hugo project isn't the theme setup or the
build pipeline — it's the content type structure and how it maps to your URL scheme.

I got this mostly right but made one mistake early: I created a `portfolio` section and a `posts`
section before deciding how I wanted to handle *related content* between them. A portfolio piece
and a blog post about the same project are semantically related but structurally separate in Hugo's
taxonomy system.

The right answer, which I arrived at eventually, is to link them explicitly via front matter rather
than trying to make Hugo's automatic `related` content system do the work. A portfolio entry has a
`posts` array in its front matter pointing to related blog posts; a blog post has a `portfolio`
param pointing back. Explicit beats implicit for cross-section relationships in Hugo.

---

## The Template Hierarchy Is Your API

Hugo's template lookup order is one of the more counterintuitive parts of the system for developers
coming from component-based frameworks. It resolves templates by walking a priority list:
`layouts/portfolio/single.html` → `layouts/_default/single.html` → theme equivalents of both.

Once you internalize this, it becomes a powerful API. The `_default` templates become your
baseline; section-specific templates override precisely what needs to be different. The result is
very little duplication — a portfolio `single.html` only contains what makes a portfolio page
different from a default page, and inherits everything shared via the `baseof.html` base template.

The mistake I see developers make is overriding too much — rewriting an entire `single.html` when
they only needed to change the `<article>` container. Use partials aggressively for the pieces
that vary; keep the base template stable.

---

## PostCSS + Tailwind + Hugo: The Integration That Actually Works

The PostCSS pipeline is not built into Hugo — it runs as a separate process that watches
`src/css/tailwind.css` and outputs to `static/css/styles.css`. Hugo watches `static/` and
hot-reloads when that file changes.

This is the correct architecture. Hugo's built-in asset pipeline (`hugo.Pipes`) can process CSS,
but it introduces a build-time coupling that slows down the iteration loop when you want to change
a Tailwind utility. Running PostCSS as a parallel process — CSS watch in one terminal, Hugo server
in another — keeps both loops independent and fast.

The practical implementation: my `pf serve` command spawns both processes and merges their output
streams with labeled prefixes so I can tell Hugo log lines from PostCSS log lines in a single
terminal. The whole setup is in `cli.js`; the key insight is that the two processes can be fully
independent.

---

## The Custom CLI Was Worth Building

I built a CLI (`pf`) that wraps the common dev tasks: `pf serve`, `pf build`, `pf new post
<slug>`, `pf lint`, `pf format`, `pf clean`, `pf status`. It runs on Node.js and spawns the
underlying tools with curated output formatting — suppressing the noise, preserving the signal,
adding color-coded prefixes.

The value isn't the features. Any of these tasks could be run with `npm run x`. The value is
**reduced cognitive load during active development**. When every common action has a consistent
interface, a consistent output format, and a predictable location in the mental model, you stop
thinking about the tooling and start thinking about the work.

The most-used command by a large margin: `pf new portfolio <slug>` and `pf new post <slug>`.
Having slug input validation — `pf new post ../../../something` fails with a clear error — and
clean front matter scaffolding from archetypes means the creative work starts immediately after
running the command, not after looking up the right front matter structure.

---

## The Tradeoffs I'd Make Differently

**Structured data from the start.** I added the `structured-data.html` partial late in the
project. JSON-LD for `WebSite`, `Person`, `WebPage`, and `BreadcrumbList` schemas should be in
the base template from day one — it's table stakes for search visibility and almost free to
implement if you do it before you have dozens of content types.

**Content modeling before theming.** I built the visual layer of several partials before fully
deciding what data they'd receive. Some partials were rewritten when the content model clarified.
Time spent on content modeling — what front matter does each content type have, how will it be
queried and displayed — is recovered in reduced rework downstream.

**Separate dev and prod Hugo configs from the beginning.** Hugo supports multiple config files
(`hugo.toml` + `config.development.toml`). Using this from day one — draft content on in dev,
robots blocked in dev, analytics disabled in dev — prevents the category of mistake where you
accidentally publish draft content or run production analytics on localhost.

---

## What Static Sites Are Actually Good At

Static sites are excellent at: content with infrequent updates, high-traffic read paths with
predictable content, projects where performance is a first-class constraint, and anything where
the content editing workflow can tolerate a deploy cycle.

They are not excellent at: authenticated experiences, user-generated content, real-time data,
per-user personalization at scale. For those needs, the JAMstack pattern of a static edge layer
backed by serverless functions and external APIs is often the right answer — but it's meaningfully
more complex than a pure static build.

For a portfolio: pure static is the right answer. The constraints are a perfect fit. The
performance is essentially free. The security surface is minimal. The deployment is a git push.

---

*This site is built with Hugo. If you're starting a Hugo project and have questions about
architecture decisions, I'm happy to compare notes — [get in touch](/contact/).*
