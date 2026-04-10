import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'A/B Testing' }).click();
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Add/Remove Elements' }).click();
  await page.getByRole('button', { name: 'Add Element' }).click();
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Checkboxes' }).click();
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Challenging DOM' }).click();
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Context Menu' }).click();
  await page.getByRole('link', { name: 'Dropdown' }).click();
  await page.locator('#dropdown').selectOption('1');
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Exit Intent' }).click();
});