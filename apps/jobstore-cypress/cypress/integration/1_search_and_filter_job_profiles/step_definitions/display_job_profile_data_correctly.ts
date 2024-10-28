import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('the user views the job profiles list', () => {
  // This step is intentionally left minimal as the job profiles list is expected
  // to be visible upon navigation to the job search page.
});

Then('they see a list of job profiles', () => {
  const profile1 = 'Data Scientist';
  const profile2 = 'Project Manager';

  // Verify if both job profiles are present in the document
  cy.contains(profile1).should('exist');
  cy.contains(profile2).should('exist');
});
