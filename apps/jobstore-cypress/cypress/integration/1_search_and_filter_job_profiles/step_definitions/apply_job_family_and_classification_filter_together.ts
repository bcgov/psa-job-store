import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('the user selects "Budgeting" from the job family filter', () => {
  const jobFamily = 'Budgeting';
  const group = 'Finance';

  // Click the TreeSelect component to open the dropdown
  cy.get('[data-cy="Job Family-filter"]').find('.ant-select-selector').click();

  // Wait for the dropdown to be visible
  cy.get('.ant-select-dropdown').should('be.visible');

  // Click on the Finance group to expand it
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

Then(
  'only job profiles classified under "Budgeting" job family and "Communications Officer R30" classification should be displayed',
  () => {
    cy.get('[data-cy="search-results-list"]').find('li').should('have.length', 1);
    cy.get('[data-cy="search-results-list"]')
      .find('li')
      .first()
      .find('[data-cy="card-title"]')
      .contains('Strategic HR Analyst Manager');
  },
);
