import js from '@eslint/js';
import pluginCypress from 'eslint-plugin-cypress/flat';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,

        // NEW
        // ...pluginCypress.environments.cypress.globals, // Add Cypress globals
        // cy: 'readonly',
        // Cypress: 'readonly',
        // expect: 'readonly',
        // assert: 'readonly',
      },
    },
    plugins: {
      cypress: pluginCypress,
    },
  },
  {
    rules: {
      'cypress/unsafe-to-chain-command': 'error',
      'cypress/no-unnecessary-waiting': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
);
