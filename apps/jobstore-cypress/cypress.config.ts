/* eslint-disable @typescript-eslint/no-require-imports -- Required for Cypress configuration which doesn't fully support ES modules */
const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    }),
  );

  if (process.env.CYPRESS_BASE_URL) {
    config.baseUrl = process.env.CYPRESS_BASE_URL;
  }

  return config;
}

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: 'http://localhost:5173/',
    specPattern: '**/*.feature',
    setupNodeEvents,
  },
});
