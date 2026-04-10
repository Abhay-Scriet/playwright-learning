import { chromium } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://www.saucedemo.com');
  await page.locator('[data-test="username"]').fill(process.env.USERNAME!);
  await page.locator('[data-test="password"]').fill(process.env.PASSWORD!);
  await page.locator('[data-test="login-button"]').click();

  await page.context().storageState({ path: 'auth.json' });
  await browser.close();
}

export default globalSetup;
