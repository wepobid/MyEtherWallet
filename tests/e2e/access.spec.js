module.exports = {
  'Demo test ecosia.org' : function (browser) {
    browser
      .url('https://www.myetherwallet.com/')
      .waitForElementVisible('body')
      .waitForElementVisible('.welcome-modal-button')
      .click('.welcome-modal-button')
      .pause(1000)
      .waitForElementVisible('.unlock-wallet')
      .click('.unlock-wallet')
      .waitForElementVisible('.button-software')
      .click('.button-software')
      .pause(1000)
      .waitForElementVisible('.wallet-option-container:last-child')
      .click('div.content-block > div.d-block.content-container.text-center > div.button-options > div:nth-child(1) > div')
      .click('div.content-block > div.button-container-block > div > div > button:nth-child(2)')
      .pause(1000)
      // .assert.containsText('.mainline-results', 'Nightwatch.js')
      .end();
  }
};
