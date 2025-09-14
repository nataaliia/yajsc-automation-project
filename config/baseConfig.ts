export const baseConfig: IBaseConfig = {
  WEB_URL: process.env.WEB_URL ?? 'https://practicesoftwaretesting.com',
  API_URL: process.env.API_URL!,
  USER_EMAIL: process.env.USER_EMAIL ?? 'customer@practicesoftwaretesting.com',
  USER_PASSWORD: process.env.USER_PASSWORD!,
  USER_NAME: process.env.USER_NAME ?? 'Jane Doe',
};
interface IBaseConfig {
  WEB_URL: string;
  API_URL: string;
  USER_EMAIL: string;
  USER_PASSWORD: string;
  USER_NAME: string;
}
