import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('File Upload', () => {

  test('upload a file', async ({ page }) => {
    await page.goto('/upload');

    // set file to upload
    await page.locator('#file-upload').setInputFiles(
      path.join(__dirname, '../README.md')
    );

    // click upload button
    await page.locator('#file-submit').click();

    // check success message
    await expect(page.locator('#uploaded-files')).toHaveText('README.md');
  });

});
