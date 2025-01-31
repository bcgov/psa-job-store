/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
  cy.log('Logging in...');
  cy.session(
    'auth',
    () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('VITE_BACKEND_URL')}/e2e-auth/generateSessionCookie`,
        qs: {
          sessionId: 'iHcbWqNHyasCGNOEThqpyORKtLU-wR4r',
        },
        headers: {
          'X-E2E-Key': Cypress.env('VITE_E2E_AUTH_KEY'),
        },
      }).then(({ body }) => {
        // cy.setCookie('connect.sid', body.cookie.raw);
        cy.setCookie('connect.sid', body.cookie.raw, {
          domain: Cypress.env('CYPRESS_DOMAIN'),
          secure: true,
          httpOnly: true,
        });
      });
    },
    {
      validate() {
        cy.log('validating...');
        cy.getCookie('connect.sid').then((cookie) => {
          if (!cookie) {
            throw new Error('No session cookie found');
          }
        });
      },
    },
  );
});
