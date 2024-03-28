const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

// When the user hovers over a specific position row
When('the user hovers over the position row with id {string}', (rowId) => {
  cy.get(`[data-row-key="${rowId}"]`).trigger('mouseover');
});

// And clicks the copy button next to the position number
When('the user clicks the copy button next to the position number', () => {
  // Assuming the button becomes visible on hover and has a unique data-testid or other selector when visible
  cy.get('[data-testid="copy-position-number-button"]:visible').click();
});

// Then a success message "Position number copied!" should be displayed
Then('a success message "Position number copied!" should be displayed', () => {
  cy.contains('Position number copied!').should('be.visible');
});
