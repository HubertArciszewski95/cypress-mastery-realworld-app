describe('Cypress core concepts', () => {

    it('Iterate over DOM elements', () => {
        cy.visit("/");

        cy.get(".article-preview").should("have.length", 3).forEach(($article) => {

        });
    });
});
