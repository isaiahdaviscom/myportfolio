/**
 * Scroll Story page stories
 * Reflects the ss-* namespace from src/css/pages/scroll-story.css:
 *   Apple-inspired scroll-narrative layout for case study stories.
 *
 *   1. Progress bar + nav dots (.ss-progress / .ss-nav)
 *   2. Chapter types (.ss-chapter with colour variants)
 *   3. Reveal animations (.ss-reveal / .ss-reveal--up / .ss-reveal--fade)
 *   4. Metric chapter (.ss-metric-* / .ss-counter)
 *   5. Timeline chapter (.ss-timeline / .ss-timeline__step)
 *   6. Outcome tiles (.ss-outcome-tile)
 *   7. CTA group (.ss-cta-group / .ss-btn-outline)
 *   8. Full scroll-story composition
 *
 * Note: ss-reveal animations are triggered by IntersectionObserver in production.
 * Here we force `.is-visible` on all reveals so content is always shown in Storybook.
 */
export default {
  title: 'Pages/ScrollStory',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' }
};

/* ── Helpers ──────────────────────────────────────────────── */
const ARROW = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

/* ══════════════════════════════════════════════════════════
   1. PROGRESS + NAV DOTS
   ══════════════════════════════════════════════════════════ */
export const ProgressAndNav = {
  render: () => `
    <div style="position: relative; height: 400px; background: #0c1525;">
      <div class="ss-progress" style="width: 45%;"></div>
      <nav class="ss-nav" aria-label="Story sections">
        <button class="ss-nav__dot is-active" aria-label="Go to section 1" title="Cover"></button>
        <button class="ss-nav__dot" aria-label="Go to section 2" title="Challenge"></button>
        <button class="ss-nav__dot" aria-label="Go to section 3" title="Process"></button>
        <button class="ss-nav__dot" aria-label="Go to section 4" title="Metrics"></button>
        <button class="ss-nav__dot" aria-label="Go to section 5" title="Outcomes"></button>
      </nav>
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: rgba(255,255,255,0.3); font-size: 0.875rem;">
        Progress bar at 45% — nav dots on the right
      </div>
    </div>
  `
};

/* ══════════════════════════════════════════════════════════
   2. CHAPTER VARIANTS
   ══════════════════════════════════════════════════════════ */
const CHAPTERS = [
  { mod: 'ss-chapter--cover', bg: 'Cover (dark navy)' },
  { mod: 'ss-chapter--slate', bg: 'Slate' },
  { mod: 'ss-chapter--navy', bg: 'Navy' },
  { mod: 'ss-chapter--dark', bg: 'Dark' },
  { mod: 'ss-chapter--green', bg: 'Green' },
  { mod: 'ss-chapter--purple', bg: 'Purple' }
];

export const ChapterVariants = {
  render: () => CHAPTERS.map(c => `
    <section class="ss-chapter ${c.mod}" style="min-height: 200px;">
      <div class="ss-chapter__inner ss-chapter__inner--text">
        <p class="ss-eyebrow ss-reveal ss-reveal--fade is-visible">Chapter variant</p>
        <h2 class="ss-headline ss-reveal ss-reveal--up is-visible">${c.bg}</h2>
        <p class="ss-body ss-reveal ss-reveal--up is-visible">
          This is the <code>${c.mod}</code> variant. Each chapter shifts the background
          to guide the reader through the narrative arc.
        </p>
      </div>
    </section>
  `).join('')
};

/* ══════════════════════════════════════════════════════════
   3. COVER CHAPTER
   ══════════════════════════════════════════════════════════ */
export const CoverChapter = {
  render: () => `
    <section class="ss-chapter ss-chapter--cover" style="min-height: 100vh;">
      <div class="ss-chapter__inner ss-chapter__inner--text" style="padding-block: 6rem;">
        <p class="ss-eyebrow ss-reveal ss-reveal--fade is-visible">Empire Creative Co.</p>
        <h1 class="ss-cover-title ss-reveal ss-reveal--up is-visible">
          Brand identity that actually<br>converts.
        </h1>
        <p class="ss-cover-tagline ss-reveal ss-reveal--up is-visible">
          How a three-week sprint took a legacy site from Lighthouse 34 to 98
          and tripled contact-form conversions.
        </p>
        <div class="ss-scroll-hint ss-reveal ss-reveal--fade is-visible" aria-hidden="true">
          <span class="ss-scroll-dot"></span>
          Scroll to explore
        </div>
      </div>
    </section>
  `
};

