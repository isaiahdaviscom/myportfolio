/**
 * Gallery component stories
 * Uses the .card / .card-img-overlay BEM classes and .badge.
 * The grid uses a CSS Grid layout matching the portfolio page.
 */
export default {
  title: 'Components/Gallery',
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: { type: 'range', min: 1, max: 4 },
      description: 'Number of columns (uses CSS grid)'
    },
    itemCount: {
      control: { type: 'range', min: 3, max: 9 },
      description: 'Number of gallery items'
    },
    showBadge: {
      control: 'boolean',
      description: 'Show role badge on each card'
    }
  }
};

const PROJECTS = [
  {
    title: 'Empire',
    role: 'Brand & Identity',
    dates: '2025',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop',
    href: '/portfolio/empire/'
  },
  {
    title: 'S&C Electric',
    role: 'Web Development',
    dates: '2024',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop',
    href: '/portfolio/sandc/'
  },
  {
    title: 'IGA',
    role: 'Digital Strategy',
    dates: '2024',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop',
    href: '/portfolio/iga/'
  },
  {
    title: 'Mac N Cheese Bar',
    role: 'Brand & Identity',
    dates: '2023',
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=400&fit=crop',
    href: '/portfolio/macncheesebar/'
  },
  {
    title: 'Premier Energy',
    role: 'Web Development',
    dates: '2023',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
    href: '/portfolio/premier/'
  },
  {
    title: 'Spark',
    role: 'Digital Strategy',
    dates: '2023',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=400&fit=crop',
    href: '/portfolio/spark/'
  }
];

export const Default = {
  args: { columns: 3, itemCount: 6, showBadge: true },
  render: args => {
    const items = PROJECTS.slice(0, args.itemCount);
    const cards = items
      .map(
        p => `
      <a href="${p.href}" class="card">
        <picture><img src="${p.image}" alt="${p.title}" /></picture>
        <div class="card-img-overlay">
          ${args.showBadge ? `<span class="badge">${p.role}</span>` : ''}
          <h3>${p.title}</h3>
          <p>${p.dates}</p>
        </div>
      </a>`
      )
      .join('');
    return `
      <div style="display:grid; grid-template-columns:repeat(${args.columns},1fr); gap:1rem;">
        ${cards}
      </div>
    `;
  }
};

/** Two-column */
export const TwoColumn = {
  args: { ...Default.args, columns: 2, itemCount: 4 },
  render: Default.render
};

/** Without badges */
export const NoBadge = {
  args: { ...Default.args, showBadge: false },
  render: Default.render
};

/** Single feature card */
export const SingleCard = {
  args: { ...Default.args, columns: 1, itemCount: 1 },
  render: Default.render
};
