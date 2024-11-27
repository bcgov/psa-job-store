import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('the user activates the action menu for a position', () => {
  // Simulate user clicking the ellipsis to open the action menu
  cy.get(`[data-row-key="${3}"]`).find(`.ellipsis-${3}`).click();
});

Then('focus should move to the first item in the action menu', () => {
  // Assuming your first menu item has a unique test ID or can be otherwise uniquely selected
  cy.focused().should('have.attr', 'data-testid', `menu-option-view`);
});

When('the user closes the menu with the escape key', () => {
  cy.get('[data-testid="menu-option-view"]').trigger('keydown', { key: 'Escape' });
  // cy.focused().trigger('keydown', { key: 'Escape' });
});

Then('focus should return to the ellipsis button that opened it', () => {
  cy.focused().should('have.attr', 'data-testid', 'popover-trigger');
});
