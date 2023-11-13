describe('Cypress core concepts', () => {

    it('Subject management', () => {
        cy.visit("/");

        cy.getByTestId("nav-item").eq(0).then(($home) => {
            cy.getByTestId("nav-item").eq(1).then(($signIn) => {
                const homeText = $home.text();
                const signInText = $signIn.text();

                // Do some more actions
                cy.wrap($signIn).click();
                cy.getByTestId("email-input").type("cypressUser@example.com");
                cy.getByTestId("password-input").type("s3cret");
                cy.getByTestId("signin-btn").click();

                // Make assertions
                cy.getByTestId("nav-item").should("not.contain", signInText);
                cy.getByTestId("nav-item").should("contain", homeText);
            });
        });
    });
});