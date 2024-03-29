import LoginPage from "../page-object/login-page";

describe('Example', () => {
    const loginPage = new LoginPage();

    it('test', () => {
        cy.visit("/");

        loginPage.elements.emailInput({ timeout: 10_000 }).should("be.visible");
    });
});