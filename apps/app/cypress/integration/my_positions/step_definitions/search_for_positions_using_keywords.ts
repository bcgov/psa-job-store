import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('the user enters "analyst" into the search field', () => {
  cy.get('[data-testid="search-field"]').type('analyst');

  // cy.intercept('POST', 'http://localhost:4000/graphql', (req) => {
  //   // Check if the body of the request matches the expected GraphQL query and variables
  //   if (req.body.query.includes('PositionRequests') && req.body.variables.search === 'analyst') {
  //     // Optionally, you can do additional validations here
  //     req.reply({
  //       statusCode: 200,
  //       body: {
  //         // Mocked response data if needed
  //       },
  //     });
  //   }
  // }).as('graphqlQuery');
});

When('the user clicks the "Find positions" button', () => {
  cy.contains('button', 'Find positions').click();
});

Then('the GraphQL query for "analyst" positions should be made', () => {
  // Wait for the GraphQL query to be made and verify it was called as expected
  cy.wait('@graphqlQuery')
    .its('request.body')
    .should((requestBody) => {
      // Extract the 'variables' from the request body for easier comparison
      const { variables } = requestBody;

      // Perform a deep equality check on the 'variables' object
      expect(variables).to.deep.equal({
        search: 'analyst',
        where: { AND: [] },
        skip: 0,
        take: 2,
        onlyCompletedForAll: false,
      });
    });
});

Then('job positions containing "analyst" in the title or submission ID should be displayed', () => {
  cy.get('[data-testid="job-title"], [data-testid="submission-id"]')
    .should('exist')
    .and((elements) => {
      const titlesOrIds = [...elements].map((el) => el.innerText.toLowerCase());
      expect(titlesOrIds.some((text) => text.includes('analyst'))).to.be.true;
    });
});
