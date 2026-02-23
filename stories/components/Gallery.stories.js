export default {
  title: 'Components/Gallery',
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: { type: 'range', min: 1, max: 5 },
      description: 'Number of columns'
    },
    layout: {
      control: { type: 'select' },
      options: ['grid', 'masonry', 'carousel'],
      description: 'Gallery layout style'
    },
    itemCount: {
      control: { type: 'range', min: 3, max: 12 },
      description: 'Number of gallery items'
    },
    showCaptions: {
      control: 'boolean',
      description: 'Show item captions'
    }
  }
};

/**
 * Default gallery component
 */
export const Default = {
  args: {
    columns: 3,
    layout: 'grid',
    itemCount: 6,
    showCaptions: true
  },
  render: args => {
    const items = [
      {
        title: 'E-commerce Platform',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
        role: 'Frontend',
        dates: '2024'
      },
      {
        title: 'Mobile App Design',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
        role: 'UI/UX',
        dates: '2024'
      },
      {
        title: 'Dashboard Analytics',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
        role: 'Frontend',
        dates: '2023'
      },
      {
        title: 'Brand Identity',
        image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=300&fit=crop',
        role: 'Design',
        dates: '2023'
      },
      {
        title: 'Corporate Website',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        role: 'Fullstack',
        dates: '2023'
      },
      {
        title: 'Portfolio Site',
        image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop',
        role: 'Frontend',
        dates: '2024'
      }
    ].slice(0, args.itemCount);

    const gridClass = `grid grid-cols-1 md:grid-cols-${Math.min(args.columns, 3)} lg:grid-cols-${args.columns} gap-6`;

    const itemsHtml = items
      .map(
        item => `
      <div class="group relative">
        <a href="#" class="card block overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300">
          <div class="relative aspect-video">
            <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                 src="${item.image}" 
                 alt="${item.title}" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
              <div class="absolute bottom-4 left-4 text-white">
                ${
                  args.showCaptions
                    ? `
                  <span class="badge bg-primary text-white mb-2 inline-block">${item.role}</span>
                  <h3 class="text-lg font-bold">${item.title}</h3>
                  <p class="text-sm opacity-90">${item.dates}</p>
                `
                    : ''
                }
              </div>
            </div>
          </div>
        </a>
      </div>
    `
      )
      .join('');

    return `
      <section class="py-12">
        <div class="container mx-auto px-4">
          <div class="${gridClass}">
            ${itemsHtml}
          </div>
        </div>
      </section>
    `;
  }
};

/**
 * Two column layout
 */
export const TwoColumn = {
  args: {
    ...Default.args,
    columns: 2,
    itemCount: 4
  },
  render: Default.render
};

/**
 * Without captions
 */
export const NoCaptions = {
  args: {
    ...Default.args,
    showCaptions: false
  },
  render: Default.render
};
