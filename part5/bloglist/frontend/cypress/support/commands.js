Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:8080/api/login', { username, password })
    .then(response => {
      localStorage.setItem('loggedUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:8080/api/blogs',
    method: 'POST',
    body: {
      title, author, url
    },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  })
})

Cypress.Commands.add('createUser', ({ name, username, password }) => {
  cy.request('POST', 'http://localhost:8080/api/users', {
    name, username, password
  })
})