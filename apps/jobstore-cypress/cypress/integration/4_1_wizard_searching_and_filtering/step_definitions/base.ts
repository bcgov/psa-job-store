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
  cy.wait(300); // todo - eliminate this. It appears selection logic may still fire again even if the above node is selected

  // Select the specific node with ID '00121521' and assign it an alias
  cy.get('[data-testid="org-chart-node-00987654"]').as('targetNode');

  // Click on the node to select it or to reveal the 'Create new direct report' button
  cy.get('@targetNode').scrollIntoView();
  cy.get('@targetNode').click({ force: true });

  // Re-query the DOM for the node and find the 'Create new direct report' button within it
  cy.get('@targetNode').find('[data-testid="create-direct-report-button"]').click({ force: true });
});

Then('they proceed to the additional information step', () => {
  // Check for a unique element on the additional information page
  // Replace 'unique-element-selector' with an actual selector for an element unique to this page
  cy.get('[data-testid="additional-information-form"]').should('be.visible');
});

When('the user fills out the required additional information', () => {
  cy.get('[data-testid="excluded-select"] .ant-select-selection-search-input').type('00121521');
  cy.contains('00121521 Testing Manager').click();

  cy.get('[data-testid="branch-input"]').type('test branch');
  cy.get('[data-testid="division-input"]').type('test division');

  // Now click the "Next" button
  cy.get('[data-testid="next-button"]').click();
});

Then('they are taken to the job profile selection step', () => {
  // Check if the URL is correct
  // The URL pattern should match /position-request/{id}
  cy.url().should('match', /\/requests\/positions\/\d+/);

  // Check for a unique element on the job profile selection page
  // Replace 'unique-element-selector' with an actual selector for an element unique to this page
  cy.get('[data-testid="job-profile-card"]', { timeout: 10000 }).should('be.visible');
});

When('the user applies filters', () => {
  const classification = 'Information Systems R27 (GEU)';

  // Click the dropdown to open it
  cy.get('[data-cy="Classification-filter"]').find('.react-select__input-container').click();

  // Type the extracted classification into the search field within the dropdown
  cy.get('[data-cy="Classification-filter"]').find('input').type(classification);

  // Wait for the search results to appear, gather all the matching elements and then click on the last one
  cy.get('[data-cy="Classification-filter"]')
    .find('.react-select__menu div')
    .filter(`:contains("${classification}")`)
    .filter((_index, element) => {
      // Filter elements to match the text exactly with the extracted classification
      return element.textContent?.trim() === classification;
    })
    .then((searchResults) => {
      if (searchResults.length > 0) {
        // Click on the last element of the filtered results
        cy.wrap(searchResults).last().click();
      }
    });

  const classification2 = 'Supervisor R15 (GEU)';

  // Click the dropdown to open it
  cy.get('[data-cy="Classification-filter"]').find('.react-select__input-container').click();

  // Type the extracted classification into the search field within the dropdown
  cy.get('[data-cy="Classification-filter"]').find('input').type(classification2);

  // Wait for the search results to appear, gather all the matching elements and then click on the last one
  cy.get('[data-cy="Classification-filter"]')
    .find('.react-select__menu div')
    .filter(`:contains("${classification2}")`)
    .filter((_index, element) => {
      // Filter elements to match the text exactly with the extracted classification
      return element.textContent?.trim() === classification2;
    })
    .then((searchResults) => {
      if (searchResults.length > 0) {
        // Click on the last element of the filtered results
        cy.wrap(searchResults).last().click();
      }
    });
});

When('the results have loaded', () => {
  cy.get('[data-testid="skeleton-loading"]').should('exist');
  cy.get('[data-testid="skeleton-loading"]').should('not.exist');
});

When('the user applies search', () => {
  cy.wait(2000);
  cy.get('[aria-label="Search by job title or keyword"]').type('scientist');
  cy.contains('button', 'Find job profiles').click();
});

When('the user selects a job profile', () => {
  // Assuming the first job profile card should be selected
  cy.get('[data-testid="job-profile-card"]').first().click();
});

When('the user reloads the page', () => {
  cy.reload();
});

Then('the filters and search are still applied', () => {
  // check that data-testid="filters-tags-section" element contains clerk r9 and office assistant r9
  cy.get('[data-testid="filters-tags-section"]').should('contain', 'Information Systems R27');
  cy.get('[data-testid="filters-tags-section"]').should('contain', 'Supervisor R15');

  cy.get('[aria-label="Search by job title or keyword"]').should('have.value', 'scientist');
});

Then('the profile is selected', () => {
  cy.get('.testid-selectedProfile').should('exist');
});
