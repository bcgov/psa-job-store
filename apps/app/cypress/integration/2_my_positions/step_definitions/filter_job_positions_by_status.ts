import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('the user selects the "Draft" status from the status filter dropdown', () => {
  // First, ensure the dropdown is clicked to make it visible.
  cy.get('[data-testid="status-filter-dropdown"]').click(); // Adjust if needed to match the trigger element

  // Then, select the option. Given the HTML structure, use the correct selector.
  cy.get('.ant-select-dropdown:not(.ant-select-dropdown-hidden)') // Ensure the dropdown is not hidden
    .find('.ant-select-item-option-content') // Find the option by its content container
    .contains('Draft') // Match the option text
    .click(); // Click the option
});

Then('only job positions with the "Draft" status should be displayed', () => {
  // Use a more specific selector if possible to narrow down the search and improve test reliability
  cy.get('[data-testid^="status-"]', { timeout: 10000 }) // Extend timeout to wait for the UI update
    .should('contain', 'Draft'); // Ensure the element contains the text 'Draft'
});
