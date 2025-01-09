import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

const SHARED_LINK_URL = '/requests/positions/share/4419b4de-6696-426c-bc63-e871c711564a';

Given('the user is logged in', () => {
  cy.login();
});

When('the user navigates to the shared profile link', () => {
  cy.visit(SHARED_LINK_URL);
});

Then('the user should see the tab bar', () => {
  cy.get('[data-testid="tab-bar"]').should('be.visible');
});

Then('the user should see three tabs', () => {
  cy.get('[data-testid="tab-bar"]').within(() => {
    cy.get('[role="tab"]').should('have.length', 3);
    cy.contains('[role="tab"]', 'Job details').should('be.visible');
    cy.contains('[role="tab"]', 'Organization Chart').should('be.visible');
    cy.contains('[role="tab"]', 'Job Profile').should('be.visible');
  });
});

When('the user clicks on {string} tab', (tabName: string) => {
  cy.contains('[role="tab"]', tabName).click();
});

Then('the job details component should be visible', () => {
  cy.get('[data-testid="job-details-component"]').should('be.visible').and('exist');
});

Then('the organization chart component should be visible', () => {
  cy.get('[data-testid="org-chart"]').should('be.visible').and('exist');
});

Then('the job profile component should be visible', () => {
  cy.get('[data-testid="job-profile-with-diff-component"]').should('be.visible').and('exist');
});
