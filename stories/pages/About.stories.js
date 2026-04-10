/**
 * About page stories
 * Reflects src/css/pages/about.css BEM system:
 *   1. Avatar (.about-avatar) — framed image + animated ring
 *   2. Bio prose (.about-bio)
 *   3. Skills grid (.about-skills / .skill-card__*)
 *   4. Values grid (.about-values / .value-card__*)
 *
 * Page-level category palette vars are set on .about-page:
 *   --cat-frontend-fg  blue   (accent)
 *   --cat-tooling-fg   orange
 *   --cat-design-fg    purple
 *   --cat-backend-fg   green
 */
export default {
  title: 'Pages/About',
  tags: ['autodocs'],
  parameters: { layout: 'padded' }
};

/* ══════════════════════════════════════════════════════════
   1. AVATAR
   ══════════════════════════════════════════════════════════ */
export const Avatar = {
  render: () => `
    <div class="about-page" style="padding: 3rem; display: flex; justify-content: center;">
      <div class="about-avatar">
        <div class="about-avatar__frame">
          <img class="about-avatar__img"
               src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&face"
               alt="Isaiah Davis" width="300" height="300" />
        </div>
        <div class="about-avatar__ring" aria-hidden="true"></div>
      </div>
    </div>
  `
};

/* ══════════════════════════════════════════════════════════
   2. HERO + BIO PROSE
   ══════════════════════════════════════════════════════════ */
export const HeroAndBio = {
  render: () => `
    <div class="about-page" style="padding: 3rem; max-width: 860px; margin-inline: auto;">
      <section class="about-hero">
        <div class="container">
          <div class="about-hero__status">
            <span class="about-hero__status-dot" aria-hidden="true"></span>
            Open to work
          </div>
          <h1>Isaiah Davis</h1>
          <p>Frontend Developer &amp; UI Engineer based in Chicago, IL.</p>
        </div>
      </section>
      <div class="about-bio" style="margin-top: 3rem;">
        <div class="about-bio__prose">
          <p>
            I'm a frontend developer and UI engineer with 8+ years experience building fast,
            accessible web experiences. My work sits at the intersection of design and engineering —
            I care as much about the <strong>token architecture</strong> behind a design system as I
            do about the visual outcome.
          </p>
          <p>
            Before going independent, I shipped production UIs for clients across retail, energy,
            food service, and financial services. Today I work with growth-stage teams on design
            systems, performance, and web accessibility.
          </p>
        </div>
      </div>
    </div>
  `
};

/* ══════════════════════════════════════════════════════════
   3. SKILLS GRID
   ══════════════════════════════════════════════════════════ */
const SKILLS = [
  {
    cat: 'frontend', label: 'Frontend',
    items: ['HTML5 / Semantics', 'CSS3 + Custom Properties', 'JavaScript (ES2022+)', 'Hugo / Jamstack', 'Performance & a11y']
  },
  {
    cat: 'tooling', label: 'Tooling',
    items: ['Vite / PostCSS', 'Storybook', 'Figma Tokens / Style Dictionary', 'Git + CI/CD', 'Lighthouse / Web Vitals']
  },
  {
    cat: 'design', label: 'Design',
    items: ['Figma', 'Design Systems', 'Typography & Spacing', 'Motion / Animation', 'Brand Identity']
  },
  {
    cat: 'backend', label: 'Backend Basics',
    items: ['Node.js / Express', 'REST APIs', 'Netlify / Vercel', 'Serverless Functions', 'CMS Integration']
  }
];

