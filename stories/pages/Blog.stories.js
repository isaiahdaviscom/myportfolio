/**
 * Blog page stories
 * Covers the full bs-* / blog-* BEM system from src/css/pages/blog.css:
 *   1. BlogCard — list page item (.blog-card)
 *   2. BlogList — full list grid (.blog-list / .blog-list__grid)
 *   3. PostHero — single post hero (.bs-hero)
 *   4. SeriesSidebar — series TOC (.bs-series / .bs-series-layout)
 *   5. AuthorCard — post author bio (.bs-author)
 *   6. PostNav — prev/next navigation (.bs-post-nav)
 *   7. SeriesPostNav — series-aware nav (.bs-post-nav--series)
 */
export default {
  title: 'Pages/Blog',
  tags: ['autodocs']
};

const IMG = (w, h, seed) =>
  `https://images.unsplash.com/photo-${seed}?w=${w}&h=${h}&fit=crop`;

/* ══════════════════════════════════════════════════════════
   1. BLOG CARD
   ══════════════════════════════════════════════════════════ */
export const BlogCardDefault = {
  name: 'Blog Card — Default',
  render: () => `
    <div style="max-width: 380px; padding: 1rem;">
      <article class="blog-card">
        <div class="blog-card__cover">
          <img src="${IMG(800, 450, '1461749280684-dccba630e2f6')}"
               alt="Building a Design System" width="800" height="450" loading="lazy" />
        </div>
        <div class="blog-card__body">
          <div class="blog-card__categories">
            <span class="blog-card__category">Design Systems</span>
          </div>
          <h3 class="blog-card__title">
            <a href="#" class="blog-card__title-link">
              Building a Design System from Scratch with Storybook
            </a>
          </h3>
          <time class="blog-card__date">April 8, 2026</time>
          <p class="blog-card__summary">
            How Storybook-first development creates a living UI inventory that keeps
            design and engineering in sync.
          </p>
          <a href="#" class="blog-card__read-more">Read more →</a>
        </div>
      </article>
    </div>
  `
};

export const BlogCardNoCover = {
  name: 'Blog Card — No Cover',
  render: () => `
    <div style="max-width: 380px; padding: 1rem;">
      <article class="blog-card">
        <div class="blog-card__body">
          <div class="blog-card__categories">
            <span class="blog-card__category">Workflow</span>
            <span class="blog-card__category">VS Code</span>
          </div>
          <h3 class="blog-card__title">
            <a href="#" class="blog-card__title-link">
              Design System Developer Workflow in VS Code
            </a>
          </h3>
          <time class="blog-card__date">April 12, 2026</time>
          <p class="blog-card__summary">
            Autocomplete, linting, and tasks that keep your token usage consistent on large teams.
          </p>
          <a href="#" class="blog-card__read-more">Read more →</a>
        </div>
      </article>
    </div>
  `
};

/* ══════════════════════════════════════════════════════════
   2. BLOG LIST GRID
   ══════════════════════════════════════════════════════════ */
const POSTS = [
  { title: 'Building a Design System from Scratch with Storybook', cat: 'Design Systems', date: 'April 8, 2026', img: IMG(800, 450, '1461749280684-dccba630e2f6') },
  { title: 'Design Tokens & Figma — Single Source of Truth', cat: 'Design Systems', date: 'April 10, 2026', img: IMG(800, 450, '1493723843671-1d655e66ac1c') },
  { title: 'Design System Developer Workflow in VS Code', cat: 'Workflow', date: 'April 12, 2026', img: null }
];

