import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('the search results should still display job profiles containing "multiple programs"', () => {
  // Checking for the presence of two specific job profiles as the default result
  cy.get('[data-cy="search-results-list"]').should('contain', 'OFFICE MANAGER (SUPERVISORY)');
  cy.get('[data-cy="search-results-list"]').should('contain', 'Financial Analyst');
});
