import {contact, ContactPage} from '../support/pageObjects/contactPage';
import { faker } from '@faker-js/faker';
const randomName = faker.random.word();
const randomEmail = faker.internet.email();
const randomComment = faker.lorem.text();
const phone = ('296111111');
const errorMessage = require('../fixtures/errorMessages.json');
const testData = require('../fixtures/testData.json');

describe('Lodgify contact page: negative scenario', () => {

  beforeEach('open application', () => {
    cy.openContactPage();
})

    it('verify Name field is mandatory', () => {
      contact.setPhone('Belarus',  phone);
      contact.setEmail(randomEmail);
      contact.setGuestsQuantity(1);
      contact.clickCalendar();
      contact.selectStartDate()
      contact.selectEndDate()
      contact.setComment(randomComment);
      contact.clickSendButton();
      contact.getErrorMessage(errorMessage.nameFieldError);
    });

    it('verify Email field is mandatory', () => {
      contact.setName(randomName);
      contact.setPhone('Belarus',  phone);
      contact.setGuestsQuantity(1);
      contact.clickCalendar();
      contact.selectStartDate('14')
      contact.selectEndDate('14')
      contact.setComment(randomComment);
      contact.clickSendButton();
      contact.getErrorMessage(errorMessage.emailFieldError);
    });

    it('verify Comment field is mandatory', () => {
      contact.setName(randomName);
      contact.setEmail(randomEmail);
      contact.setPhone('Belarus',  phone);
      contact.setGuestsQuantity(1);
      contact.clickCalendar();
      contact.selectStartDate('14')
      contact.selectEndDate('14')
      contact.clickSendButton();
      contact.getErrorMessage(errorMessage.commentFieldError);
    });

    it('verify Phone field is mandatory', () => {
      contact.setName(randomName);
      contact.setEmail(randomEmail);
      contact.setPhone('Belarus',  phone);
      contact.setGuestsQuantity(1);
      contact.setComment(randomComment);
      contact.clickCalendar();
      contact.selectStartDate('14')
      contact.selectEndDate('14')
      contact.clickSendButton();
      contact.getErrorMessage(errorMessage.phoneFieldError);
    });
  })
  describe('Lodgify contact page: positive scenario', () => {

    beforeEach('open application', () => {
        cy.openContactPage();
    })

    it.only('verify success message when all fields are filled in with valid data', () => {
        contact.setName(randomName);
        contact.setEmail(randomEmail);
        contact.setPhone('Belarus',  phone);
        contact.setGuestsQuantity(1);
        contact.setComment(randomComment);
        contact.clickCalendar();
        contact.selectStartDate()
        contact.selectEndDate()
        contact.clickSendButton();
        contact.getSuccessMessage(testData.successMessage);
      });
  })