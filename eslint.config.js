const js = require('@eslint/js');
const globals = require('globals');
const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginHtml = require('eslint-plugin-html');

module.exports = [
  // Global ignores
  {
    ignores: [
      'node_modules/**',
      'public/**',
      '.chrome-debug-profile/**',
      'themes/myPortfolio/exampleSite/**'
    ]
  },
  // Base JS config
  {
    files: ['**/*.js'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      // Best practices
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // Code style (Prettier handles most, these are backups)
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'comma-dangle': ['error', 'never'],
      // Performance / security
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
      // Globals safety
      'no-implicit-globals': 'error'
    }
  },
  // HTML files via eslint-plugin-html
  {
    files: ['**/*.html'],
    plugins: { html: eslintPluginHtml }
  },
  // Prettier must be last to disable conflicting rules
  eslintConfigPrettier
];
