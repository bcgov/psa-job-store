import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('the user selects a job family from the job family filter', () => {
  const jobFamily = 'Budgeting';

  // Click the dropdown to open it
  cy.get('[data-cy="Job Family-filter"]').find('.react-select__input-container').click();

  // Type the extracted job family into the search field within the dropdown
  cy.get('[data-cy="Job Family-filter"]').find('input').type(jobFamily);

  // Wait for the search results to appear, gather all the matching elements and then click on the last one
  cy.get('[data-cy="Job Family-filter"]')
    .find('.react-select__menu div')
    .filter(`:contains("${jobFamily}")`)
    .filter((_index, element) => {
      // Filter elements to match the text exactly with the extracted job family
      return element.textContent?.trim() === jobFamily;
    })
    .then((searchResults) => {
      if (searchResults.length > 0) {
        // Click on the last element of the filtered results
        cy.wrap(searchResults).last().click();
      }
    });
});

Then('only job profiles classified under that selected job family should be displayed', () => {
  cy.get('[data-cy="search-results-list"]').find('li').first().find('[data-cy="card-title"]').contains('File Clerk');
});
