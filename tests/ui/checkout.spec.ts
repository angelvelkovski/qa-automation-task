import { expect, test } from '@/fixtures';
import { buildCustomer } from '@/test-data/customers';
import { checkoutProducts } from '@/test-data/products';
import { knownDefects } from '@/test-data/users';
import { env } from '@/config/env';
import { calculateTaxCents, sumCents } from '@/utils/money';
import { documentTest } from '@/utils/report';

/** Checkout overview totals (UI). Runs once per user project; problem_user is an expected failure. */
test.describe('Checkout overview', () => {
  /**
   * Adds products, then checks the cart and overview list them with the same prices, and that
   * item total, tax and total match values computed here from those prices (never hardcoded).
   */
  test('item total, tax and total agree with the item prices', async ({
    userKey,
    inventoryPage,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
  }) => {
    // Known defect => expected failure: stays visible in the report, and flags us when it gets fixed.
    const defect = knownDefects[userKey];
    await documentTest({
      epic: 'UI',
      feature: 'Checkout',
      severity: 'critical',
      tags: [userKey],
      description: `As ${userKey}_user: add two items, reach the overview, and verify item total, tax and total against values computed from the displayed prices.`,
      knownDefect: defect,
    });
    test.fail(!!defect, defect);

    const added = await test.step('Add two products to the cart', async () => {
      await inventoryPage.open();
      const products = await inventoryPage.addProducts(checkoutProducts);
      expect(await inventoryPage.header.cartCount()).toBe(products.length);
      return products;
    });
    const names = added.map((p) => p.name);

    await test.step('Cart lists the added products with their prices', async () => {
      await inventoryPage.header.openCart();
      expect(await cartPage.items.read(names)).toEqual(added);
    });

    await test.step('Enter customer details and continue', async () => {
      await cartPage.checkout();
      await checkoutInfoPage.submit(buildCustomer());
    });

    await test.step('Overview items, item total, tax and total match the computed values', async () => {
      expect(await checkoutOverviewPage.items.read(names)).toEqual(added);
      const expectedItemTotal = sumCents(added.map((p) => p.priceCents));
      const expectedTax = calculateTaxCents(expectedItemTotal, env.taxRate);
      expect(await checkoutOverviewPage.summary.read()).toEqual({
        itemTotalCents: expectedItemTotal,
        taxCents: expectedTax,
        totalCents: expectedItemTotal + expectedTax,
      });
    });
  });
});
