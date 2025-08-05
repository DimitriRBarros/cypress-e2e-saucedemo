import LoginPage from '../pages/LoginPage'
import InventoryPage from '../pages/InventoryPage'
import CartPage from '../pages/CartPage'

describe('Cart Functionality', () => {
    const loginPage = new LoginPage()
    const inventoryPage = new InventoryPage()
    const cartPage = new CartPage()

     beforeEach(() => {
    cy.login()
    })

    it('Deve navegar para o carrinho e verificar produtos adicionados', () => {
        const productName = 'Sauce Labs Backpack'

        inventoryPage
            .addProductToCart(productName)
            .goToCart()

        cartPage
            .verifyPageLoaded()
            .verifyProductInCart(productName)
            .verifyCartItemsCount(1)
    })

    it('Deve remover produto do carrinho na página do cart', () => {
        const productName = 'Sauce Labs Fleece Jacket'

        inventoryPage
            .addProductToCart(productName)
            .goToCart()

        cartPage
            .verifyPageLoaded()
            .verifyProductInCart(productName)
            .removeProduct(productName)
            .verifyCartItemsCount(0)
    })

    it('Deve continuar comprando e retornar ao inventory', () => {
        inventoryPage
            .addProductToCart('Sauce Labs Onesie')
            .goToCart()

        cartPage
            .verifyPageLoaded()
            .continueShopping()

        cy.url().should('include', '/inventory')

        inventoryPage.verifyPageLoaded()
    })

    it('Deve proceder para checkout com produtos no carrinho', () => {
        inventoryPage
            .addProductToCart('Test.allTheThings() T-Shirt (Red)')
            .goToCart()

        cartPage
            .verifyPageLoaded()
            .proceedToCheckout()

        cy.url().should('include', '/checkout-step-one.html')
    })
})
