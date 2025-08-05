Cypress.Commands.add('login', (username = 'standard_user', password = 'secret_sauce') => {
    cy.visit('/')
    // Aguardar página carregar completamente antes de interagir
    cy.get('[data-test="username"]').should('be.visible').and('not.be.disabled').clear().type(username)
    cy.get('[data-test="password"]').should('be.visible').and('not.be.disabled').clear().type(password)
    cy.get('[data-test="login-button"]').should('be.visible').and('not.be.disabled').click()
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_container').should('be.visible')
})

Cypress.Commands.add('addProductToCart', (productName) => {
    cy.contains('.inventory_item', productName)
        .should('be.visible')
        .within(() => {
            cy.get('button').contains('Add to cart').should('be.visible').click()
        })
})

Cypress.Commands.add('removeProductFromCart', (productName) => {
    cy.contains('.inventory_item', productName)
        .should('be.visible')
        .within(() => {
            cy.get('button').contains('Remove').should('be.visible').click()
        })
})

Cypress.Commands.add('getCartBadge', () => {
    return cy.get('.shopping_cart_badge')
})