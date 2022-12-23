/// <reference types="cypress" />

import contactTestData from "../../fixtures/contactTestData.json";
import ContactPage from "../../support/pageObjects/contactObj";

context('Verify contact functionality', () => {
    let contactPage = new ContactPage();
    before(() => {
        cy.visit("/contact.html");
        cy.title().should('include', contactTestData.contactTitle);
    });

    it('Verify contact form functionality with valid data', () => {
        contactPage.getNameInpField().type(contactTestData.userName);
        contactPage.getPhoneInputField().type(contactTestData.userPhoneNumber);
        contactPage.getEmailField().type(contactTestData.userEmail);
        contactPage.getCommentField().type(contactTestData.randomText);
        cy.intercept('POST', 'https://websiteserver.lodgifyintegration.com/v2/websites/contact/website/317320', {
            statusCode: 200,
        });
        contactPage.getSendButton().click();
        contactPage.getSendSuccessMessage().should('exist').should('have.text',contactTestData.successMessage);
    });
});