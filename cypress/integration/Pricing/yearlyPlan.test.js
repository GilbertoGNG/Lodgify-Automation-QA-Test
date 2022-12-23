/// <reference types="cypress" />

import pricingTestData from "../../fixtures/pricingTestData.json";
import PricingPage from "../../support/pageObjects/pricingObj";

context('Verify the yearly plan', () => {
    let pricingPage = new PricingPage();
    before(() => {
        cy.visit("/pricing.html");
        cy.title().should('include', pricingTestData.pricingTitle);
        pricingPage.getCurrencyType().select('usd').should('have.value', pricingTestData.usdTxt);
    });

    it('Should have the right rate for the starter plan with the 50 rentals', () => {
        pricingPage.getPricingRateInputField().clear().type(50);
        pricingPage.getRateValues().should(($els) => {
            expect($els).to.have.length(3)
            expect($els.eq(0)).to.contain(pricingTestData.starterRate)
        });
    });

    it('Should have the right rate for the professional plan with the 50 rentals', () => {
        pricingPage.getRateValues().should(($els) => {
            expect($els.eq(1)).to.contain(pricingTestData.professionalRate);
        });
    });

    it('Should have the right rate for the ultimate plan with the 50 rentals', () => {
        pricingPage.getRateValues().should(($els) => {
            expect($els.eq(2)).to.contain(pricingTestData.ultimateRate);
        });
    });
});