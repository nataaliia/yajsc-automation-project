import { test, expect } from '../fixtures/app.fixture';

test(
  'Verify displayed products contain Sander in their names',
  {
    tag: '@smoke',
  },
  async ({ app }) => {
    await test.step('Open homepage', async () => {
      await app.home.open('/');
    });
    await test.step('Filter products by name "Sander"', async () => {
      await app.home.filterByProduct('Sander');
    });
    await test.step('Verify products contain "Sander"', async () => {
      const productNames = await app.home.getAllProductNames();
      expect(productNames.length).toBeGreaterThan(0);
      expect(productNames.every((name) => name.includes('Sander'))).toBeTruthy();
    });
  },
);
