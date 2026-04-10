import { test, expect } from '@playwright/test';

test.describe('Login Feature', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('valid login', async ({ page }) => {
    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('You logged into a secure area!')).toBeVisible();
  });

  test('invalid login', async ({ page }) => {
    await page.getByLabel('Username').fill('wronguser');
    await page.getByLabel('Password').fill('wrongpass');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Your username is invalid!')).toBeVisible();
  });

});

test.describe('Checkbox Feature', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/checkboxes');
  });

  test('check first checkbox', async ({ page }) => {
    await page.locator('input[type="checkbox"]').first().check();
    await expect(page.locator('input[type="checkbox"]').first()).toBeChecked();
  });

  test('uncheck last checkbox', async ({ page }) => {
    await page.locator('input[type="checkbox"]').last().uncheck();
    await expect(page.locator('input[type="checkbox"]').last()).not.toBeChecked();
  });

});
