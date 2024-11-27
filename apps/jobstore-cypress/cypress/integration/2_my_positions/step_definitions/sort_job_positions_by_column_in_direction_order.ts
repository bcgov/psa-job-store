import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('job positions are listed', () => {
  cy.visit('/requests/positions'); // Adjust this to the correct URL if necessary
  // Add any required steps to ensure job positions are listed, such as API stubs or database setup
});

When('the user sorts by {string} in {string} order', (column: string, direction: string) => {
  // Initiate sorting by clicking the column header
  cy.get(`[data-testid="${column.toLowerCase().replace(/\s+/g, '-')}-header"]`).click();

  // Attempt to capture the spinner and proceed, allowing for both cases when it might and might not appear
  cy.get('body').then(($body) => {
    if ($body.find('.ant-spin-spinning').length) {
      // If the spinner is found, wait for it to disappear
      cy.get('.ant-spin-spinning', { timeout: 10000 }).should('not.exist');
    }
    // If the spinner is not found, proceed without waiting
  });

  if (direction === 'descending') {
    // Click again to toggle from ascending to descending, if necessary
    cy.get(`[data-testid="${column.toLowerCase().replace(/\s+/g, '-')}-header"]`).click();

    // Check for spinner again only if changing to descending
    cy.get('body').then(($body) => {
      if ($body.find('.ant-spin-spinning').length) {
        // Wait for spinner to disappear if found
        cy.get('.ant-spin-spinning', { timeout: 10000 }).should('not.exist');
      }
      // If the spinner does not appear on the second click, just proceed
    });
  }
});
When('the user changes the items per page to 10', () => {
  // First, click to open the page size dropdown. Adjust the selector if necessary.
  cy.get('.ant-pagination-options-size-changer').click();

  // Then, wait for the dropdown to become visible and select "10 / page".
  // Note: This assumes "10 / page" is unique and visible text in the dropdown.
  cy.get('.ant-select-dropdown:not(.ant-select-dropdown-hidden)')
    .contains('div', '10 / page') // Use 'div' if the options are within div elements
    .click();

  cy.get('.ant-table-row').should('have.length', 4);
  cy.get('.ant-spin-spinning', { timeout: 10000 }).should('not.exist');
});

Then('job positions are sorted by {string} in {string} order correctly', (column: string, direction: string) => {
  // Define the expected order based on the column and direction
  let expectedOrder: string[];

  if (column === 'Job Title' && direction === 'ascending') {
    expectedOrder = ['Data Scientist', 'Project Manager', 'Project Manager - Additional info step', 'Senior Analyst'];
  } else if (column === 'Job Title' && direction === 'descending') {
    expectedOrder = ['Senior Analyst', 'Project Manager - Additional info step', 'Project Manager', 'Data Scientist'];
  } else if (column === 'Status' && direction === 'ascending') {
    expectedOrder = ['Project Manager - Additional info step', 'Senior Analyst', 'Project Manager', 'Data Scientist'];
  } else if (column === 'Status' && direction === 'descending') {
    expectedOrder = ['Data Scientist', 'Project Manager', 'Project Manager - Additional info step', 'Senior Analyst'];
  } else if (column === 'Class' && direction === 'ascending') {
    expectedOrder = ['Senior Analyst', 'Project Manager', 'Data Scientist', 'Project Manager - Additional info step'];
  } else if (column === 'Class' && direction === 'descending') {
    expectedOrder = ['Data Scientist', 'Project Manager - Additional info step', 'Project Manager', 'Senior Analyst'];
  } else if (column === 'Position #' && direction === 'ascending') {
    expectedOrder = ['Project Manager', 'Data Scientist', 'Project Manager - Additional info step', 'Senior Analyst'];
  } else if (column === 'Position #' && direction === 'descending') {
    expectedOrder = ['Data Scientist', 'Project Manager', 'Project Manager - Additional info step', 'Senior Analyst'];
  } else if (column === 'Modified at' && direction === 'ascending') {
    return;
    // expectedOrder = ['Senior Analyst', 'Data Scientist', 'Project Manager', ];
  } else if (column === 'Modified at' && direction === 'descending') {
    return;
    // expectedOrder = ['Data Scientist', 'Project Manager', 'Senior Analyst'];
  }

  cy.get('.ant-spin-spinning', { timeout: 10000 }).should('not.exist');

  // Extract the visible text for each job position in the current order
  cy.get('[data-testid="job-title"]').then(($titles) => {
    const titlesText = $titles.map((i, el) => Cypress.$(el).text().trim()).get();

    // Compare the current order with the expected order
    // This assumes that `expectedOrder` contains exactly the titles in the expected order
    expectedOrder.forEach((expectedTitle, index) => {
      expect(titlesText[index]).to.equal(expectedTitle);
    });
  });
});
