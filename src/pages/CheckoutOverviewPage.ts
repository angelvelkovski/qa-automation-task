import type { Page } from '@playwright/test';
import { LineItemsComponent } from '@/components/LineItemsComponent';
import { OrderSummaryComponent } from '@/components/OrderSummaryComponent';
import { BasePage } from './BasePage';

export class CheckoutOverviewPage extends BasePage {
  protected readonly path = '/checkout-step-two.html';
  readonly items: LineItemsComponent;
  readonly summary: OrderSummaryComponent;

  constructor(page: Page) {
    super(page);
    this.items = new LineItemsComponent(page);
    this.summary = new OrderSummaryComponent(page);
  }
}
