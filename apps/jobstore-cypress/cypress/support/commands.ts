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

// Cypress.Commands.add('login', () => {
//   const token = Cypress.env('AUTH_TOKEN');

//   if (!token) {
//     throw new Error(
//       'AUTH_TOKEN is not defined in Cypress environment variables. Are you running cypress with "npm run test-e2e"?',
//     );
//   }

//   Cypress.log({
//     name: 'setSessionStorage',
//     // shorter name for the Command Log
//     displayName: 'Token',
//     message: `token ${token}`,
//     consoleProps: () => {
//       // return an object which will
//       // print to dev tools console on click
//       return {
//         // Key: key,
//         // Value: value,
//         // 'Session Storage': window.sessionStorage,
//       };
//     },
//   });

//   Cypress.log({
//     name: 'setSessionStorage',
//     // shorter name for the Command Log
//     displayName: 'CYPRESS_VITE_KEYCLOAK_REALM_URL',
//     message: `CYPRESS_VITE_KEYCLOAK_REALM_URL ${Cypress.env('VITE_KEYCLOAK_REALM_URL')}`,
//     consoleProps: () => {
//       // return an object which will
//       // print to dev tools console on click
//       return {
//         // Key: key,
//         // Value: value,
//         // 'Session Storage': window.sessionStorage,
//       };
//     },
//   });

//   // Simulate a login
//   window.localStorage.setItem(
//     `oidc.user:${Cypress.env('VITE_KEYCLOAK_REALM_URL')}:${Cypress.env('VITE_KEYCLOAK_CLIENT_ID')}`,
//     JSON.stringify({
//       access_token: token,
//       profile: {
//         exp: 1700170020,
//         iat: 1700169720,
//         iss: 'xxx',
//         aud: 'xxx',
//         sub: 'xxx',
//         typ: 'ID',
//         session_state: 'xxx',
//         sid: 'xxx',
//         idir_user_guid: 'xxx',
//         client_roles: ['hiring-manager'],
//         identity_provider: 'idir',
//         idir_username: 'TEST',
//         email_verified: false,
//         name: 'Test, User CITZ:EX',
//         preferred_username: 'xxx@idir',
//         display_name: 'Test, User CITZ:EX',
//         given_name: 'Test',
//         family_name: 'User',
//         email: 'test.user@gov.bc.ca',
//       },
//     }),
//   );

//   // Your login logic here.
//   // cy.visit('/wizard'); // Replace with your app's login page URL.

//   // // Replace the selectors with the appropriate ones for your login form.
//   // cy.get('input[name=username]').type(username);
//   // cy.get('input[name=password]').type(password);
//   // cy.get('form').submit(); // Or the selector for your login button.

//   // // Optionally add a check to ensure the login was successful.
//   // cy.url().should('include', '/dashboard'); // Make sure the URL contains '/dashboard' or some path you expect after login.
// });

Cypress.Commands.add('login', () => {
  cy.log('Logging in...');
  cy.session(
    'auth',
    () => {
      // Call your NestJS endpoint
      cy.log('Logging in 2...');
      cy.request({
        method: 'POST',
        url: `${Cypress.env('VITE_BACKEND_URL')}/e2e-auth/token`,
        headers: {
          'X-E2E-Key': Cypress.env('VITE_E2E_AUTH_KEY'),
        },
      }).then(({ body }) => {
        cy.log('Logging in 3...');
        Cypress.env('AUTH_TOKEN', body.access_token);
        // Store token in the same format as your current setup
        window.localStorage.setItem(
          `oidc.user:${Cypress.env('VITE_KEYCLOAK_REALM_URL')}:${Cypress.env('VITE_KEYCLOAK_CLIENT_ID')}`,
          JSON.stringify({
            access_token: body.access_token,
            profile: {
              exp: Math.floor(Date.now() / 1000) + 3600,
              iat: Math.floor(Date.now() / 1000),
              iss: 'xxx',
              aud: 'xxx',
              sub: 'xxx',
              typ: 'ID',
              session_state: 'xxx',
              sid: 'xxx',
              idir_user_guid: 'xxx',
              client_roles: ['hiring-manager'],
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
      });
    },
    {
      // Validation function to check if session is still valid
      validate() {
        cy.log('validating..');
        const storedToken = window.localStorage.getItem(
          `oidc.user:${Cypress.env('VITE_KEYCLOAK_REALM_URL')}:${Cypress.env('VITE_KEYCLOAK_CLIENT_ID')}`,
        );

        const tokenData = JSON.parse(storedToken);
        Cypress.env('AUTH_TOKEN', tokenData.access_token);

        if (!storedToken) {
          throw new Error('No token found');
        }
      },
    },
  );
});