/* ══════════════════════════════════════════════════════════
   4. METRIC CHAPTER
   ══════════════════════════════════════════════════════════ */
export const MetricChapter = {
  render: () => `
    <section class="ss-chapter ss-chapter--navy" style="min-height: 100vh;">
      <div class="ss-chapter__inner ss-chapter__inner--metric" style="padding-block: 5rem;">
        <p class="ss-eyebrow ss-reveal ss-reveal--fade is-visible">Performance</p>
        <div class="ss-metric-context ss-reveal ss-reveal--fade is-visible">
          <span class="ss-metric-before">Was 34</span>
          <span class="ss-metric-arrow">→</span>
        </div>
        <div class="ss-metric-number ss-counter ss-reveal is-visible" data-target="98">98</div>
        <p class="ss-metric-label ss-reveal ss-reveal--fade is-visible">
          Lighthouse Performance Score<br>
          <strong>Measured on mobile / 4G connection</strong>
        </p>
      </div>
    </section>
  `
};

/* ══════════════════════════════════════════════════════════
   5. TIMELINE CHAPTER
   ══════════════════════════════════════════════════════════ */
const STEPS = [
  { num: '01', label: 'Discovery — sitemap + content brief' },
  { num: '02', label: 'Token system + Storybook component library' },
  { num: '03', label: 'Hugo build + CMS wiring + Lighthouse pass' },
  { num: '04', label: 'Launch — DNS cutover + post-launch audit' }
];

export const TimelineChapter = {
  render: () => `
    <section class="ss-chapter ss-chapter--slate" style="min-height: 80vh;">
      <div class="ss-chapter__inner ss-chapter__inner--text" style="padding-block: 4rem;">
        <p class="ss-eyebrow ss-reveal ss-reveal--fade is-visible">Process</p>
        <h2 class="ss-headline ss-reveal ss-reveal--up is-visible">Three-week sprint</h2>
        <ol class="ss-timeline ss-reveal is-visible">
          ${STEPS.map(s => `
            <li class="ss-timeline__step">
              <span class="ss-timeline__num">${s.num}</span>
              <span class="ss-timeline__label">${s.label}</span>
            </li>
          `).join('')}
        </ol>
      </div>
    </section>
  `
};

/* ══════════════════════════════════════════════════════════
   6. OUTCOME TILES
   ══════════════════════════════════════════════════════════ */
const OUTCOMES = [
  { value: '98', label: 'Lighthouse Score' },
  { value: '2.1s', label: 'First Contentful Paint' },
  { value: '−40%', label: 'Bounce Rate' },
  { value: '3×', label: 'Form Conversions' }
];

