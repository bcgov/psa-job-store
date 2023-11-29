const { resolve } = require('node:path');

const tsconfigRootDir = resolve(process.cwd());
const project = resolve(tsconfigRootDir, 'tsconfig.json');

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['node_modules', 'dist', '.eslintrc.cjs', 'jest.polyfill.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project,
    tsconfigRootDir,
    sourceType: 'module',
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
