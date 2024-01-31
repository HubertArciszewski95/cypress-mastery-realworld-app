import Filter1 from "./components/filters/filter1";
import Filter2 from "./components/filters/filter2";
import Filter4 from "./components/filters/filter4";
import Table from "./components/table";

class ForexTradesPage {
    filter1 = new Filter1();
    filter1 = new Filter2();
    filter4 = new Filter4();
    table = new Table();

    elements = {
        someElement: () => cy.get(""),
    }

    someAction() {
        // some code..
    }
}

export default ForexTradesPage;