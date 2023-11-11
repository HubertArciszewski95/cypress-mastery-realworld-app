describe('Cypress core concepts', () => {

    it('Subject management', () => {
        cy.login("cypressUser@example.com", "s3cret");
        cy.visit("/");

        cy.contains("button", "Global Feed").click();

        // cy.get(".article-preview").eq(0).find("button").then(($likeButton) => {
        //     // 1. Get value of likes
        //     const likesBeforeAction = parseInt($likeButton.text());

        //     // 2. Click like button
        //     cy.wrap($likeButton).click();

        //     // 3. Assert if like value changed
        //     cy.wrap($likeButton)
        //         .invoke("text")
        //         .then(parseInt)
        //         .should("equal", likesBeforeAction + 1);

        cy.get(".article-preview").eq(0).find("button").click();
        cy.get(".article-preview").eq(0).find("button").invoke("text").then(($likes) => {
            cy.wrap($likes)
                .then(parseInt)
                .should("equal", 1);
        });
    });
});