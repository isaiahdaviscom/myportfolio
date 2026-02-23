export default {
  title: 'Pages/Portfolio',
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Page title'
    },
    description: {
      control: 'text',
      description: 'Page description'
    },
    projectCount: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Number of portfolio projects to display'
    },
    showFilters: {
      control: 'boolean',
      description: 'Show category filters'
    },
    layout: {
      control: { type: 'select' },
      options: ['grid', 'masonry', 'list'],
      description: 'Portfolio layout style'
    }
  }
};

/**
 * Portfolio page with project grid
 */
export const Default = {
  args: {
    title: 'My Portfolio',
    description:
      'A collection of projects showcasing my skills and experience in web development and design.',
    projectCount: 6,
    showFilters: true,
    layout: 'grid'
  },
  render: args => {
    const projects = [
      {
        title: 'E-commerce Platform',
        description: 'Modern e-commerce solution with React and Node.js',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
        tags: ['React', 'Node.js', 'MongoDB'],
        category: 'web-app'
      },
      {
        title: 'Portfolio Website',
        description: 'Responsive portfolio website built with Hugo and Tailwind CSS',
        image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop',
        tags: ['Hugo', 'Tailwind', 'JavaScript'],
        category: 'website'
      },
      {
        title: 'Mobile App Design',
        description: 'UI/UX design for a productivity mobile application',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
        tags: ['Figma', 'Mobile', 'UI/UX'],
        category: 'design'
      },
      {
        title: 'Data Dashboard',
        description: 'Analytics dashboard with real-time data visualization',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
        tags: ['D3.js', 'React', 'PostgreSQL'],
        category: 'web-app'
      },
      {
        title: 'Brand Identity',
        description: 'Complete brand identity design for a tech startup',
        image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=300&fit=crop',
        tags: ['Branding', 'Logo Design', 'Adobe CC'],
        category: 'design'
      },
      {
        title: 'Corporate Website',
        description: 'Professional website for a consulting company',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        tags: ['WordPress', 'PHP', 'MySQL'],
        category: 'website'
      }
    ].slice(0, args.projectCount);

    const filtersHtml = args.showFilters
      ? `
      <div class="flex flex-wrap gap-3 mb-8">
        <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">All</button>
        <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">Web Apps</button>
        <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">Websites</button>
        <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">Design</button>
      </div>
    `
      : '';

    const gridClass =
      args.layout === 'grid'
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        : args.layout === 'list'
          ? 'space-y-8'
          : 'columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8';

    const projectsHtml = projects
      .map(project => {
        if (args.layout === 'list') {
          return `
          <div class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div class="md:flex">
              <div class="md:w-1/3">
                <img class="w-full h-48 md:h-full object-cover" src="${project.image}" alt="${project.title}" />
              </div>
              <div class="p-6 md:w-2/3">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">${project.title}</h3>
                <p class="text-gray-600 mb-4">${project.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                  ${project.tags
                    .map(
                      tag => `
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      ${tag}
                    </span>
                  `
                    )
                    .join('')}
                </div>
                <div class="flex gap-3">
                  <a href="#" class="text-blue-500 hover:text-blue-600 transition-colors">View Project</a>
                  <a href="#" class="text-gray-500 hover:text-gray-600 transition-colors">Live Demo</a>
                </div>
              </div>
            </div>
          </div>
        `;
        } else {
          return `
          <div class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${args.layout === 'masonry' ? 'break-inside-avoid' : ''}">
            <img class="w-full h-48 object-cover" src="${project.image}" alt="${project.title}" />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">${project.title}</h3>
              <p class="text-gray-600 mb-4">${project.description}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                ${project.tags
                  .map(
                    tag => `
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    ${tag}
                  </span>
                `
                  )
                  .join('')}
              </div>
              <div class="flex gap-3">
                <a href="#" class="text-blue-500 hover:text-blue-600 transition-colors">View Project</a>
                <a href="#" class="text-gray-500 hover:text-gray-600 transition-colors">Live Demo</a>
              </div>
            </div>
          </div>
        `;
        }
      })
      .join('');

    return `
      <div class="min-h-screen bg-gray-50">
        <!-- Hero Section -->
        <div class="bg-white py-16">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">${args.title}</h1>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">${args.description}</p>
          </div>
        </div>

        <!-- Portfolio Section -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          ${filtersHtml}
          <div class="${gridClass}">
            ${projectsHtml}
          </div>
        </div>
      </div>
    `;
  }
};

/**
 * Portfolio with grid layout
 */
export const GridLayout = {
  args: {
    ...Default.args,
    layout: 'grid'
  },
  render: Default.render
};

/**
 * Portfolio with list layout
 */
export const ListLayout = {
  args: {
    ...Default.args,
    layout: 'list'
  },
  render: Default.render
};

/**
 * Portfolio with masonry layout
 */
export const MasonryLayout = {
  args: {
    ...Default.args,
    layout: 'masonry'
  },
  render: Default.render
};

/**
 * Portfolio without filters
 */
export const NoFilters = {
  args: {
    ...Default.args,
    showFilters: false
  },
  render: Default.render
};

/**
 * Minimal portfolio with fewer projects
 */
export const Minimal = {
  args: {
    ...Default.args,
    projectCount: 3,
    showFilters: false,
    title: 'Featured Work',
    description: 'Selected projects that showcase my expertise and creativity.'
  },
  render: Default.render
};
