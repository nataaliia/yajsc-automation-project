import { Locator } from '@playwright/test';
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
    const fillAngularInput = async (locator: Locator, value: string) => {
      await locator.fill(value);
      await locator.evaluate((el: HTMLInputElement, val) => {
        el.value = val;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        el.dispatchEvent(new Event('blur', { bubbles: true }));
      }, value);
    };

    await test.step('Billing information', async () => {
      await app.billing.proceedToCheckoutButton.click();
      await app.billing.proceedStep2Button.click();
      await fillAngularInput(app.billing.streetInput, defaultBillingData.street);
      await fillAngularInput(app.billing.cityInput, defaultBillingData.city);
      await fillAngularInput(app.billing.stateInput, defaultBillingData.state);
      await fillAngularInput(app.billing.countryInput, defaultBillingData.country);
      await fillAngularInput(app.billing.postalCodeInput, defaultBillingData.postalCode);
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
