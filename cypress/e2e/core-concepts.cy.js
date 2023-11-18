describe('Cypress core concepts', () => {

    it('Task 1', () => {
        cy.visit("/");

        cy.get(".article-preview").eq(0).find(".date").invoke("text").then(($articleDate) => {
            cy.get(".article-preview").eq(0).contains("span", "Read more...").click();
            
            cy.get(".date").eq(0).should("have.text", $articleDate);
        });
    });

    it('Task 2', () => {
        cy.visit("/");
        
        cy.get(".article-preview").eq(1).find(".tag-pill").eq(0).invoke("text").then(($financesTag) => {
            cy.get(".article-preview").eq(1).find(".tag-pill").eq(1).invoke("text").then(($technologyTag) => {
                
                cy.get(".article-preview").eq(1).contains("span", "Read more...").click();
                
                cy.get(".tag-pill").eq(0).should("have.text", $financesTag);
                cy.get(".tag-pill").eq(1).should("have.text", $technologyTag);
            });
        });
    });
});