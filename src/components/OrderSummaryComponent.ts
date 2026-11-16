import type { Page } from '@playwright/test';
import { parseMoneyToCents } from '@/utils/money';

export interface OrderSummary {
  itemTotalCents: number;
  taxCents: number;
  totalCents: number;
}

/** The item total / tax / total block on the checkout overview. */
export class OrderSummaryComponent {
  constructor(private readonly page: Page) {}

  async read(): Promise<OrderSummary> {
    const text = (id: string) => this.page.getByTestId(id).innerText();
    return {
      itemTotalCents: parseMoneyToCents(await text('subtotal-label')),
      taxCents: parseMoneyToCents(await text('tax-label')),
      totalCents: parseMoneyToCents(await text('total-label')),
    };
  }
}
