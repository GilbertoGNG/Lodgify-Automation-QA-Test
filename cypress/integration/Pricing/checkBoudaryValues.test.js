/// <reference types="cypress" />

import pricingTestData from "../../fixtures/pricingTestData.json";

context('Verify the boundary values', () => {
    before(() => {
        cy.visit("/pricing.html");
        cy.title().should('include', pricingTestData.pricingTitle);
    });

    it('Should verify boundary values for lower value', () => {
        let lowerBoundVal = [-1,0,1];
        cy.lowerBound(lowerBoundVal, 1);
    });

    it('Should verify boundary values for higher value', () => {
        let higherBoundVal = [99,100,101];
        cy.higherBound(higherBoundVal, 99, 100);
    });

    it('Should verify the equivalence Partitionings', () => {
        let eqPartVal = [-5,55,250];
        cy.eqPartitioning(eqPartVal,1,100);
    });
});