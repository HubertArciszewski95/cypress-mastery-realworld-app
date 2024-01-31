class Filter1 {
    elements = {
        element1: () => cy.get(".element1"),
        element2: () => cy.get(".element2"),
        element3: () => cy.get(".element3"),
    }

    action1() {
        // some code...
    }

    action2() {
        // some code...
    }
}

export default Filter1;