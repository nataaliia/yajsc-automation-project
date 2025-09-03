import { HomePage } from '../pages/home.page';
import { test, expect } from '@playwright/test';

test('Verify displayed products contain Sander in their names', async ({ page }) => {
  const homePage = new HomePage(page);

  await page.goto('https://practicesoftwaretesting.com');
  await homePage.filterByProduct('Sander');
  const productNames = await homePage.getAllProductNames();
  productNames.forEach((name) => {
    expect(name).toContain('Sander');
  });
  expect(productNames.length).toBeGreaterThan(0);
});
