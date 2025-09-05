import { expect, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator = this.page.getByTestId('email');
  readonly passwordInput: Locator = this.page.getByTestId('password');
  readonly submitButton: Locator = this.page.getByTestId('login-submit');
  readonly navMenu: Locator = this.page.getByTestId('nav-menu');

  async loginAs(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await this.navMenu.waitFor({ state: 'visible' });
    await expect(this.page).toHaveURL(/\/account$/);
  }
}
