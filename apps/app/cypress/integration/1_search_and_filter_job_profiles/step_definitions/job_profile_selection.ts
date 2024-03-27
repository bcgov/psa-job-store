import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('the user clicks on a job profile from the list', () => {
  const jobProfile = 'Data Scientist';
  cy.contains(jobProfile).click();
});

Then('the details of the selected job profile are displayed', () => {
  const jobProfile = 'Data Scientist';
  cy.get('[data-testid="job-profile"]').within(() => {
    cy.contains('th', 'Title').next('td').should('contain', jobProfile);
  });
});
