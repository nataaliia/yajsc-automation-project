import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class BillingPage extends BasePage {
  readonly streetInput: Locator = this.page.getByTestId('street');
  readonly cityInput: Locator = this.page.getByTestId('city');
  readonly stateInput: Locator = this.page.getByTestId('state');
  readonly countryInput: Locator = this.page.getByTestId('country');
  readonly postalCodeInput: Locator = this.page.getByTestId('postal_code');

  readonly proceedToCheckoutButton: Locator = this.page.getByTestId('proceed-1');
  readonly proceedStep2Button: Locator = this.page.getByTestId('proceed-2');
  readonly proceedStep3Button: Locator = this.page.getByTestId('proceed-3');
  async fillMissingFields(data: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }) {
    const fields = [
      { locator: this.streetInput, value: data.street },
      { locator: this.cityInput, value: data.city },
      { locator: this.stateInput, value: data.state },
      { locator: this.countryInput, value: data.country },
      { locator: this.postalCodeInput, value: data.postalCode },
    ];
    for (const field of fields) {
      const currentValue = (await field.locator.inputValue()).trim();
      if (!currentValue) {
        await field.locator.fill(field.value);
      }
    }
  }
}
