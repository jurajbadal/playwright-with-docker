import { test, expect } from "@playwright/test";

test('login with invalid credentials', async ({ page }) => {
  await page.goto('http://37.27.17.198:8084/cs/');
  await page.locator("a[title='Přihlášení k vašemu zákaznickému účtu'] span[class='hidden-sm-down']:visible").click();
  await page.getByLabel('E-mail').click();
  await page.getByLabel('E-mail').fill('invalid@email.com');
  await page.getByLabel('Pole pro heslo').click();
  await page.getByLabel('Pole pro heslo').fill('invalidpassword');
  await page.getByRole('button', { name: 'Ukázat' }).click();
  await page.getByRole('button', { name: 'Přihlásit se' }).click();
  const errorMessage = await page.getByText('Ověření se nezdařilo').textContent();
  expect(errorMessage).toBe('Ověření se nezdařilo');
});

test("login with valid credentials", async ({ page }) => {
  await page.goto("http://37.27.17.198:8084/cs/");
  await page
    .locator(
      "a[title='Přihlášení k vašemu zákaznickému účtu'] span[class='hidden-sm-down']:visible"
    )
    .click();
  await page.getByLabel("E-mail").click();
  await page.getByLabel("E-mail").fill("juraj.badal@gmail.com");
  await page.getByLabel("Pole pro heslo").click();
  await page.getByLabel("Pole pro heslo").click();
  const password = '2014BarbarTesena';
  await page.getByLabel('Pole pro heslo').fill(password);
  await page.getByRole("button", { name: "Ukázat" }).click();
  const showButton = await page.getByRole("button", { name: "Ukázat" });
  expect(await showButton.isVisible()).not.toBe(true);
  //expect(await showButton.isEnabled()).toBe(true);
  const visiblePasswordField = await page.getByLabel('Pole pro heslo');
  const visiblePassword = await visiblePasswordField.inputValue();
  expect(visiblePassword).toBe(password);
  await page.getByRole("button", { name: "Přihlásit se" }).click();
  const loggedInUser = await page.getByText("Juraj Bádal").textContent();
  expect(loggedInUser).toBe("Juraj Bádal");
});
