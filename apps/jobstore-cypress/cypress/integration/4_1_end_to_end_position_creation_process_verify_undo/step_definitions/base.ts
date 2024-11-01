import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('the user is logged in', () => {
  cy.login(); // You'll define a custom command in Cypress for login
});

Given('the user is on the home page', () => {
  cy.visit('/');
});

When('the user presses "Create new direct report" on the home page org chart', () => {
  // Wait for the org chart to load
  cy.get('[data-testid="org-chart-loading"]', { timeout: 100000 }).should('not.exist');
  cy.get('[data-testid="org-chart-container"]', { timeout: 100000 }).should('be.visible');
  cy.get('div[data-id="00132136"]').should('have.class', 'selected');

  // Select the specific node with ID '00121521' and assign it an alias
  cy.get('[data-testid="org-chart-node-00987654"]').as('targetNode');

  // Click on the node to select it or to reveal the 'Create new direct report' button
  cy.get('@targetNode').scrollIntoView();
  cy.get('@targetNode').click({ force: true });

  // Re-query the DOM for the node and find the 'Create new direct report' button within it
  cy.get('@targetNode').find('[data-testid="create-direct-report-button"]').click({ force: true });
});

Then('they are taken to the job profile selection step', () => {
  // Check if the URL is correct
  // The URL pattern should match /position-request/{id}
  cy.url().should('match', /\/requests\/positions\/\d+/);

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

Then('they proceed to the review changes step', () => {
  cy.get('[data-testid="next-button"]').click();
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
  cy.get('[data-testid="loading-spinner"]').should('be.visible');
  cy.get('[data-testid="loading-spinner"]', { timeout: 15000 }).should('not.exist');

  cy.get('[data-testid="branch-input"]').type('test branch');
  cy.get('[data-testid="division-input"]').type('test division');

  // Now click the "Next" button
  cy.get('[data-testid="next-button"]').click();
});

Then('they proceed to the result step', () => {
  // Check for a unique element on the result page
  // Replace 'unique-element-selector' with an actual selector for an element unique to this page
  cy.get('[data-testid="result-page"]').should('be.visible');
});

When('the user clicks the "Generate position number" button and confirms the dialog', () => {
  // Set up interception
  // cy.intercept('POST', 'http://localhost:4000/graphql', (req) => {
  //   if (req.body.operationName === 'SubmitPositionRequest') {
  //     // Assuming the operation name is 'SubmitPositionRequest',
  //     // we can further inspect or manipulate the request here if needed.
  //     // For now, we just log it to confirm interception.
  //     console.log('Intercepted SubmitPositionRequest', req.body);
  //     // Optionally, mock a response here if the frontend expects a specific response format.
  //     req.reply({
  //       data: {
  //         submitPositionRequest: {
  //           // Provide a mock response suitable for your application's needs
  //           id: req.body.variables.id, // Echo back the provided id for consistency
  //           step: 'some-step',
  //           reports_to_position_id: 123,
  //           department_id: 456,
  //           parent_job_profile_id: 789,
  //           profile_json: '{}',
  //           user_id: 'user-id',
  //           title: 'Generated Position',
  //           position_number: 123456,
  //           classification_id: 101112,
  //           classification_code: 'XYZ',
  //           user_name: 'John Doe',
  //           email: 'john.doe@example.com',
  //           submission_id: 'submission-id',
  //           approved_at: null,
  //           status: 'COMPLETED',
  //           updated_at: new Date().toISOString(),
  //         },
  //       },
  //     });
  //   }
  // }).as('submitPositionRequest');

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

When('the user makes edits in significant fields', () => {
  cy.get('[data-testid="job-title-input"]').clear();
  cy.get('[data-testid="job-title-input"]').type('Verification test');
  cy.get('[data-testid="remove-accountability-7"]').click();
  cy.get('[data-testid="accountabilities-warning"]').should('exist');
  cy.contains('button', 'Proceed').click();
  // cy.get('[data-testid="remove-education and work experience-8"]').click();
  // cy.get('[data-testid="education-warning"]').should('exist');
  // cy.contains('button', 'Proceed').click();
  // cy.get('[data-testid="remove-job-experience-1"]').click();
  // cy.get('[data-testid="experience-warning"]').should('exist');
  // cy.contains('button', 'Proceed').click();
});

Then('proceeds to next step', () => {
  // Click the "Next" button
  cy.wait(500);
  cy.get('[data-testid="next-button"]', { timeout: 10000 }).should('not.be.disabled');
  cy.get('[data-testid="next-button"]').click();
});

Then('they see a verification warning window', () => {
  // Check for the presence of the verification warning window
  cy.get('[data-testid="verification-warning"]').should('be.visible');
});

Then('it contains a warning message with links to the edit form', () => {
  // Check for the warning message text
  cy.get('[data-testid="verification-warning-message"]').should(
    'contain.text',
    'Some of your amendments to the generic profile require verification.',
  );

  cy.get('[data-testid="verification-warning-message"]').should('contain.text', 'Changes in Accountabilities');
  // cy.get('[data-testid="verification-warning-message"]').should('contain.text', 'Changes in Education');
  // cy.get('[data-testid="verification-warning-message"]').should('contain.text', 'Changes in Job Experience');

  // Check for the presence of the edit form link
  cy.get('[data-testid="edit-form-link"]').should('be.visible');
});

When('the user clicks the link in the warning message', () => {
  // Click the edit form link
  cy.get('[data-testid="edit-form-link"]').find('li').first().find('a').click();
});

Then('they are taken to the edit form', () => {
  // Check for a unique element on the edit form page
  cy.get('[data-testid="profile-editing-form"]').should('be.visible');
});

When('the user undoes previous significant changes', () => {
  cy.get('[data-testid="undo-remove-accountability-7"]').click();
  // cy.get('[data-testid="undo-remove-education and work experience-8"]').click();
  // cy.get('[data-testid="undo-remove-job-experience-1"]').click();
});

Then('the user sees the screen with "Generate position number button"', () => {
  // Check for the presence of the "Generate position number" button
  cy.get('[data-testid="generate-position-button"]').should('be.visible');
});
