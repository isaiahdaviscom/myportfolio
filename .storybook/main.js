/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'],

  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],

  framework: {
    name: '@storybook/html-vite',
    options: {}
  },

  docs: {
    autodocs: 'tag'
  },

  staticDirs: ['../static']
};

export default config;
