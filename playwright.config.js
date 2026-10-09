const { defineConfig, devices } = require("@playwright/test");

const baseURL = `http://127.0.0.1:${process.env.PORT || 8080}`;
module.exports = defineConfig({
  testDir: "./tests/browser",
  timeout: 30_000,
  fullyParallel: false,
  retries: 0,
  reporter: "list",
  use: {
    baseURL,
    trace: "retain-on-failure"
  },
  webServer: {
    command: "node scripts/serve-output.js",
    url: baseURL,
    reuseExistingServer: false,
    timeout: 15_000
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 5"], viewport: { width: 390, height: 844 } } }
  ]
});

