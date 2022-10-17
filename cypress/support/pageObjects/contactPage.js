const testData = require('../../fixtures/testData.json')

export class ContactPage {

    searchNameBox= () => cy.get('[autocomplete="name"]');
    searchEmailBox = () => cy.get('[autocomplete="email"]');
    searchPhoneBox = () => cy.get('[data-testid="phone-input"]');
    searchCommentBox = () => cy.get('[placeholder="Comment"]');
    sendButton = () => cy.contains('Send');
    searchGuestsBox = () => cy.get('[name="guests"]');
    searchCalendarBox = () => cy.get('[aria-label="Arrival"]');
    searchDate = (date) => cy.contains('div[data-visible = "true"] td', date);
    errorMessageBox = () => cy.get('[class="ui red pointing below label"]');
    successMessageBox = () => cy.get('[class="ui success message"]');
    searchMonthBox = () => cy.get('[class="CalendarMonth CalendarMonth_1"][data-visible="true"]');
    nextMonthButton = () => cy.get('[class="DayPickerNavigation_svg__horizontal DayPickerNavigation_svg__horizontal_1"]');

    setName = (name) => {
        this.searchNameBox().click().type(name);
        }

    setEmail = (email) => {
        this.searchEmailBox().click().type(email);
        }
    
    selectCountryOfPhoneNumber = (country) => {   
        cy.get('select').select(country);  
    }

    setPhone = (country, phoneNumber) => {
        this.selectCountryOfPhoneNumber(country);
        this.searchPhoneBox().click().type(phoneNumber);
        }

    setComment = (comment) => {
        this.searchCommentBox().click().type(comment);
        }
        
    clickSendButton = () => {
        this.sendButton().click();
    }
    
    setGuestsQuantity = (guestsQuantity) => {
        this.searchGuestsBox().click().type(guestsQuantity);
    }

    clickCalendar = () => {
        this.searchCalendarBox().click()
    }

    setDate = (date) => {
        this.searchDate(date).click();
    }

    getErrorMessage = (errorMessage) => {
        this.errorMessageBox().invoke('text').then(text => {
            expect(text).to.equal(errorMessage);
        })
    }

    getSuccessMessage = (successMessage) => {
        this.successMessageBox().invoke('text').then(text => {
            expect(text).to.equal(successMessage);
        })
    }

    selectStartDate = () => {

        let futureMonth = testData.startMonth;
        this.searchMonthBox().invoke('text').then(text => {
          if(!text.includes(futureMonth)){
            cy.wait(1000)
            this.nextMonthButton().last().click({force: true})
            this.selectStartDate()   
          } else {
            this.searchDate(testData.startDate).click(); 
          
}
    })
}

    selectEndDate = () => {
        let futureMonth = testData.endMonth
        this.searchMonthBox().invoke('text').then(text => {
          if(!text.includes(futureMonth)){
            cy.wait(1000)
            this.nextMonthButton().last().click({force: true})
            this.selectEndDate() 
          } else {
            this.searchDate(testData.endDate).click(); 
          }
          })  
}
} 

export const contact = new ContactPage();
