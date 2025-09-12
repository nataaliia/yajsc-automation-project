import { loggedInUser as test, expect } from '../fixtures/loggedInApp.fixture';

test(
  'Verify login via loggedInUser fixture',
  {
    tag: '@smoke',
  },
  async ({ app, page }) => {
    await test.step('Open homepage', async () => {
      await app.home.open('/');
    });

    await test.step('Check token in localStorage', async () => {
      const tokenInLocalStorage = await page.evaluate(() => localStorage.getItem('auth-token'));
      console.log('Token in localStorage:', tokenInLocalStorage);
      expect(tokenInLocalStorage).not.toBeNull();
    });
  },
);
