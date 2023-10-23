import standardUser from "../fixtures/users/standard.json";

describe('Header navigation', () => {

	context('Not logged in', () => {
		it('should display correct navigation options and links', () => {
			cy.visit("/");

			cy.getByTestId("nav-item").filter(":visible").should("have.length", 3);

			cy.getByTestId("nav-item").contains("Home").should("be.visible").and("have.attr", "href", "#/");
			cy.getByTestId("nav-item").contains("Sign in").should("be.visible").and("have.attr", "href", "#/login");
			cy.getByTestId("nav-item").contains("Sign up").should("be.visible").and("have.attr", "href", "#/register");
		});
	});

	context('Logged in', () => {
		it('should display correct navigation options and links', () => {
			cy.login(standardUser.email, standardUser.password);
			cy.visit("/");

			cy.getByTestId("nav-item").filter(":visible").should("have.length", 3);
			cy.getByTestId("dropdown-item").should("have.length", 3);

			cy.getByTestId("nav-item").contains("Home").should("be.visible").and("have.attr", "href", "#/");
			cy.getByTestId("nav-item").contains("New Article").should("be.visible").and("have.attr", "href", "#/editor");
			cy.getByTestId("nav-item").contains(standardUser.username).should("be.visible").and("not.have.attr", "href");

			cy.getByTestId("dropdown-item").contains("Profile").should("have.attr", "href", `#/profile/${standardUser.username}`);
			cy.getByTestId("dropdown-item").contains("Settings").should("have.attr", "href", "#/settings");
			cy.getByTestId("dropdown-item").contains("Logout").should("have.attr", "href", "#/");
		});
	});
});