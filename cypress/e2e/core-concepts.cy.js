describe('Cypress core concepts', () => {

    it('Iterate over DOM elements - Examples', () => {
        cy.visit("/");

        const titleList = [];
        cy.get(".article-preview").should("have.length", 3).each(($article, index) => {
            const title = $article.find("h1").text();

            cy.log(`I have run: ${index + 1} times!!!`);
            if (title === "Lorem Ipsum 2") {
                cy.wrap($article).contains("span", "Read more...").click();
                // Do more stuff

                return false;
            }
        });
    });
});
