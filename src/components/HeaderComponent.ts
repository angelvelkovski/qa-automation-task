import type { Locator, Page } from '@playwright/test';

/** App header shown on every post-login page (cart link and badge). */
export class HeaderComponent {
  private readonly cartLink: Locator;
  private readonly cartBadge: Locator;

  constructor(page: Page) {
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  /** Number in the cart badge; 0 when the badge is hidden. */
  async cartCount(): Promise<number> {
    return (await this.cartBadge.count()) ? Number(await this.cartBadge.innerText()) : 0;
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
