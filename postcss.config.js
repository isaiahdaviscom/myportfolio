// postcss.config.js
// Array format with explicit require() calls bypasses postcss-load-config v5's
// async ESM import() resolver, which fails on some plugin exports in CI.
// Each plugin is resolved and instantiated here — no dynamic import needed.
//
// Export types (verified):
//   @tailwindcss/postcss          -> require() returns function directly
//   @fullhuman/postcss-purgecss   -> require().default is the factory function
//   autoprefixer                  -> require() returns function directly
//   cssnano                       -> require() returns function directly

const isProduction = process.env.NODE_ENV === 'production';

const plugins = [require('@tailwindcss/postcss')];

if (isProduction) {
  plugins.push(
    require('@fullhuman/postcss-purgecss').default({
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
    }),
    require('autoprefixer'),
    require('cssnano')({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true
          }
        }
      ]
    })
  );
}

module.exports = { plugins };
