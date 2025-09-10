import { loggedInUser as test, expect } from '../fixtures/loggedInApp.fixture';

test(
  'Verify login via loggedInUser fixture',
  {
    tag: '@smoke',
  },
  async ({ app, page }) => {
    await app.home.open('/');

    const tokenInLocalStorage = await page.evaluate(() => localStorage.getItem('auth-token'));
    console.log('Token in localStorage:', tokenInLocalStorage);
    expect(tokenInLocalStorage).not.toBeNull();
  },
);
