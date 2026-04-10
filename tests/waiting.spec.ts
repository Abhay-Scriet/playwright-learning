import { test, expect } from '@playwright/test';

test.describe('Waiting Strategies', () => {

  test('auto wait - Playwright waits automatically', async ({ page }) => {
    await page.goto('/login');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Your username is invalid!')).toBeVisible();
  });

  test('waitForURL - wait for URL change', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForURL('**/secure');

    await expect(page).toHaveURL(/secure/);
  });

  test('waitForLoadState - wait for page load', async ({ page }) => {
    await page.goto('/login');

    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('waitFor - wait for element to appear', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Username').fill('wronguser');
    await page.getByLabel('Password').fill('wrongpass');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByText('Your username is invalid!').waitFor();

    await expect(page.getByText('Your username is invalid!')).toBeVisible();
  });

});
