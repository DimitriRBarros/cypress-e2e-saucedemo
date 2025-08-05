import InventoryPage from '../pages/InventoryPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'

describe('Checkout Complete Flow', () => {
  const inventoryPage = new InventoryPage()
  const cartPage = new CartPage()
  const checkoutPage = new CheckoutPage()

  const customerInfo = {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345'
  }

  beforeEach(() => {
    cy.login()
    })

  it('Deve completar fluxo de checkout com sucesso', () => {
    const productName = 'Sauce Labs Backpack'

    // Adicionar produto e ir para checkout
    inventoryPage
      .addProductToCart(productName)
      .goToCart()

    cartPage
      .verifyPageLoaded()
      .verifyProductInCart(productName)
      .proceedToCheckout()

    // Preencher informações pessoais
    checkoutPage
      .verifyInformationPageLoaded()
      .fillPersonalInformation(customerInfo.firstName, customerInfo.lastName, customerInfo.postalCode)
      .clickContinue()

    // Verificar resumo do pedido
    checkoutPage
      .verifyOverviewPageLoaded()
      .verifyOrderSummary()
      .finishOrder()

    // Verificar conclusão do pedido
    checkoutPage
      .verifyOrderComplete()
  })

  it('Deve completar checkout com múltiplos produtos', () => {
    const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light']

    // Adicionar múltiplos produtos
    products.forEach(product => {
      inventoryPage.addProductToCart(product)
    })

    inventoryPage.goToCart()

    cartPage
      .verifyPageLoaded()
      .verifyCartItemsCount(2)
      .proceedToCheckout()

    checkoutPage
      .verifyInformationPageLoaded()
      .fillPersonalInformation(customerInfo.firstName, customerInfo.lastName, customerInfo.postalCode)
      .clickContinue()
      .verifyOverviewPageLoaded()
      .verifyOrderSummary()
      .finishOrder()
      .verifyOrderComplete()
  })

  it('Deve exibir erro quando campos obrigatórios não são preenchidos', () => {
    inventoryPage
      .addProductToCart('Sauce Labs Onesie')
      .goToCart()

    cartPage
      .verifyPageLoaded()
      .proceedToCheckout()

    checkoutPage
      .verifyInformationPageLoaded()
      .clickContinue()
      .verifyErrorMessage('Error: First Name is required')
  })

  it('Deve voltar para home após completar pedido', () => {
    inventoryPage
      .addProductToCart('Sauce Labs Fleece Jacket')
      .goToCart()

    cartPage
      .verifyPageLoaded()
      .proceedToCheckout()

    checkoutPage
      .verifyInformationPageLoaded()
      .fillPersonalInformation(customerInfo.firstName, customerInfo.lastName, customerInfo.postalCode)
      .clickContinue()
      .verifyOverviewPageLoaded()
      .finishOrder()
      .verifyOrderComplete()
      .backToHome()

    cy.url().should('include', '/inventory.html')
    inventoryPage.verifyPageLoaded()
  })
})