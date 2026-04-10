import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly titleText: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;


  constructor(page: Page) {
    this.page = page;
    this.titleText = page.locator('[data-test="title"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');

  }

  async getTitle() {
    return this.titleText.innerText();
  }

  async addItemToCart(itemName: string) {
    await this.page.locator(`[data-test="add-to-cart-${itemName}"]`).click();
  }

  async getCartCount() {
    return this.cartBadge.innerText();
  }

  async goToCart() {
    await this.cartLink.click();
  }
  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
  
}
