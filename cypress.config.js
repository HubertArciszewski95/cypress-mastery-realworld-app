const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {  
    baseUrl: "http://localhost:3000/#",
    watchForFileChanges: false,
    viewportHeight: 720,
    viewportWidth: 1280,
  
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
