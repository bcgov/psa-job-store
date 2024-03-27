import { Given } from '@badeball/cypress-cucumber-preprocessor';

Given('the job profiles for the first page should be displayed', () => {
  cy.get('[data-cy="search-results-list"]')
    .find('li')
    .eq(0)
    .find('[data-cy="card-title"]')
    .contains('Financial Analyst');
  cy.get('[data-cy="search-results-list"]')
    .find('li')
    .eq(1)
    .find('[data-cy="card-title"]')
    .contains('Strategic HR Manager');
});
