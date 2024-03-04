import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('the user has applied filters for status and classification', () => {
  // Apply a status filter
  cy.get('[data-testid="status-filter-dropdown"]').click();
  cy.get('.ant-select-dropdown:not(.ant-select-dropdown-hidden)')
    .find('.ant-select-item-option-content')
    .contains('Draft')
    .click();

  // Apply a classification filter
  cy.get('[data-testid="classification-filter-dropdown"]').click();
  cy.get('.ant-select-dropdown:not(.ant-select-dropdown-hidden)')
    .find('.ant-select-item-option-content')
    .contains('ENG')
    .click();

  // should exist
  cy.get('[data-testid="filters-section"]').should('exist');
  cy.get('[data-testid="filters-tags-section"]').should('exist');
  cy.get('.ant-table-footer > div').should('have.text', 'Showing 1-1 of 1 results');
});

When('the user clicks the "Clear all filters" button', () => {
  cy.get('[data-testid="clear-filters-button"]').click();
});

Then('all filters should be cleared and the default job position results should be displayed', () => {
  cy.get('[data-testid="filters-section"]').should('not.exist');
  cy.get('[data-testid="filters-tags-section"]').should('not.exist');

  cy.get('.ant-table-footer > div').should('have.text', 'Showing 1-2 of 3 results');
});
