import './commands'

// Configurações globais
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})