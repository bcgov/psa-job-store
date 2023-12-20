import { When } from '@badeball/cypress-cucumber-preprocessor';

When('the user applies a filter', () => {
  const jobFamily = 'Budgeting';

  cy.get('[data-cy="Job Family-filter"]').find('.react-select__input-container').click();
  cy.get('[data-cy="Job Family-filter"]').find('input').type(jobFamily);

  cy.get('[data-cy="Job Family-filter"]')
    .find('.react-select__menu div')
    .contains(jobFamily)
    .last() // Selects the last matching element
    .click();
});
