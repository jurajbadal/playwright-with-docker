import endpoint from "./configTypes"
import { test, expect } from '@playwright/test'

test("TESENA DEcision Table", async ({ page }) => {
  //test.slow();
  //test.setTimeout(1000);
  // Go to the Droplets product page of DigitalOcean web page
  await page.goto('https://testdesign.tesena.com');

  // Wait for the page to load
  await page.waitForLoadState('networkidle');

  // Get the number of packages to be 2 (Basic and Premium)
  await page.locator("body > header:nth-child(1) > ul:nth-child(4) > li:nth-child(4) > a:nth-child(1):visible").click();

  // Verify that number equals 2
  //expect(number_subscriptions_allowed).toBe(0)
});