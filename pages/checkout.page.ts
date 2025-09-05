import { expect, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  readonly cartProductQuantity: Locator = this.page.getByTestId('product-quantity');
  readonly cartProductTitle: Locator = this.page.getByTestId('product-title');
  readonly proceedToCheckoutButton: Locator = this.page.getByTestId('proceed-1');

  async goToCheckout(): Promise<void> {
    await this.open('/checkout');
  }

  async verifyProductInCart(name: string, quantity = '1'): Promise<void> {
    await expect(this.cartProductQuantity.first()).toHaveValue(quantity);
    await expect(this.cartProductTitle.first()).toHaveText(name);
    await expect(this.proceedToCheckoutButton).toBeVisible();
  }
}
