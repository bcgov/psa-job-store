import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('the user selects a job family from the job family filter', () => {
  const group = 'Finance';
  const jobFamily = 'Budgeting';

  // Click the TreeSelect component to open the dropdown
  cy.get('[data-cy="Job Family-filter"]').find('.ant-select-selector').click();

  // Wait for the dropdown to be visible
  cy.get('.ant-select-dropdown').should('be.visible');

  // Click on the expand arrow beside the 'Finance' group
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

Then('only job profiles classified under that selected job family should be displayed', () => {
  cy.get('[data-cy="search-results-list"]')
    .find('li')
    .eq(0)
    .find('[data-cy="card-title"]')
    .contains('Senior Software Engineer');

  cy.get('[data-cy="search-results-list"]')
    .find('li')
    .eq(1)
    .find('[data-cy="card-title"]')
    .contains('Strategic HR Analyst Manager');
});
