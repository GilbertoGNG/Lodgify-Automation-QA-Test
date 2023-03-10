/// <reference types="Cypress" />
const { PricingPage } = require("../pages/PricingPage");

const pricingPage = new PricingPage("https://www.lodgify.com/pricing/");

describe("Pricing page", () => {
  beforeEach("login before each test", () => {
    cy.setCookie("OptanonAlertBoxClosed", new Date().toISOString());
    pricingPage.open();
  });

  it.only("Should have the relevant prices when moving a toggle", () => {
    // Although, if prices change frequently, it's better not to hardcode the values within the UI tests
    // but to make a request to API in order to take the actual values and compare those to the UI.
    // Finally, it's also possible to create fixtures for the data consistency.

    const expectedPrices = {
      1: ["$0", "$13", "$38", "$59"],
      50: ["$0", "$70", "$421", "$643"],
      100: ["$0", "$98", "$751", "$1148"],
    };

    for (let numOfRentals in expectedPrices) {
      pricingPage.setNumOfRentalsBySlider(numOfRentals);
      pricingPage.cardPrices.each((el, index) => {
        cy.wrap(el).should("have.text", expectedPrices[numOfRentals][index]);
      });
    }

    pricingPage.setNumOfRentalsBySlider(101);
    pricingPage.priceGrid.should("not.be.visible");
    pricingPage.customPricingPanel.should("be.visible");

    pricingPage.setNumOfRentalsBySlider(220);
    pricingPage.priceGrid.should("not.be.visible");
    pricingPage.customPricingPanel.should("be.visible");
  });

  it("Should update the currency properly", () => {
    // save the current prices
    const prices = { usd: [], eur: [], gbp: [] };
    pricingPage.selectCurrency("usd");
    pricingPage.cardPrices.each((el) => {
      prices.usd.push(el.text());
    });

    pricingPage.selectCurrency("eur");
    pricingPage.cardPrices.each((el) => {
      prices.eur.push(el.text());
    });

    pricingPage.selectCurrency("gbp");
    pricingPage.cardPrices.each((el) => {
      prices.gbp.push(el.text());
    });

    cy.wrap(prices.usd)
      .should("not.deep.equal", prices.eur)
      .should("not.deep.equal", prices.gbp)
      .each((el) => {
        cy.wrap(el).should("match", /\$[0-9]{1,4}/);
      });

    cy.wrap(prices.eur)
      .should("not.deep.equal", prices.gbp)
      .each((el) => {
        cy.wrap(el).should("match", /[0-9]{1,4}€/);
      });

    cy.wrap(prices.gbp).each((el) => {
      cy.wrap(el).should("match", /£[0-9]{1,4}/);
    });
  });

  it("Getting started redirects to sign up flow", () => {
    // There are a few options here.
    // Since Cypress can't handle tabs, they revolve around either stubbing the window.open function,
    // or removing the onclick attribute to make the link open in the current tab.

    // Option 1: check that window.open is called
    // This is probably the fastest one to execute since we don't actually open the page
    // For the same reason it would cover less functionality than the other options

    // cy.window().then((window) => {
    //   cy.stub(window, "open").as("openWindow");
    //   pricingPage.getStartedHeaderButton.click();
    //   cy.get("@openWindow").should(
    //     "be.calledWith",
    //     "https://use.lodgify.com/start"
    //   );
    // });

    // Option 2: remove JS onclick handler to make the button behave like a regular link
    // This one checks if the page actually opens, but removing the onclick completely may compromise the testing results
    // if the click handler contains any other functionality

    // pricingPage.getStartedHeaderButton.click().invoke("removeAttr", "onclick");
    // pricingPage.getStartedHeaderButton.click().click();
    // cy.contains("Hi there").should("exist");

    // Option 3: stub window.open so that the link opens in the same window
    // This is likely the best option as it checks if the page opens
    // while not doing changes to the DOM
    const assertStartPageOpened = () => {
      cy.url().should("equal", "https://use.lodgify.com/start");
      cy.contains("Hi there").should("exist");
    };

    cy.window().then((window) => {
      cy.stub(window, "open").callsFake((url) => {
        window.location.href = url;
      });
      pricingPage.getStartedHeaderButton.click();
      assertStartPageOpened();

      // Since we already checked that the page opens, we can probably just check if window.open fires to save some time
      cy.go("back");
      cy.window().then((window) => {
        cy.stub(window, "open").as("openWindow");

        pricingPage.cardGetStartedButtons.each((el) => {
          cy.wrap(el).click();
          cy.get("@openWindow").should(
            "have.been.calledWith",
            "https://use.lodgify.com/start"
          );
        });
      });
    });
  });

  it("Should have different benefits across the plans", () => {
    const featureLists = [];
    pricingPage.featureLists.each((featureList, index) => {
      featureLists[index] = featureList
        .children()
        .toArray()
        .map((listItem) => listItem.innerText);

      if (index > 0) {
        cy.wrap(featureLists[index]).should(
          "not.deep.equal",
          featureLists[index - 1]
        );
      }
    });
  });
});
