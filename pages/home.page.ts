import { Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { SortOption } from '../enums/sort.enum';
import { Category } from '../enums/category.enum';

export class HomePage extends BasePage {
  readonly productsCard: Locator = this.page.getByTestId(/product/);
  readonly sortDropdown: Locator = this.page.getByTestId('sort');
  readonly productName: Locator = this.page.locator('[data-test="product-name"]');
  readonly productPrice: Locator = this.page.locator('[data-test="product-price"]');

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
    const productTitle = await productLocator.getByTestId('product-name').innerText();
    const productPrice = await productLocator.getByTestId('product-price').innerText();

    return {
      title: productTitle,
      price: productPrice.replace('$', '').trim(),
    };
  }

  async getAllProductNames(): Promise<string[]> {
    const names = await this.productName.allInnerTexts();
    return names.filter((name) => name.trim().length > 0);
  }

  async getAllProductPrices(): Promise<string[]> {
    return await this.productPrice.allInnerTexts();
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
    await this.page.waitForResponse(
      (res) => res.url().includes('/products') && res.status() === 200,
    );
  }

  async getSortedProductNames(order: 'asc' | 'desc'): Promise<boolean> {
    const names = (await this.getAllProductNames())
      .map((n) => n.trim().toLowerCase())
      .filter((n) => n);

    return names.every((name, i, arr) => {
      if (i === 0) return true;
      return order === 'asc' ? arr[i - 1] <= name : arr[i - 1] >= name;
    });
  }

  async getSortedProductPrices(order: 'asc' | 'desc'): Promise<boolean> {
    const prices = (await this.getAllProductPrices())
      .map((p) => parseFloat(p.replace('$', '').trim()))
      .filter((p) => !isNaN(p));

    return prices.every((price, i, arr) => {
      if (i === 0) return true;
      return order === 'asc' ? arr[i - 1] <= price : arr[i - 1] >= price;
    });
  }
}
