// untitled.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Welcome Page.", () => {
  it("Successfully loads.", () => {
    cy.visit("http://localhost:3000/"); // change URL to match your dev URL
  });
  it("Successfully log in.", () => {
    cy.contains("Log In").click();

    cy.get("input[name=username]").type("santi@hotmail.com ");
    cy.get("input[name=password]").type("hello123.");
    cy.get("button[name=action]").click();
  });
});

describe("Buys and sells a player and displays the league score.", () => {
  it("Should buy a player.", () => {
    cy.wait(700);
    cy.contains("buy").click();
    cy.wait(500);
  });

  it("Should sell a player.", () => {
    cy.wait(500);
    cy.get("button[name=sell]").click();
    cy.wait(500);
  });

  it("Should buy more than one player.", () => {
    cy.wait(500);
    cy.get("#2").contains("buy").click();
    cy.wait(500);
    cy.get("#30").contains("buy").click();
    cy.wait(500);
  });

  it("Should sell all the players.", () => {
    cy.get("[id=2][class=button_myRider]").find("button[name=sell]").click();
    cy.wait(500);
    cy.get("[id=30][class=button_myRider]").find("button[name=sell]").click();
  });

  it("Should display the league score.", () => {
    cy.get(".link_league").contains("league").click();
  });
});

describe("Succesffully logs out.", () => {
  it("Should log out", () => {
    cy.contains("Log Out").click();
  });
});
