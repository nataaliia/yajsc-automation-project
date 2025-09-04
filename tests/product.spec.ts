import { test, expect } from '@playwright/test';
import { ApplicationPage } from '../pages/app.page';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
test.use({ storageState: authFile });

test('Verify user can view product details', async ({ page }) => {
  const app = new ApplicationPage(page);
  const productTitle = 'Combination Pliers';
  await app.home.open('/');
  await expect(app.home.productsCard).not.toHaveCount(0);
  const productDetails = await app.home.getProductDetails(productTitle);
  await app.home.openProduct(productTitle);
  await expect(page).toHaveURL(/.*\product\/.*/);
  await expect(app.productDetailsPage.productName, 'Product name is not visible').toHaveText(
    productDetails.title,
  );
  await expect(app.productDetailsPage.productPrice, 'Product price is not visible').toHaveText(
    productDetails.price,
  );
  await expect(
    app.productDetailsPage.addToCartButton,
    'Add to cart button is not visible',
  ).toBeVisible();
  await expect(
    app.productDetailsPage.addToFavoritesButton,
    'Add to favorites button is not visible',
  ).toBeVisible();
});

test('Verify user can add product to cart', async ({ page }) => {
  const app = new ApplicationPage(page);
  await app.home.open('/');
  const productName = 'Slip Joint Pliers';
  const productPrice = '9.17';

  await app.home.openProduct(productName);
  await expect(app.productDetailsPage.productName).toHaveText(productName);
  await expect(app.productDetailsPage.productPrice).toHaveText(productPrice);

  await app.productDetailsPage.addToCartButton.click();
  await expect(app.productDetailsPage.cartAlert).toBeVisible({ timeout: 10000 });
  await expect(app.productDetailsPage.cartAlert).toHaveText(/Product added to shopping cart/i, {
    timeout: 10000,
  });
  await expect(app.productDetailsPage.cartAlert).toBeHidden({ timeout: 10000 });
  await app.checkout.open();
  await app.checkout.verifyProductInCart(productName, '1');
});
