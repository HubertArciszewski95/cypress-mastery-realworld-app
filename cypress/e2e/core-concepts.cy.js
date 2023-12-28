describe('Cypress core concepts', () => {

    it('Iterate over DOM elements - Examples', () => {
        cy.visit("/");

        cy.get(".article-preview").should("have.length", 3).each(($article, index) => {
            const title = $article.find("h1").text();

        });
    });
});
