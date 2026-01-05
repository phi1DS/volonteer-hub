import { test as setup } from '@playwright/test';
import path from 'path';

const authFile = path.join('/home/pdeiss/volonteer-hub/playwright/.auth/user.json'); // TODO optimise

setup('authenticate', async ({ request }) => {
  await request.get('http://localhost:8000/testing/login');
  await request.storageState({ path: authFile });
});
