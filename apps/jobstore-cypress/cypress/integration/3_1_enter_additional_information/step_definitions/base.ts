import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('the user is logged in', () => {
  cy.login(); // You'll define a custom command in Cypress for login
});

Given('the user is on the additional info form page', () => {
  cy.visit('/requests/positions/2');
});

// Given('the approval toggle is off', () => {
//   cy.get('[data-testid="confirmation-switch"]').should('not.be.checked');
// });

// When('the user toggles the approval switch on', () => {
//   cy.get('[data-testid="confirmation-switch"]').click();
// });

// Then('all form fields are disabled', () => {
//   cy.get('[data-testid="department-select"]').should('have.class', 'ant-select-disabled');
//   cy.get('[data-testid="reporting-manager-input"]').should('be.disabled');
// });

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

// Then('all form fields become enabled', () => {
//   cy.get('[data-testid="department-select"]').should('not.have.class', 'ant-select-disabled');
//   cy.get('[data-testid="reporting-manager-input"]').should('not.be.disabled');
// });

Then('a default department is already selected in the dropdown', () => {
  cy.get('[data-testid="department-select"] .ant-select-selection-item').should(
    'contain.text',
    'Informational Resource Management (112-0074)',
  );
});

When('the user changes the department dropdown value', () => {
  cy.get('[data-testid="department-select"]').click();

  cy.get('[data-testid="department-select"] .ant-select-selection-search-input').type('human resources');

  cy.get('span[title="Human Resources (123-4567)"]').click();
});

Then('the selected department changes accordingly', () => {
  cy.get('[data-testid="department-select"] .ant-select-selection-item').should(
    'contain.text',
    'Human Resources (123-4567)',
  );
});

When('the user tries to proceed without entering a first level excluded manager', () => {
  cy.get('[data-testid="next-button"]').click();
});

Then('an error message prompts the user to enter the value', () => {
  cy.contains('First level excluded manager position number is required').should('be.visible');
});

When('the user enters and selects excluded manager position number', () => {
  // Type in the reporting manager
  cy.get('[data-testid="excluded-select"] .ant-select-selection-search-input').type('00121521');
  cy.contains('00121521 Testing Manager').click();
  // // Wait for the loading spinner to appear and then disappear
  // cy.get('[data-testid="loading-spinner"]').should('be.visible');

  // cy.get('[data-testid="next-button"]').should('be.disabled');

  // cy.get('[data-testid="loading-spinner"]', { timeout: 15000 }).should('not.exist');
});

When('the user enters branch and division information', () => {
  cy.get('[data-testid="branch-input"]').type('test branch');
  cy.get('[data-testid="division-input"]').type('test division');
});

// Then(
//   'information about job title, expected classification level, reporting manager, type, and job store profile number is displayed',
//   () => {
//     cy.get('[data-testid="job-info"]').should('be.visible');
//     cy.get('[data-testid="reporting-manager-info"]', { timeout: 15000 }).should('be.visible');
//     cy.get('[data-testid="reporting-manager-info"]').should('contain.text', 'Citizens');
//     cy.get('[data-testid="reporting-manager-info"]').should('contain.text', 'Digital');
//     cy.get('[data-testid="reporting-manager-info"]').should('contain.text', '00121521');
//   },
// );

// When('the user inputs all information but then toggles the approval switch off', () => {
//   cy.get('[data-testid="confirmation-switch"]').click(); // Assuming the switch was on
// });

Then('error message to toggle executive approval is visible', () => {
  cy.contains('You must confirm that you have received executive approval').should('be.visible');
});

When('the user presses save and quit', () => {
  cy.get('[data-testid="ellipsis-menu"]').click();
  cy.wait(500); // Wait for the menu to open
  cy.get('[data-testid="save-and-quit"]').click();
});

When('the user returns to the additional info form page', () => {
  cy.visit('/requests/positions/2');
});

When('the user is on the home page', () => {
  cy.url().should('match', /\/$/);
});

Then('the previously entered data is displayed on the form', () => {
  // cy.get('[data-testid="confirmation-switch"]').should('have.class', 'ant-switch-checked');
  cy.get('[data-testid="department-select"] .ant-select-selection-item')
    .should('exist')
    .should('contain.text', 'Human Resources (123-4567)');

  cy.get('[data-testid="branch-input"]').should('have.value', 'test branch');
  cy.get('[data-testid="division-input"]').should('have.value', 'test division');
  cy.contains('00121521 Testing Manager').should('exist');
  // cy.get('[data-testid="loading-spinner"]', { timeout: 15000 }).should('not.exist');
});
