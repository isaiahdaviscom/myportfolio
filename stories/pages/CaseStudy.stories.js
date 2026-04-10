/**
 * Case Study page stories
 * Reflects the cs-* namespace from src/css/pages/case-study.css:
 *   1. Hero (.cs-hero) — cover image, eyebrow, title, chip row
 *   2. Metric tiles (.cs-metrics / .cs-metric-tile)
 *   3. Section heading (.cs-section / .cs-section__*)
 *   4. Prose body (.cs-prose)
 *   5. Callout (.cs-callout)
 *   6. Timeline (.cs-timeline / .cs-timeline__step)
 *   7. Lessons (.cs-lessons / .cs-lesson-card)
 *   8. Figma embed (.cs-figma__*)
 *   9. Theme toggle (.cs-theme-toggle)
 *  10. Related projects (.cs-related)
 *  11. Full composition
 */
export default {
  title: 'Pages/CaseStudy',
  tags: ['autodocs']
};

const IMG = (seed) =>
  `https://images.unsplash.com/photo-${seed}?w=1200&h=600&fit=crop`;

/* ══════════════════════════════════════════════════════════
   1. HERO
   ══════════════════════════════════════════════════════════ */
export const Hero = {
  parameters: { layout: 'fullscreen' },
  render: () => `
    <div class="cs-page">
      <div class="cs-theme-toggle" aria-label="Toggle theme" title="Toggle light/dark mode">
        <svg class="cs-theme-toggle__icon cs-theme-toggle__icon--moon" xmlns="http://www.w3.org/2000/svg"
             width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
      </div>
      <div class="cs-container">
        <section class="cs-hero">
          <p class="cs-hero__eyebrow">Brand Identity &middot; Web Design</p>
          <h1 class="cs-hero__title">Empire Creative Co.</h1>
          <div class="cs-hero__meta">
            <span class="cs-chip cs-chip--muted">2025</span>
            <span class="cs-chip cs-chip--muted">Chicago, IL</span>
            <span class="cs-chip cs-chip--accent">Branding</span>
            <span class="cs-chip cs-chip--accent">Hugo</span>
            <span class="cs-chip cs-chip--accent">Tailwind</span>
          </div>
          <div class="cs-hero__cover">
            <img src="${IMG('1493723843671-1d655e66ac1c')}"
                 alt="Empire Creative Co. case study cover" width="1200" height="600" loading="eager" />
          </div>
        </section>
      </div>
    </div>
  `
};

/* ══════════════════════════════════════════════════════════
   2. METRIC TILES
   ══════════════════════════════════════════════════════════ */
const METRICS = [
  { value: '98', label: 'Lighthouse Score', detail: 'Performance' },
  { value: '2.1s', label: 'First Paint', detail: 'on 3G / mid-range device' },
  { value: '40%', label: 'Bounce Rate Drop', detail: 'vs. previous site' },
  { value: '3×', label: 'Conversion Lift', detail: 'Contact form submissions' }
];

