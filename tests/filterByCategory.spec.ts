import { ApplicationPage } from '../pages/app.page';
import { HomePage } from '../pages/home.page';
import { test, expect } from '@playwright/test';

test('Verify displayed products contain Sander in their names', async ({ page }) => {
  const homePage = new HomePage(page);

  const app = new ApplicationPage(page);
  await app.home.open('/');
  await homePage.filterByProduct('Sander');
  const productNames = await homePage.getAllProductNames();
  expect(productNames.every((name) => name.includes('Sander'))).toBeTruthy();

  expect(productNames.length).toBeGreaterThan(0);
});
