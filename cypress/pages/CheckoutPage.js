class CheckoutPage {
    constructor() {
        this.elements = {
            // Step One - Information
            firstNameInput: () => cy.get('[data-test="firstName"]'),
            lastNameInput: () => cy.get('[data-test="lastName"]'),
            postalCodeInput: () => cy.get('[data-test="postalCode"]'),
            continueButton: () => cy.get('[data-test="continue"]'),
            cancelButton: () => cy.get('[data-test="cancel"]'),

            // Step Two - Overview
            summaryContainer: () => cy.get('.checkout_summary_container'),
            summaryItems: () => cy.get('.cart_item'),
            finishButton: () => cy.get('[data-test="finish"]'),

            // Complete
            completeContainer: () => cy.get('.checkout_complete_container'),
            completeHeader: () => cy.get('.complete-header'),
            completeText: () => cy.get('.complete-text'),
            backHomeButton: () => cy.get('[data-test="back-to-products"]'),

            // Error
            errorMessage: () => cy.get('[data-test="error"]')
        }
    }

    // Step One Methods
    verifyInformationPageLoaded() {
        cy.url().should('include', '/checkout-step-one.html')
        this.elements.firstNameInput().should('be.visible')
        return this
    }

    fillPersonalInformation(firstName, lastName, postalCode) {
        this.elements.firstNameInput().should('be.visible').clear().type(firstName)
        this.elements.lastNameInput().should('be.visible').clear().type(lastName)
        this.elements.postalCodeInput().should('be.visible').clear().type(postalCode)
        return this
    }

    clickContinue() {
        this.elements.continueButton().should('be.visible').click()
        return this
    }

    // Step Two Methods
    verifyOverviewPageLoaded() {
        cy.url().should('include', '/checkout-step-two.html')
        this.elements.summaryContainer().should('be.visible')
        return this
    }

    verifyOrderSummary() {
        this.elements.summaryItems().should('have.length.greaterThan', 0)
        return this
    }

    finishOrder() {
        this.elements.finishButton().should('be.visible').click()
        return this
    }

    // Complete Methods
    verifyOrderComplete() {
        cy.url().should('include', '/checkout-complete.html')
        this.elements.completeContainer().should('be.visible')
        this.elements.completeHeader()
            .should('be.visible')
            .and('contain.text', 'Thank you for your order!')
        return this
    }

    backToHome() {
        this.elements.backHomeButton().should('be.visible').click()
        return this
    }

    // Error handling
    verifyErrorMessage(expectedMessage) {
        this.elements.errorMessage()
            .should('be.visible')
            .and('contain.text', expectedMessage)
        return this
    }
}

export default CheckoutPage