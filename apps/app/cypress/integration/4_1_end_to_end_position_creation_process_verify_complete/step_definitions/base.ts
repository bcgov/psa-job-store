import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('the user is logged in', () => {
  cy.login(); // You'll define a custom command in Cypress for login
});

Given('the user is on the home page', () => {
  cy.visit('/');
});

let positionId = '';

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
  cy.url().should('match', /\/my-positions\/\d+/);

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
  // Toggle the confirmation switch
  cy.get('[data-testid="confirmation-switch"]').click();

  // Select the first option in the location dropdown
  // cy.get('[data-testid="location-select"]').click();
  // cy.get('.ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item').first().click();

  // Select the first option in the department dropdown
  cy.get('[data-testid="department-select"]').click();
  cy.get('.ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item').first().click();

  // Type in the reporting manager
  cy.get('[data-testid="reporting-manager-input"]').type('00121521');

  // Wait for the loading spinner to appear and then disappear
  cy.get('[data-testid="loading-spinner"]').should('be.visible');

  cy.get('[data-testid="loading-spinner"]', { timeout: 10000 }).should('not.exist');
  // cy.get('[data-testid="loading-spinner"]').should('not.exist');

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
  cy.get('[data-testid="job-title-input"]').clear().type('Verification test');
  cy.get('[data-testid="remove-accountability-7"]').click();
  cy.get('[data-testid="accountabilities-warning"]').should('exist');
  cy.contains('button', 'Proceed').click();
  cy.get('[data-testid="remove-education-8"]').click();
  cy.get('[data-testid="education-warning"]').should('exist');
  cy.contains('button', 'Proceed').click();
  cy.get('[data-testid="remove-job-experience-1"]').click();
  cy.get('[data-testid="experience-warning"]').should('exist');
  cy.contains('button', 'Proceed').click();
});

Then('proceeds to next step', () => {
  // Click the "Next" button
  cy.wait(200);
  cy.get('[data-testid="next-button"]', { timeout: 10000 }).should('be.visible').and('not.be.disabled');
  cy.get('[data-testid="next-button"]').click();
});

Then('they see a verification warning window', () => {
  // Check for the presence of the verification warning window
  cy.get('[data-testid="verification-warning"]').should('be.visible');
});

When('the user enters comments into the comment box', () => {
  // Type in the comments
  cy.get('[data-testid="comments-input"]').type('This is a test comment');
});

////

When('the user presses "Submit for verification"', () => {
  // Click the "Submit for verification" button
  cy.get('[data-testid="submit-for-verification-button"]').click();
});

Then('they see a success message', () => {
  // Check for the presence of a success message
  cy.get('[data-testid="verification-success-message"]').should('be.visible');

  // Capture the position ID from the URL
  cy.url().then((url) => {
    const matches = url.match(/\/my-positions\/(\d+)/);
    if (matches && matches.length > 1) {
      positionId = matches[1];
    }
  });
});

Then('position request contains the comment', () => {
  // make a request to the endpoint to get the position request details
  const token = Cypress.env('AUTH_TOKEN');
  console.log('token: ', token);

  // make the request
  cy.request({
    method: 'POST',
    url: 'http://localhost:4000/graphql',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      query: `
        query {
          positionRequest(id: ${positionId}) {
            additional_info_comments
          }
        }
      `,
    },
  }).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body.data.positionRequest.additional_info_comments).to.equal('This is a test comment');
  });
});

When('user navigates to My Positions page', () => {
  // Navigate to the "My Positions" page
  cy.visit('/my-positions');
});

Then('they see the new position in the list with "In Review" status', () => {
  cy.get('.job-position-row').first().find('[data-testid="job-title"]').should('have.text', 'Verification test');

  // Check if the new position is present in the list with "In Review" status
  cy.get('.job-position-row').first().find('[data-testid="status-VERIFICATION"]').should('be.visible');
});

// Classifications switches status scenario

When('Classification team switches the CRM service request to "Action required"', () => {
  const token = Cypress.env('AUTH_TOKEN');
  console.log('token: ', token);

  // Make a request to the endpoint to update the position status
  cy.request({
    method: 'POST',
    url: 'http://localhost:4000/graphql',
    headers: {
      Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
    },
    body: {
      query: `
        mutation {
          updatePositionRequestStatus(id: ${positionId}, status: 3)
        }
      `,
    },
  }).then((response) => {
    expect(response.status).to.equal(200);
    console.log('hi', response.body);
    expect(response.body.data.updatePositionRequestStatus).to.be.true;
  });
});

When('user waits for systems to synchronize', () => {
  // Wait for a few seconds for the systems to synchronize
  cy.wait(70000);
});

When('the user navigates to My Positions page', () => {
  // Navigate to the "My Positions" page
  cy.visit('/my-positions');
});

Then('they see the new position in the list with "Action required" status', () => {
  // Check if the first row has the "Action required" status
  cy.get('.job-position-row').first().find('[data-testid="status-ACTION_REQUIRED"]').should('be.visible');

  // Check the job title in the first row
  cy.get('.job-position-row').first().find('[data-testid="job-title"]').should('have.text', 'Verification test');
});