export const BlogList = {
  parameters: { layout: 'fullscreen' },
  render: () => `
    <div class="blog-list">
      <div style="grid-column: 2 / -2; padding-block: 1rem;">
        <p class="blog-list__intro">
          Articles on frontend development, design systems, and building for the web.
        </p>
        <div class="blog-list__grid">
          ${POSTS.map(p => `
            <article class="blog-card">
              ${p.img ? `<div class="blog-card__cover"><img src="${p.img}" alt="${p.title}" width="800" height="450" loading="lazy" /></div>` : ''}
              <div class="blog-card__body">
                <div class="blog-card__categories">
                  <span class="blog-card__category">${p.cat}</span>
                </div>
                <h3 class="blog-card__title">
                  <a href="#" class="blog-card__title-link">${p.title}</a>
                </h3>
                <time class="blog-card__date">${p.date}</time>
                <p class="blog-card__summary">A short summary of this post goes here — two or three sentences to give readers enough context to decide whether to read it.</p>
                <a href="#" class="blog-card__read-more">Read more →</a>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </div>
  `
};

/* ══════════════════════════════════════════════════════════
   3. POST HERO
   ══════════════════════════════════════════════════════════ */
export const PostHero = {
  parameters: { layout: 'fullscreen' },
  render: () => `
    <div class="bs-page">
      <div class="bs-progress" role="progressbar" aria-hidden="true">
        <div class="bs-progress__fill" style="width: 35%;"></div>
      </div>
      <header class="bs-hero">
        <div class="bs-container">
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <ol class="breadcrumb__list">
              <li class="breadcrumb__item">
                <a class="breadcrumb__link" href="/">Home</a>
                <span class="breadcrumb__sep" aria-hidden="true">/</span>
              </li>
              <li class="breadcrumb__item">
                <a class="breadcrumb__link" href="/posts/">Writing</a>
                <span class="breadcrumb__sep" aria-hidden="true">/</span>
              </li>
              <li class="breadcrumb__item">
                <span class="breadcrumb__current" aria-current="page">Building a Design System</span>
              </li>
            </ol>
          </nav>
          <span class="bs-hero__eyebrow">Design Systems</span>
          <h1 class="bs-hero__title">Building a Design System from Scratch with Storybook</h1>
          <p class="bs-hero__description">
            How Storybook-first development creates a living UI inventory that keeps
            design and engineering in sync across your entire product team.
          </p>
          <div class="bs-hero__meta" role="list" aria-label="Article metadata">
            <time class="bs-chip bs-chip--muted" datetime="2026-04-08" role="listitem">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              April 8, 2026
            </time>
            <span class="bs-chip bs-chip--muted" role="listitem">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              8 min read
            </span>
            <span class="bs-chip bs-chip--muted" role="listitem">1,920 words</span>
            <span class="bs-chip bs-chip--accent" role="listitem">Design</span>
          </div>
          <div class="bs-hero__tags" role="list" aria-label="Topics">
            <span class="bs-tag" role="listitem">#storybook</span>
            <span class="bs-tag" role="listitem">#design-systems</span>
            <span class="bs-tag" role="listitem">#figma</span>
          </div>
        </div>
      </header>
    </div>
  `
};

/* ══════════════════════════════════════════════════════════
   4. SERIES SIDEBAR (two-column layout)
   ══════════════════════════════════════════════════════════ */
const SERIES_PAGES = [
  { order: 1, title: 'Building a Design System from Scratch with Storybook', href: '#', current: true },
  { order: 2, title: 'Design Tokens & Figma — Single Source of Truth', href: '#', current: false },
  { order: 3, title: 'Design System Developer Workflow in VS Code', href: '#', current: false }
];

function seriesSidebar(currentOrder = 1) {
  const total = SERIES_PAGES.length;
  const current = SERIES_PAGES.find(p => p.order === currentOrder);

  const items = SERIES_PAGES.map(p => {
    const isCurrent = p.order === currentOrder;
    return `
      <li class="bs-series__item${isCurrent ? ' bs-series__item--current' : ''}">
        <span class="bs-series__num" aria-hidden="true">${p.order}</span>
        ${isCurrent ? `
          <span class="bs-series__item-body">
            <span class="bs-series__reading-badge" aria-label="You are reading this post">Reading now</span>
            <span class="bs-series__item-title">${p.title}</span>
          </span>
        ` : `<a href="${p.href}" class="bs-series__item-link">${p.title}</a>`}
      </li>`;
  }).join('');

  return `
    <div class="bs-series">
      <header class="bs-series__header">
        <span class="bs-series__eyebrow">Series</span>
        <p class="bs-series__title">Design System Series</p>
        <span class="bs-series__count">Part ${currentOrder} of ${total}</span>
      </header>
      <ol class="bs-series__list" role="list">${items}</ol>
    </div>
  `;
}

export const SeriesSidebarPart1 = {
  name: 'Series Sidebar — Part 1',
  render: () => `
    <div style="max-width: 280px; padding: 1rem;">${seriesSidebar(1)}</div>
  `
};

export const SeriesSidebarPart2 = {
  name: 'Series Sidebar — Part 2',
  render: () => `
    <div style="max-width: 280px; padding: 1rem;">${seriesSidebar(2)}</div>
  `
};

export const SeriesLayout = {
  name: 'Series Two-Column Layout',
  parameters: { layout: 'fullscreen' },
  render: () => `
    <div class="bs-page">
      <main class="bs-body">
        <div class="bs-container">
          <div class="bs-series-layout">
            <aside class="bs-series-sidebar" aria-label="Series: Design System Series">
              ${seriesSidebar(1)}
            </aside>
            <div class="bs-series-main">
              <article class="bs-article prose prose-lg">
                <h2>Introduction</h2>
                <p>
                  A design system is more than a component library. It's a shared language between
                  designers and engineers, expressed through tokens, documented in Storybook, and
                  validated through usage.
                </p>
                <p>
                  In this series we'll build one from scratch — starting with Storybook, connecting
                  Figma tokens as the single source of truth, then wiring up VS Code so developers
                  get autocomplete, linting, and preview as they work.
                </p>
                <h2>Why start with Storybook?</h2>
                <p>
                  Most teams build components inside their app and extract a system later. Storybook
                  forces you to design in isolation, which surfaces API issues early and creates
                  living documentation automatically.
                </p>
              </article>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
};

