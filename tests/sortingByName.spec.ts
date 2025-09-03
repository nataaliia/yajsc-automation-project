import { test, expect } from '@playwright/test';
import { ApplicationPage } from '../pages/app.page';
import { SortOption } from '../enums/sort.enum';

const sortParams = [
  { label: 'ASC', option: SortOption.NAME_ASC, order: 'asc' },
  { label: 'DESC', option: SortOption.NAME_DESC, order: 'desc' },
];

for (const { label, option, order } of sortParams) {
  test(`Verify sorting by name ${label}`, async ({ page }) => {
    const app = new ApplicationPage(page);
    await app.home.open('/');
    await app.home.sortBy(option);

    const names = (await app.home.getAllProductNames())
      .map((n) => n.trim().toLowerCase())
      .filter((n) => n);

    for (let i = 0; i < names.length - 1; i++) {
      if (order === 'asc') {
        expect(names[i].localeCompare(names[i + 1])).toBeLessThanOrEqual(0);
      } else {
        expect(names[i].localeCompare(names[i + 1])).toBeGreaterThanOrEqual(0);
      }
    }
  });
}
