import { loggedInUser as test, expect } from '../fixtures/loggedInApp.fixture';
import { baseConfig } from '../config/baseConfig';

test('login via loggedInUser fixture', async ({ app }) => {
  await test.step('Open account page', async () => {
    await app.page.goto('/account');
    await expect(app.page).toHaveURL(/\/account$/);
  });
  await test.step('Verify account page title is visible', async () => {
    await expect(app.account.pageTitle).toHaveText('My account');
  });
  await test.step('Verify username in the navigation menu', async () => {
    await expect(app.account.header.navMenu).toHaveText(baseConfig.USER_NAME);
  });
});
