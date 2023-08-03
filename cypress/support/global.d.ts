import "./commands/getByTestId";

declare global {
    namespace Cypress {
        interface Chainable {
            getByTestId: typeof getByTestId;
        }
    }
}