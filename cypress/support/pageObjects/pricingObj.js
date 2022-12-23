class PricingPage {
    getCurrencyType(){
        return cy.get('select.price-currency-select')
    };

    getRateValues(){
        return cy.get('span.total-sum')
    };

    getFirstValCurrency(){
        return cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price > .currency-symbol-pre')
    };

    getSecondValCurrency(){
        return cy.get(':nth-child(2) > .price-item > :nth-child(1) > .plan-price > .currency-symbol-pre')
    };
    
    getThirdValCurrency(){
        return cy.get(':nth-child(3) > .price-item > :nth-child(1) > .plan-price > .currency-symbol-pre')
    };

    getFirstValCurEur(){
        return cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price > .currency-symbol-post')
    };

    getSecondValCurEur(){
        return cy.get(':nth-child(2) > .price-item > :nth-child(1) > .plan-price > .currency-symbol-post')
    };
    
    getThirdValCurEur(){
        return cy.get(':nth-child(3) > .price-item > :nth-child(1) > .plan-price > .currency-symbol-post')
    };

    getPricingRateInputField(){
        return cy.get('#scroll-prop-plan')
    };
};
export default PricingPage