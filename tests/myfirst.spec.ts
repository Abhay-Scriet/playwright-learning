import { test, expect } from '@playwright/test';
test('open google', async({ page }) => {
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle(/Google/);
    
});

test('check google search box', async ({ page }) => {
    await page.goto('https://www.google.com');
  
    await page.locator('textarea[name="q"]').fill('Playwright');
  
    await page.keyboard.press('Enter');
  
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('find elements on google', async ({ page }) => {
    await page.goto('https://www.google.com');
  
    // Find search box by placeholder
    await page.getByTitle('Search').fill('Playwright testing');
  
    // Press Enter
    await page.keyboard.press('Enter');
  
    // Check results page loaded
    await expect(page).toHaveURL(/search/);
  });
  
  test('click google search button', async ({ page }) => {
    await page.goto('https://www.google.com');
  
    await page.getByRole('combobox').fill('Playwright');
  
    await page.keyboard.press('Enter');
  
    await expect(page).toHaveURL(/search/);
  });
  
  