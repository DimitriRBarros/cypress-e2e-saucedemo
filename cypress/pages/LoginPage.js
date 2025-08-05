class LoginPage {
    constructor() {
        this.elements = {
            usernameInput: () => cy.get('[data-test="username"]'),
            passwordInput: () => cy.get('[data-test="password"]'),
            loginButton: () => cy.get('[data-test="login-button"]'),
            errorMessage: () => cy.get('[data-test="error"]'),
            errorButton: () => cy.get('.error-button')
        }
    }

    visit() {
        cy.visit('/')
        return this
    }

    fillUsername(username) {
        this.elements.usernameInput().should('be.visible').clear().type(username)
        return this
    }

    fillPassword(password) {
        this.elements.passwordInput().should('be.visible').clear().type(password)
        return this
    }

    clickLogin() {
        this.elements.loginButton().should('be.visible').click()
        return this
    }

    login(username, password) {
        this.fillUsername(username)
        this.fillPassword(password)
        this.clickLogin()
        return this
    }

    verifyErrorMessage(expectedMessage) {
        this.elements.errorMessage().should('be.visible').and('contain.text', expectedMessage)
        return this
    }

    verifySuccessfulLogin() {
        cy.url().should('include', '/inventory.html')
        return this
    }
}

export default LoginPage
