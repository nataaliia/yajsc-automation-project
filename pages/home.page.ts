import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly productsCard: Locator = this.page.getByTestId(/product/);
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
}
