import { test, expect } from '@playwright/test';
import { ApplicationPage } from '../pages/app.page';
import { SortOption } from '../enums/sort.enum';

const sortParams = [
  { label: 'A-Z', option: SortOption.NAME_ASC, order: 'asc' as const },
  { label: 'Z-A', option: SortOption.NAME_DESC, order: 'desc' as const },
];

for (const { label, option, order } of sortParams) {
  test(`Verify user can perform sorting by name ${label}`, async ({ page }) => {
    const app = new ApplicationPage(page);
    await app.home.open('/');

    const firstProductBefore = await app.home.productsCard.first().innerText();
    await app.home.sortBy(option);

    await expect(app.home.productsCard.first()).not.toHaveText(firstProductBefore, {
      timeout: 5000,
    });

    const isSorted = await app.home.getSortedProductNames(order);
    expect(isSorted).toBeTruthy();
  });
}
