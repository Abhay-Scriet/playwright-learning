import { test, expect } from '@playwright/test';

// ── Runs before EVERY test automatically
test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Username').fill('tomsmith');
  await page.getByLabel('Password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();
});

// ── Test 1 — already logged in!
test('check logged in', async ({ page }) => {
  await expect(page.getByText('You logged into a secure area!')).toBeVisible();
});

// ── Test 2 — already logged in!
test('check logout', async ({ page }) => {
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.getByText('You logged out of the secure area!')).toBeVisible();
});
