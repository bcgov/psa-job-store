import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('the user enters "analyst" into the search field', () => {
  cy.get('[data-testid="search-field"]').type('analyst');
});

When('the user clicks the "Find positions" button', () => {
  cy.contains('button', 'Find positions').click();
});

Then('job positions containing "analyst" in the title or submission ID should be displayed', () => {
  cy.get('[data-testid="job-title"], [data-testid="submission-id"]')
    .should('exist')
    .and((elements) => {
      const titlesOrIds = [...elements].map((el) => el.innerText.toLowerCase());
      expect(titlesOrIds.some((text) => text.includes('analyst'))).to.be.true;
    });
});
