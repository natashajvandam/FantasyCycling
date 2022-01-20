// untitled.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Welcome Page", () => {
  it("Successfully loads.", () => {
    cy.visit("http://localhost:3000/"); // change URL to match your dev URL
  });
  it("Successfully log in.", () => {
    cy.contains("Log In").click();
    cy.get("input[name=username]").type("natasha@whatever.com");
    cy.get("input[name=password]").type("Hello123.");
    cy.get("button[name=action]").click();
  });
  it("Succesfully log out.", () => {
    cy.contains("Log Out").click();
  });
});
