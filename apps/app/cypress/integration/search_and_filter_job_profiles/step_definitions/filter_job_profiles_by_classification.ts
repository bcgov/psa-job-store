import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('the user is logged in', () => {
  cy.login(); // You'll define a custom command in Cypress for login
});

Given('the user navigates to the job search page', () => {
  cy.visit('/job-profiles');
});

When('the user selects "CLK 09R" from the classification filter dropdown', () => {
  cy.get('[data-cy="Classification-filter"]').click();
  cy.get('.ant-select-dropdown:not(.ant-select-dropdown-hidden)').contains('CLK 09R').click();
});

Then('only job profiles classified as "CLK 09R" should be displayed', () => {
  cy.get('[data-cy="search-results-list"]').find('li').should('have.length', 1);
  cy.get('[data-cy="search-results-list"]')
    .find('li')
    .each(($li) => {
      cy.wrap($li).find('[data-cy="card-classification"]').contains('CLK 09R');
    });
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
