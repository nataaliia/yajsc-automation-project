import { Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { SortOption } from '../enums/sort.enum';
import { Category } from '../enums/category.enum';

export class HomePage extends BasePage {
  readonly productsCard: Locator = this.page.getByTestId(/product/);
  readonly sortDropdown: Locator = this.page.getByTestId('sort');

  async filterByCategory(category: Category): Promise<void> {
    const checkbox = this.page
      .locator('label', { hasText: category })
      .locator('input[type="checkbox"]');

    await checkbox.waitFor({ state: 'visible' });
    await checkbox.check();

    await this.page.waitForResponse(
      (res) => res.url().includes('/products') && res.status() === 200,
    );
  }

  async filterByProduct(productName: string): Promise<void> {
    const checkbox = this.page
      .locator('label', { hasText: productName })
      .locator('input[type="checkbox"]');

    await checkbox.waitFor({ state: 'visible' });
    await checkbox.check();

    await this.page.waitForResponse(
      (res) => res.url().includes('/products') && res.status() === 200,
    );
  }

  async openProduct(productName: string): Promise<void> {
    await this.productsCard.filter({ hasText: productName }).first().click();
  }

  async getProductDetails(productName: string) {
    const productLocator = this.productsCard.filter({ hasText: productName }).first();
    const productTitle: string = await productLocator.getByTestId('product-name').innerText();
    const productPrice: string = await productLocator.getByTestId('product-price').innerText();

    return {
      title: productTitle,
      price: productPrice.replace('$', '').trim(),
    };
  }

  async getAllProductNames(): Promise<string[]> {
    const productNames = await this.page.locator('[data-test="product-name"]').allInnerTexts();
    return productNames.filter((name) => typeof name === 'string' && name.trim().length > 0);
  }

  async getAllProductPrices(): Promise<string[]> {
    return await this.page.locator('[data-test="product-price"]').allInnerTexts();
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
    await this.page.waitForResponse(
      (res) => res.url().includes('/products') && res.status() === 200,
    );
    await this.page.waitForTimeout(500);
  }
}
