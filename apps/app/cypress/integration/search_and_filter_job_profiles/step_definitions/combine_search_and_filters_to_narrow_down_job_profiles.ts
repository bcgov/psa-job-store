import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('the user selects "Financial Officer R15" from the classification filter dropdown', () => {
  const classification = 'Financial Officer R15';

  // Click the dropdown to open it
  cy.get('[data-cy="Classification-filter"]').find('.react-select__input-container').click();

  // Type the extracted classification into the search field within the dropdown
  cy.get('[data-cy="Classification-filter"]').find('input').type(classification);

  // Wait for the search results to appear, gather all the matching elements and then click on the last one
  cy.get('[data-cy="Classification-filter"]')
    .find('.react-select__menu div')
    .filter(`:contains("${classification}")`)
    .then((searchResults) => {
      if (searchResults.length > 0) {
        // Click on the last element of the filtered results
        cy.wrap(searchResults).last().click();
      }
    });
});

When('the user enters "multiple programs" into the search field', () => {
  cy.get('[aria-label="Search by job title or keyword"]').type('multiple programs');
});

Then('only job profiles containing "multiple programs" and matching the selected filters should be displayed', () => {
  cy.get('[data-cy="search-results-list"]').find('li').should('have.length', 1);
  cy.get('[data-cy="search-results-list"]')
    .find('li')
    .first()
    .find('[data-cy="card-title"]')
    .contains('Financial Analyst');
});
