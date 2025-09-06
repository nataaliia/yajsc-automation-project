import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class PaymentPage extends BasePage {
  readonly paymentMethodSelect: Locator = this.page.getByTestId('payment-method');
  readonly cardNumberInput: Locator = this.page.getByTestId('credit_card_number');
  readonly cardExpirationInput: Locator = this.page.getByTestId('expiration_date');
  readonly cardCvvInput: Locator = this.page.getByTestId('cvv');
  readonly cardHolderInput: Locator = this.page.getByTestId('card_holder_name');
  readonly confirmButton: Locator = this.page.getByTestId('finish');
  readonly successMessage: Locator = this.page.getByTestId('payment-success-message');

  readonly defaultCardData = {
    number: '1111-1111-1111-1111',
    cvv: '111',
    cardHolder: 'Test User',
  };

  async selectCreditCard(): Promise<void> {
    await this.paymentMethodSelect.selectOption('credit-card');
  }

  async fillCardDetails(fields: {
    number: string;
    expiration: string;
    cvv: string;
    cardHolder: string;
  }): Promise<void> {
    await this.cardNumberInput.fill(fields.number);
    await this.cardExpirationInput.fill(fields.expiration);
    await this.cardCvvInput.fill(fields.cvv);
    await this.cardHolderInput.fill(fields.cardHolder);
  }

  async confirm(): Promise<void> {
    await this.confirmButton.click();
  }

  async waitForSuccessMessage(): Promise<void> {
    await this.successMessage.waitFor({ state: 'visible', timeout: 15000 });
    await this.successMessage.scrollIntoViewIfNeeded();
  }
}
