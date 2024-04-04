import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('the user is logged in', () => {
  cy.login(); // You'll define a custom command in Cypress for login
});

When('the user navigates to the home page', () => {
  cy.visit('/'); // Adjust the URL to your application's home page URL
});

Then('the user should see recent positions', () => {
  cy.get('[data-testid="recent-positions"]').should('be.visible');
});

When('the user should see org chart', () => {
  cy.get('[data-testid="org-chart"]').should('be.visible');
});

When('the user should see correct counts for position requests', () => {
  cy.get('[data-testid="total-positions"]').should('contain', '4');
  cy.get('[data-testid="in-review-positions"]').should('contain', '1');
  cy.get('[data-testid="completed-positions"]').should('contain', '1');
});

When('the user should see create new position button', () => {
  cy.get('[data-testid="create-new-position-btn-collapsed"]').should('be.visible');
});

When('the user should see other menu options', () => {
  cy.get('[data-testid="menu-options"]').should('be.visible');
});

// Assuming there is a mechanism to check if the menu is collapsed or expanded
// This will depend on how your application's UI changes when these actions occur
When('the user clicks expand menu', () => {
  cy.get('[data-testid="menu-toggle-btn"]').click();
  // You might need to adjust this based on how your application implements the toggle
});

Then('the menu should be expanded', () => {
  cy.get('[data-testid="menu-toggle-btn"]').should('not.have.attr', 'aria-label', 'Expand side navigation');
  // Alternatively, check for the presence of an icon or another visual cue indicating the menu is expanded
});

// Collapsing the menu
When('the user clicks collapse menu', () => {
  cy.get('[data-testid="menu-toggle-btn"]').click();
});

// Checking if the menu is collapsed
Then('the menu should be collapsed', () => {
  cy.get('[data-testid="menu-toggle-btn"]').should('have.attr', 'aria-label', 'Expand side navigation');
  // Alternatively, check for the presence of an icon or another visual cue indicating the menu is collapsed
});

Then('the user reloads the page', () => {
  cy.reload();
});
