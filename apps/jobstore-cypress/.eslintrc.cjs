module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'cypress'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:cypress/recommended'],
  env: {
    browser: true,
    node: true,
    es2020: true,
    'cypress/globals': true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  ignorePatterns: ['dist/*'],
  rules: {
    'cypress/unsafe-to-chain-command': 'error',
    'cypress/no-unnecessary-waiting': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
};
