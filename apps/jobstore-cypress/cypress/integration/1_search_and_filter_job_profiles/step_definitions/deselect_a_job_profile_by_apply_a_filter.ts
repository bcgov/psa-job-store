import { When } from '@badeball/cypress-cucumber-preprocessor';

When('the user applies a filter', () => {
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
