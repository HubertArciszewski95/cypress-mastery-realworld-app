const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 720,
  viewportWidth: 1280,
  e2e: {  
    baseUrl: "http://localhost:3000/#",
    watchForFileChanges: false,
  
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
