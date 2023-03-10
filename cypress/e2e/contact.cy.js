/// <reference types="Cypress" />
import moment from "moment";
import { ContactPage } from "../pages/ContactPage";

const contactPage = new ContactPage("contact-us");

const assertRequiredFieldMessages = () => {
  contactPage.nameValidationMessage
    .should("be.visible")
    .should("have.text", "Name is mandatory")
    .parent()
    .should("have.class", "error");

  contactPage.emailValidationMessage
    .should("be.visible")
    .should("have.text", "Email is mandatory")
    .parent()
    .should("have.class", "error");

  contactPage.commentValidationMessage
    .should("be.visible")
    .should("have.text", "Comment is mandatory")
    .parent()
    .should("have.class", "error");

  contactPage.sendButton.should("be.disabled");
};

const selectNextYear = () => {
  const nextYear = moment().year() + 1;
  cy.get('.CalendarMonth_1[data-visible="true"] > div')
    .last()
    .then((monthTitle) => {
      if (!monthTitle.text().includes(nextYear)) {
        contactPage.selectNextMonth();
        selectNextYear();
      }
    });
};

describe("Contact page", () => {
  beforeEach(() => {
    contactPage.open();
  });

  it("Should validate form fields", () => {
    // Missing values
    contactPage.nameInput.focus().blur();
    contactPage.emailInput.focus().blur();
    contactPage.commentInput.focus().blur();

    assertRequiredFieldMessages();

    // Empty values (Optional)
    // All three would fail here, indicating that inputs are not trimmed
    // Name input is in error state, but no message visible
    // Email validation message, while present, shows the wrong message
    // Space bar is considered a valid comment

    // contactPage.nameInput.type(" ").blur()
    // contactPage.emailInput.type(" ").blur()
    // contactPage.commentInput.type(" ").blur()

    // assertRequiredFieldMessages()

    // Telephone validation
    // The validation on the page is primitive and does not validate phone formats
    // type="tel" prevents user from entering letters and special chars
    // It's debatable if it's worth testing as it's browser native functionality
    // Still going to check it

    contactPage.phoneInput
      .type("AA12+34$%56-78!")
      .should("have.value", 12345678);

    // Guest input
    // Similar to telephone, the only validation is provided by type="number"
    contactPage.guestsInput
      .clear()
      .type("AA1234$%567!")
      .should("have.value", 1234567);

    // This will fail
    // It possible to enter negative numbers
    // contactPage.guestsInput.clear().type("-12345").should("have.value", 12345)

    // Emal format validation
    contactPage.emailInput.clear().type("foo").blur();
    contactPage.emailValidationMessage.should(
      "have.text",
      "The email provided is not valid"
    );
    contactPage.sendButton.should("be.disabled");

    contactPage.emailInput.clear().type("foo@bar").blur();
    contactPage.emailValidationMessage.should(
      "have.text",
      "The email provided is not valid"
    );
    contactPage.sendButton.should("be.disabled");

    contactPage.emailInput.clear().type("foo@bar.com").blur();
    contactPage.emailValidationMessage.should("not.exist");

    // This will fail
    // Input is not trimmed
    // contactPage.emailInput.clear().type(" foo@bar.com ").blur()
    // contactPage.emailValidationMessage.should("not.exist")
  });

  it("Date picker", () => {
    cy.get(".DateRangePicker").should("be.visible");

    // Missing departure date fails validation
    let arrivalDate = moment().add(1, "days");
    let departureDate = moment().add(3, "days");

    contactPage.arrivalInput.focus();
    contactPage.selectDate(arrivalDate);
    cy.get("body").click(0, 0); // Clicking outside of date selector

    contactPage.dateValidationMessage
      .should("be.visible")
      .should("have.text", "Dates are not valid");
    contactPage.sendButton.should("be.disabled");

    // Both dates present, date field is valid
    contactPage.clearDateInput().arrivalInput.focus();
    contactPage.selectDate(arrivalDate).selectDate(departureDate);

    contactPage.dateValidationMessage.should("not.exist");
    contactPage.sendButton.should("be.enabled");

    // Selecting 5 days in next year
    arrivalDate = moment().add(1, "years").date(5).month(0);
    departureDate = moment().add(1, "years").date(10).month(0);
    contactPage.clearDateInput().arrivalInput.focus();
    contactPage.selectNextYear();
    contactPage.selectDate(arrivalDate).selectDate(departureDate);

    contactPage.dateValidationMessage.should("not.exist");
    contactPage.sendButton.should("be.enabled");
  });

  it("Submits the form successfully and shows a confirmation message", () => {
    contactPage.nameInput.type("Foo");
    contactPage.phoneInput.type("123456");
    contactPage.emailInput.type("foo@bar.com");
    contactPage.guestsInput.type("3");
    contactPage.arrivalInput.focus();
    contactPage
      .selectDate(moment().add(1, "days"))
      .selectDate(moment().add(3, "days"));
    contactPage.commentInput.type("Yes");

    contactPage.sendButton.click();
    cy.contains("Your request has been sent successfully.", {
      timeout: 10000,
    }).should("be.visible");
  });
});