export const SkillsGrid = {
  render: () => `
    <div class="about-page" style="padding: 3rem;">
      <section class="about-skills">
        <h2 style="margin-bottom: 2rem;">Skills</h2>
        <div class="about-skills__grid">
          ${SKILLS.map(cat => `
            <div class="page-card">
              <p class="skill-card__category skill-card__category--${cat.cat}">${cat.label}</p>
              <ul class="skill-card__list">
                ${cat.items.map(item => `
                  <li class="skill-card__item">
                    <span class="skill-card__dot skill-card__dot--${cat.cat}" aria-hidden="true"></span>
                    ${item}
                  </li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `
};

/* ══════════════════════════════════════════════════════════
   4. VALUES GRID
   ══════════════════════════════════════════════════════════ */
const VALUES = [
  { icon: '🎯', title: 'Clarity over cleverness', desc: 'Code that the next developer (or future me) can understand at a glance.' },
  { icon: '♿', title: 'Accessibility by default', desc: 'WCAG compliance isn\'t a checklist — it\'s a baseline for every component.' },
  { icon: '⚡', title: 'Performance matters', desc: 'Core Web Vitals feed real business outcomes. I measure before I ship.' },
  { icon: '🔁', title: 'Iterate, don\'t perfect', desc: 'Token-driven, documented, extensible systems beat monolithic rewrites.' }
];

export const ValuesGrid = {
  render: () => `
    <div class="about-page" style="padding: 3rem;">
      <section class="about-values">
        <h2 style="margin-bottom: 2rem;">Philosophy</h2>
        <div class="about-values__grid">
          ${VALUES.map(v => `
            <div class="page-card page-card--accent">
              <div class="value-card__icon" aria-hidden="true">${v.icon}</div>
              <h3 class="value-card__title">${v.title}</h3>
              <p class="value-card__desc">${v.desc}</p>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `
};

/* ══════════════════════════════════════════════════════════
   5. FULL ABOUT PAGE COMPOSITION
   ══════════════════════════════════════════════════════════ */
export const FullPage = {
  parameters: { layout: 'fullscreen' },
  render: () => `
    <div class="about-page" style="max-width: 1200px; margin-inline: auto; padding: 3rem 2rem;">
      <div style="display: flex; gap: 3rem; align-items: flex-start; flex-wrap: wrap; margin-bottom: 4rem;">
        <div class="about-avatar">
          <div class="about-avatar__frame">
            <img class="about-avatar__img"
                 src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
                 alt="Isaiah Davis" width="300" height="300" />
          </div>
          <div class="about-avatar__ring" aria-hidden="true"></div>
        </div>
        <div class="about-bio" style="flex: 1; min-width: 280px;">
          <div class="about-hero__status" style="margin-bottom: 1rem;">
            <span class="about-hero__status-dot" aria-hidden="true"></span>
            Open to work
          </div>
          <h1 style="margin-bottom: 1rem;">Isaiah Davis</h1>
          <div class="about-bio__prose">
            <p>Frontend Developer &amp; UI Engineer based in Chicago. I build fast, accessible
            web experiences with a focus on design systems and measurable outcomes.</p>
          </div>
        </div>
      </div>
      <section class="about-skills" style="margin-bottom: 4rem;">
        <h2 style="margin-bottom: 2rem;">Skills</h2>
        <div class="about-skills__grid">
          ${SKILLS.map(cat => `
            <div class="page-card">
              <p class="skill-card__category skill-card__category--${cat.cat}">${cat.label}</p>
              <ul class="skill-card__list">
                ${cat.items.map(i => `
                  <li class="skill-card__item">
                    <span class="skill-card__dot skill-card__dot--${cat.cat}" aria-hidden="true"></span>${i}
                  </li>`).join('')}
              </ul>
            </div>`).join('')}
        </div>
      </section>
      <section class="about-values">
        <h2 style="margin-bottom: 2rem;">Philosophy</h2>
        <div class="about-values__grid">
          ${VALUES.map(v => `
            <div class="page-card page-card--accent">
              <div class="value-card__icon" aria-hidden="true">${v.icon}</div>
              <h3 class="value-card__title">${v.title}</h3>
              <p class="value-card__desc">${v.desc}</p>
            </div>`).join('')}
        </div>
      </section>
    </div>
  `
};
