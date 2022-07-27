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

  describe('when logged in', () => {
      beforeEach(() => {
          cy.contains('login').click()
          cy.get('#username').type('testUser')
          cy.get('#password').type('test123!')
          cy.get('#login-button').click()

          cy.contains('testUser is logged')
      })
      it('create new blog', () => {
          cy.contains('new blog').click()
          cy.get('#titleFormField').type('Sebastian')
          cy.get('#authorFormField').type('Vettel')
          cy.get('#urlFormField').type('World Champion 4x')
          cy.get('#createBlogButton').click()
          cy.contains('Sebastian added by Vettel')
      })
    })
})