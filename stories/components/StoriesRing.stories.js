/**
 * StoriesRing component stories
 * Reflects the Instagram-Stories-inspired availability UI from src/css/components/stories.css.
 *
 * The ring + dot live inside the site header but are independently composable.
 * Availability state is set at runtime by JS checking day/hour; here controlled via args.
 *
 *   .stories-ring--available  → gradient ring + glow animation
 *   .stories-ring--away       → gray ring, no animation
 *   .stories-dot--open        → green dot
 *   .stories-dot--closed      → gray dot
 *
 * Ring colour variants (independent from availability):
 *   .stories-ring--color-gradient | --color-blue | --color-amber | --color-purple | --color-green
 */
export default {
  title: 'Components/StoriesRing',
  tags: ['autodocs'],
  argTypes: {
    available: {
      control: 'boolean',
      description: 'Available state — gradient ring + glow pulse + green dot'
    },
    colorVariant: {
      control: { type: 'select' },
      options: ['', 'stories-ring--color-gradient', 'stories-ring--color-blue', 'stories-ring--color-amber', 'stories-ring--color-purple', 'stories-ring--color-green'],
      description: 'Ring colour override (independent of availability)'
    },
    avatarSrc: {
      control: 'text',
      description: 'Avatar image path'
    }
  }
};

function renderRing({ available, colorVariant = '', avatarSrc = '/images/profile-branded.png' }) {
  const ringMod = available ? 'stories-ring--available' : 'stories-ring--away';
  const dotMod  = available ? 'stories-dot--open' : 'stories-dot--closed';
  const colorCls = colorVariant ? ` ${colorVariant}` : '';

  return `
    <div style="padding: 2rem; display: inline-flex; align-items: center; gap: 1rem;">
      <button class="stories-trigger"
              aria-label="View availability"
              aria-haspopup="dialog"
              aria-expanded="false"
              type="button">
        <span class="stories-ring ${ringMod}${colorCls}" aria-hidden="true">
          <span class="stories-ring-inner">
            <img src="${avatarSrc}" alt="Isaiah Davis"
                 class="stories-avatar" width="40" height="40"
                 onerror="this.style.background='#4d8dff';this.removeAttribute('src')" />
          </span>
        </span>
        <span class="stories-dot ${dotMod}" title="Availability status"></span>
      </button>
      <span style="font-size: 0.875rem; color: var(--color-text-secondary);">
        ${available ? 'Available — Mon–Fri 9 AM–6 PM CT' : 'Away / outside business hours'}
      </span>
    </div>
  `;
}

/** Available during business hours — gradient ring, green dot */
export const Available = {
  args: { available: true, colorVariant: '' },
  render: renderRing
};

/** Away — gray ring, gray dot */
export const Away = {
  args: { available: false, colorVariant: '' },
  render: renderRing
};

/** Blue ring variant */
export const BlueRing = {
  args: { available: true, colorVariant: 'stories-ring--color-blue' },
  render: renderRing
};

/** All colour variants side-by-side */
export const AllColours = {
  render: () => {
    const variants = [
      { cls: 'stories-ring--available stories-ring--color-gradient', label: 'Gradient' },
      { cls: 'stories-ring--available stories-ring--color-blue',     label: 'Blue' },
      { cls: 'stories-ring--available stories-ring--color-amber',    label: 'Amber' },
      { cls: 'stories-ring--available stories-ring--color-purple',   label: 'Purple' },
      { cls: 'stories-ring--available stories-ring--color-green',    label: 'Green' },
      { cls: 'stories-ring--away',                                   label: 'Away' }
    ];

    const items = variants.map(v => `
      <div style="display:flex; flex-direction:column; align-items:center; gap:0.5rem;">
        <button class="stories-trigger" type="button" aria-label="${v.label}">
          <span class="stories-ring ${v.cls}" aria-hidden="true">
            <span class="stories-ring-inner">
              <span style="width:40px;height:40px;border-radius:9999px;background:#4d8dff;display:block;"></span>
            </span>
          </span>
          <span class="stories-dot ${v.cls.includes('away') ? 'stories-dot--closed' : 'stories-dot--open'}"></span>
        </button>
        <span style="font-size:0.75rem; color:var(--color-text-muted);">${v.label}</span>
      </div>
    `).join('');

    return `<div style="display:flex; flex-wrap:wrap; gap:2rem; padding:2rem;">${items}</div>`;
  }
};
