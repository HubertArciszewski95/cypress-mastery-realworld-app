import { commonElements } from "./components/common-elements";

class LoginPage {

    elements = {
        emailInput: () => cy.getByTestId("email-input"),
        passwordInput: () => cy.getByTestId("password-input"),
        signInButton: () => cy.getByTestId("signin-btn"),
        errorMessage: () => cy.getByTestId("error-message"),
    }

    visit() {
        cy.visit("/login");
    }

    typeEmail(email) {
        this.elements.emailInput().type(email);
    }

    typePassword(password) {
        this.elements.passwordInput().type(password);
    }

    clickSignInButton() {
        this.elements.signInButton().click();
    }
}

export default LoginPage;
