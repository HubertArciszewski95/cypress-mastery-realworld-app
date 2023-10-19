const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 720,
  viewportWidth: 1280,
  e2e: {  
    baseUrl: "http://localhost:3000/#",
    watchForFileChanges: false,
    video: false,
    retries: {
      runMode: 1,
      openMode: 0
    },
  
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
