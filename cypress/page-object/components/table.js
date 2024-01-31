class Table {

    elements = {
        tableHeader: () => cy.get(".table-header"),
        tableRow: () => cy.get(".table-row"),
        tableCell: () => cy.get(".table-cell"),
    }

    getRowData(rowIndex) {
        // some code...
    }

    selectCell(rowIndex, cellIndex) {
        // some code...
    }
}

export default Table;