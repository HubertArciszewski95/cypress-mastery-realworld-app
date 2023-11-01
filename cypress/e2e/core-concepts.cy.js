describe('Cypress core concepts', () => {

    it('Cypress async nature', () => {
        cy.visit("/register");

        cy.getByTestId("username-input").type("user");
        cy.getByTestId("email-input").type("user@example.com");
        cy.getByTestId("password-input").type("test");
    });
});