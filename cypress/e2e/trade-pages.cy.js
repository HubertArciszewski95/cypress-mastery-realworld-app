import BondsTradesPage from "../page-object/bonds-trades-page";
import ForexTradesPage from "../page-object/forex-trades-page";

describe('Trade pages', () => {
    const bondsTradesPage = new BondsTradesPage();
    const forexTradesPage = new ForexTradesPage();

    it('example', () => {
        forexTradesPage.filter1.action1();
        forexTradesPage.filter1.elements.element2().should("be.visible");

        forexTradesPage.table.selectCell();

        forexTradesPage.someAction();
        forexTradesPage.elements.someElement().should("be.visible");
    });
});