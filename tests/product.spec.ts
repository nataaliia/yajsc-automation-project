import { test, expect } from '../fixtures/app.fixture';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
test.use({ storageState: authFile });

test('Verify user can view product details', { tag: '@smoke' }, async ({ app }) => {
  await test.step('Open homepage and check products', async () => {
    await app.home.open('/');
    await expect(app.home.productsCard).not.toHaveCount(0);
  });

  await test.step('Open product page and verify details', async () => {
    const productTitle = 'Combination Pliers';
    const productDetails = await app.home.getProductDetails(productTitle);
    await app.home.openProduct(productTitle);

    await expect(app.productDetailsPage.productName).toHaveText(productDetails.title);
    await expect(app.productDetailsPage.productPrice).toHaveText(productDetails.price);
    await expect(app.productDetailsPage.addToCartButton).toBeVisible();
    await expect(app.productDetailsPage.addToFavoritesButton).toBeVisible();
  });
});

test('Verify user can add product to cart', { tag: '@smoke' }, async ({ app }) => {
  const productName = 'Slip Joint Pliers';
  const productPrice = '9.17';

  await test.step('Add product to cart and verify', async () => {
    await app.home.open('/');
    await app.home.openProduct(productName);

    await expect(app.productDetailsPage.productName).toHaveText(productName);
    await expect(app.productDetailsPage.productPrice).toHaveText(productPrice);

    await app.productDetailsPage.addToCartButton.click();
    await expect(app.productDetailsPage.cartAlert).toBeVisible({ timeout: 10000 });
    await expect(app.productDetailsPage.cartAlert).toHaveText(/Product added to shopping cart/i, {
      timeout: 10000,
    });
    await expect(app.productDetailsPage.cartAlert).toBeHidden({ timeout: 10000 });

    await app.checkout.goToCheckout();
    await app.checkout.verifyProductInCart(productName, '1');
  });
});
