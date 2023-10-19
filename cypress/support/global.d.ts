import "./commands/getByTestId";
import "./commands/login";

declare global {
    namespace Cypress {
        interface Chainable {
            getByTestId: typeof getByTestId;
            login: typeof login;
        }
    }
}