import { test, expect } from '@playwright/test';

test.describe('Alerts and Dialogs', () => {

  test('handle alert - accept', async ({ page }) => {
    await page.goto('/javascript_alerts');

    // listen for dialog BEFORE clicking
    page.on('dialog', async (dialog) => {
      console.log('Message:', dialog.message());
      await dialog.accept();
    });

    // click button that triggers alert
    await page.getByRole('button', { name: 'Click for JS Alert' }).click();

    // check result message
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
  });

  test('handle confirm - accept', async ({ page }) => {
    await page.goto('/javascript_alerts');

    page.on('dialog', async (dialog) => {
      console.log('Message:', dialog.message());
      await dialog.accept();  // click OK
    });

    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();

    await expect(page.locator('#result')).toHaveText('You clicked: Ok');
  });

  test('handle confirm - dismiss', async ({ page }) => {
    await page.goto('/javascript_alerts');

    page.on('dialog', async (dialog) => {
      await dialog.dismiss();  // click Cancel
    });

    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();

    await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
  });

  test('handle prompt - type text', async ({ page }) => {
    await page.goto('/javascript_alerts');

    page.on('dialog', async (dialog) => {
      console.log('Message:', dialog.message());
      await dialog.accept('Hello Playwright!');  // type text + click OK
    });

    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();

    await expect(page.locator('#result')).toHaveText('You entered: Hello Playwright!');
  });

}); 
