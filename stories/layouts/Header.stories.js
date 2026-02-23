export default {
  title: 'Layout/Header',
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Site title'
    },
    showNavigation: {
      control: 'boolean',
      description: 'Show navigation menu'
    },
    sticky: {
      control: 'boolean',
      description: 'Sticky header'
    },
    transparent: {
      control: 'boolean',
      description: 'Transparent background'
    }
  }
};

/**
 * Default header component
 */
export const Default = {
  args: {
    title: 'Portfolio',
    showNavigation: true,
    sticky: false,
    transparent: false
  },
  render: args => {
    const stickyClass = args.sticky ? 'sticky top-0 z-50' : '';
    const bgClass = args.transparent ? 'bg-transparent' : 'bg-white border-b border-gray-200';

    const navigationHtml = args.showNavigation
      ? `
      <nav class="hidden md:flex space-x-8">
        <a href="#home" class="text-gray-700 hover:text-blue-500 transition-colors font-medium">Home</a>
        <a href="#about" class="text-gray-700 hover:text-blue-500 transition-colors font-medium">About</a>
        <a href="#portfolio" class="text-gray-700 hover:text-blue-500 transition-colors font-medium">Portfolio</a>
        <a href="#contact" class="text-gray-700 hover:text-blue-500 transition-colors font-medium">Contact</a>
      </nav>
      <!-- Mobile menu button -->
      <button class="md:hidden p-2" aria-label="Toggle menu">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    `
      : '';

    return `
      <header class="${stickyClass} ${bgClass}">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-4">
            <div class="flex items-center">
              <h1 class="text-2xl font-bold text-gray-900">${args.title}</h1>
            </div>
            ${navigationHtml}
          </div>
        </div>
      </header>
    `;
  }
};

/**
 * Sticky header
 */
export const Sticky = {
  args: {
    ...Default.args,
    sticky: true
  },
  render: Default.render
};

/**
 * Transparent header
 */
export const Transparent = {
  args: {
    ...Default.args,
    transparent: true
  },
  render: Default.render
};

/**
 * Simple header without navigation
 */
export const Simple = {
  args: {
    ...Default.args,
    showNavigation: false
  },
  render: Default.render
};

/**
 * Complete header with logo and CTA
 */
export const WithLogo = {
  render: () => `
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">P</span>
            </div>
            <h1 class="text-2xl font-bold text-gray-900">Portfolio</h1>
          </div>
          
          <nav class="hidden md:flex items-center space-x-8">
            <a href="#home" class="text-gray-700 hover:text-blue-500 transition-colors font-medium">Home</a>
            <a href="#about" class="text-gray-700 hover:text-blue-500 transition-colors font-medium">About</a>
            <a href="#portfolio" class="text-gray-700 hover:text-blue-500 transition-colors font-medium">Portfolio</a>
            <a href="#contact" class="text-gray-700 hover:text-blue-500 transition-colors font-medium">Contact</a>
            <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors font-medium">
              Get In Touch
            </button>
          </nav>
          
          <!-- Mobile menu button -->
          <button class="md:hidden p-2" aria-label="Toggle menu">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  `
};
