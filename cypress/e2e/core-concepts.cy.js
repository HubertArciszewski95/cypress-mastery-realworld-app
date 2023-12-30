describe('Cypress core concepts', () => {

    it('Iterate over DOM elements - Examples', () => {
        cy.visit("/");

        const titleList = [];
        cy.get(".article-preview").should("have.length", 3).each(($article, index) => {
            const title = $article.find("h1").text();

            titleList.push(title);
        });

        // cy.wrap(titleList).should("deep.equal", ["Lorem Ipsum 1", "Lorem Ipsum 2", "Lorem Ipsum 3"]);

        cy.wrap(titleList).then((list) => {
            cy.wrap(list[0]).should("equal", "Lorem Ipsum 1");
            cy.wrap(list[1]).should("equal", "Lorem Ipsum 2");
            cy.wrap(list[2]).should("equal", "Lorem Ipsum 3");
        });
    });
});
