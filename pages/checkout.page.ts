import { expect, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  readonly cartProductQuantity: Locator = this.page.getByTestId('product-quantity');
  readonly cartProductTitle: Locator = this.page.getByTestId('product-title');
  readonly cartProductLinePrice: Locator = this.page.getByTestId('line-price');
  readonly cartTotalPrice: Locator = this.page.getByTestId('cart-total');

  async goToCheckout(): Promise<void> {
    await this.open('/checkout');
  }

  async verifyProductInCart(expectedName: string, expectedQuantity = '1'): Promise<void> {
    await expect(this.cartProductTitle.first()).toHaveText(expectedName);
    await expect(this.cartProductQuantity.first()).toHaveValue(expectedQuantity);
  }

  async verifyProductLinePrice(expectedPrice: string): Promise<void> {
    await expect(this.cartProductLinePrice.first()).toHaveText(expectedPrice);
  }

  // Перевірка сумарної ціни
  async verifyTotalPrice(expectedPrice: string): Promise<void> {
    await expect(this.cartTotalPrice).toHaveText(expectedPrice);
  }
}
