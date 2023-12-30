describe('Cypress core concepts', () => {

    it('Iterate over DOM elements - Examples', () => {
        cy.visit("https://www.saucedemo.com/v1/inventory.html");

        let totalPrice = 0;
        cy.get(".inventory_item_price").should("be.visible").each(($price) => {
            const price = parseFloat($price.text().replace("$", ""));
            
            totalPrice += price;
        }).then(() => {
            cy.log(`The total price is: $${totalPrice}`);
        });
    });
});
