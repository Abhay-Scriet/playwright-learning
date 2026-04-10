import { test, expect } from '@playwright/test';

test('assertion examples', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com');

  // Check page title
  await expect(page).toHaveTitle(/The Internet/);

  // Check URL
  await expect(page).toHaveURL(/the-internet/);

  // Check heading is visible
  await expect(page.getByRole('heading', { name: 'Welcome to the-internet' })).toBeVisible();

  // Check link exists on page
  await expect(page.getByRole('link', { name: 'Checkboxes' })).toBeVisible();
});
test('element state assertions', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
  
    const checkbox1 = page.locator('input[type="checkbox"]').first();
    const checkbox2 = page.locator('input[type="checkbox"]').last();
  
    // checkbox1 is unchecked by default
    await expect(checkbox1).not.toBeChecked();
  
    // checkbox2 is checked by default
    await expect(checkbox2).toBeChecked();
  });
  
  test('text assertions', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
  
    const link = page.getByRole('link', { name: 'Checkboxes' });
  
    // exact text
    await expect(link).toHaveText('Checkboxes');
  
    // contains text
    await expect(link).toContainText('Check');
  });
  