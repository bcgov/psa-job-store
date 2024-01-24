import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('the user clicks the "Clear Filters" button', () => {
  cy.get('[data-cy="clear-filters-button"]').click(); // Replace with the actual data-cy attribute of your clear filters button
});

Then('the default job profile results should be displayed', () => {
  // Checking for the presence of two specific job profiles as the default result
  cy.get('[data-cy="search-results-list"]').should('contain', 'Program Assistant');
  cy.get('[data-cy="search-results-list"]').should('contain', 'PROGRAM ASSISTANT (SUPERVISORY)');
});
