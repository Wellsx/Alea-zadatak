import { Page, Locator } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {
    this.page = page;
  }

  async clickButton(selector: Locator) {
    await selector.click();
  }
}

export { expect, Page, Locator, request } from "@playwright/test";
