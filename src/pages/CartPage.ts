import type { Page } from '@playwright/test';
import { LineItemsComponent } from '@/components/LineItemsComponent';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  protected readonly path = '/cart.html';
  readonly items: LineItemsComponent;

  constructor(page: Page) {
    super(page);
    this.items = new LineItemsComponent(page);
  }

  async checkout(): Promise<void> {
    await this.page.getByTestId('checkout').click();
  }
}
