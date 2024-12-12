import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('the user is logged in', () => {
  cy.login(); // You'll define a custom command in Cypress for login
});

Given('the user navigates to the job search page', () => {
  cy.visit('/job-profiles');
});

When('the user selects a classification from the classification filter dropdown', () => {
  const classification = 'Information Systems R30 (GEU)';

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
});

Then('only job profiles classified under that selected classification should be displayed', () => {
  const classification = 'Information Systems R30';

  cy.get('[data-cy="search-results-list"]').find('li').should('have.length', 1);
  cy.get('[data-cy="search-results-list"]')
    .find('li')
    .each(($li) => {
      cy.wrap($li).find('[data-cy="card-classification"]').contains(classification);
    });
});
