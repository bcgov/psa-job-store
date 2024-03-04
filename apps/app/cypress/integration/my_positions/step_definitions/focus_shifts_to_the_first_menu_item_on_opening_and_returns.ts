const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

When('the user activates the action menu for a position', () => {
  // Simulate user clicking the ellipsis to open the action menu
  cy.get(`[data-row-key="${3}"]`).find(`.ellipsis-${3}`).click();
});

Then('focus should move to the first item in the action menu', () => {
  // Assuming your first menu item has a unique test ID or can be otherwise uniquely selected
  cy.focused().should('have.attr', 'data-testid', `view-link`);
});

When('the user closes the menu with the escape key', () => {
  cy.get('[data-testid="view-link"]').trigger('keydown', { key: 'Escape' });
  // cy.focused().trigger('keydown', { key: 'Escape' });
});

Then('focus should return to the ellipsis button that opened it', () => {
  const dynamicPart = 3; // This would be dynamically determined in your actual test
  const expectedClass = `ellipsis-${dynamicPart}`;

  // This checks if the focused element has the expected class
  cy.focused().should('have.class', expectedClass);
});
