// Should be used only via Page or Component Object. Not directly in the test files.
export const commonElements = {
    tag: () => cy.get(commonSelectors.tag),
}

// Can be used directly in the test files.
export const commonSelectors = {
    tag: ".tag-pill",
}
