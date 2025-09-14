import { test, expect } from '../fixtures/app.fixture';
import json from '../testData/mocking.json';

test(
  'verify products mocking',
  {
    tag: '@regression',
  },
  async ({ app, page }) => {
    await test.step('Mock products API response', async () => {
      await page.route('**/products*', async (route) => {
        await route.fulfill({
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(json),
        });
      });
    });
    await test.step('Open home page', async () => {
      await app.home.open('/');
    });
    await test.step('Verify 20 product cards are displayed', async () => {
      await expect(app.home.productsCard.filter({ has: page.locator(':visible') })).toHaveCount(20);
    });
  },
);
