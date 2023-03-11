/// <reference types="Cypress" />

export class BasePage {
  constructor(url) {
    this.url = url;
  }

  open() {
    cy.visit(this.url);
  }
}
