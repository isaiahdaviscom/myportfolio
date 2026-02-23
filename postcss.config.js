// postcss.config.js
module.exports = ctx => {
  const isProduction = process.env.NODE_ENV === 'production' || (ctx && ctx.env === 'production');

  const plugins = {
    '@tailwindcss/postcss': {}
  };

  if (isProduction) {
    plugins['@fullhuman/postcss-purgecss'] = {
      content: [
        './layouts/**/*.html',
        './themes/**/layouts/**/*.html',
        './content/**/*.md',
        './content/**/*.html',
        './static/**/*.html',
        './static/**/*.js',
        './src/**/*.js'
      ],
      safelist: {
        standard: [
          'dark',
          'light',
          'theme-switching',
          'theme-dark',
          'theme-light',
          /^theme-/,
          /^hljs-/,
          /^chroma/,
          /^highlight/,
          /^language-/,
          /^token/,
          'sr-only',
          'not-sr-only'
        ],
        deep: [
          /^hljs-/,
          /^chroma/,
          /^highlight/,
          /^language-/,
          /^token/,
          /^theme-/,
          /dark/,
          /light/
        ],
        greedy: [
          /^hover:/,
          /^focus:/,
          /^active:/,
          /^group-/,
          /^focus-visible:/,
          /^focus-within:/,
          /^sm:/,
          /^md:/,
          /^lg:/,
          /^xl:/,
          /^2xl:/
        ]
      },
      keyframes: true,
      fontFace: true,
      variables: true
    };

    plugins['autoprefixer'] = {};

    plugins['cssnano'] = {
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true
          }
        }
      ]
    };
  }

  return { plugins };
};
