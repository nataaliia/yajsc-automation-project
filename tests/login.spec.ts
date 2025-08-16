import { test, expect } from '@playwright/test';
import { baseConfig } from '../config/baseConfig';
import { ApplicationPage } from '../pages/app.page';

test('login', async ({ page }) => {
  const app = new ApplicationPage(page);

  await app.login.open('/auth/login');

  await app.login.loginAs(baseConfig.USER_EMAIL,baseConfig.USER_PASSWORD);

  await expect(page).toHaveURL(/\/account$/);

  await expect(app.account.pageTitle).toHaveText('My account');

  await expect(app.account.header.navMenu).toHaveText(baseConfig.USER_NAME);
});