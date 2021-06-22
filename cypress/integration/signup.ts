/// <reference types="Cypress" />

describe("Sign Up", () => {
  it("Signs up a user in successfully", () => {
    cy.visit("http://localhost:3000/");

    cy.contains("Sign up").click();

    cy.get('input[name="username"]').type("lyndseyduffield");
    cy.get('input[name="password"]').type("password");
    cy.get('input[name="verifypassword"]').type("password");

    cy.contains("Sign Up").click();

    cy.contains("Logout").click();

    cy.contains("Sign in").click();

    // fill in username
    cy.get('input[name="username"]').type("lyndseyduffield");
    // fill in password
    cy.get('input[name="password"]').type("password");
    // click sign in
    cy.contains("Sign In").click();

    // you should now be in the dashboard
    cy.url().should("eq", "http://localhost:3000/habit-tracker/home");
  });
});
