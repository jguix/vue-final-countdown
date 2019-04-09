describe('About', () => {
  it('Visits the about page', () => {
    cy.visit('/about');

    cy.contains('h1', 'About "The final countdown" app');
    cy.get('.mimacom-logo');
  });

  it('Navigates home', () => {
    cy.get('[data-cy-about]').click();

    cy.url().should('be', '/');
  });
})