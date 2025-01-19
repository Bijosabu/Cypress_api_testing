describe('template spec', () => {

beforeEach('login to the application',()=> {


  cy.loginToApp()
})


  it.only('after article creation verify correct request and response', () => {

    // intercept should be done before making the api call 
    cy.intercept('https://conduit-api.bondaracademy.com/api/articles/').as('postArticles')

    cy.get('.pull-xs-right').contains(' New Article ').click()
    cy.get('[placeholder="Article Title"]').type(`New article ${Math.floor(Math.random() * 100000)}`)
    cy.get('[placeholder="What\'s this article about?"]').type('Test article')
    cy.get('[placeholder="Write your article (in markdown)"]').type('This is a test description')
    cy.contains(' Publish Article ').click()

    cy.wait('@postArticles')
    cy.get('@postArticles').then(api=>{
      console.log(api)
      expect(api.response.statusCode).to.equal(201)
      expect(api.request.body.article.body).to.equal('This is a test description')
      expect(api.response.body.article.description).to.equal('Test article')

    })
  })
})