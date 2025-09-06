import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductDetailsPage extends BasePage {
  readonly productName: Locator = this.page.getByTestId('product-name');
  readonly productPrice: Locator = this.page.getByTestId('unit-price');
  readonly addToCartButton: Locator = this.page.getByTestId('add-to-cart');
  readonly addToFavoritesButton: Locator = this.page.getByTestId('add-to-favorites');
  readonly cartAlert: Locator = this.page.locator('div[role="alert"].toast-message');
}
