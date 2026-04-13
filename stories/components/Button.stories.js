/**
 * Button stories.
 *
 * Mirrors the BEM classes defined in src/css/layout/page.css:
 *   .btn-primary   — filled accent, used for primary CTA actions
 *   .btn-secondary — ghost/outline, used for secondary actions
 *
 * Both classes handle hover, active, focus-visible, and transition states.
 * The classes are scoped inside a @media (prefers-color-scheme) block, so
 * they will respond to the Storybook dark/light background toggle.
 */
export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label text'
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      description: '.btn-primary (filled accent) or .btn-secondary (ghost/outline)'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state — adds aria-disabled and pointer-events: none'
    },
    asAnchor: {
      control: 'boolean',
      description: 'Render as an <a> tag instead of <button> (used for navigation CTAs)'
    },
    withIcon: {
      control: 'boolean',
      description: 'Append an arrow SVG icon (matches hero CTA usage)'
    }
  }
};

/* ─── Shared helpers ───────────────────────────────────────── */

const ARROW_ICON = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

const renderButton = ({ label, variant, disabled, asAnchor, withIcon }) => {
  const cls = variant === 'secondary' ? 'btn-secondary' : 'btn-primary';
  const icon = withIcon ? ARROW_ICON : '';
  const disabledAttr = disabled ? ' disabled aria-disabled="true"' : '';
  const tag = asAnchor ? 'a' : 'button';
  const href = asAnchor ? ' href="#"' : '';
  return `<${tag} class="${cls}"${href}${disabledAttr}>${label}${icon}</${tag}>`;
};

/* ─── Stories ──────────────────────────────────────────────── */

/**
 * Primary CTA button — filled accent colour, used for the most important action on a page.
 */
export const Primary = {
  args: {
    label: 'View my work',
    variant: 'primary',
    disabled: false,
    asAnchor: false,
    withIcon: false
  },
  render: renderButton
};

/**
 * Secondary CTA button — ghost/outline style, paired with Primary.
 */
export const Secondary = {
  args: {
    label: 'Learn more',
    variant: 'secondary',
    disabled: false,
    asAnchor: false,
    withIcon: false
  },
  render: renderButton
};

/**
 * Primary button rendered as an anchor tag — common for page-level navigation CTAs.
 */
export const PrimaryAnchor = {
  args: {
    label: 'Start a project',
    variant: 'primary',
    disabled: false,
    asAnchor: true,
    withIcon: true
  },
  render: renderButton
};

/**
 * Secondary anchor with arrow (e.g. "See all work →").
 */
export const SecondaryAnchor = {
  args: {
    label: 'See case study',
    variant: 'secondary',
    disabled: false,
    asAnchor: true,
    withIcon: true
  },
  render: renderButton
};

/**
 * Disabled state — pointer-events none, reduced opacity via browser default on `disabled`.
 */
export const Disabled = {
  args: {
    label: 'Unavailable',
    variant: 'primary',
    disabled: true,
    asAnchor: false,
    withIcon: false
  },
  render: renderButton
};

/**
 * Side-by-side pair — the typical hero CTA layout: Primary + Secondary.
 */
export const HeroPair = {
  render: () => `
    <div style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;">
      <a href="#" class="btn-primary">
        Start a project
        ${ARROW_ICON}
      </a>
      <a href="#" class="btn-secondary">See all work</a>
    </div>
  `
};

/**
 * Both variants in all interactive states for visual regression testing.
 */
export const AllStates = {
  render: () => `
    <div style="display:grid;gap:1.5rem;">
      <div>
        <p style="font-size:0.75rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:0.5rem;opacity:0.5;">btn-primary</p>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;">
          <button class="btn-primary">Default</button>
          <button class="btn-primary" style="background:var(--color-accent-hover);transform:translateY(-1px);">Hovered</button>
          <button class="btn-primary" disabled aria-disabled="true">Disabled</button>
        </div>
      </div>
      <div>
        <p style="font-size:0.75rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:0.5rem;opacity:0.5;">btn-secondary</p>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;">
          <button class="btn-secondary">Default</button>
          <button class="btn-secondary" style="background:var(--color-surface-subtle);transform:translateY(-1px);">Hovered</button>
          <button class="btn-secondary" disabled aria-disabled="true">Disabled</button>
        </div>
      </div>
    </div>
  `
};
