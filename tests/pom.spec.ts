import { test, expect } from '@playwright/test';
import { CheckboxPage } from '../pages/CheckboxPage';

test('checkbox with POM', async ({ page }) => {
  const checkboxPage = new CheckboxPage(page);

  await checkboxPage.goto();

  await checkboxPage.checkFirstCheckbox();

  const isChecked = await checkboxPage.isFirstCheckboxChecked();
  expect(isChecked).toBe(true);
});
