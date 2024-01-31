import RegisterPage from "../page-object/register-page";
import LoginPage from "../page-object/login-page";
import Header from "../page-object/components/header";
import { faker } from "@faker-js/faker";
import standardUser from "../fixtures/users/standard.json";

describe('Authorization', () => {
  const registerPage = new RegisterPage();
  const loginPage = new LoginPage();
  const header = new Header();

  it('should redirect unauthenticated user to home page', () => {
    cy.visit("/settings");
    cy.location("hash").should("equal", "#/");
  });

  context('Register', () => {

    beforeEach(() => {
      registerPage.visit();
    });

    it('should display correct link to login page', () => {
      cy.contains("Sign in to your account").should("be.visible").and('have.attr', 'href', '#/login');
    });

    it('should redirect to home page after registering, as logged in', () => {
      const username = faker.internet.userName();
      const email = `${username}@example.com`;
      const password = "testPassword";

      registerPage.typeUsername(username);
      registerPage.typeEmail(email);
      registerPage.typePassword(password);
      registerPage.clickSignUpButton();

      cy.location("hash").should("equal", "#/");
      header.elements.navItems().should("contain", username);
    });

    it('should display register form validation errors', () => {
      const wrongEmailFormat = [
        "plainaddress",      // Missing @ sign and domain
        "@domain.com",       // Missing username
        "email.domain.com",  // Missing @
        "email@domain",      // Missing top level domain (.com/.net/.org/etc)
      ];

      registerPage.typeUsername("John Snow");
      registerPage.clearInput("username");
      registerPage.blurInput("username");

      registerPage.elements.validationMessage("username").should("be.visible").and("have.text", "Username is required");

      registerPage.typeEmail("JonSnow@example.com");
      registerPage.clearInput("email");
      registerPage.blurInput("email");

      registerPage.elements.validationMessage("email").should("be.visible").and("have.text", "Email is required");

      registerPage.typePassword("s3cret");
      registerPage.clearInput("password");
      registerPage.blurInput("password");

      registerPage.elements.validationMessage("password").should("be.visible").and("have.text", "Password is required");

      registerPage.typePassword("abc");
      registerPage.elements.validationMessage("password").should("be.visible").and("have.text", "Password must have a minimum 4 characters");

      wrongEmailFormat.forEach((email) => {
        registerPage.clearInput("email");
        registerPage.typeEmail(email);

        registerPage.elements.validationMessage("email").should("be.visible").and("have.text", "Incorrect email format");
      });
    });

    it('should display error for taken username', () => {
      registerPage.typeUsername(standardUser.username);
      registerPage.typeEmail("notExist@example.com");
      registerPage.typePassword("password");
      registerPage.clickSignUpButton();

      registerPage.elements.errorMessage().should("be.visible").and("have.text", "Username has already been taken");
    });

    it('should display error for taken email', () => {
      registerPage.typeUsername("notExist");
      registerPage.typeEmail(standardUser.email);
      registerPage.typePassword("password");
      registerPage.clickSignUpButton();

      registerPage.elements.errorMessage().should("be.visible").and("have.text", "Email has already been taken");
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