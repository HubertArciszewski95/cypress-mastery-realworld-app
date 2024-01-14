class RegisterPage {

    elements = {
        usernameInput: () => cy.getByTestId("username-input"),
        emailInput: () => cy.getByTestId("email-input"),
        passwordInput: () => cy.getByTestId("password-input"),
        signUpButton: () => cy.getByTestId("signup-btn"),
        validationMessage: (inputName) => cy.getByTestId(`${inputName.toLowerCase()}-validation-msg`),
        errorMessage: () => cy.getByTestId("error-message"),
    }

    visit() {
        cy.visit("/register");
    }

    typeUsername(username) {
        this.elements.usernameInput().type(username);
    }

    typeEmail(email) {
        this.elements.emailInput().type(email);
    }

    typePassword(password) {
        this.elements.passwordInput().type(password);
    }

    clickSignUpButton() {
        this.elements.signUpButton().click();
    }

    clearInput(inputName) {
        switch (inputName.toLowerCase()) {
            case "username":
                this.elements.usernameInput().clear();
                break;

            case "email":
                this.elements.emailInput().clear();
                break;

            case "password":
                this.elements.passwordInput().clear();
                break;
        }
    }

    blurInput(inputName) {
        switch (inputName.toLowerCase()) {
            case "username":
                this.elements.usernameInput().blur();
                break;

            case "email":
                this.elements.emailInput().blur();
                break;

            case "password":
                this.elements.passwordInput().blur();
                break;
        }
    }
}

export default RegisterPage;