export const OutcomeChapter = {
  render: () => `
    <section class="ss-chapter ss-chapter--dark" style="min-height: 80vh;">
      <div class="ss-chapter__inner ss-chapter__inner--outcome" style="padding-block: 4rem;">
        <p class="ss-eyebrow ss-reveal ss-reveal--fade is-visible">Results</p>
        <h2 class="ss-headline ss-reveal ss-reveal--up is-visible">Numbers that matter</h2>
        <div class="ss-outcome-metrics ss-reveal is-visible">
          ${OUTCOMES.map(o => `
            <div class="ss-outcome-tile">
              <span class="ss-outcome-tile__value">${o.value}</span>
              <span class="ss-outcome-tile__label">${o.label}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `
};

/* ══════════════════════════════════════════════════════════
   7. CTA GROUP
   ══════════════════════════════════════════════════════════ */
export const CtaGroup = {
  render: () => `
    <section class="ss-chapter ss-chapter--cover" style="min-height: 400px;">
      <div class="ss-chapter__inner ss-chapter__inner--text" style="padding-block: 4rem;">
        <p class="ss-eyebrow ss-reveal ss-reveal--fade is-visible">Next steps</p>
        <h2 class="ss-headline ss-reveal ss-reveal--up is-visible">
          Ready to build something like this?
        </h2>
        <div class="ss-cta-group ss-reveal ss-reveal--up is-visible">
          <a href="/contact/" class="btn-primary">
            Start a conversation ${ARROW}
          </a>
          <a href="/portfolio/" class="ss-btn-outline">View all projects</a>
        </div>
      </div>
    </section>
  `
};

/* ══════════════════════════════════════════════════════════
   8. A11Y BADGES
   ══════════════════════════════════════════════════════════ */
export const A11yBadges = {
  render: () => `
    <section class="ss-chapter ss-chapter--slate" style="min-height: 400px;">
      <div class="ss-chapter__inner ss-chapter__inner--text" style="padding-block: 4rem;">
        <p class="ss-eyebrow ss-reveal ss-reveal--fade is-visible">Accessibility</p>
        <h2 class="ss-headline ss-reveal ss-reveal--up is-visible">Built inclusively</h2>
        <div class="ss-a11y-badges ss-reveal is-visible">
          <span>WCAG 2.1 AA</span>
          <span>Keyboard navigable</span>
          <span>Screen reader tested</span>
          <span>Reduced motion respected</span>
        </div>
      </div>
    </section>
  `
};

/* ══════════════════════════════════════════════════════════
   9. FULL SCROLL STORY COMPOSITION
   ══════════════════════════════════════════════════════════ */
export const FullScrollStory = {
  name: 'Full Scroll Story Composition',
  render: () => `
    <div>
      <div class="ss-progress" style="width: 0%;"></div>
      <nav class="ss-nav" aria-label="Story sections">
        <button class="ss-nav__dot is-active" title="Cover"></button>
        <button class="ss-nav__dot" title="Challenge"></button>
        <button class="ss-nav__dot" title="Process"></button>
        <button class="ss-nav__dot" title="Metrics"></button>
        <button class="ss-nav__dot" title="Outcomes"></button>
      </nav>

      <section class="ss-chapter ss-chapter--cover" style="min-height: 100vh;">
        <div class="ss-chapter__inner ss-chapter__inner--text" style="padding-block: 6rem;">
          <p class="ss-eyebrow ss-reveal is-visible">Empire Creative Co.</p>
          <h1 class="ss-cover-title ss-reveal is-visible">Brand identity that converts.</h1>
          <p class="ss-cover-tagline ss-reveal is-visible">Lighthouse 34 → 98. Three weeks. One sprint.</p>
          <div class="ss-scroll-hint is-visible" aria-hidden="true"><span class="ss-scroll-dot"></span> Scroll</div>
        </div>
      </section>

      <section class="ss-chapter ss-chapter--slate" style="min-height: 80vh;">
        <div class="ss-chapter__inner ss-chapter__inner--text" style="padding-block: 4rem;">
          <p class="ss-eyebrow ss-reveal is-visible">Process</p>
          <h2 class="ss-headline ss-reveal is-visible">Three-week sprint</h2>
          <ol class="ss-timeline ss-reveal is-visible">
            ${STEPS.map(s => `
              <li class="ss-timeline__step">
                <span class="ss-timeline__num">${s.num}</span>
                <span class="ss-timeline__label">${s.label}</span>
              </li>`).join('')}
          </ol>
        </div>
      </section>

      <section class="ss-chapter ss-chapter--navy" style="min-height: 80vh;">
        <div class="ss-chapter__inner ss-chapter__inner--metric" style="padding-block: 5rem;">
          <p class="ss-eyebrow ss-reveal is-visible">Performance</p>
          <div class="ss-metric-context ss-reveal is-visible"><span class="ss-metric-before">Was 34</span><span class="ss-metric-arrow">→</span></div>
          <div class="ss-metric-number ss-reveal is-visible">98</div>
          <p class="ss-metric-label ss-reveal is-visible">Lighthouse Score</p>
        </div>
      </section>

      <section class="ss-chapter ss-chapter--dark" style="min-height: 80vh;">
        <div class="ss-chapter__inner ss-chapter__inner--outcome" style="padding-block: 4rem;">
          <p class="ss-eyebrow ss-reveal is-visible">Results</p>
          <h2 class="ss-headline ss-reveal is-visible">Outcomes</h2>
          <div class="ss-outcome-metrics ss-reveal is-visible">
            ${OUTCOMES.map(o => `
              <div class="ss-outcome-tile">
                <span class="ss-outcome-tile__value">${o.value}</span>
                <span class="ss-outcome-tile__label">${o.label}</span>
              </div>`).join('')}
          </div>
        </div>
      </section>

      <section class="ss-chapter ss-chapter--cover" style="min-height: 60vh;">
        <div class="ss-chapter__inner ss-chapter__inner--text" style="padding-block: 4rem;">
          <h2 class="ss-headline ss-reveal is-visible">Ready to build something like this?</h2>
          <div class="ss-cta-group ss-reveal is-visible">
            <a href="/contact/" class="btn-primary">Start a conversation ${ARROW}</a>
            <a href="/portfolio/" class="ss-btn-outline">View all projects</a>
          </div>
        </div>
      </section>
    </div>
  `
};
