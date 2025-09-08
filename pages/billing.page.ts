import { Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { setInputValue } from '../utils/form.helper';

export class BillingPage extends BasePage {
  readonly streetInput: Locator = this.page.getByTestId('street');
  readonly cityInput: Locator = this.page.getByTestId('city');
  readonly stateInput: Locator = this.page.getByTestId('state');
  readonly countryInput: Locator = this.page.getByTestId('country');
  readonly postalCodeInput: Locator = this.page.getByTestId('postal_code');

  readonly proceedToCheckoutButton: Locator = this.page.getByTestId('proceed-1');
  readonly proceedStep2Button: Locator = this.page.getByTestId('proceed-2');
  readonly proceedStep3Button: Locator = this.page.getByTestId('proceed-3');

  async fillMissingFields(fields: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  }): Promise<void> {
    if (fields.street) await this.streetInput.fill(fields.street);
    if (fields.city) await this.cityInput.fill(fields.city);
    if (fields.state) await setInputValue(this.stateInput, fields.state);
    if (fields.country) await this.countryInput.fill(fields.country);
    if (fields.postalCode) await setInputValue(this.postalCodeInput, fields.postalCode);
  }
}
