import { Locator } from '@playwright/test';

export async function setInputValue(locator: Locator, value: string): Promise<void> {
  await locator.evaluate((el, v) => {
    (el as HTMLInputElement).value = v;
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, value);
}
