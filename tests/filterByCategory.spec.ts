import { test, expect } from '../fixtures/app.fixture';

test('Verify displayed products contain Sander in their names', async ({ app }) => {
  await app.home.open('/');
  await app.home.filterByProduct('Sander');
  const productNames = await app.home.getAllProductNames();
  expect(productNames.every((name) => name.includes('Sander'))).toBeTruthy();

  expect(productNames.length).toBeGreaterThan(0);
});
