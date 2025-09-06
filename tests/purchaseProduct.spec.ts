import { test } from '../fixtures/loggedInApp.fixture';
import { expect } from '@playwright/test';

test('Checkout first product with payment', async ({ loggedInApp }) => {
  const app = loggedInApp;
  await app.home.open('/');

  const product = await app.home.getFirstProductInfo();
  const productPrice = await app.home.getFirstProductPrice();

  await app.home.openProductByIndex(0);
  await app.productDetailsPage.addToCartButton.click();
  await expect(app.productDetailsPage.cartAlert).toBeVisible({ timeout: 10000 });
  await expect(app.productDetailsPage.cartAlert).toHaveText(/Product added to shopping cart/i, {
    timeout: 10000,
  });
  await expect(app.productDetailsPage.cartAlert).toBeHidden({ timeout: 10000 });

  await app.checkout.goToCheckout();

  await app.checkout.verifyProductLinePrice(productPrice);
  await app.checkout.verifyTotalPrice(productPrice);
  await app.checkout.verifyProductInCart(product.name, '1');
  await app.checkout.verifyProductLinePrice(productPrice);
  await app.checkout.verifyTotalPrice(productPrice);

  await app.billing.proceedToCheckoutButton.click();
  await app.billing.proceedStep2Button.click();

  await app.billing.fillMissingFields(app.billing.defaultBillingData);
  await expect(app.billing.stateInput).toHaveValue(app.billing.defaultBillingData.state);
  await expect(app.billing.postalCodeInput).toHaveValue(app.billing.defaultBillingData.postalCode);

  await app.billing.proceedStep3Button.click();

  const expirationDate = new Date();
  expirationDate.setMonth(expirationDate.getMonth() + 3);
  const expMonth = String(expirationDate.getMonth() + 1).padStart(2, '0');
  const expYear = expirationDate.getFullYear();
  const expDateStr = `${expMonth}/${expYear}`;

  await app.payment.selectCreditCard();
  await app.payment.fillCardDetails({
    ...app.payment.defaultCardData,
    expiration: expDateStr,
  });
  await app.payment.confirm();

  await app.payment.waitForSuccessMessage();
  await expect(app.payment.successMessage).toHaveText(/Payment was successful/i);
});
