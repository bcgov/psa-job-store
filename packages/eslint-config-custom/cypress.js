const { resolve } = require('node:path');

const tsconfigRootDir = resolve(process.cwd());
const project = resolve(tsconfigRootDir, 'tsconfig.json');

module.exports = {
  root: true,
  env: { es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:cypress/recommended',
  ],
  ignorePatterns: [], // 'cypress/**/*'
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project,
    tsconfigRootDir,
    sourceType: 'module',
  },
  plugins: ['cypress'],
  // rules: {
  //   'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  // },
};

// module.exports = {
//   root: true,
//   extends: ['plugin:@typescript-eslint/recommended', 'plugin:cypress/recommended'],
//   parser: '@typescript-eslint/parser',
//   plugins: ['@typescript-eslint', 'cypress'],
//   parserOptions: {
//     project: './tsconfig.json',
//     tsconfigRootDir: __dirname,
//   },
// };
