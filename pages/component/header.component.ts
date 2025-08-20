import { Locator, Page } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly navMenu: Locator;
  constructor(page: Page) {
    this.page = page;
    this.navMenu = this.page.getByTestId('nav-menu');
  }
}