export const MetricTiles = {
  render: () => `
    <div class="cs-page" style="padding: 2rem;">
      <div class="cs-container">
        <div class="cs-metrics">
          ${METRICS.map(m => `
            <div class="cs-metric-tile">
              <span class="cs-metric-tile__value">${m.value}</span>
              <span class="cs-metric-tile__label">${m.label}</span>
              <span class="cs-metric-tile__detail">${m.detail}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `
};

/* ══════════════════════════════════════════════════════════
   3. SECTION HEADING
   ══════════════════════════════════════════════════════════ */
export const SectionHeading = {
  render: () => `
    <div class="cs-page" style="padding: 2rem;">
      <div class="cs-container cs-container--prose">
        <section class="cs-section">
          <p class="cs-section__eyebrow">Discovery</p>
          <h2 class="cs-section__heading">Understanding the problem</h2>
          <div class="cs-prose">
            <p>
              Empire Creative Co. had an outdated website that failed to communicate the quality
              of their work. The site scored 34 on Lighthouse, had no mobile layout, and the CMS
              was too complex for the team to update independently.
            </p>
          </div>
        </section>
        <section class="cs-section">
          <p class="cs-section__eyebrow">Outcome</p>
          <h2 class="cs-section__heading cs-section__heading--sm">Shipped in 3 weeks</h2>
        </section>
      </div>
    </div>
  `
};

/* ══════════════════════════════════════════════════════════
   4. CALLOUT
   ══════════════════════════════════════════════════════════ */
export const Callout = {
  render: () => `
    <div class="cs-page" style="padding: 2rem;">
      <div class="cs-container cs-container--prose">
        <div class="cs-callout">
          <strong>Key insight:</strong> Every component was built token-first —
          colour, spacing, and type scale all derive from a single
          <code>tokens.css</code> source. Changing the brand colour is a one-line edit.
        </div>
        <div class="cs-callout cs-callout--neutral" style="margin-top: 1rem;">
          <strong>Note:</strong> This project did not use a JavaScript framework. The
          interactive elements are vanilla JS with <code>data-*</code> attributes.
        </div>
      </div>
    </div>
  `
};

/* ══════════════════════════════════════════════════════════
   5. TIMELINE
   ══════════════════════════════════════════════════════════ */
const PHASES = [
  { phase: 'Week 1', desc: 'Discovery call, competitor audit, content inventory. Deliverable: sitemap + content brief.' },
  { phase: 'Week 2', desc: 'Token system, component library in Storybook, Figma comps reviewed & approved.' },
  { phase: 'Week 3', desc: 'Hugo build, CMS wiring, Lighthouse pass, staging review.' },
  { phase: 'Launch', desc: 'DNS cutover, redirect map, post-launch audit at 24 h and 7 days.' }
];

export const Timeline = {
  render: () => `
    <div class="cs-page" style="padding: 2rem;">
      <div class="cs-container cs-container--prose">
        <ol class="cs-timeline">
          ${PHASES.map(p => `
            <li class="cs-timeline__step">
              <span class="cs-timeline__phase">${p.phase}</span>
              <p class="cs-timeline__desc">${p.desc}</p>
            </li>
          `).join('')}
        </ol>
      </div>
    </div>
  `
};

/* ══════════════════════════════════════════════════════════
   6. LESSONS
   ══════════════════════════════════════════════════════════ */
const LESSONS = [
  { insight: 'Token-first speeds handoff', detail: 'When tokens are the contract between design and code, review cycles shrink significantly.' },
  { insight: 'CMS simplicity = adoption', detail: 'A CMS the client can\'t use independently is a support ticket waiting to happen.' },
  { insight: 'Lighthouse gates ship dates', detail: 'Running Lighthouse as a CI check prevented three performance regressions before launch.' }
];

export const LessonCards = {
  render: () => `
    <div class="cs-page" style="padding: 2rem;">
      <div class="cs-container cs-container--prose">
        <div class="cs-lessons">
          ${LESSONS.map(l => `
            <div class="cs-lesson-card">
              <p class="cs-lesson-card__insight">${l.insight}</p>
              <p class="cs-lesson-card__detail">${l.detail}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `
};

/* ══════════════════════════════════════════════════════════
   7. FIGMA EMBED
   ══════════════════════════════════════════════════════════ */
export const FigmaEmbed = {
  render: () => `
    <div class="cs-page" style="padding: 2rem;">
      <div class="cs-container cs-container--prose">
        <details class="cs-figma__details">
          <summary class="cs-figma__summary">
            <span class="cs-figma__summary-left">
              <svg class="cs-figma__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M5.33 2h2.67v2.67H5.33V2z M8 2h2.67v2.67a1.33 1.33 0 01-2.67 0V2z
                         M5.33 4.67H2.67A1.33 1.33 0 002 6v0a1.33 1.33 0 001.33 1.33h2V4.67z
                         M5.33 7.33H8v2.67H5.33V7.33z M5.33 10H8v1.33A2.67 2.67 0 015.33 14v-4z"
                      fill="currentColor"/>
              </svg>
              <span class="cs-figma__label">View Figma prototype</span>
            </span>
            <span class="cs-figma__summary-right">
              <span class="cs-figma__badge">Interactive</span>
              <span class="cs-figma__hint">Click to expand</span>
              <svg class="cs-figma__chevron" width="16" height="16" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </span>
          </summary>
          <div class="cs-figma__frame-wrap">
            <div class="cs-figma__loading" aria-hidden="true">
              <div class="cs-figma__loading-icon"></div>
            </div>
            <div style="padding: 2rem; text-align: center; color: var(--color-text-muted); font-size: 0.875rem;">
              Figma embed placeholder — real embed uses an &lt;iframe&gt; with the Figma share URL
            </div>
          </div>
        </details>
      </div>
    </div>
  `
};

/* ══════════════════════════════════════════════════════════
   8. RELATED PROJECTS
   ══════════════════════════════════════════════════════════ */
const RELATED = [
  { title: 'IGA Supermarkets', role: 'UI Design', href: '#', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop' },
  { title: 'Isaiah Davis Designs', role: 'Portfolio', href: '#', img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=400&fit=crop' }
];

export const RelatedProjects = {
  render: () => `
    <div class="cs-page" style="padding: 2rem;">
      <div class="cs-container">
        <section class="cs-related">
          <header class="cs-related__header">
            <p class="cs-related__label">More work</p>
            <h2 class="cs-related__title">Related projects</h2>
            <a href="/portfolio/" class="cs-related__link">View all →</a>
          </header>
          <ul class="related-projects__grid">
            ${RELATED.map(p => `
              <li>
                <a href="${p.href}" class="card related-projects__card">
                  <picture><img src="${p.img}" alt="${p.title}" /></picture>
                  <div class="card-img-overlay">
                    <p class="related-projects__role">${p.role}</p>
                    <h3 class="related-projects__title">${p.title}</h3>
                  </div>
                </a>
              </li>
            `).join('')}
          </ul>
        </section>
      </div>
    </div>
  `
};

/* ══════════════════════════════════════════════════════════
   9. FULL COMPOSITION
   ══════════════════════════════════════════════════════════ */
export const FullPage = {
  name: 'Full Case Study Composition',
  parameters: { layout: 'fullscreen' },
  render: () => `
    <div class="cs-page">
      <div class="cs-theme-toggle" title="Toggle theme" aria-label="Toggle theme">
        <svg class="cs-theme-toggle__icon cs-theme-toggle__icon--moon" xmlns="http://www.w3.org/2000/svg"
             width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
      </div>
      <div class="cs-container">
        <section class="cs-hero">
          <p class="cs-hero__eyebrow">Brand Identity &middot; Web Design</p>
          <h1 class="cs-hero__title">Empire Creative Co.</h1>
          <div class="cs-hero__meta">
            <span class="cs-chip cs-chip--muted">2025</span>
            <span class="cs-chip cs-chip--accent">Branding</span>
            <span class="cs-chip cs-chip--accent">Hugo</span>
          </div>
          <div class="cs-hero__cover">
            <img src="${IMG('1493723843671-1d655e66ac1c')}" alt="Empire Creative Co." width="1200" height="600" loading="eager" />
          </div>
        </section>
        <div class="cs-metrics">
          ${METRICS.map(m => `
            <div class="cs-metric-tile">
              <span class="cs-metric-tile__value">${m.value}</span>
              <span class="cs-metric-tile__label">${m.label}</span>
              <span class="cs-metric-tile__detail">${m.detail}</span>
            </div>`).join('')}
        </div>
      </div>
      <div class="cs-container cs-container--prose">
        <section class="cs-section">
          <p class="cs-section__eyebrow">Discovery</p>
          <h2 class="cs-section__heading">Understanding the problem</h2>
          <div class="cs-prose">
            <p>Empire Creative Co. had an outdated site that scored 34 on Lighthouse. No mobile layout, no CMS access, no measurable outcomes tracked.</p>
          </div>
          <div class="cs-callout">
            <strong>Key insight:</strong> Token-first design makes brand updates a one-line change.
          </div>
        </section>
        <section class="cs-section">
          <p class="cs-section__eyebrow">Process</p>
          <h2 class="cs-section__heading">Three-week sprint</h2>
          <ol class="cs-timeline">
            ${PHASES.map(p => `
              <li class="cs-timeline__step">
                <span class="cs-timeline__phase">${p.phase}</span>
                <p class="cs-timeline__desc">${p.desc}</p>
              </li>`).join('')}
          </ol>
        </section>
        <section class="cs-section">
          <p class="cs-section__eyebrow">Reflections</p>
          <h2 class="cs-section__heading">Lessons learned</h2>
          <div class="cs-lessons">
            ${LESSONS.map(l => `
              <div class="cs-lesson-card">
                <p class="cs-lesson-card__insight">${l.insight}</p>
                <p class="cs-lesson-card__detail">${l.detail}</p>
              </div>`).join('')}
          </div>
        </section>
      </div>
    </div>
  `
};
