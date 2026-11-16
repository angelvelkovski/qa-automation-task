import type { Page } from '@playwright/test';
import type { Customer } from '@/test-data/customers';
import { BasePage } from './BasePage';

export class CheckoutInfoPage extends BasePage {
  protected readonly path = '/checkout-step-one.html';

  constructor(page: Page) {
    super(page);
  }

  async submit(customer: Customer): Promise<void> {
    await this.page.getByTestId('firstName').fill(customer.firstName);
    await this.page.getByTestId('lastName').fill(customer.lastName);
    await this.page.getByTestId('postalCode').fill(customer.postalCode);
    await this.page.getByTestId('continue').click();
  }
}
