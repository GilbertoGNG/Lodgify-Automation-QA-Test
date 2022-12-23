class contactPage {
    getSendButton(){
        return cy.get('[data-testid="form"] > [data-testid="button"]')
    };

    getNameInpField(){
        return cy.get('[name="name"]')
    };

    getPhoneInputField(){
        return cy.get('[data-testid="phone-input"]')
    };

    getMandatoryText(){
        return cy.get(".ui.red.pointing.below.label")
    };

    getEmailField(){
        return cy.get('[name="email"]')
    };

    getCommentField(){
        return cy.get('.input > textarea')
    };

    getSendSuccessMessage(){
        return cy.get('[data-testid="form"] > .success')
    };

    getOpenCalendar(){
        return cy.get('.DateRangePickerInput_calendarIcon')
    }

    getCalendar(){
        return cy.get('.DayPicker_transitionContainer')
    }

    getNavigateBack(){
        return cy.get('.DayPickerNavigation_leftButton__horizontalDefault')
    };

    getNavigateForward(){
        return cy.get('.DayPickerNavigation_rightButton__horizontalDefault')
    };

    getYearAndMonthName(){
        return cy.get(':nth-child(2) > .CalendarMonth > .CalendarMonth_caption.CalendarMonth_caption_1')
    };

    getArrivalDay(){
        return cy.get('[aria-label="Friday, April 14, 2023"]')
    };

    getDepartureDay(){
        return cy.get('[aria-label="Wednesday, June 14, 2023"]')
    };

    getArrivalField(){
        return cy.get('[placeholder="Arrival"]')
    };

    getDepartureField(){
        return cy.get('[placeholder="Departure"]')
    };

    clearSelectedDate(){
        return cy.get('.DateRangePickerInput_clearDates_svg')
    };
};
export default contactPage