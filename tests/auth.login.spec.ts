import { test } from '@playwright/test';
import path from 'path';
import { baseConfig } from '../config/baseConfig';
import { ApplicationPage } from '../pages/app.page';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('Verify login', async ({ page }) => {
  const app = new ApplicationPage(page);

  await app.login.open('/auth/login');
  await app.login.loginAs(baseConfig.USER_EMAIL, baseConfig.USER_PASSWORD);
  await page.context().storageState({ path: authFile });
});
