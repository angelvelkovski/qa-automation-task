import type { Locator, Page } from '@playwright/test';
import { HeaderComponent } from '@/components/HeaderComponent';
import { parseMoneyToCents } from '@/utils/money';
import { BasePage } from './BasePage';

export interface AddedProduct {
  name: string;
  priceCents: number;
}

export class InventoryPage extends BasePage {
  protected readonly path = '/inventory.html';
  readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
  }

  private card(slug: string): Locator {
    return this.page.getByTestId('inventory-item').filter({ has: this.page.getByTestId(`inventory-item-${slug}-img`) });
  }

  /** Adds one product by slug and returns the name/price as displayed (the source of expected values). */
  async addToCart(slug: string): Promise<AddedProduct> {
    const card = this.card(slug);
    const product = {
      name: await card.getByTestId('inventory-item-name').innerText(),
      priceCents: parseMoneyToCents(await card.getByTestId('inventory-item-price').innerText()),
    };
    await this.page.getByTestId(`add-to-cart-${slug}`).click();
    return product;
  }

  async addProducts(slugs: string[]): Promise<AddedProduct[]> {
    const added: AddedProduct[] = [];
    for (const slug of slugs) added.push(await this.addToCart(slug));
    return added;
  }
}
