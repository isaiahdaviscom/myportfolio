module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['html'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // Best practices
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-alert': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // Code style (handled by Prettier, but good to have as backup)
    semi: ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'comma-dangle': ['error', 'never'],

    // Performance
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',

    // Accessibility
    'no-implicit-globals': 'error'
  },
  ignorePatterns: [
    'node_modules/',
    'public/',
    '.chrome-debug-profile/',
    'themes/myPortfolio/exampleSite/'
  ],
  overrides: [
    {
      files: ['**/*.html'],
      parser: '@eslint/js',
      rules: {
        // HTML-specific rules can go here
      }
    }
  ]
};
