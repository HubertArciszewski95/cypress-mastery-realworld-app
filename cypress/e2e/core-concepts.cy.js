describe('Cypress core concepts', () => {

    it('Subject management', () => {
        cy.visit("/");

        cy.getByTestId("nav-item").eq(0).invoke("text").then(($homeText) => {
            // do some more actions...
            // ...
            cy.getByTestId("nav-item").eq(0).should("have.text", $homeText);
        });
    });
});