describe('Cypress core concepts', () => {

    it('Test 1', () => {
        cy.login("cypressUser@example.com", "s3cret");
        cy.visit("/");
    });

    it('Test 2', () => {
        cy.getByTestId("nav-item").should("contain", "Cypress user");
    });
});
