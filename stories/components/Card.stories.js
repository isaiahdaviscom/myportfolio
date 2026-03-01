/**
 * Card component stories
 * Reflects .card + .card-img-overlay BEM from src/css/components/card.css.
 *
 * The .card class uses CSS Container Queries for responsive behaviour:
 *   - aspect-ratio: 1/1 (square)
 *   - container: card / inline-size
 *   - At 300px+ width: full-bleed image, gradient overlay, text at bottom
 *
 * Usage:
 *   <a href="/project" class="card">
 *     <picture><img src="..." alt="..." /></picture>
 *     <div class="card-img-overlay">
 *       <span class="badge">Role</span>
 *       <h3>Title</h3>
 *     </div>
 *   </a>
 */
export default {
  title: 'Components/Card',
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Project title' },
    role:  { control: 'text', description: 'Role badge label' },
    dates: { control: 'text', description: 'Date range string' },
    imageUrl: { control: 'text', description: 'Cover image URL' },
    href: { control: 'text', description: 'Link destination' },
    size: {
      control: { type: 'select' },
      options: ['240px', '320px', '420px', '560px'],
      description: 'Container width (demonstrates container query breakpoints)'
    }
  }
};

const PLACEHOLDER = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=560&h=560&fit=crop';

function renderCard(args) {
  return `
    <div style="width:${args.size}; display:inline-block;">
      <a href="${args.href}" class="card">
        <picture>
          <img src="${args.imageUrl}" alt="${args.title}" />
        </picture>
        <div class="card-img-overlay">
          <span class="badge">${args.role}</span>
          <h3>${args.title}</h3>
          <p>${args.dates}</p>
        </div>
      </a>
    </div>
  `;
}

/** Default portfolio card at standard size */
export const Default = {
  args: {
    title: 'Empire State Building',
    role: 'Brand & Identity',
    dates: '2025',
    imageUrl: PLACEHOLDER,
    href: '/portfolio/empire/',
    size: '320px'
  },
  render: renderCard
};

/** Small card — below container-query threshold (no overlay) */
export const Small = {
  args: { ...Default.args, title: 'IGA Supermarkets', role: 'Web Dev', size: '240px' },
  render: renderCard
};

/** Large card */
export const Large = {
  args: { ...Default.args, title: 'Premier Energy', role: 'Digital Strategy', size: '560px' },
  render: renderCard
};

/** Related-projects grid — 3-up using .related-projects__grid */
export const RelatedProjectsGrid = {
  render: () => `
    <ul class="related-projects__grid">
      ${[
        { title: 'S&C Electric',   role: 'Brand',    dates: '2024', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop' },
        { title: 'Mac N Cheese Bar', role: 'Web Dev', dates: '2024', img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=400&fit=crop' },
        { title: 'Spark',          role: 'Strategy', dates: '2023', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop' }
      ].map(p => `
        <li>
          <a href="#" class="card related-projects__card">
            <picture><img src="${p.img}" alt="${p.title}" /></picture>
            <div class="card-img-overlay">
              <p class="related-projects__role">${p.role}</p>
              <h3 class="related-projects__title">${p.title}</h3>
              <p class="related-projects__dates">${p.dates}</p>
            </div>
          </a>
        </li>
      `).join('')}
    </ul>
  `
};
