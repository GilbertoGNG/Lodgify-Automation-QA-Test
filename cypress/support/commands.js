// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import ContactPage from "../support/pageObjects/contactObj";
import PricingPage from "../support/pageObjects/pricingObj";
import DateUtils from "./unility/DateUtils";

let pricingPage = new PricingPage();
let contactPage = new ContactPage();
var dateUtils = new DateUtils();

Cypress.Commands.add('lowerBound', (arr, assert)=>{
    for (let i = 0; i < arr.length; i++) {
        pricingPage.getPricingRateInputField().clear().type(arr[i]).should('have.value',assert);
    };
});

Cypress.Commands.add('higherBound', (arr, firstAssert, secondAssert)=>{
    for (let i = 0; i < arr.length; i++) {
        if(arr[i] == 99){
            pricingPage.getPricingRateInputField().clear().type(arr[i]).should('have.value',firstAssert);
        }else{
            pricingPage.getPricingRateInputField().clear().type(arr[i]).should('have.value',secondAssert);
        };
    };
});

Cypress.Commands.add('eqPartitioning', (arr, firstAssert, secondAssert)=>{
    for (let i = 0; i < arr.length; i++) {
        if(arr[i] <= 0){
            pricingPage.getPricingRateInputField().clear().type(arr[i]).should('have.value',firstAssert);  // I think it should work like this, but it isn't 
        }else if(1 <= arr[i] && arr[i] <= 100){
            pricingPage.getPricingRateInputField().clear().type(arr[i]).should('have.value',arr[i]);
        }else{
            pricingPage.getPricingRateInputField().clear().type(arr[i]).should('have.value',secondAssert);
        };
    };
});

Cypress.Commands.add('selectYear', (yearName)=>{
    const currentYear = new Date().getFullYear();
    contactPage.getYearAndMonthName().then(($year)=>{
        if($year.text().includes(yearName)){
            cy.log(yearName + ' year is selected')
            return
        }
        else{
            if(yearName < currentYear){
                contactPage.getNavigateBack().click();
            }
            else if(yearName > currentYear){
                contactPage.getNavigateForward().click()
            }
        }
        cy.selectYear(yearName);
    });
});

Cypress.Commands.add('selectMonth', (monthName)=>{
    let currentMonth = new Date().getMonth() + 1
    let givenMonth =  dateUtils.getMonthIndexFromName(monthName)
    contactPage.getYearAndMonthName().then(($year)=>{
        if($year.text().includes(monthName)){
            cy.log(monthName + ' month is selected')
            return
        }
        else{
            if(givenMonth < currentMonth){
                contactPage.getNavigateForward().click();
            }
             else if(givenMonth > currentMonth){
                contactPage.getNavigateBack().click();
            }
        }
        cy.selectMonth(monthName);
    });
});

Cypress.Commands.add('selectArrivalDay', ()=>{
    contactPage.getArrivalDay().click();
});

Cypress.Commands.add('selectDepartureDay', ()=>{
    contactPage.getDepartureDay().click();
});