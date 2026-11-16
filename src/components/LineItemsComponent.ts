import type { Locator, Page } from '@playwright/test';
import { parseMoneyToCents } from '@/utils/money';

export interface LineItem {
  name: string;
  priceCents: number;
}

/** Product rows shared by the cart and checkout overview pages. */
export class LineItemsComponent {
  private readonly rows: Locator;

  constructor(private readonly page: Page) {
    this.rows = page.getByTestId('inventory-item');
  }

  /** The row for one product, matched by its exact displayed name. */
  private row(name: string): Locator {
    return this.rows.filter({ has: this.page.getByTestId('inventory-item-name').getByText(name, { exact: true }) });
  }

  /**
   * Reads name and price for the given products. Each lookup auto-waits for its own row,
   * so no explicit waits or row counting (the app is a SPA and re-renders after the URL changes).
   */
  async read(names: string[]): Promise<LineItem[]> {
    const items: LineItem[] = [];
    for (const name of names) {
      const price = await this.row(name).getByTestId('inventory-item-price').innerText();
      items.push({ name, priceCents: parseMoneyToCents(price) });
    }
    return items;
  }
}
