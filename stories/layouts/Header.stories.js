/**
 * Header component stories
 * Reflects .site-header BEM structure with glassmorphism sticky bar,
 * Instagram-Stories availability ring, inline-menu nav pills, and social links.
 *
 * Availability states set at runtime by JS — here shown as static props:
 *   available: true  → .stories-ring--available  gradient ring + .stories-dot--open
 *   available: false → .stories-ring--away        grey ring  + .stories-dot--closed
 */
export default {
  title: 'Layout/Header',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    available: {
      control: 'boolean',
      description: 'Availability state — gradient ring + green dot (Mon–Fri 9 AM–6 PM CT)'
    },
    activePage: {
      control: { type: 'select' },
      options: ['home', 'portfolio', 'about', 'contact'],
      description: 'Active page — sets aria-current + .active class on nav link'
    }
  }
};

const NAV = [
  { href: '/', label: 'Home', id: 'home' },
  { href: '/portfolio/', label: 'Portfolio', id: 'portfolio' },
  { href: '/about/', label: 'About', id: 'about' },
  { href: '/contact/', label: 'Contact', id: 'contact' }
];

function renderHeader(args) {
  const ringMod = args.available ? 'stories-ring--available' : 'stories-ring--away';
  const dotMod = args.available ? 'stories-dot--open' : 'stories-dot--closed';
  const navHtml = NAV.map(({ href, label, id }) => {
    const active = id === args.activePage;
    return `<li><a href="${href}" class="${active ? 'active' : ''}" ${active ? 'aria-current="page"' : ''}>${label}</a></li>`;
  }).join('');

  return `
    <header class="site-header">
      <div class="site-header__inner">
        <div class="site-header__left">
          <button class="stories-trigger"
                  aria-label="View my availability — opens a stories panel"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  type="button">
            <span class="stories-ring ${ringMod}" aria-hidden="true">
              <span class="stories-ring-inner">
                <img src="/images/profile-branded.png" alt="Isaiah Davis"
                     class="stories-avatar" width="40" height="40" />
              </span>
            </span>
            <span class="stories-dot ${dotMod}" title="Availability status"></span>
          </button>
          <nav class="inline-menu" aria-label="Primary navigation">
            <ul>${navHtml}</ul>
          </nav>
        </div>
        <nav aria-label="Social links" class="site-header__social">
          <a href="https://www.linkedin.com/in/isaiahdavis/" target="_blank" rel="noopener noreferrer"
             aria-label="LinkedIn profile"
             class="site-header__social-link site-header__social-link--linkedin">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a href="https://github.com/isaiahdaviscom" target="_blank" rel="noopener noreferrer"
             aria-label="GitHub profile"
             class="site-header__social-link site-header__social-link--github">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </a>
          <a href="/contact/" aria-label="Contact me"
             class="site-header__social-link site-header__social-link--contact">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </nav>
      </div>
    </header>
  `;
}

/** Available — business hours, gradient ring, green dot */
export const Available = {
  args: { available: true, activePage: 'home' },
  render: renderHeader
};

/** Away — off-hours, grey ring, grey dot */
export const Away = {
  args: { available: false, activePage: 'home' },
  render: renderHeader
};

/** Portfolio page — nav pill active */
export const PortfolioActive = {
  args: { available: true, activePage: 'portfolio' },
  render: renderHeader
};

/** About page — nav pill active */
export const AboutActive = {
  args: { available: true, activePage: 'about' },
  render: renderHeader
};

/** Contact page — nav pill active */
export const ContactActive = {
  args: { available: true, activePage: 'contact' },
  render: renderHeader
};
