import { test, expect } from '@playwright/test';

test.describe('New Tabs and Windows', () => {

  test('handle new tab', async ({ page, context }) => {
    await page.goto('/windows');

    // wait for new tab to open
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: 'Click Here' }).click()
    ]);

    // wait for new tab to load
    await newPage.waitForLoadState();

    // check new tab URL
    await expect(newPage).toHaveURL(/new/);

    // check new tab title
    await expect(newPage).toHaveTitle('New Window');

    // close new tab
    await newPage.close();

    // back to original page
    await expect(page).toHaveURL(/windows/);
  });

});
