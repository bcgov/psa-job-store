import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('the user enters a keyword into the search field', () => {
  // Adjust the selector to target the search input field correctly
  cy.get('[aria-label="Search by job title or keyword"]').type('analyst');
});

When('the user clicks the "Search" button', () => {
  cy.contains('button', 'Find job profiles').click();
});

Then('job profiles containing that keyword in any of the searchable fields should be displayed', () => {
  // Verify that job profiles containing the keyword are displayed
  // Adjust the selector to target the elements that display the job profiles
  cy.get('[data-testid="job-profile-search-results"]').should('contain', 'analyst');
});
