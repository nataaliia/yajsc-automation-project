import { test, expect } from '@playwright/test';
import { ApplicationPage } from '../pages/app.page';
import { SortOption } from '../enums/sort.enum';

const priceSortParams = [
  { label: 'ASC', option: SortOption.PRICE_ASC, order: 'asc' },
  { label: 'DESC', option: SortOption.PRICE_DESC, order: 'desc' },
];

for (const { label, option, order } of priceSortParams) {
  test(`Verify products are sorted by price ${label}`, async ({ page }) => {
    const app = new ApplicationPage(page);
    await app.home.open('/');
    const firstPriceBefore = await app.home.productsCard
      .first()
      .locator('[data-test="product-price"]')
      .innerText();
    await app.home.sortBy(option);
    await expect(
      app.home.productsCard.first().locator('[data-test="product-price"]'),
    ).not.toHaveText(firstPriceBefore, { timeout: 5000 });
    const prices = (await app.home.getAllProductPrices())
      .map((p) => parseFloat(p.replace('$', '').trim()))
      .filter((p) => !isNaN(p));
    for (let i = 0; i < prices.length - 1; i++) {
      if (order === 'asc') {
        expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
      } else {
        expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
      }
    }
  });
}
