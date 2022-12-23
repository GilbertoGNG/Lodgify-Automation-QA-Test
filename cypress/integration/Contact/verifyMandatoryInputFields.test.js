/// <reference types="cypress" />

import contactTestData from "../../fixtures/contactTestData.json";
import ContactPage from "../../support/pageObjects/contactObj";

context('Verify the contact sections mandatory fields', () => {
    let contactPage = new ContactPage();
    before(() => {
        cy.visit("/contact.html");
        cy.title().should('include', contactTestData.contactTitle);
        contactPage.getSendButton().click()
    });

    it('Should verify the name field is mandatory', () => {
        contactPage.getNameInpField().should('have.css', 'border-color', contactTestData.inputFieldsBorderColor);
        contactPage.getMandatoryText().eq(0).should("have.text",contactTestData.mandatoryName);    
    });

    it('Should verify the phone field is mandatory', ()=>{
        //get the mandatory text
        contactPage.getPhoneInputField().should('have.css', 'border-color', contactTestData.inputFieldsBorderColor);
    })

    it('Should verify the email field is mandatory', ()=>{
        contactPage.getEmailField().should('have.css', 'border-color', contactTestData.inputFieldsBorderColor);
        contactPage.getMandatoryText().eq(1).should("have.text",contactTestData.mandatoryEmail);
    })

    it('Should verify the comment field is mandatory', ()=>{
        contactPage.getCommentField().should('have.css', 'border-color', contactTestData.inputFieldsBorderColor);
        contactPage.getMandatoryText().eq(2).should("have.text",contactTestData.mandatoryComment);
    })

    it('Should check the comment field after entering random text', () => {
        contactPage.getCommentField().type(contactTestData.randomText);
        contactPage.getMandatoryText().eq(2).should("not.exist");
        contactPage.getCommentField().clear();
    });
});