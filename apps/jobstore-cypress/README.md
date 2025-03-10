# JobStore Cypress E2E Testing

This package contains end-to-end tests for the BC Public Service Agency's Job Store application using Cypress and Cucumber for behavior-driven testing.

## Overview

The JobStore Cypress package provides automated end-to-end tests that verify the functionality of the Job Store application from a user's perspective. These tests simulate real user interactions with the application and validate that all features work as expected.

## Features

- **Behavior-Driven Development (BDD)**: Tests are written in Gherkin syntax using Cucumber integration
- **Test Coverage**: Tests for most major hiring manager user flows including:
  - Job profile search and filtering
  - Position creation process
  - Hiring manager dashboard
  - Job profile editing for hiring managers
  - Organization chart navigation
- **Automated Authentication**: Custom commands for handling authentication
- **CI/CD Integration**: Configured to run in GitHub Actions workflows

## Prerequisites

- Node.js >=20.11.1 <21.0.0
- Running instance of the Job Store API (with `E2E_TESTING=true` and `USE_MOCKS=true`)
- Running instance of the Job Store frontend application

## Local Setup

1. Copy and rename `sample.env` to `.env` and configure the environment variables:

   ```
   VITE_BACKEND_URL=http://localhost:4000
   CYPRESS_BASE_URL=http://localhost:3000/
   CYPRESS_DOMAIN=localhost
   VITE_E2E_AUTH_KEY=super_secret_1234
   ```

   **Note**: Ensure that the `VITE_E2E_AUTH_KEY` value matches the `E2E_AUTH_KEY` value in your API's `.env` file.

2. Ensure the API is running with the correct configuration:
   - `E2E_TESTING=true` in the API's `.env` file
   - `USE_MOCKS=true` in the API's `.env` file
   - Database has been reset to defaults with seed data:
     ```bash
     npx -w api npm run migrate:reset:e2e-test
     ```

## Running Tests

### Open Cypress Test Runner

```bash
npx -w jobstore-cypress cypress open
```

This opens the Cypress Test Runner UI where you can select and run individual tests.

### Run Tests Headlessly

```bash
npx -w jobstore-cypress cypress run --browser edge --headless
```

This runs all tests without the Cypress UI, similar to how they run in CI/CD pipelines.

## Test Structure

### Feature Files

Tests are organized as feature files in the `cypress/integration` directory using Gherkin syntax:

- `1_1_home-page.feature` - Tests for the dashboard/home page
- `1_search_and_filter_job_profiles.feature` - Tests for job profile search functionality
- `2_my_positions.feature` - Tests for the My Positions section
- `3_edit_job_profiles.feature` - Tests for job profile editing
- `4_end_to_end_position_creation_process.feature` - Tests for the complete position creation workflow
- `5_view_shared_profile_link.feature` - Tests for sharing job profiles

### Step Definitions

Step definitions that implement the Gherkin scenarios are located in corresponding subdirectories:

- `cypress/integration/1_1_home-page/`
- `cypress/integration/1_search_and_filter_job_profiles/`
- etc.

### Support Files

- `cypress/support/commands.ts` - Custom Cypress commands including authentication
- `cypress/support/setup.cy.js` - Test setup including login

## Test Order

Tests should be run in alphabetical order as there are dependencies between tests. For example:

1. Home page tests check for the number of position requests
2. Later tests create position requests, altering that count

When running tests locally, the database should be reset between test runs to ensure consistent results.

## CI/CD Integration

The tests are integrated into the GitHub Actions workflow in `.github/workflows/e2e.yml`. This workflow:

1. Waits for deployment to complete
2. Prepares the database for testing
3. Configures the environment for E2E testing
4. Runs the Cypress tests in headless mode
5. Uploads screenshots and videos if tests fail
6. Cleans up the E2E environment after testing

## Troubleshooting

### Common Issues

1. **Authentication Failures**:

   - Ensure `VITE_E2E_AUTH_KEY` in `.env` matches `E2E_AUTH_KEY` in the API's `.env`
   - Verify the API is running with `E2E_TESTING=true`

2. **Test Failures Due to Data State**:

   - Reset the database before running tests:
     ```bash
     npx -w api npm run migrate:reset:e2e-test
     ```

3. **Cypress Cannot Connect to Application**:
   - Verify the frontend and API are running
   - Check that `CYPRESS_BASE_URL` and `VITE_BACKEND_URL` are correct in `.env`

## Adding New Tests

1. Create a new feature file in `cypress/integration/` using Gherkin syntax
2. Create a corresponding directory with the same name for step definitions
3. Implement the step definitions in TypeScript
4. Run the tests to verify they work as expected

## Best Practices

- Keep feature files focused on user behavior, not implementation details
- Use descriptive scenario names that explain the user story
- Reuse step definitions where possible (todo)
