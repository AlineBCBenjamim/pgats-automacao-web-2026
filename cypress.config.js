const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: 1,

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: `https://automationexercise.com`,
    //viewportWidth: 375,
    //viewportHeight: 750,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
