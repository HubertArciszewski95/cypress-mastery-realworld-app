import HomePage from "../page-object/home-page";
import { commonSelectors } from "../page-object/components/common-elements";

describe('Example', () => {
    const homePage = new HomePage();

    it('test', () => {
        cy.visit("/");

        homePage.elements.someItem().should("have.class", commonSelectors.checked);
    });
});