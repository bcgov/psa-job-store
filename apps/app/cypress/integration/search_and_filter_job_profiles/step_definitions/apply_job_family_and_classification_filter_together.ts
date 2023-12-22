import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('the user selects "Budgeting" from the job family filter', () => {
  const jobFamily = 'Budgeting';

  cy.get('[data-cy="Job Family-filter"]').find('.react-select__input-container').click();
  cy.get('[data-cy="Job Family-filter"]').find('input').type(jobFamily);

  cy.get('[data-cy="Job Family-filter"]')
    .find('.react-select__menu div')
    .contains(jobFamily)
    .last() // Selects the last matching element
    .click();
});

Then(
  'only job profiles classified under "Budgeting" job family and "Financial Officer R15" classification should be displayed',
  () => {
    cy.get('[data-cy="search-results-list"]').find('li').should('have.length', 1);
    cy.get('[data-cy="search-results-list"]')
      .find('li')
      .first()
      .find('[data-cy="card-title"]')
      .contains('Financial Analyst');
  },
);
