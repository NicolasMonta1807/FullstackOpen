describe('Blogs', function() {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:8080/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('blogs')
  })

  it('log in form is displayed by default', function() {
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })
})