/// <reference types="cypress" />

import pricingTestData from "../../fixtures/pricingTestData.json";
import PricingPage from "../../support/pageObjects/pricingObj";

context('Verify the currency changes', () => {
    let pricingPage = new PricingPage();
    before(() => {
        cy.visit("/pricing.html");
        cy.title().should('include', pricingTestData.pricingTitle);
        pricingPage.getCurrencyType().select('usd').should('have.value', pricingTestData.usdTxt);
    });

    it('Should have the right currency in all places: USD ', () => {
        pricingPage.getCurrencyType().select('usd').should('have.value', pricingTestData.usdTxt);
        pricingPage.getFirstValCurrency().contains(pricingTestData.usd);
        pricingPage.getSecondValCurrency().contains(pricingTestData.usd);
        pricingPage.getThirdValCurrency().contains(pricingTestData.usd);
    });

    it('Should have the right currency in all places: EUR', () => {
        pricingPage.getCurrencyType().select('eur').should('have.value', pricingTestData.eurTxt);
        pricingPage.getFirstValCurEur().contains(pricingTestData.eur);
        pricingPage.getSecondValCurEur().contains(pricingTestData.eur);
        pricingPage.getThirdValCurEur().contains(pricingTestData.eur);
    });

    it('Should have the right currency in all places: GBP', () => {
        pricingPage.getCurrencyType().select('gbp').should('have.value', pricingTestData.gbpTxt);
        pricingPage.getFirstValCurrency().contains(pricingTestData.gbp);
        pricingPage.getSecondValCurrency().contains(pricingTestData.gbp);
        pricingPage.getThirdValCurrency().contains(pricingTestData.gbp);
    });
});