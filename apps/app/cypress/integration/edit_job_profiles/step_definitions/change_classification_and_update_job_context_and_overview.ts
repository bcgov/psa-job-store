import { Given, When } from '@badeball/cypress-cucumber-preprocessor';

Given('the user is logged in', () => {
  cy.login(); // You'll define a custom command in Cypress for login
});

When('the user selects "Band 1" from the classification dropdown', () => {
  cy.visit('/wizard');
});

// // Add all the other "Given" steps to set up the test environment

// When('the user selects "Band 1" from the classification dropdown', () => {
//   cy.get('[data-testid=classification-dropdown]').select('Band 1');
// });

// // Add other "When" steps for user interactions

// Then('the user should be taken to the review edits page', () => {
//   cy.url().should('include', '/review');
// });

// // Add other "Then" steps for assertions
