/// <reference types="Cypress" />

import { BasePage } from "./BasePage";

export class PricingPage extends BasePage {
  get numOfRentalsInput() {
    return cy.get("#scroll-prop-plan");
  }

  // While technically possible, it is tricky and unreliable to interact with the slider in the same way users do it,
  // by firing mousedown, mousemove and mouseup events.
  // Looks like this is the library used for slider: https://github.com/seiyria/bootstrap-slider
  // It is possible to interact with it via jQuery
  setNumOfRentalsBySlider(value) {
    cy.window().then((window) => {
      const $ = window.jQuery; // An instance of jQuery that is extended with a slider
      cy.get("#scroll-prop-plan").then((input) => {
        let slider = $(input).slider();
        slider.slider("setValue", value).trigger("change");
      });
    });
  }

  get currencySelect() {
    return cy.get(".price-currency-select");
  }

  selectCurrency(value) {
    this.currencySelect.select(value);
    return this;
  }

  get priceGrid() {
    return cy.get(".price-grid");
  }

  get customPricingPanel() {
    return cy.get(".price-panel-over-100");
  }

  get cardPrices() {
    return cy.get(".price-item .plan-price");
  }

  get getStartedHeaderButton() {
    return cy.contains("nav a", "Get Started");
  }

  get cardGetStartedButtons() {
    return cy.get(".price-item a.btn");
  }

  get featureLists() {
    return cy.get(".price-item .plan-feature-lists ul");
  }
}
