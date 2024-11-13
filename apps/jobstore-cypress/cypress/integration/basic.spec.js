describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('https://google.com');
  });

  it('should load the homepage', () => {
    cy.get('h1').should('be.visible');
  });
});
