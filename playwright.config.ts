// playwright.config.ts

import { defineConfig, devices } from '@playwright/test';




export default defineConfig({
  testDir: "./tests",
  reporter:[ 
    ['html', { outputFolder: './playwright-report/html' }], 
    ['json', { outputFile: './test-results/json/report.json' }], 
  ], 

  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    /*video: {
      mode: "on-first-retry",
    },*/
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
});
