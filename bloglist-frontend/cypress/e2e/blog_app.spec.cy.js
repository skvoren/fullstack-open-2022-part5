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
          cy.login({username: 'testUser', password: 'test123!'})
      })

      it('create new blog with a correct creds', () => {
          cy.contains('new blog').click()
          cy.get('#titleFormField').type('Sebastian')
          cy.get('#authorFormField').type('Vettel')
          cy.get('#urlFormField').type('World Champion 4x')
          cy.get('#createBlogButton').click()
          cy.contains('Sebastian added by Vettel')
      })

      describe('some blogs exists', () => {
          beforeEach(() => {
              cy.createBlog({title: '1stTitle', author: '1stAuthor', url: '1stUrl', likes: '10'})
              cy.createBlog({title: '2ndTitle', author: '2ndAuthor', url: '2ndUrl', likes: '11'})
              cy.createBlog({title: '3rdTitle', author: '3rdAuthor', url: '3rdUrl', likes: '12'})
          })

          it('can click like', () => {
              cy.contains('2ndTitle').parent().as('2ndBlog')
              cy.get('@2ndBlog').parent().find('#view').as('viewButton')
              cy.get('@viewButton').click()
              cy.get('@2ndBlog').parent().find('#button-like').as('likeButton')
              cy.get('@likeButton').click()
              cy.get("html").should('contain', 'likes: 12')
          })
      })
  })

    it('login fails with incorrect creds', () => {
        cy.contains('login').click()
        cy.get('#username').type('incorrectUser')
        cy.get('#password').type('incorrectPassword')
        cy.get('#login-button').click()

        cy.contains('wrong credentials')
    })
})
