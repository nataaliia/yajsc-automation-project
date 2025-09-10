import { loggedInUser as test, expect } from '../fixtures/loggedInApp.fixture';
import { defaultBillingData, defaultCardData } from '../utils/card-data.helper';

test(
  'Checkout first product with payment',
  {
    tag: '@regression',
  },
  async ({ app }) => {
    await app.home.open('/');

    const product = await app.home.getFirstProductInfo();
    const productPrice = await app.home.getFirstProductPrice();

    await test.step('Open product page and add to cart', async () => {
      await app.home.openProductByIndex(0);
      await app.productDetailsPage.addToCartButton.click();
      await expect(app.productDetailsPage.cartAlert).toBeVisible({ timeout: 10000 });
      await expect(app.productDetailsPage.cartAlert).toHaveText(/Product added to shopping cart/i, {
        timeout: 10000,
      });
      await expect(app.productDetailsPage.cartAlert).toBeHidden({ timeout: 10000 });
    });
    await expect(app.productDetailsPage.cartAlert).toBeHidden({ timeout: 10000 });

    await test.step('Go to checkout and verify cart details', async () => {
      await app.checkout.goToCheckout();

      await app.checkout.verifyProductLinePrice(productPrice);
      await app.checkout.verifyTotalPrice(productPrice);
      await app.checkout.verifyProductInCart(product.name, '1');
    });

    await test.step('Billing information', async () => {
      await app.billing.proceedToCheckoutButton.click();
      await app.billing.proceedStep2Button.click();

      await app.billing.fillMissingFields(defaultBillingData);
      await expect(app.billing.stateInput).toHaveValue(defaultBillingData.state);
      await expect(app.billing.postalCodeInput).toHaveValue(defaultBillingData.postalCode);

      await app.billing.proceedStep3Button.click();
    });

    await test.step('Fill payment details and confirm', async () => {
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 3);
      const expMonth = String(expirationDate.getMonth() + 1).padStart(2, '0');
      const expYear = expirationDate.getFullYear();
      const expDateStr = `${expMonth}/${expYear}`;

      await app.payment.selectCreditCard();
      await app.payment.fillCardDetails({
        ...defaultCardData,
        expiration: expDateStr,
      });
      await app.payment.confirm();
    });

    await test.step('Payment success message', async () => {
      await app.payment.waitForSuccessMessage();
      await expect(app.payment.successMessage).toHaveText(/Payment was successful/i);
    });
  },
);
