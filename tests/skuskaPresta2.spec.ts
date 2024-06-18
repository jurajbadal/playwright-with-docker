import endpoint from "./configTypes"
import { test, expect } from '@playwright/test'

test("TESENA Shop", async ({ page }) => {

  // Go to the Droplets product page of DigitalOcean web page
  await page.goto('http://37.27.17.198:8084/cs');

  // Wait for the page to load
  await page.waitForLoadState('networkidle');

  // Get the number of packages to be 2 (Basic and Premium)
  
  await page.locator("a[title='Přihlášení k vašemu zákaznickému účtu'] span[class='hidden-sm-down']:visible").click();
  
  // Verify that number equals 2
  //expect(number_subscriptions_allowed).toBe(0)
});

test('test', async ({ page }) => {
  await page.goto('http://37.27.17.198:8084/cs/');
  await page.getByRole('link', { name: ' Přihlásit se' }).click();
  await page.getByLabel('E-mail').click();
  await page.getByLabel('E-mail').fill('juraj.badal@tesena.com');
  await page.getByLabel('Pole pro heslo').click();
  await page.getByLabel('Pole pro heslo').fill('heslo');
  await page.getByRole('button', { name: 'Ukázat' }).click();
  await page.getByRole('button', { name: 'Přihlásit se' }).click();
  await page.getByText('Ověření se nezdařilo').click();
});