import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('the user selects a classification from the classification filter dropdown', () => {
  // First, ensure the dropdown is clicked to make it visible.
  cy.get('[data-testid="classification-filter-dropdown"]').click(); // Adjust if needed to match the trigger element

  // Then, select the option. Given the HTML structure, use the correct selector.
  cy.get('.ant-select-dropdown:not(.ant-select-dropdown-hidden)') // Ensure the dropdown is not hidden
    .find('.ant-select-item-option-content') // Find the option by its content container
    .contains('ENG') // Match the option text
    .click(); // Click the option
});

Then('only job positions with the selected classification should be displayed', () => {
  // Use a more specific selector if possible to narrow down the search and improve test reliability
  cy.get('[data-testid^="classification-"]', { timeout: 10000 }) // Extend timeout to wait for the UI update
    .should('contain', 'ENG'); // Ensure the element contains the text 'Draft'
});