/* ══════════════════════════════════════════════════════════
   5. AUTHOR CARD
   ══════════════════════════════════════════════════════════ */
export const AuthorCard = {
  render: () => `
    <div class="bs-container bs-container--prose" style="padding: 2rem;">
      <aside class="bs-author" aria-label="About the author">
        <div class="bs-author__avatar" aria-hidden="true">ID</div>
        <div class="bs-author__body">
          <p class="bs-author__name">Isaiah Davis</p>
          <p class="bs-author__bio">
            Frontend Developer &amp; UI Engineer based in Chicago, IL. I build fast, accessible
            web experiences — focused on measurable outcomes over aesthetic drama.
          </p>
          <div class="bs-author__links">
            <a href="/about/" class="bs-author__link">About</a>
            <a href="/portfolio/" class="bs-author__link">Portfolio</a>
            <a href="/contact/" class="bs-author__link">Get in touch</a>
          </div>
        </div>
      </aside>
    </div>
  `
};

/* ══════════════════════════════════════════════════════════
   6 & 7. POST NAVIGATION
   ══════════════════════════════════════════════════════════ */
const CHEVRON_LEFT = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>`;
const CHEVRON_RIGHT = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>`;

export const PostNavGeneric = {
  name: 'Post Nav — Generic (non-series)',
  render: () => `
    <div class="bs-container bs-container--prose" style="padding: 2rem;">
      <nav class="bs-post-nav" aria-label="More posts">
        <p class="bs-post-nav__label">More writing</p>
        <div class="bs-post-nav__grid">
          <a href="#" class="bs-post-nav__item bs-post-nav__item--prev">
            <span class="bs-post-nav__direction">${CHEVRON_LEFT} Previous</span>
            <span class="bs-post-nav__title">An older post that comes before this one</span>
          </a>
          <div class="bs-post-nav__divider"></div>
          <a href="#" class="bs-post-nav__item bs-post-nav__item--next">
            <span class="bs-post-nav__direction">Next ${CHEVRON_RIGHT}</span>
            <span class="bs-post-nav__title">A newer post that comes after this one</span>
          </a>
        </div>
      </nav>
    </div>
  `
};

export const PostNavSeries = {
  name: 'Post Nav — Series',
  render: () => `
    <div class="bs-container bs-container--prose" style="padding: 2rem;">
      <nav class="bs-post-nav bs-post-nav--series" aria-label="Continue the series">
        <p class="bs-post-nav__label">Continue the series</p>
        <div class="bs-post-nav__grid">
          <a href="#" class="bs-post-nav__item bs-post-nav__item--prev">
            <span class="bs-post-nav__direction">${CHEVRON_LEFT} Part 2</span>
            <span class="bs-post-nav__title">Design Tokens & Figma — Single Source of Truth</span>
          </a>
          <div class="bs-post-nav__divider"></div>
          <a href="#" class="bs-post-nav__item bs-post-nav__item--next">
            <span class="bs-post-nav__direction">Part 3 ${CHEVRON_RIGHT}</span>
            <span class="bs-post-nav__title">Design System Developer Workflow in VS Code</span>
          </a>
        </div>
      </nav>
    </div>
  `
};

export const PostNavSingle = {
  name: 'Post Nav — Single item',
  render: () => `
    <div class="bs-container bs-container--prose" style="padding: 2rem;">
      <nav class="bs-post-nav" aria-label="More posts">
        <p class="bs-post-nav__label">More writing</p>
        <div class="bs-post-nav__grid">
          <a href="#" class="bs-post-nav__item bs-post-nav__item--prev">
            <span class="bs-post-nav__direction">${CHEVRON_LEFT} Previous</span>
            <span class="bs-post-nav__title">Only one adjacent post available</span>
          </a>
        </div>
      </nav>
    </div>
  `
};
