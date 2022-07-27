describe('Blog app', () => {
  beforeEach(() => {
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
          cy.addUser()
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
              cy.get('@2ndBlog').parent().find('.view').as('viewButton')
              cy.get('@viewButton').click()
              cy.get('@2ndBlog').parent().find('.button-like').as('likeButton')
              cy.get('@likeButton').click()
              cy.get("html").should('contain', 'likes: 12')
          })

          it('can delete blog', () => {
              cy.contains('2ndTitle').parent().as('2ndBlog')
              cy.get('@2ndBlog').parent().find('.button-delete').as('deleteButton')
              cy.get('@deleteButton').click()
              cy.on('window:confirm', () => true)
              cy.get('html').should('not.contain', '2ndTitle')
          })

          it('login with another cred', () => {
              cy.addFakeUser()
              cy.login({username: 'testUser2', password: 'test123!'})

              it.only("can't delete blog", () => {
                  cy.get('html').should('not.contain', '.button-delete')
              })
          })

          it.only('check sort by likes', () => {

              cy.get('.view').click({multiple: true})

              cy.get('.blog').eq(1).find('.likes-text').should('contain', 'likes: 12')
              cy.get('.blog').eq(2).find('.likes-text').should('contain', 'likes: 11')
              cy.get('.blog').eq(3).find('.likes-text').should('contain', 'likes: 10')

              cy.get('.blog').eq(2).find('.button-like')

              for (let i = 0; i < 2; i++) {
                  cy.get('.blog').eq(2).find('.button-like').click({timeout: 1000})
                  cy.wait(2000)
              }

              cy.get('.blog').eq(1).find('.likes-text').should('contain', 'likes: 13')
              cy.get('.blog').eq(2).find('.likes-text').should('contain', 'likes: 12')
              cy.get('.blog').eq(3).find('.likes-text').should('contain', 'likes: 10')
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
