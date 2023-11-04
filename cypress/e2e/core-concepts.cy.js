describe('Cypress core concepts', () => {

    it('Subject management', () => {
        cy.visit("/");

        const home = cy.getByTestId("nav-item").eq(0);
        // do some more actions...
        // ...
        cy.getByTestId("nav-item").eq(0).should("have.text", home);
    });
});