/// <reference types="Cypress" />
import { RentalPage } from "../pages/RentalPage";

const rentalPage = new RentalPage("first-rental");

describe("Rental page", () => {
  let expectedData, currencies;

  beforeEach(() => {
    rentalPage.open("first-rental");
    cy.fixture("rental.json").then((data) => {
      expectedData = data;
    });
    cy.fixture("currencies.json").then((data) => {
      currencies = data;
    });
  });

  it("Should render each section correctly", () => {
    //  Header and hero image
    rentalPage.headerLogo.should("be.visible");
    rentalPage.backgroundImage.should("be.visible");
    rentalPage.headerMenu.should("contain.text", "Home");
    rentalPage.headerMenu.should("contain.text", "All properties");
    rentalPage.headerMenu.should("contain.text", "Contact us");

    rentalPage.searchBar.should("be.visible");
    rentalPage.sectionMenu.scrollIntoView().should("be.visible");

    // Desciption
    rentalPage.descriptionSectionName.should("have.text", expectedData.name);
    rentalPage.descriptionSectionGuests.should(
      "have.text",
      `${expectedData.guests} Guests`
    );
    rentalPage.descriptionSectionSummary.should(
      "have.text",
      expectedData.summary
    );

    // Pictures
    rentalPage.picturesSectionHeader.should("be.visible");
    rentalPage.picturesSectionImage.should("be.visible");
    rentalPage.picturesSectionSeeAllLink.should("be.visible");

    // Amenities
    rentalPage.amenitiesSectionHeader.should("be.visible");

    // Policy
    rentalPage.houseRulesSectionHeader.should("have.text", "House Rules");
    rentalPage.houseRulesSectionCheckIn.should(
      "have.text",
      `Check in: ${expectedData.checkIn}`
    );
    rentalPage.houseRulesSectionCheckOut.should(
      "have.text",
      `Check out: ${expectedData.checkOut}`
    );

    // Location
    rentalPage.locationSectionHeader.should("have.text", "Location");
    rentalPage.locationSectionImage.should("be.visible");

    // Rates
    rentalPage.ratesSectionHeader.should("have.text", "Rates");
    rentalPage.selectCurrency(expectedData.currency);
    for (let { name, dailyPrice } of expectedData.rates) {
      rentalPage.ratesSectionDescription.contains(name).should("be.visible");
      rentalPage.ratesSectionPrice
        .contains(dailyPrice)
        .should("be.visible")
        .should("contain.text", currencies[expectedData.currency].symbol);
    }

    // Select another currency
    const newCurrency = expectedData.currency === "USD" ? "EUR" : "USD";
    rentalPage.selectCurrency(newCurrency);
    for (let { dailyPrice } of expectedData.rates) {
      rentalPage.ratesSectionPrice
        .should("contain.text", currencies[newCurrency].symbol)
        .should(
          "not.equal",
          `${currencies[expectedData.currency].symbol}${dailyPrice}`
        );
    }

    rentalPage.policySectionHeader.should("have.text", "Policy and notes");
    for (let { title, notes } of expectedData.policy) {
      const titleEl = rentalPage.policyTitle.contains(title);
      titleEl.should("be.visible");
      for (let note of notes) {
        titleEl.siblings().contains(note).should("be.visible");
      }
    }

    // availability
    rentalPage.availabilitySectionHeader.should("have.text", "Availability");
    rentalPage.availabilityCalendar.should("be.visible");
    rentalPage.availabilityCalendarNextMonthButton.should("be.visible");
    rentalPage.availabilityCalendarPrevMonthButton.should("be.visible");

    // Reviews
    rentalPage.reviewsSectionHeader.should("have.text", "Reviews");
    rentalPage.addReviewButton.click();
    rentalPage.reviewForm.should("be.visible");
    rentalPage.reviewFormCloseBtn.click();

    // About host
    rentalPage.aboutHostSectionHeader.should("have.text", "About host");
    rentalPage.hostAvatar.should("be.visible");
    rentalPage.hostName.should("be.visible");
    rentalPage.aboutHostSection.contains("Contact us").should("be.visible");
  });
});
