import { test, expect } from '@playwright/test';

const user={
  standardUser:{
    email:'customer@practicesoftwaretesting.com',
    password:'welcome01',
  }
}

test('login', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.locator('[data-test="email"]').fill(user.standardUser.email);
  await page.locator('[data-test="password"]').fill(user.standardUser.password);
  await page.locator('[data-test="login-submit"]').click();

  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  await expect(page.locator('[data-test="page-title"]')).toHaveText('My account');
  await expect(page.locator('[data-test="nav-menu"]')).toHaveText('Jane Doe');
});