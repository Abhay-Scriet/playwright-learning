import { test, expect } from '@playwright/test';

test('checkbox action', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');

  const checkbox = page.locator('input[type="checkbox"]').first();

  await checkbox.check();

  await expect(checkbox).toBeChecked();
});
test('dropdown action', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
  
    await page.selectOption('#dropdown', 'Option 1');
  
    await expect(page.locator('#dropdown')).toHaveValue('1');
  });
  
  test('click action', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
  
    await page.getByRole('button', { name: 'Add Element' }).click();
  
    await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
  });
  