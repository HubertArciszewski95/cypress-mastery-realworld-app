import LoginPage from "../page-object/login-page";
import Header from "../page-object/header";
import { faker } from "@faker-js/faker";
import standardUser from "../fixtures/users/standard.json";

describe('Authorization', () => {
  const loginPage = new LoginPage();
  const header = new Header();

  it('should redirect unauthenticated user to home page', () => {
    cy.visit("/settings");
    cy.location("hash").should("equal", "#/");
  });

  context('Register', () => {

    beforeEach(() => {
      cy.visit("/register");
    });

    it('should display correct link to login page', () => {
      cy.contains("Sign in to your account").should("be.visible").and('have.attr', 'href', '#/login');
    });

    it('should redirect to home page after registering, as logged in', () => {
      const username = faker.internet.userName();
      const email = `${username}@example.com`;
      const password = "testPassword";

      cy.getByTestId("username-input").type(username);
      cy.getByTestId("email-input").type(email);
      cy.getByTestId("password-input").type(password);
      cy.getByTestId("signup-btn").click();

      cy.location("hash").should("equal", "#/");
      cy.getByTestId("nav-item").should("contain", username);
    });

    it('should display register form validation errors', () => {
      const wrongEmailFormat = [
        "plainaddress",      // Missing @ sign and domain
        "@domain.com",       // Missing username
        "email.domain.com",  // Missing @
        "email@domain",      // Missing top level domain (.com/.net/.org/etc)
      ];

      cy.getByTestId("username-input").type("Jon Snow");
      cy.getByTestId("username-input").clear().blur();

      cy.getByTestId("username-validation-msg").should("be.visible").and("have.text", "Username is required");

      cy.getByTestId("email-input").type("JonSnow@example.com");
      cy.getByTestId("email-input").clear().blur();

      cy.getByTestId("email-validation-msg").should("be.visible").and("have.text", "Email is required");

      cy.getByTestId("password-input").type("s3cret");
      cy.getByTestId("password-input").clear().blur();

      cy.getByTestId("password-validation-msg").should("be.visible").and("have.text", "Password is required");

      cy.getByTestId("password-input").type("abc");
      cy.getByTestId("password-validation-msg").should("be.visible").and("have.text", "Password must have a minimum 4 characters");

      wrongEmailFormat.forEach((email) => {
        cy.getByTestId("email-input").clear();
        cy.getByTestId("email-input").type(email);

        cy.getByTestId("email-validation-msg").should("be.visible").and("have.text", "Incorrect email format");
      });
    });

    it('should display error for taken username', () => {
      cy.getByTestId("username-input").type(standardUser.username);
      cy.getByTestId("email-input").type("notExist@example.com");
      cy.getByTestId("password-input").type("password");
      cy.getByTestId("signup-btn").click();

      cy.getByTestId("error-message").should("be.visible").and("have.text", "Username has already been taken");
    });

    it('should display error for taken email', () => {
      cy.getByTestId("username-input").type("notExist");
      cy.getByTestId("email-input").type(standardUser.email);
      cy.getByTestId("password-input").type("password");
      cy.getByTestId("signup-btn").click();

      cy.getByTestId("error-message").should("be.visible").and("have.text", "Email has already been taken");
    });
  });

  context('Login', () => {

    beforeEach(() => {
      loginPage.visit();
    });

    it('should display correct link to register page', () => {
      cy.contains("Need an account?").should("be.visible").and("have.attr", "href", "#/register");
    });

    it('should be able to login and logout', () => {
      loginPage.typeEmail(standardUser.email);
      loginPage.typePassword(standardUser.password);
      loginPage.clickSignInButton();

      cy.location("hash").should("equal", "#/");
      header.elements.navItems().should("contain", standardUser.username);

      header.logout();

      cy.location("hash").should("equal", "#/");
      header.elements.navItems().should("not.contain", standardUser.username);
    });

    it('should display error for not existing user', () => {
      loginPage.typeEmail("notExisting@email.com");
      loginPage.typePassword("invalidPassword");
      loginPage.clickSignInButton();

      loginPage.elements.errorMessage().should("be.visible").and("have.text", "Email or password is invalid");
    });

    it('should display error for existing user when invalid password', () => {
      loginPage.typeEmail(standardUser.email);
      loginPage.typePassword("invalidPassword");
      loginPage.clickSignInButton();

      loginPage.elements.errorMessage().should("be.visible").and("have.text", "Email or password is invalid");
    });
  });
})