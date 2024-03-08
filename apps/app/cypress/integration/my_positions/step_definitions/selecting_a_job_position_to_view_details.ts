import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('the user clicks on a job position from the list', () => {
  cy.get('[data-testid="job-position-3"]').click();
});

Then('the details of the selected job position are displayed', () => {
  // Verify the URL to ensure navigation occurred
  cy.url().should('include', '/my-positions/3');

  // Add assertions to verify elements specific to the job position details page are displayed
  // For example, check for the presence of a title or description specific to job position 3
  cy.get('[data-testid="review-step-subtitle"]').should('exist');
});
