/**
 * Home page stories
 * Covers the full BEM system from src/css/pages/home.css:
 *   1. Hero (.home-hero) — dark navy, split layout, stat band
 *   2. Featured Work (.home-work / .home-work-card)
 *   3. CTA card (.home-work-card--cta / .home-work-cta__*)
 *   4. About Teaser (.home-about / .home-service-card)
 *   5. Latest Posts (.home-posts / .home-post-card)
 */
export default {
  title: 'Pages/Home',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' }
};

/* ── Helpers ──────────────────────────────────────────────── */
const IMG = (w, h, seed) =>
  `https://images.unsplash.com/photo-${seed}?w=${w}&h=${h}&fit=crop`;

const STAT = (value, label) => `
  <div class="home-hero__stat">
    <span class="home-hero__stat-value">${value}</span>
    <span class="home-hero__stat-label">${label}</span>
  </div>`;

/* ══════════════════════════════════════════════════════════
   1. HERO
   ══════════════════════════════════════════════════════════ */
export const Hero = {
  render: () => `
    <section class="home-hero">
      <div class="home-hero__inner">
        <div class="home-hero__content">
          <p class="home-hero__eyebrow">Frontend Developer &amp; UI Engineer</p>
          <h1 class="home-hero__name">Isaiah <em>Davis</em></h1>
          <p class="home-hero__tagline">
            I build fast, accessible web experiences —<br>
            focused on measurable outcomes over aesthetic drama.
          </p>
          <div class="home-hero__actions">
            <a href="/portfolio/" class="btn-primary">
              View my work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5"
                      stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a href="/contact/" class="btn-secondary">Get in touch</a>
          </div>
          <div class="home-hero__chips" aria-label="Technologies">
            <span class="home-hero__chip">Hugo</span>
            <span class="home-hero__chip">Tailwind</span>
            <span class="home-hero__chip">Figma</span>
            <span class="home-hero__chip">a11y</span>
            <span class="home-hero__chip">Storybook</span>
          </div>
        </div>
        <div class="home-hero__visual" aria-hidden="true">
          <div class="home-hero__monogram">ID</div>
          <div class="home-hero__ring home-hero__ring--1"></div>
          <div class="home-hero__ring home-hero__ring--2"></div>
          <div class="home-hero__orbit-dot"></div>
        </div>
      </div>
      <div class="home-hero__stats" aria-label="Career highlights">
        <div class="home-hero__stats-list">
          ${STAT('8+', 'Years Experience')}
          ${STAT('40+', 'Projects Shipped')}
          ${STAT('100', 'Lighthouse Score')}
          ${STAT('<2s', 'Load Time Target')}
        </div>
      </div>
    </section>
  `
};

/* ══════════════════════════════════════════════════════════
   2. FEATURED WORK GRID
   ══════════════════════════════════════════════════════════ */
const PROJECTS = [
  { title: 'Empire Creative Co.', role: 'Brand Identity', dates: '2025', img: IMG(800, 600, '1493723843671-1d655e66ac1c') },
  { title: 'IGA Supermarkets', role: 'UI Design · Dev', dates: '2024', img: IMG(800, 600, '1556742049-0cfed4f6a45d') },
  { title: 'Isaiah Davis Designs', role: 'Portfolio · Motion', dates: '2024', img: IMG(800, 600, '1467232004584-a241de8bcf5d') }
];

function workCard({ title, role, dates, img, featured = false }) {
  return `
    <a href="#" class="home-work-card${featured ? ' home-work-card--featured' : ''}">
      <img class="home-work-card__img" src="${img}" alt="${title}" loading="lazy" width="800" height="600">
      <div class="home-work-card__overlay">
        <p class="home-work-card__role">${role}</p>
        <h3 class="home-work-card__title">${title}</h3>
        <p class="home-work-card__dates">${dates}</p>
      </div>
    </a>
  `;
}

export const FeaturedWork = {
  render: () => `
    <section class="home-work" style="padding-block: 4rem;">
      <div class="home-work__inner" style="max-width: 1200px; margin-inline: auto; padding-inline: 2rem;">
        <div class="home-work__header">
          <p class="home-section-eyebrow">Selected Work</p>
          <h2 class="home-section-heading">What I've built</h2>
          <a href="/portfolio/" class="home-work__view-all">View all projects →</a>
        </div>
        <div class="home-work__grid home-work__grid--trio">
          ${PROJECTS.map((p, i) => workCard({ ...p, featured: i === 0 })).join('')}
        </div>
      </div>
    </section>
  `
};

