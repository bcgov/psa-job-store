import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

// Helper function to interact with the popover menu
const interactWithMenu = (recordId, menuOptionTestId) => {
  // Open the action menu for the specified record using the correct class name
  cy.get(`[data-row-key="${recordId}"]`).find(`.ellipsis-${recordId}`).click();
  // Select the menu option using the provided test id
  cy.get(`.popover-selector-${recordId}`).find(`[data-testid="${menuOptionTestId}"]`).click();
};

Given('the user is on the job positions page', () => {
  // Navigate to the job positions page
  cy.visit('/path-to-job-positions-page'); // Change the path to the actual URL
});

When('the user opens the action menu for a job position with "DRAFT" status', () => {
  // Find the record with "DRAFT" status and store its id
  cy.get('[data-testid="status-DRAFT"]')
    .first()
    .parents('[data-row-key]')
    .invoke('attr', 'data-row-key')
    .as('draftRecordId');
});

When('the user opens the action menu for a job position with "COMPLETED" status', () => {
  cy.get('[data-testid="status-COMPLETED"]')
    .first()
    .parents('[data-row-key]')
    .invoke('attr', 'data-row-key')
    .as('draftRecordId');
});

When('the user opens the action menu for a job position with "VERIFICATION" status', () => {
  cy.get('[data-testid="status-VERIFICATION"]')
    .first()
    .parents('[data-row-key]')
    .invoke('attr', 'data-row-key')
    .as('draftRecordId');
});

When('the user selects the {string} option', (action: string) => {
  // cy.window().then((win) => {
  //   cy.stub(win, 'saveAs').as('saveAs');
  //   cy.stub(win.URL, 'createObjectURL').as('createObjectURL');
  // });

  cy.log('action:', action); // Removed the space after 'action:' for consistency
  cy.get('@draftRecordId').then((recordId) => {
    cy.log('recordId:', recordId); // Added this line to log the recordId
    const menuOptionTestId = `menu-option-${action.toLowerCase()}`; // Construct the test id based on the action
    interactWithMenu(recordId, menuOptionTestId);

    // if (action == 'Download') {
    //   cy.get('@saveAs').should('be.called');
    //   cy.get('@createObjectURL').should('be.called');
    // }
  });
});

Then('the system should perform the "Edit" action', () => {
  cy.url().should('match', /\/requests\/positions\/\d+$/);
});

Then('the system should perform the "Download" action', () => {
  cy.contains('Your document is downloading!').should('be.visible');
});

Then('the system should perform the "View" action', () => {
  cy.url().should('match', /\/requests\/positions\/\d+$/);
});

Then('the system should perform the "Copy link" action', () => {
  // Verify that the copy to clipboard functionality was triggered
  // This assumes the application uses a global success message
  cy.contains('Link copied to clipboard!').should('be.visible');
});

Then('the system should perform the "Delete" action', () => {
  // Verify that the delete confirmation modal appeared
  cy.contains('Delete Position Request').should('be.visible');
  cy.contains('Do you want to delete the position request?').should('be.visible');
  // // Optional: Confirm the deletion to proceed
  // cy.contains('button', 'Yes').click();
});
