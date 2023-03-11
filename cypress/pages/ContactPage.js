/// <reference types="Cypress" />

import moment, { Moment } from "moment";
import { BasePage } from "./BasePage";

export class ContactPage extends BasePage {
  get nameInput() {
    return cy.get('input[name="name"]');
  }

  get nameValidationMessage() {
    return cy.get('input[name="name"] + .label');
  }

  get phoneInput() {
    return cy.get('input[name="phone"]');
    // There's also a test ID for it, but we'll use name attribute for the sake of consistency
    // return cy.get('[data-testid="phone-input"]')
  }

  get emailInput() {
    return cy.get('input[name="email"]');
  }

  get emailValidationMessage() {
    return cy.get('input[name="email"] +.label');
  }

  get guestsInput() {
    return cy.get('input[name="guests"]');
  }

  get arrivalInput() {
    return cy.get('input[aria-label="Arrival"]');
  }

  get departureInput() {
    return cy.get('input[aria-label="Departure"]');
  }

  get dateValidationMessage() {
    return cy.get(".DateRangePicker + .label");
  }

  get commentInput() {
    return cy.get("textarea");
  }

  get commentValidationMessage() {
    return this.commentInput.siblings(".label");
  }

  get sendButton() {
    return cy.get('[data-testid="button"]');
  }

  selectDate(date) {
    const formattedDate = date.format("dddd, MMMM D, YYYY");
    cy.get(`.CalendarMonth_table [aria-label="${formattedDate}"]`).click();
    return this;
  }

  clearDateInput() {
    cy.get('.DateRangePicker button[aria-label="Clear Dates"]').click();
    return this;
  }

  selectNextMonth() {
    cy.get(".DayPickerNavigation_button").last().click();
  }

  // Press the next month button until a next year appears
  selectNextYear() {
    const nextYear = moment().year() + 1;
    cy.get('.CalendarMonth_1[data-visible="true"] > div')
      .last()
      .then((monthTitle) => {
        if (!monthTitle.text().includes(nextYear)) {
          this.selectNextMonth();
          this.selectNextYear();
        }
      });
    return this;
  }
}
