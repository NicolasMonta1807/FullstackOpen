describe('Blogs', function() {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:8080/api/testing/reset')
    const user = {
      name: 'Nicolás Montañez',
      username: 'nikoresu',
      password: 'sekr3tp@ss1234'
    }
    cy.request('POST', 'http://localhost:8080/api/users', user)
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

  describe('Log in', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('nikoresu')
      cy.get('#password').type('sekr3tp@ss1234')
      cy.get('#login-button').click()
      cy.get('.notification').contains('Login succesfully')
      cy.contains('Logged in as nikoresu')
    })

    it('fails with incorrect credentials', function() {
      cy.get('#username').type('nikoresu')
      cy.get('#password').type('sekr3tp@ss4321')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function() {
    beforeEach(function () {
      cy.login({ username: 'nikoresu', password: 'sekr3tp@ss1234' })
    })

    it('can create a new blog', function() {
      cy.contains('Create new blog').click()
      cy.get('#titleInput').type('Testing cypress blog')
      cy.get('#authorInput').type('Foo Bar')
      cy.get('#urlInput').type('fullstackopen.com/en')
      cy.get('#createBlogButton').click()
      cy.get('.notification').contains('Blog Testing cypress blog by Foo Bar created')
      cy.get('#blog:first').contains('Testing cypress blog')
    })
  })
})