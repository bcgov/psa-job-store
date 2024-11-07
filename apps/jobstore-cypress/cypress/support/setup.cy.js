describe('Test Setup', () => {
  before(() => {
    cy.login().then(() => {
      const token = Cypress.env('AUTH_TOKEN');
      expect(token).to.exist;

      // Reset CRM Data
      cy.request({
        method: 'POST',
        url: `${Cypress.env('VITE_BACKEND_URL')}/graphql`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          query: `
            mutation {
              resetMockCRMData
            }
          `,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.resetMockCRMData).to.eq(true);
      });

      // Reset PS Data
      cy.request({
        method: 'POST',
        url: `${Cypress.env('VITE_BACKEND_URL')}/graphql`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          query: `
            mutation {
              resetMockPSData
            }
          `,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.resetMockPSData).to.eq(true);
      });
    });
  });

  it('confirms setup is complete', () => {
    cy.log('Setup complete: logged in and all mock data reset');
  });
});
