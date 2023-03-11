/// <reference types="Cypress" />

import { BasePage } from "./BasePage";

export class RentalPage extends BasePage {
  get header() {
    return cy.get('[data-testid="header"]');
  }

  get headerLogo() {
    return cy.get('[data-testid="logo"]');
  }

  get headerMenu() {
    return this.header.find(".menu");
  }

  get backgroundImage() {
    return cy.get('[data-testid="responsive-image-img"]');
  }

  get searchBar() {
    return cy.get('[data-testid="searchbar"]');
  }

  get sectionMenu() {
    return cy.get('[data-testid="horizontalMenu-menu"]');
  }

  get descriptionSectionName() {
    return cy.get("h2.header");
  }

  get descriptionSection() {
    return this.descriptionSectionName.parents(".grid");
  }

  get descriptionSectionGuests() {
    return this.descriptionSection.find('[name="guests"]').first();
  }

  get descriptionSectionSummary() {
    return this.descriptionSection.find('[data-testid="multiparagraph"]');
  }

  get picturesSectionHeader() {
    return cy.get("h3.header").contains("Pictures");
  }

  get picturesSection() {
    return this.picturesSectionHeader.parents(".grid");
  }

  get picturesSectionImage() {
    return this.picturesSection.find('[data-testid="responsive-image-img"]');
  }

  get picturesSectionSeeAllLink() {
    return this.picturesSection.find('[data-testid="pictures-triggerLink"]');
  }

  get amenitiesSectionHeader() {
    return cy.get("h3.header").contains("Amenities");
  }

  get amenitiesSection() {
    return this.amenitiesSectionHeader.parents(".grid");
  }

  get houseRulesSectionHeader() {
    return cy.get("h3.header").contains("House Rules");
  }

  get houseRulesSection() {
    return this.houseRulesSectionHeader.parents(".grid");
  }

  get houseRulesSectionCheckIn() {
    return this.houseRulesSection.find('[name="check in"]');
  }

  get houseRulesSectionCheckOut() {
    return this.houseRulesSection.find('[name="check out"]');
  }

  get locationSectionHeader() {
    return cy.get("h3.header").contains("Location");
  }

  get locationSection() {
    return this.locationSectionHeader.parents(".grid");
  }

  get locationSectionImage() {
    return this.locationSection.find('[data-testid="google-map-img"]');
  }

  get ratesSectionHeader() {
    return cy.get("h3.header").contains("Rates");
  }
  
  get ratesSection() {
    return this.ratesSectionHeader.parents(".grid");
  }

  get ratesSectionCurrencySelect() {
    return this.ratesSection.find(
      '[data-testid="rates.head.currency-dropdown"]'
    );
  }

  selectCurrency(name) {
    this.ratesSectionCurrencySelect.click();
    this.ratesSectionCurrencySelect
      .find('[role="option"]')
      .contains(name)
      .click({ force: true });
  }

  get ratesTable() {
    return this.ratesSection.find('[data-testid="rates"]');
  }

  get ratesSectionPrice() {
    return this.ratesSection.find(
      '[data-testid^="rates.rate-"][data-testid$="price-daily"]'
    );
  }

  get ratesSectionDescription() {
    return this.ratesSection.find(
      '[data-testid^="rates.rate-"][data-testid$="description"]'
    );
  }

  get policySectionHeader() {
    return cy.get("h3.header").contains("Policy and notes");
  }

  get policySection() {
    return this.policySectionHeader.parents(".grid");
  }

  get policyTitle() {
    return this.policySection.find("h4.header");
  }

  get availabilitySectionHeader() {
    return cy.get("h3.header").contains("Availability");
  }

  get availabilitySection() {
    return this.availabilitySectionHeader.parents(".grid");
  }

  get availabilityCalendar() {
    return this.availabilitySection.find(".month-wrapper");
  }

  get availabilityCalendarNextMonthButton() {
    return this.availabilitySection.find(
      '[data-testid="availability-next-button"]'
    );
  }

  get availabilityCalendarPrevMonthButton() {
    return this.availabilitySection.find(
      '[data-testid="availability-prev-button"]'
    );
  }

  get reviewsSectionHeader() {
    return cy.get("h3.header").contains("Reviews");
  }

  get reviewsSection() {
    return this.reviewsSectionHeader.parents(".grid");
  }

  get addReviewButton() {
    return this.reviewsSection.find(
      '[data-testid="reviews-add-review-button"]'
    );
  }

  get reviewForm() {
    return cy.get('[data-testid="reviews-modal.new-form"]');
  }

  get reviewFormCloseBtn() {
    return cy.get('[data-testid="close-icon"]');
  }

  get aboutHostSectionHeader() {
    return cy.get("h3.header").contains("About host");
  }

  get aboutHostSection() {
    return this.aboutHostSectionHeader.parents(".grid");
  }

  get hostAvatar() {
    return this.aboutHostSection.find('[data-testid="avatar"]');
  }

  get hostName() {
    return this.hostAvatar.siblings("h4").first();
  }
}
