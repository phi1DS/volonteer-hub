import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.resolve(
  import.meta.dirname,
  '../playwright/.auth/user.json'
);

setup('authenticate', async ({ request }) => {
  const response = await request.get('/testing/login');
  console.log('Login response status:', response.status());
  console.log(await response.text());
  expect(response.ok()).toBeTruthy();

  await request.storageState({ path: authFile });
});
