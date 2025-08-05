class InventoryPage {
    constructor() {
        this.elements = {
            inventoryContainer: () => cy.get('.inventory_container'),
            inventoryItems: () => cy.get('.inventory_item'),
            sortDropdown: () => cy.get('[data-test="product-sort-container"]'),
            cartBadge: () => cy.get('.shopping_cart_badge'),
            cartIcon: () => cy.get('.shopping_cart_link'),
            productPrices: () => cy.get('.inventory_item_price'),
            addToCartButtons: () => cy.get('button').contains('Add to cart'),
            removeButtons: () => cy.get('button').contains('Remove')
        }
    }

    verifyPageLoaded() {
        this.elements.inventoryContainer().should('be.visible')
        this.elements.inventoryItems().should('have.length.greaterThan', 0)
        return this
    }

    sortBy(sortOption) {
        this.elements.sortDropdown()
            .should('be.visible')
            .and('not.be.disabled')
            .select(sortOption)
        cy.wait(500)
        return this
    }

    addProductToCart(productName) {
        cy.contains('.inventory_item', productName)
            .should('be.visible')
            .within(() => {
                cy.get('button').contains('Add to cart').should('be.visible').click()
            })
        return this
    }

    removeProductFromCart(productName) {
        cy.contains('.inventory_item', productName)
            .should('be.visible')
            .within(() => {
                cy.get('button').contains('Remove').should('be.visible').click()
            })
        return this
    }

    verifyProductAdded(productName) {
        cy.contains('.inventory_item', productName)
            .should('be.visible')
            .within(() => {
                cy.get('button').contains('Remove').should('be.visible')
            })
        return this
    }

    verifyProductRemoved(productName) {
        cy.contains('.inventory_item', productName)
            .should('be.visible')
            .within(() => {
                cy.get('button').contains('Add to cart').should('be.visible')
            })
        return this
    }

    verifyCartBadgeCount(expectedCount) {
        if (expectedCount > 0) {
            this.elements.cartBadge()
                .should('be.visible')
                .and('contain.text', expectedCount)
        } else {
            this.elements.cartBadge().should('not.exist')
        }
        return this
    }

    verifyPriceSortingLowToHigh() {
        this.elements.productPrices().then(($prices) => {
            const prices = [...$prices].map(el =>
                parseFloat(el.textContent.replace('$', ''))
            )
            const sortedPrices = [...prices].sort((a, b) => a - b)
            expect(prices).to.deep.equal(sortedPrices)
        })
        return this
    }

    goToCart() {
        this.elements.cartIcon().should('be.visible').click()
        return this
    }
}

export default InventoryPage
