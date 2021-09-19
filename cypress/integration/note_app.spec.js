describe('Note app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function() {
    cy.contains('Notes');
    cy.contains('Note app, Department of Computer Science, University of Helsinki, 2021');
  });

  it('login form can be opened', function() {
    cy.contains('login').click();
  });

  it('user can log in', function() {
    cy.contains('login').click();
    cy.get('#username').type('root');
    cy.get('#password').type('sekret');
    cy.get('#login-button').click();
    cy.contains('Superuser logged in');
  });

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click();
      cy.get('#username').type('root');
      cy.get('#password').type('sekret');
      cy.get('#login-button').click();
    });

    it('a new note can be created', function() {
      cy.contains('new note').click();
      cy.get('.newNoteInput').type('Creating notes with cypress');
      cy.contains('save').click();
      cy.contains('Creating notes with cypress');
    });
  });
});