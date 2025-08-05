import LoginPage from '../pages/LoginPage'
import InventoryPage from '../pages/InventoryPage'

describe('Login Functionality', () => {
    const loginPage = new LoginPage()
    const inventoryPage = new InventoryPage()

    beforeEach(() => {
        loginPage.visit()
    })

    it('Deve realizar login com sucesso usando credenciais válidas', () => {
        cy.fixture('users').then((users) => {
            loginPage
                .login(users.validUser.username, users.validUser.password)
                .verifySuccessfulLogin()

            inventoryPage.verifyPageLoaded()
        })
    })

    it('Deve exibir erro para usuário bloqueado', () => {
        cy.fixture('users').then((users) => {
            loginPage
                .login(users.lockedUser.username, users.lockedUser.password)
                .verifyErrorMessage('Sorry, this user has been locked out.')
        })
    })

    it('Deve exibir erro para credenciais inválidas', () => {
        cy.fixture('users').then((users) => {
            loginPage
                .login(users.invalidUser.username, users.invalidUser.password)
                .verifyErrorMessage('Username and password do not match any user in this service')
        })
    })

    it('Deve exibir erro quando campos obrigatórios estão vazios', () => {
        loginPage
            .clickLogin()
            .verifyErrorMessage('Username is required')
    })
})