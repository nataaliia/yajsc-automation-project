import { test as base } from '@playwright/test';
import path from 'path';
import { ApplicationPage } from '../pages/app.page';
import { baseConfig } from '../config/baseConfig';
import fs from 'fs';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

export const test = base.extend<{ app: ApplicationPage }>({
  app: async ({ browser }, use) => {
    let context;
    if (fs.existsSync(authFile)) {
      context = await browser.newContext({ storageState: authFile });
    } else {
      context = await browser.newContext();
      const page = await context.newPage();
      const app = new ApplicationPage(page);
      await app.login.open('/auth/login');
      await app.login.loginAs(baseConfig.USER_EMAIL, baseConfig.USER_PASSWORD);
      await context.storageState({ path: authFile });
      await page.close();
    }

    const page = await context.newPage();
    const app = new ApplicationPage(page);
    await use(app);
    await page.close();
  },
});
