import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('the user selects a job family from the job family filter', () => {
  const group = 'Finance';
  const jobFamily = 'Budgeting';

  // Click the TreeSelect component to open the dropdown
  cy.get('[data-cy="Job Family-filter"]').find('.ant-select-selector').click();

  // Wait for the dropdown to be visible
  cy.get('.ant-select-dropdown').should('be.visible');

  // Click on the expand arrow beside the 'Finance' group
  cy.get('.ant-select-dropdown')
    .contains('.ant-select-tree-title', group)
    .parents('.ant-select-tree-treenode')
    .find('.ant-select-tree-switcher')
    .click();

  // Now select 'Budgeting' from the 'Finance' group
  cy.get('.ant-select-dropdown').contains('.ant-select-tree-title', jobFamily).click();
});

Then('only job profiles classified under that selected job family should be displayed', () => {
  cy.get('[data-cy="search-results-list"]')
    .find('li')
    .eq(1)
    .find('[data-cy="card-title"]')
    .contains('Senior Software Engineer');
});
