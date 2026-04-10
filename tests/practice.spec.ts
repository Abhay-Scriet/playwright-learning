import { test, expect } from '@playwright/test';

test('login test', async ({ page }) => {

  await page.goto('/login');

  await page.getByLabel('Username').fill('tomsmith');

  await page.getByLabel('Password').fill('SuperSecretPassword!');

  //await page.getByLabel('Username').fill('admin');

  //await page.getByLabel('Password').fill('admin');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('You logged into a secure area!')).toBeVisible();

});

test('logout test', async ({ page }) => {

    await page.goto('/login');
  
    await page.getByLabel('Username').fill('tomsmith');
  
    await page.getByLabel('Password').fill('SuperSecretPassword!');
  
    //await page.getByLabel('Username').fill('admin');
  
    //await page.getByLabel('Password').fill('admin');
  
    await page.getByRole('button', { name: 'Login' }).click();
  
    await expect(page.getByText('You logged into a secure area!')).toBeVisible();
    // Logout button
    await page.getByRole('link', { name: 'Logout' }).click();

    // Success message after logout
     //'You logged out of the secure area!'
     await expect(page.getByText('You logged out of the secure area!')).toBeVisible();

  
  });

  test('forgot password test', async ({ page }) => {   // better name
    await page.goto('/forgot_password');
    await page.getByRole('textbox', { name: 'E-mail' }).click();
    await page.getByRole('textbox', { name: 'E-mail' }).fill('testforgetpassword@email.com');
    await page.getByRole('button', { name: 'Retrieve password' }).click();
    await expect(page.getByText('Your e-mail')).toBeVisible();

    
    //await expect(page.getByText('Your e-mail\'s been sent!')).toBeVisible();  // add this
  });
  
