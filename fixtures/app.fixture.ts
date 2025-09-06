import { test as base } from '@playwright/test';
import { ApplicationPage } from '../pages/app.page';

type Fixtures = {
  app: ApplicationPage;
};

export const test = base.extend<Fixtures>({
  app: async ({ page }, use) => {
    const app = new ApplicationPage(page);
    await use(app);
  },
});

export { expect } from '@playwright/test';
