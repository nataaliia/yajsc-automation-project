import { test, expect } from '../fixtures/app.fixture';
import { SortOption } from '../enums/sort.enum';

const sortParams = [
  { label: 'A-Z', option: SortOption.NAME_ASC, order: 'asc' as const },
  { label: 'Z-A', option: SortOption.NAME_DESC, order: 'desc' as const },
];

for (const { label, option, order } of sortParams) {
  test(
    `Verify user can perform sorting by name ${label}`,
    {
      tag: '@regression',
    },
    async ({ app }) => {
      await test.step('Open homepage', async () => {
        await app.home.open('/');
      });

      await test.step(`Sort products by ${label} and verify the first product has changed`, async () => {
        const firstProductBefore = await app.home.productsCard.first().innerText();

        await app.home.sortBy(option);

        await expect(app.home.productsCard.first()).not.toHaveText(firstProductBefore, {
          timeout: 5000,
        });
      });

      await test.step('Verify the full product list is sorted correctly', async () => {
        const isSorted = await app.home.getSortedProductNames(order);
        expect(isSorted).toBeTruthy();
      });
    },
  );
}
