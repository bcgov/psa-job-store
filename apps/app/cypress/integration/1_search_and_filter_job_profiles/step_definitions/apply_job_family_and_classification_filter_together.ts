import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('the user selects "Budgeting" from the job family filter', () => {
  const jobFamily = 'Budgeting';
  const group = 'Finance';

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

Then(
  'only job profiles classified under "Budgeting" job family and "Financial Officer R15" classification should be displayed',
  () => {
    cy.get('[data-cy="search-results-list"]').find('li').should('have.length', 1);
    cy.get('[data-cy="search-results-list"]')
      .find('li')
      .first()
      .find('[data-cy="card-title"]')
      .contains('Strategic HR Analyst Manager');
  },
);
