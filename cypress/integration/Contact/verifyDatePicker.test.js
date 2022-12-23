/// <reference types="cypress" />

import contactTestData from "../../fixtures/contactTestData.json";
import ContactPage from "../../support/pageObjects/contactObj";

context('Verify datepicker', () => {
    let contactPage = new ContactPage();
    before(() => {
        cy.visit("/contact.html");
        cy.title().should('include', contactTestData.contactTitle);
    });
 
    it('Should verify the datepicker is vorking fine', () => {
        cy.intercept('GET', 'https://i.icdbcdn.com/oh/e6503867-d935-4ccc-b71d-f42bff7a994a.gif?w=300', {
            statusCode: 200,
        });
        contactPage.getOpenCalendar().click();
        
        contactPage.getCalendar().should('be.visible');
        //Select the year
        cy.selectYear(2023);
        //Select Arrival month and day
        cy.selectMonth('April');
        cy.selectArrivalDay();
        //Select Departure month and day
        cy.selectMonth('June');
        cy.selectDepartureDay();

        contactPage.getArrivalField().should('have.value','14/04/2023');
        contactPage.getDepartureField().should('have.value','14/06/2023');
        contactPage.clearSelectedDate().click();
    });
});