import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('the user is logged in', () => {
  cy.login(); // You'll define a custom command in Cypress for login
});

Given('the user is on the additional info form page', () => {
  cy.visit('/my-positions/2');
});

Given('the approval toggle is off', () => {
  cy.get('[data-testid="confirmation-switch"]').should('not.be.checked');
});

When('the user toggles the approval switch on', () => {
  cy.get('[data-testid="confirmation-switch"]').click();
});

Then('all form fields are disabled', () => {
  cy.get('[data-testid="department-select"]').should('have.class', 'ant-select-disabled');
  cy.get('[data-testid="reporting-manager-input"]').should('be.disabled');
  cy.get('[data-testid="comments-input"]').should('be.disabled');
});

When('the user attempts to proceed to next step', () => {
  cy.get('[data-testid="next-button"]').click();
});

Then('an error message appears', () => {
  cy.contains('The form contains errors').should('be.visible');
});

When('the user dismisses the error message', () => {
  cy.contains('button', 'OK').click();
  cy.wait(200);
});

Then('all form fields become enabled', () => {
  cy.get('[data-testid="department-select"]').should('not.have.class', 'ant-select-disabled');
  cy.get('[data-testid="reporting-manager-input"]').should('not.be.disabled');
  cy.get('[data-testid="comments-input"]').should('not.be.disabled');
});

Then('a default department is already selected in the dropdown', () => {
  cy.get('[data-testid="department-select"] .ant-select-selection-item').should('contain.text', 'DPD CSI Lab 112-0072');
});

When('the user changes the department dropdown value', () => {
  cy.get('[data-testid="department-select"]').click();

  cy.get('.ant-select-selection-search-input').type('Dir, Rural Health');

  cy.get('.ant-select-selection-search-input').type('{enter}');
});

Then('the selected department changes accordingly', () => {
  cy.get('[data-testid="department-select"] .ant-select-selection-item').should(
    'contain.text',
    'Dir, Rural Health 026-4312',
  );
});

When('the user tries to proceed without entering a first level excluded manager', () => {
  cy.get('[data-testid="next-button"]').click();
});

Then('an error message prompts the user to enter the value', () => {
  cy.contains('First level excluded manager position number is required').should('be.visible');
});

When('the user enters comments', () => {
  cy.get('[data-testid="comments-input"]').type('Some comments');
});

When('the user enters excluded manager position number', () => {
  // Type in the reporting manager
  cy.get('[data-testid="reporting-manager-input"]').type('00121521');

  // Wait for the loading spinner to appear and then disappear
  cy.get('[data-testid="loading-spinner"]').should('be.visible');

  cy.get('[data-testid="next-button"]').should('be.disabled');

  cy.get('[data-testid="loading-spinner"]', { timeout: 15000 }).should('not.exist');
});

Then(
  'information about job title, expected classification level, reporting manager, type, and job store profile number is displayed',
  () => {
    cy.get('[data-testid="job-info"]').should('be.visible');
    cy.get('[data-testid="reporting-manager-info"]', { timeout: 15000 }).should('be.visible');
    cy.get('[data-testid="reporting-manager-info"]').should('contain.text', 'Citizens');
    cy.get('[data-testid="reporting-manager-info"]').should('contain.text', 'Digital');
    cy.get('[data-testid="reporting-manager-info"]').should('contain.text', '00121521');
  },
);

When('the user inputs all information but then toggles the approval switch off', () => {
  cy.get('[data-testid="confirmation-switch"]').click(); // Assuming the switch was on
});

Then('error message to toggle executive approval is visible', () => {
  cy.contains('You must confirm that you have received executive approval').should('be.visible');
});

When('the user presses save and quit', () => {
  cy.get('[data-testid="ellipsis-menu"]').click();
  cy.wait(500); // Wait for the menu to open
  cy.get('[data-testid="save-and-quit"]').click();
});

When('the user returns to the additional info form page', () => {
  cy.visit('/my-positions/2');
});

Then('the previously entered data is displayed on the form', () => {
  cy.get('[data-testid="confirmation-switch"]').should('have.class', 'ant-switch-checked');
  cy.get('[data-testid="comments-input"]').should('have.value', 'Some comments');

  cy.get('[data-testid="department-select"] .ant-select-selection-item').should(
    'contain.text',
    'Dir, Rural Health 026-4312',
  );

  // Wait for the loading spinner to appear and then disappear
  cy.get('[data-testid="loading-spinner"]').should('be.visible');

  cy.get('[data-testid="loading-spinner"]', { timeout: 15000 }).should('not.exist');
});
