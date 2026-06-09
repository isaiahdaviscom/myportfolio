---
title: "Isaiah Davis Designs"
description: "A custom-built frontend studio showcasing design systems, performance optimization, and component architecture at scale."
date: 2021-06-01T00:00:00Z
draft: false
weight: 40
year: "2021"
client: ""
project_url: "https://isaiahdavis.com"
featured_image: "/images/514/isaiahdavis-cover.jpg"
categories:
  - web-design
tags:
  - design-systems
  - performance
  - frontend
technologies:
  - Hugo
  - Tailwind CSS
  - PostCSS
  - Netlify
  - Figma
  - Performance Optimization
  - Accessibility
  - Hugo
  - Tailwind CSS
  - PostCSS
  - Netlify
  - Figma
  - Performance Optimization
  - Accessibility

metrics:
  - value: "94"
    label: "Lighthouse perf"
    detail: "Mobile score at launch"
  - value: "98"
    label: "Accessibility"
    detail: "Lighthouse a11y score at launch"
  - value: "10wk"
    label: "Time to launch"
    detail: "First commit to live site — 2 weeks early"
  - value: "20+"
    label: "Reusable partials"
    detail: "Component library powering every page"

stack:
  - Hugo
  - Tailwind CSS v4
  - PostCSS
  - Netlify
  - Figma
  - Lighthouse CI

timeline:
  - phase: "Architecture"
    desc: "Designed the full Hugo theme structure, CSS build pipeline, and content model before writing a single component — ensuring the system could grow without refactoring."
  - phase: "Design System"
    desc: "Built a token-driven design system in CSS custom properties with a Tailwind v4 configuration layer, enabling consistent tokens across all 20+ partials."
  - phase: "Build"
    desc: "Developed every page — home, portfolio, about, contact, case studies — with semantic HTML, accessible focus management, and lazy-loaded imagery throughout."
  - phase: "Performance"
    desc: "Ran iterative Lighthouse audits throughout development, optimizing images, deferring non-critical scripts, and tuning the CSS pipeline until all Core Web Vitals landed in the Good range."
  - phase: "Launch & Iteration"
    desc: "Deployed to Netlify with automated CI checks on every push. Site has been continuously improved since launch — the component library now drives every new client engagement."

lessons:
  - insight: "Building your own product teaches you what clients actually need"
    detail: "Every pain point I encountered designing and building this site — unclear content hierarchy, slow iteration cycles, unclear token naming — directly improved how I approach client work."
  - insight: "Lighthouse scores are a proxy for user respect"
    detail: "Chasing 94 Performance wasn't about the number — it was about ensuring the site loads fast on a 4G connection in a coffee shop, which is where clients actually open links."
  - insight: "A reusable component library is never finished — and that's the point"
    detail: "The 20+ partials powering the site aren't a finished product; they're a living system. The willingness to keep extending it is what makes it valuable, not the initial build."
---

Isaiah Davis Designs is my personal design and development studio — the through-line connecting every client engagement, side project, and experiment I've shipped. Building it wasn't a single sprint; it's an ongoing commitment to practicing what I recommend to clients: performance-first architecture, accessible markup, and UI systems that are genuinely maintainable.

This site is built on Hugo, processed through a PostCSS/Tailwind v4 pipeline, and deployed to Netlify with Lighthouse CI checks on every push. The token-driven design system, component library, and content model were all designed before the first component was built — ensuring the system could grow without structural refactoring.

## The Challenge

The goal was specific: design and build a portfolio and studio site that achieves a Lighthouse performance score above 90 on mobile, passes all Core Web Vitals thresholds, and authentically represents my range of work — all within the first 3 months of launch. Beyond the metrics, the site needed to function as a living proof-of-concept for every technique I recommend to clients.

## My Role

As **Frontend Developer and sole owner**, I made every decision — information architecture, design system, Hugo theme architecture, CSS build pipeline, image optimization strategy, accessibility audit, and deployment setup on Netlify. Nothing was handed off or delegated. Every component, every token, every content model decision reflects deliberate choices made under real constraints.

## What We Achieved

- Lighthouse mobile score: **94 Performance / 98 Accessibility / 100 Best Practices / 100 SEO** at launch
- All Core Web Vitals (LCP, CLS, FID) in the **"Good"** range, verified by Lighthouse CI on every push
- Site fully operational in **10 weeks** from first commit — 2 weeks ahead of target
- Component library grew to **20+ reusable partials** powering every page with zero duplicate markup
- Token-driven design system in CSS custom properties covers color, spacing, typography, radius, and shadow — a single source of truth across all 20+ components
- Serves as the primary case study shared in every new client discovery call
