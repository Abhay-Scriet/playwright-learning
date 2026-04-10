import { test, expect } from '@playwright/test';

test.describe('iFrames', () => {

  test.skip('interact with iframe', async ({ page }) => {
    await page.goto('/iframe');

    // get the iframe element
    const iframe = page.frameLocator('#mce_0_ifr');

    // find element INSIDE the iframe
    const body = iframe.locator('#tinymce');

    // click first to activate editor
    await body.click();

    // select all text and delete
    await page.keyboard.press('Control+a');
    await page.keyboard.press('Delete');

    // type inside iframe
    await body.type('Hello from Playwright!');

    // check text inside iframe
    await expect(body).toContainText('Hello from Playwright!');
  });

});
