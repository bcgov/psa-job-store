import { And, Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('the user enters a keyword into the search field', () => {
  // Adjust the selector to target the search input field correctly
  cy.get('[aria-label="Search by job title or keyword"]').type('financial');
});

And('the user clicks the "Search" button', () => {
  // Adjust the selector to target the search button correctly
  cy.get('[aria-label="Search by job title or keyword"]').closest('form').submit();
});

Then('job profiles containing that keyword in any of the searchable fields should be displayed', () => {
  // Verify that job profiles containing the keyword are displayed
  // Adjust the selector to target the elements that display the job profiles
  cy.get('[data-testid="job-profile-search-results"]').should('contain', 'financial');
});
