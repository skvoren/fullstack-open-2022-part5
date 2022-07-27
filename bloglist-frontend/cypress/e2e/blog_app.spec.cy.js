describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
        name: 'TestUser',
        username: 'testUser',
        password: 'test123!'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', () => {
    cy.contains('Blogs')
  })

  it('login form can be opened', () => {
    cy.contains('login').click()
  })

  it('user can be log in', () => {
    cy.contains('login').click()
    cy.get('#username').type('testUser')
    cy.get('#password').type('test123!')
    cy.get('#login-button').click()

    cy.contains('testUser is logged')
  })

  it('login fails with incorrect creds', () => {
      cy.contains('login').click()
      cy.get('#username').type('incorrectUser')
      cy.get('#password').type('incorrectPassword')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
  })

  describe('when logged in', () => {
      beforeEach(() => {
          cy.contains('login').click()
          cy.get('#username').type('testUser')
          cy.get('#password').type('test123!')
          cy.get('#login-button').click()

          cy.contains('testUser is logged')
      })
      it('create new blog with a correct creds', () => {
          cy.contains('new blog').click()
          cy.get('#titleFormField').type('Sebastian')
          cy.get('#authorFormField').type('Vettel')
          cy.get('#urlFormField').type('World Champion 4x')
          cy.get('#createBlogButton').click()
          cy.contains('Sebastian added by Vettel')
      })
      it('user can like blog', () => {
          cy.contains('new blog').click()
          cy.get('#titleFormField').type('Like')
          cy.get('#authorFormField').type('Test')
          cy.get('#urlFormField').type('Here')
          cy.get('#createBlogButton').click()
          cy.contains('Like added by Test')
          cy.contains('view').click()
          cy.get('#button-like').click()
      })
    })
})
