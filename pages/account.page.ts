import { Locator } from '@playwright/test';
import { HeaderComponent } from './component/header.component';
import { BasePage } from './base.page';

export class AccountPage extends BasePage {
  readonly pageTitle: Locator = this.page.getByTestId('page-title');
  readonly header: HeaderComponent = new HeaderComponent(this.page);
}
