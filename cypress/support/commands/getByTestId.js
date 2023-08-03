const getByTestId = (testId) => {
    return cy.get(`[data-testid="${testId}"]`);
}

Cypress.Commands.add('getByTestId', getByTestId);
