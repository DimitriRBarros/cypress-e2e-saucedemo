class CartPage {
    constructor() {
        this.elements = {
            cartContainer: () => cy.get('.cart_contents_container'),
            cartItems: () => cy.get('.cart_item'),
            checkoutButton: () => cy.get('[data-test="checkout"]'),
            continueShoppingButton: () => cy.get('[data-test="continue-shopping"]'),
            removeButtons: () => cy.get('button[id*="remove"]'),
            cartBadge: () => cy.get('.shopping_cart_badge')
        }
    }

    verifyPageLoaded() {
        cy.url().should('include', '/cart.html')
        this.elements.cartContainer().should('be.visible')
        return this
    }

    verifyProductInCart(productName) {
        cy.contains('.cart_item', productName).should('be.visible')
        return this
    }

    verifyCartItemsCount(expectedCount) {
        if (expectedCount > 0) {
            this.elements.cartItems().should('have.length', expectedCount)
        } else {
            this.elements.cartItems().should('not.exist')
        }
        return this
    }

    removeProduct(productName) {
        cy.contains('.cart_item', productName)
            .should('be.visible')
            .within(() => {
                cy.get('button[id*="remove"]').should('be.visible').click()
            })
        return this
    }

    proceedToCheckout() {
        this.elements.checkoutButton().should('be.visible').click()
        return this
    }

    continueShopping() {
        this.elements.continueShoppingButton().should('be.visible').click()
        return this
    }
}

export default CartPage