import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly getItemCountInput: Locator;
    readonly removeItemInput: Locator;
    readonly proceedToCheckoutInput: Locator;
  


  constructor(page: Page) {
    this.page = page;
    this.getItemCountInput = page.locator('[data-test="inventory-item"]');
    this.removeItemInput = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.proceedToCheckoutInput = page.locator('[data-test="checkout"]');
  }

  async getItemCount() {
    return this.getItemCountInput.count();
  }
  

  async removeItem() {
    await this.removeItemInput.click();
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutInput.click();
  }
}
