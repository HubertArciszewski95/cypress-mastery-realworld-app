describe('Cypress core concepts', () => {

    it('Subject management', () => {
        cy.login("cypressUser@example.com", "s3cret");
        cy.visit("/");

        cy.contains("button", "Global Feed").click();
		
		// 1. Get value of likes
        // 2. Click like button
        // 3. Assert if like value changed
     });
});