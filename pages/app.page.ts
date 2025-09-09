import { Page } from '@playwright/test';
import { HomePage } from './home.page';
import { LoginPage } from './login.page';
import { AccountPage } from './account.page';
import { ProductDetailsPage } from './productDetails.page';
import { CheckoutPage } from './checkout.page';
import { BillingPage } from './billing.page';
import { PaymentPage } from './payment.page';

export class ApplicationPage {
  readonly page: Page;
  readonly home: HomePage;
  readonly login: LoginPage;
  readonly account: AccountPage;
  readonly productDetailsPage: ProductDetailsPage;
  readonly checkout: CheckoutPage;
  readonly billing: BillingPage;
  readonly payment: PaymentPage;
  constructor(page: Page) {
    this.page = page;
    this.home = new HomePage(this.page);
    this.login = new LoginPage(this.page);
    this.account = new AccountPage(this.page);
    this.productDetailsPage = new ProductDetailsPage(this.page);
    this.checkout = new CheckoutPage(this.page);
    this.billing = new BillingPage(page);
    this.payment = new PaymentPage(page);
  }
}
