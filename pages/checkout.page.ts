import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  readonly cartProductQuantity: Locator = this.page.getByTestId('product-quantity');
  readonly cartProductTitle: Locator = this.page.getByTestId('product-title');
  readonly proceedToCheckoutButton: Locator = this.page.getByTestId('proceed-1');
}
