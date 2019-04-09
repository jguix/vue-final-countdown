// https://docs.cypress.io/api/introduction/api.html

describe('Home', () => {
  it('Visits the app root url', () => {
    cy.visit('/');

    cy.contains('div', 'The Final Countdown');
    // Should have a single counter
    cy.get('.counter-grid').find('.counter-card').should('have.length', 1);
    // Check value of the counter
    cy.contains('.counter-title-text', 'Learn how to use this app');
    cy.contains(':nth-child(1) > .counter-time-item-value', '0');
    cy.contains(':nth-child(2) > .counter-time-item-value', '0');
    cy.contains(':nth-child(3) > .counter-time-item-value', '5');
    cy.contains(':nth-child(4) > .counter-time-item-value', '0');
  });

  it('Delete the test counter', () => {
    cy.visit('/');
    cy.get('.counter-grid').find('.counter-card').click();

    cy.url().should('include', '/details');
    cy.get('.button-negative').click();

    cy.url().should('be', '/new');
  });

  // it('Add a counter', () => {
  //   cy.visit('/');
  //   cy.get('.fab-icon').click();

  //   // Fill form values
  //   cy.get('#title').type('Cypress testing');
  //   cy.get('#imgUrl').type('http://placekitten.com/400/300');
  //   cy.get('input[type=datetime-local]').type('2019-04-01T13:00'); // does not work as expected
  // });
})