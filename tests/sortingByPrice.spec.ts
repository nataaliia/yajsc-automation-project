import { test, expect } from '@playwright/test';
import { ApplicationPage } from '../pages/app.page';
import { SortOption } from '../enums/sort.enum';

const priceSortParams: { label: string; option: SortOption; order: 'asc' | 'desc' }[] = [
  { label: 'ASC', option: SortOption.PRICE_ASC, order: 'asc' },
  { label: 'DESC', option: SortOption.PRICE_DESC, order: 'desc' },
];
for (const { label, option, order } of priceSortParams) {
  test(`Verify products are sorted by price ${label}`, async ({ page }) => {
    const app = new ApplicationPage(page);

    await app.home.open('/');

    const firstPriceBefore = await app.home.productPrice.first().innerText();
    await app.home.sortBy(option);
    await expect(app.home.productPrice.first()).not.toHaveText(firstPriceBefore, { timeout: 5000 });

    const isSorted = await app.home.getSortedProductPrices(order);
    expect(isSorted).toBeTruthy();
  });
}
