import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('there are multiple pages of job profiles', () => {
  // Assuming you have a way to mock or ensure that multiple pages of job profiles are available
  // This could involve setting up mocks, seeding a database, or other setup steps
  // Example:
  // cy.intercept('GET', '/api/job-profiles', { fixture: 'jobProfilesMultiplePages.json' });
});

Given('the user sets the page size to 2', () => {
  // Open the page size dropdown
  cy.get('[data-testid="pagination"] .ant-pagination-options-size-changer').click();

  // Select the '2 / page' option
  cy.get('.ant-select-dropdown').contains('.ant-select-item-option', '2 / page').click();
});

When('the user navigates to a specific page', () => {
  cy.get('[data-testid="pagination"] .ant-pagination-item')
    .contains('a', '2') // This targets a link with exactly '2' inside the pagination item
    .click();
});

Then('the job profiles for that page are displayed', () => {
  // Check if the job profiles corresponding to that page are displayed
  // This might involve checking if certain profiles are present or not
  // Example:
  cy.get('[data-testid="job-profile-search-results"]').should('contain', 'File Clerk');
});