/* ══════════════════════════════════════════════════════════
   3. CTA CARD
   ══════════════════════════════════════════════════════════ */
export const CtaCard = {
  render: () => `
    <div style="padding: 2rem; max-width: 420px;">
      <a href="/contact/" class="home-work-card home-work-card--cta">
        <div class="home-work-cta__bg" aria-hidden="true">
          <div class="home-work-cta__ring home-work-cta__ring--1"></div>
          <div class="home-work-cta__ring home-work-cta__ring--2"></div>
          <div class="home-work-cta__ring home-work-cta__ring--3"></div>
        </div>
        <div class="home-work-cta__body">
          <div class="home-work-cta__badge">
            <span class="home-work-cta__badge-dot"></span>
            Open to work
          </div>
          <h3 class="home-work-cta__headline">Let's build something together</h3>
          <p class="home-work-cta__sub">Frontend development, UI design, and design systems.</p>
          <div class="home-work-cta__stats">
            <div class="home-work-cta__stat">
              <span class="home-work-cta__stat-value">8+</span>
              <span class="home-work-cta__stat-label">Years</span>
            </div>
            <div class="home-work-cta__stat">
              <span class="home-work-cta__stat-value">40+</span>
              <span class="home-work-cta__stat-label">Projects</span>
            </div>
          </div>
          <span class="home-work-cta__btn">Start a conversation →</span>
        </div>
      </a>
    </div>
  `
};

/* ══════════════════════════════════════════════════════════
   4. ABOUT TEASER + SERVICE CARDS
   ══════════════════════════════════════════════════════════ */
const SERVICES = [
  { icon: '⚡', title: 'Frontend Dev', desc: 'Performant, accessible HTML/CSS/JS — built to last.' },
  { icon: '🎨', title: 'UI Design', desc: 'Token-driven design systems with Figma + Storybook.' },
  { icon: '📐', title: 'Architecture', desc: 'Scalable CSS + component strategies for growing teams.' }
];

export const AboutTeaser = {
  render: () => `
    <section class="home-about" style="padding-block: 4rem;">
      <div class="home-about__inner" style="max-width: 1200px; margin-inline: auto; padding-inline: 2rem;">
        <div class="home-about__content">
          <p class="home-section-eyebrow">About</p>
          <h2 class="home-section-heading">Craft meets clarity</h2>
          <p class="home-about__bio">
            Frontend developer and UI engineer with 8+ years building fast, accessible web
            experiences. I care deeply about design systems, performance, and shipping work that
            makes a measurable difference.
          </p>
          <a href="/about/" class="home-about__link">More about me →</a>
        </div>
        <div class="home-about__services">
          ${SERVICES.map(s => `
            <div class="home-service-card">
              <div class="home-service-card__icon" aria-hidden="true">${s.icon}</div>
              <h3 class="home-service-card__title">${s.title}</h3>
              <p class="home-service-card__desc">${s.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `
};

/* ══════════════════════════════════════════════════════════
   5. LATEST POSTS
   ══════════════════════════════════════════════════════════ */
const POSTS = [
  { date: 'Apr 8, 2026', title: 'Building a Design System from Scratch with Storybook', summary: 'How Storybook-first development creates a living UI inventory for your team.', href: '#' },
  { date: 'Apr 10, 2026', title: 'Design Tokens & Figma: Single Source of Truth', summary: 'Connecting W3C DTCG tokens to both your CSS and Figma library.', href: '#' },
  { date: 'Apr 12, 2026', title: 'Design System Developer Workflow in VS Code', summary: 'Autocomplete, linting, and tasks that keep your token usage consistent.', href: '#' }
];

export const LatestPosts = {
  render: () => `
    <section class="home-posts" style="padding-block: 4rem;">
      <div class="home-posts__inner" style="max-width: 1200px; margin-inline: auto; padding-inline: 2rem;">
        <div class="home-posts__header">
          <p class="home-section-eyebrow">Writing</p>
          <h2 class="home-section-heading">Latest posts</h2>
          <a href="/posts/" class="home-posts__view-all">All posts →</a>
        </div>
        <div class="home-posts__grid">
          ${POSTS.map(p => `
            <a href="${p.href}" class="home-post-card">
              <time class="home-post-card__date">${p.date}</time>
              <h3 class="home-post-card__title">${p.title}</h3>
              <p class="home-post-card__summary">${p.summary}</p>
              <span class="home-post-card__read" aria-hidden="true">Read →</span>
            </a>
          `).join('')}
        </div>
      </div>
    </section>
  `
};
