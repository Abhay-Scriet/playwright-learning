import { test, expect } from '@playwright/test';

test.describe('Multiple Locators', () => {

  test('.first() and .last()', async ({ page }) => {
    await page.goto('/checkboxes');

    const checkboxes = page.locator('input[type="checkbox"]');

    // first checkbox
    await checkboxes.first().check();
    await expect(checkboxes.first()).toBeChecked();

    // last checkbox
    await checkboxes.last().uncheck();
    await expect(checkboxes.last()).not.toBeChecked();
  });

  test('.nth() - pick by position', async ({ page }) => {
    await page.goto('/checkboxes');

    const checkboxes = page.locator('input[type="checkbox"]');

    // nth(0) = first, nth(1) = second
    await checkboxes.nth(0).check();
    await checkboxes.nth(1).check();

    await expect(checkboxes.nth(0)).toBeChecked();
    await expect(checkboxes.nth(1)).toBeChecked();
  });

  test('.count() - count elements', async ({ page }) => {
    await page.goto('/checkboxes');

    const checkboxes = page.locator('input[type="checkbox"]');

    // check how many checkboxes exist
    const count = await checkboxes.count();
    console.log('Total checkboxes:', count);

    await expect(checkboxes).toHaveCount(2);
  });

  test('.filter() - filter by text', async ({ page }) => {
    await page.goto('/');

    const links = page.getByRole('link');

    // filter links that contain text 'Checkboxes'
    const checkboxLink = links.filter({ hasText: 'Checkboxes' });

    await expect(checkboxLink).toBeVisible();
    await checkboxLink.click();

    await expect(page).toHaveURL(/checkboxes/);
  });

});
