import { expect, type Page } from '@playwright/test';

/** Base for all pages: navigation and a URL-based "is loaded" check (no sleeps). */
export abstract class BasePage {
  protected abstract readonly path: string;

  constructor(protected readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto(this.path);
    await this.expectLoaded();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${this.path}$`));
  }
}
