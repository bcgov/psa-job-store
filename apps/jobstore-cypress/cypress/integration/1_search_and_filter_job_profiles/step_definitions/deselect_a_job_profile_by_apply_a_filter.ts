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
    .contains('.antd-text-copy', group)
    .closest('.tree-branch-wrapper')
    .find('.antd-icon-container-copy')
    .click();

  // Select Budgeting from the expanded list
  cy.get('.ant-select-dropdown')
    .contains('.antd-text-copy', jobFamily)
    .parent()
    .find('.ant-select-tree-checkbox')
    .click();
});
