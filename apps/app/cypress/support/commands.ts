/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('login', () => {
  const token = Cypress.env('AUTH_TOKEN');
  Cypress.log({
    name: 'setSessionStorage',
    // shorter name for the Command Log
    displayName: 'Token',
    message: `token ${token}`,
    consoleProps: () => {
      // return an object which will
      // print to dev tools console on click
      return {
        // Key: key,
        // Value: value,
        // 'Session Storage': window.sessionStorage,
      };
    },
  });
  // Simulate a login
  window.localStorage.setItem(
    'oidc.user:xxx:xxx',
    JSON.stringify({
      access_token: token,
      profile: {
        exp: 1700170020,
        iat: 1700169720,
        iss: 'xxx',
        aud: 'xxx',
        sub: 'xxx',
        typ: 'ID',
        session_state: 'xxx',
        sid: 'xxx',
        idir_user_guid: 'xxx',
        identity_provider: 'idir',
        idir_username: 'TEST',
        email_verified: false,
        name: 'Test, User CITZ:EX',
        preferred_username: 'xxx@idir',
        display_name: 'Test, User CITZ:EX',
        given_name: 'Test',
        family_name: 'User',
        email: 'test.user@gov.bc.ca',
      },
    }),
  );

  // Your login logic here.
  // cy.visit('/wizard'); // Replace with your app's login page URL.

  // // Replace the selectors with the appropriate ones for your login form.
  // cy.get('input[name=username]').type(username);
  // cy.get('input[name=password]').type(password);
  // cy.get('form').submit(); // Or the selector for your login button.

  // // Optionally add a check to ensure the login was successful.
  // cy.url().should('include', '/dashboard'); // Make sure the URL contains '/dashboard' or some path you expect after login.
});
