import { faker } from "@faker-js/faker";

describe('Authorization', () => {

  it('should redirect unauthenticated user to home page', () => {
    cy.visit("/settings");
    cy.location("hash").should("equal", "#/");
  });

  context('Register', () => {

    beforeEach(() => {
      cy.visit("/register");
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

    it('should display error for taken username', () => {
      cy.getByTestId("username-input").type("Cypress user");
      cy.getByTestId("email-input").type("notExist@example.com");
      cy.getByTestId("password-input").type("password");
      cy.getByTestId("signup-btn").click();

      cy.getByTestId("error-message").should("be.visible").and("have.text", "Username has already been taken");
    });

    it('should display error for taken email', () => {
      cy.getByTestId("username-input").type("notExist");
      cy.getByTestId("email-input").type("cypressUser@example.com");
      cy.getByTestId("password-input").type("password");
      cy.getByTestId("signup-btn").click();

      cy.getByTestId("error-message").should("be.visible").and("have.text", "Email has already been taken");
    });
  });

  context('Login', () => {

  });
})