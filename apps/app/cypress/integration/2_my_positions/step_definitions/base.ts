import { Given } from '@badeball/cypress-cucumber-preprocessor';

Given('the user is logged in', () => {
  cy.login(); // You'll define a custom command in Cypress for login
});

Given('the user is on the My Position Requests page', () => {
  cy.visit('/my-position-requests');
});
