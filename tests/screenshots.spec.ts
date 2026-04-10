import { test, expect } from '@playwright/test';

test.describe('Screenshots', () => {

  test('full page screenshot', async ({ page }) => {
    await page.goto('/login');

    // take full page screenshot
    await page.screenshot({ path: 'test-results/login-page.png' });

    await expect(page).toHaveURL(/login/);
  });

  test('element screenshot', async ({ page }) => {
    await page.goto('/login');

    // take screenshot of only one element
    await page.locator('.login-wrapper').screenshot({
      path: 'test-results/login-form.png'
    });

    await expect(page).toHaveURL(/login/);
  });

  test('screenshot on specific action', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').fill('SuperSecretPassword!');

    // screenshot before clicking login
    await page.screenshot({ path: 'test-results/before-login.png' });

    await page.getByRole('button', { name: 'Login' }).click();

    // screenshot after login
    await page.screenshot({ path: 'test-results/after-login.png' });

    await expect(page.getByText('You logged into a secure area!')).toBeVisible();
  });

});
