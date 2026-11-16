import { test as base, expect } from '@playwright/test';
import { PostsClient } from '@/api/PostsClient';
import { UsersClient } from '@/api/UsersClient';
import { CartPage } from '@/pages/CartPage';
import { CheckoutInfoPage } from '@/pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '@/pages/CheckoutOverviewPage';
import { InventoryPage } from '@/pages/InventoryPage';
import { LoginPage } from '@/pages/LoginPage';
import type { UserKey } from '@/utils/auth';

/** Options set per project in playwright.config.ts. */
export interface TestOptions {
  /** Which saucedemo account the UI project runs as. */
  userKey: UserKey;
}

interface Fixtures {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutInfoPage: CheckoutInfoPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  usersApi: UsersClient;
  postsApi: PostsClient;
}

/** The only `test` that spec files import: wires page objects and API clients into tests. */
export const test = base.extend<Fixtures & TestOptions>({
  userKey: ['standard', { option: true }],
  loginPage: ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: ({ page }, use) => use(new InventoryPage(page)),
  cartPage: ({ page }, use) => use(new CartPage(page)),
  checkoutInfoPage: ({ page }, use) => use(new CheckoutInfoPage(page)),
  checkoutOverviewPage: ({ page }, use) => use(new CheckoutOverviewPage(page)),
  usersApi: ({ request }, use) => use(new UsersClient(request)),
  postsApi: ({ request }, use) => use(new PostsClient(request)),
});

export { expect };
