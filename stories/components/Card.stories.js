export default {
  title: 'Components/Card',
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title'
    },
    content: {
      control: 'text',
      description: 'Card content'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'elevated', 'flat'],
      description: 'Card style variant'
    },
    padding: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Card padding size'
    },
    hasImage: {
      control: 'boolean',
      description: 'Include image in card'
    },
    imageUrl: {
      control: 'text',
      description: 'Card image URL',
      if: { arg: 'hasImage', eq: true }
    },
    hasAction: {
      control: 'boolean',
      description: 'Include action buttons'
    }
  }
};

/**
 * Default card component
 */
export const Default = {
  args: {
    title: 'Card Title',
    content:
      'This is the card content. It can contain any HTML content including text, images, and other components.',
    variant: 'default',
    padding: 'medium',
    hasImage: false,
    hasAction: false
  },
  render: args => {
    const paddingClass = {
      small: 'p-4',
      medium: 'p-6',
      large: 'p-8'
    }[args.padding];

    const variantClass = {
      default: 'bg-white border border-gray-200 rounded-lg',
      bordered: 'bg-white border-2 border-gray-300 rounded-lg',
      elevated: 'bg-white shadow-lg rounded-lg',
      flat: 'bg-gray-50 rounded-lg'
    }[args.variant];

    const imageHtml = args.hasImage
      ? `
      <img class="w-full h-48 object-cover rounded-t-lg" 
           src="${args.imageUrl || '/images/placeholder.jpg'}" 
           alt="${args.title}" />
    `
      : '';

    const actionHtml = args.hasAction
      ? `
      <div class="flex gap-3 mt-4">
        <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Primary Action
        </button>
        <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
          Secondary
        </button>
      </div>
    `
      : '';

    return `
      <div class="${variantClass} max-w-md">
        ${imageHtml}
        <div class="${paddingClass}">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">${args.title}</h3>
          <p class="text-gray-600">${args.content}</p>
          ${actionHtml}
        </div>
      </div>
    `;
  }
};

/**
 * Card with image
 */
export const WithImage = {
  args: {
    ...Default.args,
    hasImage: true,
    imageUrl: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=400&h=200&fit=crop',
    title: 'Beautiful Card',
    content: 'This card includes an image at the top, perfect for showcasing visual content.'
  },
  render: Default.render
};

/**
 * Card with actions
 */
export const WithActions = {
  args: {
    ...Default.args,
    hasAction: true,
    title: 'Interactive Card',
    content: 'This card includes action buttons at the bottom for user interaction.'
  },
  render: Default.render
};

/**
 * Elevated card variant
 */
export const Elevated = {
  args: {
    ...Default.args,
    variant: 'elevated',
    title: 'Elevated Card',
    content: 'This card uses shadow styling to appear elevated above the surface.'
  },
  render: Default.render
};

/**
 * Portfolio card example
 */
export const PortfolioCard = {
  args: {
    title: 'Project Name',
    content: 'Brief description of the project showcasing skills and technologies used.',
    variant: 'elevated',
    padding: 'medium',
    hasImage: true,
    hasAction: true,
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop'
  },
  render: Default.render
};

/**
 * Different card variants
 */
export const AllVariants = {
  render: () => `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Default Card -->
      <div class="bg-white border border-gray-200 rounded-lg max-w-md">
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Default Card</h3>
          <p class="text-gray-600">Standard card with light border styling.</p>
        </div>
      </div>
      
      <!-- Bordered Card -->
      <div class="bg-white border-2 border-gray-300 rounded-lg max-w-md">
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Bordered Card</h3>
          <p class="text-gray-600">Card with thicker border for emphasis.</p>
        </div>
      </div>
      
      <!-- Elevated Card -->
      <div class="bg-white shadow-lg rounded-lg max-w-md">
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Elevated Card</h3>
          <p class="text-gray-600">Card with shadow to appear elevated.</p>
        </div>
      </div>
      
      <!-- Flat Card -->
      <div class="bg-gray-50 rounded-lg max-w-md">
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Flat Card</h3>
          <p class="text-gray-600">Minimal card with background tint.</p>
        </div>
      </div>
    </div>
  `
};
