import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

// Background steps
Given('the user is logged in', () => {
  cy.login();
});

Given('the user is on the home page', () => {
  cy.visit('/');
});

// Scenario steps
When('the user presses "Create new direct report" on the home page org chart', () => {
  // Wait for the org chart to load
  cy.get('[data-testid="org-chart-loading"]', { timeout: 100000 }).should('not.exist');
  cy.get('[data-testid="org-chart-container"]', { timeout: 100000 }).should('be.visible');

  // Select the specific node with ID '00121521' and assign it an alias
  cy.get('[data-testid="org-chart-node-00121521"]').as('targetNode');

  // Click on the node to select it or to reveal the 'Create new direct report' button
  cy.get('@targetNode').scrollIntoView().should('be.visible').click();

  // Re-query the DOM for the node and find the 'Create new direct report' button within it
  cy.get('@targetNode').find('[data-testid="create-direct-report-button"]').click();
});

Then('they are taken to the job profile selection step', () => {
  // Check if the URL is correct
  // The URL pattern should match /position-request/{id}
  cy.url().should('match', /\/my-position-requests\/\d+/);

  // Check for a unique element on the job profile selection page
  // Replace 'unique-element-selector' with an actual selector for an element unique to this page
  cy.get('[data-testid="job-profile-card"]', { timeout: 10000 }).should('be.visible');
});

When('the user changes the search results page', () => {
  // Open the page size dropdown
  cy.get('[data-testid="pagination"] .ant-pagination-item')
    .contains('a', '2') // This targets a link with exactly '2' inside the pagination item
    .click();
});

When('the user selects a job profile', () => {
  cy.get('[data-testid="job-profile-card"]').first().click();
});

Then('they proceed to the profile editing step', () => {
  cy.get('[data-testid="profile-editing-form"]').should('be.visible');
});

Then('the form contains default values of the selected profile', () => {
  cy.get('[data-testid="job-title-input"]').should('have.value', 'Strategic HR Analyst Manager');
});

When('the user presses the back button', () => {
  cy.get('[data-testid="back-button"]').click();
});

Then('the previously selected job profile is still selected', () => {
  cy.get('.testid-selectedProfile').should('be.visible');
});

Then('the correct page is selected', () => {
  cy.get('.ant-pagination-item-2').should('have.class', 'ant-pagination-item-active');
});

When('the user selects a different job profile on a different page', () => {
  cy.get('[data-testid="pagination"] .ant-pagination-item')
    .contains('a', '3') // This targets a link with exactly '2' inside the pagination item
    .click();

  cy.get('[data-testid="job-profile-card"]').first().click();
});

When('they press the next button', () => {
  cy.get('[data-testid="next-button"]').click();
});

Then('they are shown a warning that they are changing the job profile', () => {
  cy.get('[data-testid="change-profile-warning"]').should('be.visible');
});

When('the user presses the cancel button', () => {
  cy.contains('button', 'Cancel', { matchCase: false }).click();
});

Then('the search results reset back to the previously selected job profile and page', () => {
  cy.get('.testid-selectedProfile').should('be.visible');
  cy.get('.ant-pagination-item-2').should('have.class', 'ant-pagination-item-active');
});

When('the user confirms the change', () => {
  cy.contains('button', 'Change job profile', { matchCase: false }).click();
});

Then('the form contains default values of the new profile', () => {
  cy.get('[data-testid="job-title-input"]').should('have.value', 'Dynamic Digital Marketing Specialist');
});

When('the user does some edits', () => {
  cy.get('[data-testid="job-title-input"]').clear().type('Edited Title');
});

Then('the form contains the previously entered values', () => {
  cy.get('[data-testid="job-title-input"]').should('have.value', 'Edited Title');
});

Then('the new previously selected job profile and page is selected', () => {
  cy.get('.testid-selectedProfile').should('be.visible');
  cy.get('.ant-pagination-item-3').should('have.class', 'ant-pagination-item-active');
});
