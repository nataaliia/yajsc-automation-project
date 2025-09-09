import { test, expect } from '../fixtures/app.fixture';
import { baseConfig } from '../config/baseConfig';

test('login', async ({ app }) => {
  await app.login.open('/auth/login');

  await app.login.loginAs(baseConfig.USER_EMAIL, baseConfig.USER_PASSWORD);

  await expect(app.page).toHaveURL(/\/account$/);

  await expect(app.account.pageTitle).toHaveText('My account');

  await expect(app.account.header.navMenu).toHaveText(baseConfig.USER_NAME);
});
