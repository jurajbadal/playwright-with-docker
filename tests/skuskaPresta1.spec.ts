import endpoint from "./configTypes"
import { test, expect } from '@playwright/test'

test("TESENA Shop", async ({ page }) => {

  // Go to the Droplets product page of DigitalOcean web page
  await page.goto('http://37.27.17.198:8084/cs');

  // Wait for the page to load
  await page.waitForLoadState('networkidle');

  // Relative XPath
  await page.locator("iv[class='products row'] img[alt='Hummingbird printed t-shirt']:visible").click();
  const screenshot = await page.screenshot({path: './screenshots/test.png'});
  
  // Verify that number equals 2
  //expect(number_subscriptions_allowed).toBe(0)
});