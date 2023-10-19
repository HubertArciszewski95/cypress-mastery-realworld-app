const getByTestId = (testId, { timeout } = {}) => {
    return cy.get(`[data-testid="${testId}"]`, { timeout: timeout });
}

Cypress.Commands.add('getByTestId', getByTestId);
