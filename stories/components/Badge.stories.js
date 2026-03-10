/**
 * Badge component stories
 * Reflects the actual .badge class from src/css/components/badge.css:
 *   .badge  — black bg, white text, small pill (0.85em, border-radius 4px)
 *
 * Color and size are overridden via Tailwind utility classes on top of .badge.
 */
export default {
  title: 'Components/Badge',
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Badge label text'
    },
    colorClass: {
      control: { type: 'select' },
      options: [
        '',
        'text-blue-400',
        'text-green-400',
        'text-amber-400',
        'text-red-400',
        'text-purple-400'
      ],
      description: 'Optional Tailwind text-color override (bg stays black)'
    }
  }
};

/** Default badge — black background, white text */
export const Default = {
  args: { text: 'Brand & Identity', colorClass: '' },
  render: args => `<span class="badge ${args.colorClass}">${args.text}</span>`
};

/** Blue tinted label */
export const Blue = {
  args: { text: 'Web Development', colorClass: 'text-blue-400' },
  render: Default.render
};

/** Green tinted label */
export const Green = {
  args: { text: 'Available', colorClass: 'text-green-400' },
  render: Default.render
};

/** Amber tinted label */
export const Amber = {
  args: { text: 'In Progress', colorClass: 'text-amber-400' },
  render: Default.render
};

/** All variants side by side */
export const AllVariants = {
  render: () => `
    <div class="flex flex-wrap gap-3 p-4">
      <span class="badge">Brand &amp; Identity</span>
      <span class="badge text-blue-400">Web Development</span>
      <span class="badge text-green-400">Digital Strategy</span>
      <span class="badge text-amber-400">UI / UX Design</span>
      <span class="badge text-purple-400">E-commerce</span>
      <span class="badge text-red-400">Featured</span>
    </div>
  `
};

/** Badge in context — displayed over a dark card image */
export const OnCard = {
  render: () => `
    <div style="width:320px; background:#111; border-radius:8px; overflow:hidden; position:relative; padding:1rem;">
      <span class="badge text-blue-400" style="margin-bottom:.75rem; display:inline-block;">Web Development</span>
      <h3 style="color:#fff; font-size:1.1rem; font-weight:700; margin:0 0 .25rem;">Empire State Building</h3>
      <p style="color:rgba(255,255,255,.6); font-size:.8rem; margin:0;">Rebranding &middot; 2025</p>
    </div>
  `
};
