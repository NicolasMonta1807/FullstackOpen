Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, { username, password })
    .then(response => {
      localStorage.setItem('loggedUser', JSON.stringify(response.body))
      cy.visit('')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
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
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
    name, username, password
  })
})