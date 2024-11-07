/// <reference types="cypress" />

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
