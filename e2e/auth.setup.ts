import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authFile = path.resolve(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ request }) => {
  const response = await request.get('/testing/login');
  expect(response.ok()).toBeTruthy();

  await request.storageState({ path: authFile });
});
