import { test as base, expect } from '@playwright/test';
import { ApplicationPage } from '../pages/app.page';
import { baseConfig } from '../config/baseConfig';
import { UserLoginBody } from '../typing/user';

interface LoginResponse {
  access_token: string;
}

const test = base.extend<{ app: ApplicationPage }>({
  app: async ({ page }, use) => {
    const application = new ApplicationPage(page);
    await use(application);
  },
});

const loggedInUser = test.extend<{ app: ApplicationPage }>({
  app: async ({ app, request, page }, use) => {
    const loginData: UserLoginBody = {
      email: baseConfig.USER_EMAIL,
      password: baseConfig.USER_PASSWORD,
    };

    const response = await request.post(`${baseConfig.API_URL}/users/login`, {
      data: loginData,
    });

    expect(response.ok()).toBeTruthy();

    const responseBody = (await response.json()) as LoginResponse;

    await page.goto('/', { waitUntil: 'commit' });
    await page.evaluate((token) => {
      window.localStorage.setItem('auth-token', token);
    }, responseBody.access_token);
    console.log('Token in localStorage:', responseBody.access_token); // ✅ тепер працює

    await app.home.open('/');

    await use(app);
  },
});

export { test, expect, loggedInUser };
