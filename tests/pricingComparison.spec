import endpoint from "./configTypes"
import { test, expect } from '@playwright/test'

test("Expect to have 3 packages for subscription", async ({ page }) => {

  // Go to the Droplets product page of DigitalOcean web page
  await page.goto(endpoint.DIGITAL_OCEAN_URL);

  // Wait for the page to load
  await page.waitForLoadState('networkidle');

  // Get the number of basic virtual machine costs (1 CPU, 2 CPU, 4 CPU, 8 CPU)
  const number_subscriptions_allowed = await page.locator('.PricingComparisonToolStyles__StyledCpuSelector-sc-1k0sndv-7 > button').count()

  // Verify that number equals 4
  expect(number_subscriptions_allowed).toBe(0)
});