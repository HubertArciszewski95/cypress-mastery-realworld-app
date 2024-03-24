import { commonSelectors } from "./components/common-elements";

class HomePage {

    elements = {
        articleTags: () => cy.get(".article-preview").find(commonSelectors.tag),
        popularTags: () => cy.get(".sidebar").find(commonSelectors.tag),
    }
}

export default HomePage;