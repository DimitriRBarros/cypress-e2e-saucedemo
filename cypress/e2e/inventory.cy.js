import LoginPage from '../pages/LoginPage'
import InventoryPage from '../pages/InventoryPage'

describe('Inventory Functionality', () => {
  const loginPage = new LoginPage()
  const inventoryPage = new InventoryPage()

  beforeEach(() => {
    cy.login()
  })

  it('Deve ordenar produtos por preço (Low to High)', () => {
    inventoryPage
      .sortBy('lohi')
      .verifyPriceSortingLowToHigh()
  })

  it('Deve adicionar produto ao carrinho com sucesso', () => {
    const productName = 'Sauce Labs Backpack'
    
    inventoryPage
      .addProductToCart(productName)
      .verifyProductAdded(productName)
      .verifyCartBadgeCount(1)
  })

  it('Deve remover produto do carrinho', () => {
    const productName = 'Sauce Labs Bike Light'
    
    inventoryPage
      .addProductToCart(productName)
      .verifyProductAdded(productName)
      .verifyCartBadgeCount(1)
      .removeProductFromCart(productName)
      .verifyProductRemoved(productName)
      .verifyCartBadgeCount(0)
  })

  it('Deve adicionar múltiplos produtos e verificar contador do carrinho', () => {
    const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt']
    
    products.forEach((product, index) => {
      inventoryPage
        .addProductToCart(product)
        .verifyProductAdded(product)
        .verifyCartBadgeCount(index + 1)
    })
  })
})