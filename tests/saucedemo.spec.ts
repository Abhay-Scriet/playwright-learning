import { test, expect } from './fixture';

test.describe('Login Tests', () => {

  test('valid login', async ({ loginPage, page }) => {
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
    await expect(page).toHaveURL(/inventory/);
  });

  const loginTests = [
    { username: 'wrong_user', password: 'wrong_pass', description: 'invalid credentials' },
    { username: 'locked_out_user', password: 'secret_sauce', description: 'locked out user' },
  ];
  
  for (const data of loginTests) {
    test(`login fails - ${data.description}`, async ({ loginPage, page }) => {
      await loginPage.login(data.username, data.password);
      await expect(page.locator('[data-test="error"]')).toBeVisible();
    });
  }
  
});

test.describe('Cart & Checkout', () => {

  test('add item to cart', async ({ homePage, page }) => {
    await homePage.addItemToCart('sauce-labs-backpack');
  
    const count = await homePage.getCartCount();
    expect(count).toBe('1');

    await homePage.goToCart();
    await expect(page).toHaveURL(/cart/);
  });

  test('checkout flow', async ({  homePage, cartPage, page }) => {
    await homePage.addItemToCart('sauce-labs-backpack');
    await homePage.goToCart();

    const count = await cartPage.getItemCount();
    expect(count).toBe(1);

    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout/);
  });

  test('complete checkout', async ({  homePage, cartPage, checkoutPage }) => {
    await homePage.addItemToCart('sauce-labs-backpack');
    await homePage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillForm('Abhay', 'Singh', '12345');
    await checkoutPage.finishCheckout();

    const message = await checkoutPage.getConfirmationMessage();
    expect(message).toBe('Thank you for your order!');
  });

  test('logout', async ({ homePage, page }) => {
    await homePage.logout();
    await expect(page).toHaveURL('/');
  });
  

});
