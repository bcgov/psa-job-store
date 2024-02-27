import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('the user is logged in', () => {
  cy.login(); // You'll define a custom command in Cypress for login
});

Given('the user is on the home page', () => {
  cy.visit('/');
});

When('the user presses "Create new direct report" on the home page org chart', () => {
  // Wait for the org chart to load
  cy.get('[data-testid="org-chart-loading"]', { timeout: 20000 }).should('not.exist');
  cy.get('[data-testid="org-chart-container"]', { timeout: 20000 }).should('be.visible');

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
  cy.url().should('match', /\/position-request\/\d+/);

  // Check for a unique element on the job profile selection page
  // Replace 'unique-element-selector' with an actual selector for an element unique to this page
  cy.get('[data-testid="job-profile-card"]', { timeout: 10000 }).should('be.visible');
});

When('the user selects a job profile', () => {
  // Assuming the first job profile card should be selected
  cy.get('[data-testid="job-profile-card"]').first().click();

  // Now click the "Next" button
  cy.get('[data-testid="next-button"]').click();
});

Then('they proceed to the profile editing step', () => {
  // Check for a unique element on the profile editing page
  // Replace 'unique-element-selector' with an actual selector for an element unique to this page
  cy.get('[data-testid="profile-editing-form"]').should('be.visible');
});

When('the user does not make edits', () => {
  cy.get('[data-testid="next-button"]').click();
});

Then('they proceed to the review changes step', () => {
  // Check for a unique element on the review changes page
  // Replace 'unique-element-selector' with an actual selector for an element unique to this page
  cy.get('[data-testid="review-changes-page"]').should('be.visible');
});

When('the user reviews their changes', () => {
  cy.get('[data-testid="next-button"]').click();
});

Then('they proceed to the additional information step', () => {
  // Check for a unique element on the additional information page
  // Replace 'unique-element-selector' with an actual selector for an element unique to this page
  cy.get('[data-testid="additional-information-form"]').should('be.visible');
});

When('the user fills out the required additional information', () => {
  // Toggle the confirmation switch
  cy.get('[data-testid="confirmation-switch"]').click();

  // Select the first option in the location dropdown
  cy.get('[data-testid="location-select"]').click();
  cy.get('.ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item').first().click();

  // Select the first option in the department dropdown
  cy.get('[data-testid="department-select"]').click();
  cy.get('.ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item').first().click();

  // Type in the reporting manager
  cy.get('[data-testid="reporting-manager-input"]').type('00121521');

  // Wait for the loading spinner to appear and then disappear
  cy.get('[data-testid="loading-spinner"]').should('be.visible');
  cy.get('[data-testid="loading-spinner"]').should('not.exist');

  // Now click the "Next" button
  cy.get('[data-testid="next-button"]').click();
});

Then('they proceed to the result step', () => {
  // Check for a unique element on the result page
  // Replace 'unique-element-selector' with an actual selector for an element unique to this page
  cy.get('[data-testid="result-page"]').should('be.visible');
});

When('the user clicks the "Generate position number" button and confirms the dialog', () => {
  // Click the 'Generate position number' button
  cy.get('[data-testid="generate-position-button"]').click();

  // Wait for the modal to appear and then click the 'OK' button
  cy.get('[data-testid="confirm-modal-ok"]').click();
});

Then('they see a confirmation screen with the position number', () => {
  // Increase the timeout for this specific check
  const customTimeout = 10000; // Timeout in milliseconds, e.g., 10000 for 10 seconds

  // Check if the element with the position number is present and contains a number
  cy.get('[data-testid="position-number"]', { timeout: customTimeout }).should(($div) => {
    const text = $div.text();
    expect(text).to.match(/^\d+$/); // Regular expression to match a number
  });
});
