---
title: "Isaiah Davis Designs"
cover: "/images/514/sandc-cover.jpg"
role: "Frontend Developer"
dates: "June 2021 — Present"
heading: "Designing & Building My Own Studio: Isaiah Davis Designs"
bgcolor: "bg-gray-900"
figma_embed: ""  # Paste Figma embed URL: https://www.figma.com/embed?embed_host=share&url=...
figma_title: "Isaiah Davis Designs — Interactive Prototype"
feature: true
weight: 40
employment_type: "Freelance"
location: "Chicago, IL · Remote"
skills:
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

Isaiah Davis Designs is my personal design and development studio — the through-line connecting every client engagement, side project, and experiment I've shipped. Building it wasn't a single sprint; it's an ongoing commitment to practicing what I preach about thoughtful, performance-first web craft.

## The Challenge

The goal was specific: design and build a portfolio and studio site that achieves a Lighthouse performance score above 90 on mobile, passes all Core Web Vitals thresholds, and authentically represents my range of work — all within the first 3 months of launch. Beyond metrics, it needed to function as a living proof-of-concept for every technique I recommend to clients.

## My Role

As **Frontend Developer** and sole owner, I made every decision — information architecture, design system, Hugo theme architecture, CSS build pipeline, image optimization strategy, accessibility audit, and deployment pipeline on Netlify. Nothing was handed off.

## What We Achieved

- Lighthouse mobile score: **94 Performance / 98 Accessibility / 100 Best Practices / 100 SEO** at launch
- All three Core Web Vitals (LCP, CLS, FID) consistently in the **"Good"** range
- Site fully operational within **10 weeks** of first commit, hitting the 3-month target early
- Component library grew to **20+ reusable partials** that reduced per-page authoring time significantly
- Serves as the primary case study shared in every new client discovery call
