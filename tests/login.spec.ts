import { loggedInUser as test, expect } from '../fixtures/loggedInApp.fixture';
import { baseConfig } from '../config/baseConfig';

test('login via loggedInUser fixture', async ({ app }) => {
  await app.page.goto('/account');

  await expect(app.page).toHaveURL(/\/account$/);
  await expect(app.account.pageTitle).toHaveText('My account');
  await expect(app.account.header.navMenu).toHaveText(baseConfig.USER_NAME);
});
