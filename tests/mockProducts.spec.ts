import { test, expect } from '../fixtures/app.fixture';
import json from '../testData/mocking.json';

test(
  'verify products mocking',
  {
    tag: '@regression',
  },
  async ({ app, page }) => {
    await page.route('**/products*', async (route) => {
      await route.fulfill({
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(json),
      });
    });

    await app.home.open('/');

    await expect(app.home.productsCard.filter({ has: page.locator(':visible') })).toHaveCount(20);
  },
);
