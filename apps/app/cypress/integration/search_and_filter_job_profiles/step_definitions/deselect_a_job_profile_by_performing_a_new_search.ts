import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('a job profile is currently selected and its details are displayed', () => {
  // Navigate to the job profiles list and select a job profile
  cy.visit('/job-profiles');
  const selectedJobProfile = 'Program Assistant'; // Use an existing job profile for selection
  cy.contains(selectedJobProfile).click();
  cy.get('[data-testid="job-profile"]').should('contain', selectedJobProfile);
});

When('the user performs a new search', () => {
  // Perform a new search
  const newSearchKeyword = 'analyst';
  cy.get('[aria-label="Search by job title or keyword"]').type(newSearchKeyword);
  cy.contains('button', 'Find job profiles').click();

  // Alternatively, you can simulate applying a new filter
  // const newClassification = 'Clerk R9';
  // cy.get('[data-cy="Classification-filter"]').find('.react-select__input-container').click();
  // cy.get('[data-cy="Classification-filter"]').find('input').type(newClassification);
  // cy.get('[data-cy="Classification-filter"]').find('.react-select__menu div').contains(newClassification).click();
});

Then('the previously selected job profile should be deselected', () => {
  // Check that the details view of the previously selected job profile is not displayed
  const selectedJobProfile = 'Program Assistant';
  cy.get('body').should('not.contain', selectedJobProfile);
});

Then('the details view should be cleared or hidden', () => {
  // Check that the details view is cleared or hidden
  cy.get('[data-testid="job-profile"]').should('not.exist');
});
