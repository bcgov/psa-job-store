/* eslint-disable @typescript-eslint/no-require-imports -- Required for Cypress configuration which doesn't fully support ES modules */
const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const fs = require('fs');
require('dotenv').config();

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    }),
  );

  // Add video cleanup logic
  on('after:spec', (spec, results) => {
    if (results && results.video) {
      // Check for failures in any retry attempts
      const failures = results.tests.some((test) =>
        test.attempts.some((attempt) => attempt.state === 'failed')
      );
      if (!failures) {
        // Delete the video if the spec passed and no tests retried
        try{
        fs.unlinkSync(results.video);
        } catch (e) {
          console.log('Error deleting video: ', e);
        }
      }
    }
  });

  if (process.env.CYPRESS_BASE_URL) {
    config.baseUrl = process.env.CYPRESS_BASE_URL;
  }

  require('cypress-terminal-report/src/installLogsPrinter')(on, {
    printLogsToConsole: 'always',
    printLogsToFile: 'always',
  });

  return config;
}

module.exports = defineConfig({
  env: {
    VITE_KEYCLOAK_REALM_URL: process.env.VITE_KEYCLOAK_REALM_URL,
    VITE_KEYCLOAK_CLIENT_ID: process.env.VITE_KEYCLOAK_CLIENT_ID,
    VITE_BACKEND_URL: process.env.VITE_BACKEND_URL,
    VITE_E2E_AUTH_KEY: process.env.VITE_E2E_AUTH_KEY,
  },
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: 'http://localhost:5173/',
    specPattern: ['cypress/support/setup.cy.js', '**/*.feature'],
    // specPattern: '**/*.spec.js',
    setupNodeEvents,
  },
});